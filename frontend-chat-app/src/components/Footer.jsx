import React from "react";

const Footer = () => {
  return (
    <footer className="bg-background shadow mx-4 rounded-lg">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://c9lab.com/wp-content/uploads/2025/02/Untitled-design-2048x1240.png"
              className="h-8"
              alt="Swift Logo"
              style={{
                backgroundColor: 'none'
              }}
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
              C9Lab (Pinak Infosec Pvt. Ltd.)
            </span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium sm:mb-0 text-gray-400">
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Licensing
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6  sm:mx-auto border-gray-700 lg:my-8" />
        <span className="block text-sm  sm:text-center text-gray-400">
          © 2023{" "}
          <a className="hover:underline">
            C9Lab (Pinak Infosec Pvt. Ltd.  )
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;