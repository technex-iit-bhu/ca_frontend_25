'use client'

import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Clock, Trophy, Users, Flame } from 'lucide-react'
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
    category: 'Resource Gathering'
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
    category: 'Architecture'
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
    category: 'Engineering'
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

export default function LiveTasks() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2c1810] via-[#5c3a2c] to-[#8B4513]">
      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-[#2c1810]/80 border-none backdrop-blur">
            <CardContent className="flex items-center justify-between p-6">
              <div className="space-y-1">
                <p className="text-gray-400 text-sm">Active Tasks</p>
                <p className="text-2xl font-bold text-white">12</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-[#47261c] flex items-center justify-center">
                <Flame className="h-6 w-6 text-orange-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[#2c1810]/80 border-none backdrop-blur">
            <CardContent className="flex items-center justify-between p-6">
              <div className="space-y-1">
                <p className="text-gray-400 text-sm">Total Participants</p>
                <p className="text-2xl font-bold text-white">73</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-[#47261c] flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[#2c1810]/80 border-none backdrop-blur">
            <CardContent className="flex items-center justify-between p-6">
              <div className="space-y-1">
                <p className="text-gray-400 text-sm">Points Available</p>
                <p className="text-2xl font-bold text-white">2,250</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-[#47261c] flex items-center justify-center">
                <Trophy className="h-6 w-6 text-[#FFB700]" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tasks Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-white">
              Live Tasks
            </h1>
            <Badge variant="outline" className="bg-[#2c1810] text-white border-none px-4 py-2">
              {tasks.length} Active Tasks
            </Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {tasks.map((task) => (
              <Card key={task.id} className="bg-[#2c1810]/90 border-none backdrop-blur overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="relative h-[200px] w-full overflow-hidden">
                  <Image
                    src={task.imageUrl}
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
                    <p className="text-sm text-gray-400 mb-2">{task.category}</p>
                    <h3 className="text-2xl font-bold text-white mb-2">{task.title}</h3>
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
                      <Badge variant="outline" className="bg-[#47261c] text-red-400 border-red-400/20">
                        <Clock className="w-4 h-4 mr-1" />
                        {task.deadline} remaining
                      </Badge>
                      <button className="px-4 py-2 bg-[#8B4513] text-white rounded-md hover:bg-[#47261c] transition-colors">
                        Join Task
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

