// src/app/register/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Link from 'next/link'
import Image from 'next/image'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'applicant'
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [logoError, setLogoError] = useState(false)
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            role: formData.role
          }
        }
      })

      if (error) {
        setError(error.message)
      } else {
        router.push('/login?message=Registration successful. Please check your email.')
      }
    } catch {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleLogoError = () => {
    setLogoError(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-nssf-link-water to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-white rounded-xl flex items-center justify-center mb-4 shadow-lg">
            {!logoError ? (
              <Image 
                src="/logo.png" 
                alt="NSSF Logo" 
                width={48}
                height={48}
                className="object-contain"
                onError={handleLogoError}
              />
            ) : (
              <div 
                className="h-12 w-12 bg-[#145fa7] rounded-lg flex items-center justify-center"
                style={{ fontSize: '1.5rem', color: 'white', fontWeight: 'bold' }}
              >
                NSSF
              </div>
            )}
          </div>
          <h1 className="text-3xl font-geist font-bold" style={{ color: '#145fa7' }}>
            Join NSSF Talent Hub
          </h1>
          <p className="text-gray-600 mt-2">
            Create your account to get started
          </p>
        </div>

        <Card className="nssf-card">
          <CardHeader>
            <CardTitle className="text-2xl font-geist">Create Account</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={formData.role} onValueChange={(value) => setFormData({...formData, role: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="applicant">Job Applicant</SelectItem>
                    <SelectItem value="hr_admin">HR Administrator</SelectItem>
                    <SelectItem value="department_head">Department Head</SelectItem>
                    <SelectItem value="training_editor">Training Editor</SelectItem>
                    <SelectItem value="it_support">IT Support</SelectItem>
                    <SelectItem value="tender_applicant">Tender Applicant</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full text-white font-medium"
                style={{ backgroundColor: '#28a745' }}
                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.backgroundColor = '#218838'}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.backgroundColor = '#28a745'}
                disabled={loading}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link 
                  href="/login" 
                  className="font-medium hover:underline"
                  style={{ color: '#145fa7' }}
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}