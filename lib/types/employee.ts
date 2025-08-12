import { Organization } from "./";

export interface Employee {
  id: number
  firstName: string
  lastName: string
  isActive: boolean
  organizationId: number
  organization?: Organization
}

export interface EmployeesResponse {
  employees: Employee[]
  total: number
  page: number
  limit: number
}
