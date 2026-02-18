"use client";
import React, { useState, useEffect } from "react";
import BlogCard from "./BlogCard";
import { motion } from "framer-motion";
import { FaNewspaper, FaRss, FaArrowRight } from "react-icons/fa";

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const featuredBlog = blogs[0] || null;
  const restBlogs = blogs.slice(1, 4); // Limit to 3 items in the side list (1 featured + 3 side = 4 total)

  if (loading) {
    return (
      <section id="blog" className="py-20 scroll-mt-24">
        <div className="flex flex-col mb-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Latest{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-600">
              Articles
            </span>
          </h2>
        </div>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="rounded-xl h-96 bg-white/5 animate-pulse" />
          <div className="flex flex-col gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-xl h-32 bg-white/5 animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (blogs.length === 0) {
    return (
      <section id="blog" className="py-20 scroll-mt-24">
        <div className="flex flex-col mb-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Latest{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-600">
              Articles
            </span>
          </h2>
          <p className="text-[#ADB7BE] text-lg">
            Thoughts, tutorials &amp; project stories
          </p>
        </div>
        <div className="flex flex-col items-center justify-center py-16 bg-[#181818] rounded-xl border border-white/5">
          <FaNewspaper className="text-5xl text-[#ADB7BE] mb-4" />
          <p className="text-[#ADB7BE] text-lg">
            No blog posts yet. Stay tuned!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-20 scroll-mt-24">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-end justify-between mb-12"
      >
        <div>
          <p className="text-sm font-bold text-primary-400 uppercase tracking-widest mb-2">
            Writing
          </p>
          <h2 className="text-4xl font-bold text-white">
            Latest{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-600">
              Articles
            </span>
          </h2>
        </div>

        <div className="flex items-center gap-4">
          {/* View All Button */}
          <motion.a
            href="/blog"
            whileHover={{ x: 5 }}
            className="hidden md:flex items-center gap-2 text-sm font-bold text-primary-400 hover:text-primary-300 transition-colors"
          >
            View All Posts <FaArrowRight />
          </motion.a>
        </div>
      </motion.div>

      {/* Grid Layout: Featured (Left) + List (Right) */}
      <div className="grid lg:grid-cols-5 gap-8">
        {/* Featured Post (Col Span 2) */}
        {featuredBlog && (
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 h-full"
          >
            <BlogCard
              variant="featured"
              title={featuredBlog.title}
              excerpt={featuredBlog.excerpt}
              coverImage={featuredBlog.cover_image}
              contentUrl={featuredBlog.content_url}
              tags={featuredBlog.tags}
              createdAt={featuredBlog.created_at}
            />
          </motion.div>
        )}

        {/* Article Feed (Col Span 3) */}
        <div
          className={`flex flex-col gap-6 ${featuredBlog ? "lg:col-span-3" : "lg:col-span-5"}`}
        >
          {restBlogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <BlogCard
                variant="horizontal"
                title={blog.title}
                excerpt={blog.excerpt}
                coverImage={blog.cover_image}
                contentUrl={blog.content_url}
                tags={blog.tags}
                createdAt={blog.created_at}
              />
            </motion.div>
          ))}

          {/* View All Button for Mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="md:hidden mt-4"
          >
            <a
              href="/blog"
              className="flex items-center justify-center w-full py-3 bg-white/5 rounded-xl text-sm font-bold text-primary-400 border border-white/10 hover:bg-white/10 transition-all"
            >
              View All Posts
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
