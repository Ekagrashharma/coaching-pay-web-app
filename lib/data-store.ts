// Client-side data storage using localStorage for MVP demo

import { courses } from "@/utils/Constant/course.constant"
import { IdCard } from "lucide-react"

export interface Course {
  id: number
  name: string
  duration: string
  batch: string
  fee: string
  description: string
  features: string[]
}

export interface Application {
  id: string
  studentName: string
  fatherName: string
  motherName: string
  email: string
  phone: string
  dob: string
  gender: string
  address: string
  city: string
  state: string
  pincode?: string
  courseId: number
  courseName: string
  class: string
  school: string
  percentage: string
  status: "pending" | "approved" | "rejected"
  submittedAt: string
  photo: string
}

export interface Payment {
  id: string
  applicationId: string
  studentName: string
  courseName: string
  amount: number
  upiId: string
  transactionId: string
  status: "pending" | "verified" | "rejected"
  submittedAt: string
  screenshot?: string
}

export interface User {
  id: string
  email: string
  role: "admin" | "student"
  name: string
}

// Storage keys
const STORAGE_KEYS = {
  APPLICATIONS: "coaching_applications",
  PAYMENTS: "coaching_payments",
  USERS: "coaching_users",
  CURRENT_USER: "coaching_current_user",
}

// Initialize default admin user
export function initializeDefaultUsers() {
  const users = getUsers()
  if (users.length === 0) {
    const defaultAdmin: User = {
      id: "1",
      email: "admin@academy.com",
      role: "admin",
      name: "Administrator",
    }
    saveUsers([defaultAdmin])
  }
}

// User management
export function getUsers(): User[] {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem(STORAGE_KEYS.USERS)
  return data ? JSON.parse(data) : []
}

export function saveUsers(users: User[]) {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users))
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null
  const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER)
  return data ? JSON.parse(data) : null
}

export function setCurrentUser(user: User | null) {
  if (typeof window === "undefined") return
  if (user) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user))
  } else {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER)
  }
}

export function login(email: string, password: string): User | null {
  // Simple authentication for MVP - in production use proper auth
  if (email === "admin@academy.com" && password === "admin123") {
    const admin: User = {
      id: "1",
      email: "admin@academy.com",
      role: "admin",
      name: "Administrator",
    }
    setCurrentUser(admin)
    return admin
  }
  return null
}

export function logout() {
  setCurrentUser(null)
}

// Application management
export function getApplications(): Application[] {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem(STORAGE_KEYS.APPLICATIONS)
  return data ? JSON.parse(data) : []
}

export function saveApplication(application: Application) {
  const applications = getApplications()
  applications.push(application)
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(applications))
  }
}

export function updateApplication(id: string, updates: Partial<Application>) {
  const applications = getApplications()
  const index = applications.findIndex((app) => app.id === id)
  if (index !== -1) {
    applications[index] = { ...applications[index], ...updates }
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(applications))
    }
  }
}

export function getApplicationById(id: string): Application | null {
  const applications = getApplications()
  return applications.find((app) => app.id === id) || null
}

// Payment management
export function getPayments(): Payment[] {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem(STORAGE_KEYS.PAYMENTS)
  return data ? JSON.parse(data) : []
}

export function savePayment(payment: Payment) {
  const payments = getPayments()
  payments.push(payment)
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEYS.PAYMENTS, JSON.stringify(payments))
  }
}

export function updatePayment(id: string, updates: Partial<Payment>) {
  const payments = getPayments()
  const index = payments.findIndex((payment) => payment.id === id)
  if (index !== -1) {
    payments[index] = { ...payments[index], ...updates }
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.PAYMENTS, JSON.stringify(payments))
    }
  }
}

export function getPaymentById(id: string): Payment | null {
  const payments = getPayments()
  return payments.find((payment) => payment.id === id) || null
}

// Course data
export function getCourses(): Course[] {
  return []
}

export function getCourseById(id: number): Course | null {
  const courses = getCourses()
  return courses.find((course) => course.id === id) || null
}
