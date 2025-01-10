'use client';
import React, {  useRef, useState } from 'react';
import upload_image from '../utils/image_upload';
import { useRouter } from 'next/navigation';
const Alert = ({ type, message, onClose }) => {
  return (
    <div
      className={`mt-3 rounded-lg p-4 shadow-lg ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
      } text-white`}
    >
      <p>{message}</p>
      <button className="mt-2 text-sm underline" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default function FormPage() {
  const [task, setTask] = useState({
    title: '',
    description: '',
    points: '',
    deadline: '',
    imageUrl: '',
  });
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  const [sending, setSending] = useState(false);
  const fileRef = useRef(null);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({
      ...task,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    const raw_image = fileRef.current.files[0];
    const image_url = await upload_image(raw_image);
    // console.log(image_url);
    const formattedDeadline = new Date(task.deadline).toISOString();
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: task.title,
        description: task.description,
        points: parseInt(task.points),
        deadline: formattedDeadline,
        image_url: image_url,
      }),
    }).then((res) => res.json());
    // console.log(res);
    e.target.reset();
    setSending(false);
    router.push('/');
  };

  const closeAlert = () => {
    setAlert({ show: false, message: '', type: '' });
  };

  return (
    <>
    {sending && <div className="absolute w-screen h-screen bg-gray-700 bg-opacity-60 flex justify-center items-center z-[50]"><span>Sending...</span></div>}
      <section className="overflow-y-hidden bg-cover bg-fixed bg-center">
        <div className="relative mx-auto flex w-[90vw] flex-col justify-between overflow-hidden rounded-2xl bg-black bg-gray-400/10 p-6 py-8 text-black backdrop-blur-md md:p-12">
          <div className="container mx-auto flex flex-wrap items-center justify-center px-4">
            <div className="mb-6 flex w-full flex-col items-center lg:mb-0">
              <form
                className="mt-4 flex w-[400px] max-w-full flex-col space-y-4"
                onSubmit={handleSubmit}
              >
                <div className='mt-20'>
                  <label htmlFor="title">Title:</label><br />
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={task.title}
                    onChange={handleChange}
                    required
                    className="bg-white text-black border border-black w-[100%]"
                  />
                </div>

                <div>
                  <label htmlFor="description">Description:</label><br />
                  <textarea
                    id="description"
                    name="description"
                    value={task.description}
                    onChange={handleChange}
                    required
                    className="bg-white text-black border border-black w-[100%]"
                  />
                </div>

                <div>
                  <label htmlFor="points">Points:</label><br />
                  <input
                    type="number"
                    id="points"
                    name="points"
                    value={task.points}
                    onChange={handleChange}
                    required
                    className="bg-white text-black border border-black w-[100%]"
                  />
                </div>

                <div>
                  <label htmlFor="deadline">Deadline:</label><br />
                  <input
                    type="datetime-local"
                    id="deadline"
                    name="deadline"
                    value={task.deadline}
                    onChange={handleChange}
                    required
                    className="bg-gray-800 text-white border border-black w-[100%]"
                  />
                </div>

                {/* <div>
                  <label htmlFor="imageUrl">Image URL:</label><br />
                  <input
                    type="url"
                    id="imageUrl"
                    name="imageUrl"
                    value={task.imageUrl}
                    onChange={handleChange}
                    required
                  />
                </div> */}
                <input
                  type="file"
                  name="add_file"
                  id="add_file"
                  ref={fileRef}
                  className="w-full rounded-lg border border-[#A52A2A] bg-gray-200 p-2.5 text-sm text-black focus:border-[#A52A2A] focus:ring-red-500"
                  placeholder=""
                  required
                />
                <button
                  type="submit"
                  className={`rounded-lg bg-red-500 p-3 font-semibold text-white hover:bg-red-600 ${
                    sending ? 'cursor-not-allowed' : ''
                  }`}
                  disabled={sending}
                >
                  Confirm
                </button>
              </form>
              {alert.show && (
                <Alert type={alert.type} message={alert.message} onClose={closeAlert} />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
