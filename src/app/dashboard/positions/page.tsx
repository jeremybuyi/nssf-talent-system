// src/app/dashboard/positions/page.tsx
'use client'

import DashboardLayout from '@/components/layout/dashboard-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  BriefcaseIcon,
  Search,
  Plus,
  Edit,
  Eye,
  Users,
  Calendar,
  MapPin,
  DollarSign,
  Clock
} from 'lucide-react'
import { useState } from 'react'

const mockPositions = [
  {
    id: '1',
    title: 'Senior Accountant',
    department: 'Finance',
    location: 'Kampala',
    type: 'permanent',
    salary: 'UGX 3,500,000 - 4,500,000',
    applications: 23,
    posted: '2024-12-01',
    closing: '2024-12-30',
    status: 'active',
    description: 'Lead financial reporting and analysis for NSSF operations',
    requirements: 'CPA qualification, 5+ years experience'
  },
  {
    id: '2',
    title: 'IT Manager',
    department: 'Technology',
    location: 'Kampala',
    type: 'permanent',
    salary: 'UGX 5,000,000 - 7,000,000',
    applications: 18,
    posted: '2024-11-28',
    closing: '2024-12-28',
    status: 'active',
    description: 'Oversee IT infrastructure and digital transformation initiatives',
    requirements: 'Masters in IT, 8+ years experience, leadership skills'
  },
  {
    id: '3',
    title: 'HR Specialist',
    department: 'Human Resources',
    location: 'Entebbe',
    type: 'contract',
    salary: 'UGX 2,800,000 - 3,500,000',
    applications: 31,
    posted: '2024-11-25',
    closing: '2024-12-25',
    status: 'active',
    description: 'Support recruitment, employee relations and HR operations',
    requirements: 'Bachelor in HR, 4+ years experience'
  },
  {
    id: '4',
    title: 'Data Analyst',
    department: 'Technology',
    location: 'Kampala',
    type: 'permanent',
    salary: 'UGX 3,000,000 - 4,000,000',
    applications: 42,
    posted: '2024-11-20',
    closing: '2024-12-20',
    status: 'closed',
    description: 'Analyze pension data and generate business insights',
    requirements: 'Statistics/Data Science degree, Python/R skills'
  },
  {
    id: '5',
    title: 'Marketing Officer',
    department: 'Marketing',
    location: 'Jinja',
    type: 'permanent',
    salary: 'UGX 2,500,000 - 3,200,000',
    applications: 28,
    posted: '2024-11-15',
    closing: '2024-12-15',
    status: 'paused',
    description: 'Develop and execute marketing campaigns for NSSF services',
    requirements: 'Marketing degree, 3+ years experience, digital marketing'
  },
  {
    id: '6',
    title: 'Project Manager',
    department: 'Operations',
    location: 'Mbarara',
    type: 'contract',
    salary: 'UGX 4,200,000 - 5,500,000',
    applications: 16,
    posted: '2024-12-05',
    closing: '2025-01-05',
    status: 'active',
    description: 'Lead strategic projects and process improvements',
    requirements: 'PMP certification, 6+ years project management'
  },
  {
    id: '7',
    title: 'Customer Service Representative',
    department: 'Customer Relations',
    location: 'Multiple Locations',
    type: 'permanent',
    salary: 'UGX 1,800,000 - 2,300,000',
    applications: 67,
    posted: '2024-12-08',
    closing: '2025-01-08',
    status: 'active',
    description: 'Provide excellent service to NSSF members and employers',
    requirements: 'Diploma, customer service experience, communication skills'
  },
  {
    id: '8',
    title: 'Legal Officer',
    department: 'Legal',
    location: 'Kampala',
    type: 'permanent',
    salary: 'UGX 4,000,000 - 5,200,000',
    applications: 12,
    posted: '2024-12-10',
    closing: '2025-01-10',
    status: 'active',
    description: 'Handle legal matters and regulatory compliance',
    requirements: 'Law degree, admitted to Uganda Bar, 4+ years experience'
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'bg-green-100 text-green-800'
    case 'paused': return 'bg-yellow-100 text-yellow-800'
    case 'closed': return 'bg-red-100 text-red-800'
    case 'draft': return 'bg-gray-100 text-gray-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const getTypeColor = (type: string) => {
  switch (type) {
    case 'permanent': return 'bg-blue-100 text-blue-800'
    case 'contract': return 'bg-purple-100 text-purple-800'
    case 'internship': return 'bg-orange-100 text-orange-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

export default function PositionsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [departmentFilter, setDepartmentFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')

  const filteredPositions = mockPositions.filter(pos => {
    const matchesSearch = pos.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pos.department.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || pos.status === statusFilter
    const matchesDepartment = departmentFilter === 'all' || pos.department === departmentFilter
    const matchesType = typeFilter === 'all' || pos.type === typeFilter
    
    return matchesSearch && matchesStatus && matchesDepartment && matchesType
  })

  const statusCounts = {
    total: mockPositions.length,
    active: mockPositions.filter(pos => pos.status === 'active').length,
    paused: mockPositions.filter(pos => pos.status === 'paused').length,
    closed: mockPositions.filter(pos => pos.status === 'closed').length,
    totalApplications: mockPositions.reduce((sum, pos) => sum + pos.applications, 0)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-geist font-bold text-gray-900">
              Job Positions
            </h1>
            <p className="text-gray-600 mt-1">
              Manage open positions and recruitment campaigns
            </p>
          </div>
          <Button style={{ backgroundColor: '#28a745' }} className="text-white">
            <Plus className="h-4 w-4 mr-2" />
            Create Position
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card className="nssf-card">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-gray-900">{statusCounts.total}</div>
              <div className="text-sm text-gray-600">Total Positions</div>
            </CardContent>
          </Card>
          <Card className="nssf-card">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">{statusCounts.active}</div>
              <div className="text-sm text-gray-600">Active</div>
            </CardContent>
          </Card>
          <Card className="nssf-card">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-yellow-600">{statusCounts.paused}</div>
              <div className="text-sm text-gray-600">Paused</div>
            </CardContent>
          </Card>
          <Card className="nssf-card">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-red-600">{statusCounts.closed}</div>
              <div className="text-sm text-gray-600">Closed</div>
            </CardContent>
          </Card>
          <Card className="nssf-card">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">{statusCounts.totalApplications}</div>
              <div className="text-sm text-gray-600">Total Applications</div>
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
                    placeholder="Search positions..."
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
                  <SelectItem value="paused">Paused</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="permanent">Permanent</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="internship">Internship</SelectItem>
                </SelectContent>
              </Select>
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Human Resources">Human Resources</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Operations">Operations</SelectItem>
                  <SelectItem value="Legal">Legal</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Positions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredPositions.map((position) => (
            <Card key={position.id} className="nssf-card hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-xl text-gray-900 mb-2">{position.title}</CardTitle>
                    <div className="flex items-center space-x-2 mb-3">
                      <Badge variant="secondary" className={getStatusColor(position.status)}>
                        {position.status.charAt(0).toUpperCase() + position.status.slice(1)}
                      </Badge>
                      <Badge variant="outline" className={getTypeColor(position.type)}>
                        {position.type.charAt(0).toUpperCase() + position.type.slice(1)}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-700 mb-4">{position.description}</p>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-1 text-gray-600">
                      <BriefcaseIcon className="h-4 w-4" />
                      <span>{position.department}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{position.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-1 text-gray-600">
                      <DollarSign className="h-4 w-4" />
                      <span>{position.salary}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-600">
                      <Users className="h-4 w-4" />
                      <span>{position.applications} applications</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-1 text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>Posted: {new Date(position.posted).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>Closes: {new Date(position.closing).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Requirements:</strong> {position.requirements}
                  </p>
                </div>

                <div className="mt-4 flex space-x-2">
                  <Button variant="outline" className="flex-1" size="sm">
                    View Applications
                  </Button>
                  <Button 
                    className="flex-1 text-white" 
                    size="sm"
                    style={{ backgroundColor: '#145fa7' }}
                  >
                    Edit Position
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPositions.length === 0 && (
          <Card className="nssf-card">
            <CardContent className="p-12 text-center">
              <BriefcaseIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No positions found</h3>
              <p className="text-gray-600">Try adjusting your search criteria</p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}