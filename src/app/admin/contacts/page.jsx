"use client";
import { useState, useEffect } from "react";
import { FaTrash, FaEnvelope, FaSpinner } from "react-icons/fa";

export default function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await fetch("/api/admin/contacts");
      if (res.ok) {
        const data = await res.json();
        setContacts(data);
      }
    } catch (error) {
      console.error("Failed to fetch contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    setDeleting(id);
    try {
      const res = await fetch("/api/admin/contacts", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setContacts(contacts.filter((c) => c.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete:", error);
    } finally {
      setDeleting(null);
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Contact Messages</h1>
        <p className="text-[#ADB7BE]">
          Messages from visitors of your portfolio
        </p>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass rounded-xl p-6 animate-pulse h-32" />
          ))}
        </div>
      ) : contacts.length === 0 ? (
        <div className="glass rounded-xl p-12 text-center">
          <FaEnvelope className="text-5xl text-[#ADB7BE] mx-auto mb-4" />
          <p className="text-[#ADB7BE] text-lg">No messages yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="glass rounded-xl p-6 hover:bg-white/10 transition-all duration-200"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <span className="text-primary-400 font-medium text-sm">
                      {contact.email}
                    </span>
                    <span className="text-[#ADB7BE] text-xs">
                      {formatDate(contact.created_at)}
                    </span>
                  </div>
                  <h3 className="text-white font-semibold mb-2 truncate">
                    {contact.subject}
                  </h3>
                  <p className="text-[#ADB7BE] text-sm whitespace-pre-wrap">
                    {contact.message}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(contact.id)}
                  disabled={deleting === contact.id}
                  className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-all flex-shrink-0 disabled:opacity-50"
                  title="Delete message"
                >
                  {deleting === contact.id ? (
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
    </div>
  );
}
