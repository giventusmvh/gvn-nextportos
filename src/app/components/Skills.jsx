"use client";
import React from "react";
import {
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaReact,
  FaPhp,
  FaGitAlt,
  FaGithub,
  FaNodeJs,
  FaJava,
  FaPython,
} from "react-icons/fa";
import {
  SiTypescript,
  SiTailwindcss,
  SiLaravel,
  SiMysql,
  SiNextdotjs,
  SiFramer,
  SiSwift,
  SiCocoapods,
  SiFirebase,
  SiSpringboot,
  SiAngular,
  SiKotlin,
  SiRedis,
  SiDocker,
  SiJetpackcompose,
} from "react-icons/si";
import { FaFigma } from "react-icons/fa6";
import { motion } from "framer-motion";

const skills = [
  { name: "HTML", icon: <FaHtml5 className="text-orange-500 text-4xl" /> },
  { name: "CSS", icon: <FaCss3Alt className="text-blue-500 text-4xl" /> },
  {
    name: "JavaScript",
    icon: <FaJsSquare className="text-yellow-500 text-4xl" />,
  },
  {
    name: "TypeScript",
    icon: <SiTypescript className="text-blue-400 text-4xl" />,
  },
  {
    name: "Tailwind CSS",
    icon: <SiTailwindcss className="text-teal-500 text-4xl" />,
  },
  { name: "PHP", icon: <FaPhp className="text-indigo-500 text-4xl" /> },
  { name: "Laravel", icon: <SiLaravel className="text-red-500 text-4xl" /> },
  { name: "MySQL", icon: <SiMysql className="text-blue-600 text-4xl" /> },
  { name: "React", icon: <FaReact className="text-blue-300 text-4xl" /> },
  { name: "Next.js", icon: <SiNextdotjs className="text-white text-4xl" /> },
  { name: "Node.js", icon: <FaNodeJs className="text-green-500 text-4xl" /> },
  {
    name: "Framer Motion",
    icon: <SiFramer className="text-pink-400 text-4xl" />,
  },
  {
    name: "React Native",
    icon: <FaReact className="text-blue-300 text-4xl" />,
  },
  { name: "Swift", icon: <SiSwift className="text-orange-500 text-4xl" /> },
  { name: "SwiftUI", icon: <SiSwift className="text-blue-500 text-4xl" /> }, // Fallback to Swift icon
  { name: "UIKit", icon: <SiSwift className="text-teal-500 text-4xl" /> },
  { name: "Core Data", icon: <SiSwift className="text-pink-200 text-4xl" /> },
  {
    name: "Cocoapods",
    icon: <SiCocoapods className="text-red-200 text-4xl" />,
  },
  {
    name: "Apple Frameworks",
    icon: <SiSwift className="text-gray-200 text-4xl" />,
  },
  {
    name: "Firebase",
    icon: <SiFirebase className="text-orange-200 text-4xl" />,
  },
  { name: "Git", icon: <FaGitAlt className="text-red-500 text-4xl" /> },
  { name: "Java", icon: <FaJava className="text-cyan-500 text-4xl" /> },
  {
    name: "Spring Boot",
    icon: <SiSpringboot className="text-green-500 text-4xl" />,
  },
  { name: "Angular", icon: <SiAngular className="text-red-500 text-4xl" /> },
  { name: "Kotlin", icon: <SiKotlin className="text-purple-400 text-4xl" /> },
  {
    name: "Jetpack Compose",
    icon: <SiJetpackcompose className="text-green-400 text-4xl" />,
  },
  { name: "Redis", icon: <SiRedis className="text-red-400 text-4xl" /> },
  { name: "Docker", icon: <SiDocker className="text-blue-400 text-4xl" /> },
  { name: "Python", icon: <FaPython className="text-yellow-500 text-4xl" /> },
  { name: "Figma", icon: <FaFigma className="text-purple-400 text-4xl" /> },
];

export default function Skills() {
  return (
    <section id="skills" className="py-20 relative">
      <div className="flex flex-col mb-12 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-white mb-4"
        >
          My{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-600">
            Tech Stack
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-[#ADB7BE] text-lg"
        >
          Technologies I work with to build amazing products
        </motion.p>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-5">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center justify-center p-6 rounded-xl bg-[#181818] border border-[#33353F] hover:border-primary-500 transition-colors group cursor-pointer"
          >
            <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
              {skill.icon}
            </div>
            <span className="text-gray-300 font-medium text-center text-sm lg:text-lg">
              {skill.name}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
