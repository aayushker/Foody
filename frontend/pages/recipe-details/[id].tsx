import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Chip,
  Spinner,
} from "@nextui-org/react";
import NavBar from "@/app/components/ui/NavBar";
import { getRecipeDetails } from "@/app/fetchData";
import { AuthProvider } from "@/app/AuthContext";
import { ThemeProvider } from "@/app/ThemeContext";

interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
  steps: string[];
  minutes: number;
  description?: string;
  tags?: string[];
  nutrition?: number[];
}

const RecipeDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const data = await getRecipeDetails(Number(id));
        setRecipe(data);
      } catch (err) {
        console.error("Error fetching recipe details:", err);
        setError("Failed to load recipe details");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  const getNutritionLabel = (index: number): string => {
    const labels = [
      "Calories",
      "Total Fat",
      "Sugar",
      "Sodium",
      "Protein",
      "Saturated Fat",
      "Carbohydrates",
    ];
    return labels[index] || `Nutrient ${index}`;
  };

  return (
    <AuthProvider>
      <ThemeProvider>
        <NavBar />
        <div className="container mx-auto p-4 max-w-5xl">
          {loading ? (
            <div className="flex justify-center items-center min-h-[50vh]">
              <Spinner size="lg" />
            </div>
          ) : error ? (
            <Card className="p-4">
              <CardBody>
                <p className="text-danger">{error}</p>
              </CardBody>
            </Card>
          ) : recipe ? (
            <Card className="p-4">
              <CardHeader className="flex-col items-start">
                <h1 className="text-3xl font-bold">{recipe.name}</h1>
                {recipe.description && (
                  <p className="text-default-600 mt-2">{recipe.description}</p>
                )}
                <div className="flex flex-wrap gap-2 mt-3">
                  <Chip color="primary">
                    {recipe.minutes} minutes
                  </Chip>
                  {recipe.tags && recipe.tags.map((tag, idx) => (
                    <Chip key={idx} color="secondary" variant="flat">
                      {tag}
                    </Chip>
                  ))}
                </div>
              </CardHeader>

              <Divider className="my-4" />

              <CardBody>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h2 className="text-xl font-bold mb-4">Ingredients</h2>
                    <ul className="list-disc pl-5 space-y-2">
                      {recipe.ingredients.map((ingredient, idx) => (
                        <li key={idx}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-xl font-bold mb-4">Nutritional Information</h2>
                    {recipe.nutrition ? (
                      <ul className="space-y-2">
                        {recipe.nutrition.map((value, idx) => (
                          <li key={idx}>
                            <span className="font-semibold">{getNutritionLabel(idx)}:</span> {value}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>Nutritional information not available</p>
                    )}
                  </div>
                </div>

                <Divider className="my-6" />

                <div>
                  <h2 className="text-xl font-bold mb-4">Instructions</h2>
                  <ol className="list-decimal pl-5 space-y-4">
                    {recipe.steps.map((step, idx) => (
                      <li key={idx} className="pl-2">{step}</li>
                    ))}
                  </ol>
                </div>
              </CardBody>
            </Card>
          ) : (
            <Card className="p-4">
              <CardBody>
                <p>Recipe not found</p>
              </CardBody>
            </Card>
          )}
        </div>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default RecipeDetailPage; 