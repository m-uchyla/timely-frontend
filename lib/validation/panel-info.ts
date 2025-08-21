import { PanelInfo } from '@/lib/types/panel-info'

// Validation functions
export function isValidPanelInfo(data: any): data is PanelInfo {
  return (
    typeof data === 'object' &&
    data !== null &&
    typeof data.userID === 'number' &&
    typeof data.firstName === 'string' &&
    typeof data.lastName === 'string' &&
    typeof data.organizationID === 'number' &&
    typeof data.organizationName === 'string' &&
    typeof data.notificationsNumber === 'number' &&
    data.notificationsNumber >= 0 &&
    typeof data.pendingNumber === 'number' &&
    data.pendingNumber >= 0
  )
}

export function validatePanelInfo(data: any): {
  isValid: boolean
  errors: string[]
  data?: PanelInfo
} {
  const errors: string[] = []

  // User ID validation
  if (!data.userID || typeof data.userID !== 'number' || data.userID <= 0) {
    errors.push('User ID is required and must be a positive number')
  }

  // First name validation
  if (!data.firstName || typeof data.firstName !== 'string' || data.firstName.trim().length === 0) {
    errors.push('First name is required')
  }

  // Last name validation
  if (!data.lastName || typeof data.lastName !== 'string' || data.lastName.trim().length === 0) {
    errors.push('Last name is required')
  }

  // Organization ID validation
  if (!data.organizationID || typeof data.organizationID !== 'number' || data.organizationID <= 0) {
    errors.push('Organization ID is required and must be a positive number')
  }

  // Organization name validation
  if (!data.organizationName || typeof data.organizationName !== 'string' || data.organizationName.trim().length === 0) {
    errors.push('Organization name is required')
  }

  // Notifications number validation
  if (data.notificationsNumber === undefined || data.notificationsNumber === null || typeof data.notificationsNumber !== 'number' || data.notificationsNumber < 0) {
    errors.push('Notifications number is required and must be a non-negative number')
  }

  // Pending number validation
  if (data.pendingNumber === undefined || data.pendingNumber === null || typeof data.pendingNumber !== 'number' || data.pendingNumber < 0) {
    errors.push('Pending number is required and must be a non-negative number')
  }

  if (errors.length === 0) {
    return {
      isValid: true,
      errors: [],
      data: {
        userID: data.userID,
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        organizationID: data.organizationID,
        organizationName: data.organizationName.trim(),
        notificationsNumber: data.notificationsNumber,
        pendingNumber: data.pendingNumber
      }
    }
  }

  return {
    isValid: false,
    errors
  }
}

// Helper function to get full name
export function getFullName(panelInfo: PanelInfo): string {
  return `${panelInfo.firstName} ${panelInfo.lastName}`.trim()
}

// Helper function to check if user has notifications
export function hasNotifications(panelInfo: PanelInfo): boolean {
  return panelInfo.notificationsNumber > 0
}

// Helper function to check if user has pending items
export function hasPendingItems(panelInfo: PanelInfo): boolean {
  return panelInfo.pendingNumber > 0
}
