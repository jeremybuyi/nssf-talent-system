// src/app/dashboard/training/page.tsx
'use client'

import DashboardLayout from '@/components/layout/dashboard-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  GraduationCap,
  Search,
  Plus,
  Users,
  Calendar,
  Clock,
  BookOpen,
  Video,
  FileText,
  CheckCircle,
  Play
} from 'lucide-react'
import { useState } from 'react'

const mockTrainingPrograms = [
  {
    id: '1',
    title: 'NSSF Pension Administration Fundamentals',
    description: 'Comprehensive training on pension schemes, member services, and regulatory compliance',
    category: 'Core Training',
    type: 'online',
    duration: '40 hours',
    status: 'active',
    enrolled: 156,
    capacity: 200,
    instructor: 'Margaret Atuhaire',
    startDate: '2025-01-15',
    endDate: '2025-02-15',
    rating: 4.8,
    modules: 8,
    completionRate: 87,
    price: 'Free (Internal)',
    level: 'Beginner'
  },
  {
    id: '2',
    title: 'Advanced Financial Analysis for Pension Funds',
    description: 'Deep dive into financial modeling, risk assessment, and investment strategies for pension funds',
    category: 'Finance',
    type: 'hybrid',
    duration: '60 hours',
    status: 'active',
    enrolled: 89,
    capacity: 120,
    instructor: 'David Mukasa',
    startDate: '2025-01-20',
    endDate: '2025-03-10',
    rating: 4.9,
    modules: 12,
    completionRate: 92,
    price: 'UGX 2,500,000',
    level: 'Advanced'
  },
  {
    id: '3',
    title: 'Digital Transformation in HR',
    description: 'Modern HR practices, digital tools, and technology adoption in human resources',
    category: 'Human Resources',
    type: 'online',
    duration: '30 hours',
    status: 'upcoming',
    enrolled: 67,
    capacity: 100,
    instructor: 'Grace Nakimuli',
    startDate: '2025-02-01',
    endDate: '2025-02-28',
    rating: 4.6,
    modules: 6,
    completionRate: 0,
    price: 'Free (Internal)',
    level: 'Intermediate'
  },
  {
    id: '4',
    title: 'Leadership Excellence Program',
    description: 'Executive leadership skills, strategic thinking, and organizational management',
    category: 'Leadership',
    type: 'in-person',
    duration: '80 hours',
    status: 'active',
    enrolled: 34,
    capacity: 40,
    instructor: 'Robert Ssemakula',
    startDate: '2024-12-01',
    endDate: '2025-01-30',
    rating: 4.7,
    modules: 10,
    completionRate: 78,
    price: 'UGX 5,000,000',
    level: 'Advanced'
  },
  {
    id: '5',
    title: 'Customer Service Excellence',
    description: 'Best practices in customer service, communication skills, and member satisfaction',
    category: 'Customer Service',
    type: 'online',
    duration: '25 hours',
    status: 'completed',
    enrolled: 234,
    capacity: 250,
    instructor: 'Sarah Namatovu',
    startDate: '2024-11-01',
    endDate: '2024-11-30',
    rating: 4.5,
    modules: 5,
    completionRate: 96,
    price: 'Free (Internal)',
    level: 'Beginner'
  },
  {
    id: '6',
    title: 'Project Management Professional (PMP) Prep',
    description: 'Comprehensive preparation for PMP certification with practical project management skills',
    category: 'Project Management',
    type: 'hybrid',
    duration: '120 hours',
    status: 'active',
    enrolled: 45,
    capacity: 50,
    instructor: 'James Okello',
    startDate: '2024-12-15',
    endDate: '2025-03-15',
    rating: 4.8,
    modules: 15,
    completionRate: 45,
    price: 'UGX 3,500,000',
    level: 'Advanced'
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'bg-green-100 text-green-800'
    case 'upcoming': return 'bg-blue-100 text-blue-800'
    case 'completed': return 'bg-gray-100 text-gray-800'
    case 'cancelled': return 'bg-red-100 text-red-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'online': return <Video className="h-4 w-4" />
    case 'in-person': return <Users className="h-4 w-4" />
    case 'hybrid': return <BookOpen className="h-4 w-4" />
    default: return <FileText className="h-4 w-4" />
  }
}

