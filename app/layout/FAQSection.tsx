import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { HeadingTexts } from './HeadingTexts';
interface Testimonial {
  name: string;
  surname: string;
  content: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  testimonials?: Testimonial[];
  faqs?: FAQ[];
}

const FAQSection: React.FC<FAQSectionProps> = ({
  testimonials = [
    {
      name: 'Eleen',
      surname: 'Verma',
      content:
        "My journey as a Campus Ambassador for TECHNEX'23 at IIT BHU was not only incredible but also instrumental in my personal and professional growth. This experience holds a special place in my heart, and I am grateful for the opportunity. Stay TECHNEXED!",
    },
    {
      name: 'Neha',
      surname: 'Upadhyay',
      content:
        "As the CA for TECHNEX'23, I honed my persuasive skills, and the remarkable support from the Technex team was truly commendable. In essence, Technex is both enjoyable and enlightening. Stay TECHNEXED!",
    },
    {
      name: 'Shakti',
      surname: 'Nandan',
      content:
        "Proudly serving as a Campus Ambassador for TECHNEX'23 in the vibrant and culturally rich campus of IIT BHU has been a highly enriching experience. Grateful to the TECHNEX team for providing such a valuable opportunity. Stay TECHNEXED!",
    },
    {
      name: 'Manish',
      surname: 'Gupta',
      content:
        'As a Campus Ambassador for TECHNEX, IIT BHU, the experience has been nothing short of wonderful. Representing my college at this prestigious technical fest has been a privilege. Stay TECHNEXED!',
    },
    {
      name: 'Krishna',
      surname: 'Raj',
      content:
        'An exceptionally delightful experience, spanning from the culinary diversity to meticulous security arrangements. The organisers demonstrated an unwavering commitment, surpassing expectations to craft a truly memorable event for all attendees. Stay TECHNEXED!',
    },
    {
      name: 'Umesh',
      surname: 'Verma',
      content:
        "Serving as a Campus Ambassador for TECHNEX'23 was a transformative experience, offering opportunities to engage with prospective students, represent my university, and share valuable insights about campus life. Stay TECHNEXED!",
    },
  ],
  faqs = [
    {
      question: 'How can I become a Campus Ambassador?',
      answer:
        'Simply register through the official Technex CA portal. Selected candidates will receive detailed instructions and tasks to begin their role.',
    },
    {
      question: 'Will I receive any training or support?',
      answer:
        'Yes, selected Campus Ambassadors will receive an orientation session and access to support from the Technex organizing team throughout the program.',
    },
    {
      question: 'Is this a paid opportunity?',
      answer:
        'The Campus Ambassador program is not a paid position. However, top-performing CAs may receive performance-based incentives, recognition, and potential internship opportunities.',
    },
    {
      question: 'Can I participate in Technex events while being a Campus Ambassador?',
      answer:
        'Absolutely! As a CA, you are encouraged to participate in the events and competitions to experience the fest fully.',
    },
    {
      question: 'What if I face difficulties completing my tasks?',
      answer:
        'You can reach out to the Technex support team anytime. They will guide you through any challenges and help you stay on track with your responsibilities.',
    },
    {
      question: 'Do I need to have a large social media following to be a Campus Ambassador?',
      answer:
        'No, a large following is not required. The program values enthusiasm, creativity, and dedication in promoting events, engaging your campus community, and driving participation.',
    },
  ],
}) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const toggleFAQ = (index: number) => {
    setExpandedFAQ((prev) => (prev === index ? null : index)); // Toggle expanded state
  };

  return (
    <div className="min-h-screen w-full bg-zinc-900 p-8 pt-[4rem] text-white">
      {/* Testimonials Section */}
      <section className="relative">
        <div>
          <div className="my-10 hidden md:block">
            <HeadingTexts bgText="Testimonials" redText="" whiteText="Testimonials" align="left" />
          </div>
          <div className="mt-5 block text-[5rem] md:hidden">
            <HeadingTexts bgText="" redText="" whiteText="Testimonials" align="left" />
          </div>
        </div>

        <div className="relative mx-auto flex flex-col items-center text-center">
          <div className="relative flex w-full items-center justify-center">
            {/* Testimonial Card */}
            <div className="relative flex w-[35rem] rounded-2xl bg-[#272727] p-8 shadow-lg">
              {/* Overflowing Image */}
              <div className="absolute -left-12 flex-shrink-0">
                <Image
                  src="/next.svg"
                  alt="Testimonial Icon"
                  className="h-[150px] w-[150px] rounded-lg bg-[#646464]"
                  width={120}
                  height={120}
                />
              </div>

              {/* Text Content */}
              <div className="ml-20">
                <h3 className="mb-4 text-2xl font-semibold">
                  <span className="text-white">
                    {Array.isArray(testimonials[currentTestimonial])
                      ? testimonials[currentTestimonial][0].name
                      : testimonials[currentTestimonial].name}
                  </span>
                  <span className="text-red-600">
                    {' '}
                    {Array.isArray(testimonials[currentTestimonial])
                      ? testimonials[currentTestimonial][0].surname
                      : testimonials[currentTestimonial].surname}
                  </span>
                </h3>
                <p className="text-gray-400">
                  {Array.isArray(testimonials[currentTestimonial])
                    ? testimonials[currentTestimonial][0].content
                    : testimonials[currentTestimonial].content}
                </p>
                {/* TODO : Read More Button */}
                {/* <button className="mt-4 rounded-xl border border-white px-4 py-2 text-white hover:bg-red-600 hover:text-white">
                  Read More
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="flex w-full justify-center pt-16">
        <div className="h-1 w-full max-w-[90%] bg-red-600 sm:w-1/2 md:w-1/3"></div>
      </div>

      {/* FAQs Section */}
      <section className="relative" id="faqs">
        <div className="md:mb-10">
          <HeadingTexts bgText="FAQs" redText="" whiteText="FAQs" align="left" />
        </div>
        <div className="relative mx-auto flex max-w-4xl flex-col justify-center">
          {/* Two adjacent grids */}
          <div className="flex flex-col md:flex-row justify-between gap-12">
            <div className="grid w-full grid-cols-1 gap-6">
              {/* First Grid of FAQs */}
              {faqs.slice(0, Math.ceil(faqs.length / 2)).map((faq, index) => (
                <div
                  key={index}
                  className="relative cursor-pointer rounded-lg bg-zinc-800 p-4"
                  onClick={() => toggleFAQ(index)}
                >
                  <h3 className="mb-2 flex justify-between text-lg font-semibold text-white">
                    {faq.question}
                    {expandedFAQ === index ? (
                      <FaChevronUp className="text-xl" />
                    ) : (
                      <FaChevronDown className="text-xl" />
                    )}
                  </h3>
                  <AnimatePresence>
                    {expandedFAQ === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="py-2 text-sm text-gray-400">{faq.answer}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            <div className="grid w-full grid-cols-1 gap-6">
              {/* Second Grid of FAQs */}
              {faqs.slice(Math.ceil(faqs.length / 2)).map((faq, index) => (
                <div
                  key={index}
                  className="relative cursor-pointer rounded-lg bg-zinc-800 p-4"
                  onClick={() => toggleFAQ(index + Math.ceil(faqs.length / 2))}
                >
                  <h3 className="mb-2 flex justify-between text-lg font-semibold text-white">
                    {faq.question}
                    {expandedFAQ === index + Math.ceil(faqs.length / 2) ? (
                      <FaChevronUp className="text-xl" />
                    ) : (
                      <FaChevronDown className="text-xl" />
                    )}
                  </h3>
                  <AnimatePresence>
                    {expandedFAQ === index + Math.ceil(faqs.length / 2) && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="py-2 text-sm text-gray-400">{faq.answer}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <div className="mt-8 flex w-full justify-start pl-16">
        <div className="mb-16 h-1 w-full max-w-[90%] bg-red-600 sm:w-1/2 md:w-1/3"></div>
      </div>
    </div>
  );
};

export default FAQSection;
