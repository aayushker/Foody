import React, { useState, useEffect } from "react";
import { Input, Textarea, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { useRecipeInfo } from "../../context/RecipeInfoContext";

const RecipeInfo = () => {
  const { recipeInfo, setRecipeInfo } = useRecipeInfo();
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>(recipeInfo.difficulty);
  const [selectedCuisine, setSelectedCuisine] = useState<string>(recipeInfo.cuisine);

  useEffect(() => {
    setRecipeInfo({ ...recipeInfo, difficulty: selectedDifficulty, cuisine: selectedCuisine });
  }, [selectedDifficulty, selectedCuisine]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRecipeInfo({ ...recipeInfo, [name]: value });
  };

  return (
    <>
      <p className="text-black text-2xl font-semibold drop-shadow-md bg-clip-text animate-gradient">
        Add something tasty 😋
      </p>
      <p className="text-black text-md drop-shadow-md">
        Add some details to tell us what you're cooking up! 🍳
      </p>

      <Textarea
        isRequired
        label="Recipe Name"
        labelPlacement="outside-left"
        placeholder="Enter a tasty name for your recipe"
        className="max-w-md py-2"
        minRows={1}
        maxRows={1}
        name="name"
        value={recipeInfo.name}
        onChange={handleInputChange}
      />

      <Textarea
        isRequired
        label="Description"
        labelPlacement="outside-left"
        placeholder="Here, you can add a short and sweet catchy summary for your recipes to grab your readers' attention."
        className="max-w-lg py-2"
        minRows={5}
        name="description"
        value={recipeInfo.description}
        onChange={handleInputChange}
      />

      <Input
        isRequired
        type="number"
        label="Total Time"
        placeholder="0"
        labelPlacement="outside-left"
        startContent={<div className="pointer-events-none flex items-center"><span className="text-default-400 text-small">Minutes</span></div>}
        maxLength={1}
        width={1}
        className="max-w-xs py-2"
        description="Please add the total time in minutes (Required)"
        name="totalTime"
        value={recipeInfo.totalTime.toString()}
        onChange={handleInputChange}
      />

      <Input
        type="number"
        label="Total Calories"
        placeholder="0"
        labelPlacement="outside-left"
        startContent={<div className="pointer-events-none flex items-center"><span className="text-default-400 text-small">Calories</span></div>}
        maxLength={1}
        width={1}
        className="max-w-xs py-2"
        description="Please add the total calories (Optional)"
        name="totalCalories"
        value={recipeInfo.totalCalories.toString()}
        onChange={handleInputChange}
      />

      <Input
        isRequired
        type="number"
        label="Servings"
        placeholder="0"
        labelPlacement="outside-left"
        maxLength={1}
        width={1}
        className="max-w-xs py-2" 
        description="Please tell the total servings (Required)"
        name="servings"
        value={recipeInfo.servings.toString()}
        onChange={handleInputChange}
      />

      <Textarea
        isRequired
        label="Tags"
        labelPlacement="outside-left"
        placeholder="Add some tags to help your readers find your recipe"
        className="max-w-lg py-2"
        minRows={3}
        name="tags"
        value={recipeInfo.tags}
        onChange={handleInputChange}
      />

      <p>Difficulty Level</p>
      <div className="px-16 py-1">
        <Dropdown className="w-10" dir="top-left">
          <DropdownTrigger>
            <Button variant="bordered" className="capitalize">
              {selectedDifficulty || "Select Difficulty"}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            variant="flat"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={new Set([selectedDifficulty])}
            onSelectionChange={(keys) => setSelectedDifficulty(Array.from(keys)[0].toString())}
          >
            <DropdownItem key="Beginner">Beginner</DropdownItem>
            <DropdownItem key="Intermediate">Intermediate</DropdownItem>
            <DropdownItem key="Advanced">Advanced</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      <p>Types of Cuisine</p>
      <div className="px-16 py-1">
        <Dropdown className="w-10" dir="top-left">
          <DropdownTrigger>
            <Button variant="bordered" className="capitalize">
              {selectedCuisine || "Select Cuisine"}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            variant="flat"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={new Set([selectedCuisine])}
            onSelectionChange={(keys) => setSelectedCuisine(Array.from(keys)[0].toString())}
          >
            <DropdownItem key="Indian">Indian Cuisine</DropdownItem>
            <DropdownItem key="Italian">Italian Cuisine</DropdownItem>
            <DropdownItem key="Japanese">Japanese Cuisine</DropdownItem>
            <DropdownItem key="Thai">Thai Cuisine</DropdownItem>
            <DropdownItem key="French">French Cuisine</DropdownItem>
            <DropdownItem key="Mexican">Mexican Cuisine</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </>
  );
};

export default RecipeInfo;
