"use client";
import React, { useState } from "react";
import Contact from "../../Landing/Contact";
import axios from "axios";
import url from "@/baseurl";
import SkeletonLoader from '@/app/components/ui/SkeletonLoader';

const HelpSupport = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isLoading] = useState(false);

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${url}/api/smtp/`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data.status === "success") {
        resetForm();
        alert("Feedback submitted successfully!");
      } else {
        alert("Error submitting feedback");
      }
    } catch (error) {
      console.error("There was an error!", error);
      alert("Error submitting feedback");
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <SkeletonLoader type="text" count={4} />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Help & Support</h1>

      {/* FAQ Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-2">How do I use the Recipe Assistant?</h3>
            <p className="text-gray-600">
              The Recipe Assistant helps you find recipes based on:
            </p>
            <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
              <li>Ingredients you have</li>
              <li>Dietary preferences</li>
              <li>Cooking time constraints</li>
              <li>Skill level requirements</li>
            </ul>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-2">How do I manage my recipes?</h3>
            <p className="text-gray-600">
              You can manage your recipes by:
            </p>
            <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
              <li>Creating new recipes from the dashboard</li>
              <li>Editing existing recipes</li>
              <li>Organizing recipes into collections</li>
              <li>Sharing recipes with the community</li>
            </ul>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Account Settings & Privacy</h3>
            <p className="text-gray-600">
              Learn about managing your account:
            </p>
            <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
              <li>Updating profile information</li>
              <li>Changing password and security settings</li>
              <li>Privacy controls for your recipes</li>
              <li>Managing email notifications</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Contact Support Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Support</h2>
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Email Support</h3>
              <p className="text-gray-600 mb-2">
                For general inquiries and support:
              </p>
              <a 
                href="mailto:support@foody.com" 
                className="text-indigo-600 hover:text-indigo-800 font-medium"
              >
                support@foody.com
              </a>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Response Time</h3>
              <p className="text-gray-600">
                We typically respond within 24-48 hours during business days.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Community Guidelines */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Community Guidelines</h2>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-gray-600 mb-4">
            To ensure a positive experience for all users, please follow our community guidelines:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Be respectful and supportive of other community members</li>
            <li>Share authentic and original recipes</li>
            <li>Provide accurate ingredient measurements and instructions</li>
            <li>Use appropriate language and content</li>
            <li>Report any inappropriate content or behavior</li>
          </ul>
        </div>
      </div>

      <div className="flex justify-around px-10 py-10 space-x-10">
        <div className="flex-1 max-w-lg mx-auto my-10 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
            Contact Us
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                rows={4}
                required
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;
