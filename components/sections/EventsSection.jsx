"use client";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// Mock data simulating the events you would get from Firestore
const mockEvents = [
  {
    id: "1",
    title: "Easter Sunday Service",
    // subtitle: "Join us for a week of spiritual growth and fellowship.",
    eventDate: "2025-04-25",
    imageUrl: "/assets/Easter-Sunday-Service copy.webp",
  },
  {
    id: "2",
    title: "Supernatural Canada 2025",
    // subtitle: "Experience powerful worship every last Friday.",
    eventDate: "2025-06-28",
    imageUrl: "/assets/Supernatural.webp",
  },
  {
    id: "3",
    title: "Christmas Carol Service",
    // subtitle: "A weekend retreat for youth and young adults.",
    eventDate: "2025-12-25",
    imageUrl: "/assets/Carol-Service.webp",
  },
  {
    id: "4",
    title: "CrossOver Service",
    // subtitle: "Serve and give back to our local community.",
    eventDate: "2025-12-31",
    imageUrl: "/assets/Cross-Over-service.webp",
  },
];

const EventsSection = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      // Sort mock events by date ascending
      const sortedEvents = [...mockEvents].sort(
        (a, b) => new Date(a.eventDate) - new Date(b.eventDate)
      );
      setEvents(sortedEvents);
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-yellow-100">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-700 mb-4 sm:mb-0 text-center sm:text-left">
            Catch up on our upcoming monthly and annual events
          </h2>
          <a
            href="/events"
            target="__blank"
            className="bg-black text-white py-2 px-6 sm:px-8 text-sm sm:text-base rounded transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
          >
            View all events
          </a>
        </div>
        {isLoading ? (
          <div className="flex flex-wrap justify-center gap-4">
            {[...Array(7)].map((_, index) => (
              <div key={index} className="w-full sm:w-1/2 md:w-1/4 p-2">
                <Skeleton height={200} />
                <Skeleton width={200} height={24} className="mt-4" />
                <Skeleton width={150} height={20} />
              </div>
            ))}
          </div>
        ) : (
          <Swiper
            modules={[Autoplay]}
            spaceBetween={50}
            slidesPerView={1}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
          >
            {events.map((event) => (
              <SwiperSlide key={event.id}>
                <div className="rounded overflow-hidden shadow-lg bg-white">
                  <img
                    src={event.imageUrl || "https://via.placeholder.com/500x300"}
                    alt={`Event ${event.title}`}
                    className="w-full h-auto object-cover"
                  />
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{event.title}</div>
                    {/* <p className="text-gray-700 text-base">
                      {event.subtitle || "No subtitle available"}
                    </p> */}
                    {/* Date formatting if needed */}
                    <p className="text-sm text-gray-500 mt-2">
                      {event.eventDate
                        ? new Intl.DateTimeFormat("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }).format(new Date(event.eventDate))
                        : "Date not available"}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default EventsSection;
