// src/app/dashboard/analytics/page.tsx
'use client'

import DashboardLayout from '@/components/layout/dashboard-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  BarChart3,
  TrendingUp,
  Users,
  Target,
  Clock,
  Download,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'
import { useState } from 'react'

const mockAnalytics = {
  overview: {
    totalApplications: 2543,
    applicationsTrend: 12.5,
    hireRate: 18.7,
    hireRateTrend: -2.3,
    avgTimeToHire: 21,
    timeToHireTrend: -8.1,
    costPerHire: 850000,
    costPerHireTrend: 5.2
  },
  monthlyApplications: [
    { month: 'Jan', applications: 189, hires: 32 },
    { month: 'Feb', applications: 215, hires: 38 },
    { month: 'Mar', applications: 234, hires: 41 },
    { month: 'Apr', applications: 198, hires: 35 },
    { month: 'May', applications: 267, hires: 48 },
    { month: 'Jun', applications: 289, hires: 52 },
    { month: 'Jul', applications: 312, hires: 58 },
    { month: 'Aug', applications: 298, hires: 55 },
    { month: 'Sep', applications: 276, hires: 51 },
    { month: 'Oct', applications: 321, hires: 60 },
    { month: 'Nov', applications: 298, hires: 56 },
    { month: 'Dec', applications: 289, hires: 54 }
  ],
  departmentData: [
    { department: 'Technology', applications: 642, hires: 89, budget: 45000000, avgSalary: 5500000 },
    { department: 'Finance', applications: 523, hires: 76, budget: 38000000, avgSalary: 4200000 },
    { department: 'HR', applications: 387, hires: 54, budget: 28000000, avgSalary: 3800000 },
    { department: 'Operations', applications: 298, hires: 42, budget: 22000000, avgSalary: 3500000 },
    { department: 'Marketing', applications: 234, hires: 33, budget: 18000000, avgSalary: 3200000 },
    { department: 'Legal', applications: 156, hires: 22, budget: 15000000, avgSalary: 4800000 }
  ],
  topSources: [
    { source: 'Company Website', applications: 987, percentage: 38.8 },
    { source: 'LinkedIn', applications: 654, percentage: 25.7 },
    { source: 'Job Boards', applications: 432, percentage: 17.0 },
    { source: 'Referrals', applications: 298, percentage: 11.7 },
    { source: 'Universities', applications: 172, percentage: 6.8 }
  ],
  positionPerformance: [
    { position: 'Software Engineer', applications: 234, hires: 18, avgDays: 28 },
    { position: 'Accountant', applications: 189, hires: 24, avgDays: 19 },
    { position: 'HR Specialist', applications: 156, hires: 15, avgDays: 22 },
    { position: 'Project Manager', applications: 143, hires: 12, avgDays: 31 },
    { position: 'Data Analyst', applications: 132, hires: 16, avgDays: 25 }
  ]
}

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('12months')

  const getTrendIcon = (trend: number) => {
    return trend > 0 ? 
      <ArrowUpRight className="h-4 w-4 text-green-600" /> : 
      <ArrowDownRight className="h-4 w-4 text-red-600" />
  }

  const getTrendColor = (trend: number) => {
    return trend > 0 ? 'text-green-600' : 'text-red-600'
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-geist font-bold text-gray-900">
              Analytics & Reports
            </h1>
            <p className="text-gray-600 mt-1">
              Track recruitment performance and hiring insights
            </p>
          </div>
          <div className="flex space-x-2">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30days">Last 30 Days</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="12months">Last 12 Months</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="nssf-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {mockAnalytics.overview.totalApplications.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Total Applications</div>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <div className={`flex items-center mt-2 text-sm ${getTrendColor(mockAnalytics.overview.applicationsTrend)}`}>
                {getTrendIcon(mockAnalytics.overview.applicationsTrend)}
                <span className="ml-1">{Math.abs(mockAnalytics.overview.applicationsTrend)}% vs last period</span>
              </div>
            </CardContent>
          </Card>

          <Card className="nssf-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {mockAnalytics.overview.hireRate}%
                  </div>
                  <div className="text-sm text-gray-600">Hire Rate</div>
                </div>
                <Target className="h-8 w-8 text-green-600" />
              </div>
              <div className={`flex items-center mt-2 text-sm ${getTrendColor(mockAnalytics.overview.hireRateTrend)}`}>
                {getTrendIcon(mockAnalytics.overview.hireRateTrend)}
                <span className="ml-1">{Math.abs(mockAnalytics.overview.hireRateTrend)}% vs last period</span>
              </div>
            </CardContent>
          </Card>

          <Card className="nssf-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {mockAnalytics.overview.avgTimeToHire}
                  </div>
                  <div className="text-sm text-gray-600">Avg Days to Hire</div>
                </div>
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
              <div className={`flex items-center mt-2 text-sm ${getTrendColor(mockAnalytics.overview.timeToHireTrend)}`}>
                {getTrendIcon(mockAnalytics.overview.timeToHireTrend)}
                <span className="ml-1">{Math.abs(mockAnalytics.overview.timeToHireTrend)}% vs last period</span>
              </div>
            </CardContent>
          </Card>

          <Card className="nssf-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {(mockAnalytics.overview.costPerHire / 1000).toFixed(0)}K
                  </div>
                  <div className="text-sm text-gray-600">Cost per Hire (UGX)</div>
                </div>
                <BarChart3 className="h-8 w-8 text-purple-600" />
              </div>
              <div className={`flex items-center mt-2 text-sm ${getTrendColor(mockAnalytics.overview.costPerHireTrend)}`}>
                {getTrendIcon(mockAnalytics.overview.costPerHireTrend)}
                <span className="ml-1">{Math.abs(mockAnalytics.overview.costPerHireTrend)}% vs last period</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Trends */}
          <Card className="nssf-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Monthly Application Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAnalytics.monthlyApplications.slice(-6).map((data) => (
                  <div key={data.month} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 text-sm font-medium text-gray-600">{data.month}</div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <div 
                            className="bg-blue-200 h-2 rounded"
                            style={{ width: `${(data.applications / 350) * 100}px` }}
                          />
                          <span className="text-sm">{data.applications} applications</span>
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          <div 
                            className="bg-green-200 h-2 rounded"
                            style={{ width: `${(data.hires / 70) * 100}px` }}
                          />
                          <span className="text-sm text-gray-600">{data.hires} hires</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {((data.hires / data.applications) * 100).toFixed(1)}%
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Department Performance */}
          <Card className="nssf-card">
            <CardHeader>
              <CardTitle>Department Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAnalytics.departmentData.map((dept) => (
                  <div key={dept.department} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-900">{dept.department}</h4>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        {((dept.hires / dept.applications) * 100).toFixed(1)}% hire rate
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">{dept.applications}</span> applications
                      </div>
                      <div>
                        <span className="font-medium">{dept.hires}</span> hires
                      </div>
                      <div>
                        Budget: <span className="font-medium">UGX {(dept.budget / 1000000).toFixed(0)}M</span>
                      </div>
                      <div>
                        Avg Salary: <span className="font-medium">UGX {(dept.avgSalary / 1000000).toFixed(1)}M</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Application Sources */}
          <Card className="nssf-card">
            <CardHeader>
              <CardTitle>Top Application Sources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAnalytics.topSources.map((source, index) => (
                  <div key={source.source} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{source.source}</div>
                        <div className="text-sm text-gray-500">{source.applications} applications</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-gray-900">{source.percentage}%</div>
                      <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${source.percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Position Performance */}
          <Card className="nssf-card">
            <CardHeader>
              <CardTitle>Top Performing Positions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAnalytics.positionPerformance.map((position) => (
                  <div key={position.position} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-900">{position.position}</h4>
                      <Badge variant="outline" className="text-xs">
                        {position.avgDays} avg days
                      </Badge>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{position.applications} applications</span>
                      <span className="font-medium text-green-600">{position.hires} hires</span>
                      <span>{((position.hires / position.applications) * 100).toFixed(1)}% rate</span>
                    </div>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${(position.hires / position.applications) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Insights */}
        <Card className="nssf-card">
          <CardHeader>
            <CardTitle>Quick Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center mb-2">
                  <TrendingUp className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="font-medium text-blue-900">Peak Hiring Season</span>
                </div>
                <p className="text-sm text-blue-800">
                  October shows highest application volume with 321 applications received
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center mb-2">
                  <Target className="h-5 w-5 text-green-600 mr-2" />
                  <span className="font-medium text-green-900">Best Performing Source</span>
                </div>
                <p className="text-sm text-green-800">
                  Company website generates 38.8% of all quality applications
                </p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <div className="flex items-center mb-2">
                  <Clock className="h-5 w-5 text-orange-600 mr-2" />
                  <span className="font-medium text-orange-900">Efficiency Improvement</span>
                </div>
                <p className="text-sm text-orange-800">
                  Time-to-hire reduced by 8.1% compared to previous period
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}