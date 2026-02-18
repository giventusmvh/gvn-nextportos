import Link from "next/link";
import { motion } from "framer-motion";

export default function NavLink({ href, title }) {
  return (
    <Link
      href={href}
      className="block py-2 pl-3 pr-4 text-[#ADB7BE] text-base font-medium tracking-wide rounded md:p-0 hover:text-white relative group transition-colors duration-300"
    >
      <span className="relative z-10">{title}</span>
      <motion.span
        className="absolute bottom-0 left-0 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 origin-left"
        transition={{ duration: 0.3 }}
      />
    </Link>
  );
}
