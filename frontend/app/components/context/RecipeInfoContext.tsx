import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface RecipeInfo {
  name: string;
  description: string;
  totalTime: number;
  totalCalories: number;
  servings: number;
  tags: string;
  difficulty: string;
  cuisine: string;
}

interface RecipeInfoContextType {
  recipeInfo: RecipeInfo;
  setRecipeInfo: (value: RecipeInfo) => void;
}

const RecipeInfoContext = createContext<RecipeInfoContextType | undefined>(undefined);

export const RecipeInfoProvider = ({ children }: { children: ReactNode }) => {
  const [recipeInfo, setRecipeInfo] = useState<RecipeInfo>({
    name: "",
    description: "",
    totalTime: 0,
    totalCalories: 0,
    servings: 0,
    tags: "",
    difficulty: "",
    cuisine: "",
  });

  useEffect(() => {
    const savedRecipeInfo = localStorage.getItem("recipeInfo");
    if (savedRecipeInfo) setRecipeInfo(JSON.parse(savedRecipeInfo));
  }, []);

  useEffect(() => {
    localStorage.setItem("recipeInfo", JSON.stringify(recipeInfo));
  }, [recipeInfo]);

  return (
    <RecipeInfoContext.Provider value={{ recipeInfo, setRecipeInfo }}>
      {children}
    </RecipeInfoContext.Provider>
  );
}

export const useRecipeInfo = () => {
  const context = useContext(RecipeInfoContext);
  if (!context) {
    throw new Error("useRecipeInfo must be used within a RecipeInfoProvider");
  }
  return context;
}

export default RecipeInfoContext;
