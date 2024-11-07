import React from 'react';
import LiveEventCard from './liveEvents';

interface Event {
  imageUrl: string;
  month: string;
  title: string;
  points: number;
  expires: string;
  task: string;
  content: string;
}

interface SectionHandlerProps {
  selectedTab: string;
  Events?: Event[];
}

const SectionHandler: React.FC<SectionHandlerProps> = ({ selectedTab, Events }) => {
  if (selectedTab === 'live') {
    return (
      <div className="mt-[3rem] flex flex-col items-center justify-center gap-y-10">
        {Events ? (
          Events.map((event, index) => (
            <LiveEventCard
              key={index}
              imageUrl={event.imageUrl}
              month={event.month}
              title={event.title}
              points={event.points}
              expires={event.expires}
              task={event.task}
              content={event.content}
            />
          ))
        ) : (
          <div className="flex h-[400px] items-center justify-center">
            <h1 className="text-4xl text-white">Coming Soon !</h1>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex h-[400px] items-center justify-center">
      <h1 className="text-4xl text-white">No tasks available in this section</h1>
    </div>
  );
};

export default SectionHandler;
