import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 shadow mx-4 rounded-lg relative">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        {/* Main Content */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          {/* Logo and Company Name */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-8">
            <a
              href="#"
              className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
              aria-label="C9Lab Home"
            >
              <img
                src="https://c9lab.com/wp-content/uploads/2025/02/Untitled-design-2048x1240.png"
                className="h-10"
                alt="Swift Logo"
              />
              <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
                C9Lab (Pinak Infosec Pvt. Ltd.)
              </span>
            </a>

            {/* Navigation Links */}
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium sm:mb-0 text-gray-400">
              <li>
                <a href="#" className="hover:text-blue-500 me-4 md:me-6">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500 me-4 md:me-6">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500 me-4 md:me-6">
                  Licensing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500">
                  Contact
                </a>
              </li>
            </ul>

            {/* Social Media Icons */}
            <ul className="flex space-x-4 mt-4 sm:mt-0">
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-500">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    {/* Placeholder for Twitter SVG */}
                    <path d="M22 5.8c-.8.4-1.6.6-2.5.7a4.3 4.3 0 001.9-2.4c-.8.5-1.7.8-2.6 1A4.1 4.1 0 0015 4c-2.3 0-4.2 1.9-4.2 4.2 0 .3 0 .6.1.9A11.8 11.8 0 012 4.6a4.2 4.2 0 001.3 5.6c-.7 0-1.3-.2-1.9-.5v.1c0 2 1.4 3.7 3.3 4.1-.3.1-.7.2-1.1.2-.3 0-.5 0-.8-.1a4.2 4.2 0 003.9 2.9A8.4 8.4 0 012 19.7a11.8 11.8 0 006.4 1.9c7.7 0 11.9-6.4 11.9-11.9 0-.2 0-.4-.1-.6.8-.6 1.5-1.3 2-2.2z" />
                  </svg>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-500">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    {/* Placeholder for Facebook SVG */}
                    <path d="M22 12a10 10 0 10-11.6 9.9v-7h-2.2v-2.9h2.2v-2.2c0-2.2 1.3-3.4 3.3-3.4.9 0 1.8.2 1.8.2v2h-1c-1 0-1.3.6-1.3 1.3v1.7h2.3l-.4 2.9h-1.9v7A10 10 0 0022 12z" />
                  </svg>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-500">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    {/* Placeholder for LinkedIn SVG */}
                    <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3v9zM6.5 8.2A1.8 1.8 0 115 6.4a1.8 1.8 0 011.5 1.8zM19 19h-3v-4.5c0-1.1-.9-2-2-2s-2 .9-2 2V19h-3v-9h3v1.2c.5-.8 1.6-1.4 2.9-1.4 2.2 0 4 1.8 4 4V19z" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="mt-8 sm:mt-0 sm:ml-8">
            <h3 className="text-lg font-medium text-white mb-2">
              Subscribe to our newsletter
            </h3>
            <form className="flex flex-col sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-l-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-6 border-gray-700 lg:my-8" />

        {/* Copyright */}
        <span className="block text-sm sm:text-center text-gray-400">
          © 2023{" "}
          <a href="#" className="hover:text-blue-500">
            C9Lab (Pinak Infosec Pvt. Ltd.)
          </a>
          . All Rights Reserved.
        </span>
      </div>

      {/* Back-to-Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    </footer>
  );
};

export default Footer;