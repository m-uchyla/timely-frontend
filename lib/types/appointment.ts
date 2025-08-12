import { Employee, Service } from ".";

export interface Appointment {
  id: number
  appointmentDate: Date | string
  startTime: string
  endTime: string
  status: 'pending' | 'confirmed' | 'declined' | 'cancelled'
  notes?: string
  cancellationReason?: string
  price?: string | number // Handle both string and number formats from backend
  employeeId: number
  employee?: Employee
  serviceId: number
  service?: Service

}

export interface AppointmentsResponse {
  appointments: Appointment[]
  total: number
  page: number
  limit: number
}
