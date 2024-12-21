import React from 'react';

const GridBackground = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative bg-black/50">
      {/*Cool Grid Background*/}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(220,38,38,0.1)_1px,transparent_1px),linear-gradient(0deg,rgba(220,38,38,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default GridBackground;