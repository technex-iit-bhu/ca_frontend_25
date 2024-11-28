'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { PulseLoader } from 'react-spinners';
import { getProfileDetails, getSubmittedTasks, getTasks } from '../utils/api';
import Dashboard, { Task, User } from '../layout/dashboard/dashboard';

export default function Page() {
  const [user, setUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [submittedTasks, setSubmittedTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/auth/signin');
        return;
      }

      try {
        // Use the API functions
        const [userResponse, tasksResponse, submittedTasksResponse] = await Promise.all([
          getProfileDetails(token),
          getTasks(token),
          getSubmittedTasks(token),
        ]);

        setUser(userResponse.data);
        setTasks(tasksResponse || []);
        setSubmittedTasks(submittedTasksResponse || []);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data');
        router.push('/auth/signin');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  if (loading)
    return (
      <>
        <div className="fixed left-0 top-0 z-10 flex min-h-full min-w-full items-center justify-center bg-black">
          <div className="text-3xl text-white">
            <div className="mb-4">Loading...</div>
            <PulseLoader color="#fff" loading={loading} size={25} />
          </div>
        </div>
      </>
    );

  if (error) return <div>{error}</div>;

  return <Dashboard user={user as User} tasks={tasks} submitted_tasks={submittedTasks} />;
}
