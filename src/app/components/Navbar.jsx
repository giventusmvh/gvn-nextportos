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
  //   { title: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-20 bg-[#121212] bg-opacity-90 ">
      <div className="flex flex-wrap items-center justify-between mx-auto px-4 py-3 md:max-w-[1200px]">
        <Link href={"/"} className="text-4xl text-white">
          <Image
            src={"/images/sign-white2.png"}
            alt="logo"
            width={140}
            height={50}
          />
          {/* {"<gvn />"} */}
        </Link>
        <div className="mobile-menu block md:hidden">
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
        </div>
        <div className="menu hidden md:block md:w-auto" id="navbar">
          <ul className="flex p-4 md:p-0 md:flex-row md:space-x-12 mt-0">
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
