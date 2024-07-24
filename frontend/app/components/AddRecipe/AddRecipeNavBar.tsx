"use client";
import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Button,
} from "@nextui-org/react";
import { useAuth } from "../../AuthContext";
import SignIn from "../ui/auth/SignIn";
import SignUp from "../ui/auth/SignUp";
import { ChevronDown } from "@/public/icons/Icons";

const AddRecipeNavBar: React.FC = () => {
  const { isLogged, signOut } = useAuth();
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const handleSignInOpen = () => {
    setIsSignInOpen(true);
  };

  const handleSignInClose = () => {
    setIsSignInOpen(false);
  };

  const handleSignUpOpen = () => {
    setIsSignUpOpen(true);
  };

  const handleSignUpClose = () => {
    setIsSignUpOpen(false);
  };

  const icons = {
    chevron: (
      <ChevronDown fill="currentColor" size={16} height={16} width={16} />
    ),
  };

  return (
    <>
      <Navbar maxWidth="full">
        <NavbarBrand>
          <Link href="/">
            <p className="font-bold text-inherit">Foodie</p>
          </Link>
        </NavbarBrand>

        <NavbarContent className="hidden sm:flex gap-6" justify="center">
          <NavbarItem>
            <Link href="/" aria-current="page" color="foreground">
              Home
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="#" aria-current="page" color="foreground">
              My Recipes
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Top Recipes
            </Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent as="div" justify="end">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name="Jason Hughes"
                size="sm"
                src="/images/user.png"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem className="h-14 gap-2">
                <p className="font-semibold">Hello👋,</p>
                <p className="font-semibold">User Name</p>
              </DropdownItem>
              <DropdownItem>
                <Link href="/user">Dashboard</Link>
              </DropdownItem>
              <DropdownItem>My Recipes</DropdownItem>
              <DropdownItem>Favorites</DropdownItem>
              <DropdownItem>Settings</DropdownItem>
              <DropdownItem color="danger" onPress={signOut}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </Navbar>
      <SignIn isOpen={isSignInOpen} onClose={handleSignInClose} />
      <SignUp isOpen={isSignUpOpen} onClose={handleSignUpClose} />
    </>
  );
};

export default AddRecipeNavBar;
