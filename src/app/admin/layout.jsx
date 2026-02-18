"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FaHome,
  FaEnvelope,
  FaProjectDiagram,
  FaNewspaper,
  FaSignOutAlt,
  FaTachometerAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useState } from "react";

const sidebarLinks = [
  { title: "Dashboard", href: "/admin", icon: FaTachometerAlt },
  { title: "Contacts", href: "/admin/contacts", icon: FaEnvelope },
  { title: "Projects", href: "/admin/projects", icon: FaProjectDiagram },
  { title: "Blogs", href: "/admin/blogs", icon: FaNewspaper },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Don't show admin layout on login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-dark-100 border-r border-white/10 flex flex-col transform transition-transform duration-300 lg:translate-x-0 flex-shrink-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 border-b border-white/10">
          <Link href="/" className="flex items-center gap-2 text-white">
            <FaHome className="text-lg" />
            <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-600">
              Admin Panel
            </span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {sidebarLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/admin" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-primary-500/20 text-primary-400 border border-primary-500/30"
                    : "text-[#ADB7BE] hover:bg-white/5 hover:text-white"
                }`}
              >
                <link.icon className="text-lg" />
                {link.title}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all duration-200 w-full"
          >
            <FaSignOutAlt className="text-lg" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        {/* Mobile header */}
        <header className="lg:hidden flex items-center justify-between p-4 border-b border-white/10 bg-dark-100">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-white p-2"
          >
            <FaBars className="text-xl" />
          </button>
          <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-600">
            Admin Panel
          </span>
          <div className="w-10" />
        </header>

        <main className="flex-1 p-6 lg:p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
