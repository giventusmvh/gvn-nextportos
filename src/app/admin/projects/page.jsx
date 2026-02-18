"use client";
import { useState, useEffect } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
  FaSpinner,
  FaProjectDiagram,
} from "react-icons/fa";

const emptyProject = {
  title: "",
  description: "",
  image: "",
  tag: [],
  tech_stack: [],
  link: "",
  github: "",
  sort_order: 0,
  is_published: true,
};

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [form, setForm] = useState(emptyProject);
  const [tagInput, setTagInput] = useState("");
  const [techInput, setTechInput] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/admin/projects");
      if (res.ok) setProjects(await res.json());
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const openCreate = () => {
    setEditingProject(null);
    setForm(emptyProject);
    setTagInput("");
    setTechInput("");
    setShowModal(true);
  };

  const openEdit = (project) => {
    setEditingProject(project);
    setForm({
      title: project.title || "",
      description: project.description || "",
      image: project.image || "",
      tag: project.tag || [],
      tech_stack: project.tech_stack || [],
      link: project.link || "",
      github: project.github || "",
      sort_order: project.sort_order || 0,
      is_published: project.is_published ?? true,
    });
    setTagInput("");
    setTechInput("");
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const method = editingProject ? "PUT" : "POST";
      const body = editingProject ? { id: editingProject.id, ...form } : form;

      const res = await fetch("/api/admin/projects", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        await fetchProjects();
        setShowModal(false);
      }
    } catch (error) {
      console.error("Failed to save:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    setDeleting(id);
    try {
      const res = await fetch("/api/admin/projects", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) setProjects(projects.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Failed to delete:", error);
    } finally {
      setDeleting(null);
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !form.tag.includes(tagInput.trim())) {
      setForm({ ...form, tag: [...form.tag, tagInput.trim()] });
      setTagInput("");
    }
  };

  const removeTag = (t) => {
    setForm({ ...form, tag: form.tag.filter((tag) => tag !== t) });
  };

  const addTech = () => {
    if (techInput.trim() && !form.tech_stack.includes(techInput.trim())) {
      setForm({ ...form, tech_stack: [...form.tech_stack, techInput.trim()] });
      setTechInput("");
    }
  };

  const removeTech = (t) => {
    setForm({
      ...form,
      tech_stack: form.tech_stack.filter((tech) => tech !== t),
    });
  };

  const inputClass =
    "bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5 outline-none focus:border-primary-500 transition-colors";

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Projects</h1>
          <p className="text-[#ADB7BE]">Manage your portfolio projects</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-gradient-to-r from-primary-500 to-secondary-600 text-white font-medium py-2.5 px-5 rounded-lg hover:from-primary-600 hover:to-secondary-700 transition-all"
        >
          <FaPlus /> Add Project
        </button>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass rounded-xl p-6 animate-pulse h-24" />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="glass rounded-xl p-12 text-center">
          <FaProjectDiagram className="text-5xl text-[#ADB7BE] mx-auto mb-4" />
          <p className="text-[#ADB7BE] text-lg">No projects yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="glass rounded-xl p-4 hover:bg-white/10 transition-all duration-200 flex items-center gap-4"
            >
              {project.image && (
                <div
                  className="w-16 h-16 rounded-lg bg-center bg-cover flex-shrink-0"
                  style={{ backgroundImage: `url(${project.image})` }}
                />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-white font-semibold truncate">
                    {project.title}
                  </h3>
                  {!project.is_published && (
                    <span className="px-2 py-0.5 text-xs rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                      Draft
                    </span>
                  )}
                </div>
                <p className="text-[#ADB7BE] text-sm truncate">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {(project.tech_stack || []).slice(0, 4).map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 bg-dark-300 text-xs text-[#ADB7BE] rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                  {(project.tech_stack || []).length > 4 && (
                    <span className="px-2 py-0.5 text-xs text-[#ADB7BE]">
                      +{project.tech_stack.length - 4}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => openEdit(project)}
                  className="p-2 text-primary-400 hover:bg-primary-500/10 rounded-lg transition-all"
                  title="Edit"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  disabled={deleting === project.id}
                  className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-all disabled:opacity-50"
                  title="Delete"
                >
                  {deleting === project.id ? (
                    <FaSpinner className="animate-spin" />
                  ) : (
                    <FaTrash />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="glass rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">
                {editingProject ? "Edit Project" : "New Project"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-[#ADB7BE] hover:text-white p-1"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="text-white text-sm font-medium block mb-1">
                  Title *
                </label>
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                  className={inputClass}
                  placeholder="Project name"
                />
              </div>

              <div>
                <label className="text-white text-sm font-medium block mb-1">
                  Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  className={`${inputClass} h-24 resize-none`}
                  placeholder="Project description"
                />
              </div>

              <div>
                <label className="text-white text-sm font-medium block mb-1">
                  Image URL
                </label>
                <input
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  className={inputClass}
                  placeholder="/images/projects/my-project.png"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-white text-sm font-medium block mb-1">
                    Live Link
                  </label>
                  <input
                    value={form.link}
                    onChange={(e) => setForm({ ...form, link: e.target.value })}
                    className={inputClass}
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className="text-white text-sm font-medium block mb-1">
                    GitHub
                  </label>
                  <input
                    value={form.github}
                    onChange={(e) =>
                      setForm({ ...form, github: e.target.value })
                    }
                    className={inputClass}
                    placeholder="https://github.com/..."
                  />
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="text-white text-sm font-medium block mb-1">
                  Tags
                </label>
                <div className="flex gap-2 mb-2 flex-wrap">
                  {form.tag.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-1 bg-primary-900/40 text-xs text-primary-400 rounded-full border border-primary-500/20 flex items-center gap-1"
                    >
                      {t}
                      <button
                        type="button"
                        onClick={() => removeTag(t)}
                        className="hover:text-red-400"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addTag())
                    }
                    className={`${inputClass} flex-1`}
                    placeholder="Add tag (e.g. Web, Mobile)"
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="px-4 py-2 bg-dark-300 text-white rounded-lg hover:bg-dark-200 transition-colors text-sm"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Tech Stack */}
              <div>
                <label className="text-white text-sm font-medium block mb-1">
                  Tech Stack
                </label>
                <div className="flex gap-2 mb-2 flex-wrap">
                  {form.tech_stack.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-1 bg-dark-300 text-xs text-[#ADB7BE] rounded-full border border-white/10 flex items-center gap-1"
                    >
                      {t}
                      <button
                        type="button"
                        onClick={() => removeTech(t)}
                        className="hover:text-red-400"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addTech())
                    }
                    className={`${inputClass} flex-1`}
                    placeholder="Add tech (e.g. React, TypeScript)"
                  />
                  <button
                    type="button"
                    onClick={addTech}
                    className="px-4 py-2 bg-dark-300 text-white rounded-lg hover:bg-dark-200 transition-colors text-sm"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-white text-sm font-medium block mb-1">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    value={form.sort_order}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        sort_order: parseInt(e.target.value) || 0,
                      })
                    }
                    className={inputClass}
                  />
                </div>
                <div className="flex items-end">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.is_published}
                      onChange={(e) =>
                        setForm({ ...form, is_published: e.target.checked })
                      }
                      className="w-4 h-4 rounded accent-primary-500"
                    />
                    <span className="text-white text-sm">Published</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-5 py-2.5 border border-[#33353F] text-white rounded-lg hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-gradient-to-r from-primary-500 to-secondary-600 text-white font-medium py-2.5 px-5 rounded-lg hover:from-primary-600 hover:to-secondary-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                >
                  {saving && <FaSpinner className="animate-spin" />}
                  {saving ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
