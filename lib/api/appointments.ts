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
  if (params?.status && params.status !== 'today') searchParams.append('status', params.status)
  if(params?.status === 'today'){
    searchParams.append('status', 'pending,confirmed,archived')
  } 
  if(params?.date) {
    searchParams.append('date', params.date)
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

  // Sort appointments to push archived ones to the end
  if ((params && params.status) && appointmentsData && Array.isArray(appointmentsData.data)) {
    appointmentsData.data = appointmentsData.data.sort((a: Appointment, b: Appointment) => {
      // If both are archived or both are not archived, maintain original order
      if ((a.status === 'archived') === (b.status === 'archived')) {
        return 0
      }
      // Push archived appointments to the end
      if (a.status === 'archived') return 1
      if (b.status === 'archived') return -1
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