import { useState } from "react";
import SkeletonLoader from "@/app/components/ui/SkeletonLoader";
import "@/app/globals.css";

const HelpSupportPage = () => {
  const [loading] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <SkeletonLoader type="text" count={3} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Help & Support
          </h1>

          {/* FAQ Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  How do I find recipes?
                </h3>
                <p className="text-gray-600">
                  You can find recipes in several ways:
                </p>
                <ul className="list-disc list-inside text-gray-600 mt-2">
                  <li>Use the search bar to find specific recipes</li>
                  <li>Browse the explore section for curated recipes</li>
                  <li>
                    Use the Recipe Assistant to find recipes based on
                    ingredients you have
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  How do I save recipes?
                </h3>
                <p className="text-gray-600">To save a recipe:</p>
                <ul className="list-disc list-inside text-gray-600 mt-2">
                  <li>Navigate to the recipe you want to save</li>
                  <li>Click the "Save Recipe" button</li>
                  <li>Find your saved recipes in your profile dashboard</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  How do I create my own recipe?
                </h3>
                <p className="text-gray-600">To create a recipe:</p>
                <ul className="list-disc list-inside text-gray-600 mt-2">
                  <li>
                    Click the "Create Recipe" button in the navigation bar
                  </li>
                  <li>
                    Fill in the recipe details, including ingredients and
                    instructions
                  </li>
                  <li>Add photos and nutritional information</li>
                  <li>
                    Click "Publish" to share your recipe with the community
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Support */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Contact Support
            </h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-600 mb-4">
                Need more help? Our support team is here for you.
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Email Support
                  </h3>
                  <p className="text-gray-600">
                    Send us an email at{" "}
                    <a
                      href="mailto:support@foody.com"
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      support@foody.com
                    </a>
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Response Time
                  </h3>
                  <p className="text-gray-600">
                    We typically respond to support requests within 24-48 hours.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Community Forums
                  </h3>
                  <p className="text-gray-600">
                    Join our community forums to connect with other users and
                    share experiences.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSupportPage;
