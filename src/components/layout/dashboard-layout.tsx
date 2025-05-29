// src/components/layout/dashboard-layout.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { useAuthStore } from '@/store/auth-store'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Users,
  FileText,
  GraduationCap,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Home,
  UserCheck,
  BriefcaseIcon,
  AlertTriangle
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface DashboardLayoutProps {
  children: React.ReactNode
}

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Applications', href: '/dashboard/applications', icon: FileText },
  { name: 'Job Positions', href: '/dashboard/positions', icon: BriefcaseIcon },
  { name: 'Talent Pool', href: '/dashboard/talent-pool', icon: Users },
  { name: 'Training', href: '/dashboard/training', icon: GraduationCap },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [logoError, setLogoError] = useState(false)
  const { profile, setUser, setProfile, logout } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    
    // Skip auth if Supabase is not configured (for demo purposes)
    if (!isSupabaseConfigured()) {
      // Set mock user for demo
      setProfile({
        id: 'demo-user',
        email: 'demo@nssf.ug',
        first_name: 'Demo',
        last_name: 'User',
        role: 'hr_admin',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      return
    }

    const getSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (session?.user) {
          setUser(session.user)
          // For MVP, we'll mock the profile data
          setProfile({
            id: session.user.id,
            email: session.user.email || '',
            first_name: 'John',
            last_name: 'Doe',
            role: 'hr_admin',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
        } else {
          router.push('/login')
        }
      } catch (error) {
        console.error('Session error:', error)
        // Set demo user if there's an error
        setProfile({
          id: 'demo-user',
          email: 'demo@nssf.ug',
          first_name: 'Demo',
          last_name: 'User',
          role: 'hr_admin',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
      }
    }

    getSession()

    // Only set up auth listener if Supabase is configured
    if (isSupabaseConfigured()) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (event === 'SIGNED_OUT' || !session) {
            logout()
            router.push('/login')
          }
        }
      )

      return () => subscription.unsubscribe()
    }
  }, [setUser, setProfile, logout, router])

  const handleLogout = async () => {
    if (isSupabaseConfigured()) {
      await supabase.auth.signOut()
    } else {
      // For demo mode, just clear the profile
      logout()
      router.push('/login')
    }
  }

  const handleLogoError = () => {
    setLogoError(true)
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800'
      case 'hr_admin': return 'bg-blue-100 text-blue-800'
      case 'department_head': return 'bg-green-100 text-green-800'
      case 'training_editor': return 'bg-purple-100 text-purple-800'
      case 'it_support': return 'bg-orange-100 text-orange-800'
      case 'tender_applicant': return 'bg-indigo-100 text-indigo-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatRole = (role: string) => {
    return role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Demo Mode Warning */}
      {!isSupabaseConfigured() && (
        <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-2">
          <div className="flex items-center text-yellow-800">
            <AlertTriangle className="h-4 w-4 mr-2" />
            <span className="text-sm">Demo Mode: Supabase not configured. Configure environment variables for full functionality.</span>
          </div>
        </div>
      )}

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                {!logoError ? (
                  <Image
                    src="/logo.png"
                    alt="NSSF Logo"
                    width={24}
                    height={24}
                    className="object-contain"
                    onError={handleLogoError}
                  />
                ) : (
                  <div
                    className="h-6 w-6 rounded-lg flex items-center justify-center"
                    style={{
                      backgroundColor: '#145fa7',
                      color: 'white',
                      fontSize: '0.75rem',
                      fontWeight: 'bold'
                    }}
                  >
                    NSSF
                  </div>
                )}
              </div>
              <span
                className="text-lg font-geist font-semibold"
                style={{ color: '#145fa7' }}
              >
                NSSF Talent
              </span>
            </div>
            <button
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6 text-gray-400" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 nssf-scrollbar overflow-y-auto">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 hover:text-primary transition-colors duration-200"
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>

          {/* User info */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarFallback className="bg-primary text-white">
                  {profile.first_name?.[0]}{profile.last_name?.[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {profile.first_name} {profile.last_name}
                </p>
                <Badge variant="secondary" className={`text-xs ${getRoleColor(profile.role)}`}>
                  {formatRole(profile.role)}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between">
            <button
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6 text-gray-600" />
            </button>
            <div className="flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-white">
                        {profile.first_name?.[0]}{profile.last_name?.[0]}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {profile.first_name} {profile.last_name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {profile.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <UserCheck className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}