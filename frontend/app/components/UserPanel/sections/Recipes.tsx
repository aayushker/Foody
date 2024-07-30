import { useEffect, useState } from "react";
import { getUserRecipes, updateRecipe, deleteRecipe } from "@/app/fetchData";
import { useRouter } from "next/router";
import { Button } from "@nextui-org/react";
import { IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";
import { Card, CardHeader, CardBody, Image, Tooltip } from "@nextui-org/react";
import Link from "next/link";

interface Recipe {
  id: number;
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

const Recipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
      return;
    }
    const fetchData = async () => {
      try {
        const data = await getUserRecipes(token);
        console.log("Fetched recipes:", data);
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching recipes", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [router]);

  const token = localStorage.getItem("token");

  const handleSelectRecipe = (recipe: Recipe | null) => {
    setSelectedRecipe(recipe);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setSelectedRecipe((prevRecipe) => {
      if (!prevRecipe) return null;
      return {
        ...prevRecipe,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found");
      return;
    }
    try {
      const updatedRecipe = await updateRecipe(
        token,
        selectedRecipe!.id,
        selectedRecipe!
      );
      alert("Recipe updated successfully");
      setSelectedRecipe(null);
      setIsLoading(true);
      const data = await getUserRecipes(token);
      setRecipes(data);
    } catch (error) {
      console.error("Error updating recipe", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteRecipe = async (recipeId: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found");
      return;
    }
    try {
      await deleteRecipe(token, recipeId);
      alert("Recipe deleted successfully");
      setRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe.id !== recipeId)
      );
    } catch (error) {
      console.error("Error deleting recipe", error);
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <div className="flex justify-between">
        <div>
          <p className="text-black text-2xl font-semibold drop-shadow-md bg-clip-text animate-gradient">
            My Recipes 🍲
          </p>
          <p className="text-black text-md drop-shadow-md">
            Select a recipe to update or delete
          </p>
          <p>Total recipes: {recipes.length}</p>
        </div>
        <div>
          <Button color="success" endContent={<IconPlus />}>
            <Link href={"/addRecipe"}>Add a recipe</Link>
          </Button>
        </div>
      </div>
      <div className="grid-container">
        {recipes.map((recipe) => (
          // console.log(recipe.id),
          <Card className="py-4 max-w-sm" key={recipe.id}>
            <div className="flex justify-between align-middle">
              <div>
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                  <h4 className="font-bold text-large">{recipe.name}</h4>
                  <small className="text-default-500">
                    {recipe.description}
                  </small>
                </CardHeader>
              </div>
              <div className="flex flex-col pr-2 justify-center gap-y-1">
                <Tooltip showArrow={true} content="Delete the Recipe" closeDelay={0} >
                  <Button
                    isIconOnly
                    color="danger"
                    aria-label="Delete Recipe"
                    size="sm"
                    onClick={() => handleDeleteRecipe(recipe.id)}
                  >
                    <IconTrash />
                  </Button>
                </Tooltip>

                <Tooltip showArrow={true} content="Edit Recipe" closeDelay={0} >
                  <Button
                    isIconOnly
                    color="success"
                    aria-label="Edit Recipe"
                    size="sm"
                    onClick={() => handleSelectRecipe(recipe)}
                  >
                    <IconPencil />
                  </Button>
                </Tooltip>
              </div>
            </div>

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
      {selectedRecipe && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title</label>
            <input
              type="text"
              name="name"
              value={selectedRecipe.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Description</label>
            <textarea
              name="description"
              value={selectedRecipe.description}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Update Recipe</button>
        </form>
      )}
    </>
  );
};

export default Recipes;
