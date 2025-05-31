"use client";

import { Suspense } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const VancouverPage = () => {
  return (
    <div className="max-w-7xl mx-auto py-24">
      {/* First Section */}
      <div className="flex flex-wrap md:flex-nowrap mb-24 mt-12">
        <div className="md:w-1/2 p-8">
          <h1 className="text-3xl font-bold mb-4 mt-24">KingsWord, Vancouver</h1>
          <p>KingsWord International Church, Vancouver, is one of the branches of KingsWord Ministries International.</p>
          <div className="flex space-x-4 mt-4">
            <FaFacebookF className="text-xl" />
            <FaTwitter className="text-xl" />
            <FaInstagram className="text-xl" />
            <FaYoutube className="text-xl" />
          </div>
        </div>
        <div className="md:w-1/2">
          <Suspense fallback={<Skeleton height={400} />}>
            <img
              src="/assets/vancouver/1.webp"
              alt="Church img"
              width={600} // Adjust width as needed
              height={400} // Adjust height as needed
              className="w-full h-auto"
            />
          </Suspense>
        </div>
      </div>

      {/* Second Section */}
      <div className="flex flex-wrap md:flex-nowrap">
        <div className="md:w-1/2">
          <Suspense fallback={<Skeleton height={400} />}>
            <img
              src="/assets/vancouver/2.webp"
              alt="Pastor img"
              width={600} // Adjust width as needed
              height={400} // Adjust height as needed
              className="w-full h-auto"
            />
          </Suspense>
        </div>
        <div className="md:w-1/2 p-8 mt-24">
          <p className="mb-4">KingsWord Vancouver is a Church of young, vibrant and passionate people in the beautiful province of British Columbia.</p>
          <p>We&#39;re a Church committed to raising people who give expression to the Word and the Spirit of God in their daily lives; and who are committed to God&#39;s plan for their lives.</p>
          <p className='mt-4'>KingsWord Vancouver is an expression of KingsWord Everywhere®. At KingsWord Everywhere®, our vision is to raise a supernatural people - people of the Word, Spirit and Purpose everywhere.</p>
        </div>
      </div>

      {/* Third Section */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-left mb-4 mt-16">Church Images</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Suspense fallback={<Skeleton height={300} />}>
            <img
              src="/assets/vancouver/3.webp"
              alt="Church Event 1"
              width={500} // Adjust width as needed
              height={300} // Adjust height as needed
              className="w-full h-auto object-cover rounded-lg"
            />
          </Suspense>
          <Suspense fallback={<Skeleton height={300} />}>
            <img
              src="/assets/vancouver/4.webp"
              alt="Church Event 2"
              width={500} // Adjust width as needed
              height={300} // Adjust height as needed
              className="w-full h-auto object-cover rounded-lg"
            />
          </Suspense>
          <Suspense fallback={<Skeleton height={300} />}>
            <img
              src="/assets/vancouver/5.webp"
              alt="Church Event 3"
              width={500} // Adjust width as needed
              height={300} // Adjust height as needed
              className="w-full h-auto object-cover rounded-lg"
            />
          </Suspense>
          <Suspense fallback={<Skeleton height={300} />}>
            <img
              src="/assets/vancouver/6.webp"
              alt="Church Event 4"
              width={500} // Adjust width as needed
              height={300} // Adjust height as needed
              className="w-full h-auto object-cover rounded-lg"
            />
          </Suspense>
        </div>
      </div>

      {/* Fourth Section */}
      <div className="bg-black text-white text-center p-24 rounded-2xl mt-8">
        <h2 className="text-3xl font-bold">Worship With Us</h2>
        <button className="mt-4 bg-white text-black px-6 py-2 rounded-full font-bold">
          <a href="/contact-form">Contact Us</a>
        </button>
      </div>
    </div>
  );
};

export default VancouverPage;