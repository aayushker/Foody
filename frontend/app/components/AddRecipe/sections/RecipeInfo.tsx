import React from "react";
import { Input, Textarea, TimeInput } from "@nextui-org/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { set } from "jodit/types/core/helpers";

const RecipeInfo = () => {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["select"]));

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

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
        className="max-w-md p-6"
        minRows={1}
        maxRows={1}
      />

      <Textarea
        isRequired
        label="Description"
        labelPlacement="outside-left"
        placeholder="Here, you can add a short and sweet catchy summary for your recipes to grab your readers attention."
        className="max-w-lg p-6"
        minRows={5}
      />

      <Input
        isRequired
        type="number"
        label="Total Time"
        placeholder="0"
        labelPlacement="outside-left"
        startContent={
          <div className="pointer-events-none flex items-center">
            <span className="text-default-400 text-small">Minutes</span>
          </div>
        }
        maxLength={1}
        width={1}
        className="max-w-xs p-6"
        description="Please add the total time in minutes (Required)"
      />

      <Input
        type="number"
        label="Total Calories"
        placeholder="0"
        labelPlacement="outside-left"
        startContent={
          <div className="pointer-events-none flex items-center">
            <span className="text-default-400 text-small">Calories</span>
          </div>
        }
        maxLength={1}
        width={1}
        className="max-w-xs p-6"
        description="Please add the total calories (Optional)"
      />

      <Input
        isRequired
        type="number"
        label="Servings"
        placeholder="0"
        labelPlacement="outside-left"
        maxLength={1}
        width={1}
        className="max-w-xs p-6"
        description="Please tell the total servings (Required)"
      />

      <p>Difficulty Level</p>
      <div className="px-16 py-2">
        <Dropdown className=" w-10 " dir="top-left">
          <DropdownTrigger>
            <Button variant="bordered" className="capitalize">
              {selectedValue}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Single selection example"
            variant="flat"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys}
          >
            <DropdownItem key="Beginner">Beginner</DropdownItem>
            <DropdownItem key="Intermediate">Intermediate</DropdownItem>
            <DropdownItem key="Advanced">Advanced</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </>
  );
};

export default RecipeInfo;
