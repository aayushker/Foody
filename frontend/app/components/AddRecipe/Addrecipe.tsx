"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import {
  IconHome,
  IconUserFilled,
  IconInfoCircle,
  IconBrandDatabricks,
  IconContract,
  IconPhotoScan,
  IconHeartbeat,
  IconRocket,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

import RecipeInfo from "./sections/RecipeInfo";
import Ingredients from "./sections/Ingredients";
import Instructions from "./sections/Instructions";
import Pictures from "./sections/Pictures";
import NutritionalInfo from "./sections/NutritionalInfo";
import Submit from "./sections/Submit";
import { useAuth } from "@/app/AuthContext";

export default function Addrecipe() {
  const [activeSection, setActiveSection] = useState("Recipe Info");
  const { user } = useAuth();
  const [open, setOpen] = useState(true);

  const links = [
    {
      label: "Recipe Info",
      href: "#",
      icon: (
        <IconInfoCircle className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      section: "Recipe Info",
    },
    {
      label: "Ingredients",
      href: "#",
      icon: (
        <IconBrandDatabricks className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      section: "Ingredients",
    },
    {
      label: "Instructions",
      href: "#",
      icon: (
        <IconContract className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      section: "Instructions",
    },
    {
      label: "Pictures",
      href: "#",
      icon: (
        <IconPhotoScan className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      section: "Pictures",
    },
    {
      label: "Nutritional Info",
      href: "#",
      icon: (
        <IconHeartbeat className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      section: "Nutritional Info",
    },
    {
      label: "Submit",
      href: "#",
      icon: (
        <IconRocket className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      section: "Submit",
    },
  ];

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink
                  key={idx}
                  link={link}
                  onClick={() => setActiveSection(link.section)}
                />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: user ? `${user.username}` : "Guest",
                href: "#",
                icon: (
                  <IconUserFilled className="text-neutral-700 dark:text-neutral-200 h-7 w-7 flex-shrink-0 rounded" />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard activeSection={activeSection} />
    </div>
  );
}

export const Logo = () => {
  return (
    <Link
      href="/"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <IconHome className="text-neutral-700 dark:text-neutral-200 h-6 w-6 flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-normal text-large text-black dark:text-white whitespace-pre"
      >
        Foody
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      href="/"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <IconHome className="text-neutral-700 dark:text-neutral-200 h-6 w-6 flex-shrink-0" />
    </Link>
  );
};

const Dashboard = ({ activeSection }: { activeSection: string }) => {
  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
        {activeSection === "Recipe Info" && <RecipeInfo />}
        {activeSection === "Ingredients" && <Ingredients />}
        {activeSection === "Instructions" && <Instructions />}
        {activeSection === "Pictures" && <Pictures />}
        {activeSection === "Nutritional Info" && <NutritionalInfo />}
        {activeSection === "Submit" && <Submit />}
      </div>
    </div>
  );
};
