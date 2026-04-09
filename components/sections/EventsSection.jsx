"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data simulating the events you would get from Firestore
const mockEvents = [
  {
    id: "1",
    title: "Easter Sunday Service",
    eventDate: "2025-04-25",
    imageUrl: "/assets/Easter-Sunday-Service copy.webp",
  },
  {
    id: "2",
    title: "Supernatural Canada 2025",
    eventDate: "2025-06-28",
    imageUrl: "/assets/Supernatural.webp",
  },
  {
    id: "3",
    title: "Christmas Carol Service",
    eventDate: "2025-12-25",
    imageUrl: "/assets/Carol-Service.webp",
  },
  {
    id: "4",
    title: "CrossOver Service",
    eventDate: "2025-12-31",
    imageUrl: "/assets/Cross-Over-service.webp",
  },
];

const EventsSection = () => {
  const events = useMemo(
    () =>
      [...mockEvents].sort(
        (a, b) => new Date(a.eventDate) - new Date(b.eventDate)
      ),
    []
  );

  const [activeEventId, setActiveEventId] = useState(events[0]?.id || "");
  const [isPaused, setIsPaused] = useState(false);

  const activeEvent =
    events.find((event) => event.id === activeEventId) || events[0];

  const formatDateBits = (dateString) => {
    const date = new Date(dateString);
    return {
      day: new Intl.DateTimeFormat("en-US", { day: "2-digit" }).format(date),
      month: new Intl.DateTimeFormat("en-US", { month: "short" }).format(date),
      full: new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(date),
    };
  };

  useEffect(() => {
    if (events.length < 2 || isPaused) return;

    const intervalId = setInterval(() => {
      setActiveEventId((currentId) => {
        const currentIndex = events.findIndex((event) => event.id === currentId);
        const nextIndex = currentIndex >= 0 ? (currentIndex + 1) % events.length : 0;
        return events[nextIndex].id;
      });
    }, 4200);

    return () => clearInterval(intervalId);
  }, [events, isPaused]);

  return (
    <section className="w-full bg-white py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-12">
          <div>
            <div className="flex items-end justify-between border-b border-gray-200 pb-8 mb-2">
              <div>
                <p className="text-xs tracking-[0.16em] uppercase text-gray-500 font-semibold mb-4">
                  Gatherings &amp; Liturgy
                </p>
                <h2 className="font-heading text-5xl md:text-6xl leading-[0.95] text-gray-800">
                  Upcoming
                  <br />
                  Events
                </h2>
              </div>
              <p className="hidden md:block text-[11px] tracking-[0.14em] uppercase text-gray-400 font-semibold pb-2">
                KingsWord Calendar / 2026
              </p>
            </div>

            <div
              className="divide-y divide-gray-200"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {events.map((event) => {
                const dateInfo = formatDateBits(event.eventDate);
                const isActive = activeEvent?.id === event.id;

                return (
                  <button
                    key={event.id}
                    type="button"
                    onMouseEnter={() => setActiveEventId(event.id)}
                    onFocus={() => setActiveEventId(event.id)}
                    onClick={() => setActiveEventId(event.id)}
                    className={`w-full text-left py-7 md:py-8 transition-all duration-300 ${
                      isActive ? "bg-black" : "hover:bg-gray-50/40"
                    }`}
                    aria-current={isActive ? "true" : "false"}
                  >
                    <div className={`flex items-start gap-5 md:gap-7 px-1 md:px-2 border-l-2 ${isActive ? "border-gold-500" : "border-transparent"}`}>
                      <div className="min-w-[52px] text-center">
                        <p className={`text-4xl md:text-5xl font-heading leading-none ${isActive ? "text-ivory-100" : "text-gray-700"}`}>
                          {dateInfo.day}
                        </p>
                        <p className={`text-[11px] mt-1 tracking-[0.14em] uppercase font-semibold ${isActive ? "text-gold-400" : "text-gray-400"}`}>
                          {dateInfo.month}
                        </p>
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className={`text-2xl md:text-4xl font-heading leading-tight ${isActive ? "text-white" : "text-gray-800"}`}>
                          {event.title}
                        </h3>
                        <p className={`mt-2 text-xs md:text-sm tracking-[0.09em] uppercase font-semibold ${isActive ? "text-white/75" : "text-gray-500"}`}>
                          {dateInfo.full}
                        </p>
                      </div>

                      <div className={`md:hidden relative h-16 w-16 rounded-lg overflow-hidden shrink-0 border ${isActive ? "border-gold-400/60" : "border-transparent"}`}>
                        <Image
                          src={event.imageUrl}
                          alt={event.title}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="pt-8">
              <a href="/events" target="_blank" rel="noopener noreferrer">
                <Button className="h-auto bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-xl">
                  View all events
                  <ArrowUpRight className="ml-2" />
                </Button>
              </a>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="sticky top-24">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 shadow-lg">
                <Image
                  src={activeEvent?.imageUrl || "/assets/1.webp"}
                  alt={activeEvent?.title || "Upcoming event"}
                  fill
                  sizes="(max-width: 1280px) 40vw, 33vw"
                  className="object-cover"
                  priority={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
