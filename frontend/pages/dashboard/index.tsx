import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/app/AuthContext';
import { getUserRecipes, getUserData } from '@/app/fetchData';
import SkeletonLoader from '@/app/components/ui/SkeletonLoader';
import '@/app/globals.css';

interface Recipe {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
  cooking_time: number;
  difficulty: string;
}

interface UserProfile {
  username: string;
  saved_recipes: Recipe[];
  total_views: number;
}

const DashboardPage = () => {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [userRecipes, setUserRecipes] = useState<Recipe[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      if (!user) return;
      
      const token = localStorage.getItem('token');
      if (!token) return;
      
      try {
        setLoading(true);
        const [recipesData, profileData] = await Promise.all([
          getUserRecipes(token),
          getUserData(token)
        ]);
        
        setUserRecipes(recipesData);
        setUserProfile(profileData);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [user]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SkeletonLoader type="dashboard-card" count={3} />
          </div>
          <div className="mt-8">
            <SkeletonLoader type="recipe-card" count={4} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" />
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    router.push('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {userProfile?.username || 'Chef'}!
          </h1>
          <p className="text-gray-600">
            Here's what's happening in your kitchen today.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Recipes</h3>
            <p className="text-3xl font-bold text-indigo-600">{userRecipes.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Saved Recipes</h3>
            <p className="text-3xl font-bold text-indigo-600">{userProfile?.saved_recipes?.length || 0}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Views</h3>
            <p className="text-3xl font-bold text-indigo-600">{userProfile?.total_views || 0}</p>
          </div>
        </div>

        {/* Recent Recipes */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Recent Recipes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userRecipes.map((recipe) => (
              <div key={recipe.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
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
      </div>
    </div>
  );
};

export default DashboardPage; 