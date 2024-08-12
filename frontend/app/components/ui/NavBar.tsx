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
  DropdownSection,
  User,
} from "@nextui-org/react";
import { useAuth } from "@/app/AuthContext";
import Login from "@/app/components/ui/auth/Login";
import Register from "@/app/components/ui/auth/Register";
import {
  IconLogin,
  IconLogout,
  IconTablePlus,
  IconPlus,
  IconHelp,
  IconChefHat,
} from "@tabler/icons-react";
import { useTheme } from "@/app/ThemeContext";

const NavBar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
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

  const { theme, setTheme } = useTheme();

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(event.target.value as "light" | "dark" | "system");
  };

  return (
    <>
      <Navbar>
        <NavbarBrand>
          <Link href="/" className="space-x-2">
            <IconChefHat />
            <p className="font-bold text-inherit">Foody</p>
          </Link>
        </NavbarBrand>

        <NavbarContent className="hidden sm:flex gap-6" justify="center">
          {/* <Dropdown>
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
          </Dropdown> */}
          <NavbarItem>
            <Link href="/explore" aria-current="page" color="foreground">
              Explore
            </Link>
          </NavbarItem>
          {isAuthenticated ? (
            <>
              <NavbarItem>
                <Link href="/user#recipes" color="foreground">
                  Your Recipes
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link href="/user#dashboard" color="foreground">
                  Dashboard
                </Link>
              </NavbarItem>
            </>
          ) : (
            <>
              <NavbarItem>
                <Link href="#" color="foreground" onPress={handleSignInOpen}>
                  Login
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link href="#" color="foreground" onPress={handleSignUpOpen}>
                  Signup
                </Link>
              </NavbarItem>
            </>
          )}
          <NavbarItem>
            <Link color="foreground" href="#">
              Contact Us
            </Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent as="div" justify="end">
          <Dropdown
            radius="sm"
            classNames={{
              base: "before:bg-default-200", // change arrow background
              content: "p-0 border-small border-divider bg-background",
            }}
          >
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name={user ? user.username : "Guest"}
                size="sm"
                src="/images/user.png"
              />
            </DropdownTrigger>
            {isAuthenticated ? (
              <>
                <DropdownMenu
                  aria-label="Custom item styles"
                  disabledKeys={["profile"]}
                  className="p-3"
                  itemClasses={{
                    base: [
                      "rounded-md",
                      "text-default-500",
                      "transition-opacity",
                      "data-[hover=true]:text-foreground",
                      "data-[hover=true]:bg-default-100",
                      "dark:data-[hover=true]:bg-default-50",
                      "data-[selectable=true]:focus:bg-default-50",
                      "data-[pressed=true]:opacity-70",
                      "data-[focus-visible=true]:ring-default-500",
                    ],
                  }}
                >
                  <DropdownSection aria-label="Profile & Actions" showDivider>
                    <DropdownItem
                      isReadOnly
                      key="profile"
                      className="h-14 gap-2 opacity-100"
                    >
                      <User
                        name="Hello👋,"
                        description={user ? "@" + user.username : "Guest"}
                        classNames={{
                          name: "text-default-600",
                          description: "text-default-500",
                        }}
                        avatarProps={{
                          size: "sm",
                          src: "/images/user.png",
                        }}
                      />
                    </DropdownItem>

                    <DropdownItem key="dashboard" href="/user#dashboard">
                      Dashboard
                    </DropdownItem>
                    <DropdownItem key="settings" href="/user#settings">
                      Settings
                    </DropdownItem>
                    <DropdownItem
                      key="Add Recipe"
                      endContent={<IconPlus className="text-large" />}
                      href="/addRecipe"
                      color="success"
                    >
                      <p className="text-success-600">Add Recipe</p>
                    </DropdownItem>
                  </DropdownSection>

                  <DropdownSection aria-label="Preferences" showDivider>
                    {/* <DropdownItem key="quick_search" shortcut="⌘K">
                  Quick search
                </DropdownItem> */}
                    <DropdownItem
                      isReadOnly
                      key="theme"
                      className="cursor-default"
                      endContent={
                        <select
                          className="z-10 outline-none w-16 py-0.5 rounded-md text-tiny group-data-[hover=true]:border-default-500 border-small border-default-300 dark:border-default-200 bg-transparent text-default-500"
                          id="theme"
                          name="theme"
                          value={theme}
                          onChange={handleThemeChange}
                        >
                          <option value="system">System</option>
                          <option value="dark">Dark</option>
                          <option value="light">Light</option>
                        </select>
                      }
                    >
                      Theme
                    </DropdownItem>
                  </DropdownSection>

                  <DropdownSection aria-label="Help & Feedback">
                    <DropdownItem
                      key="help_and_feedback"
                      href="/user#helpsupport"
                      endContent={<IconHelp type="sm" />}
                    >
                      Help & Feedback
                    </DropdownItem>
                    <DropdownItem
                      key="logout"
                      onPress={logout}
                      endContent={<IconLogout type="sm" />}
                    >
                      <p className="text-red-400">Log Out</p>
                    </DropdownItem>
                  </DropdownSection>
                </DropdownMenu>
              </>
            ) : (
              <>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem
                    onPress={handleSignInOpen}
                    endContent={<IconLogin />}
                  >
                    Login
                  </DropdownItem>
                  <DropdownItem
                    onPress={handleSignUpOpen}
                    endContent={<IconTablePlus />}
                  >
                    Signup
                  </DropdownItem>
                </DropdownMenu>
              </>
            )}
          </Dropdown>
        </NavbarContent>
      </Navbar>
      <Login isOpen={isSignInOpen} onClose={handleSignInClose} />
      <Register isOpen={isSignUpOpen} onClose={handleSignUpClose} />
    </>
  );
};

export default NavBar;
