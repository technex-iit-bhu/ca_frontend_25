import React from 'react';
import Image from 'next/image';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import GridBackground from './GridBackground';

const Footer = () => {
  const socialLinks = [
    {
      icon: FaInstagram,
      href: 'https://www.instagram.com/technexiitbhu/?hl=en',
      title: 'Instagram',
      color: 'rgb(244,114,182)',
    },
    {
      icon: FaLinkedinIn,
      href: 'https://www.linkedin.com/company/technex-iit-bhu-varanasi/?originalSubdomain=in',
      title: 'LinkedIn',
      color: 'rgb(59,130,246)',
    },
    {
      icon: FaFacebookF,
      href: 'https://www.facebook.com/technexiitbhu/',
      title: 'Facebook',
      color: 'rgb(37,99,235)',
    },
    {
      icon: FaXTwitter,
      href: 'https://x.com/technexiitbhu',
      title: 'Twitter',
      color: 'rgb(156,163,175)',
    },
    {
      icon: FaYoutube,
      href: 'https://www.youtube.com/@TechnexIITBHU',
      title: 'Youtube',
      color: 'rgb(239,68,68)',
    },
  ];

  return (
    <footer className="relative mt-10">
      <div className="h-2 w-full bg-red-700" />

      <GridBackground>
        <div className="container mx-auto flex flex-col items-center justify-between gap-6 p-4 md:flex-row md:gap-4">
          <div className="group transition-all duration-200 hover:-translate-y-0.5">
            <a
              href="https://www.sntciitbhu.co.in/"
              className="relative block rounded border-2 border-red-500/20 p-2 hover:border-red-500/50"
              title="SNTC"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/sntc.svg"
                alt="SNTC Logo"
                width={128}
                height={32}
                className="relative h-auto w-32"
              />
            </a>
          </div>

          <div className="order-last border-2 border-red-500/30 bg-black/40 p-4 text-center md:order-none">
            <p className="mb-2 font-mono text-sm text-red-400">FOR QUERIES:</p>
            <a
              href="mailto:publicity@technex.in"
              className="group relative font-mono text-red-300 transition-colors hover:text-red-400"
            >
              <span className="relative inline-block">
                &gt; publicity@technex.in_
                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-red-400 transition-all group-hover:w-full" />
              </span>
            </a>
          </div>

          <div className="flex gap-4">
            {socialLinks.map(({ icon: Icon, href, title, color }, index) => (
              <a
                key={index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                title={title}
                style={{ '--hover-color': color } as React.CSSProperties}
                className="group relative border-2 border-red-500/20 bg-black/50 p-2.5 transition-all hover:-translate-y-0.5 hover:border-[color:var(--hover-color)] hover:[box-shadow:0_0_15px_var(--hover-color)]"
              >
                <Icon className="text-xl text-red-400 transition-all group-hover:scale-110 group-hover:text-[var(--hover-color)] group-hover:[filter:drop-shadow(0_0_5px_var(--hover-color))]" />
              </a>
            ))}
          </div>
        </div>
      </GridBackground>
    </footer>
  );
};

export default Footer;
