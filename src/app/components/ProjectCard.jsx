import React from "react";
import Image from "next/image";
import { CodeBracketIcon, EyeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function ProjectCard({
  imgUrl,
  title,
  description,
  techStack,
  link,
  github,
}) {
  return (
    <div className="border border-slate-200 rounded-xl flex flex-col h-full">
      {/* Image Section */}
      <div
        className="group rounded-t-xl h-52 md:h-72 bg-center relative overflow-hidden"
        style={{
          background: `url(${imgUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="overlay absolute top-0 left-0 w-full h-full bg-[#181818] bg-opacity-0 hidden group-hover:flex group-hover:bg-opacity-80 transition-all duration-500 items-center justify-center">
          <Link
            href={link}
            target="_blank"
            className="h-14 w-14 border-2 relative rounded-full border-[#ADB7BE] hover:border-white mr-4 group/link"
          >
            <EyeIcon className="h-10 w-10 text-[#ADB7BE] group-hover/link:text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </Link>
          <Link
            href={github}
            target="_blank"
            className="h-14 w-14 border-2 relative rounded-full border-[#ADB7BE] hover:border-white group/link"
          >
            <CodeBracketIcon className="h-10 w-10 text-[#ADB7BE] group-hover/link:text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </Link>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-[#181818] rounded-b-xl py-6 px-4 text-white flex flex-col flex-1">
        {/* Title */}
        <h5 className="font-lg font-semibold mb-2">{title}</h5>

        {/* Description */}
        <p className="text-[#ADB7BE] mb-4 flex-1">{description}</p>

        {/* Tech Stack */}
        <div className="mt-auto flex flex-wrap gap-2">
          {techStack.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-[#262626] text-sm text-white rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
