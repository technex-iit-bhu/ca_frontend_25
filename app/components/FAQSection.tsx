import React from 'react';
import { Card, CardContent } from '@/app/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/app/components/ui/accordion';
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
  title?: string;
  description?: string;
  testimonials?: Testimonial[];
  faqs?: FAQ[];
}

// FAQItem Component
const FAQItem: React.FC<{ question: string; answer: string; index: number }> = ({
  question,
  answer,
  index,
}) => {
  return (
    <AccordionItem key={index} value={`item-${index}`}>
      <AccordionTrigger className="flex w-full items-center rounded-lg bg-zinc-800 p-4 text-white hover:text-red-600">
        {question}
      </AccordionTrigger>
      <AccordionContent className="w-full rounded-lg bg-zinc-900 p-4 text-gray-400">
        {answer}
      </AccordionContent>
    </AccordionItem>
  );
};

const FAQSection: React.FC<FAQSectionProps> = ({
  // title = 'Why Choose Us',
  // description = 'Discover why thousands trust us with their journey to success. We provide unparalleled expertise, commitment, and a passion for helping our clients reach their goals. From personalized services to industry-leading insights, we are here to make a difference.',
  testimonials = [],
  faqs = [],
}) => {
  return (
    <div className="min-h-screen w-full space-y-16 bg-zinc-900 p-8 text-white">
      {/* Introduction Section */}
      <section className="mb-16">
        <div className="mx-auto flex max-w-2xl items-start gap-4">
          <div>
            <h1 className="mb-6 text-5xl font-bold">
              Why <span className="text-red-600">CA</span>
            </h1>
            <p className="text-gray-300">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
              dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
              in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <div className="mt-8 w-32 border-t border-red-600"></div>
          </div>
          <div className="flex items-center justify-center text-[200px] font-bold text-gray-500">
            ?
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="mb-16">
        <div className="mx-auto flex max-w-4xl flex-col justify-center text-center">
          <h2 className="mb-8 text-4xl font-bold">Testimonials</h2>
          <div className="flex flex-wrap gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="w-full border-none bg-zinc-800 md:w-[48%]">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Image
                      className="h-16 w-16 rounded-lg bg-zinc-700"
                      src="/next.svg"
                      alt="User Icon"
                      width={64}
                      height={64}
                    />
                    <div className="flex-1">
                      <h3 className="mb-2 text-xl font-semibold">
                        <span className="text-white">{testimonial.name}</span>
                        <span className="text-red-600"> {testimonial.surname}</span>
                      </h3>
                      <p className="text-gray-400">{testimonial.content}</p>
                      <button className="mt-2 rounded-2xl border border-white px-4 py-1 text-white">
                        Read More
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mx-auto mt-8 w-32 border-t border-red-600"></div>
        </div>
      </section>

      {/* FAQs Section */}
      <section>
        <div className="mx-auto flex max-w-4xl flex-col justify-center text-center">
          <h2 className="mb-8 text-4xl font-bold">FAQs</h2>
          <Accordion type="single" collapsible className="grid w-full grid-cols-1 gap-6">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} index={index} />
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
};

export default FAQSection;
