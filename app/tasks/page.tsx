'use client'

import { useState } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Trophy, Users, Flame, CheckCircle, XCircle } from 'lucide-react'
import Image from "next/image"

interface Task {
  id: string
  title: string
  description: string
  imageUrl: string
  deadline: string
  points: number
  participants: number
  progress: number
  difficulty: 'Easy' | 'Medium' | 'Hard'
  category: string
  status: 'active' | 'completed' | 'expired'
}

const tasks: Task[] = [
  {
    id: "1",
    title: "Diamond Mining Expedition",
    description: "Embark on a strategic mining operation to collect rare diamonds. Use advanced techniques and collaborate with other miners.",
    imageUrl: "/placeholder.svg?height=200&width=400",
    deadline: "2h 30m",
    points: 500,
    participants: 24,
    progress: 65,
    difficulty: 'Medium',
    category: 'Resource Gathering',
    status: 'active'
  },
  {
    id: "2",
    title: "Modern Castle Architecture",
    description: "Design and construct a contemporary castle that blends medieval aesthetics with modern architectural principles.",
    imageUrl: "/placeholder.svg?height=200&width=400",
    deadline: "5h 45m",
    points: 750,
    participants: 31,
    progress: 42,
    difficulty: 'Hard',
    category: 'Architecture',
    status: 'active'
  },
  {
    id: "3",
    title: "Advanced Defense Systems",
    description: "Implement sophisticated redstone mechanisms to create an automated defense system against hostile mobs.",
    imageUrl: "/placeholder.svg?height=200&width=400",
    deadline: "1h 15m",
    points: 1000,
    participants: 18,
    progress: 89,
    difficulty: 'Hard',
    category: 'Engineering',
    status: 'active'
  },
  {
    id: "4",
    title: "Nether Portal Enhancement",
    description: "Upgrade the Nether Portal with advanced obsidian patterns to increase travel efficiency.",
    imageUrl: "/placeholder.svg?height=200&width=400",
    deadline: "Completed",
    points: 600,
    participants: 42,
    progress: 100,
    difficulty: 'Medium',
    category: 'Interdimensional Travel',
    status: 'completed'
  },
  {
    id: "5",
    title: "Underwater City Construction",
    description: "Build a thriving underwater metropolis using advanced water-removal techniques and sustainable materials.",
    imageUrl: "/placeholder.svg?height=200&width=400",
    deadline: "Expired",
    points: 1200,
    participants: 15,
    progress: 78,
    difficulty: 'Hard',
    category: 'Megastructures',
    status: 'expired'
  }
]

const getDifficultyColor = (difficulty: Task['difficulty']) => {
  switch (difficulty) {
    case 'Easy':
      return 'bg-emerald-500'
    case 'Medium':
      return 'bg-amber-500'
    case 'Hard':
      return 'bg-red-500'
    default:
      return 'bg-slate-500'
  }
}

const getStatusDetails = (status: Task['status']) => {
  switch (status) {
    case 'completed':
      return { icon: CheckCircle, color: 'text-green-400', label: 'Completed' }
    case 'expired':
      return { icon: XCircle, color: 'text-red-400', label: 'Expired' }
    default:
      return { icon: Clock, color: 'text-blue-400', label: 'Active' }
  }
}

