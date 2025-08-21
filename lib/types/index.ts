export * from './service';
export * from './employee';
export * from './appointment';
export * from './panel-info';

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

export type Pagination = {
  page: number;
  totalPages: number;
  limit: number;
  total: number;
  items: number;
  hasNext: boolean;
  hasPrevious: boolean;
};

export type PanelResponse<T> = {
  data: T;
  pagination: Pagination;
};