"use client";
import React, { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { motion, useInView, AnimatePresence } from "framer-motion";

const Projects = () => {
  const [tag, setTag] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [availableTags, setAvailableTags] = useState(["All"]);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  const INITIAL_DISPLAY_COUNT = 6;

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      if (res.ok) {
        const data = await res.json();
        setProjects(data);

        // Extract unique tags
        const tags = new Set(["All"]);
        data.forEach((p) => (p.tag || []).forEach((t) => tags.add(t)));
        tags.delete("All"); // remove to re-add at front
        setAvailableTags(["All", ...Array.from(tags)]);
      }
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTagChange = (newTag) => {
    setTag(newTag);
    setShowAll(false);
  };

  const filteredProjects = projects.filter((project) =>
    (project.tag || []).includes(tag),
  );

  const displayedProjects = showAll
    ? filteredProjects
    : filteredProjects.slice(0, INITIAL_DISPLAY_COUNT);

  const hasMore = filteredProjects.length > INITIAL_DISPLAY_COUNT;

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section id="projects" className="py-20 scroll-mt-24">
      <div className="flex flex-col mb-12 text-center">
        <h2 className="text-4xl font-bold text-white mb-4">
          My{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-600">
            Projects
          </span>
        </h2>
        <p className="text-[#ADB7BE] text-lg">
          Check out what I&apos;ve been building
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {availableTags.map((t) => (
          <ProjectTag
            key={t}
            name={t}
            onClick={handleTagChange}
            isSelected={tag === t}
          />
        ))}
      </div>

      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="glass rounded-xl h-80 animate-pulse" />
          ))}
        </div>
      ) : (
        <>
          <ul ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {displayedProjects.map((project, index) => (
                <motion.li
                  key={project.id}
                  variants={cardVariants}
                  initial="initial"
                  animate="animate"
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  layout
                >
                  <ProjectCard
                    title={project.title}
                    description={project.description}
                    imgUrl={project.image}
                    techStack={project.tech_stack}
                    link={project.link}
                    github={project.github}
                  />
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>

          {hasMore && (
            <div className="flex justify-center mt-10">
              <button
                onClick={() => setShowAll(!showAll)}
                className="px-8 py-3 rounded-full border border-white/20 text-white font-medium hover:bg-white/10 transition-all duration-300"
              >
                {showAll
                  ? "Show Less"
                  : `Show More (${filteredProjects.length - INITIAL_DISPLAY_COUNT} more)`}
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Projects;
