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
  if (appointmentsData && Array.isArray(appointmentsData.data)) {
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

// Create a new appointment
export async function createAppointment(appointment: Omit<Appointment, 'id'>): Promise<Appointment> {
  const response = await fetch(`${API_BASE_URL}/panel/appointments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(API_TOKEN && { 'Authorization': `Bearer ${API_TOKEN}` })
    },
    mode: 'cors',
    credentials: 'omit',
    body: JSON.stringify(appointment),
  })

  if (!response.ok) {
    throw new ApiError(
      `HTTP error! status: ${response.status}`,
      response.status
    )
  }

  const newAppointmentData = await response.json()
  
  // Validate the new appointment data
  if (!isValidAppointment(newAppointmentData)) {
    throw new ApiError('Invalid appointment data received from server', 422)
  }

  return newAppointmentData
}

// Update an existing appointment
export async function updateAppointment(id: number, appointment: Partial<Appointment>): Promise<Appointment> {
  const response = await fetch(`${API_BASE_URL}/panel/appointments/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(API_TOKEN && { 'Authorization': `Bearer ${API_TOKEN}` })
    },
    mode: 'cors',
    credentials: 'omit',
    body: JSON.stringify(appointment),
  })

  if (!response.ok) {
    throw new ApiError(
      `HTTP error! status: ${response.status}`,
      response.status
    )
  }

  const updatedAppointmentData = await response.json()
  
  // Validate the updated appointment data
  if (!isValidAppointment(updatedAppointmentData)) {
    throw new ApiError('Invalid appointment data received from server', 422)
  }

  return updatedAppointmentData
}

// Update appointment status
export async function updateAppointmentStatus(id: number, status: Appointment['status'], cancellationReason?: string): Promise<Appointment> {
  const updateData: Partial<Appointment> = { status }
  if (cancellationReason) {
    updateData.cancellationReason = cancellationReason
  }

  return updateAppointment(id, updateData)
}

// Delete an appointment
export async function deleteAppointment(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/panel/appointments/${id}`, {
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
