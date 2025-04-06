import React, { useState } from "react";
import axios from "axios";
import { Button, Progress } from "@nextui-org/react";
import { useRecipeInfo } from "@/app/components/context/RecipeInfoContext";
import { useIngredients } from "@/app/components/context/IngredientsContext";
import { useInstructions } from "@/app/components/context/InstructionsContext";
import { useNutritionalInfo } from "@/app/components/context/NutritionalInfoContext";
import { usePictures } from "@/app/components/context/PicturesContext";
import { useRouter } from "next/router";
import baseurl from "@/baseurl";

const Submit = () => {
  const { recipeInfo } = useRecipeInfo();
  const { ingredients } = useIngredients();
  const { instructions } = useInstructions();
  const { showNutritionalInfo, calories, protein, fat, carbohydrates } =
    useNutritionalInfo();
  const { mainImageUrl, cloudinaryUrls } = usePictures();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitProgress, setSubmitProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

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
      setError("Please fill all required fields");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccess(false);
    setSubmitProgress(10);

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
      main_image: mainImageUrl,
      additional_images: cloudinaryUrls,
    };

    setSubmitProgress(30);

    try {
      const response = await axios.post(
        `${baseurl}/api/addRecipe/`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total || 1)
            );
            setSubmitProgress(30 + (percentCompleted * 0.7)); // Scale from 30% to 100%
          },
        }
      );
      
      setSubmitProgress(100);
      setSuccess(true);
      console.log("Data submitted successfully:", response.data);
      
      // Redirect to the recipe page after a short delay
      setTimeout(() => {
        Router.push(`/recipe-details/${response.data.id}`);
      }, 2000);
      
    } catch (error) {
      console.error(
        "Error submitting data:",
        (error as any).response?.data || error
      );
      setError("Failed to submit recipe. Please try again.");
    } finally {
      setIsSubmitting(false);
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
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Recipe submitted successfully! Redirecting to your recipe page...
        </div>
      )}
      
      <Button 
        onClick={handleSubmit} 
        color="success" 
        className="max-w-md"
        isLoading={isSubmitting}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit Recipe"}
      </Button>
      
      {isSubmitting && (
        <div className="mt-4">
          <Progress 
            value={submitProgress} 
            color="success" 
            showValueLabel={true}
          />
          <p className="text-sm text-gray-500 mt-2">
            Submitting your recipe... {submitProgress}%
          </p>
        </div>
      )}
    </>
  );
};

export default Submit;
