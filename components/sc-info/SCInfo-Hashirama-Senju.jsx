import { useEffect, useState } from 'react';
import { db } from '../../../firebaseConfig'; // Adjust the path to your Firebase config
import { doc, getDoc } from 'firebase/firestore';

const EventInfoSection = () => {
  const [eventDetails, setEventDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const docRef = doc(db, 'event-schedule', 'main');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setEventDetails(docSnap.data());
        } else {
          console.error('No event details found!');
        }
      } catch (error) {
        console.error('Error fetching event details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading event details...</p>;
  }

  if (!eventDetails) {
    return <p className="text-center text-gray-500">No event details available.</p>;
  }

  const { eventDate, location, contactPhone, contactEmail } = eventDetails;

  return (
    <section className="bg-[#FEFBF6] py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8">Event Details</h2>
        <div className="grid md:grid-cols-3 gap-8 text-left">
          {/* Date */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-2xl font-bold mb-4 text-black">Date</h3>
            <p className="text-lg mb-2">{eventDate || 'TBA'}</p>
          </div>

          {/* Location */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-2xl font-bold mb-4 text-black">Location</h3>
            <p className="text-lg">{location || 'TBA'}</p>
          </div>

          {/* Contact Information */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-2xl font-bold mb-4 text-black">Contact Information</h3>
            <p className="text-lg mb-2">Phone: {contactPhone || 'TBA'}</p>
            <p className="text-lg">Email: <a href={`mailto:${contactEmail}`} className="underline">{contactEmail || 'TBA'}</a></p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventInfoSection;
