import React from "react";
import axios from "axios";
import { Button } from "@nextui-org/react";
import { useRecipeInfo } from "@/app/components/context/RecipeInfoContext";
import { useIngredients } from "@/app/components/context/IngredientsContext";
import { useInstructions } from "@/app/components/context/InstructionsContext";
import { useNutritionalInfo } from "@/app/components/context/NutritionalInfoContext";
import { useRouter } from "next/router";
import baseurl from "@/baseurl";

const Submit = () => {
  const { recipeInfo } = useRecipeInfo();
  const { ingredients } = useIngredients();
  const { instructions } = useInstructions();
  const { showNutritionalInfo, calories, protein, fat, carbohydrates } =
    useNutritionalInfo();

  const Router = useRouter();

  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login to submit a recipe");
    Router.push("/");
    return null;
  }
  const validateData = () => {
    if (
      !recipeInfo.name ||
      !recipeInfo.description ||
      !recipeInfo.totalTime ||
      !recipeInfo.totalCalories ||
      !recipeInfo.servings ||
      !recipeInfo.tags ||
      !recipeInfo.difficulty ||
      !recipeInfo.cuisine
    ) {
      return false;
    }
    if (ingredients.length === 0) {
      return false;
    }
    if (!instructions) {
      return false;
    }
    if (
      showNutritionalInfo &&
      (!calories || !protein || !fat || !carbohydrates)
    ) {
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateData()) {
      alert("Please fill all required fields");
      return;
    }

    const data = {
      name: recipeInfo.name,
      description: recipeInfo.description,
      total_time: recipeInfo.totalTime,
      total_calories: recipeInfo.totalCalories,
      servings: recipeInfo.servings,
      tags: recipeInfo.tags,
      difficulty: recipeInfo.difficulty,
      cuisine: recipeInfo.cuisine,
      ingredients: ingredients.map((ingredient) => ({
        quantity: ingredient.quantity,
        unit: ingredient.unit,
        ingredient: ingredient.ingredient,
        notes: ingredient.notes,
      })),
      instructions: instructions,
      nutritional_info: {
        calories,
        protein,
        fat,
        carbohydrates,
      },
    };

    console.log("Data to submit:", data);

    try {
      const response = await axios.post(
        // "http://127.0.0.1:8000/api/addRecipe/",
        `${baseurl}/api/addRecipe/`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Data submitted successfully:", response.data);
    } catch (error) {
      console.error(
        "Error submitting data:",
        (error as any).response?.data || error
      );
    }
  };

  return (
    <>
      <p className="text-black dark:text-white text-2xl font-semibold drop-shadow-md bg-clip-text animate-gradient">
        Submit 🚀
      </p>
      <p className="text-black dark:text-gray-300 text-md drop-shadow-md">
        Submit your recipe to share it with the world! 🌍
      </p>
      <Button onClick={handleSubmit} color="success" className="max-w-md">
        Submit Recipe
      </Button>
    </>
  );
};

export default Submit;
