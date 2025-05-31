import { useEffect, useState } from 'react';
import { db } from '../../../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [targetDate, setTargetDate] = useState(null);

  useEffect(() => {
    // Fetch the countdown date from Firestore
    const fetchCountdownDate = async () => {
      try {
        const docRef = doc(db, 'parallax-section', 'main');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.countdownDate) {
            setTargetDate(new Date(data.countdownDate).getTime());
          } else {
            console.warn('Countdown date not found in Firestore.');
          }
        } else {
          console.warn('Document not found in Firestore.');
        }
      } catch (error) {
        console.error('Error fetching countdown date:', error);
      }
    };

    fetchCountdownDate();
  }, []);

  useEffect(() => {
    if (!targetDate) return;

    const countdown = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        clearInterval(countdown);
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, [targetDate]);

  if (!targetDate) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-3xl font-bold mb-6">Loading Countdown...</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      <h1 className="text-3xl font-bold mb-6">Event Will Start In</h1>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Object.entries(timeLeft).map(([key, value]) => (
          <div
            key={key}
            className="flex flex-col items-center justify-center p-4 border border-gray-300 rounded-lg"
          >
            <span className="text-7xl font-semibold">{value}</span>
            <span className="capitalize">{key}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;