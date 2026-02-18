"use client";
import { useState, useEffect } from "react";
import { FaEnvelope, FaProjectDiagram, FaNewspaper } from "react-icons/fa";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    contacts: 0,
    projects: 0,
    blogs: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [contactsRes, projectsRes, blogsRes] = await Promise.all([
        fetch("/api/admin/contacts"),
        fetch("/api/admin/projects"),
        fetch("/api/admin/blogs"),
      ]);

      const contacts = contactsRes.ok ? await contactsRes.json() : [];
      const projects = projectsRes.ok ? await projectsRes.json() : [];
      const blogs = blogsRes.ok ? await blogsRes.json() : [];

      setStats({
        contacts: Array.isArray(contacts) ? contacts.length : 0,
        projects: Array.isArray(projects) ? projects.length : 0,
        blogs: Array.isArray(blogs) ? blogs.length : 0,
      });
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Contact Messages",
      count: stats.contacts,
      icon: FaEnvelope,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Projects",
      count: stats.projects,
      icon: FaProjectDiagram,
      gradient: "from-primary-500 to-accent-500",
    },
    {
      title: "Blog Posts",
      count: stats.blogs,
      icon: FaNewspaper,
      gradient: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-[#ADB7BE]">
          Welcome back! Here&apos;s an overview of your portfolio.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((card) => (
          <div
            key={card.title}
            className="glass rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-12 h-12 rounded-lg bg-gradient-to-r ${card.gradient} flex items-center justify-center`}
              >
                <card.icon className="text-white text-xl" />
              </div>
            </div>
            <h3 className="text-[#ADB7BE] text-sm mb-1">{card.title}</h3>
            <p className="text-3xl font-bold text-white">
              {loading ? (
                <span className="inline-block w-10 h-8 bg-dark-300 rounded animate-pulse" />
              ) : (
                card.count
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
