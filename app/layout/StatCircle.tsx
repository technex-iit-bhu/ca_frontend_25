import React, { useState, useEffect, useRef } from 'react';

interface StatCircleProps {
  value: number;
  percentage: number;
  label: string;
}

export default function StatCircle({ value, percentage, label }: StatCircleProps) {
  const [progress, setProgress] = useState(0);
  const circleRef = useRef<HTMLDivElement | null>(null);

  const radius = 15.9155;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  useEffect(() => {
    const handleScroll = () => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setProgress(percentage);
            }, 300); // Add slight delay for smooth animation
          }
        },
        { threshold: 0.3 },
      );

      if (circleRef.current) {
        observer.observe(circleRef.current);
      }

      return () => {
        if (circleRef.current) {
          observer.unobserve(circleRef.current);
        }
      };
    };

    handleScroll();

    // Trigger the animation on initial load if it's already in view
    if (circleRef.current && isElementInViewport(circleRef.current)) {
      setProgress(percentage);
    }
  }, [percentage]);

  // Helper function to check if the element is in the viewport
  const isElementInViewport = (element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    return rect.top >= 0 && rect.bottom <= window.innerHeight;
  };

  return (
    <div ref={circleRef} className="flex flex-col items-center gap-4 p-4">
      <div className="relative flex h-32 w-32 items-center justify-center sm:h-40 sm:w-40 md:h-48 md:w-48">
        <svg className="absolute h-full w-full" viewBox="0 0 36 36">
          {/* Background Circle */}
          <path
            className="text-gray-700"
            strokeWidth="4"
            stroke="currentColor"
            fill="none"
            d="M18 2.0845a15.9155 15.9155 0 1 1 0 31.831 15.9155 15.9155 0 1 1 0-31.831"
          />
          {/* Progress Circle */}
          <path
            className="text-red-600 transition-all duration-700 ease-in-out"
            strokeWidth="4"
            stroke="currentColor"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            d="M18 2.0845a15.9155 15.9155 0 1 1 0 31.831 15.9155 15.9155 0 1 1 0-31.831"
          />
        </svg>
        <span className="absolute text-lg font-bold text-white sm:text-4xl md:text-6xl">
          {value}
        </span>
      </div>
      <p className="text-sm text-gray-300 sm:text-lg md:text-xl">{label}</p>
    </div>
  );
}
