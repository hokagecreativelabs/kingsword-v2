"use client";
import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Mail,
  Users,
  Heart,
  Globe,
} from "lucide-react";

const initiatives = [
  {
    title: "Immigration Settlement Assistance",
    text: "Moving to Toronto, Vancouver, or Calgary? KingsWord Foundation is here to help you settle into your new life in Canada with ease. Our Immigration Settlement Assistance program offers comprehensive support tailored for students, foreign workers, and permanent residents.",
    buttonText: "Register Now",
    buttonLink:
      "https://docs.google.com/forms/d/e/1FAIpQLSeiVgpSXupIaNxgbA9o6m4iLPZL4OhGwqmxcnzeYgk7BR2_0Q/viewform",
    imageUrl: "/assets/imi.webp",
    icon: Globe,
  },
  {
    title: "Community Soccer Sponsorship",
    text: "We are honored to be a sponsor of the Community Soccer Association in Calgary, supporting local youth and fostering teamwork, discipline, and well-being. Through this sponsorship, we provide young athletes with opportunities to grow and thrive.",
    buttonText: "Learn More",
    buttonLink: "https://calgarycsa.com/partners-and-sponsors/",
    imageUrl: "/assets/CSA.webp",
    icon: Users,
  },
  {
    title: "Community Outreach",
    text: "We support initiatives that make a positive difference in our communities. Recently, we partnered with The Mustard Seed on the 'Fill A Sock Initiative,' providing essential items to those in need and building stronger, more supportive communities.",
    buttonText: "Get Involved",
    buttonLink: "mailto:admin@kingsword.ca",
    imageUrl: "/assets/fill.webp",
    icon: Heart,
  },
];

const Initiative = () => {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrent((prev) => (prev + 1) % initiatives.length);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [isHovered]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % initiatives.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + initiatives.length) % initiatives.length);
  };

  const currentInitiative = initiatives[current];
  const IconComponent = currentInitiative.icon;

  return (
    <div className="bg-white w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-12">
        {/* Header */}
        <div className="text-center mb-16 md:mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-6 tracking-tight leading-tight">
            Our Initiatives
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
            At KingsWord Foundation, we are dedicated to making a meaningful impact in our communities. Explore some of our key initiatives below.
          </p>
        </div>

        {/* Main Card */}
        <div
          className="relative group mb-16"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="bg-white border border-gray-100 rounded-3xl shadow-xl hover:shadow-2xl transition duration-500">
            <div className="p-6 md:p-12 lg:p-16">
              <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
                {/* Image Section */}
                <div className="relative w-full lg:w-1/2">
                  <div className="overflow-hidden rounded-2xl bg-gray-100">
                    <img
                      src={currentInitiative.imageUrl}
                      alt={currentInitiative.title}
                      className="w-full h-64 md:h-80 lg:h-[400px] object-cover transform group-hover:scale-105 transition duration-500"
                    />
                  </div>
                  <div className="absolute -top-6 -right-6 w-16 h-16 md:w-20 md:h-20 bg-black rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 group-hover:-rotate-3 transition duration-300">
                    <IconComponent className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  </div>
                </div>

                {/* Text Section */}
                <div className="w-full lg:w-1/2 space-y-6">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight">
                    {currentInitiative.title}
                  </h2>
                  <p className="text-base md:text-lg text-gray-600 leading-relaxed font-light">
                    {currentInitiative.text}
                  </p>
                  <div>
                    <a
                      href={currentInitiative.buttonLink}
                      target={currentInitiative.buttonLink.startsWith("mailto:") ? "_self" : "_blank"}
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 px-6 py-4 bg-black text-white font-semibold rounded-xl hover:bg-gray-900 hover:-translate-y-1 transition-all duration-300 shadow-md hover:shadow-lg text-base md:text-lg"
                    >
                      <span>{currentInitiative.buttonText}</span>
                      {currentInitiative.buttonLink.startsWith("mailto:") ? (
                        <Mail className="w-5 h-5" />
                      ) : (
                        <ExternalLink className="w-5 h-5" />
                      )}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 md:gap-12 mb-16">
          <button
            onClick={prevSlide}
            className="group w-12 h-12 md:w-16 md:h-16 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-black hover:border-black transition-all duration-300 hover:scale-110 shadow-md"
          >
            <ChevronLeft className="w-6 h-6 md:w-7 md:h-7 text-black group-hover:text-white transition-colors" />
          </button>

          <div className="flex gap-3 md:gap-4">
            {initiatives.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`rounded-full border transition-all duration-300 ${
                  current === index
                    ? "w-10 md:w-16 h-4 md:h-6 bg-black border-black"
                    : "w-4 md:w-6 h-4 md:h-6 bg-white border-gray-300 hover:bg-gray-100"
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="group w-12 h-12 md:w-16 md:h-16 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-black hover:border-black transition-all duration-300 hover:scale-110 shadow-md"
          >
            <ChevronRight className="w-6 h-6 md:w-7 md:h-7 text-black group-hover:text-white transition-colors" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Initiative;
