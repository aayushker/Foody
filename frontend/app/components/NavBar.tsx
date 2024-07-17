import React from "react";
import Link from "next/link";

const NavBar = () => {
  const bool = true;
  return (
    <div className=" p-4 flex justify-between bg-gradient-to-r from-orange-300 via-orange-100 to-green-300">
      <h1 className="">
        <Link href={"/"}>Foody</Link>
      </h1>
      <ul className=" flex space-x-12 justify-around ">
        <li>
          <Link href={"/"}>Home</Link>
        </li>
        <li>
          <Link href={"/"}>Services</Link>
        </li>
        <li>
          <Link href={"/"}>Contact</Link>
        </li>
      </ul>

      <div>
        <button className="">{bool == true ? "Sign In" : "Log Out"}</button>
      </div>
    </div>
  );
};

export default NavBar;
