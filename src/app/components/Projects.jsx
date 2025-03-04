"use client";
import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";

const projectsData = [
  {
    id: 1,
    title: "This Portfolio",
    description:
      "My latest portfolio website made with NextJS and ReactJS, also some react library.",
    image: "/images/projects/nextporto.png",
    tag: ["All", "Web"],
    techStack: ["NextJS", "ReactJS", "TailwindCSS"],
    link: "https://giventusmarco.vercel.app/",
    github: "https://github.com/giventusmvh/giventusmarco",
  },
  {
    id: 2,
    title: "Indiego",
    description:
      "Fullstack Website to order for psychology services, built with Laravel MVC for my intern at PT Talenta Sinergi Group and my undergraduate thesis, preview not available, only the code.",
    image: "/images/projects/indiego.png",
    tag: ["All", "Web"],
    techStack: ["Laravel", "TailwindCSS", "Javascript"],
    link: "https://giventusmarco.vercel.app/",
    github: "https://github.com/giventusmvh/indiego-skripsi",
  },
  {
    id: 3,
    title: "React Essentials",
    description: "Website to learn react essentials, made with ReactJs",
    image: "/images/projects/react-essentials.png",
    tag: ["All", "Web"],
    techStack: ["React"],
    link: "https://gvn-reactstarter.vercel.app/",
    github: "https://github.com/giventusmvh/GvnReactStarter",
  },
  {
    id: 4,
    title: "Tic-Tac-Toe",
    description: "Interactive tictactoe website made with ReactJs",
    image: "/images/projects/tictactoe.png",
    tag: ["All", "Web"],
    techStack: ["React"],
    link: "https://gvn-tictactoe.vercel.app/",
    github: "https://github.com/giventusmvh/tictactoe-react",
  },
  {
    id: 5,
    title: "Investment Calculator",
    description: "Website to count your investment returns and durations",
    image: "/images/projects/investment-calc.png",
    tag: ["All", "Web"],
    techStack: ["React"],
    link: "https://gvn-investment-calculator.vercel.app/",
    github: "https://github.com/giventusmvh/investment-calculator",
  },
  {
    id: 6,
    title: "Post It!",
    description:
      "Social website to post your thoughts, got some dummy backend to support it, but not deployed yet.",
    image: "/images/projects/postit.png",
    tag: ["All", "Web"],
    techStack: ["React"],
    link: "https://github.com/giventusmvh/react-socialpost",
    github: "https://github.com/giventusmvh/react-socialpost",
  },
  {
    id: 7,
    title: "Elvron",
    description:
      "A company profile website for PT.Talenta Sinergi Group. A holding company focused on investing in the tech industry, and we have several subsidiaries.",
    image: "/images/projects/elvron.png",
    tag: ["All", "Web"],
    techStack: ["HTML", "Tailwind", "Javascript", "Vite"],
    link: "https://elvron.vercel.app/",
    github: "https://github.com/eduwork-development/Elvron",
  },
  {
    id: 8,
    title: "MyDoit",
    description:
      "My Doit is a company profile website about providing an financial ecosystem and enhance business performance and ensure company sustainability effectively and efficiently.",
    image: "/images/projects/mydoit.png",
    tag: ["All", "Web"],
    techStack: ["HTML", "Tailwind", "Javascript", "Vite"],
    link: "https://mydoit.vercel.app/",
    github: "https://github.com/eduwork-development/MyDoit",
  },
  {
    id: 9,
    title: "Eduwork",
    description:
      "Landing Page about Eduwork, which is a company that provides education and training services, often focusing on career development and skill enhancement.",
    image: "/images/projects/eduwork.png",
    tag: ["All", "Web"],
    techStack: ["HTML", "Tailwind", "Javascript", "Vite"],
    link: "https://sosmed.edudev.xyz/lp-b2b",
    github: "https://sosmed.edudev.xyz/lp-b2b",
  },
  {
    id: 10,
    title: "Salenda",
    description: "Landing Page for Sale Pisang UMKM",
    image: "/images/projects/salenda.png",
    tag: ["All", "Web"],
    techStack: ["HTML", "Tailwind", "Javascript", "Vite"],
    link: "https://salenda.id/",
    github: "https://github.com/eduwork-development/Sale-Pisang",
  },
  {
    id: 11,
    title: "Nyanting",
    description:
      "Nyanting offers real-time guidance, enhances accuracy, and provides a more accessible learning environment for both beginners and seasoned artisans, using Apple Watch as companion during the process with reminders and feedback.",
    image: "/images/projects/nyanting.png",
    tag: ["All", "Mobile"],
    techStack: ["Swift", "SwiftUI", "Watch Connectivity", "Machine Learning"],
    link: "",
    github: "https://github.com/Alas-Purwo/nyanting",
  },
  {
    id: 12,
    title: "Pulse",
    description:
      "iOS and watchOS app designed to empower women by providing them with a reliable tool to monitor their heart rates and send emergency notifications when necessary.",
    image: "/images/projects/pulse.png",
    tag: ["All", "Mobile"],
    techStack: [
      "Swift",
      "SwiftUI",
      "UIKit",
      "MVVM",
      "HealthKit",
      "MapKit",
      "Firebase",
      "Web Socket",
    ],
    link: "https://testflight.apple.com/join/FP5U793w",
    github: "https://github.com/dinda-ayu-syafitri/MC3",
  },
  {
    id: 13,
    title: "Don't Slip",
    description:
      "Game contains challenging task of keeping a penguin balanced on a constantly shifting iceberg. The player must use precise tilts and jumps to prevent the penguin from slipping off.",
    image: "/images/projects/penguin.png",
    tag: ["All", "Mobile"],
    techStack: ["Swift", "SpriteKit", "UIKit", "MDA Framework"],
    link: "https://testflight.apple.com/join/bNmofhv9",
    github: "https://github.com/althafnafi/dont-slip",
  },
  {
    id: 14,
    title: "iAm Notes",
    description:
      "iAm is designed to help users log their emotions and thoughts in a structured and meaningful way. The core idea is simple: allow users to log notes based on their emotions.",
    image: "/images/projects/iam.png",
    tag: ["All", "Mobile"],
    techStack: ["Swift", "SwiftUI", "SwiftData", "MVVM"],
    link: "https://testflight.apple.com/join/6E212fbe",
    github: "https://github.com/danieliank/iAm",
  },
  {
    id: 15,
    title: "Protake",
    description:
      "Designed to help users monitor and log their daily protein intake, with a recommended goal of up to 100 grams of protein per day to support muscle growth.",
    image: "/images/projects/protake.png",
    tag: ["All", "Mobile"],
    techStack: ["Swift", "SwiftUI", "SwiftData"],
    link: "https://github.com/giventusmvh/ProteinIntake.git",
    github: "https://github.com/giventusmvh/ProteinIntake.git",
  },
  {
    id: 16,
    title: "Pitch Match",
    description:
      "PitchMatch will analyze your voice, using the help of Apple Audio technology, SpeechKit and Machine Learning, then displaying the result as a score for you.",
    image: "/images/projects/pitchmatch.png",
    tag: ["All", "Mobile"],
    techStack: ["Swift", "SwiftUI", "AVFoundation", "MVVM"],
    link: "https://testflight.apple.com/join/hXoNS9l0",
    github: "https://github.com/PitchMatch-ADA/PitchMatch-App",
  },
  {
    id: 17,
    title: "GitHub Followers",
    description:
      "App to see github followers of a selected user. Built programmatically with UIKit, tried to implement iOS development best practices, some of the code still have comments for learning purposes.",
    image: "/images/projects/ghfollowers.png",
    tag: ["All", "Mobile"],
    techStack: ["Swift", "UIKit", "AVFoundation", "MVC"],
    link: "-",
    github: "https://github.com/giventusmvh/GitHubFollowers",
  },
  {
    id: 18,
    title: "PokeDex",
    description:
      "An app that displayed up to third gen pokemon using pokemon api",
    image: "/images/projects/pokedex3.png",
    tag: ["All", "Mobile"],
    techStack: ["Swift", "SwiftUI", "Core Data", "MVVM"],
    link: "-",
    github: "https://github.com/giventusmvh/PokeDex3",
  },
  {
    id: 19,
    title: "Crypto Indicators Bot",
    description:
      "Discord bot with crypto indicators based on CMP, RSI, EMA, Delta, Liquidity, and Trend Bias. I create this using python with binance APIs, pandas, and numpy. This project is private because i use my own binance secret key to create this project.",
    image: "/images/projects/botcrypto.png",
    tag: ["All", "Python"],
    techStack: ["Python"],
    link: "-",
    github: "-",
  },
  {
    id: 20,
    title: "Macroverse Web Design",
    description:
      "Macroverse is an information media for finance, crypto, and forex. This is the website design i make for Macroverse. Already got responsive design for both desktop and mobile.",
    image: "/images/projects/macroversecover.png",
    tag: ["All", "UI/UX Design"],
    techStack: ["Figma"],
    link: "https://www.figma.com/design/M3JjPoEHXdUpjxSiqi5yIu/Macroverse?node-id=24-1422&t=9uChZPpPoEZnodlN-1",
    github: "-",
  },
  {
    id: 21,
    title: "ShopEase Web Design",
    description:
      "ShopEase is a fictional e-commerce, I create this design using figma with modern e-commerce design in mind.",
    image: "/images/projects/shopeasecover.png",
    tag: ["All", "UI/UX Design"],
    techStack: ["Figma"],
    link: "https://www.figma.com/design/o11H0BcP2EVsfNoGn8F0Vv/E-Commerce-Landing-Page?node-id=3-224&t=Je9Z9ELZ1us9zUQu-1",
    github: "-",
  },
  {
    id: 22,
    title: "FaithMind App Design",
    description:
      "FaithMind is a gamified app to encourage user to do more Bible reading, I conduct this design by research first, the research flow is available on the figma page.",
    image: "/images/projects/faithmindcover.png",
    tag: ["All", "UI/UX Design"],
    techStack: ["Figma"],
    link: "https://www.figma.com/design/VleBX3HzieVCE7fJ1WK9il/FaithMind---Gamified-Bible-Reading-App?node-id=0-1&t=dVrIcsZqNeRok0k3-1",
    github: "-",
  },
];

