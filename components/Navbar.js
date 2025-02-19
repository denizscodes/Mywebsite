"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { title: "Ana Sayfa", href: "/" },
    { title: "Hakkımda", href: "/#hakkımda" },
    { title: "Projeler", href: "/#projeler" },
    { title: "Bloglar", href: "/blog" },
    { title: "İletişim", href: "/#contact" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 top-0 ${
        isScrolled ? "bg-white/90 backdrop-blur-sm shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="text-2xl font-semibold">
            <Image
              src={"/deniz2.png"}
              width={"200"}
              height={"200"}
              alt="kjebkj"
            ></Image>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`transition-colors duration-300 ${
                  isScrolled ?? "text-gray-800 hover:text-black"
                }`}
              >
                {item.title}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2 bg-black"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-sm">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block py-4 px-4 text-gray-800 hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.title}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
