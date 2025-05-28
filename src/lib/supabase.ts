// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

// Environment variables with fallbacks for development
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

// Validate environment variables
if (supabaseUrl === 'https://placeholder.supabase.co' || supabaseAnonKey === 'placeholder-key') {
  console.warn('⚠️ Supabase environment variables not configured. Using placeholder values.')
}

// Create Supabase client with error handling
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false, // Disable persistence during build
    autoRefreshToken: false,
    detectSessionInUrl: false
  }
})

// Helper function to check if Supabase is properly configured
export const isSupabaseConfigured = (): boolean => {
  return supabaseUrl !== 'https://placeholder.supabase.co' && supabaseAnonKey !== 'placeholder-key'
}

// Types for our basic MVP
export type UserRole = 'admin' | 'hr_admin' | 'department_head' | 'training_editor' | 'applicant' | 'tender_applicant' | 'it_support'

export interface UserProfile {
  id: string
  email: string
  first_name: string
  last_name: string
  role: UserRole
  department_id?: string
  created_at: string
  updated_at: string
}

export interface Department {
  id: string
  name: string
  code: string
  description?: string
  created_at: string
}

export interface JobPosition {
  id: string
  title: string
  description: string
  department_id: string
  department?: Department
  employment_type: 'permanent' | 'contract' | 'internship' | 'consultancy'
  is_active: boolean
  created_at: string
}

export interface Application {
  id: string
  applicant_id: string
  position_id: string
  position?: JobPosition
  status: 'submitted' | 'under_review' | 'shortlisted' | 'rejected' | 'hired'
  cv_url?: string
  cover_letter_url?: string
  applied_at: string
}