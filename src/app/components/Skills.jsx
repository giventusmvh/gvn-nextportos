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
} from "react-icons/fa";
import {
  SiTypescript,
  SiTailwindcss,
  SiLaravel,
  SiMysql,
  SiNextdotjs,
  SiFramer,
  SiSwift,
  SiSwiftui,
} from "react-icons/si";

export default function Skills() {
  const skills = [
    { name: "HTML", icon: <FaHtml5 className="text-orange-500 text-2xl" /> },
    { name: "CSS", icon: <FaCss3Alt className="text-blue-500 text-2xl" /> },
    {
      name: "JavaScript",
      icon: <FaJsSquare className="text-yellow-500 text-2xl" />,
    },
    {
      name: "TypeScript",
      icon: <SiTypescript className="text-blue-400 text-2xl" />,
    },
    {
      name: "Tailwind CSS",
      icon: <SiTailwindcss className="text-teal-500 text-2xl" />,
    },
    { name: "PHP", icon: <FaPhp className="text-indigo-500 text-2xl" /> },
    {
      name: "Laravel",
      icon: <SiLaravel className="text-red-500 text-2xl" />,
    },
    { name: "MySQL", icon: <SiMysql className="text-blue-600 text-2xl" /> },
    { name: "React", icon: <FaReact className="text-blue-300 text-2xl" /> },
    {
      name: "Next.js",
      icon: <SiNextdotjs className="text-gray-100 text-2xl" />,
    },
    { name: "Node.js", icon: <FaNodeJs className="text-green-500 text-2xl" /> },
    {
      name: "Framer Motion",
      icon: <SiFramer className="text-pink-400 text-2xl" />,
    },
    {
      name: "React Native",
      icon: <FaReact className="text-blue-300 text-2xl" />,
    },
    { name: "Swift", icon: <SiSwift className="text-orange-500 text-2xl" /> },
    {
      name: "SwiftUI",
      icon: <SiSwift className="text-purple-500 text-2xl" />,
    },
    { name: "UIKit", icon: <SiSwift className="text-teal-500 text-2xl" /> },
    {
      name: "Apple Frameworks",
      icon: <SiSwift className="text-gray-200 text-2xl" />,
    },
    { name: "Git", icon: <FaGitAlt className="text-red-500 text-2xl" /> },
    { name: "GitHub", icon: <FaGithub className="text-white text-2xl" /> },
    { name: "Java", icon: <FaJava className="text-cyan-500 text-2xl" /> },
  ];

  return (
    <div id="skill" className="mt-40 mb-20 scroll-mt-[170px]">
      <div className="flex flex-col mb-12">
        <h1 className="text-white flex justify-center items-center text-md sm:text-md lg:text-md ">
          Explore my
        </h1>
        <h1 className="text-white flex justify-center items-center text-2xl sm:text-5xl lg:text-5xl font-bold">
          Techstack
        </h1>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto items-center justify-center">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="bg-black border border-white hover:bg-white hover:text-black text-white py-4 px-4 rounded-md text-center shadow  transition flex flex-col items-center"
          >
            {skill.icon}
            <span className="mt-2 text-sm">{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}