'use client';

import { useState, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, Trophy, Users, Flame, CheckCircle, XCircle } from 'lucide-react';
import Image from 'next/image';
import SubmitTaskModal from './SubmitTaskModal';
import { getSubmittedTasks, getTasks, submitTask } from '../utils/api';
import { Schema, Types } from 'mongoose';

interface Task {
  id: Schema.Types.ObjectId;
  title: string;
  description: string;
  points: number;
  deadline: string;
  image_url: string;
  status: string; // 'active', 'completed', etc.
}

interface TaskSubmission {
  _id: string;         // submission document ID
  task: string;        // The *task*'s objectId (as a string)
  user: string;
  username: string;
  timestamp: string;
  drive_link: string;
  image_url: string;
  verified: boolean;
  admin_comment: string;
}

export default function LiveTasksDashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [submittedTasks, setSubmittedTasks] = useState<TaskSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalParticipants, setTotalParticipants] = useState(0);

  // Could be 'all' | 'active' | 'completed' | 'expired'
  const [filter, setFilter] = useState<'all' | 'active' | 'completed' | 'expired'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<Schema.Types.ObjectId | null>(null);

  // Load tasks & submissions on mount
  useEffect(() => {
    fetchTasks();
  }, []);

  // 1. Fetch tasks from /tasks
  // 2. Fetch user submissions from /submissions/get_user_submissions
  const fetchTasks = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      // getTasks() => calls GET /tasks
      // getSubmittedTasks() => calls GET /submissions/get_user_submissions
      const [tasksData, submittedTasksData] = await Promise.all([
        getTasks(token),
        getSubmittedTasks(token),
      ]);

      // Convert tasks to an array of { id: ObjectId, ... }
      const tasksWithStatus = tasksData?.map((task: any) => ({
        ...task,
        id: new Types.ObjectId(task.id),
        status: 'active',
      })) || [];

      // Convert submissions to an array of { id: ObjectId, ... }
      const submissionsWithStatus = submittedTasksData?.map((sub: any) => ({
        ...sub,
        // "task" in the submission references the Task's ObjectId as a string
        // "id" below is the submission doc's ID
        id: new Types.ObjectId(sub.id),
        status: 'completed',
      })) || [];

      setTasks(tasksWithStatus as Task[]);
      setSubmittedTasks(submissionsWithStatus as TaskSubmission[]);

      // Optionally fetch total participants
      const resp = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/count`);
      const data = await resp.json();
      setTotalParticipants(data.count);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Called by the modal to actually submit to the backend
  const handleSubmitTask = async (driveLink: string) => {
    if (!selectedTaskId) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Authentication required.');

      // Make the request to /submissions/submit
      await submitTask(selectedTaskId.toString(), driveLink);

      // Refresh tasks => to update the "submitted" button state
      fetchTasks();
    } catch (error: any) {
      // We re-throw so the modal can display the error
      throw error;
    }
  };

  // Open/close the modal
  const handleOpenModal = (taskId: Schema.Types.ObjectId) => {
    setSelectedTaskId(taskId);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setSelectedTaskId(null);
    setIsModalOpen(false);
  };

  // Determine if a task is active, completed, or expired
  const getTaskStatus = (task: Task): 'active' | 'completed' | 'expired' => {
    // If we explicitly set task.status to "completed", we can treat it that way
    // Or we can check user submissions. But let's stick with your approach:
    if (task.status === 'completed') return 'completed';

    const deadline = new Date(task.deadline);
    if (deadline < new Date()) return 'expired';
    return 'active';
  };

  // Filter tasks based on the selected tab
  const filteredTasks = tasks.filter((task) => {
    const status = getTaskStatus(task);
    return filter === 'all' || status === filter;
  });

  // Stats: (active tasks, completed tasks, expired tasks)
  const activeTasksCount = tasks.filter((task) => getTaskStatus(task) === 'active').length;
  const completedTasksCount = submittedTasks.length;
  const expiredTasksCount = tasks.filter((task) => getTaskStatus(task) === 'expired').length;

  // Display properties for each status
  const getStatusDetails = (status: 'active' | 'completed' | 'expired') => {
    switch (status) {
      case 'completed':
        return { icon: CheckCircle, color: 'text-green-400', label: 'Completed' };
      case 'expired':
        return { icon: XCircle, color: 'text-red-400', label: 'Expired' };
      default:
        return { icon: Clock, color: 'text-blue-400', label: 'Active' };
    }
  };

  // While loading, show a placeholder
  if (loading) {
    return (
      <div
        className="min-h-screen bg-gradient-to-br from-[#2c1810] via-[#5c3a2c] to-[#8B4513] bg-cover bg-center pt-16"
        style={{ backgroundImage: "url('/image.png')" }}
      >
        <div className="flex h-full items-center justify-center pt-20">
          <div className="text-3xl font-bold text-black">Loading tasks...</div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* The modal for submitting tasks */}
      <SubmitTaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitTask}
      />

      <div
        className="min-h-screen bg-gradient-to-br from-[#2c1810] via-[#5c3a2c] to-[#8B4513] bg-cover bg-center pt-16"
        style={{ backgroundImage: "url('/image.png')" }}
      >
        <div className="container mx-auto px-4 py-8">
          {/* ---------- Stats Overview ---------- */}
          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
            {/* Active Tasks */}
            <Card className="border-none bg-gradient-to-r from-[#970000]/60 to-[#970000] backdrop-blur">
              <CardContent className="flex items-center justify-between p-6">
                <div className="space-y-1">
                  <p className="text-sm text-black">Active Tasks</p>
                  <p className="text-2xl font-bold text-black">{activeTasksCount}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#47261c]">
                  <Flame className="h-6 w-6 text-orange-400" />
                </div>
              </CardContent>
            </Card>

            {/* Completed Tasks */}
            <Card className="border-none bg-gradient-to-r from-[#970000]/60 to-[#970000] backdrop-blur">
              <CardContent className="flex items-center justify-between p-6">
                <div className="space-y-1">
                  <p className="text-sm text-black">Completed Tasks</p>
                  <p className="text-2xl font-bold text-black">{completedTasksCount}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#47261c]">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                </div>
              </CardContent>
            </Card>

            {/* Expired Tasks */}
            <Card className="border-none bg-gradient-to-r from-[#970000]/60 to-[#970000] backdrop-blur">
              <CardContent className="flex items-center justify-between p-6">
                <div className="space-y-1">
                  <p className="text-sm text-black">Expired Tasks</p>
                  <p className="text-2xl font-bold text-black">{expiredTasksCount}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#47261c]">
                  <XCircle className="h-6 w-6 text-red-400" />
                </div>
              </CardContent>
            </Card>

            {/* Total Participants */}
            <Card className="border-none bg-gradient-to-r from-[#970000]/60 to-[#970000] backdrop-blur">
              <CardContent className="flex items-center justify-between p-6">
                <div className="space-y-1">
                  <p className="text-sm text-black">Total Participants</p>
                  <p className="text-2xl font-bold text-black">{totalParticipants}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#47261c]">
                  <Users className="h-6 w-6 text-blue-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ---------- Tasks Section ---------- */}
          <div className="space-y-6">
            {/* Tab Filter */}
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <h1 className="text-3xl font-bold text-black">Task Dashboard</h1>
              <Tabs
                value={filter}
                onValueChange={(value) =>
                  setFilter(value as 'all' | 'active' | 'completed' | 'expired')
                }
                className="w-full sm:w-auto"
              >
                <TabsList className="border-[#8B4513] bg-[#2c1810]">
                  <TabsTrigger value="all" className="data-[state=active]:bg-[#8B4513]">
                    All
                  </TabsTrigger>
                  <TabsTrigger value="active" className="data-[state=active]:bg-[#8B4513]">
                    Active
                  </TabsTrigger>
                  <TabsTrigger value="completed" className="data-[state=active]:bg-[#8B4513]">
                    Completed
                  </TabsTrigger>
                  <TabsTrigger value="expired" className="data-[state=active]:bg-[#8B4513]">
                    Expired
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Task Cards */}
            <ScrollArea className="h-[calc(100vh-380px)]">
              <div className="grid grid-cols-1 gap-6 pr-4 lg:grid-cols-2">
                {filteredTasks.map((task, index) => {
                  const status = getTaskStatus(task);
                  const { icon: StatusIcon, color: statusColor, label: statusLabel } =
                    getStatusDetails(status);

                  // Check if user has already submitted THIS task
                  const hasSubmitted = submittedTasks.some(
                    (submission) => submission.task === task.id.toString()
                  );

                  return (
                    <Card
                      key={index}
                      className={`group overflow-hidden border-none bg-[#2c1810]/90 backdrop-blur transition-all duration-300 hover:shadow-xl ${
                        status !== 'active' ? 'opacity-95 saturate-50' : ''
                      }`}
                    >
                      {/* Image */}
                      <div className="relative h-[200px] w-full overflow-hidden">
                        <Image
                          src={task.image_url}
                          alt={task.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#2c1810] to-transparent" />
                      </div>

                      {/* CardContent */}
                      <CardContent className="space-y-4 p-6">
                        <div>
                          <h3 className="mb-2 text-2xl font-bold text-white">{task.title}</h3>
                          <p className="text-gray-300">{task.description}</p>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            {/* Points */}
                            <div className="flex items-center space-x-2 text-[#FFB700]">
                              <Trophy className="h-4 w-4" />
                              <span>{task.points} pts</span>
                            </div>
                            {/* Status Badge */}
                            <Badge
                              variant="outline"
                              className={`bg-[#47261c] ${statusColor} border-${statusColor}/20`}
                            >
                              <StatusIcon className="mr-1 h-4 w-4" />
                              {status === 'active'
                                ? new Date(task.deadline).toLocaleString()
                                : statusLabel}
                            </Badge>
                          </div>

                          {/* Submit Button or Disabled */}
                          {status === 'active' &&
                            (hasSubmitted ? (
                              <button
                                disabled
                                className="w-full rounded-md bg-gray-400 px-4 py-2 text-black"
                              >
                                Submitted
                              </button>
                            ) : (
                              <button
                                className="w-full rounded-md bg-[#8B4513] px-4 py-2 text-black transition-colors hover:bg-[#47261c]"
                                onClick={() => handleOpenModal(task.id)}
                              >
                                Submit Task
                              </button>
                            ))}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </>
  );
}
