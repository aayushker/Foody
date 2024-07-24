import React from 'react';
import axios from 'axios';
import { useRecipeInfo } from '../../context/RecipeInfoContext';
import { useIngredients } from '../../context/IngredientsContext';
import { useInstructions } from '../../context/InstructionsContext';
import { usePictures } from '../../context/PicturesContext';
import { useNutritionalInfo } from '../../context/NutritionalInfoContext';

const Submit = () => {
  const { recipeInfo } = useRecipeInfo();
  const { ingredients } = useIngredients();
  const { instructions } = useInstructions();
  const { images, mainImage } = usePictures();
  const {
    showNutritionalInfo,
    calories,
    protein,
    fat,
    carbohydrates,
  } = useNutritionalInfo();

  const validateData = () => {
    if (!recipeInfo.name || !recipeInfo.description || !recipeInfo.totalTime || !recipeInfo.totalCalories || !recipeInfo.servings || !recipeInfo.tags || !recipeInfo.difficulty || !recipeInfo.cuisine) {
      return false;
    }
    if (ingredients.length === 0) {
      return false;
    }
    if (!instructions) {
      return false;
    }
    if (images.length === 0 || !mainImage) {
      return false;
    }
    if (showNutritionalInfo && (!calories || !protein || !fat || !carbohydrates)) {
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateData()) {
      alert('Please fill all required fields');
      return;
    }

    const data = {
      recipeInfo,
      ingredients,
      instructions,
      images,
      mainImage,
      nutritionalInfo: showNutritionalInfo
        ? { calories, protein, fat, carbohydrates }
        : null,
    };

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/addRecipe', data);
      console.log('Data submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <>
       <p className="text-black text-2xl font-semibold drop-shadow-md bg-clip-text animate-gradient">
        Submit 🚀
      </p>
      <p className="text-black text-md drop-shadow-md">
        Submit your recipe to share it with the world! 🌍
      </p>
      <button onClick={handleSubmit}>Submit Recipe</button>
    </>
  );
};

export default Submit;
