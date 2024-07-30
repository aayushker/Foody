import React, { useEffect } from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { fetchAllRecipes } from "@/app/fetchData";
import NavBar from "./NavBar";

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllRecipes();
        console.log("Fetched recipes:", data);
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching recipes", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
    <NavBar />
      <div className="px-6 py-2">
        <div className="grid-container">
          {recipes.map((recipe) => (
            // console.log(recipe.id),
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
          ))}
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
