import { useState, useEffect } from 'react';
import { db } from '../../../firebaseConfig'; // Adjust the path to your Firebase config
import { collection, getDocs } from 'firebase/firestore';

const ReflectionSection = () => {
  const [reflections, setReflections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReflections = async () => {
      try {
        const reflectionsCollection = collection(db, 'reflections');
        const querySnapshot = await getDocs(reflectionsCollection);
        const reflectionsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReflections(reflectionsData);
      } catch (error) {
        console.error('Error fetching reflections:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReflections();
  }, []);

  const splitIntoParagraphs = (text) => {
    const sentences = text.split('. ');
    const chunks = Math.ceil(sentences.length / 5);
    return Array.from({ length: chunks }, (_, i) =>
      sentences.slice(i * 5, i * 5 + 5).join('. ')
    );
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading reflections...</p>;
  }

  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {reflections.map((reflection) => (
          <div key={reflection.id} className="text-center mb-12">
            <div className="flex flex-col items-center mb-12">
              <div className="relative group w-72 h-72 rounded-full overflow-hidden shadow-lg">
                <img
                  src={reflection.image}
                  alt={reflection.name}
                  className="object-cover transition-opacity duration-300 group-hover:opacity-70"
                />
              </div>
              <div className="text-center mt-6">
                <h3 className="text-3xl font-bold text-[#000]">{reflection.name}</h3>
                <p className="text-lg text-gray-600">{reflection.position}</p>
              </div>
            </div>
            <h2 className="text-4xl font-bold text-[#000] mb-6">{reflection.reflectionTitle}</h2>
            <div className="text-left space-y-4">
              {splitIntoParagraphs(reflection.reflectionText).map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReflectionSection;
