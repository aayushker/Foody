import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface Ingredient {
  quantity: string;
  unit: string;
  ingredient: string;
  notes: string;
}

interface IngredientsContextType {
  ingredients: Ingredient[];
  setIngredients: (value: Ingredient[]) => void;
}

const IngredientsContext = createContext<IngredientsContextType | undefined>(undefined);

export const IngredientsProvider = ({ children }: { children: ReactNode }) => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    const savedIngredients = localStorage.getItem("ingredients");
    if (savedIngredients) setIngredients(JSON.parse(savedIngredients));
  }, []);

  useEffect(() => {
    localStorage.setItem("ingredients", JSON.stringify(ingredients));
  }, [ingredients]);

  return (
    <IngredientsContext.Provider value={{ ingredients, setIngredients }}>
      {children}
    </IngredientsContext.Provider>
  );
}

export const useIngredients = () => {
  const context = useContext(IngredientsContext);
  if (!context) {
    throw new Error("useIngredients must be used within an IngredientsProvider");
  }
  return context;
}

export default IngredientsContext;
