import React, { useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (driveLink: string) => Promise<void>;
}

const SubmitTaskModal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [driveLink, setDriveLink] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!driveLink.trim()) {
      setError('Drive link is required.');
      return;
    }

    setError('');
    try {
      await onSubmit(driveLink);
      setDriveLink('');
      onClose();
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message || 'Failed to submit task.');
      } else {
        setError('Failed to submit task.');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-[90%] max-w-md rounded-md bg-white p-6">
        <h2 className="text-lg font-bold mb-4">Submit Task</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Drive Link:
          </label>
          <input
            type="url"
            value={driveLink}
            onChange={(e) => setDriveLink(e.target.value)}
            placeholder="Enter Drive link"
            className="w-full rounded-md border border-gray-300 p-2 text-white"
          />
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <div className="flex justify-end space-x-2">
          <button
            className="rounded-md bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmitTaskModal;
