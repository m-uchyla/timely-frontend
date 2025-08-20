import { Appointment } from '@/lib/types/appointment'

// Validation functions
export function isValidAppointment(data: any): data is Appointment {
  return (
    typeof data === 'object' &&
    data !== null &&
    typeof data.id === 'number' &&
    (typeof data.date === 'string' || data.date instanceof Date) &&
    typeof data.startTime === 'string' &&
    typeof data.endTime === 'string' &&
    typeof data.status === 'string' &&
    ['pending', 'confirmed', 'declined', 'cancelled'].includes(data.status) &&
    (data.notes === undefined || data.notes === null || typeof data.notes === 'string') &&
    (data.cancellationReason === undefined || data.cancellationReason === null || typeof data.cancellationReason === 'string') &&
    (data.price === undefined || data.price === null || typeof data.price === 'number') &&
    // Employee validation
    typeof data.employee === 'object' &&
    data.employee !== null &&
    typeof data.employee.id === 'number' &&
    typeof data.employee.name === 'string' &&
    // Service validation
    typeof data.service === 'object' &&
    data.service !== null &&
    typeof data.service.id === 'number' &&
    typeof data.service.name === 'string' &&
    (data.service.description === undefined || data.service.description === null || typeof data.service.description === 'string') &&
    typeof data.service.durationMinutes === 'number' &&
    // Client validation
    typeof data.client === 'object' &&
    data.client !== null &&
    typeof data.client.id === 'number' &&
    typeof data.client.name === 'string' &&
    typeof data.client.email === 'string' &&
    typeof data.client.phone === 'string'
  )
}

export function validateAppointmentArray(data: any[]): Appointment[] {
  if (!Array.isArray(data)) {
    throw new Error('Expected an array of appointments')
  }

  const validAppointments: Appointment[] = []
  const errors: string[] = []

  data.forEach((item, index) => {
    if (isValidAppointment(item)) {
      validAppointments.push(item)
    } else {
      errors.push(`Appointment at index ${index} is invalid`)
    }
  })

  if (errors.length > 0) {
    console.warn('Some appointments failed validation:', errors)
  }

  return validAppointments
}

export function validateAppointmentForm(formData: any): {
  isValid: boolean
  errors: string[]
  data?: Omit<Appointment, 'id'>
} {
  const errors: string[] = []

  // Date validation
  if (!formData.date) {
    errors.push('Appointment date is required')
  } else if (typeof formData.date !== 'string' && !(formData.date instanceof Date)) {
    errors.push('Date must be a valid date')
  }

  // Time validation
  if (!formData.startTime || typeof formData.startTime !== 'string' || formData.startTime.trim().length === 0) {
    errors.push('Start time is required')
  }

  if (!formData.endTime || typeof formData.endTime !== 'string' || formData.endTime.trim().length === 0) {
    errors.push('End time is required')
  }

  // Status validation
  if (!formData.status || !['pending', 'confirmed', 'declined', 'cancelled', 'archived'].includes(formData.status)) {
    errors.push('Status must be one of: pending, confirmed, declined, cancelled, archived')
  }

  // Optional fields validation
  if (formData.notes && typeof formData.notes !== 'string') {
    errors.push('Notes must be a string')
  }

  if (formData.cancellationReason && typeof formData.cancellationReason !== 'string') {
    errors.push('Cancellation reason must be a string')
  }

  if (formData.price !== undefined && formData.price !== null && (typeof formData.price !== 'number' || formData.price < 0)) {
    errors.push('Price must be a non-negative number')
  }

  // Employee validation
  if (!formData.employee || typeof formData.employee !== 'object') {
    errors.push('Employee information is required')
  } else {
    if (!formData.employee.id || typeof formData.employee.id !== 'number') {
      errors.push('Employee ID is required')
    }
    if (!formData.employee.name || typeof formData.employee.name !== 'string' || formData.employee.name.trim().length === 0) {
      errors.push('Employee name is required')
    }
  }

  // Service validation
  if (!formData.service || typeof formData.service !== 'object') {
    errors.push('Service information is required')
  } else {
    if (!formData.service.id || typeof formData.service.id !== 'number') {
      errors.push('Service ID is required')
    }
    if (!formData.service.name || typeof formData.service.name !== 'string' || formData.service.name.trim().length === 0) {
      errors.push('Service name is required')
    }
    if (formData.service.description && typeof formData.service.description !== 'string') {
      errors.push('Service description must be a string')
    }
    if (!formData.service.durationMinutes || typeof formData.service.durationMinutes !== 'number' || formData.service.durationMinutes <= 0) {
      errors.push('Service duration is required and must be a positive number')
    }
  }

  // Client validation
  if (!formData.client || typeof formData.client !== 'object') {
    errors.push('Client information is required')
  } else {
    if (!formData.client.id || typeof formData.client.id !== 'number') {
      errors.push('Client ID is required')
    }
    if (!formData.client.name || typeof formData.client.name !== 'string' || formData.client.name.trim().length === 0) {
      errors.push('Client name is required')
    }
    if (!formData.client.email || typeof formData.client.email !== 'string' || formData.client.email.trim().length === 0) {
      errors.push('Client email is required')
    }
    if (!formData.client.phone || typeof formData.client.phone !== 'string' || formData.client.phone.trim().length === 0) {
      errors.push('Client phone is required')
    }
  }

  if (errors.length === 0) {
    return {
      isValid: true,
      errors: [],
      data: {
        isArchived: formData.isArchived,
        date: formData.date,
        startTime: formData.startTime.trim(),
        endTime: formData.endTime.trim(),
        status: formData.status,
        notes: formData.notes?.trim() || undefined,
        cancellationReason: formData.cancellationReason?.trim() || undefined,
        price: formData.price || undefined,
        employee: {
          id: formData.employee.id,
          name: formData.employee.name.trim()
        },
        service: {
          id: formData.service.id,
          name: formData.service.name.trim(),
          description: formData.service.description?.trim() || undefined,
          durationMinutes: formData.service.durationMinutes
        },
        client: {
          id: formData.client.id,
          name: formData.client.name.trim(),
          email: formData.client.email.trim(),
          phone: formData.client.phone.trim()
        }
      }
    }
  }

  return {
    isValid: false,
    errors
  }
}

