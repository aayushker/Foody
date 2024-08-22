import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";

const FAQs = () => {
  return (
    <Accordion variant="splitted">
      <AccordionItem key="1" aria-label="What is this platform about?" title="What is this platform about?">
        This platform is designed to help users discover, share, and create amazing recipes from around the world. It's a community-driven space where culinary enthusiasts can connect and learn from one another.
      </AccordionItem>
      <AccordionItem key="2" aria-label="How do I submit my own recipes?" title="How do I submit my own recipes?">
        You can submit your own recipes by creating an account and navigating to the 'Add Recipe' section on your dashboard. Fill in the necessary details, upload images, and hit submit. Your recipe will be visible to the community once it's approved.
      </AccordionItem>
      <AccordionItem key="3" aria-label="Is there a way to save my favorite recipes?" title="Is there a way to save my favorite recipes?">
        Yes, you can save your favorite recipes by clicking the 'Save' button on any recipe page. You can view all your saved recipes in the 'Favorites' section of your profile.
      </AccordionItem>
      <AccordionItem key="4" aria-label="Can I edit or delete my recipes after submission?" title="Can I edit or delete my recipes after submission?">
        Absolutely! You can edit or delete your recipes by going to the 'My Recipes' section in your dashboard. Just click on the recipe you want to modify and make the necessary changes.
      </AccordionItem>
      <AccordionItem key="5" aria-label="How do I report a problem with a recipe?" title="How do I report a problem with a recipe?">
        If you encounter an issue with a recipe, such as incorrect information or inappropriate content, you can report it by clicking the 'Report' button on the recipe page. Our team will review the report and take appropriate action.
      </AccordionItem>
    </Accordion>
  );
};

export default FAQs;