const getLevelColor = (level: string) => {
  switch (level) {
    case 'Beginner': return 'bg-green-100 text-green-800'
    case 'Intermediate': return 'bg-yellow-100 text-yellow-800'
    case 'Advanced': return 'bg-red-100 text-red-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

export default function TrainingPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')

  const filteredPrograms = mockTrainingPrograms.filter(program => {
    const matchesSearch = program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || program.status === statusFilter
    const matchesCategory = categoryFilter === 'all' || program.category === categoryFilter
    const matchesType = typeFilter === 'all' || program.type === typeFilter
    
    return matchesSearch && matchesStatus && matchesCategory && matchesType
  })

  const trainingStats = {
    totalPrograms: mockTrainingPrograms.length,
    activePrograms: mockTrainingPrograms.filter(p => p.status === 'active').length,
    totalEnrolled: mockTrainingPrograms.reduce((sum, p) => sum + p.enrolled, 0),
    avgRating: (mockTrainingPrograms.reduce((sum, p) => sum + p.rating, 0) / mockTrainingPrograms.length).toFixed(1)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-geist font-bold text-gray-900">
              Training & Development
            </h1>
            <p className="text-gray-600 mt-1">
              Manage training programs and employee development initiatives
            </p>
          </div>
          <Button style={{ backgroundColor: '#28a745' }} className="text-white">
            <Plus className="h-4 w-4 mr-2" />
            Create Program
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="nssf-card">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-gray-900">{trainingStats.totalPrograms}</div>
              <div className="text-sm text-gray-600">Total Programs</div>
            </CardContent>
          </Card>
          <Card className="nssf-card">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">{trainingStats.activePrograms}</div>
              <div className="text-sm text-gray-600">Active Programs</div>
            </CardContent>
          </Card>
          <Card className="nssf-card">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">{trainingStats.totalEnrolled}</div>
              <div className="text-sm text-gray-600">Total Enrolled</div>
            </CardContent>
          </Card>
          <Card className="nssf-card">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-yellow-600">{trainingStats.avgRating}</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="nssf-card">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search training programs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="online">Online</SelectItem>
                  <SelectItem value="in-person">In-Person</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Core Training">Core Training</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Human Resources">Human Resources</SelectItem>
                  <SelectItem value="Leadership">Leadership</SelectItem>
                  <SelectItem value="Customer Service">Customer Service</SelectItem>
                  <SelectItem value="Project Management">Project Management</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Training Programs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredPrograms.map((program) => (
            <Card key={program.id} className="nssf-card hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg text-gray-900 mb-2">{program.title}</CardTitle>
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge variant="secondary" className={getStatusColor(program.status)}>
                        {program.status.charAt(0).toUpperCase() + program.status.slice(1)}
                      </Badge>
                      <Badge variant="outline" className={getLevelColor(program.level)}>
                        {program.level}
                      </Badge>
                      <Badge variant="outline" className="flex items-center space-x-1">
                        {getTypeIcon(program.type)}
                        <span>{program.type.charAt(0).toUpperCase() + program.type.slice(1)}</span>
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">{program.rating}</div>
                    <div className="text-xs text-gray-500">Rating</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-700 mb-4">{program.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <div className="text-gray-500">Instructor</div>
                    <div className="font-medium">{program.instructor}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Category</div>
                    <div className="font-medium">{program.category}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Duration</div>
                    <div className="font-medium flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {program.duration}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500">Modules</div>
                    <div className="font-medium flex items-center">
                      <BookOpen className="h-4 w-4 mr-1" />
                      {program.modules}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4 text-sm">
                  <div className="flex items-center space-x-1 text-gray-600">
                    <Users className="h-4 w-4" />
                    <span>{program.enrolled}/{program.capacity} enrolled</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-600">
                    <CheckCircle className="h-4 w-4" />
                    <span>{program.completionRate}% completion</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Enrollment</span>
                    <span className="text-gray-600">{Math.round((program.enrolled / program.capacity) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${(program.enrolled / program.capacity) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4 text-sm">
                  <div className="flex items-center space-x-1 text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(program.startDate).toLocaleDateString()} - {new Date(program.endDate).toLocaleDateString()}</span>
                  </div>
                  <div className="font-semibold text-primary">
                    {program.price}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" className="flex-1" size="sm">
                    <Users className="h-4 w-4 mr-1" />
                    View Participants
                  </Button>
                  <Button 
                    className="flex-1 text-white" 
                    size="sm"
                    style={{ backgroundColor: '#145fa7' }}
                  >
                    <Play className="h-4 w-4 mr-1" />
                    Manage
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPrograms.length === 0 && (
          <Card className="nssf-card">
            <CardContent className="p-12 text-center">
              <GraduationCap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No training programs found</h3>
              <p className="text-gray-600">Try adjusting your search criteria</p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}