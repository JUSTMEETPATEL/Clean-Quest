"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TaskCard } from "@/components/task-card"
import { LeaderboardTable } from "@/components/leaderboard-table"

// Mock data for tasks
const availableTasks = [
  {
    id: "task-1",
    image: "/placeholder.svg?height=300&width=400",
    location: "123 Main St, City Center",
    latitude: 40.7128,
    longitude: -74.006,
    daysAgo: 2,
    status: "available",
  },
  {
    id: "task-2",
    image: "/placeholder.svg?height=300&width=400",
    location: "456 Park Ave, Downtown",
    latitude: 40.7228,
    longitude: -74.016,
    daysAgo: 5,
    status: "available",
  },
  {
    id: "task-3",
    image: "/placeholder.svg?height=300&width=400",
    location: "789 Broadway, Uptown",
    latitude: 40.7328,
    longitude: -74.026,
    daysAgo: 1,
    status: "available",
  },
]

const assignedTasks = [
  {
    id: "task-4",
    image: "/placeholder.svg?height=300&width=400",
    location: "321 Oak St, Westside",
    latitude: 40.7428,
    longitude: -74.036,
    daysAgo: 3,
    status: "assigned",
  },
]

const completedTasks = [
  {
    id: "task-5",
    image: "/placeholder.svg?height=300&width=400",
    location: "654 Pine St, Eastside",
    latitude: 40.7528,
    longitude: -74.046,
    daysAgo: 7,
    status: "completed",
    afterImage: "/placeholder.svg?height=300&width=400",
    score: 85,
  },
]

export default function NGODashboard() {
  const [activeTab, setActiveTab] = useState("available")

  return (
    <div className="min-h-screen bg-[#EEF5DB]/30 py-8">
      <div className="container mx-auto px-4">
        <h1 className="font-poppins mb-8 text-3xl font-bold text-[#1E293B]">NGO Dashboard</h1>

        <Tabs defaultValue="available" onValueChange={setActiveTab} value={activeTab}>
          <TabsList className="mb-8 grid w-full grid-cols-4 bg-[#EEF5DB]">
            <TabsTrigger value="available">Available Tasks</TabsTrigger>
            <TabsTrigger value="assigned">My Assigned Tasks</TabsTrigger>
            <TabsTrigger value="completed">Completed Tasks</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          </TabsList>

          <TabsContent value="available">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {availableTasks.map((task) => (
                <TaskCard key={task.id} task={task} onAccept={() => console.log(`Accepted task ${task.id}`)} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="assigned">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {assignedTasks.map((task) => (
                <TaskCard key={task.id} task={task} onUpload={() => console.log(`Upload for task ${task.id}`)} />
              ))}
              {assignedTasks.length === 0 && (
                <div className="col-span-full rounded-2xl bg-white p-8 text-center shadow-lg">
                  <p className="text-lg text-[#1E293B]/70">
                    You don't have any assigned tasks yet. Accept tasks from the Available Tasks tab.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="completed">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {completedTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
              {completedTasks.length === 0 && (
                <div className="col-span-full rounded-2xl bg-white p-8 text-center shadow-lg">
                  <p className="text-lg text-[#1E293B]/70">You haven't completed any tasks yet.</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="leaderboard">
            <div className="rounded-2xl bg-white p-6 shadow-lg">
              <LeaderboardTable />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

