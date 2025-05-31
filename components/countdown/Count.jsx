import { useEffect, useState } from 'react';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const targetDate = new Date('2025-06-28T00:00:00').getTime();

  useEffect(() => {
    const countdown = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        clearInterval(countdown);
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, [targetDate]);

  return (
    <div className="w-full px-4 py-12 flex flex-col items-center justify-center">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900">
        Event Will Start In
      </h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl w-full">
        {Object.entries(timeLeft).map(([key, value]) => (
          <div
            key={key}
            className="bg-white p-6 sm:p-8 md:p-10 rounded-xl shadow-md text-center flex flex-col items-center"
          >
            <span className="text-4xl sm:text-5xl font-extrabold text-black">
              {String(value).padStart(2, '0')}
            </span>
            <span className="mt-2 text-sm sm:text-base md:text-lg font-medium text-gray-700 capitalize">
              {key}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;
