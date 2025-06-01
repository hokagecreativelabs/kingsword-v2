import React from 'react'

export default function MerchSection() {
  return (
<section className="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
    <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
      <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
        <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
          <img className="w-full dark:hidden" src="/assets/merch.jpg" alt="" />
          {/* <img className="w-full hidden dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg" alt="" /> */}
        </div>

        <div className="mt-6 sm:mt-8 lg:mt-0">
          <h1
            className="text-xl font-semibold text-gray-900 sm:text-5xl dark:text-white"
          >
            Supernatural Canada Merch Order
          </h1>

          <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
          <a
              href="https://kingswordcalgary.churchcenter.com/registrations/events/2949021"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black text-white font-bold py-4 px-8 rounded"
            >
              Order Now
            </a>
          </div>

          <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

          <p className="mb-6 text-gray-500 dark:text-gray-400">
          Premium cotton blend fabric for all-day comfort and lasting durability. Available in sizes XS to 3XL with a wide range of colors and custom designs.
          </p>

          {/* <p className="text-gray-500 dark:text-gray-400">
            Two Thunderbolt USB 4 ports and up to two USB 3 ports. Ultrafast
            Wi-Fi 6 and Bluetooth 5.0 wireless. Color matched Magic Mouse with
            Magic Keyboard or Magic Keyboard with Touch ID.
          </p> */}
        </div>
      </div>
    </div>
  </section>
  )
}
