"use client";
import React, { useState } from 'react';
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
} from '@nextui-org/react';
import { useAuth } from '../AuthContext';
import SignIn from './ui/SignIn';

const NavBar = () => {
  const { isLogged, signOut } = useAuth();
  const [isSignInOpen, setIsSignInOpen] = useState(false); // This controls the modal

  const handleSignInOpen = () => {
    setIsSignInOpen(true);
  };

  const handleSignInClose = () => {
    setIsSignInOpen(false);
  };

  return (
    <>
      <Navbar>
        <NavbarBrand>
          <p className="font-bold text-inherit">Foodie</p>
        </NavbarBrand>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" href="#">
              Features
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="#" aria-current="page" color="secondary">
              Customers
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Integrations
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
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownTrigger>
            {isLogged ? (
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">zoey@example.com</p>
                </DropdownItem>
                <DropdownItem>My Settings</DropdownItem>
                <DropdownItem>Team Settings</DropdownItem>
                <DropdownItem>Analytics</DropdownItem>
                <DropdownItem>System</DropdownItem>
                <DropdownItem>Configurations</DropdownItem>
                <DropdownItem>Help & Feedback</DropdownItem>
                <DropdownItem color="danger" onPress={signOut}>Log Out</DropdownItem>
              </DropdownMenu>
            ) : (
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem onPress={handleSignInOpen}>Log In</DropdownItem>
              </DropdownMenu>
            )}
          </Dropdown>
        </NavbarContent>
      </Navbar>
      <SignIn isOpen={isSignInOpen} onClose={handleSignInClose} />
    </>
  );
};

export default NavBar;
