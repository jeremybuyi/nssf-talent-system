// src/app/dashboard/talent-pool/page.tsx
'use client'

import DashboardLayout from '@/components/layout/dashboard-layout'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Users,
  Search,
  Star,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
  Calendar,
  Download
} from 'lucide-react'
import { useState } from 'react'

const mockTalents = [
  {
    id: '1',
    name: 'Alice Nakato',
    email: 'alice.nakato@gmail.com',
    phone: '+256 701 123 456',
    location: 'Kampala',
    title: 'Senior Software Engineer',
    experience: '7 years',
    education: 'Masters in Computer Science',
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS'],
    rating: 4.8,
    availability: 'available',
    lastActive: '2024-12-15',
    salary: 'UGX 6,000,000 - 8,000,000',
    certifications: ['AWS Certified', 'Scrum Master'],
    languages: ['English', 'Luganda'],
    summary: 'Experienced full-stack developer with expertise in modern web technologies'
  },
  {
    id: '2',
    name: 'David Ssempija',
    email: 'd.ssempija@outlook.com',
    phone: '+256 702 234 567',
    location: 'Entebbe',
    title: 'Financial Analyst',
    experience: '5 years',
    education: 'Bachelor in Finance',
    skills: ['Excel', 'Power BI', 'SQL', 'Financial Modeling', 'Risk Analysis'],
    rating: 4.6,
    availability: 'seeking_opportunities',
    lastActive: '2024-12-14',
    salary: 'UGX 3,500,000 - 4,500,000',
    certifications: ['CFA Level 2', 'Excel Expert'],
    languages: ['English', 'Luganda', 'Swahili'],
    summary: 'Detail-oriented financial analyst with strong analytical and reporting skills'
  },
  {
    id: '3',
    name: 'Grace Nakirya',
    email: 'grace.nakirya@yahoo.com',
    phone: '+256 703 345 678',
    location: 'Jinja',
    title: 'Digital Marketing Manager',
    experience: '6 years',
    education: 'Masters in Marketing',
    skills: ['SEO', 'Google Ads', 'Social Media', 'Content Strategy', 'Analytics'],
    rating: 4.9,
    availability: 'available',
    lastActive: '2024-12-16',
    salary: 'UGX 4,000,000 - 5,500,000',
    certifications: ['Google Ads Certified', 'HubSpot Certified'],
    languages: ['English', 'Luganda'],
    summary: 'Creative marketing professional with proven track record in digital campaigns'
  },
  {
    id: '4',
    name: 'Michael Okwi',
    email: 'm.okwi@gmail.com',
    phone: '+256 704 456 789',
    location: 'Mbarara',
    title: 'Project Manager',
    experience: '8 years',
    education: 'MBA in Project Management',
    skills: ['Agile', 'Scrum', 'Risk Management', 'Stakeholder Management', 'MS Project'],
    rating: 4.7,
    availability: 'employed_open',
    lastActive: '2024-12-13',
    salary: 'UGX 5,000,000 - 7,000,000',
    certifications: ['PMP', 'Prince2', 'Agile Certified'],
    languages: ['English', 'Runyankole'],
    summary: 'Seasoned project manager with expertise in complex software implementations'
  },
  {
    id: '5',
    name: 'Sarah Nandutu',
    email: 's.nandutu@hotmail.com',
    phone: '+256 705 567 890',
    location: 'Kampala',
    title: 'HR Business Partner',
    experience: '4 years',
    education: 'Bachelor in Human Resources',
    skills: ['Recruitment', 'Employee Relations', 'Performance Management', 'Training', 'HRIS'],
    rating: 4.5,
    availability: 'seeking_opportunities',
    lastActive: '2024-12-15',
    salary: 'UGX 3,000,000 - 4,000,000',
    certifications: ['CHRP', 'Six Sigma Green Belt'],
    languages: ['English', 'Luganda', 'French'],
    summary: 'Strategic HR professional focused on employee engagement and organizational development'
  },
  {
    id: '6',
    name: 'Robert Tumwine',
    email: 'r.tumwine@gmail.com',
    phone: '+256 706 678 901',
    location: 'Gulu',
    title: 'Data Scientist',
    experience: '3 years',
    education: 'Masters in Data Science',
    skills: ['Python', 'R', 'Machine Learning', 'SQL', 'Tableau', 'Statistics'],
    rating: 4.4,
    availability: 'available',
    lastActive: '2024-12-16',
    salary: 'UGX 4,500,000 - 6,000,000',
    certifications: ['Google Data Analytics', 'IBM Data Science'],
    languages: ['English', 'Acholi'],
    summary: 'Analytical data scientist with expertise in predictive modeling and business intelligence'
  }
]

