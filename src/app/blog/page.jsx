"use client";
import React, { useState, useEffect } from "react";
import BlogCard from "../components/BlogCard";
import { motion } from "framer-motion";
import { FaHome, FaArrowRight, FaSearch } from "react-icons/fa";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch("/api/blogs");
      if (res.ok) {
        const data = await res.json();
        setBlogs(data);
      }
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <main className="flex min-h-screen flex-col bg-[#121212]">
      <Navbar />

      <div className="container mt-24 mx-auto px-4 py-12 md:px-12 lg:px-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors"
              >
                <FaHome /> Back to Home
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                All{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-600">
                  Articles
                </span>
              </h1>
              <p className="text-[#ADB7BE] text-lg max-w-2xl">
                Explore our full collection of thoughts, tutorials, and project
                stories.
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-72">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaSearch className="w-4 h-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full p-3 pl-10 text-sm border rounded-lg bg-[#181818] border-gray-700 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </motion.div>

        {/* Blog Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-96 rounded-xl bg-white/5 animate-pulse"
              />
            ))}
          </div>
        ) : filteredBlogs.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <BlogCard
                  variant="featured" // Use featured variant for bigger cards in grid
                  title={blog.title}
                  excerpt={blog.excerpt}
                  coverImage={blog.cover_image}
                  contentUrl={blog.content_url}
                  tags={blog.tags}
                  createdAt={blog.created_at}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-gray-400 text-xl font-medium mb-4">
              No articles found matching &quot;{searchTerm}&quot;
            </p>
            <button
              onClick={() => setSearchTerm("")}
              className="text-primary-400 hover:text-primary-300 font-semibold"
            >
              Clear search
            </button>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
