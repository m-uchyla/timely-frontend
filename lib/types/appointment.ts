export type Appointment = {
  id: number;
  date: Date;
  startTime: string;
  endTime: string;
  status: 'pending' | 'confirmed' | 'declined' | 'cancelled';
  notes?: string;
  cancellationReason?: string;
  price?: number;
  employee: {
    id: number;
    name: string;
  };
  service: {
    id: number;
    name: string;
    description?: string;
    durationMinutes: number;
  };
  client: {
    id: number;
    name: string;
    email: string;
    phone: string;
  };
};
