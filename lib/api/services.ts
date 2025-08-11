import { Service, ServicesResponse } from '@/lib/types/service'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || (
  process.env.NODE_ENV === 'development' 
    ? 'http://localhost:3000/api' 
    : 'https://api.timelyapp.com'
)
const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN

// Custom error class for API errors
export class ApiError extends Error {
  status: number
  
  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

// Fetch services with pagination and filtering
export async function fetchServices(params?: {
  page?: number
  limit?: number
  search?: string
  category?: string
  type?: string
}): Promise<ServicesResponse> {
  const searchParams = new URLSearchParams()
  
  if (params?.page) searchParams.append('page', params.page.toString())
  if (params?.limit) searchParams.append('limit', params.limit.toString())
  if (params?.search) searchParams.append('search', params.search)
  if (params?.category) searchParams.append('category', params.category)
  if (params?.type) searchParams.append('type', params.type)

  const queryString = searchParams.toString()
  const endpoint = `/services/organization${queryString ? `?${queryString}` : ''}`

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(API_TOKEN && { 'Authorization': `Bearer ${API_TOKEN}` })
    },
    mode: 'cors',
    credentials: 'omit',
  })

  if (!response.ok) {
    throw new ApiError(
      `HTTP error! status: ${response.status}`,
      response.status
    )
  }

  const services = await response.json()
  
  // Since your backend returns the services array directly, we need to wrap it
  return {
    services: services || [],
    total: services?.length || 0,
    page: params?.page || 1,
    limit: params?.limit || 12
  }
}

// Create a new service
export async function createService(service: Omit<Service, 'id' | 'createdAt' | 'lastModifiedAt'>): Promise<Service> {
  const response = await fetch(`${API_BASE_URL}/services`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(API_TOKEN && { 'Authorization': `Bearer ${API_TOKEN}` })
    },
    mode: 'cors',
    credentials: 'omit',
    body: JSON.stringify(service),
  })

  if (!response.ok) {
    throw new ApiError(
      `HTTP error! status: ${response.status}`,
      response.status
    )
  }

  const newService = await response.json()
  return newService
}

// Update an existing service
export async function updateService(id: number, service: Partial<Service>): Promise<Service> {
  const response = await fetch(`${API_BASE_URL}/services/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(API_TOKEN && { 'Authorization': `Bearer ${API_TOKEN}` })
    },
    mode: 'cors',
    credentials: 'omit',
    body: JSON.stringify(service),
  })

  if (!response.ok) {
    throw new ApiError(
      `HTTP error! status: ${response.status}`,
      response.status
    )
  }

  const updatedService = await response.json()
  return updatedService
}

// Delete a service
export async function deleteService(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/services/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(API_TOKEN && { 'Authorization': `Bearer ${API_TOKEN}` })
    },
    mode: 'cors',
    credentials: 'omit',
  })

  if (!response.ok) {
    throw new ApiError(
      `HTTP error! status: ${response.status}`,
      response.status
    )
  }
}

// Get a single service by ID
export async function getService(id: number): Promise<Service> {
  const response = await fetch(`${API_BASE_URL}/services/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(API_TOKEN && { 'Authorization': `Bearer ${API_TOKEN}` })
    },
    mode: 'cors',
    credentials: 'omit',
  })

  if (!response.ok) {
    throw new ApiError(
      `HTTP error! status: ${response.status}`,
      response.status
    )
  }

  const service = await response.json()
  return service
}
