'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'SC-25', href: '/supernatural-canada' },
  { label: 'Connect', href: '/connect' },
  { label: 'Events', href: '/events' },
  {
    label: 'Locations',
    children: [
      { label: 'Calgary', href: '/locations/calgary' },
      { label: 'Toronto', href: '/locations/toronto' },
      { label: 'Vancouver', href: '/locations/vancuover' },
    ],
  },
  { label: 'Service Recap', href: '/service-recap' },
  { label: 'Give', href: '/give' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState('');
  const [openMobileGroup, setOpenMobileGroup] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const closeMobileMenu = () => {
    setMenuOpen(false);
    setOpenMobileGroup('');
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 bg-black transition-opacity duration-300 ${
        scrolled ? 'opacity-90 shadow-md' : 'opacity-100'
      }`}
    >
      <nav className="max-w-[1440px] mx-auto px-4 py-4 flex items-center justify-between h-[100px]">
        <Link href="/" className="flex-shrink-0">
          <div className="relative w-[240px] h-[60px] overflow-hidden">
            <Image
              src="/assets/kingsword-logo.jpg"
              alt="KingsWord Logo"
              fill
              priority
              className="object-contain object-left scale-[2.5] origin-left"
            />
          </div>
        </Link>

        <ul className="hidden md:flex items-center gap-8 text-base lg:text-lg font-semibold text-white">
          {NAV_ITEMS.map((item) => {
            if (!item.children) {
              return (
                <li key={item.label}>
                  <Link href={item.href} className="hover:text-yellow-400 transition-colors duration-200">
                    {item.label}
                  </Link>
                </li>
              );
            }

            const isOpen = openDropdown === item.label;

            return (
              <li
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown('')}
              >
                <button
                  type="button"
                  onClick={() => setOpenDropdown(isOpen ? '' : item.label)}
                  className="flex items-center gap-1 hover:text-yellow-400 transition-colors duration-200"
                >
                  {item.label}
                  <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <ul className="absolute top-[125%] left-0 min-w-[180px] overflow-hidden rounded-md border border-gray-700 bg-black text-white shadow-lg">
                    {item.children.map((child) => (
                      <li key={child.label}>
                        <Link
                          href={child.href}
                          className="block px-4 py-2 hover:bg-gray-700 transition-colors duration-200"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white z-[100]"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {menuOpen && (
        <button
          type="button"
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          aria-label="Close menu overlay"
          onClick={closeMobileMenu}
        />
      )}

      <div
        className={`fixed top-0 left-0 w-[80%] max-w-[360px] h-screen bg-black text-white z-40 transform transition-transform duration-300 ease-in-out md:hidden ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-700">
          <span className="text-lg font-semibold">Menu</span>
          <button type="button" onClick={closeMobileMenu} aria-label="Close menu">
            <X size={24} />
          </button>
        </div>

        <ul className="flex flex-col px-4 py-4 gap-1 text-base font-medium">
          {NAV_ITEMS.map((item) => {
            if (!item.children) {
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={closeMobileMenu}
                    className="block py-3 border-b border-gray-800 hover:text-yellow-400 transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              );
            }

            const isMobileGroupOpen = openMobileGroup === item.label;

            return (
              <li key={item.label} className="border-b border-gray-800">
                <button
                  type="button"
                  onClick={() => setOpenMobileGroup(isMobileGroupOpen ? '' : item.label)}
                  className="w-full py-3 flex items-center justify-between hover:text-yellow-400 transition-colors duration-200"
                >
                  {item.label}
                  <ChevronDown className={`w-4 h-4 transition-transform ${isMobileGroupOpen ? 'rotate-180' : ''}`} />
                </button>

                {isMobileGroupOpen && (
                  <ul className="pb-2 pl-4">
                    {item.children.map((child) => (
                      <li key={child.label}>
                        <Link
                          href={child.href}
                          onClick={closeMobileMenu}
                          className="block py-2 text-sm text-gray-300 hover:text-yellow-400 transition-colors duration-200"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}
