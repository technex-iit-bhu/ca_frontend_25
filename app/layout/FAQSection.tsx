import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

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
      name: 'Shivansh',
      surname: 'Bhatnagar',
      content:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae voluptate repellendus magni illo ea animi?',
    },
    {
      name: 'Aditi',
      surname: 'Verma',
      content:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae voluptate repellendus magni illo ea animi?',
    },
    {
      name: 'Rohit',
      surname: 'Sharma',
      content:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae voluptate repellendus magni illo ea animi?',
    },
  ],
  faqs = [
    {
      question: 'Who can become a College Ambassador?',
      answer:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae voluptate repellendus magni illo ea animi?',
    },
    {
      question: 'How to become a College Ambassador?',
      answer:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae voluptate repellendus magni illo ea animi?',
    },
    {
      question: 'How many CAs can be there from a college?',
      answer:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae voluptate repellendus magni illo ea animi?',
    },
    {
      question: 'What are the conditions under which I will get a CA Certificate?',
      answer:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae voluptate repellendus magni illo ea animi?',
    },
    {
      question: 'How much do I have to work to Top the Leaderboard?',
      answer:
        'Completion of every task on time would keep you on the list of contenders for the top positions to grab the incentives of free training and free courses.',
    },{
      question: 'some question',
      answer: 'some answer'
    }
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
    <div className="min-h-screen w-full space-y-16 bg-zinc-900 p-8 pt-20 text-white">
      {/* Testimonials Section */}
      <section className="relative mb-16">
        <div className="pointer-events-none absolute left-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 transform px-24 overflow-hidden overflow-x-hidden">
          <h1 className="text-[12rem] font-bold text-customRed opacity-10">Testimonials</h1>
        </div>
        <div className="relative mx-auto flex flex-col items-center text-center">
          <h2 className="mb-8 text-6xl font-bold">Testimonials</h2>
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
                  <span className="text-white">{testimonials[currentTestimonial].name}</span>
                  <span className="text-red-600"> {testimonials[currentTestimonial].surname}</span>
                </h3>
                <p className="text-gray-400">{testimonials[currentTestimonial].content}</p>
                <button className="mt-4 rounded-xl border border-white px-4 py-2 text-white hover:bg-red-600 hover:text-white">
                  Read More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="flex w-full justify-center pt-16">
        <div className="mb-36 h-1 w-full max-w-[90%] bg-red-600 sm:w-1/2 md:w-1/3"></div>
      </div>

      {/* FAQs Section */}
      <section className="relative mt-16" id="faqs">
        <div className="pointer-events-none absolute bottom-40 left-60 h-full w-full">
          <h1 className="text-[12rem] font-bold text-customRed opacity-10">FAQs</h1>
        </div>
        <div className="relative mx-auto flex max-w-4xl flex-col justify-center">
          <h2 className="mb-8 text-6xl font-bold">FAQs</h2>
          {/* Two adjacent grids */}
          <div className="flex justify-between gap-12">
            <div className="w-full grid grid-cols-1 gap-6">
              {/* First Grid of FAQs */}
              {faqs.slice(0, Math.ceil(faqs.length / 2)).map((faq, index) => (
                <div
                  key={index}
                  className="relative cursor-pointer rounded-lg bg-zinc-800 p-4"
                  onClick={() => toggleFAQ(index)}
                >
                  <h3 className="mb-2 flex justify-between text-xl font-semibold text-white">
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
                        <div className="py-2 text-gray-400">{faq.answer}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            <div className="w-full grid grid-cols-1 gap-6">
              {/* Second Grid of FAQs */}
              {faqs.slice(Math.ceil(faqs.length / 2)).map((faq, index) => (
                <div
                  key={index}
                  className="relative cursor-pointer rounded-lg bg-zinc-800 p-4"
                  onClick={() => toggleFAQ(index + Math.ceil(faqs.length / 2))}
                >
                  <h3 className="mb-2 flex justify-between text-xl font-semibold text-white">
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
                        <div className="py-2 text-gray-400">{faq.answer}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <div className="mt-6 flex w-full justify-start pl-16">
        <div className="mb-16 h-1 w-full max-w-[90%] bg-red-600 sm:w-1/2 md:w-1/3"></div>
      </div>
    </div>
  );
};

export default FAQSection;
