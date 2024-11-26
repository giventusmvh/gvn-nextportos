import Link from "next/link";

export default function Navlink({ href, title }) {
  return (
    <Link
      href={href}
      className="block py-2 pl-3 pr-4 text-white sm:text-xl rounded md:p-0 relative group font-semibold font-sans"
    >
      <span className="relative z-10 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-primary-500 hover:to-secondary-500 ease-in-out duration-300">
        {title}
      </span>
      <span className="absolute bottom-0 left-0 block w-1 h-[2px] bg-gradient-to-r from-primary-500 to-secondary-500 transition-all duration-300 ease-out transform scale-x-0 group-hover:w-full group-hover:scale-x-100"></span>
    </Link>
  );
}
