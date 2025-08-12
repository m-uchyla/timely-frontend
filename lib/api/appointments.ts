import { Appointment, AppointmentsResponse } from '../types'
import { API_BASE_URL, API_TOKEN, ApiError } from '.'

// Fetch appointments with pagination and filtering
export async function fetchAppointments(params?: {
  page?: number
  limit?: number
  search?: string
  status?: string
}): Promise<AppointmentsResponse> {
  const searchParams = new URLSearchParams()
  
  if (params?.page) searchParams.append('page', params.page.toString())
  if (params?.limit) searchParams.append('limit', params.limit.toString())
  if (params?.search) searchParams.append('search', params.search)
  if (params?.status) searchParams.append('status', params.status)

  const queryString = searchParams.toString()
  const endpoint = `/appointments${queryString ? `?${queryString}` : ''}`

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

  const appointments = await response.json()

  // Since your backend returns the appointments array directly, we need to wrap it
  return {
    appointments: appointments || [],
    total: appointments?.length || 0,
    page: params?.page || 1,
    limit: params?.limit || 12
  }
}

// // Create a new service
// export async function createService(service: Omit<Service, 'id' | 'createdAt' | 'lastModifiedAt'>): Promise<Service> {
//   const response = await fetch(`${API_BASE_URL}/services`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json',
//       ...(API_TOKEN && { 'Authorization': `Bearer ${API_TOKEN}` })
//     },
//     mode: 'cors',
//     credentials: 'omit',
//     body: JSON.stringify(service),
//   })

//   if (!response.ok) {
//     throw new ApiError(
//       `HTTP error! status: ${response.status}`,
//       response.status
//     )
//   }

//   const newService = await response.json()
//   return newService
// }

// // Update an existing service
// export async function updateService(id: number, service: Partial<Service>): Promise<Service> {
//   const response = await fetch(`${API_BASE_URL}/services/${id}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json',
//       ...(API_TOKEN && { 'Authorization': `Bearer ${API_TOKEN}` })
//     },
//     mode: 'cors',
//     credentials: 'omit',
//     body: JSON.stringify(service),
//   })

//   if (!response.ok) {
//     throw new ApiError(
//       `HTTP error! status: ${response.status}`,
//       response.status
//     )
//   }

//   const updatedService = await response.json()
//   return updatedService
// }

// // Delete a service
// export async function deleteService(id: number): Promise<void> {
//   const response = await fetch(`${API_BASE_URL}/services/${id}`, {
//     method: 'DELETE',
//     headers: {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json',
//       ...(API_TOKEN && { 'Authorization': `Bearer ${API_TOKEN}` })
//     },
//     mode: 'cors',
//     credentials: 'omit',
//   })

//   if (!response.ok) {
//     throw new ApiError(
//       `HTTP error! status: ${response.status}`,
//       response.status
//     )
//   }
// }

// // Get a single service by ID
// export async function getService(id: number): Promise<Service> {
//   const response = await fetch(`${API_BASE_URL}/services/${id}`, {
//     headers: {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json',
//       ...(API_TOKEN && { 'Authorization': `Bearer ${API_TOKEN}` })
//     },
//     mode: 'cors',
//     credentials: 'omit',
//   })

//   if (!response.ok) {
//     throw new ApiError(
//       `HTTP error! status: ${response.status}`,
//       response.status
//     )
//   }

//   const service = await response.json()
//   return service
// }
