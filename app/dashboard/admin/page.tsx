"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Flag, BarChart3, Users, Trash2, AlertTriangle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Mock data for NGO applications
const ngoApplications = [
  {
    id: "app-1",
    name: "Green Earth Initiative",
    logo: "/placeholder.svg?height=100&width=100",
    email: "contact@greenearth.org",
    description: "Dedicated to environmental cleanup and education in urban areas.",
    dateApplied: "2025-04-01",
    status: "pending",
  },
  {
    id: "app-2",
    name: "Ocean Cleanup Collective",
    logo: "/placeholder.svg?height=100&width=100",
    email: "info@oceancleanup.org",
    description: "Focused on cleaning beaches and coastal areas from plastic waste.",
    dateApplied: "2025-04-03",
    status: "pending",
  },
]

// Mock data for flagged tasks
const flaggedTasks = [
  {
    id: "flag-1",
    image: "/placeholder.svg?height=300&width=400",
    location: "123 Main St, City Center",
    reportedBy: "EcoClean Foundation",
    reason: "Inappropriate content",
    date: "2025-04-05",
  },
  {
    id: "flag-2",
    image: "/placeholder.svg?height=300&width=400",
    location: "456 Park Ave, Downtown",
    reportedBy: "Green Earth Initiative",
    reason: "Duplicate report",
    date: "2025-04-06",
  },
]

// Mock data for analytics
const analyticsData = {
  totalTasks: 342,
  completedTasks: 287,
  completionRate: 84,
  averageScore: 78,
  activeNGOs: 24,
  totalUsers: 1250,
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("applications")

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="mr-4 flex items-center">
              <div className="relative h-8 w-8">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8">
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
              <span className="font-poppins ml-2 text-xl font-bold text-foreground">CleanQuest</span>
            </Link>
            <h1 className="font-poppins text-2xl font-bold text-foreground md:text-3xl">Admin Dashboard</h1>
          </div>
        </div>

        <Tabs defaultValue="applications" onValueChange={setActiveTab} value={activeTab}>
          <TabsList className="mb-8 grid w-full grid-cols-3">
            <TabsTrigger value="applications">NGO Applications</TabsTrigger>
            <TabsTrigger value="flagged">Flagged Tasks</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="applications">
            <div className="space-y-6">
              {ngoApplications.map((application) => (
                <Card key={application.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-6 md:flex-row md:items-center">
                      <div className="relative h-16 w-16 overflow-hidden rounded-lg">
                        <Image
                          src={application.logo || "/placeholder.svg"}
                          alt={application.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1">
                        <h3 className="font-poppins text-lg font-semibold text-card-foreground">{application.name}</h3>
                        <p className="text-sm text-muted-foreground">{application.email}</p>
                        <p className="mt-2 text-sm text-card-foreground">{application.description}</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Applied on: {new Date(application.dateApplied).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-destructive text-destructive hover:bg-destructive/10"
                        >
                          <XCircle className="mr-1 h-4 w-4" /> Reject
                        </Button>
                        <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                          <CheckCircle className="mr-1 h-4 w-4" /> Approve
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {ngoApplications.length === 0 && (
                <div className="rounded-2xl bg-card p-8 text-center shadow-lg">
                  <p className="text-lg text-muted-foreground">No pending NGO applications.</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="flagged">
            <div className="space-y-6">
              {flaggedTasks.map((task) => (
                <Card key={task.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-6 md:flex-row md:items-center">
                      <div className="relative h-24 w-32 overflow-hidden rounded-lg">
                        <Image
                          src={task.image || "/placeholder.svg"}
                          alt={`Flagged task at ${task.location}`}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute right-1 top-1 rounded-full bg-destructive p-1">
                          <Flag className="h-4 w-4 text-white" />
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center">
                          <AlertTriangle className="mr-2 h-4 w-4 text-destructive" />
                          <h3 className="font-poppins text-lg font-semibold text-card-foreground">Flagged Content</h3>
                        </div>
                        <p className="text-sm text-card-foreground">
                          <span className="font-medium">Location:</span> {task.location}
                        </p>
                        <p className="text-sm text-card-foreground">
                          <span className="font-medium">Reason:</span> {task.reason}
                        </p>
                        <p className="text-sm text-card-foreground">
                          <span className="font-medium">Reported by:</span> {task.reportedBy}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Reported on: {new Date(task.date).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-destructive text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="mr-1 h-4 w-4" /> Delete
                        </Button>
                        <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                          <CheckCircle className="mr-1 h-4 w-4" /> Approve
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {flaggedTasks.length === 0 && (
                <div className="rounded-2xl bg-card p-8 text-center shadow-lg">
                  <p className="text-lg text-muted-foreground">No flagged tasks.</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Total Tasks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <BarChart3 className="mr-2 h-5 w-5 text-primary" />
                    <span className="text-3xl font-bold">{analyticsData.totalTasks}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{analyticsData.completedTasks} completed</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Completion Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                    <span className="text-3xl font-bold">{analyticsData.completionRate}%</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">Average score: {analyticsData.averageScore}%</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Active NGOs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Users className="mr-2 h-5 w-5 text-primary" />
                    <span className="text-3xl font-bold">{analyticsData.activeNGOs}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{analyticsData.totalUsers} total users</p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 rounded-2xl bg-card p-6 shadow-lg">
              <h3 className="font-poppins mb-4 text-lg font-semibold text-card-foreground">Monthly Activity</h3>
              <div className="h-64 rounded-lg bg-muted p-4">
                <div className="flex h-full items-center justify-center">
                  <p className="text-muted-foreground">Analytics chart will be displayed here</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

