// src/app/dashboard/page.tsx
'use client'

import DashboardLayout from '@/components/layout/dashboard-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  FileText,
  BriefcaseIcon,
  Users,
  UserCheck,
  ArrowUpRight,
  Clock
} from 'lucide-react'

const mockStats = {
  totalApplications: 2543,
  applicationsChange: 180,
  openPositions: 23,
  positionsAcrossDepts: 8,
  shortlisted: 342,
  pendingInterviews: 48,
  talentPool: 1274,
  talentPoolChange: 312
}

const mockRecentApplications = [
  {
    id: '1',
    name: 'John Kintu',
    position: 'Senior Accountant',
    department: 'Finance',
    status: 'under_review',
    appliedAt: '2 hours ago'
  },
  {
    id: '2',
    name: 'Mariam Akello',
    position: 'IT Manager',
    department: 'Technology',
    status: 'shortlisted',
    appliedAt: '5 hours ago'
  },
  {
    id: '3',
    name: 'Robert Mugisha',
    position: 'HR Specialist',
    department: 'Human Resources',
    status: 'interview_scheduled',
    appliedAt: '1 day ago'
  },
  {
    id: '4',
    name: 'Sarah Namuli',
    position: 'Marketing Officer',
    department: 'Marketing',
    status: 'submitted',
    appliedAt: '2 days ago'
  }
]

const mockTrainingPrograms = [
  {
    id: '1',
    title: 'Professional Certifications',
    description: 'Access certification programmes for staff development',
    participants: 156,
    icon: '🎓'
  },
  {
    id: '2',
    title: 'Internal Training',
    description: 'Schedule and manage internal training sessions',
    participants: 89,
    icon: '📚'
  },
  {
    id: '3',
    title: 'Mentorship Programme',
    description: 'Connect experienced staff with new employees',
    participants: 67,
    icon: '🤝'
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'submitted': return 'bg-gray-100 text-gray-800'
    case 'under_review': return 'bg-yellow-100 text-yellow-800'
    case 'shortlisted': return 'bg-blue-100 text-blue-800'
    case 'interview_scheduled': return 'bg-green-100 text-green-800'
    case 'rejected': return 'bg-red-100 text-red-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const formatStatus = (status: string) => {
  return status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())
}

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-geist font-bold text-gray-900">
            Recruitment Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage job applications and talent pool in one place.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="nssf-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Applications
              </CardTitle>
              <FileText className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {mockStats.totalApplications.toLocaleString()}
              </div>
              <div className="flex items-center text-xs text-green-600 mt-1">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +{mockStats.applicationsChange} from last month
              </div>
            </CardContent>
          </Card>

          <Card className="nssf-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Open Positions
              </CardTitle>
              <BriefcaseIcon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {mockStats.openPositions}
              </div>
              <div className="text-xs text-gray-600 mt-1">
                Across {mockStats.positionsAcrossDepts} departments
              </div>
            </CardContent>
          </Card>

          <Card className="nssf-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Shortlisted
              </CardTitle>
              <UserCheck className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {mockStats.shortlisted}
              </div>
              <div className="text-xs text-gray-600 mt-1">
                {mockStats.pendingInterviews} pending interviews
              </div>
            </CardContent>
          </Card>

          <Card className="nssf-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Talent Pool
              </CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {mockStats.talentPool.toLocaleString()}
              </div>
              <div className="flex items-center text-xs text-green-600 mt-1">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +{mockStats.talentPoolChange} this quarter
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="nssf-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Applications</CardTitle>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockRecentApplications.map((app) => (
                  <div key={app.id} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-gray-900">{app.name}</h4>
                        <Badge variant="secondary" className={`text-xs ${getStatusColor(app.status)}`}>
                          {formatStatus(app.status)}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{app.position}</p>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <span className="mr-3">{app.department}</span>
                        <Clock className="h-3 w-3 mr-1" />
                        {app.appliedAt}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="nssf-card">
            <CardHeader>
              <CardTitle>Training & Upskilling Programmes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockTrainingPrograms.map((program) => (
                  <div key={program.id} className="p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{program.icon}</span>
                        <div>
                          <h4 className="font-medium text-gray-900">{program.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{program.description}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-sm text-gray-500">
                        {program.participants} participants
                      </span>
                      <Button variant="outline" size="sm">
                        {program.title === 'Professional Certifications' ? 'View Programmes' :
                         program.title === 'Internal Training' ? 'Manage Training' : 'Join Programme'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}