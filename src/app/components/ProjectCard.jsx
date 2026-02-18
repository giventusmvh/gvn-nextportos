import React from "react";
import { CodeBracketIcon, EyeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProjectCard({
  imgUrl,
  title,
  description,
  techStack,
  link,
  github,
}) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="glass rounded-xl overflow-hidden h-full flex flex-col group"
    >
      <div
        className="h-52 md:h-72 bg-center relative overflow-hidden"
        style={{
          background: `url('${imgUrl || "/images/projects/nextporto.png"}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        title={title}
      >
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          <Link
            href={link || "#"}
            target={link ? "_blank" : "_self"}
            className="h-14 w-14 border-2 relative rounded-full border-[#ADB7BE] hover:border-white group/link"
          >
            <EyeIcon className="h-10 w-10 text-[#ADB7BE] group-hover/link:text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </Link>
          <Link
            href={github || "#"}
            target={github ? "_blank" : "_self"}
            className="h-14 w-14 border-2 relative rounded-full border-[#ADB7BE] hover:border-white group/link"
          >
            <CodeBracketIcon className="h-10 w-10 text-[#ADB7BE] group-hover/link:text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </Link>
        </div>
      </div>

      <div className="p-6 flex-grow flex flex-col">
        <h5 className="text-xl font-semibold mb-2 text-white group-hover:text-primary-400 transition-colors">
          {title}
        </h5>
        <p className="text-[#ADB7BE] mb-4 flex-grow line-clamp-3">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mt-auto">
          {(techStack || []).map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-[#181818] text-xs text-white rounded-full border border-white/10"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
