"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { TaskCard } from "@/components/task-card";
import { LeaderboardTable } from "@/components/leaderboard-table";

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
];

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
];

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
];

export default function NGODashboard() {
  const [activeTab, setActiveTab] = useState("available");

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="mr-4 flex items-center">
              <div className="relative h-8 w-8">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                >
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    className="stroke-primary"
                    strokeWidth="2"
                  />
                  <path
                    d="M7.5 12.5L10.5 15.5L16.5 9.5"
                    className="stroke-primary"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="font-poppins ml-2 text-xl font-bold text-foreground">
                CleanQuest
              </span>
            </Link>
            <h1 className="font-poppins text-2xl font-bold text-foreground md:text-3xl">
              NGO Dashboard
            </h1>
          </div>
        </div>

        <Tabs
          defaultValue="available"
          onValueChange={setActiveTab}
          value={activeTab}
        >
          <TabsList className="mb-8 grid w-full grid-cols-4">
            <TabsTrigger value="available">Available Tasks</TabsTrigger>
            <TabsTrigger value="assigned">My Assigned Tasks</TabsTrigger>
            <TabsTrigger value="completed">Completed Tasks</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          </TabsList>

          <TabsContent value="available">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {availableTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={{
                    ...task,
                    status: task.status as
                      | "available"
                      | "assigned"
                      | "completed",
                  }}
                  onAccept={() => console.log(`Accepted task ${task.id}`)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="assigned">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {assignedTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={{
                    ...task,
                    status: task.status as "available" | "assigned" | "completed"
                  }}
                  onUpload={() => console.log(`Upload for task ${task.id}`)}
                />
              ))}
              {assignedTasks.length === 0 && (
                <div className="col-span-full rounded-2xl bg-card p-8 text-center shadow-lg">
                  <p className="text-lg text-muted-foreground">
                    You don't have any assigned tasks yet. Accept tasks from the
                    Available Tasks tab.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="completed">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {completedTasks.map((task) => (
                <TaskCard key={task.id} task={{
                    ...task,
                    status: task.status as "available" | "assigned" | "completed"
                }} />
              ))}
              {completedTasks.length === 0 && (
                <div className="col-span-full rounded-2xl bg-card p-8 text-center shadow-lg">
                  <p className="text-lg text-muted-foreground">
                    You haven't completed any tasks yet.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="leaderboard">
            <div className="rounded-2xl bg-card p-6 shadow-lg">
              <LeaderboardTable />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
