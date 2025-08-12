import { Service } from '@/lib/types/service'

// Validation functions
export function isValidService(data: any): data is Service {
  return (
    typeof data === 'object' &&
    data !== null &&
    typeof data.id === 'number' &&
    typeof data.name === 'string' &&
    (data.description === undefined || data.description === null || typeof data.description === 'string') &&
    typeof data.durationMinutes === 'number' &&
    typeof data.pausePeriodMinutes === 'number' &&
    typeof data.isActive === 'boolean' &&
    (data.createdAt === undefined || typeof data.createdAt === 'string' || data.createdAt instanceof Date) &&
    (data.lastModifiedAt === undefined || typeof data.lastModifiedAt === 'string' || data.lastModifiedAt instanceof Date) &&
    (data.cost === undefined || data.cost === null || typeof data.cost === 'string') &&
    typeof data.organizationId === 'number' &&
    (data.organization === undefined || typeof data.organization === 'object')
  )
}

export function validateServiceArray(data: any[]): Service[] {
  if (!Array.isArray(data)) {
    throw new Error('Expected an array of services')
  }

  const validServices: Service[] = []
  const errors: string[] = []

  data.forEach((item, index) => {
    if (isValidService(item)) {
      validServices.push(item)
    } else {
      errors.push(`Service at index ${index} is invalid`)
    }
  })

  if (errors.length > 0) {
    console.warn('Some services failed validation:', errors)
  }

  return validServices
}

export function validateServiceForm(formData: any): {
  isValid: boolean
  errors: string[]
  data?: Omit<Service, 'id' | 'createdAt' | 'lastModifiedAt'>
} {
  const errors: string[] = []

  if (!formData.name || typeof formData.name !== 'string' || formData.name.trim().length === 0) {
    errors.push('Service name is required')
  }

  if (formData.description && typeof formData.description !== 'string') {
    errors.push('Description must be a string')
  }

  if (!formData.durationMinutes || typeof formData.durationMinutes !== 'number' || formData.durationMinutes <= 0) {
    errors.push('Duration in minutes is required and must be a positive number')
  }

  if (formData.pausePeriodMinutes !== undefined && (typeof formData.pausePeriodMinutes !== 'number' || formData.pausePeriodMinutes < 0)) {
    errors.push('Pause period must be a non-negative number')
  }

  if (formData.isActive !== undefined && typeof formData.isActive !== 'boolean') {
    errors.push('isActive must be a boolean')
  }

  if (formData.cost !== undefined && formData.cost !== null && (typeof formData.cost !== 'number' || formData.cost < 0)) {
    errors.push('Cost must be a non-negative number')
  }

  if (!formData.organizationId || typeof formData.organizationId !== 'number') {
    errors.push('Organization ID is required')
  }

  if (errors.length === 0) {
    return {
      isValid: true,
      errors: [],
      data: {
        name: formData.name.trim(),
        description: formData.description?.trim() || null,
        durationMinutes: formData.durationMinutes,
        pausePeriodMinutes: formData.pausePeriodMinutes || 0,
        isActive: formData.isActive !== undefined ? formData.isActive : true,
        cost: formData.cost || null,
        organizationId: formData.organizationId,
        organization: formData.organization
      }
    }
  }

  return {
    isValid: false,
    errors
  }
}