const Projects = () => {
  const [tag, setTag] = useState("All");

  const filteredProjects = projectsData.filter((project) =>
    project.tag.includes(tag)
  );

  const handleTagChange = (newTag) => {
    setTag(newTag);
  };

  return (
    <section id="project" className="scroll-mt-[100px]">
      <div className="flex flex-col mb-12 mt-44 ">
        <h1 className="text-white flex justify-center items-center text-md sm:text-md lg:text-md ">
          Check out my
        </h1>
        <h1 className="text-transparent bg-clip-text  bg-gradient-to-r from-primary-600 to-secondary-400 hover:bg-slate-200 flex justify-center items-center text-2xl sm:text-5xl lg:text-5xl font-bold">
          Projects
        </h1>
      </div>
      <div className="flex flex-row flex-wrap justify-center items-center gap-2 text-white my-6">
        <ProjectTag
          name="All"
          onClick={handleTagChange}
          isSelected={tag === "All"}
        />
        <ProjectTag
          name="Web"
          onClick={handleTagChange}
          isSelected={tag === "Web"}
        />
        <ProjectTag
          name="Mobile"
          onClick={handleTagChange}
          isSelected={tag == "Mobile"}
        />
        <ProjectTag
          name="Python"
          onClick={handleTagChange}
          isSelected={tag == "Python"}
        />
        <ProjectTag
          name="UI/UX Design"
          onClick={handleTagChange}
          isSelected={tag == "UI/UX Design"}
        />
      </div>
      <div className="grid md:grid-cols-3 gap-8 md:gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            description={project.description}
            imgUrl={project.image}
            techStack={project.techStack} // Pass techStack here
            link={project.link}
            github={project.github}
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;
