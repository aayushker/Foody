import axios from "axios";
import url from "@/baseurl";

const API_URL = url;

export const getUserData = async (token: any) => {
  const response = await axios.get(`${API_URL}/api/user/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateProfile = async (token: any, profileData: any) => {
  const response = await axios.put(
    `${API_URL}/api/user/profile/`,
    profileData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const updateCredentials = async (token: any, credentialsData: any) => {
  const response = await axios.put(
    `${API_URL}/api/user/credentials/`,
    credentialsData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getUserRecipes = async (token: any) => {
  const response = await axios.get(`${API_URL}/api/user/recipes/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateRecipe = async (
  token: any,
  recipeId: any,
  recipeData: any
) => {
  const response = await axios.put(
    `${API_URL}/api/user/recipe/${recipeId}/`,
    recipeData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const deleteRecipe = async (token: any, recipeId: number) => {
  const response = await axios.delete(
    `${API_URL}/api/user/recipe/${recipeId}/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};


export const fetchAllRecipes = async () => {
  const response = await axios.get(`${API_URL}/api/recipes/`);
  return response.data;
};

export const searchRecipesByQuery = async (query: string) => {
  const response = await axios.post(`${API_URL}/api/recipe-search/query/`, {
    query: query,
  });
  return response.data;
};

export const searchRecipesByIngredients = async (ingredients: string[]) => {
  const response = await axios.post(`${API_URL}/api/recipe-search/ingredients/`, {
    ingredients: ingredients,
  });
  return response.data;
};

export const getRecipeDetails = async (recipeId: number) => {
  const response = await axios.get(`${API_URL}/api/recipe-search/detail/${recipeId}/`);
  return response.data;
};

export const submitRecipeFeedback = async (token: string, recommendationId: number, feedback: any) => {
  const response = await axios.post(
    `${API_URL}/api/recipe-search/feedback/${recommendationId}/`,
    feedback,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};