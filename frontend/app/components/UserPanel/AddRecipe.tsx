import React, { useEffect, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
  IconHelp,
  IconBreadFilled,
  IconHome,
  IconUserFilled,
} from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

import UserDashboard from "./sections/UserDashboard";
import Profile from "./sections/Profile";
import Recipes from "./sections/Recipes";
import Settings from "./sections/Settings";
import HelpSupport from "./sections/HelpSupport";
import Logout from "./sections/Logout";
import { getUserData } from "@/app/fetchData";

export default function addRecipe() {
  const [userData, setUserData] = useState<{ username: string } | null>(null);
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [open, setOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not logged in");
      router.push("/");
      return;
    }

    const fetchData = async () => {
      try {
        const data = await getUserData(token);
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };
    fetchData();
  }, [router]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      if (hash) {
        setActiveSection(hash.charAt(0).toUpperCase() + hash.slice(1));
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const links = [
    {
      label: "Dashboard",
      href: "#dashboard",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      section: "Dashboard",
    },
    {
      label: "Profile",
      href: "#profile",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      section: "Profile",
    },
    {
      label: "My Recipes",
      href: "#recipes",
      icon: (
        <IconBreadFilled className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      section: "Recipes",
    },
    {
      label: "Settings",
      href: "#settings",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      section: "Settings",
    },
    {
      label: "Help and Support",
      href: "#helpsupport",
      icon: (
        <IconHelp className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      section: "HelpSupport",
    },
    {
      label: "Logout",
      href: "#logout",
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      section: "Logout",
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
                label: `${userData?.username}`,
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
        {activeSection === "Dashboard" && <UserDashboard />}
        {activeSection === "Profile" && <Profile />}
        {activeSection === "Recipes" && <Recipes />}
        {activeSection === "Settings" && <Settings />}
        {activeSection === "HelpSupport" && <HelpSupport />}
        {activeSection === "Logout" && <Logout />}
      </div>
    </div>
  );
};
