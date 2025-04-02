import React from 'react'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getUserData, getUserRecipes } from '@/app/fetchData';
import SkeletonLoader from '@/app/components/ui/SkeletonLoader';
import Link from 'next/link';

interface UserData {
  username: string;
  email: string;
  saved_recipes: number;
  total_views: number;
}

interface Recipe {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
  cooking_time: number;
  difficulty: string;
}

const UserDashboard = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [userRecipes, setUserRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [profileData, recipesData] = await Promise.all([
          getUserData(token),
          getUserRecipes(token)
        ]);
        
        setUserData({
          username: profileData.username,
          email: profileData.email,
          saved_recipes: profileData.saved_recipes?.length || 0,
          total_views: profileData.total_views || 0
        });
        setUserRecipes(recipesData);
      } catch (error) {
        console.error('Error fetching user data', error);
        setError('Failed to load dashboard data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [router]);

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <SkeletonLoader type="profile-card" count={1} />
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <SkeletonLoader type="dashboard-card" count={3} />
        </div>
        <div className="mt-8">
          <SkeletonLoader type="recipe-card" count={3} className="grid grid-cols-1 md:grid-cols-3 gap-6" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  if (!userData) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Welcome Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {userData.username}!
        </h1>
        <p className="text-gray-600">
          Here's what's happening in your kitchen today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-indigo-500">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Recipes</h3>
          <p className="text-3xl font-bold text-indigo-600">{userRecipes.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-indigo-500">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Saved Recipes</h3>
          <p className="text-3xl font-bold text-indigo-600">{userData.saved_recipes}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-indigo-500">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Views</h3>
          <p className="text-3xl font-bold text-indigo-600">{userData.total_views}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link href="/recipe-assistant" className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <span className="text-lg font-medium text-gray-900">Recipe Assistant</span>
        </Link>

        <Link href="/addRecipe" className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span className="text-lg font-medium text-gray-900">Create Recipe</span>
        </Link>

        <Link href="/explore" className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="text-lg font-medium text-gray-900">Explore Recipes</span>
        </Link>
      </div>

      {/* Recent Recipes */}
      {userRecipes.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Recent Recipes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {userRecipes.slice(0, 3).map((recipe) => (
              <div key={recipe.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <img
                    src={recipe.image || '/placeholder-recipe.jpg'}
                    alt={recipe.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <span className="bg-indigo-600 text-white px-2 py-1 rounded-full text-sm">
                      {recipe.category}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{recipe.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{recipe.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-500 text-sm">
                        {recipe.cooking_time} mins
                      </span>
                      <span className="text-gray-500 text-sm">•</span>
                      <span className="text-gray-500 text-sm">
                        {recipe.difficulty}
                      </span>
                    </div>
                    <button
                      onClick={() => router.push(`/recipe-details/${recipe.id}`)}
                      className="text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                      View Recipe
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserDashboard
