"use client";
import Image from "next/image";
import React from "react";
import TypingAnimation from "./TypeAnimation";
import { FaLinkedin, FaGithub, FaInstagram, FaMailBulk } from "react-icons/fa"; // Import icons
import { IoMdMail } from "react-icons/io";

export default function HeroSection() {
  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-1">
        <div className="col-span-5 place-self-center mb-4 lg:mt-12 mt-8">
          <div className="px-[2px] py-[2px] rounded-full bg-[#ffffff] w-[180px] h-[180px] lg:w-[200px] lg:h-[200px] relative ">
            <span className="block bg-[#121212]  rounded-full w-[176px] h-[176px] lg:w-[196px] lg:h-[196px] relative ease-in-out duration-200">
              <Image
                src="/images/hero-image.png"
                alt="heroimage"
                width={140}
                height={140}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              />
            </span>
          </div>
        </div>
        <div className="col-span-7 place-self-center text-center sm:text-center">
          <h1 className="text-white mb-4 text-2xl sm:text-5xl lg:text-5xl font-extrabold">
            <span className="text-transparent bg-clip-text  bg-gradient-to-r from-primary-600 to-secondary-400 hover:bg-slate-200">
              Hello, I&apos;m Giventus Marco{" "}
            </span>
            <br />
            <TypingAnimation />
          </h1>
          <p className="text-[#ADB7BE] text-base sm:text-lg mb-12 lg:text-xl sm:mt-12 sm:max-w-[800px] font-thin">
            I&apos;m an{" "}
            <span className="font-bold text-transparent bg-clip-text  bg-gradient-to-r from-primary-600 to-secondary-400 hover:bg-slate-200">
              {" "}
              iOS Developer
            </span>{" "}
            and{" "}
            <span className="font-bold text-transparent bg-clip-text  bg-gradient-to-r from-primary-600 to-secondary-400 hover:bg-slate-200">
              {" "}
              Fullstack Engineer
            </span>{" "}
            specializing in building dynamic web apps and intuitive iOS
            solutions using React, Node.js, and Swift. I&apos;m passionate about
            creating seamless user experiences and delivering high-quality,
            scalable software.
          </p>
          <div>
            <a href="https://wa.me/628112958568" target="_blank">
              <button className="px-6 py-3 w-full sm:w-fit rounded-full mr-4 bg-gradient-to-br from-primary-500  to-secondary-500 hover:bg-slate-200 text-white">
                Hire me
              </button>
            </a>
            <a href="/giventusmarco_cv.pdf" download="CV - Giventus Marco.pdf">
              <button className="px-[2px] py-[2px] w-full sm:w-fit rounded-full bg-gradient-to-br from-primary-500  to-secondary-500 hover:bg-slate-800 text-white mt-3">
                <span className="block bg-[#121212] hover:bg-slate-800 rounded-full px-6 py-3">
                  Download CV
                </span>
              </button>
            </a>
          </div>

          {/* Social Media Icons */}
          <div className="flex justify-center gap-4 mt-6">
            <a
              href="https://www.linkedin.com/in/giventus/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center transition-all duration-300 ease-out  hover:bg-gradient-to-br from-secondary-500 to-primary-500  "
            >
              <FaLinkedin className="text-white text-xl" />
            </a>
            <a
              href="https://github.com/giventusmvh"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center transition-all duration-300 ease-out  hover:bg-gradient-to-br from-secondary-500 to-primary-500  "
            >
              <FaGithub className="text-white text-xl" />
            </a>
            <a
              href="mailto:giventusmrco@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center transition-all duration-300 ease-out  hover:bg-gradient-to-br from-secondary-500 to-primary-500  "
            >
              <IoMdMail className="text-white text-xl" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
