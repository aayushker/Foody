import React, { useEffect } from "react";
import { Input, Switch, Spacer } from "@nextui-org/react";
import { useNutritionalInfo } from "@/app/components/context/NutritionalInfoContext";

// known issue: the button state is not preserving

const NutritionalInfo = () => {
  const {
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
  } = useNutritionalInfo();

  // Effect to load the initial state from localStorage
  useEffect(() => {
    const storedShowNutritionalInfo = localStorage.getItem(
      "showNutritionalInfo"
    );
    if (storedShowNutritionalInfo) {
      setShowNutritionalInfo(JSON.parse(storedShowNutritionalInfo));
    }
  }, [setShowNutritionalInfo]);

  // Effect to save the state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(
      "showNutritionalInfo",
      JSON.stringify(showNutritionalInfo)
    );
  }, [showNutritionalInfo]);

  const handleToggleChange = () => {
    setShowNutritionalInfo(!showNutritionalInfo);
  };

  const handleInputChange =
    (setter: (value: number) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(Number(e.target.value));
    };

  return (
    <>
      <p className="text-black dark:text-white text-2xl font-semibold drop-shadow-md bg-clip-text animate-gradient">
        Nutritional Information 🍄
      </p>
      <p className="text-black dark:text-gray-300 text-md drop-shadow-md">
        Add some nutritional information to help your readers make informed
        decisions about their meals! 🥗
      </p>
      <Spacer y={1} />
      <p className="text-sm">
        PS: If you know the Nutritional value of the recipe then toggle the
        switch to add it or you can leave it
      </p>
      <Switch checked={showNutritionalInfo} onChange={handleToggleChange}>
        Show Nutritional Information
      </Switch>
      <Spacer y={1} />
      {showNutritionalInfo && (
        <>
          <Input
            type="number"
            label="Calories"
            value={calories.toString()}
            onChange={handleInputChange(setCalories)}
            className="w-max-sm"
          />
          <Spacer y={1} />
          <Input
            type="number"
            label="Protein (g)"
            value={protein.toString()}
            onChange={handleInputChange(setProtein)}
          />
          <Spacer y={1} />
          <Input
            type="number"
            label="Fat (g)"
            value={fat.toString()}
            onChange={handleInputChange(setFat)}
            className="w-max-sm"
          />
          <Spacer y={1} />
          <Input
            type="number"
            label="Carbohydrates (g)"
            value={carbohydrates.toString()}
            onChange={handleInputChange(setCarbohydrates)}
            className="w-max-sm"
          />
          <Spacer y={2} />
        </>
      )}
    </>
  );
};

export default NutritionalInfo;
