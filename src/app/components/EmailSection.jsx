import React from "react";
import { FaLinkedin, FaGithub, FaInstagram, FaWhatsapp } from "react-icons/fa"; // Import icons
import Link from "next/link";
import Image from "next/image";
import { IoMdMail } from "react-icons/io";

const EmailSection = () => {
  return (
    // <section className="grid md:grid-cols-2 my-12 md:my-16 py-24 gap-4 relative">
    <section
      id="contact"
      className="flex flex-col justify-center items-center text-center mt-24"
    >
      {/* <div className="absolute w-80 h-80 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900 to-transparent rounded-full blur-lg top-full -left-4 transform -translate-x-1/2 -translate-y-1/2"></div> */}
      <div className="z-10">
        <h5 className="text-xl md:text-3xl font-bold text-white my-2">
          Let&apos;s Connect
        </h5>
        <p className="text-[#ADB7BE] mb-4 max-w-md">
          I&apos;m currently looking for new opportunities and projects. Whether
          you have a question or just want to say hi, reach me out from any of
          my social media below, I&apos;ll try my best to get back to you as
          soon as possible!
        </p>
        <div className="flex justify-center gap-4 mt-6">
          <a
            href="https://www.linkedin.com/in/giventus/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center transition-all duration-300 ease-out  hover:bg-gradient-to-br from-pink-500 to-purple-500  "
          >
            <FaLinkedin className="text-white text-xl" />
          </a>
          <a
            href="https://www.instagram.com/gvn.mzt/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center transition-all duration-300 ease-out  hover:bg-gradient-to-br from-pink-500 to-purple-500  "
          >
            <FaInstagram className="text-white text-xl" />
          </a>
          <a
            href="https://github.com/giventusmvh"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center transition-all duration-300 ease-out  hover:bg-gradient-to-br from-pink-500 to-purple-500  "
          >
            <FaGithub className="text-white text-xl" />
          </a>
          <a
            href="https://wa.me/628112958568"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center transition-all duration-300 ease-out  hover:bg-gradient-to-br from-pink-500 to-purple-500  "
          >
            <FaWhatsapp className="text-white text-xl" />
          </a>
          <a
            href="mailto:giventusmrco@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center transition-all duration-300 ease-out  hover:bg-gradient-to-br from-pink-500 to-purple-500  "
          >
            <IoMdMail className="text-white text-xl" />
          </a>
        </div>
      </div>
      {/* <div>
        <form>
          <div class="mb-6">
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-white"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              class="bg-gray-[#18191E] border border-[#33353F] bg-[#18191E] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg  block w-full p-2.5"
              placeholder="jacob@google.com"
              required
            />
          </div>
          <div class="mb-6">
            <label
              for="subject"
              class="block mb-2 text-sm font-medium text-white"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              class="bg-gray-[#18191E] border border-[#33353F] bg-[#18191E] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg  block w-full p-2.5"
              placeholder="Just saying hi"
            />
          </div>
          <div class="mb-6">
            <label
              for="subject"
              class="block mb-2 text-sm font-medium text-white"
            >
              Message
            </label>
            <textarea
              id="message"
              class="bg-gray-[#18191E] border border-[#33353F] bg-[#18191E] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg  block w-full p-2.5"
              placeholder="Let's talk about..."
            />
          </div>
          <div class="mb-6">
            <button
              type="submit"
              class="bg-purple-500 hover:bg-purple-600 text-white font-medium py-2.5 px-5 rounded-lg w-full"
            >
              {" "}
              Send message{" "}
            </button>
          </div>
        </form>
      </div> */}
    </section>
  );
};

export default EmailSection;
