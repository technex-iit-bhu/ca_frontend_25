import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { HeadingTexts } from './HeadingTexts';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import RedLine from './RedLine';
import Modal from '@/app/layout/Modal';

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

const FAQandTestimonials: React.FC<FAQSectionProps> = ({
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<string>('');
  const [isAutoScrollEnabled, setIsAutoScrollEnabled] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isAutoScrollEnabled) {
        setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [testimonials.length, isAutoScrollEnabled]);

  const toggleFAQ = (index: number) => {
    setExpandedFAQ((prev) => (prev === index ? null : index));
  };

  const handleNextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const handlePrevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleReadMore = () => {
    setModalContent(testimonials[currentTestimonial].content);
    setIsModalOpen(true);
    setIsAutoScrollEnabled(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsAutoScrollEnabled(true);
  };

  return (
    <div className="min-h-screen w-full p-8 pt-[4rem] text-white">
      {/* Testimonials Section */}
      <div>
        <div className="mb-10">
          <HeadingTexts redText="" whiteText="Testimonials" align="center" />
        </div>

        <div className="relative mx-auto flex flex-col items-center text-center">
          <div className="relative flex w-full items-center justify-center">
            {/* Navigation Buttons */}
            <button
              onClick={handlePrevTestimonial}
              className="absolute -left-10 z-10 p-2 sm:left-10"
              aria-label="Previous Testimonial"
            >
              <FaArrowLeft className="text-2xl text-white" />
            </button>
            <button
              onClick={handleNextTestimonial}
              className="absolute -right-10 z-10 p-2 sm:right-10"
              aria-label="Next Testimonial"
            >
              <FaArrowRight className="text-2xl text-white" />
            </button>
            {/* Testimonial Card */}
            <div className="relative flex w-full max-w-[35rem] rounded-2xl bg-[#272727] p-4 shadow-lg sm:p-6 md:p-8">
              <Image
                src="/next.svg"
                alt="Testimonial Icon"
                className="h-[100px] w-[100px] rounded-lg bg-[#646464] sm:h-[120px] sm:w-[120px] md:h-[150px] md:w-[150px]"
                width={120}
                height={120}
              />

              {/* Text Content */}
              <div className="ml-4 sm:ml-6 md:ml-8">
                <h3 className="mb-2 text-lg font-semibold sm:text-xl md:text-2xl">
                  <span className="text-white">{testimonials[currentTestimonial].name}</span>
                  <span className="text-red-600"> {testimonials[currentTestimonial].surname}</span>
                </h3>
                <p className="text-sm text-white sm:text-base md:text-lg">
                  {testimonials[currentTestimonial].content.slice(0, 100)}....
                </p>
                {/* Read More Button */}
                <button
                  className="mt-2 rounded-xl border border-white px-3 py-1 text-white hover:bg-red-600 hover:text-white"
                  onClick={handleReadMore}
                >
                  Read More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <RedLine align="right" />
      </div>

      {/* FAQs Section */}
      <section className="relative mt-10" id="faqs">
        <div className="md:mb-10">
          <HeadingTexts redText="" whiteText="FAQs" align="center" />
        </div>
        <div className="relative mx-auto flex max-w-4xl flex-col justify-center">
          {/* Two adjacent grids */}
          <div className="flex flex-col justify-between gap-12 md:flex-row">
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
      <RedLine align="right" />

      {/* Modal */}
      {isModalOpen && (
        <Modal onClose={handleCloseModal} isOpen={isModalOpen}>
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={handleCloseModal}
          >
            <div
              className="relative w-full max-w-4xl rounded-lg bg-zinc-900 p-6 text-white sm:max-w-3xl md:max-w-2xl lg:max-w-2xl xl:max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 text-white">
                <h2 className="mb-4 text-xl font-semibold">
                  <span className="text-white">{testimonials[currentTestimonial].name}</span>
                  <span className="text-red-600"> {testimonials[currentTestimonial].surname}</span>
                </h2>
                <p>{modalContent}</p>
                <button
                  className="mt-4 rounded-xl border border-white px-3 py-1 text-white hover:bg-red-600 hover:text-white"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default FAQandTestimonials;
