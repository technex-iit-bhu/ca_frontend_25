import React from 'react';
import { FaPhoneAlt } from 'react-icons/fa';
import Footer from './Footer';
import { HeadingTexts } from './HeadingTexts';

const ContactUs: React.FC = () => {
  return (
    <>
      <div className="relative bg-zinc-900 text-white" id="contact-us">
        {/* Background "Contact" Text */}
        <HeadingTexts bgText="Contact" redText="Us" whiteText="Contact" align="right" />

        {/* Contact Information Centered */}
        <div className="mt-8 flex animate-pulse flex-col items-center justify-center gap-10 px-4 md:flex-row md:space-x-10 md:px-0">
          {/* Contact Card 1 */}
          <div className="flex flex-col items-center space-y-2 md:flex-row md:items-center md:space-x-4">
            <FaPhoneAlt className="text-3xl text-gray-400" />
            <div className="flex flex-col items-center p-3 md:items-start">
              <p className="font-semibold text-customRed">Rhythm</p>
              <p className="text-sm text-white">+91 8955879550</p>
            </div>
          </div>

          {/* Contact Card 2 */}
          <div className="flex flex-col items-center space-y-2 md:flex-row md:items-center md:space-x-4">
            <FaPhoneAlt className="text-3xl text-gray-400" />
            <div className="flex flex-col items-center p-3 md:items-start">
              <p className="font-semibold text-customRed">Keshav Maheshwari</p>
              <p className="text-sm text-white">+91 8761833418</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
