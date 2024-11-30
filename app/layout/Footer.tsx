import React from 'react';
import Image from 'next/image';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
const Footer: React.FC = () => {
  return (
    <footer className="bg-customGray text-white p-[1rem]">
      <div className="container mx-auto flex flex-col items-center justify-center md:flex-row md:gap-8">
        {/* Logo and Council Information */}
        <div className="flex flex-col items-center md:mb-0 md:items-start">
          <a
            href="https://www.sntciitbhu.co.in/"
            title="SNTC"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/sntc.svg"
              alt="SNTC Logo"
              width={256}
              height={64}
              className="h-auto w-64"
            />
          </a>
        </div>

        {/* Divider */}
        <div className="hidden h-20 border-l border-gray-600 pr-7 md:block"></div>

        {/* Social Links */}
        <div className="flex flex-col items-center justify-center md:items-center">
          <h2 className="mb-2 text-lg font-semibold">Social Links</h2>
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com/technexiitbhu/"
              target="_blank"
              title="Facebook"
              rel="noopener noreferrer"
            >
              <FaFacebookF className="text-xl hover:text-gray-400" />
            </a>
            <a
              href="https://www.instagram.com/technexiitbhu/?hl=en"
              target="_blank"
              title="Instagram"
              rel="noopener noreferrer"
            >
              <FaInstagram className="text-xl hover:text-gray-400" />
            </a>
            <a
              href="https://www.linkedin.com/company/technex-iit-bhu-varanasi/?originalSubdomain=in"
              target="_blank"
              title="LinkedIn"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn className="text-xl hover:text-gray-400" />
            </a>
            <a
              href="https://x.com/technexiitbhu"
              target="_blank"
              title="Twitter"
              rel="noopener noreferrer"
            >
              <FaXTwitter className="text-xl hover:text-gray-400" />
            </a>
            <a
              href="https://www.youtube.com/@TechnexIITBHU"
              target="_blank"
              title="Youtube"
              rel="noopener noreferrer"
            >
              <FaYoutube className="text-xl hover:text-gray-400" />
            </a>
          </div>
          <p className="mt-2 text-xs">
            For more queries:{' '}
            <a
              href="mailto:publicity@technex.in"
              className="text-red-500 hover:underline"
              title="Email"
            >
              publicity@technex.in
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
