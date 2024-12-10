import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode; // Accept children prop instead of content
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-2xl rounded-lg bg-zinc-900 p-6 text-white">
        <div className="mt-4">
          {children} {/* Render children here */}
        </div>
      </div>
    </div>
  );
};

export default Modal;
