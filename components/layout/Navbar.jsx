'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'SC–25', href: '/sc-25' },
  { label: 'Connect', href: '/connect' },
  { label: 'Events', href: '/events' },
  { label: 'Service-Recap', href: '/service-recap' },
  { label: 'Give', href: '/give' },
];

const locationLinks = [
  { label: 'Calgary', href: '/locations/calgary' },
  { label: 'Toronto', href: '/locations/toronto' },
  { label: 'Vancuover', href: '/locations/vancuover' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 bg-black transition-opacity duration-300 ${
        scrolled ? 'opacity-90 shadow-md' : 'opacity-100'
      }`}
    >
      <nav className="max-w-[1440px] mx-auto px-4 py-4 flex items-center justify-between h-[80px]">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 -ml-4">
          <div className="relative w-[140px] h-[74px]">
            <Image
              src="/assets/logo.webp"
              alt="Logo"
              fill
              priority
              className="object-cover"
            />
          </div>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-10 text-lg font-semibold text-white">
          {navLinks.map(({ label, href }) => (
            <li key={label}>
              <Link href={href} className="hover:text-yellow-400 transition">
                {label}
              </Link>
            </li>
          ))}
          <li className="relative">
            <button
              onClick={() => setLocationOpen((prev) => !prev)}
              className="flex items-center gap-1 hover:text-yellow-400 transition"
            >
              Locations
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  locationOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            {locationOpen && (
              <ul className="absolute top-[120%] left-0 bg-black text-white rounded-md shadow-lg z-50 min-w-[160px] overflow-hidden border border-gray-700">
                {locationLinks.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="block px-4 py-2 hover:bg-gray-700 transition"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white z-[100]"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu Slide-in */}
      <div
        className={`fixed top-0 left-0 w-[75%] h-screen bg-black text-white z-40 transform transition-transform duration-300 ease-in-out ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* <div className="flex justify-between items-center px-4 py-4 border-b border-gray-700">
          <Link href="/" onClick={() => setMenuOpen(false)}>
            <div className="relative w-[200px] h-[50px]">
              <Image
                src="/assets/logo.webp"
                alt="Logo"
                fill
                className="object-contain"
              />
            </div>
          </Link>
          <button onClick={() => setMenuOpen(false)} className="text-white">
            <X size={28} />
          </button>
        </div> */}

        <ul className="flex flex-col px-4 py-6 gap-4 text-lg font-medium">
          {navLinks.map(({ label, href }) => (
            <li key={label}>
              <Link
                href={href}
                onClick={() => setMenuOpen(false)}
                className="block py-2 border-b border-gray-700"
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            <details className="group">
              <summary className="flex justify-between items-center py-2 cursor-pointer border-b border-gray-700">
                <span>Locations</span>
                <ChevronDown className="w-5 h-5 group-open:rotate-180 transition-transform" />
              </summary>
              <ul className="mt-2 pl-4">
                {locationLinks.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      onClick={() => setMenuOpen(false)}
                      className="block py-1 text-sm"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </header>
  );
}
