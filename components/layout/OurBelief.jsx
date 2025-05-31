"use client";
import { Suspense, lazy, useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const TimelineSection = lazy(() => import('../timeline/TimelineSection'));
const CoreValuesSection = lazy(() => import('../core-values/CoreValues'));

function OurBeliefContent() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);  
    }, 2000); // Simulate loading for 2 seconds
    return () => clearTimeout(timer);
  }, []);

  const imageSources = [
    '/assets/about1.webp',
    '/assets/about2.webp',
    '/assets/about3.webp',
    '/assets/about4.webp',
    '/assets/about5.webp',
    '/assets/about6.webp',
  ];

  return (
    <>
      <section
        id='history'
        className="container mx-auto flex flex-col lg:flex-row gap-24 items-center justify-center py-2 px-4 lg:px-0"
      >
        <div className="flex-1 max-w-md text-center lg:text-left mb-8 lg:mb-0">
          <h2 className="text-4xl max-w-xs font-bold mb-4">Raising A Supernatural Army</h2>
          <hr className="border-t-4 border-[#c27803] w-full lg:w-2/4 mb-8" />
          <p className="mb-8 text-xl">
            We are a church who unequivocally believes in the supremacy of the Bible, with total submission as the final authority in doctrine and practice <b>(2 Timothy 3:16-17; 2 Peter 1:21; John 17:17)</b>.
          </p>
          <p className="mb-8 text-xl">We believe in the work of GRACE, that there is absolutely no work required again of man to be done.</p>
          <p className="mb-8 text-xl">We believe in the Trinity: <b>God, Jesus, and the Holy Spirit.</b> Our heart is poured out to God in worship. Join us today!</p>
          <p className="mb-8 text-xl">
            Love is a fruit in season at all times, and within reach of every hand. It is the greatest gift anyone can give.<br />JOIN OUR COMMUNITY!
          </p>
          <button className="bg-white text-[#c27803] font-bold border border-[#c27803] border-2 py-4 px-4 rounded">
            <a href="/contact-form">CONTACT US</a>
          </button>
        </div>
        <div className="flex-1 max-w-xl grid grid-cols-1 md:grid-cols-2 gap-4">
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="mb-4">
                <Skeleton className="object-cover rounded-lg shadow-lg w-full h-48 md:h-64" />
              </div>
            ))
          ) : (
            imageSources.map((src, index) => (
              <div key={index} className="mb-4">
                <img
                  className="object-cover rounded-lg shadow-lg w-full h-72 md:h-64"
                  src={src}
                  alt={`Gallery ${index}`}
                  width={300}
                  height={300}
                />
              </div>
            ))
          )}
        </div>
      </section>
      <Suspense fallback={<Skeleton height={300} />}>
        <TimelineSection />
      </Suspense>
      <Suspense fallback={<Skeleton height={300} />}>
        <CoreValuesSection />
      </Suspense>
    </>
  );
}

export default OurBeliefContent;
