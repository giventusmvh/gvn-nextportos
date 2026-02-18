import Image from "next/image";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import BlogSection from "./components/BlogSection";
import Footer from "./components/Footer";
import EmailSection from "./components/EmailSection";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-background">
      <Navbar/>
      <div className="container mt-24 mx-auto px-6 md:px-12 lg:max-w-7xl py-4"><HeroSection/><Skills/><Projects/><BlogSection/><EmailSection/><Footer/></div>
    </main>
  );
}
