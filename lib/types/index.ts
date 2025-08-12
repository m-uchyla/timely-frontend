export * from './service';
export * from './employee';
export * from './appointment';

export interface Organization {
  id: number
  name: string
  // Add other organization fields as needed
}

export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
}