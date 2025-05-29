// src/app/dashboard/applications/page.tsx
'use client'

import DashboardLayout from '@/components/layout/dashboard-layout'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  FileText,
  Search,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  User,
  MapPin,
  Calendar,
  Phone,
  Mail
} from 'lucide-react'
import { useState } from 'react'

const mockApplications = [
  {
    id: '1',
    name: 'Sarah Nakamya',
    email: 'sarah.nakamya@gmail.com',
    phone: '+256 701 234 567',
    position: 'Senior Accountant',
    department: 'Finance',
    location: 'Kampala',
    appliedDate: '2024-12-15',
    status: 'under_review',
    experience: '5 years',
    education: 'Bachelor in Accounting',
    score: 85,
    notes: 'Strong financial background, CPA certified'
  },
  {
    id: '2',
    name: 'James Okello',
    email: 'j.okello@outlook.com',
    phone: '+256 702 345 678',
    position: 'IT Manager',
    department: 'Technology',
    location: 'Kampala',
    appliedDate: '2024-12-14',
    status: 'shortlisted',
    experience: '8 years',
    education: 'Masters in Computer Science',
    score: 92,
    notes: 'Excellent technical skills, leadership experience'
  },
  {
    id: '3',
    name: 'Grace Atuhaire',
    email: 'grace.atuhaire@yahoo.com',
    phone: '+256 703 456 789',
    position: 'HR Specialist',
    department: 'Human Resources',
    location: 'Entebbe',
    appliedDate: '2024-12-13',
    status: 'interview_scheduled',
    experience: '4 years',
    education: 'Bachelor in Human Resources',
    score: 88,
    notes: 'Great communication skills, HR certification'
  },
  {
    id: '4',
    name: 'Robert Ssemakula',
    email: 'r.ssemakula@gmail.com',
    phone: '+256 704 567 890',
    position: 'Marketing Officer',
    department: 'Marketing',
    location: 'Jinja',
    appliedDate: '2024-12-12',
    status: 'rejected',
    experience: '2 years',
    education: 'Diploma in Marketing',
    score: 65,
    notes: 'Limited experience for senior role'
  },
  {
    id: '5',
    name: 'Patricia Namuli',
    email: 'p.namuli@hotmail.com',
    phone: '+256 705 678 901',
    position: 'Project Manager',
    department: 'Operations',
    location: 'Mbarara',
    appliedDate: '2024-12-11',
    status: 'hired',
    experience: '6 years',
    education: 'Masters in Project Management',
    score: 95,
    notes: 'Outstanding qualifications, PMP certified'
  },
  {
    id: '6',
    name: 'David Mukasa',
    email: 'd.mukasa@gmail.com',
    phone: '+256 706 789 012',
    position: 'Data Analyst',
    department: 'Technology',
    location: 'Kampala',
    appliedDate: '2024-12-10',
    status: 'submitted',
    experience: '3 years',
    education: 'Bachelor in Statistics',
    score: 78,
    notes: 'Good analytical skills, Python expertise'
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'submitted': return 'bg-gray-100 text-gray-800'
    case 'under_review': return 'bg-yellow-100 text-yellow-800'
    case 'shortlisted': return 'bg-blue-100 text-blue-800'
    case 'interview_scheduled': return 'bg-purple-100 text-purple-800'
    case 'hired': return 'bg-green-100 text-green-800'
    case 'rejected': return 'bg-red-100 text-red-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const formatStatus = (status: string) => {
  return status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'hired': return <CheckCircle className="h-4 w-4 text-green-600" />
    case 'rejected': return <XCircle className="h-4 w-4 text-red-600" />
    case 'interview_scheduled': return <Calendar className="h-4 w-4 text-purple-600" />
    default: return <Clock className="h-4 w-4 text-gray-600" />
  }
}

export default function ApplicationsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [departmentFilter, setDepartmentFilter] = useState('all')

  const filteredApplications = mockApplications.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.position.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter
    const matchesDepartment = departmentFilter === 'all' || app.department === departmentFilter
    
    return matchesSearch && matchesStatus && matchesDepartment
  })

  const statusCounts = {
    total: mockApplications.length,
    submitted: mockApplications.filter(app => app.status === 'submitted').length,
    under_review: mockApplications.filter(app => app.status === 'under_review').length,
    shortlisted: mockApplications.filter(app => app.status === 'shortlisted').length,
    hired: mockApplications.filter(app => app.status === 'hired').length
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-geist font-bold text-gray-900">
              Job Applications
            </h1>
            <p className="text-gray-600 mt-1">
              Review and manage candidate applications
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button style={{ backgroundColor: '#28a745' }} className="text-white">
              <FileText className="h-4 w-4 mr-2" />
              New Position
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card className="nssf-card">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-gray-900">{statusCounts.total}</div>
              <div className="text-sm text-gray-600">Total Applications</div>
            </CardContent>
          </Card>
          <Card className="nssf-card">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-yellow-600">{statusCounts.submitted}</div>
              <div className="text-sm text-gray-600">New Submissions</div>
            </CardContent>
          </Card>
          <Card className="nssf-card">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">{statusCounts.under_review}</div>
              <div className="text-sm text-gray-600">Under Review</div>
            </CardContent>
          </Card>
          <Card className="nssf-card">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-purple-600">{statusCounts.shortlisted}</div>
              <div className="text-sm text-gray-600">Shortlisted</div>
            </CardContent>
          </Card>
          <Card className="nssf-card">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">{statusCounts.hired}</div>
              <div className="text-sm text-gray-600">Hired</div>
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
                    placeholder="Search applications..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="submitted">Submitted</SelectItem>
                  <SelectItem value="under_review">Under Review</SelectItem>
                  <SelectItem value="shortlisted">Shortlisted</SelectItem>
                  <SelectItem value="interview_scheduled">Interview Scheduled</SelectItem>
                  <SelectItem value="hired">Hired</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Human Resources">Human Resources</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Operations">Operations</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Applications List */}
        <div className="space-y-4">
          {filteredApplications.map((application) => (
            <Card key={application.id} className="nssf-card hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary text-white">
                        {application.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{application.name}</h3>
                        <Badge variant="secondary" className={`${getStatusColor(application.status)}`}>
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(application.status)}
                            <span>{formatStatus(application.status)}</span>
                          </div>
                        </Badge>
                        <div className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          Score: {application.score}%
                        </div>
                      </div>
                      <p className="text-lg text-primary font-medium mb-2">{application.position}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>{application.department}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{application.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(application.appliedDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{application.experience}</span>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Mail className="h-4 w-4" />
                          <span>{application.email}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Phone className="h-4 w-4" />
                          <span>{application.phone}</span>
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-gray-700">{application.notes}</p>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View CV
                    </Button>
                    <Button variant="outline" size="sm" style={{ color: '#145fa7', borderColor: '#145fa7' }}>
                      Review
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredApplications.length === 0 && (
          <Card className="nssf-card">
            <CardContent className="p-12 text-center">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No applications found</h3>
              <p className="text-gray-600">Try adjusting your search criteria</p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}