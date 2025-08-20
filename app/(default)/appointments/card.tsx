import { Appointment } from '@/lib/types';
import { formatDateToYMD, formatTimeToHM } from '@/lib/utils';

interface CardProps {
  appointment: Appointment;
  isSelected?: boolean;
  onSelect?: () => void;
}

export default function Card({ appointment, isSelected = false, onSelect }: CardProps) {
   const statusColor = new Map([
    ['pending', `${appointment.isArchived ? 'bg-gray-500/20  text-yellow-700/30' : 'bg-yellow-500/20  text-yellow-700'}`],
    ['confirmed', `${appointment.isArchived ? 'bg-gray-500/20  text-green-700/30' : 'bg-green-500/20  text-green-700'}`],
    ['declined', `${appointment.isArchived ? 'bg-gray-500/20  text-orange-400/30' : 'bg-orange-500/20  text-orange-400'}`],
    ['cancelled', `${appointment.isArchived ? 'bg-gray-500/20  text-red-500/30' : 'bg-red-500/20  text-red-700'}`],
  ]);
  const statusToText = new Map([
    ['pending', 'Oczekująca'],
    ['confirmed', 'Aktywna'],
    ['declined', 'Odrzucona'],
    ['cancelled', 'Anulowana'],
  ]);
  return (<label className="relative block cursor-pointer text-left w-full bg-white dark:bg-gray-900">
            <input 
              type="radio" 
              name="radio-buttons" 
              className="peer sr-only" 
              checked={isSelected}
              onChange={onSelect}
            />
            <div className="p-4 rounded-lg dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 shadow-sm transition">
              <div className="grid grid-cols-12 items-center gap-x-3">
                {/* Date & Time */}
                <div className="col-span-2 text-left">
                  <div className="text-sm font-medium text-gray-800 dark:text-gray-100">
                    {formatDateToYMD(appointment.date)}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {formatTimeToHM(appointment.startTime)} - {formatTimeToHM(appointment.endTime)}
                  </div>
                </div>
                
                {/* Client */}
                <div className="col-span-2 text-left">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    <div className="text-sm font-medium text-gray-800 dark:text-gray-100 truncate">
                      {appointment.client.name}
                    </div>
                  </div>
                </div>
                
                {/* Service */}
                <div className="col-span-3 text-left">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-purple-500 dark:text-purple-400 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                      <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                    </svg>
                    <div className="text-sm font-medium text-gray-800 dark:text-gray-100 truncate">
                      {appointment.service.name}
                    </div>
                  </div>
                </div>
                
                {/* Employee */}
                <div className="col-span-2 text-left">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-blue-500 dark:text-blue-400 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/>
                    </svg>
                    <div className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {appointment.employee.name}
                    </div>
                  </div>
                </div>
                
                {/* Price */}
                <div className="col-span-1 text-left">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 dark:text-green-400 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                    </svg>
                    <div className="text-sm font-medium text-gray-800 dark:text-gray-100">
                      {appointment.price ? `${appointment.price} zł` : '-'}
                    </div>
                  </div>
                </div>
                
                {/* Status */}
                <div className="col-span-2 text-right">
                  <div className={`text-xs inline-flex font-medium ${statusColor.get(appointment.status)} rounded-full px-2.5 py-1`}>
                    {statusToText.get(appointment.status)}
                  </div>
                </div>
              </div>
            </div>
            <div
              className="absolute inset-0 border-2 border-transparent peer-checked:border-violet-400 dark:peer-checked:border-violet-500 rounded-lg pointer-events-none"
              aria-hidden="true"
            />
          </label>)
}