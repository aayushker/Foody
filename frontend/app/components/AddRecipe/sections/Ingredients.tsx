"use client";
import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import { useIngredients } from "@/app/components/context/IngredientsContext";

const Ingredients = () => {
  const { ingredients, setIngredients } = useIngredients();

  const [newIngredient, setNewIngredient] = useState({
    quantity: "",
    unit: "",
    ingredient: "",
    notes: "",
  });

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setNewIngredient({
      ...newIngredient,
      [name]: value,
    });
  };

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const addIngredient = () => {
    if (
      !newIngredient.quantity ||
      !newIngredient.unit ||
      !newIngredient.ingredient
    ) {
      setIsPopoverOpen(true);
      return;
    }

    setIngredients([...ingredients, newIngredient]);
    setNewIngredient({
      quantity: "",
      unit: "",
      ingredient: "",
      notes: "",
    });
    setIsPopoverOpen(false);
  };

  const removeIngredient = (index: number) => {
    const updatedIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(updatedIngredients);
  };

  return (
    <>
      <p className="text-black dark:text-white text-2xl font-semibold drop-shadow-md bg-clip-text animate-gradient">
        Ingredients 🥦
      </p>
      <p className="text-black dark:text-gray-300 text-md drop-shadow-md">
        Add ingredients to your recipe! 🍽
      </p>

      <div className="flex gap-2 mb-4">
        <Input
          isClearable
          isRequired
          label="Quantity"
          placeholder="Enter quantity"
          name="quantity"
          value={newIngredient.quantity}
          onChange={handleInputChange}
        />
        <Input
          isClearable
          isRequired
          label="Unit"
          placeholder="Enter unit"
          name="unit"
          value={newIngredient.unit}
          onChange={handleInputChange}
        />
        <Input
          isClearable
          isRequired
          label="Ingredient"
          placeholder="Enter ingredient"
          name="ingredient"
          value={newIngredient.ingredient}
          onChange={handleInputChange}
        />
        <Input
          isClearable
          label="Notes"
          placeholder="Enter notes"
          name="notes"
          value={newIngredient.notes}
          onChange={handleInputChange}
        />
        <Button onClick={addIngredient} color="success" className="h-18">
          Add
        </Button>
      </div>

      <Popover
        isOpen={isPopoverOpen}
        onOpenChange={(open) => setIsPopoverOpen(open)}
        color="warning"
      >
        <PopoverTrigger>
          <Button className="hidden">Trigger</Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="px-1 py-2">
            <div className="text-small font-bold">Validation Error</div>
            <div className="text-tiny">Please fill in all required fields.</div>
          </div>
        </PopoverContent>
      </Popover>

      <Table isStriped aria-label="Ingredients table">
        <TableHeader>
          <TableColumn>#</TableColumn>
          <TableColumn>Quantity</TableColumn>
          <TableColumn>Unit</TableColumn>
          <TableColumn>Ingredient</TableColumn>
          <TableColumn>Notes</TableColumn>
          <TableColumn style={{ width: "100px" }}>Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {ingredients.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.unit}</TableCell>
              <TableCell>{item.ingredient}</TableCell>
              <TableCell>{item.notes}</TableCell>
              <TableCell>
                <span>
                  <Button
                    onClick={() => removeIngredient(index)}
                    color="danger"
                    className="w-max-sm"
                  >
                    Delete
                  </Button>
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default Ingredients;
