"use client";
import axios from "axios";
import React, { useState } from "react";
import url from "@/baseurl";
import {
  Card,
  Input,
  Button,
  Divider,
  Image,
  Textarea,
  Spinner,
} from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

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

    setLoading(true);

    try {
      const response = await axios.post(`${url}/api/smtp/`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.status === "success") {
        resetForm();
        toast.success("Feedback submitted successfully!", {
          position: "bottom-right",
        });
      }
    } catch (error: any) {
      if (error.response) {
        const errorMessage =
          error.response.data.error || "Error submitting feedback";
        toast.error(errorMessage, {
          position: "bottom-right",
        });
      } else {
        toast.error("Network error. Please try again later.", {
          position: "bottom-right",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <Card fullWidth className="max-w-screen-xl mx-auto p-6 my-12">
        <div className="flex flex-col lg:flex-row items-center lg:items-start">
          <Divider orientation="vertical" className="hidden lg:block mx-4" />

          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end p-4">
            <Image src="/images/contact.png" height={400} />
          </div>
          <div className="w-full lg:w-1/2 max-w-md p-4">
            <Input
              fullWidth
              size="lg"
              type="text"
              label="Name"
              placeholder="Enter your Name"
              className="mb-4"
              // value={formData.name}
              onChange={handleChange}
            />
            <Input
              fullWidth
              size="lg"
              type="email"
              label="Email"
              placeholder="Enter your Email"
              className="mb-4"
              // value={formData.email}
              onChange={handleChange}
            />
            <Input
              fullWidth
              size="lg"
              type="text"
              label="Subject"
              placeholder="Enter your Subject"
              className="mb-4"
              // value={formData.subject}
              onChange={handleChange}
            />
            <Textarea
              fullWidth
              size="lg"
              type="text"
              label="Message"
              placeholder="Enter your Feedback"
              className="mb-4"
              rows={4}
              // value={formData.message}
              onChange={handleChange}
            />
            <div className="flex justify-center align-middle">
              <Button
                className="mt-4 hover:bg-green-400"
                type="submit"
                onClick={handleSubmit}
                onSubmit={handleSubmit}
                disabled={loading}
              >
                {loading ? <Spinner /> : "Submit"}
              </Button>
            </div>
          </div>
        </div>

        <Divider className="block lg:hidden my-4" />
      </Card>
    </>
  );
};
export default Contact;
