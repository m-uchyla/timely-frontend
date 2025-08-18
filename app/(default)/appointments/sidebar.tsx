import ServiceCard from "../services/service-card";
import { Appointment } from '@/lib/types';
import { formatDateToYMD, formatTimeToHM } from '@/lib/utils';
import { ar } from "date-fns/locale";

interface SidebarProps {
  selectedAppointment?: Appointment | null;
}

// Helper functions for status display
const getStatusColor = (status: Appointment['status']): string => {
  const statusColors = {
    pending: 'bg-yellow-500',
    confirmed: 'bg-green-500',
    declined: 'bg-gray-500',
    cancelled: 'bg-red-500',
    archived: 'bg-gray-800'
  };
  return statusColors[status];
};

const getStatusText = (status: Appointment['status']): string => {
  const statusTexts = {
    pending: 'Oczekująca',
    confirmed: 'Potwierdzona',
    declined: 'Odrzucona',
    cancelled: 'Anulowana',
    archived: 'Zarchiwizowana'
  };
  return statusTexts[status];
};

export default function Sidebar({ selectedAppointment }: SidebarProps) {
  return (
    <div>
        <div className="lg:sticky lg:top-16 bg-linear-to-b from-gray-100 to-white dark:from-gray-800/30 dark:to-gray-900 lg:overflow-x-hidden lg:overflow-y-auto no-scrollbar lg:shrink-0 border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-gray-700/60 lg:w-[390px] lg:h-[calc(100dvh-64px)]">
          <div className="py-8 px-4 lg:px-8">
            <div className="max-w-sm mx-auto lg:max-w-none">

              <div className="text-gray-800 dark:text-gray-100 font-semibold text-center mb-6">
                {selectedAppointment ? 'Szczegóły rezerwacji' : 'Wybierz rezerwację'}
              </div>

              {selectedAppointment ? (
                <>
                  {/* Service Card for selected appointment */}
                  <div className="relative aspect-7/4 bg-linear-to-tr rounded-xl overflow-hidden">
                    <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-xl">
                      <div className="flex items-center mb-2">
                        <svg className="w-5 h-5 text-white mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                          <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                        </svg>
                        <div className="text-lg font-semibold">{selectedAppointment.service.name}</div>
                      </div>
                      <div className="text-sm opacity-90 mb-4">
                        {selectedAppointment.service.description || 'Brak opisu usługi'}
                      </div>
                      <div className="flex justify-between items-end">
                        <div>
                          <div className="text-xs opacity-75">Data</div>
                          <div className="text-sm font-medium">{formatDateToYMD(selectedAppointment.date)}</div>
                        </div>
                        <div>
                          <div className="text-xs opacity-75">Czas</div>
                          <div className="text-sm font-medium">
                            {formatTimeToHM(selectedAppointment.startTime)} - {formatTimeToHM(selectedAppointment.endTime)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="mt-4">
                    <ul>
                      <li className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700/60">
                        <div className="flex items-center text-sm">
                          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                          Klient
                        </div>
                        <div className="text-sm font-medium text-gray-800 dark:text-gray-100 ml-2">{selectedAppointment.client.name}</div>
                      </li>
                      <li className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700/60">
                        <div className="flex items-center text-sm">
                          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                          Email
                        </div>
                        <div className="text-sm font-medium text-gray-800 dark:text-gray-100 ml-2">{selectedAppointment.client.email}</div>
                      </li>
                      <li className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700/60">
                        <div className="flex items-center text-sm">
                          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                          </svg>
                          Telefon
                        </div>
                        <div className="text-sm font-medium text-gray-800 dark:text-gray-100 ml-2">{selectedAppointment.client.phone}</div>
                      </li>
                      <li className="mt-8 flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700/60">
                        <div className="flex items-center text-sm">
                          <svg className="w-4 h-4 text-blue-500 dark:text-blue-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/>
                          </svg>
                          Pracownik
                        </div>
                        <div className="text-sm font-medium text-gray-800 dark:text-gray-100 ml-2">{selectedAppointment.employee.name}</div>
                      </li>
                      <li className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700/60">
                        <div className="flex items-center text-sm">
                          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Status
                        </div>
                        <div className="flex items-center whitespace-nowrap">
                          <div className={`w-2 h-2 rounded-full mr-2 ${getStatusColor(selectedAppointment.status)}`} />
                          <div className="text-sm font-medium text-gray-800 dark:text-gray-100">{getStatusText(selectedAppointment.status)}</div>
                        </div>
                      </li>
                      {selectedAppointment.price && (
                        <li className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700/60">
                          <div className="flex items-center text-sm">
                            <svg className="w-4 h-4 text-green-500 dark:text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                            </svg>
                            Cena
                          </div>
                          <div className="text-sm font-medium text-gray-800 dark:text-gray-100 ml-2">{selectedAppointment.price} zł</div>
                        </li>
                      )}
                      {selectedAppointment.notes && (
                        <li className="mt-8 flex flex-col py-3 border-b border-gray-200 dark:border-gray-700/60">
                          <div className="flex items-center text-sm mb-2">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                            </svg>
                            Notatki
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">{selectedAppointment.notes}</div>
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col space-y-3 mt-6">
                    {selectedAppointment.status === 'pending' && (
                      <>
                        <button className="btn w-full bg-green-600 hover:bg-green-700 text-white">
                          <svg className="fill-current shrink-0" width="16" height="16" viewBox="0 0 16 16">
                            <path d="M12.5 2.5 5.5 9.5 3 7l-1.5 1.5L5.5 12.5 14 4z"/>
                          </svg>
                          <span className="ml-2">Potwierdź rezerwację</span>
                        </button>
                        <button className="btn w-full border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300">
                          <svg className="fill-current shrink-0" width="16" height="16" viewBox="0 0 16 16">
                            <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM4 7h8v2H4V7z"/>
                          </svg>
                          <span className="ml-2">Odrzuć rezerwację</span>
                        </button>
                      </>
                    )}
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="text-gray-500 dark:text-gray-400">
                    Kliknij na rezerwację, aby zobaczyć szczegóły
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
  );
}