import Image from "next/image";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-black ">
      <Navbar/>
      <div className="container md:max-w-[1200px] mt-24 mx-auto px-12 py-4 ]"><HeroSection/><Skills/><Projects/><Footer/></div>
    </main>
  );
}
