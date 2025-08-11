export interface Organization {
  id: number
  name: string
  // Add other organization fields as needed
}

export interface Service {
  id: number
  name: string
  description?: string
  durationMinutes: number
  pausePeriodMinutes: number
  isActive: boolean
  createdAt: string | Date
  lastModifiedAt: string | Date
  cost?: string | number // Handle both string and number formats from backend
  organizationId: number
  organization?: Organization
}

export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
}

export interface ServicesResponse {
  services: Service[]
  total: number
  page: number
  limit: number
}