// Helper function to validate appointment status transitions
export function isValidStatusTransition(currentStatus: Appointment['status'], newStatus: Appointment['status']): boolean {
  const validTransitions: Record<Appointment['status'], Appointment['status'][]> = {
    pending: ['confirmed', 'declined', 'cancelled'],
    confirmed: ['cancelled'],
    declined: ['pending'],
    cancelled: [],
  }

  return validTransitions[currentStatus]?.includes(newStatus) || false
}

// Helper function to validate appointment time conflicts
export function hasTimeConflict(
  appointment1: Pick<Appointment, 'date' | 'startTime' | 'endTime'>,
  appointment2: Pick<Appointment, 'date' | 'startTime' | 'endTime'>
): boolean {
  // Convert dates to comparable format
  const date1 = appointment1.date instanceof Date ? appointment1.date : new Date(appointment1.date)
  const date2 = appointment2.date instanceof Date ? appointment2.date : new Date(appointment2.date)

  // If different dates, no conflict
  if (date1.toDateString() !== date2.toDateString()) {
    return false
  }

  // Compare times (assuming format is HH:MM)
  const start1 = appointment1.startTime
  const end1 = appointment1.endTime
  const start2 = appointment2.startTime
  const end2 = appointment2.endTime

  // Check if times overlap
  return !(end1 <= start2 || end2 <= start1)
}

// Simple form validation for appointment creation
export function validateAppointmentFormData(formData: {
  date: string
  time: string
  clientName: string
  clientEmail: string
  clientPhone: string
  serviceName: string
  employeeName: string
  notes: string
}): {
  isValid: boolean
  errors: string[]
} {
  const errors: string[] = []

  // Date validation
  if (!formData.date || formData.date.trim().length === 0) {
    errors.push('Data jest wymagana')
  } else {
    const appointmentDate = new Date(formData.date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    if (appointmentDate < today) {
      errors.push('Data nie może być z przeszłości')
    }
  }

  // Time validation
  if (!formData.time || formData.time.trim().length === 0) {
    errors.push('Godzina jest wymagana')
  }

  // Client validation
  if (!formData.clientName || formData.clientName.trim().length === 0) {
    errors.push('Imię i nazwisko klienta jest wymagane')
  }

  if (!formData.clientEmail || formData.clientEmail.trim().length === 0) {
    errors.push('Email klienta jest wymagany')
  } else {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.clientEmail)) {
      errors.push('Email klienta ma nieprawidłowy format')
    }
  }

  // Service validation
  if (!formData.serviceName || formData.serviceName.trim().length === 0) {
    errors.push('Nazwa usługi jest wymagana')
  }

  // Employee validation
  if (!formData.employeeName || formData.employeeName.trim().length === 0) {
    errors.push('Pracownik jest wymagany')
  }

  // Phone validation (optional, but if provided should be valid)
  if (formData.clientPhone && formData.clientPhone.trim().length > 0) {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{9,}$/
    if (!phoneRegex.test(formData.clientPhone)) {
      errors.push('Numer telefonu ma nieprawidłowy format')
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}