const getAvailabilityColor = (availability: string) => {
  switch (availability) {
    case 'available': return 'bg-green-100 text-green-800'
    case 'seeking_opportunities': return 'bg-blue-100 text-blue-800'
    case 'employed_open': return 'bg-yellow-100 text-yellow-800'
    case 'not_available': return 'bg-red-100 text-red-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const formatAvailability = (availability: string) => {
  switch (availability) {
    case 'available': return 'Available'
    case 'seeking_opportunities': return 'Seeking Opportunities'
    case 'employed_open': return 'Employed but Open'
    case 'not_available': return 'Not Available'
    default: return availability
  }
}

export default function TalentPoolPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [availabilityFilter, setAvailabilityFilter] = useState('all')
  const [locationFilter, setLocationFilter] = useState('all')
  const [experienceFilter, setExperienceFilter] = useState('all')

  const filteredTalents = mockTalents.filter(talent => {
    const matchesSearch = talent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         talent.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         talent.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesAvailability = availabilityFilter === 'all' || talent.availability === availabilityFilter
    const matchesLocation = locationFilter === 'all' || talent.location === locationFilter
    const matchesExperience = experienceFilter === 'all' || 
      (experienceFilter === 'junior' && parseInt(talent.experience) <= 3) ||
      (experienceFilter === 'mid' && parseInt(talent.experience) > 3 && parseInt(talent.experience) <= 6) ||
      (experienceFilter === 'senior' && parseInt(talent.experience) > 6)
    
    return matchesSearch && matchesAvailability && matchesLocation && matchesExperience
  })

  const talentStats = {
    total: mockTalents.length,
    available: mockTalents.filter(t => t.availability === 'available').length,
    seeking: mockTalents.filter(t => t.availability === 'seeking_opportunities').length,
    avgRating: (mockTalents.reduce((sum, t) => sum + t.rating, 0) / mockTalents.length).toFixed(1)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-geist font-bold text-gray-900">
              Talent Pool
            </h1>
            <p className="text-gray-600 mt-1">
              Manage your candidate database and talent pipeline
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button style={{ backgroundColor: '#28a745' }} className="text-white">
              <Users className="h-4 w-4 mr-2" />
              Add Talent
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="nssf-card">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-gray-900">{talentStats.total}</div>
              <div className="text-sm text-gray-600">Total Talents</div>
            </CardContent>
          </Card>
          <Card className="nssf-card">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">{talentStats.available}</div>
              <div className="text-sm text-gray-600">Available Now</div>
            </CardContent>
          </Card>
          <Card className="nssf-card">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">{talentStats.seeking}</div>
              <div className="text-sm text-gray-600">Seeking Opportunities</div>
            </CardContent>
          </Card>
          <Card className="nssf-card">
            <CardContent className="p-4">
              <div className="flex items-center space-x-1">
                <div className="text-2xl font-bold text-yellow-600">{talentStats.avgRating}</div>
                <Star className="h-5 w-5 text-yellow-500 fill-current" />
              </div>
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
                    placeholder="Search talents by name, title, or skills..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Availability</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="seeking_opportunities">Seeking Opportunities</SelectItem>
                  <SelectItem value="employed_open">Employed but Open</SelectItem>
                  <SelectItem value="not_available">Not Available</SelectItem>
                </SelectContent>
              </Select>
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="Kampala">Kampala</SelectItem>
                  <SelectItem value="Entebbe">Entebbe</SelectItem>
                  <SelectItem value="Jinja">Jinja</SelectItem>
                  <SelectItem value="Mbarara">Mbarara</SelectItem>
                  <SelectItem value="Gulu">Gulu</SelectItem>
                </SelectContent>
              </Select>
              <Select value={experienceFilter} onValueChange={setExperienceFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Experience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="junior">Junior (0-3 years)</SelectItem>
                  <SelectItem value="mid">Mid (4-6 years)</SelectItem>
                  <SelectItem value="senior">Senior (7+ years)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Talent Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredTalents.map((talent) => (
            <Card key={talent.id} className="nssf-card hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="bg-primary text-white text-lg">
                      {talent.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{talent.name}</h3>
                        <p className="text-primary font-medium">{talent.title}</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{talent.rating}</span>
                      </div>
                    </div>
                    
                    <Badge variant="secondary" className={`mb-3 ${getAvailabilityColor(talent.availability)}`}>
                      {formatAvailability(talent.availability)}
                    </Badge>
                    
                    <p className="text-sm text-gray-700 mb-3">{talent.summary}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600 mb-3">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{talent.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Briefcase className="h-4 w-4" />
                        <span>{talent.experience} experience</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <GraduationCap className="h-4 w-4" />
                        <span>{talent.education}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>Active: {new Date(talent.lastActive).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="text-sm font-medium text-gray-700 mb-1">Skills:</div>
                      <div className="flex flex-wrap gap-1">
                        {talent.skills.slice(0, 5).map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {talent.skills.length > 5 && (
                          <Badge variant="outline" className="text-xs">
                            +{talent.skills.length - 5} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-sm font-medium text-gray-700 mb-1">Certifications:</div>
                      <div className="flex flex-wrap gap-1">
                        {talent.certifications.map((cert, index) => (
                          <Badge key={index} variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                            <Award className="h-3 w-3 mr-1" />
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <div className="flex items-center space-x-1">
                        <Mail className="h-4 w-4" />
                        <span>{talent.email}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Phone className="h-4 w-4" />
                        <span>{talent.phone}</span>
                      </div>
                    </div>

                    <div className="text-sm font-medium text-gray-900 mb-3">
                      Expected Salary: {talent.salary}
                    </div>

                    <div className="flex space-x-2">
                      <Button variant="outline" className="flex-1" size="sm">
                        View Profile
                      </Button>
                      <Button 
                        className="flex-1 text-white" 
                        size="sm"
                        style={{ backgroundColor: '#145fa7' }}
                      >
                        Contact
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTalents.length === 0 && (
          <Card className="nssf-card">
            <CardContent className="p-12 text-center">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No talents found</h3>
              <p className="text-gray-600">Try adjusting your search criteria</p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}