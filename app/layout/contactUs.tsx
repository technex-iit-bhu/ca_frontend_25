import React from 'react';
import { FaPhoneAlt } from 'react-icons/fa';
import Footer from './Footer';
import { HeadingTexts } from './HeadingTexts';

const ContactUs: React.FC = () => {
  return (
    <>
      <div className="relative text-white" id="contact-us">
        {/* Background "Contact" Text */}
        <div className="lg:text-[11rem text-[3rem] sm:text-[144px]">
          <HeadingTexts redText="Us" whiteText="Contact" align="right" />
        </div>

        {/* Contact Information Centered */}
        <div className="mt-8 flex flex-col items-center justify-center gap-10 px-4 md:flex-row md:space-x-10 md:px-0">
          {/* Contact Card 1 */}
          <div className="flex flex-col items-center space-y-2 md:flex-row md:items-center md:space-x-4 transition-all">
            <FaPhoneAlt className="text-3xl text-gray-400" />
            <div className="flex flex-col items-center p-3 md:items-start">
              <p className="font-semibold text-customRed hover:text-red-500">Sumit</p>
              <p className="text-sm text-white">+91 8077712258</p>
            </div>
          </div>

          {/* Contact Card 2 */}
          <div className="flex flex-col items-center space-y-2 md:flex-row md:items-center md:space-x-4">
            <FaPhoneAlt className="text-3xl text-gray-400" />
            <div className="flex flex-col items-center p-3 md:items-start">
              <p className="font-semibold text-customRed hover:text-red-500">Kartikey</p>
              <p className="text-sm text-white">+91 9560879378</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
