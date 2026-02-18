"use client";
import { useState, useEffect } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
  FaSpinner,
  FaNewspaper,
} from "react-icons/fa";

const emptyBlog = {
  title: "",
  excerpt: "",
  content_url: "",
  cover_image: "",
  tags: [],
  is_published: true,
};

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [form, setForm] = useState(emptyBlog);
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch("/api/admin/blogs");
      if (res.ok) setBlogs(await res.json());
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const openCreate = () => {
    setEditingBlog(null);
    setForm(emptyBlog);
    setTagInput("");
    setShowModal(true);
  };

  const openEdit = (blog) => {
    setEditingBlog(blog);
    setForm({
      title: blog.title || "",
      excerpt: blog.excerpt || "",
      content_url: blog.content_url || "",
      cover_image: blog.cover_image || "",
      tags: blog.tags || [],
      is_published: blog.is_published ?? true,
    });
    setTagInput("");
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const method = editingBlog ? "PUT" : "POST";
      const body = editingBlog ? { id: editingBlog.id, ...form } : form;

      const res = await fetch("/api/admin/blogs", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        await fetchBlogs();
        setShowModal(false);
      }
    } catch (error) {
      console.error("Failed to save:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    setDeleting(id);
    try {
      const res = await fetch("/api/admin/blogs", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) setBlogs(blogs.filter((b) => b.id !== id));
    } catch (error) {
      console.error("Failed to delete:", error);
    } finally {
      setDeleting(null);
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !form.tags.includes(tagInput.trim())) {
      setForm({ ...form, tags: [...form.tags, tagInput.trim()] });
      setTagInput("");
    }
  };

  const removeTag = (t) => {
    setForm({ ...form, tags: form.tags.filter((tag) => tag !== t) });
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const inputClass =
    "bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5 outline-none focus:border-primary-500 transition-colors";

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Blog Posts</h1>
          <p className="text-[#ADB7BE]">Manage your blog articles</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-gradient-to-r from-primary-500 to-secondary-600 text-white font-medium py-2.5 px-5 rounded-lg hover:from-primary-600 hover:to-secondary-700 transition-all"
        >
          <FaPlus /> Add Post
        </button>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass rounded-xl p-6 animate-pulse h-24" />
          ))}
        </div>
      ) : blogs.length === 0 ? (
        <div className="glass rounded-xl p-12 text-center">
          <FaNewspaper className="text-5xl text-[#ADB7BE] mx-auto mb-4" />
          <p className="text-[#ADB7BE] text-lg">No blog posts yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="glass rounded-xl p-4 hover:bg-white/10 transition-all duration-200 flex items-center gap-4"
            >
              {blog.cover_image && (
                <div
                  className="w-16 h-16 rounded-lg bg-center bg-cover flex-shrink-0"
                  style={{ backgroundImage: `url(${blog.cover_image})` }}
                />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-white font-semibold truncate">
                    {blog.title}
                  </h3>
                  {!blog.is_published && (
                    <span className="px-2 py-0.5 text-xs rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                      Draft
                    </span>
                  )}
                </div>
                <p className="text-[#ADB7BE] text-sm truncate">
                  {blog.excerpt}
                </p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs text-[#ADB7BE]">
                    {formatDate(blog.created_at)}
                  </span>
                  {(blog.tags || []).slice(0, 3).map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 bg-primary-900/40 text-xs text-primary-400 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => openEdit(blog)}
                  className="p-2 text-primary-400 hover:bg-primary-500/10 rounded-lg transition-all"
                  title="Edit"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(blog.id)}
                  disabled={deleting === blog.id}
                  className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-all disabled:opacity-50"
                  title="Delete"
                >
                  {deleting === blog.id ? (
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
                {editingBlog ? "Edit Blog Post" : "New Blog Post"}
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
                  placeholder="Blog post title"
                />
              </div>

              <div>
                <label className="text-white text-sm font-medium block mb-1">
                  Excerpt
                </label>
                <textarea
                  value={form.excerpt}
                  onChange={(e) =>
                    setForm({ ...form, excerpt: e.target.value })
                  }
                  className={`${inputClass} h-24 resize-none`}
                  placeholder="Brief summary of the post"
                />
              </div>

              <div>
                <label className="text-white text-sm font-medium block mb-1">
                  Content URL
                </label>
                <input
                  value={form.content_url}
                  onChange={(e) =>
                    setForm({ ...form, content_url: e.target.value })
                  }
                  className={inputClass}
                  placeholder="https://medium.com/... or external link"
                />
              </div>

              <div>
                <label className="text-white text-sm font-medium block mb-1">
                  Cover Image URL
                </label>
                <input
                  value={form.cover_image}
                  onChange={(e) =>
                    setForm({ ...form, cover_image: e.target.value })
                  }
                  className={inputClass}
                  placeholder="/images/blogs/cover.png or https://..."
                />
              </div>

              {/* Tags */}
              <div>
                <label className="text-white text-sm font-medium block mb-1">
                  Tags
                </label>
                <div className="flex gap-2 mb-2 flex-wrap">
                  {form.tags.map((t) => (
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
                    placeholder="Add tag (e.g. React, Tutorial)"
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

              <div className="flex items-center gap-3">
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
