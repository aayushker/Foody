import React, { useState } from "react";
import { Input, Switch, Spacer } from "@nextui-org/react";

const NutritionalInfo = () => {
  const [showNutritionalInfo, setShowNutritionalInfo] = useState(false);
  const [calories, setCalories] = useState(0);
  const [protein, setProtein] = useState(0);
  const [fat, setFat] = useState(0);
  const [carbohydrates, setCarbohydrates] = useState(0);

  const handleToggleChange = () => {
    setShowNutritionalInfo(!showNutritionalInfo);
  };

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<number>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(Number(e.target.value));
    };

  const totalNutrients = calories + protein + fat + carbohydrates;

  return (
    <>
      <p className="text-black text-2xl font-semibold drop-shadow-md bg-clip-text animate-gradient">
        Nutritional Information 🍄
      </p>
      <p className="text-black text-md drop-shadow-md">
        Add some nutritional information to help your readers make informed
        decisions about their meals! 🥗
      </p>
      <Spacer y={1} />
      <p className="text-sm">PS: If you know the Nutritional value of the recipe then toggle the switch to add it or you can leave it</p>
      <Switch checked={showNutritionalInfo} onChange={handleToggleChange} >
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
