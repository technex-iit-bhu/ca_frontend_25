'use client';

import { useEffect, useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/app/components/ui/button';

export function RedesignedCards() {
  // Previous state management code remains the same
  const [incentivesIndex1, setIncentivesIndex1] = useState(0);
  const [incentivesIndex2, setIncentivesIndex2] = useState(0);
  const [responsibilitiesIndex, setResponsibilitiesIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState({ incentives: 1, responsibilities: 1 });
  interface CardItem {
    title: string;
    description: string;
    icon?: string;
  }

  // Previous arrays and refs remain the same
  const incentives1 = [
    {
      title: 'Paisa hi Paisa Hoga',
      description:
        'Paisa manga lena boss, karna sales, fun things, Zyada kuch nahi bas thodi mehnat karni padegi, Aur kya chaiye life me manage karna hai, jyada nhi',
    },
    {
      title: 'Paisa hi Paisa Hoga',
      description:
        'Paisa manga lena boss, karna sales, fun things, Zyada kuch nahi bas thodi mehnat karni padegi',
    },
    {
      title: 'Paisa hi Paisa Hoga',
      description:
        'Paisa manga lena boss, karna sales, fun things, Zyada kuch nahi bas thodi mehnat karni padegi',
    },
    {
      title: 'Paisa hi Paisa Hoga',
      description: 'Extra incentive 1 for more rewards and opportunities',
    },
    {
      title: 'Paisa hi Paisa Hoga',
      description: 'Extra incentive 2 for additional benefits and perks',
    },
    { title: 'Paisa hi Paisa Hoga', description: 'Extra incentive 3 for exclusive advantages' },
  ];

  const incentives2 = [
    {
      title: 'Paisa hi Paisa Hoga',
      description:
        'Paisa manga lena boss, karna sales, fun things, Zyada kuch nahi bas thodi mehnat karni padegi',
    },
    {
      title: 'Paisa hi Paisa Hoga',
      description:
        'Paisa manga lena boss, karna sales, fun things, Zyada kuch nahi bas thodi mehnat karni padegi',
    },
    {
      title: 'Paisa hi Paisa Hoga',
      description: 'Extra incentive 4 for more financial opportunities',
    },
    {
      title: 'Paisa hi Paisa Hoga',
      description: 'Extra incentive 5 for additional monetary benefits',
    },
    {
      title: 'Paisa hi Paisa Hoga',
      description: 'Extra incentive 6 for exclusive financial perks',
    },
    {
      title: 'Paisa hi Paisa Hoga',
      description: 'Extra incentive 7 for enhanced earning potential',
    },
  ];

  const responsibilities = [
    { title: 'Publicise', icon: '📢', description: 'Spread awareness about the event' },
    { title: 'Co-ordinate', icon: '👥', description: 'Work together with the team' },
    {
      title: 'Social Media',
      icon: '📱',
      description:
        'Harnessing the power of social media to create awareness and generate buzz around the college fest.',
    },
    { title: 'Tasks', icon: '📋', description: 'Complete assigned responsibilities' },
    {
      title: 'Networking',
      icon: '🌐',
      description: 'Build connections and expand your professional network',
    },
    {
      title: 'Innovation',
      icon: '💡',
      description: 'Bring creative ideas to enhance the event experience',
    },
  ];

  const containerRef1 = useRef(null);
  const containerRef2 = useRef(null);
  const containerRef3 = useRef(null);

  // Previous useEffect hooks remain the same
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setCardsToShow({ incentives: 1, responsibilities: 1 });
      } else if (width < 1024) {
        setCardsToShow({ incentives: 2, responsibilities: 3 });
      } else {
        setCardsToShow({ incentives: 3, responsibilities: 4 });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIncentivesIndex1((prev) => (prev + 1) % incentives1.length);
      setIncentivesIndex2((prev) => (prev - 1 + incentives2.length) % incentives2.length);
      setResponsibilitiesIndex((prev) => (prev + 1) % responsibilities.length);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  // Previous renderCards function remains the same
  const renderCards = (
    items: CardItem[],
    index: number,
    reverse = false,
    containerRef: React.RefObject<HTMLDivElement>,
  ) => {
    const doubledItems = [...items, ...items];
    return (
      <div
        ref={containerRef}
        className="flex transition-transform duration-500"
        style={{
          transform: `translateX(-${(index * 100) / cardsToShow.incentives}%)`,
          width: `${(items.length * 100) / cardsToShow.incentives}%`,
        }}
      >
        {doubledItems.map((item, i) => (
          <div
            key={i}
            className={`px-2 ${reverse ? 'ml-4' : 'mr-4'}`}
            style={{ flex: `0 0 ${100 / (items.length * 2)}%` }}
          >
            <div className="relative mx-auto h-60 max-w-sm rounded-xl border-2 border-red-600 bg-gray-900 p-6 text-white shadow-md">
              <h2 className="text-2xl font-semibold text-gray-100">
                Paisa hi <span className="text-red-600">Paisa</span> Hoga
              </h2>
              <p className="text-sm text-gray-400">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Previous handleNavigation function remains the same
  const handleNavigation = (
    direction: 'next' | 'prev',
    setIndex: React.Dispatch<React.SetStateAction<number>>,
    items: CardItem[],
    containerRef: React.RefObject<HTMLDivElement>,
  ) => {
    setIndex((prev) => {
      const newIndex = direction === 'next' ? prev + 1 : prev - 1;
      if (newIndex >= items.length && containerRef.current) {
        containerRef.current.style.transition = 'none';
        containerRef.current.style.transform = 'translateX(0)';
        setTimeout(() => {
          if (containerRef.current) {
            containerRef.current.style.transition = 'transform 500ms';
            setIndex(1);
          }
        }, 50);
        return 0;
      } else if (newIndex < 0 && containerRef.current) {
        containerRef.current.style.transition = 'none';
        containerRef.current.style.transform = `translateX(-${((items.length - 1) * 100) / cardsToShow.incentives}%)`;
        setTimeout(() => {
          if (containerRef.current) {
            containerRef.current.style.transition = 'transform 500ms';
            setIndex(items.length - 2);
          }
        }, 50);
        return items.length - 1;
      }
      return newIndex;
    });
  };

  return (
    <div className="min-h-screen bg-black p-4 text-white sm:p-8">
      {/* Incentives Section - remains the same */}
      <section className="mb-16 mt-16">
        <div className="relative flex items-end justify-start">
          {/* Background text */}
          <h2 className="absolute text-[4rem] font-bold tracking-tight text-red-600 opacity-20 sm:text-[9rem]">
            Incentives
          </h2>

          {/* Foreground text */}
          <h2 className="relative mb-8 text-4xl text-white sm:text-6xl">Incentives</h2>
        </div>

        {/* First Row */}
        <div className="relative mb-8 overflow-hidden">
          {renderCards(incentives1, incentivesIndex1, false, containerRef1)}
          <Button
            variant="ghost"
            className="absolute left-0 top-1/2 -translate-y-1/2"
            onClick={() =>
              handleNavigation('prev', setIncentivesIndex1, incentives1, containerRef1)
            }
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>
          <Button
            variant="ghost"
            className="absolute right-0 top-1/2 -translate-y-1/2"
            onClick={() =>
              handleNavigation('next', setIncentivesIndex1, incentives1, containerRef1)
            }
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
        </div>

        {/* Second Row */}
        <div className="relative overflow-hidden">
          {renderCards(incentives2, incentivesIndex2, true, containerRef2)}
          <Button
            variant="ghost"
            className="absolute left-0 top-1/2 -translate-y-1/2"
            onClick={() =>
              handleNavigation('prev', setIncentivesIndex2, incentives2, containerRef2)
            }
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>
          <Button
            variant="ghost"
            className="absolute right-0 top-1/2 -translate-y-1/2"
            onClick={() =>
              handleNavigation('next', setIncentivesIndex2, incentives2, containerRef2)
            }
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
        </div>
      </section>

      {/* Responsibilities Section - with redesigned cards */}
      <section className="mb-16 mt-16">
        <div className="relative flex items-end justify-start">
          {/* Background text */}
          <h2 className="absolute text-[4rem] font-bold tracking-tight text-red-600 opacity-20 sm:text-[8rem]">
            Responsibilities
          </h2>

          {/* Foreground text */}
          <h2 className="relative mb-8 text-4xl text-white sm:text-6xl">Responsibilities</h2>
        </div>
        <div className="relative overflow-hidden">
          <div
            ref={containerRef3}
            className="flex transition-transform duration-500"
            style={{
              transform: `translateX(-${(responsibilitiesIndex * 100) / cardsToShow.responsibilities}%)`,
              width: `${(responsibilities.length * 200) / cardsToShow.responsibilities}%`,
            }}
          >
            {[...responsibilities, ...responsibilities].map((item, index) => (
              <div
                key={index}
                className="px-2"
                style={{ flex: `0 0 ${100 / (responsibilities.length * 2)}%` }}
              >
                <div className="relative h-64 w-48 overflow-hidden rounded-lg border-l-2 border-r-2 border-red-600 bg-gray-900">
                  {/* Top curved section with icon */}
                  <div className="absolute left-0 right-0 top-0 h-32 bg-gray-800">
                    {/* White circle for icon */}
                    <div className="absolute left-1/2 top-4 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full bg-white">
                      <span className="text-2xl">{item.icon}</span>
                    </div>
                    {/* Curved bottom edge */}
                    <div
                      className="absolute -bottom-8 left-0 right-0 h-16 bg-gray-900"
                      style={{
                        borderTopLeftRadius: '50%',
                        borderTopRightRadius: '50%',
                      }}
                    ></div>
                  </div>
                  {/* Content section */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                    <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-400">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Button
            variant="ghost"
            className="absolute left-0 top-1/2 -translate-y-1/2"
            onClick={() =>
              handleNavigation('prev', setResponsibilitiesIndex, responsibilities, containerRef3)
            }
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>
          <Button
            variant="ghost"
            className="absolute right-0 top-1/2 -translate-y-1/2"
            onClick={() =>
              handleNavigation('next', setResponsibilitiesIndex, responsibilities, containerRef3)
            }
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
        </div>
      </section>
    </div>
  );
}
