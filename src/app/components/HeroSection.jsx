"use client";
import Image from "next/image";
import React from "react";
import TypingAnimation from "./TypeAnimation";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa"; // Import icons

export default function HeroSection() {
  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-1">
        <div className="col-span-5 place-self-center mb-4 lg:mt-12 mt-12">
          <div className="rounded-full bg-[#181818] w-[150px] h-[150px] lg:w-[200px] lg:h-[200px] relative">
            <Image
              src="/images/hero-image.png"
              alt="heroimage"
              width={140}
              height={140}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            />
          </div>
        </div>
        <div className="col-span-7 place-self-center text-center sm:text-center">
          <h1 className="text-white mb-4 text-2xl sm:text-5xl lg:text-5xl font-extrabold">
            <span className="text-transparent bg-clip-text  bg-gradient-to-r from-purple-600 to-pink-400 hover:bg-slate-200">
              Hello, I'm Giventus Marco{" "}
            </span>
            <br />
            <TypingAnimation />
          </h1>
          <p className="text-[#ADB7BE] text-base sm:text-lg mb-12 lg:text-xl sm:mt-12 sm:max-w-[800px] font-thin">
            Motivated and dedicated
            <span className="font-bold text-white"> iOS Developer</span> /
            <span className="font-bold text-white"> Fullstack Engineer</span>{" "}
            seeking an position to apply and expand upon knowledge in the field
            of computer science and software development. Eager to contribute to
            innovative projects, dynamic team and gain practical experience in a
            professional environment.
          </p>
          <div>
            <button className="px-6 py-3 w-full sm:w-fit rounded-full mr-4 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 hover:bg-slate-200 text-white">
              <a href="https://wa.me/628112958568" target="_blank">
                Hire me
              </a>
            </button>
            <button className="px-[2px] py-[2px] w-full sm:w-fit rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 hover:bg-slate-800 text-white mt-3">
              <span className="block bg-[#121212] hover:bg-slate-800 rounded-full px-6 py-3">
                <a href="/cv.pdf" download="CV - Giventus Marco.pdf">
                  Download CV
                </a>
              </span>
            </button>
          </div>

          {/* Social Media Icons */}
          <div className="flex justify-center gap-4 mt-6">
            <a
              href="https://www.linkedin.com/in/giventus/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center transition-all duration-300 ease-out  hover:bg-gradient-to-br from-pink-500 to-purple-500  "
            >
              <FaLinkedin className="text-white text-xl" />
            </a>
            <a
              href="https://github.com/giventusmvh"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center transition-all duration-300 ease-out  hover:bg-gradient-to-br from-pink-500 to-purple-500  "
            >
              <FaGithub className="text-white text-xl" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
