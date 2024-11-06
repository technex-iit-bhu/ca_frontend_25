'use client'

import { useEffect, useState, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function RedesignedCards() {
  // Previous state management code remains the same
  const [incentivesIndex1, setIncentivesIndex1] = useState(0)
  const [incentivesIndex2, setIncentivesIndex2] = useState(0)
  const [responsibilitiesIndex, setResponsibilitiesIndex] = useState(0)
  const [cardsToShow, setCardsToShow] = useState({ incentives: 1, responsibilities: 1 })

  // Previous arrays and refs remain the same
  const incentives1 = [
    { title: 'Paisa hi Paisa Hoga', description: 'Paisa manga lena boss, karna sales, fun things, Zyada kuch nahi bas thodi mehnat karni padegi, Aur kya chaiye life me manage karna hai, jyada nhi' },
    { title: 'Paisa hi Paisa Hoga', description: 'Paisa manga lena boss, karna sales, fun things, Zyada kuch nahi bas thodi mehnat karni padegi' },
    { title: 'Paisa hi Paisa Hoga', description: 'Paisa manga lena boss, karna sales, fun things, Zyada kuch nahi bas thodi mehnat karni padegi' },
    { title: 'Paisa hi Paisa Hoga', description: 'Extra incentive 1 for more rewards and opportunities' },
    { title: 'Paisa hi Paisa Hoga', description: 'Extra incentive 2 for additional benefits and perks' },
    { title: 'Paisa hi Paisa Hoga', description: 'Extra incentive 3 for exclusive advantages' }
  ]

  const incentives2 = [
    { title: 'Paisa hi Paisa Hoga', description: 'Paisa manga lena boss, karna sales, fun things, Zyada kuch nahi bas thodi mehnat karni padegi' },
    { title: 'Paisa hi Paisa Hoga', description: 'Paisa manga lena boss, karna sales, fun things, Zyada kuch nahi bas thodi mehnat karni padegi' },
    { title: 'Paisa hi Paisa Hoga', description: 'Extra incentive 4 for more financial opportunities' },
    { title: 'Paisa hi Paisa Hoga', description: 'Extra incentive 5 for additional monetary benefits' },
    { title: 'Paisa hi Paisa Hoga', description: 'Extra incentive 6 for exclusive financial perks' },
    { title: 'Paisa hi Paisa Hoga', description: 'Extra incentive 7 for enhanced earning potential' }
  ]

  const responsibilities = [
    { title: 'Publicise', icon: '📢', description: 'Spread awareness about the event' },
    { title: 'Co-ordinate', icon: '👥', description: 'Work together with the team' },
    { title: 'Social Media', icon: '📱', description: 'Harnessing the power of social media to create awareness and generate buzz around the college fest.' },
    { title: 'Tasks', icon: '📋', description: 'Complete assigned responsibilities' },
    { title: 'Networking', icon: '🌐', description: 'Build connections and expand your professional network' },
    { title: 'Innovation', icon: '💡', description: 'Bring creative ideas to enhance the event experience' }
  ]

  const containerRef1 = useRef(null)
  const containerRef2 = useRef(null)
  const containerRef3 = useRef(null)

  // Previous useEffect hooks remain the same
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 640) {
        setCardsToShow({ incentives: 1, responsibilities: 1 })
      } else if (width < 1024) {
        setCardsToShow({ incentives: 2, responsibilities: 3 })
      } else {
        setCardsToShow({ incentives: 3, responsibilities: 4 })
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setIncentivesIndex1((prev) => (prev + 1) % incentives1.length)
      setIncentivesIndex2((prev) => (prev - 1 + incentives2.length) % incentives2.length)
      setResponsibilitiesIndex((prev) => (prev + 1) % responsibilities.length)
    }, 1500)

    return () => clearInterval(interval)
  }, [])

  // Previous renderCards function remains the same
  const renderCards = (items, index, reverse = false, containerRef) => {
    const doubledItems = [...items, ...items]
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
           <div className="relative bg-gray-900 h-60 text-white p-6 rounded-xl border-2 border-red-600 shadow-md max-w-sm mx-auto">
               <h2 className="text-2xl font-semibold text-gray-100">
                       Paisa hi <span className="text-red-600">Paisa</span> Hoga
              </h2>
              <p className="text-gray-400 text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Previous handleNavigation function remains the same
  const handleNavigation = (direction, setIndex, items, containerRef) => {
    setIndex((prev) => {
      const newIndex = direction === 'next' ? prev + 1 : prev - 1
      if (newIndex >= items.length) {
        containerRef.current.style.transition = 'none'
        containerRef.current.style.transform = 'translateX(0)'
        setTimeout(() => {
          containerRef.current.style.transition = 'transform 500ms'
          setIndex(1)
        }, 50)
        return 0
      } else if (newIndex < 0) {
        containerRef.current.style.transition = 'none'
        containerRef.current.style.transform = `translateX(-${(items.length - 1) * 100 / cardsToShow.incentives}%)`
        setTimeout(() => {
          containerRef.current.style.transition = 'transform 500ms'
          setIndex(items.length - 2)
        }, 50)
        return items.length - 1
      }
      return newIndex
    })
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-8">
      {/* Incentives Section - remains the same */}
      <section className="mb-16 mt-16">
      <div className="relative flex items-end justify-start">
    {/* Background text */}
    <h2 className="text-[4rem] sm:text-[9rem] font-bold absolute text-red-600 opacity-20 tracking-tight">
      Incentives
    </h2>
    
    {/* Foreground text */}
    <h2 className="text-4xl sm:text-6xl mb-8 text-white relative">Incentives</h2>
  </div>
        
        {/* First Row */}
        <div className="relative mb-8 overflow-hidden">
          {renderCards(incentives1, incentivesIndex1, false, containerRef1)}
          <Button
            variant="ghost"
            className="absolute left-0 top-1/2 -translate-y-1/2"
            onClick={() => handleNavigation('prev', setIncentivesIndex1, incentives1, containerRef1)}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>
          <Button
            variant="ghost"
            className="absolute right-0 top-1/2 -translate-y-1/2"
            onClick={() => handleNavigation('next', setIncentivesIndex1, incentives1, containerRef1)}
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
            onClick={() => handleNavigation('prev', setIncentivesIndex2, incentives2, containerRef2)}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>
          <Button
            variant="ghost"
            className="absolute right-0 top-1/2 -translate-y-1/2"
            onClick={() => handleNavigation('next', setIncentivesIndex2, incentives2, containerRef2)}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
        </div>
      </section>

      {/* Responsibilities Section - with redesigned cards */}
      <section className='mb-16 mt-16'>
      <div className="relative flex items-end justify-start">
    {/* Background text */}
    <h2 className="text-[4rem] sm:text-[8rem] font-bold absolute text-red-600 opacity-20 tracking-tight">
      Responsibilities
    </h2>
    
    {/* Foreground text */}
    <h2 className="text-4xl sm:text-6xl mb-8 text-white relative">Responsibilities</h2>
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
                <div className="relative bg-gray-900 rounded-lg w-48 h-64 overflow-hidden border-l-2 border-r-2 border-red-600">
                  {/* Top curved section with icon */}
                  <div className="absolute top-0 left-0 right-0 h-32 bg-gray-800">
                    {/* White circle for icon */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-16 bg-white rounded-full flex items-center justify-center">
                      <span className="text-2xl">{item.icon}</span>
                    </div>
                    {/* Curved bottom edge */}
                    <div className="absolute -bottom-8 left-0 right-0 h-16 bg-gray-900" style={{
                      borderTopLeftRadius: '50%',
                      borderTopRightRadius: '50%'
                    }}></div>
                  </div>
                  {/* Content section */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Button
            variant="ghost"
            className="absolute left-0 top-1/2 -translate-y-1/2"
            onClick={() => handleNavigation('prev', setResponsibilitiesIndex, responsibilities, containerRef3)}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>
          <Button
            variant="ghost"
            className="absolute right-0 top-1/2 -translate-y-1/2"
            onClick={() => handleNavigation('next', setResponsibilitiesIndex, responsibilities, containerRef3)}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
        </div>
      </section>
    </div>
  )
}