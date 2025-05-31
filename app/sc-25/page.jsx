'use client';

import { Parallax } from 'react-parallax';
import React from 'react';
import CountdownTimer from '../../components/countdown/Count';
import SCInfo from '../../components/sc-info/SCInfo';
import EventSchedule from '../../components/sc-schedule/SCSchedule';
import ReflectionSection from '../../components/reflect/Reflect';
import MinistersSection from '../../components/ministers-section/MinistersSection';
import SummerCanadaPhotos from '../../components/summer-canada/SummerCanadaPhotos';

// Static fallback or temporary mock data
const parallaxData = {
  bgImage: '/assets/bg-25.jpg', // replace with your own local image path
  title: 'Summer Canada 2025',
  subtitle: 'An unforgettable encounter with God’s presence in the heart of Canada.',
  cta: 'Register Now',
  link: 'https://kingswordcalgary.churchcenter.com/registrations/events/2949021',
};

const SC24Page = () => {
  return (
    <>
      {parallaxData && (
        <Parallax
          bgImage={parallaxData.bgImage}
          strength={500}
          className="relative h-screen overflow-hidden"
        >
          <div className="mt-16 absolute inset-0 bg-black opacity-80 z-10 h-[400px]"></div>
          <div className="relative flex flex-col items-center justify-center h-full min-h-[60%] z-20 text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 mt-32">{parallaxData.title}</h1>
            <p className="text-lg md:text-2xl mb-6">{parallaxData.subtitle}</p>
            <a
              href={parallaxData.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black text-white font-bold py-4 px-8 rounded"
            >
              {parallaxData.cta}
            </a>
          </div>
        </Parallax>
      )}
      <div className="mt-24">
        <CountdownTimer />
      </div>
      <div className="mt-24">
        <SCInfo />
      </div>
      <div className="mt-24">
        <EventSchedule />
      </div>
      <div className="mt-24">
        <ReflectionSection />
      </div>
      <div className="mt-24">
        <MinistersSection />
      </div>
      <div className="mt-24">
        <SummerCanadaPhotos />
      </div>
    </>
  );
};

export default SC24Page;
