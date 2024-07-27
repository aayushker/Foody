"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Checkbox,
  Input,
  Link,
} from "@nextui-org/react";
import { MailIcon } from "@/public/icons/MailIcon.jsx";
import { LockIcon } from "@/public/icons/LockIcon.jsx";
import { useAuth } from "@/app/AuthContext";

interface SignUpProps {
  isOpen: boolean;
  onClose: () => void;
}

const Register: React.FC<SignUpProps> = ({ isOpen, onClose }) => {
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    register(
      formData.username,
      formData.password,
      formData.email,
      formData.firstName,
      formData.lastName
    );
    onClose(); // Close the modal after signing up
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} placement="top-center">
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1">Sign Up</ModalHeader>
          <ModalBody>
            <form onSubmit={handleSignUp}>
              <Input
                autoFocus
                name="username"
                value={formData.username}
                onChange={handleChange}
                label="Username"
                placeholder="Enter your username"
                variant="bordered"
                description={"Username must be unique, 150 characters or fewer, letters, digits and @/./+/-/_ only."
                }

                
                
              />
              <Input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                label="First Name"
                placeholder="Enter your first name"
                variant="bordered"
              />
              <Input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                label="Last Name"
                placeholder="Enter your last name"
                variant="bordered"
              />
              <Input
                name="email"
                value={formData.email}
                onChange={handleChange}
                endContent={
                  <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                label="Email"
                placeholder="Enter your email"
                variant="bordered"
              />
              <Input
                name="password"
                value={formData.password}
                onChange={handleChange}
                endContent={
                  <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                label="Password"
                placeholder="Enter your password"
                type="password"
                variant="bordered"
              />
              <Input
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                endContent={
                  <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                label="Confirm Password"
                placeholder="Confirm your password"
                type="password"
                variant="bordered"
              />
              <div className="flex py-2 px-1 justify-between">
                <Checkbox
                  classNames={{
                    label: "text-small",
                  }}
                >
                  Remember me
                </Checkbox>
              </div>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" type="submit">
                  Sign Up
                </Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </>
      </ModalContent>
    </Modal>
  );
};

export default Register;
