import { useState, useEffect } from 'react';

// Mock schedule data (you can move this to a JSON file or API later)
const mockSchedule = [
  {
    id: 'day1',
    day: 'Day 1',
    date: 'June 28, 2025',
    sessions: [
      {
        session: 'Opening Ceremony',
        theme: 'Holy Ghost/Healing Meeting',
        time: '11:00 AM MST',
        ministers: ['PriscillaSings', 'Dr. Kay Ijisesan', 'Pastor Dotun Oragbade', 'Pastor Muyiwa Oseni', ],
      },
    ],
  },
  {
    id: 'day2',
    day: 'Day 2',
    date: 'June 29, 2025',
    sessions: [
      {
        session: 'Workshop',
        theme: 'Celebration Service',
        time: '10:00 AM MST',
        ministers: ['Dr. Kay Ijisesan', 'Pastor Dotun Oragbade', 'Pastor Muyiwa Oseni', 'PriscillaSings',  'BeejaySax'],
      },
    ],
  },
];

const EventScheduleSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate async data loading
    const loadSchedule = () => {
      setTimeout(() => {
        setSchedule(mockSchedule);
        setLoading(false);
      }, 500); // simulate loading delay
    };

    loadSchedule();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading schedule...</p>;
  }

  if (schedule.length === 0) {
    return <p className="text-center text-gray-500">No schedule available.</p>;
  }

  return (
    <section className="px-4 py-8">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">Event Schedule</h2>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center mb-8">
          {schedule.map((day, index) => (
            <button
              key={day.id}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-2 mx-2 my-1 font-semibold text-base sm:text-lg border-b-4 ${
                activeTab === index
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-600'
              } transition-colors duration-300`}
            >
              {day.day}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6 lg:p-8">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-4">
            {schedule[activeTab]?.day} - {schedule[activeTab]?.date}
          </h3>
          <ul>
            {schedule[activeTab]?.sessions?.map((session, index) => (
              <li key={index} className="mb-4 sm:mb-6">
                <h4 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
                  {session.session}
                </h4>
                <p className="text-base md:text-lg mb-1">
                  <strong>Theme:</strong> {session.theme}
                </p>
                <p className="text-base md:text-lg mb-1">
                  <strong>Time:</strong> {session.time}
                </p>
                <p className="text-base md:text-lg">
                  <strong>Ministers:</strong> {session.ministers.join(', ')}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default EventScheduleSection;
