'use client';

import React, { useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (driveLink: string) => Promise<void>;
}

const SubmitTaskModal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [drive_link, setDriveLink] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!drive_link.trim()) {
      setError('Drive link is required.');
      return;
    }
    setError('');
    setSubmitting(true);

    try {
      await onSubmit(drive_link);
      setSubmitted(true);
    } catch (e: any) {
      setError(e.message || 'Failed to submit task.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* The modal box */}
      <div className="w-[90%] max-w-md rounded-md bg-white p-6 shadow-lg">
        {!submitted ? (
          <>
            <h2 className="mb-4 text-lg font-bold">Submit Task</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Drive Link:
              </label>
              <input
                type="url"
                value={drive_link}
                onChange={(e) => setDriveLink(e.target.value)}
                placeholder="Enter your Drive link"
                className="w-full rounded-md border border-gray-300 p-2 text-white"
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <div className="flex justify-end space-x-2">
              <button
                className="rounded-md bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300"
                onClick={onClose}
                disabled={submitting}
              >
                Cancel
              </button>
              <button
                className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                onClick={handleSubmit}
                disabled={submitting}
              >
                {submitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="mb-4 text-lg font-bold text-green-600">Task Submitted!</h2>
            <p className="mb-4">Your drive link has been recorded successfully.</p>
            <div className="flex justify-end">
              <button
                className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                onClick={() => {
                  setSubmitted(false);
                  setDriveLink('');
                  setError('');
                  onClose();
                }}
              >
                Close
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SubmitTaskModal;
