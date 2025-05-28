// src/store/auth-store.ts
import { create } from 'zustand'
import { User } from '@supabase/supabase-js'
import { UserProfile, UserRole } from '@/lib/supabase'

interface AuthState {
  user: User | null
  profile: UserProfile | null
  loading: boolean
  setUser: (user: User | null) => void
  setProfile: (profile: UserProfile | null) => void
  setLoading: (loading: boolean) => void
  logout: () => void
  hasRole: (roles: UserRole | UserRole[]) => boolean
  canAccessDashboard: () => boolean
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  profile: null,
  loading: true,
  
  setUser: (user) => set({ user }),
  setProfile: (profile) => set({ profile }),
  setLoading: (loading) => set({ loading }),
  
  logout: () => set({ user: null, profile: null }),
  
  hasRole: (roles) => {
    const { profile } = get()
    if (!profile) return false
    
    if (Array.isArray(roles)) {
      return roles.includes(profile.role)
    }
    return profile.role === roles
  },
  
  canAccessDashboard: () => {
    const { profile } = get()
    if (!profile) return false
    
    const adminRoles: UserRole[] = ['admin', 'hr_admin', 'department_head', 'training_editor']
    return adminRoles.includes(profile.role)
  }
}))