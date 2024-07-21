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
import { useAuth } from "../AuthContext";
import SignIn from "./ui/SignIn";
import SignUp from "./ui/SignUp";
import {ChevronDown} from "./ui/Icons";

const NavBar: React.FC = () => {
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
    chevron: <ChevronDown fill="currentColor" size={16} height={16} width={16}/>,
  };

  return (
    <>
      <Navbar className="relative w-full">
        <NavbarBrand>
          <Link href="#">
            <p className="font-bold text-inherit">Foodie</p>
          </Link>
        </NavbarBrand>

        <NavbarContent className="hidden sm:flex gap-6" justify="center">
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                endContent={icons.chevron}
                radius="sm"
                variant="light"
              >
                Recipes
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="Available Recipes"
            className="w-[340px]"
            itemClasses={{
              base: "gap-4",
            }}
          >
            <DropdownItem
              key="Appeteziers"
              description="Appeteziers for your next party or gathering."
    
            >
              Appeteziers
            </DropdownItem>
            <DropdownItem
              key="Main Course"
              description="Main Course to satisfy your hunger."
            >
              Main Course
            </DropdownItem>
            <DropdownItem
              key="Desserts"
              description="Desserts to satisfy your sweet tooth."
            >
              Desserts
            </DropdownItem>
            <DropdownItem
              key="Beverages"
              description="Beverages to quench your thirst."
            >
              Beverages
            </DropdownItem>
            <DropdownItem
              key="Vegan"
              description="Vegan recipes for a healthy lifestyle."
            >
              Vegan
            </DropdownItem>
            <DropdownItem
              key="Glueten Free"
              description="Glueten Free recipes for a healthy lifestyle."
            >
              Glueten Free
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
          <NavbarItem>
            <Link href="#" aria-current="page" color="foreground">
              Top Recipes
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="#" aria-current="page" color="foreground">
              Blog
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              About Us
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Contact Us
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
            {isLogged ? (
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem className="h-14 gap-2">
                  <p className="font-semibold">Hello👋,</p>
                  <p className="font-semibold">User Name</p>
                </DropdownItem>
                <DropdownItem>Dashboard</DropdownItem>
                <DropdownItem>My Recipe</DropdownItem>
                <DropdownItem>Favorites</DropdownItem>
                <DropdownItem color="success">Add Recipe</DropdownItem>
                <DropdownItem color="danger" onPress={signOut}>
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            ) : (
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem onPress={handleSignInOpen}>Log In</DropdownItem>
                <DropdownItem onPress={handleSignUpOpen}>Sign Up</DropdownItem>
              </DropdownMenu>
            )}
          </Dropdown>
        </NavbarContent>
      </Navbar>
      <SignIn isOpen={isSignInOpen} onClose={handleSignInClose} />
      <SignUp isOpen={isSignUpOpen} onClose={handleSignUpClose} />
    </>
  );
};

export default NavBar;
