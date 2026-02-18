"use client";
import Image from "next/image";
import React from "react";
import TypingAnimation from "./TypeAnimation";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="lg:py-16">
      <div className="grid grid-cols-1 sm:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-5 place-self-center mt-4 lg:mt-0"
        >
          <div className="rounded-full bg-[#181818] w-[250px] h-[250px] lg:w-[350px] lg:h-[350px] relative overflow-hidden mx-auto">
            <Image
              src="/images/IMG_4172.PNG"
              alt="hero image"
              fill
              className="object-cover"
              style={{ objectPosition: "center 15%" }}
              priority
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-7 place-self-center text-center sm:text-left justify-self-start"
        >
          <h1 className="text-white mb-4 text-3xl sm:text-4xl lg:text-6xl lg:leading-normal font-extrabold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-600">
              Hello, I&apos;m{" "}
            </span>
            <br />
            <TypingAnimation />
          </h1>
          <p className="text-[#ADB7BE] text-base sm:text-lg mb-6 lg:text-xl">
            Specializing in building dynamic web apps and intuitive iOS
            solutions using React, Node.js, and Swift. I&apos;m passionate about
            creating seamless user experiences and delivering high-quality,
            scalable software.
          </p>
          <div>
            <a
              href="https://wa.me/628112958568"
              target="_blank"
              className="px-6 py-3 w-full sm:w-fit rounded-full mr-4 bg-gradient-to-br from-primary-500 to-secondary-500 hover:bg-slate-200 text-white font-semibold transition-all duration-300 inline-block text-center"
            >
              Hire Me
            </a>
            <a
              href="/giventusmarco_cv.pdf"
              download="CV - Giventus Marco.pdf"
              className="px-1 py-1 w-full sm:w-fit rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 hover:bg-slate-800 text-white transition-all duration-300 inline-block mt-3 sm:mt-0"
            >
              <span className="block bg-[#121212] hover:bg-slate-800 rounded-full px-5 py-2 text-center">
                Download CV
              </span>
            </a>
          </div>

          {/* Social Media Icons */}
          <div className="flex justify-center sm:justify-start gap-4 mt-6">
            <SocialIcon
              href="https://www.linkedin.com/in/giventus/"
              icon={<FaLinkedin />}
            />
            <SocialIcon
              href="https://github.com/giventusmvh"
              icon={<FaGithub />}
            />
            <SocialIcon
              href="mailto:giventusmrco@gmail.com"
              icon={<IoMdMail />}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SocialIcon({ href, icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-12 h-12 border-2 border-[#33353F] rounded-full flex items-center justify-center text-white text-2xl hover:border-white hover:bg-white/10 transition-all duration-300"
    >
      {icon}
    </a>
  );
}
