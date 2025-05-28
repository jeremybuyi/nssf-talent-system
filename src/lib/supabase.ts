// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our basic MVP
export type UserRole = 'admin' | 'hr_admin' | 'department_head' | 'training_editor' | 'applicant' | 'tender_applicant'

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