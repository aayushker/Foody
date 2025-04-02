import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { fetchAllRecipes } from "@/app/fetchData";
import NavBar from "@/app/components/ui/NavBar";
import SkeletonLoader from "@/app/components/ui/SkeletonLoader";

interface Recipe {
  id: number;
  username: string;
  name: string;
  description: string;
  cuisine: string;
  difficulty: string;
  ingredients: Array<{
    quantity: string;
    unit: string;
    ingredient: string;
    notes: string;
  }>;
  instructions: string;
  servings: number;
  tags: string;
  total_calories: number;
  total_time: number;
}

const Explore = () => {
  const [recipes, setRecipes] = React.useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchAllRecipes();
        console.log("Fetched recipes:", data);
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching recipes", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <NavBar />
      <div className="px-6 py-2">
        <div className="grid-container">
          {isLoading ? (
            // Skeleton loading state
            Array.from({ length: 8 }).map((_, index) => (
              <Card className="py-4 max-w-sm" key={`skeleton-${index}`}>
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                  <div className="h-6 w-3/4 bg-gray-200 rounded-md mb-2"></div>
                  <div className="h-4 w-full bg-gray-200 rounded-md mb-2"></div>
                  <div className="h-4 w-1/2 bg-gray-200 rounded-md"></div>
                </CardHeader>

                <CardBody className="overflow-visible py-2">
                  <div className="h-48 w-full bg-gray-200 rounded-xl"></div>
                </CardBody>
              </Card>
            ))
          ) : (
            // Actual content
            recipes.map((recipe) => (
              <Card className="py-4 max-w-sm" key={recipe.id}>
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                  <h4 className="font-bold text-large">{recipe.name}</h4>
                  <small className="text-default-500">{recipe.description}</small>
                  <small>Recipe by: {recipe.username}</small>
                </CardHeader>

                <CardBody className="overflow-visible py-2">
                  <Image
                    alt="Card background"
                    className="object-cover rounded-xl"
                    src="https://nextui.org/images/hero-card-complete.jpeg"
                    width={270}
                  />
                </CardBody>
              </Card>
            ))
          )}
        </div>

        <style jsx>{`
          .grid-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 16px;
          }
        `}</style>
      </div>
    </>
  );
};

export default Explore;
