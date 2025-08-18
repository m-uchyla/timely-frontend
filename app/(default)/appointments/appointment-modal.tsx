"use client";

import { useState, FormEvent } from 'react';
import ModalBasic from '@/components/modal-basic';
import { ApiError, createAppointment } from '@/lib/api';
import { validateAppointmentFormData } from '@/lib/validation/appointment';

interface AppointmentModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onAppointmentCreated: () => void;
}

export default function AppointmentModal({ isOpen, setIsOpen, onAppointmentCreated }: AppointmentModalProps) {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    serviceId: '',
    serviceName: '',
    employeeId: '',
    employeeName: '',
    notes: '',
    organizationId: 1
  });
  
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateAppointment = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormErrors([]);
    setIsSubmitting(true);

    try {
      // Validate form
      const validation = validateAppointmentFormData(formData);
      if (!validation.isValid) {
        setFormErrors(validation.errors);
        return;
      }

      // Prepare appointment data
      const appointmentData = {
        date: new Date(formData.date),
        startTime: formData.time,
        endTime: '', // Will be calculated on backend based on service duration
        status: 'pending' as const,
        notes: formData.notes,
        price: 0, // Will be set from service price
        employee: {
          id: parseInt(formData.employeeId) || 1, // Default employee ID
          name: formData.employeeName
        },
        service: {
          id: parseInt(formData.serviceId) || 1, // Default service ID
          name: formData.serviceName,
          description: '',
          durationMinutes: 60 // Default, should come from service
        },
        client: {
          id: 0, // Will be created if doesn't exist
          name: formData.clientName,
          email: formData.clientEmail,
          phone: formData.clientPhone
        }
      };

      await createAppointment(appointmentData);
      
      // Reset form and close modal
      resetForm();
      setIsOpen(false);
      
      // Notify parent component
      onAppointmentCreated();

    } catch (err) {
      if (err instanceof ApiError) {
        setFormErrors([err.message]);
      } else {
        setFormErrors(['An unexpected error occurred']);
      }
      console.error('Error creating appointment:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const resetForm = () => {
    setFormData({
      date: '',
      time: '',
      clientName: '',
      clientEmail: '',
      clientPhone: '',
      serviceId: '',
      serviceName: '',
      employeeId: '',
      employeeName: '',
      notes: '',
      organizationId: 1
    });
    setFormErrors([]);
  };

  const handleClose = () => {
    resetForm();
    setIsOpen(false);
  };

  return (
    <ModalBasic isOpen={isOpen} setIsOpen={setIsOpen} title="Dodaj rezerwację">
      {/* Modal content */}
      <form onSubmit={handleCreateAppointment}>
        <div className="px-5 py-4">
          {formErrors.length > 0 && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              <ul className="list-disc list-inside">
                {formErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="date">
                  Data <span className="text-red-500">*</span>
                </label>
                <input 
                  id="date" 
                  className="form-input w-full px-2 py-1" 
                  type="date" 
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="time">
                  Godzina <span className="text-red-500">*</span>
                </label>
                <input 
                  id="time" 
                  className="form-input w-full px-2 py-1" 
                  type="time" 
                  value={formData.time}
                  onChange={(e) => handleInputChange('time', e.target.value)}
                  required 
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="clientName">
                Imię i nazwisko klienta <span className="text-red-500">*</span>
              </label>
              <input 
                id="clientName" 
                className="form-input w-full px-2 py-1" 
                type="text" 
                value={formData.clientName}
                onChange={(e) => handleInputChange('clientName', e.target.value)}
                placeholder="np. Jan Kowalski"
                required 
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="clientEmail">
                  Email klienta <span className="text-red-500">*</span>
                </label>
                <input 
                  id="clientEmail" 
                  className="form-input w-full px-2 py-1" 
                  type="email" 
                  value={formData.clientEmail}
                  onChange={(e) => handleInputChange('clientEmail', e.target.value)}
                  placeholder="jan@example.com"
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="clientPhone">
                  Telefon klienta
                </label>
                <input 
                  id="clientPhone" 
                  className="form-input w-full px-2 py-1" 
                  type="tel" 
                  value={formData.clientPhone}
                  onChange={(e) => handleInputChange('clientPhone', e.target.value)}
                  placeholder="+48 123 456 789"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="serviceName">
                Usługa <span className="text-red-500">*</span>
              </label>
              <input 
                id="serviceName" 
                className="form-input w-full px-2 py-1" 
                type="text" 
                value={formData.serviceName}
                onChange={(e) => handleInputChange('serviceName', e.target.value)}
                placeholder="np. Masaż relaksacyjny"
                required 
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="employeeName">
                Pracownik <span className="text-red-500">*</span>
              </label>
              <input 
                id="employeeName" 
                className="form-input w-full px-2 py-1" 
                type="text" 
                value={formData.employeeName}
                onChange={(e) => handleInputChange('employeeName', e.target.value)}
                placeholder="np. Anna Nowak"
                required 
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="notes">
                Uwagi
              </label>
              <textarea 
                id="notes" 
                className="form-textarea w-full px-2 py-1" 
                rows={4}
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Dodatkowe informacje..."
              ></textarea>
            </div>
          </div>
        </div>
        
        {/* Modal footer */}
        <div className="px-5 py-4 border-t border-gray-200 dark:border-gray-700/60">
          <div className="flex flex-wrap justify-end space-x-2">
            <button
              type="button"
              className="btn-sm border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-gray-800 dark:text-gray-300"
              onClick={handleClose}
            >
              Anuluj
            </button>
            <button 
              type="submit"
              className="btn-sm bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Dodawanie...' : 'Dodaj rezerwację'}
            </button>
          </div>
        </div>
      </form>
    </ModalBasic>
  );
}
