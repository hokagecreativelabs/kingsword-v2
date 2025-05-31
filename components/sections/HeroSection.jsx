"use client"
import { useState, useEffect, useCallback } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const slides = [
  {
    title: "Welcome to KingsWord Canada",
    subtitle: "Home of the Supernatural",
    image: "/assets/1.webp",
    ctaLink: "http://linktr.ee/kingswordcalgary",
    ctaText: "Worship with us",
    width: 1920,
    height: 1080,
  },
  {
    title: "Welcome to KingsWord Canada",
    subtitle: "Home of the Supernatural",
    image: "/assets/2.webp",
    ctaLink: "http://linktr.ee/kingswordcalgary",
    ctaText: "Worship with us",
    width: 1920,
    height: 1080,
  },
  {
    title: "Welcome to KingsWord Canada",
    subtitle: "Home of the Supernatural",
    image: "/assets/3.webp",
    ctaLink: "http://linktr.ee/kingswordcalgary",
    ctaText: "Worship with us",
    width: 1920,
    height: 1080,
  },
  {
    title: "Welcome to KingsWord Canada",
    subtitle: "Home of the Supernatural",
    image: "/assets/4.webp",
    ctaLink: "http://linktr.ee/kingswordcalgary",
    ctaText: "Worship with us",
    width: 1920,
    height: 1080,
  },
  {
    title: "Welcome to KingsWord Canada",
    subtitle: "Home of the Supernatural",
    image: "/assets/5.webp",
    ctaLink: "http://linktr.ee/kingswordcalgary",
    ctaText: "Worship with us",
    width: 1920,
    height: 1080,
  },
  // Add similar dimensions for other slides
];

const HeroSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  const nextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
    setImageLoaded(false);
  }, []);

  const prevSlide = useCallback(() => {
    setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setImageLoaded(false);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="relative w-full overflow-hidden" style={{ height: '100vh' }}>
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out ${
            index === activeSlide ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transition: 'background-image 0.5s ease-in-out',
          }}
        >
          {/* Image Skeleton loader */}
          {!imageLoaded && <Skeleton height="100vh" width="100%" />}

          {/* Lazy-loaded image with explicit dimensions */}
          <img
            src={slide.image}
            alt={slide.title}
            className="absolute inset-0 w-full h-full object-cover"
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
            width={slide.width}
            height={slide.height}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4">
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold leading-tight text-white">
              {slide.title}
            </h2>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mt-4 text-white">
              {slide.subtitle}
            </h3>
            <a href={slide.ctaLink} target="_blank" rel="noopener noreferrer">
              <button className="mt-8 bg-[#c27803] hover:bg-blue-800 text-white font-bold py-5 px-6 text-lg sm:text-xl transition duration-300 ease-in-out">
                {slide.ctaText}
              </button>
            </a>
          </div>
        </div>
      ))}

      {/* Previous and Next buttons */}
      <button type="button" className="absolute top-0 left-0 z-30 h-full p-4" onClick={prevSlide}>
        &#10094;
      </button>
      <button type="button" className="absolute top-0 right-0 z-30 h-full p-4" onClick={nextSlide}>
        &#10095;
      </button>
    </div>
  );
};

export default HeroSection;
