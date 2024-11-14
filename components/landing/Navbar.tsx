"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

const links = [
  { url: "/#videos", title: "Videos" },
  { url: "/#books", title: "Books" },
  { url: "/#exam-materials", title: "Exam Materials" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const topVariants = {
    closed: {
      rotate: 0,
      y: 0,
    },
    opened: {
      rotate: 45,
      y: 7, // Move down slightly
    },
  };

  const centerVariants = {
    closed: {
      opacity: 1,
    },
    opened: {
      opacity: 0,
    },
  };

  const bottomVariants = {
    closed: {
      rotate: 0,
      y: 0,
    },
    opened: {
      rotate: -45,
      y: -7, // Move up slightly
    },
  };

  const listVariants = {
    closed: {
      x: "100vw",
    },
    opened: {
      x: 0,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const listItemVariants = {
    closed: {
      x: -10,
      opacity: 0,
    },
    opened: {
      x: 0,
      opacity: 1,
    },
  };

  return (
    <div className=" mb-14 flex px-4 sm:px-6 lg:px-10 xl:px-24 pt-3 justify-between items-center">
      {/* Logo */}
      <Link href={"/"} className="flex items-center justify-center">
        <Image
          src="/landing/logo.svg"
          alt=""
          width={70}
          height={70}
          className="w-16 h-16 sm:w-20 sm:h-20"
        />
      </Link>

      {/* Large screen navbar links */}
      <div className="hidden md:flex gap-6 ">
        <motion.div variants={listItemVariants}>
          <Link
            href={"/#how-it-works"}
            className="hover:underline font-semibold"
          >
            How it works
          </Link>
        </motion.div>
        {links.map((link) => (
          <Link key={link.title} href={link.url}>
            <span className="text-white text-sm xl:text-base font-semibold hover:underline">
              {link.title}
            </span>
          </Link>
        ))}
      </div>

      {/* Right side */}
      <div className="flex justify-center items-center gap-2">
        <Link href="/#mentors">
          <button className="py-2 px-3 lg:py-3 lg:px-4 bg-white rounded-md font-bold text-sm text-blue-800">
            Become a Mentor
          </button>
        </Link>

        {/* Menu button */}
        <button
          className="md:hidden z-50 relative w-6 h-4 flex flex-col justify-between"
          onClick={() => setOpen(!open)}
        >
          <motion.div
            variants={topVariants}
            animate={open ? "opened" : "closed"}
            className="w-6 h-[1.5px]  bg-white  rounded origin-center"
          ></motion.div>
          <motion.div
            variants={centerVariants}
            animate={open ? "opened" : "closed"}
            className="w-6 h-[1.5px]   bg-white   rounded"
          ></motion.div>
          <motion.div
            variants={bottomVariants}
            animate={open ? "opened" : "closed"}
            className="w-6 h-[1.5px]  bg-white  rounded origin-center"
          ></motion.div>
        </button>

        {/* Menu list */}
        {open && (
          <motion.div
            variants={listVariants}
            initial="closed"
            animate="opened"
            className="absolute top-0 left-0 w-screen h-screen bg-slate-400 bg-opacity-60 backdrop-blur-2xl text-slate-700 font-semibold flex flex-col items-center justify-center gap-8 text-xl z-40"
          >
            <Link
              target="_blank"
              href={"https://youtu.be/LdRuBmEljhg?si=XkICNq1R_VWP0-jd"}
            >
              How it works
            </Link>
            {links.map((link) => (
              <motion.div variants={listItemVariants} key={link.title}>
                <Link href={link.url}>{link.title}</Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
