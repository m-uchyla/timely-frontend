export * from './employees';
export * from './services';
export * from './appointments';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || (
  process.env.NODE_ENV === 'development' 
    ? 'http://localhost:3000/api' 
    : 'https://api.timelyapp.com'
)
export const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN

// Custom error class for API errors
export class ApiError extends Error {
  status: number
  
  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}