export default function LiveTasksDashboard() {
  const [filter, setFilter] = useState<'all' | 'active' | 'completed' | 'expired'>('all')
  
  const filteredTasks = tasks.filter(task => 
    filter === 'all' || task.status === filter
  )

  const activeTasksCount = tasks.filter(task => task.status === 'active').length
  const completedTasksCount = tasks.filter(task => task.status === 'completed').length
  const expiredTasksCount = tasks.filter(task => task.status === 'expired').length

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2c1810] via-[#5c3a2c] to-[#8B4513] pt-16 bg-cover bg-center" style={{ backgroundImage: "url('/image.png')" }}>
      
      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-[#970000]/60 to-[#970000] border-none backdrop-blur">
            <CardContent className="flex items-center justify-between p-6">
              <div className="space-y-1">
                <p className="text-black text-sm">Active Tasks</p>
                <p className="text-2xl font-bold text-black">{activeTasksCount}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-[#47261c] flex items-center justify-center">
                <Flame className="h-6 w-6 text-orange-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-[#970000]/60 to-[#970000] border-none backdrop-blur">
            <CardContent className="flex items-center justify-between p-6">
              <div className="space-y-1">
                <p className="text-black text-sm">Completed Tasks</p>
                <p className="text-2xl font-bold text-black">{completedTasksCount}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-[#47261c] flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-[#970000]/60 to-[#970000] border-none backdrop-blur">
            <CardContent className="flex items-center justify-between p-6">
              <div className="space-y-1">
                <p className="text-black text-sm">Expired Tasks</p>
                <p className="text-2xl font-bold text-black">{expiredTasksCount}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-[#47261c] flex items-center justify-center">
                <XCircle className="h-6 w-6 text-red-400" />
              </div>
            </CardContent>
          </Card>
            <Card className="bg-gradient-to-r from-[#970000]/60 to-[#970000] border-none backdrop-blur">
            <CardContent className="flex items-center justify-between p-6">
              <div className="space-y-1">
              <p className="text-black text-sm">Total Participants</p>
              <p className="text-2xl font-bold text-black">{tasks.reduce((sum, task) => sum + task.participants, 0)}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-[#47261c] flex items-center justify-center">
              <Users className="h-6 w-6 text-blue-400" />
              </div>
            </CardContent>
            </Card>
        </div>

        {/* Tasks Section */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h1 className="text-3xl font-bold text-black">
              Task Dashboard
            </h1>
            <Tabs value={filter} onValueChange={(value) => setFilter(value as any)} className="w-full sm:w-auto">
              <TabsList className="bg-[#2c1810] border-[#8B4513]">
                <TabsTrigger value="all" className="data-[state=active]:bg-[#8B4513]">All</TabsTrigger>
                <TabsTrigger value="active" className="data-[state=active]:bg-[#8B4513]">Active</TabsTrigger>
                <TabsTrigger value="completed" className="data-[state=active]:bg-[#8B4513]">Completed</TabsTrigger>
                <TabsTrigger value="expired" className="data-[state=active]:bg-[#8B4513]">Expired</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <ScrollArea className="h-[calc(100vh-380px)]"> {/* Reduced from -250px to -380px */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pr-4">
              {filteredTasks.map((task) => {
                const { icon: StatusIcon, color: statusColor, label: statusLabel } = getStatusDetails(task.status)
                return (
                  <Card 
                    key={task.id} 
                    className={`bg-[#2c1810]/90 border-none backdrop-blur overflow-hidden hover:shadow-xl transition-all duration-300 group
                      ${task.status !== 'active' ? 'opacity-95 saturate-50' : ''}`}
                  >
                    <div className="relative h-[200px] w-full overflow-hidden">
                      <Image
                        src="/homebg.png"
                        alt={task.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2c1810] to-transparent" />
                      <Badge 
                        className={`absolute top-4 right-4 ${getDifficultyColor(task.difficulty)} border-none`}
                      >
                        {task.difficulty}
                      </Badge>
                    </div>
                    
                    <CardContent className="p-6 space-y-4">
                      <div>
                        <p className="text-sm text-black mb-2">{task.category}</p>
                        <h3 className="text-2xl font-bold text-black mb-2">{task.title}</h3>
                        <p className="text-gray-300">{task.description}</p>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-2 text-gray-300">
                            <Users className="h-4 w-4" />
                            <span>{task.participants} participants</span>
                          </div>
                          <div className="flex items-center space-x-2 text-[#FFB700]">
                            <Trophy className="h-4 w-4" />
                            <span>{task.points} pts</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm text-gray-300">
                            <span>Progress</span>
                            <span>{task.progress}%</span>
                          </div>
                          <Progress value={task.progress} className="h-2" />
                        </div>

                        <div className="flex justify-between items-center">
                          <Badge variant="outline" className={`bg-[#47261c] ${statusColor} border-${statusColor}/20`}>
                            <StatusIcon className="w-4 h-4 mr-1" />
                            {task.status === 'active' ? `${task.deadline} remaining` : statusLabel}
                          </Badge>
                          {task.status === 'active' && (
                            <button className="px-4 py-2 bg-[#8B4513] text-black rounded-md hover:bg-[#47261c] transition-colors">
                              Join Task
                            </button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}

