import { SetStateAction, useEffect, useState } from 'react';
import { getUserRecipes, updateRecipe } from '@/app/fetchData';
import { useRouter } from 'next/router';
import axios from 'axios';

interface Recipe {
  id: number;
  name: string;
  description: string;
  cuisine: string;
  difficulty: string;
  ingredients: Array<{ quantity: string, unit: string, ingredient: string, notes: string }>;
  instructions: string;
  servings: number;
  tags: string;
  total_calories: number;
  total_time: number;
}

const Recipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/');
      return;
    }
    const fetchData = async () => {
      try {
        const data = await getUserRecipes(token);
        console.log('Fetched recipes:', data);
        setRecipes(data);
      } catch (error) {
        console.error('Error fetching recipes', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [router]);

  const handleSelectRecipe = (recipe: Recipe | null) => {
    setSelectedRecipe(recipe);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSelectedRecipe((prevRecipe) => {
      if (!prevRecipe) return null;
      return {
        ...prevRecipe,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert('No token found');
      return;
    }
    try {
      const updatedRecipe = await updateRecipe(token, selectedRecipe!.id, selectedRecipe!);
      alert('Recipe updated successfully');
      setSelectedRecipe(null);
      setIsLoading(true);
      const data = await getUserRecipes(token);
      setRecipes(data);
    } catch (error) {
      console.error('Error updating recipe', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Your Recipes</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id} onClick={() => handleSelectRecipe(recipe)}>
            {recipe.name}
          </li>
        ))}
      </ul>
      {selectedRecipe && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title</label>
            <input
              type="text"
              name="name"
              value={selectedRecipe.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Description</label>
            <textarea
              name="description"
              value={selectedRecipe.description}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Update Recipe</button>
        </form>
      )}
    </div>
  );
};

export default Recipes;
