"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaClock, FaArrowRight, FaTag } from "react-icons/fa";

export default function BlogCard({
  title,
  excerpt,
  coverImage,
  contentUrl,
  tags,
  createdAt,
  variant = "horizontal", // "featured" or "horizontal"
}) {
  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const wordCount = (excerpt || "").split(" ").length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  const isFeatured = variant === "featured";

  // Framer Motion constraints per variant
  const variants = {
    hover: { y: -5 },
    tap: { scale: 0.98 },
  };

  return (
    <motion.article
      whileHover="hover"
      whileTap="tap"
      variants={variants}
      className={`group relative bg-[#181818] rounded-xl overflow-hidden border border-white/5 shadow-lg flex ${
        isFeatured ? "flex-col h-full" : "flex-row h-32 md:h-40"
      }`}
    >
      {/* Image Section */}
      <div
        className={`relative overflow-hidden ${
          isFeatured
            ? "w-full h-64 md:h-72"
            : "w-1/3 min-w-[120px] md:min-w-[160px]"
        }`}
      >
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{
            backgroundImage: `url(${coverImage || "/images/blog-placeholder.jpg"})`,
          }}
        />
        {/* Overlay only on featured to ensure image text contrast if needed? No, we want NO overlay text. Keeping image clean. */}
        {/* Just a tiny subtle gradient for depth maybe, but let's keep it clean as requested. */}
      </div>

      {/* Content Section */}
      <div
        className={`flex flex-col p-5 ${isFeatured ? "flex-grow" : "w-2/3 justify-center"}`}
      >
        {/* Mobile: featured badge only on featured card */}
        {isFeatured && (
          <div className="mb-3">
            <span className="inline-block px-2 py-0.5 text-xs font-semibold text-primary-400 bg-primary-400/10 rounded-full border border-primary-400/20">
              Featured
            </span>
          </div>
        )}

        <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
          <span className="flex items-center gap-1.5">
            <FaCalendarAlt className="text-primary-400" />
            {formattedDate}
          </span>
          {isFeatured && (
            <span className="flex items-center gap-1.5">
              <FaClock className="text-secondary-400" />
              {readingTime} min read
            </span>
          )}
        </div>

        <h3
          className={`font-bold text-white mb-2 group-hover:text-primary-400 transition-colors duration-300 ${
            isFeatured
              ? "text-xl md:text-2xl line-clamp-2"
              : "text-base md:text-lg leading-tight"
          }`}
        >
          {title}
        </h3>

        {/* Excerpt - Show more lines on featured */}
        <p
          className={`text-gray-400 text-sm mb-4 flex-grow ${
            isFeatured ? "line-clamp-3" : "line-clamp-2 hidden md:block" // Hide excerpt on small screens for horizontal
          }`}
        >
          {excerpt}
        </p>

        {/* Footer: Tags & Read Button */}
        <div className="flex items-center justify-between mt-auto">
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.slice(0, isFeatured ? 3 : 1).map((tag, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-white/5 text-gray-400 border border-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {contentUrl && (
            <Link
              href={contentUrl}
              target="_blank"
              className="flex items-center gap-1 text-xs font-semibold text-primary-400 hover:text-primary-300 transition-colors ml-auto"
            >
              Read
              <FaArrowRight className="text-[10px] transition-transform group-hover:translate-x-1" />
            </Link>
          )}
        </div>
      </div>
    </motion.article>
  );
}
