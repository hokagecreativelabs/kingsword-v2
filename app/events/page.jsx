"use client"
import { useState, useEffect } from "react";

const mockEvents = [
  {
    id: "1",
    title: "Easter Sunday Service",
    eventDate: "2025-04-25",
    imageUrl: "/assets/Easter-Sunday-Service copy.webp",
    subtitle: "Join us for a week of spiritual growth and fellowship.",
    description: "Celebrate Easter with us in a joyful service filled with worship and community.",
    registrationLink: "",
  },
  {
    id: "2",
    title: "Supernatural Canada 2025",
    eventDate: "2025-06-28",
    imageUrl: "/assets/Supernatural.webp",
    subtitle: "Experience powerful worship every last Friday.",
    description: "Join thousands in worship and supernatural encounters at this annual event.",
    registrationLink: "https://kingswordcalgary.churchcenter.com/registrations/events/2949021",
  },
  {
    id: "3",
    title: "Christmas Carol Service",
    eventDate: "2025-12-25",
    imageUrl: "/assets/Carol-Service.webp",
    subtitle: "A weekend retreat for youth and young adults.",
    description: "Enjoy classic Christmas carols and a festive atmosphere with friends and family.",
    registrationLink: "",
  },
  {
    id: "4",
    title: "CrossOver Service",
    eventDate: "2025-12-31",
    imageUrl: "/assets/Cross-Over-service.webp",
    subtitle: "Serve and give back to our local community.",
    description: "Celebrate the new year by joining our community outreach and service.",
    registrationLink: "",
  },
];

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate async data fetch with timeout
    const timer = setTimeout(() => {
      // Sort events: "Supernatural Canada" first, then by date ascending
      const sortedEvents = [
        ...mockEvents.filter((e) => e.title === "Supernatural Canada 2025"),
        ...mockEvents
          .filter((e) => e.title !== "Supernatural Canada 2025")
          .sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate)),
      ];
      setEvents(sortedEvents);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const filteredEvents = events.filter((event) => {
    const query = searchQuery.toLowerCase();
    const title = event.title?.toLowerCase() || "";
    const description = event.description?.toLowerCase() || "";
    const date = event.eventDate?.toLowerCase() || "";

    return title.includes(query) || description.includes(query) || date.includes(query);
  });

  return (
    <div className="bg-gray-50">
      {/* Banner Section */}
      <div
        className="relative bg-cover bg-center h-[250px] bg-black"
        style={{
          backgroundImage: `url('https://your-bg-image-url.com')`, // Replace with your banner image URL
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white text-center">
            Our Events
          </h1>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex items-center bg-white shadow-lg rounded-lg p-4"
        >
          <input
            type="text"
            placeholder="Search events by title, date, or description"
            className="flex-grow text-lg px-4 py-3 border-none focus:ring-0 focus:outline-none text-gray-700 placeholder-gray-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-all"
          >
            Search
          </button>
        </form>
      </div>

      {/* Events Section */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {loading ? (
          <div className="text-center text-gray-500 col-span-full py-20">
            <h2 className="text-2xl font-bold mb-4">Loading events...</h2>
            <p>Fetching the latest events for you, please wait.</p>
          </div>
        ) : filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105"
            >
              <img
                src={event.imageUrl || "https://via.placeholder.com/400x300"}
                alt={event.title || "Event"}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 truncate">{event.title}</h3>
                <p className="mt-2 text-gray-600 text-sm italic truncate">
                  {event.subtitle || "No subtitle available"}
                </p>
                <p className="mt-4 text-gray-700 text-sm line-clamp-3">{event.description}</p>
                <a
                  href={event.registrationLink || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block mt-4 px-4 py-2 rounded-lg text-center font-medium transition ${
                    event.registrationLink
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-400 text-gray-700 cursor-not-allowed"
                  }`}
                >
                  {event.registrationLink ? "Register Now" : "Coming Soon"}
                </a>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 col-span-full py-20">
            <h2 className="text-2xl font-bold mb-4">No events found</h2>
            <p>Try searching for a different event or check back later.</p>
          </div>
        )}
      </div>
    </div>
  );
}
