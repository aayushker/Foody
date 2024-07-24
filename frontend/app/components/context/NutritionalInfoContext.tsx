import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface NutritionalInfoContextType {
  showNutritionalInfo: boolean;
  setShowNutritionalInfo: (value: boolean) => void;
  calories: number;
  setCalories: (value: number) => void;
  protein: number;
  setProtein: (value: number) => void;
  fat: number;
  setFat: (value: number) => void;
  carbohydrates: number;
  setCarbohydrates: (value: number) => void;
}

const NutritionalInfoContext = createContext<NutritionalInfoContextType | undefined>(undefined);

export const NutritionalInfoProvider = ({ children }: { children: ReactNode }) => {
  const [showNutritionalInfo, setShowNutritionalInfo] = useState<boolean>(false);
  const [calories, setCalories] = useState<number>(0);
  const [protein, setProtein] = useState<number>(0);
  const [fat, setFat] = useState<number>(0);
  const [carbohydrates, setCarbohydrates] = useState<number>(0);

  useEffect(() => {
    const savedShowNutritionalInfo = localStorage.getItem("showNutritionalInfo");
    const savedCalories = localStorage.getItem("calories");
    const savedProtein = localStorage.getItem("protein");
    const savedFat = localStorage.getItem("fat");
    const savedCarbohydrates = localStorage.getItem("carbohydrates");

    if (savedShowNutritionalInfo) setShowNutritionalInfo(JSON.parse(savedShowNutritionalInfo));
    if (savedCalories) setCalories(JSON.parse(savedCalories));
    if (savedProtein) setProtein(JSON.parse(savedProtein));
    if (savedFat) setFat(JSON.parse(savedFat));
    if (savedCarbohydrates) setCarbohydrates(JSON.parse(savedCarbohydrates));
  }, []);

  useEffect(() => {
    localStorage.setItem("showNutritionalInfo", JSON.stringify(showNutritionalInfo));
  }, [showNutritionalInfo]);

  useEffect(() => {
    localStorage.setItem("calories", JSON.stringify(calories));
  }, [calories]);

  useEffect(() => {
    localStorage.setItem("protein", JSON.stringify(protein));
  }, [protein]);

  useEffect(() => {
    localStorage.setItem("fat", JSON.stringify(fat));
  }, [fat]);

  useEffect(() => {
    localStorage.setItem("carbohydrates", JSON.stringify(carbohydrates));
  }, [carbohydrates]);

  return (
    <NutritionalInfoContext.Provider
      value={{
        showNutritionalInfo,
        setShowNutritionalInfo,
        calories,
        setCalories,
        protein,
        setProtein,
        fat,
        setFat,
        carbohydrates,
        setCarbohydrates,
      }}
    >
      {children}
    </NutritionalInfoContext.Provider>
  );
};

export const useNutritionalInfo = () => {
  const context = useContext(NutritionalInfoContext);
  if (context === undefined) {
    throw new Error("useNutritionalInfo must be used within a NutritionalInfoProvider");
  }
  return context;
};
