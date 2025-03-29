import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Button,
  Textarea,
  Chip,
  Divider,
  Spinner,
  Image,
} from "@nextui-org/react";
import NavBar from "@/app/components/ui/NavBar";
import { 
  searchRecipesByQuery, 
  searchRecipesByIngredients,
  getRecipeDetails 
} from "@/app/fetchData";

interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
  steps: string[];
  minutes: number;
  description?: string;
  ingredient_match?: number;
}

const RecipeAssistant = () => {
  const [query, setQuery] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [currentIngredient, setCurrentIngredient] = useState("");
  const [response, setResponse] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("chat"); // 'chat' or 'ingredients'

  const handleAddIngredient = () => {
    if (currentIngredient.trim() !== "" && !ingredients.includes(currentIngredient.trim())) {
      setIngredients([...ingredients, currentIngredient.trim()]);
      setCurrentIngredient("");
    }
  };

  const handleRemoveIngredient = (ingredient: string) => {
    setIngredients(ingredients.filter((ing) => ing !== ingredient));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (activeTab === "chat") {
        handleChatSearch();
      } else {
        handleAddIngredient();
      }
    }
  };

  const handleChatSearch = async () => {
    if (query.trim() === "") {
      setError("Please enter a query");
      return;
    }

    setLoading(true);
    setError("");
    
    try {
      const data = await searchRecipesByQuery(query);
      setResponse(data.response);
      setRecipes(data.recipes);
    } catch (error) {
      console.error("Error searching recipes:", error);
      setError("Failed to search recipes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleIngredientSearch = async () => {
    if (ingredients.length === 0) {
      setError("Please add at least one ingredient");
      return;
    }

    setLoading(true);
    setError("");
    setResponse("");
    
    try {
      const data = await searchRecipesByIngredients(ingredients);
      setRecipes(data.recipes);
    } catch (error) {
      console.error("Error searching recipes:", error);
      setError("Failed to search recipes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleViewRecipe = async (recipeId: number) => {
    try {
      const recipeDetails = await getRecipeDetails(recipeId);
      // Open recipe details in a new window or update state to show details
      window.open(`/recipe-details/${recipeId}`, '_blank');
    } catch (error) {
      console.error("Error fetching recipe details:", error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="container mx-auto p-4 max-w-5xl">
        <Card className="p-4">
          <CardHeader className="flex gap-3">
            <div>
              <h1 className="text-2xl font-bold">Recipe Assistant</h1>
              <p className="text-default-500">
                Find recipes based on ingredients you have or ask questions about cooking
              </p>
            </div>
          </CardHeader>
          
          <CardBody>
            <div className="flex gap-2 mb-4">
              <Button 
                color={activeTab === "chat" ? "primary" : "default"}
                onClick={() => setActiveTab("chat")}
              >
                Chat Mode
              </Button>
              <Button 
                color={activeTab === "ingredients" ? "primary" : "default"} 
                onClick={() => setActiveTab("ingredients")}
              >
                Ingredients Mode
              </Button>
            </div>
            
            {activeTab === "chat" ? (
              <div>
                <Textarea
                  label="Ask about recipes or ingredients"
                  placeholder="What can I make with chicken, rice, and tomatoes?"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="mb-4"
                />
                <Button
                  color="primary"
                  onClick={handleChatSearch}
                  disabled={loading}
                  className="mb-4"
                >
                  {loading ? <Spinner size="sm" color="white" /> : "Search Recipes"}
                </Button>
              </div>
            ) : (
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {ingredients.map((ingredient) => (
                    <Chip
                      key={ingredient}
                      onClose={() => handleRemoveIngredient(ingredient)}
                      variant="flat"
                    >
                      {ingredient}
                    </Chip>
                  ))}
                </div>
                
                <div className="flex gap-2 mb-4">
                  <Input
                    label="Add ingredient"
                    placeholder="E.g., chicken, tomatoes, rice"
                    value={currentIngredient}
                    onChange={(e) => setCurrentIngredient(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="flex-grow"
                  />
                  <Button onClick={handleAddIngredient}>Add</Button>
                </div>
                
                <Button
                  color="primary"
                  onClick={handleIngredientSearch}
                  disabled={loading || ingredients.length === 0}
                  className="mb-4"
                >
                  {loading ? <Spinner size="sm" color="white" /> : "Find Recipes"}
                </Button>
              </div>
            )}
            
            {error && <p className="text-danger mb-4">{error}</p>}
            
            {response && (
              <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">AI Assistant</h3>
                <p>{response}</p>
              </div>
            )}
            
            {recipes.length > 0 && (
              <>
                <Divider className="my-4" />
                <h2 className="text-xl font-bold mb-4">Recommended Recipes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recipes.map((recipe) => (
                    <Card key={recipe.id} className="mb-4">
                      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                        <h4 className="font-bold text-large">{recipe.name}</h4>
                        {recipe.ingredient_match && (
                          <Chip color="success" variant="flat">
                            {recipe.ingredient_match.toFixed(0)}% match
                          </Chip>
                        )}
                        <small className="text-default-500">
                          {recipe.description || `Cooking time: ${recipe.minutes} minutes`}
                        </small>
                      </CardHeader>
                      
                      <CardBody className="py-2">
                        <h5 className="font-semibold">Ingredients:</h5>
                        <ul className="list-disc pl-5">
                          {recipe.ingredients.slice(0, 5).map((ing, idx) => (
                            <li key={idx}>{ing}</li>
                          ))}
                          {recipe.ingredients.length > 5 && (
                            <li>+ {recipe.ingredients.length - 5} more</li>
                          )}
                        </ul>
                      </CardBody>
                      
                      <CardFooter>
                        <Button 
                          size="sm" 
                          color="primary"
                          onClick={() => handleViewRecipe(recipe.id)}
                        >
                          View Full Recipe
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default RecipeAssistant; 