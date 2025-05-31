"use client"
import { useState, useEffect } from "react";

const GivePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [stats] = useState([
    { number: "50+", label: "Churches Planted" },
    { number: "10K+", label: "Lives Transformed" },
    { number: "25+", label: "Countries Reached" },
    { number: "100+", label: "Active Missionaries" }
  ]);

  useEffect(() => {
    const timeoutId = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timeoutId);
  }, []);

  const SkeletonLoader = ({ className }) => (
    <div className={`animate-pulse bg-gray-300 ${className}`}></div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner with Enhanced Design */}
      <div className="relative overflow-hidden bg-black text-white">
        {/* Animated Background Elements */}
        {/* <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 bg-white rounded-full opacity-30 animate-pulse particle-${i}`}
            ></div>
          ))}
          <style jsx>{`
            .particle-0 { left: 15%; top: 25%; animation-delay: 0s; animation-duration: 3s; }
            .particle-1 { left: 35%; top: 70%; animation-delay: 0.5s; animation-duration: 2.5s; }
            .particle-2 { left: 60%; top: 20%; animation-delay: 1s; animation-duration: 4s; }
            .particle-3 { left: 80%; top: 50%; animation-delay: 1.5s; animation-duration: 3.5s; }
            .particle-4 { left: 20%; top: 80%; animation-delay: 2s; animation-duration: 2s; }
            .particle-5 { left: 45%; top: 15%; animation-delay: 0.3s; animation-duration: 3.2s; }
            .particle-6 { left: 70%; top: 75%; animation-delay: 0.8s; animation-duration: 2.8s; }
            .particle-7 { left: 10%; top: 45%; animation-delay: 1.3s; animation-duration: 4.2s; }
            .particle-8 { left: 85%; top: 30%; animation-delay: 1.8s; animation-duration: 2.3s; }
            .particle-9 { left: 50%; top: 60%; animation-delay: 2.3s; animation-duration: 3.8s; }
            .particle-10 { left: 25%; top: 10%; animation-delay: 0.2s; animation-duration: 3.5s; }
            .particle-11 { left: 75%; top: 85%; animation-delay: 0.7s; animation-duration: 2.7s; }
          `}</style>
        </div> */}

        <div className="relative z-10 py-32 px-6 text-center">
          {isLoading ? (
            <div className="max-w-4xl mx-auto">
              <SkeletonLoader className="mx-auto w-80 h-12 rounded mb-6" />
              <SkeletonLoader className="mx-auto w-full h-6 rounded" />
            </div>
          ) : (
            <>
              <h1 className="text-6xl md:text-8xl font-bold mb-8 animate-fade-in">
                Giving
              </h1>
              
              <div className="max-w-4xl mx-auto">
                <p className="text-xl md:text-2xl leading-relaxed text-gray-300 animate-slide-up">
                  "God is able to make all grace abound toward you, that you, always
                  having all sufficiency in all things, may have an abundance for every
                  good work."
                </p>
                <p className="text-lg text-gray-400 mt-4 font-semibold">
                  - 2 Corinthians 9:8
                </p>
              </div>
              <div className="mt-8 animate-bounce">
                <div className="w-6 h-10 border-2 border-white rounded-full mx-auto">
                    <div className="w-1 h-3 bg-white rounded-full mx-auto mt-2 animate-pulse"></div>
                </div>
                </div>
            </>
          )}
        </div>
      </div>

      {/* Impact Stats Section */}
      {/* <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">
              Your Impact in Numbers
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See how your faithful giving is transforming lives and expanding God's kingdom
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center group hover:transform hover:scale-105 transition-all duration-300"
              >
                {isLoading ? (
                  <div>
                    <SkeletonLoader className="w-20 h-16 rounded mx-auto mb-2" />
                    <SkeletonLoader className="w-24 h-4 rounded mx-auto" />
                  </div>
                ) : (
                  <>
                    <div className="text-5xl md:text-6xl font-bold text-black mb-2 group-hover:text-gray-700 transition-colors duration-300">
                      {stat.number}
                    </div>
                    <div className="text-lg text-gray-600 font-semibold">
                      {stat.label}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div> */}

      {/* Main Content Section - Enhanced */}
      <div className="py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 max-w-7xl mx-auto">
            
            {/* Image Column - Enhanced */}
            <div className="lg:w-1/2">
              {isLoading ? (
                <SkeletonLoader className="w-full h-96 rounded-2xl" />
              ) : (
                <div className="relative group overflow-hidden rounded-2xl shadow-2xl">
                  <img
                    src="/assets/give.webp"
                    alt="Partner with Us"
                    className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700 filter group-hover:brightness-110"
                  />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                </div>
              )}
            </div>

            {/* Content Column - Enhanced */}
            <div className="lg:w-1/2 text-center lg:text-left">
              {isLoading ? (
                <div>
                  <SkeletonLoader className="w-3/4 h-10 rounded mb-6" />
                  <SkeletonLoader className="w-full h-6 rounded mb-4" />
                  <SkeletonLoader className="w-full h-6 rounded mb-4" />
                  <SkeletonLoader className="w-2/3 h-6 rounded mb-8" />
                  <SkeletonLoader className="w-40 h-14 rounded" />
                </div>
              ) : (
                <>
                  <h2 className="text-5xl font-bold text-black mb-8 leading-tight">
                    Partner with Us
                  </h2>
                  <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                    <p>
                      With your love gift to the ministry, we can plant new churches,
                      strengthen local missions, and take the message of God's
                      supernatural power to the ends of the earth.
                    </p>
                    {/* <p className="font-semibold text-black">
                      Every gift makes a difference. Every donation plants seeds of hope.
                      Every contribution expands the Kingdom of God.
                    </p> */}
                  </div>
                  
                  {/* Enhanced CTA Button */}
                  <div className="mt-12">
                    <a
                      href="https://kingswordcalgary.churchcenter.com/giving"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block"
                    >
                      <button className="group relative bg-black hover:bg-gray-800 text-white font-bold py-6 px-12 text-xl rounded-xl transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl overflow-hidden">
                        <span className="relative z-10">GIVE NOW</span>
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                      </button>
                    </a>
                  </div>
                  
                  <p className="mt-6 text-sm text-gray-500">
                    Secure online giving • Tax-deductible receipts provided
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Ways to Give Section */}
      {/* <div className="py-20 bg-black text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Ways to Give</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Choose the giving method that works best for you
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "Online Giving",
                description: "Quick, secure, and convenient online donations with instant confirmation",
                icon: "💻"
              },
              {
                title: "Text to Give",
                description: "Simply text your donation amount for fast and easy mobile giving",
                icon: "📱"
              },
              {
                title: "In-Person",
                description: "Traditional giving during service or visit our office during business hours",
                icon: "🏛️"
              }
            ].map((method, index) => (
              <div 
                key={index}
                className="text-center p-8 border border-gray-700 rounded-xl hover:border-white transition-colors duration-300 group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {method.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{method.title}</h3>
                <p className="text-gray-300 leading-relaxed">
                  {method.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div> */}

      {/* Bible Verse Footer */}
      <div className="py-16 text-center">
        <div className="container mx-auto px-6">
          <blockquote className="text-2xl md:text-3xl font-semibold text-black italic mb-4 max-w-4xl mx-auto leading-relaxed">
            "Give, and it will be given to you. A good measure, pressed down, shaken together and running over, will be poured into your lap."
          </blockquote>
          <p className="text-lg text-gray-600 font-semibold">- Luke 6:38</p>
        </div>
      </div>

      
    </div>
  );
};

export default GivePage;