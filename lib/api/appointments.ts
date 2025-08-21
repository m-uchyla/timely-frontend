import { Appointment, PanelResponse } from '../types'
import { API_BASE_URL, API_TOKEN, ApiError } from '.'
import { validateAppointmentArray, isValidAppointment } from '../validation'

// Fetch appointments with pagination and filtering
export async function fetchAppointments(params?: {
  page?: number
  limit?: number
  search?: string
  status?: string
  date?: string
}): Promise<PanelResponse<Appointment[]>> {
  const searchParams = new URLSearchParams()
  
  if (params?.page) searchParams.append('page', params.page.toString())
  if (params?.limit) searchParams.append('limit', params.limit.toString())
  if (params?.date) searchParams.append('date', params.date)
  
  // Handle status filtering
  if (params?.status) {
    switch (params.status) {
      case 'today':
        searchParams.append('status', 'pending,confirmed')
        break
      case 'archived':
        searchParams.append('archivedOnly', 'true')
        break
      default:
        searchParams.append('status', params.status)
        break
    }
  }

  const queryString = searchParams.toString()
  const endpoint = `/panel/appointments${queryString ? `?${queryString}` : ''}`

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

  const appointmentsData = await response.json()

  // Validate the response structure
  // if (appointmentsData && Array.isArray(appointmentsData.data)) {
  //   appointmentsData.data = validateAppointmentArray(appointmentsData.data)
  // }

  // Sort appointments
  if (appointmentsData && Array.isArray(appointmentsData.data)) {
    appointmentsData.data = appointmentsData.data.sort((a: Appointment, b: Appointment) => {
      // First priority: Push archived appointments to the end
      if (a.isArchived !== b.isArchived) {
        if (a.isArchived) return 1
        if (b.isArchived) return -1
      }
      
      // Second priority: If status filter is 'pending', sort by date and time (ascending)
      if (params?.status === 'pending') {
        // Convert dates to comparable format
        const dateA = new Date(a.date)
        const dateB = new Date(b.date)
        
        // First sort by date
        if (dateA.getTime() !== dateB.getTime()) {
          return dateA.getTime() - dateB.getTime()
        }
        
        // If dates are the same, sort by start time
        const timeA = a.startTime
        const timeB = b.startTime
        return timeA.localeCompare(timeB)
      }
      
      // Default: maintain original order for other cases
      return 0
    })
  }



  return appointmentsData
}

// Get a single appointment by ID
export async function getAppointment(id: number): Promise<Appointment> {
  const response = await fetch(`${API_BASE_URL}/panel/appointments/${id}`, {
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

  const appointmentData = await response.json()
  
  // Validate the appointment data
  if (!isValidAppointment(appointmentData)) {
    throw new ApiError('Invalid appointment data received from server', 422)
  }

  return appointmentData
}

// Confirm an appointment (change status from pending to confirmed)
export async function confirmAppointment(id: number): Promise<{ success: boolean; message: string }> {
  const response = await fetch(`${API_BASE_URL}/panel/appointments/${id}/confirm`, {
    method: 'PATCH',
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

  return await response.json()
}

// Decline an appointment (change status from pending to declined)
export async function declineAppointment(id: number, cancellationReason?: string): Promise<{ success: boolean; message: string }> {
  const response = await fetch(`${API_BASE_URL}/panel/appointments/${id}/decline`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(API_TOKEN && { 'Authorization': `Bearer ${API_TOKEN}` })
    },
    mode: 'cors',
    credentials: 'omit',
    body: cancellationReason ? JSON.stringify({ cancellationReason }) : undefined,
  })

  if (!response.ok) {
    throw new ApiError(
      `HTTP error! status: ${response.status}`,
      response.status
    )
  }

  return await response.json()
}