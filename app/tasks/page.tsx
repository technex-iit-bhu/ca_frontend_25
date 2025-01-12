'use client';

import { useState, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, Trophy, Users, Flame, CheckCircle, XCircle } from 'lucide-react';
import Image from 'next/image';
import { getSubmittedTasks, getTasks } from '../utils/api';

interface Task {
  title: string;
  description: string;
  image_url: string;
  deadline: string;
  points: number;
}

export default function LiveTasksDashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [submittedTasks, setSubmittedTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalParticipants, setTotalParticipants] = useState(0);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed' | 'expired'>('all');

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }

      try {
        const [tasksData, submittedTasksData] = await Promise.all([
          getTasks(token),
          getSubmittedTasks(token),
        ]);

        setTasks(tasksData || []);
        setSubmittedTasks(submittedTasksData || []);

        // Fetch total participants count
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/count`);
        const data = await response.json();
        setTotalParticipants(data.count);

      } catch (error) {
        console.log('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const getTaskStatus = (task: Task): 'active' | 'completed' | 'expired' => {
    const isSubmitted = submittedTasks.some((st) => st.title === task.title);
    if (isSubmitted) return 'completed';

    const deadline = new Date(task.deadline);
    if (deadline < new Date()) return 'expired';
    return 'active';
  };

  const filteredTasks = tasks.filter((task) => {
    const status = getTaskStatus(task);
    return filter === 'all' || status === filter;
  });

  const activeTasksCount = tasks.filter((task) => getTaskStatus(task) === 'active').length;
  const completedTasksCount = submittedTasks.length;
  const expiredTasksCount = tasks.filter((task) => getTaskStatus(task) === 'expired').length;

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

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-xl text-white">Loading tasks...</div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-[#2c1810] via-[#5c3a2c] to-[#8B4513] bg-cover bg-center pt-16"
      style={{ backgroundImage: "url('/image.png')" }}
    >
      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
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

        {/* Tasks Section */}
        <div className="space-y-6">
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

          <ScrollArea className="h-[calc(100vh-380px)]">
            {' '}
            {/* Reduced from -250px to -380px */}
            <div className="grid grid-cols-1 gap-6 pr-4 lg:grid-cols-2">
              {filteredTasks.map((task, index) => {
                const status = getTaskStatus(task);
                const {
                  icon: StatusIcon,
                  color: statusColor,
                  label: statusLabel,
                } = getStatusDetails(status);

                return (
                  <Card
                    key={index}
                    className={`group overflow-hidden border-none bg-[#2c1810]/90 backdrop-blur transition-all duration-300 hover:shadow-xl ${status !== 'active' ? 'opacity-95 saturate-50' : ''}`}
                  >
                    <div className="relative h-[200px] w-full overflow-hidden">
                      <Image
                        src={'/homebg.png'}
                        alt={task.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2c1810] to-transparent" />
                    </div>

                    <CardContent className="space-y-4 p-6">
                      <div>
                        <h3 className="mb-2 text-2xl font-bold text-white">{task.title}</h3>
                        <p className="text-gray-300">{task.description}</p>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 text-[#FFB700]">
                            <Trophy className="h-4 w-4" />
                            <span>{task.points} pts</span>
                          </div>
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

                        {status === 'active' && (
                          <button className="w-full rounded-md bg-[#8B4513] px-4 py-2 text-black transition-colors hover:bg-[#47261c]">
                            Submit Task
                          </button>
                        )}
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
  );
}
