"use client";

import { HandCoins, Search } from "lucide-react";
import Link from "next/link";
import { Result } from "postcss";
import React, { useState, useEffect, ChangeEvent } from "react";

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Result[]>([]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const [responseAlat, responsePenyewaan] = await Promise.all([
        fetch(`https://penyewaan.vercel.app/api/v1/alat?search=${query}`, {
          method: "GET",
        }),
        fetch(`https://penyewaan.vercel.app/api/v1/penyewaan?search=${query}`, {
          method: "GET",
        })
      ]);

      const [resultAlat, resultPenyewaan] = await Promise.all([
        responseAlat.json(),
        responsePenyewaan.json()
      ]);

      console.log(resultAlat, resultPenyewaan);
      setResults([
        `Result for "${query}":`,
        "Alat:", resultAlat,
        "Penyewaan:", resultPenyewaan
      ]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav
        className={`bg-[#3F4F44] border-gray-200 w-full z-50 h-20 shadow-md fixed top-0 transition-all ${
          isScrolled ? "bg-[#727D73]/90" : "bg-opacity-100"
        }`}
      >
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
          <Link href="/">
            <div className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer ">
              <img
                src="/logo.png"
                className="h-[70px] w-[70px] pt-3"
                alt="logo"
              />
              <span className="self-center text-xl font-semibold whitespace-nowrap text-[#DCD7C9]">
                CAMP-TOOLS
              </span>
            </div>
          </Link>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse justify-center">
          </div>
          <div
            className="items-center justify-center hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-cta"
          >
            <ul className="flex flex-col font-bold p-4 md:p-0 mt-4 border  rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 mr-56">
              {[
                { name: "Home", href: "/home" },
                { name: "Category", href: "/user" },
              ].map((item, index) => (
                <li key={index}>
                  <Link href={item.href}>
                    <span className="relative block py-2 px-3 md:p-0 text-[#DCD7C9] hover:text-[#A4B465] after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-[#A4B465] after:scale-x-0 after:origin-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-left cursor-pointer">
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
