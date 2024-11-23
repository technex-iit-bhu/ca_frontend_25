import React, { useState, useEffect } from 'react';
import Image from 'next/image';

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
      question: 'What is CA, and why should I choose it?',
      answer:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae voluptate repellendus magni illo ea animi?',
    },
    {
      question: 'How long does it take to complete CA?',
      answer:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae voluptate repellendus magni illo ea animi?',
    },
    {
      question: 'What support do you provide during the course?',
      answer:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae voluptate repellendus magni illo ea animi?',
    },
  ],
}) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="min-h-screen w-full space-y-16 bg-zinc-900 p-8 text-white">
      {/* Testimonials Section */}
      <section className="mb-16">
        <div className="mx-auto flex flex-col items-center text-center">
          <h2 className="mb-8 text-4xl font-bold">Testimonials</h2>
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

      {/* FAQs Section */}
      <section>
        <div className="mx-auto flex max-w-4xl flex-col justify-center text-center">
          <h2 className="mb-8 text-4xl font-bold">FAQs</h2>
          <div className="grid w-full grid-cols-1 gap-6">
            {faqs.map((faq, index) => (
              <div key={index} className="rounded-lg bg-zinc-800 p-4">
                <h3 className="mb-2 text-lg font-semibold text-white">{faq.question}</h3>
                <p className="text-gray-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQSection;
