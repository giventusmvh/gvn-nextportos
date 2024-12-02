"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navlink from "./NavLink";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import MenuOverlay from "./MenuOverlay";

const navLink = [
  { title: "About", href: "#about" },
  { title: "Skill", href: "#skill" },
  { title: "Projects", href: "#project" },
  { title: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  return (
    <nav className="mx-auto fixed top-5 left-0 right-0 z-20 bg-[#121212]/30 backdrop-blur-md  border border-white md:max-w-[1400px] rounded-full max-w-[95%]">
      <div className="flex flex-wrap items-center justify-center mx-auto px-4 py-3 md:max-w-[1400px]">
        {/* <Link
          href={"/"}
          className="text-4xl text-transparent bg-clip-text  bg-gradient-to-r from-primary-600 to-secondary-400 hover:bg-slate-200 font-normal font-sans"
        >
          <Image
            src={"/images/sign-white2.png"}
            alt="logo"
            width={140}
            height={50}
          />
          {"GiventusMarco"}
        </Link> */}
        {/* <div className="mobile-menu block md:hidden">
          {!navbarOpen ? (
            <button
              onClick={() => setNavbarOpen(true)}
              className="text-white flex items-center px-3 py-2 rounded border border-slate-200"
            >
              <Bars3Icon className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={() => setNavbarOpen(false)}
              className="text-white flex items-center px-3 py-2 rounded border border-slate-200"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          )}
        </div> */}
        <div className="menu block md:w-auto" id="navbar">
          <ul className="flex p-0 md:p-0 md:flex-row md:space-x-14 mt-0">
            {navLink.map((link, index) => (
              <li key={index}>
                <Navlink href={link.href} title={link.title} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      {navbarOpen ? (
        <MenuOverlay links={navLink} visible={navbarOpen ? true : false} />
      ) : null}
    </nav>
  );
}
