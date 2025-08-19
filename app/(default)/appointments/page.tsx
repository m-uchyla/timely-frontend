"use client";

import Card from './card';
import Sidebar from './sidebar';
import AppointmentModal from './appointment-modal';
import { Appointment } from '@/lib/types';
import { ApiError, fetchAppointments } from '@/lib/api';
import { useEffect, useState } from 'react';

export default function CreditCards() {

  const [appointmentModalOpen, setAppointmentModalOpen] = useState<boolean>(false)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  
  // Pagination and filtering state
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [status, setStatus] = useState('today')
  const [limit, setLimit] = useState(10)
  
      // Load appointments on component mount and when filters change
      useEffect(() => {
        setSelectedAppointment(null) // Clear selection when filters change
        setCurrentPage(1) // Reset to first page when filters change
        loadAppointments()
      }, [searchQuery, status, limit])

      useEffect(() => {
        loadAppointments()
      }, [currentPage])

      const loadAppointments = async () => {
        try {
          setLoading(true)
          setError(null)

          const response = await fetchAppointments({
            page: currentPage,
            limit: limit,
            search: searchQuery || undefined,
            status: status || undefined,
            date: status === 'today' ? new Date().toISOString().split('T')[0] : undefined
          })

          setAppointments(response.data)
        } catch (err) {
          if (err instanceof ApiError) {
            setError(`Nie udało się załadować rezerwacji. Prosimy o kontakt z supportem.`)
          } else {
            console.log(err)
            setError('Nie udało się załadować rezerwacji. Prosimy o kontakt z supportem.')
          }
          console.error('Error loading appointments:', err)
        } finally {
          setLoading(false)
        }
      }

  const handleAppointmentCreated = async () => {
    await loadAppointments()
  }

  return (
    <div className="lg:relative lg:flex bg-gray-100 dark:bg-gray-900">

      {/* Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">

        {/* Page header */}
        <div className="sm:flex sm:justify-between sm:items-center mb-5">

          {/* Left: Title */}
          <div className="mb-4 sm:mb-0">
            <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Rezerwacje</h1>
          </div>
        </div>

        {/* Filters and Pagination */}
        <div className="mb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Filter Buttons */}
          <div className="flex-1">
            <ul className="flex flex-wrap -m-1">
              <li className="m-1">
                <button 
                  onClick={() => setStatus('')}
                  className={`inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border transition ${
                    status === '' 
                      ? 'border-transparent shadow-sm bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-800' 
                      : 'border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 shadow-sm bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                  }`}
                >
                  Wszystkie
                </button>
              </li>
              <li className="m-1">
                <button 
                  onClick={() => setStatus('today')}
                  className={`inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border transition ${
                    status === 'today' 
                      ? 'border-transparent shadow-sm bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-800' 
                      : 'border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 shadow-sm bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                  }`}
                >
                  Dzisiejsze
                </button>
              </li>
              <li className="m-1">
                <button 
                  onClick={() => setStatus('pending')}
                  className={`inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border transition ${
                    status === 'pending' 
                      ? 'border-transparent shadow-sm bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-800' 
                      : 'border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 shadow-sm bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                  }`}
                >
                  Oczekujące
                </button>
              </li>
              <li className="m-1">
                <button 
                  onClick={() => setStatus('confirmed')}
                  className={`inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border transition ${
                    status === 'confirmed' 
                      ? 'border-transparent shadow-sm bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-800' 
                      : 'border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 shadow-sm bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                  }`}
                >
                  Zaakceptowane
                </button>
              </li>
              <li className="m-1">
                <button 
                  onClick={() => setStatus('declined')}
                  className={`inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border transition ${
                    status === 'declined' 
                      ? 'border-transparent shadow-sm bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-800' 
                      : 'border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 shadow-sm bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                  }`}
                >
                  Odrzucone
                </button>
              </li>
              <li className="m-1">
                <button 
                  onClick={() => setStatus('cancelled')}
                  className={`inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border transition ${
                    status === 'cancelled' 
                      ? 'border-transparent shadow-sm bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-800' 
                      : 'border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 shadow-sm bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                  }`}
                >
                  Anulowane
                </button>
              </li>
              <li className="m-1">
                <button 
                  onClick={() => setStatus('archived')}
                  className={`inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border transition ${
                    status === 'archived' 
                      ? 'border-transparent shadow-sm bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-800' 
                      : 'border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 shadow-sm bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                  }`}
                >
                  Archiwalne
                </button>
              </li>
            </ul>
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center gap-4">
            {/* Items per page selector */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Pokaż:</span>
              <select 
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
                className="text-sm border border-gray-200 dark:border-gray-700/60 rounded pl-3 pr-8 py-1 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-300"
              >
                <option value={5}>5</option>
                <option value={15}>15</option>
                <option value={30}>30</option>
              </select>
            </div>

            {/* Previous/Next buttons */}
            <nav role="navigation" aria-label="Pagination">
              <ul className="flex">
                <li>
                  <button 
                    onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                    disabled={currentPage <= 1}
                    className={`btn text-sm px-3 py-1 ${
                      currentPage <= 1 
                        ? 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 text-gray-300 dark:text-gray-600 cursor-not-allowed' 
                        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-gray-800 dark:text-gray-300'
                    }`}
                  >
                    ← Poprzednia
                  </button>
                </li>
                <li className="ml-2">
                  <button 
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={appointments.length < limit} // Disable if fewer items than limit
                    className={`btn text-sm px-3 py-1 ${
                      appointments.length < limit
                        ? 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 text-gray-300 dark:text-gray-600 cursor-not-allowed'
                        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-gray-800 dark:text-gray-300'
                    }`}
                  >
                    Następna →
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Table Headers */}
        <div className="mb-2">
          <div className="grid grid-cols-12 items-center gap-x-3 px-4 py-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700/60">
            {/* Date & Time Header */}
            <div className="col-span-2 text-left">
              <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                Data i czas
              </div>
            </div>
            
            {/* Client Header */}
            <div className="col-span-2 text-left">
              <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                Klient
              </div>
            </div>
            
            {/* Service Header */}
            <div className="col-span-3 text-left">
              <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                Usługa
              </div>
            </div>
            
            {/* Employee Header */}
            <div className="col-span-2 text-left">
              <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                Pracownik
              </div>
            </div>
            
            {/* Price Header */}
            <div className="col-span-2 text-left">
              <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                Cena
              </div>
            </div>
            
            {/* Status Header */}
            <div className="col-span-1 text-right">
              <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                Status
              </div>
            </div>
          </div>
        </div>

        {/* Appointments */}
        <div className="space-y-2">

          {/* Cards */}
          {loading && <p className="text-gray-500 dark:text-gray-400">Loading appointments...</p>}
          {error && <p className="text-red-500 dark:text-red-400">{error}</p>}
          {appointments.map((appointment) => (
            <Card 
              key={appointment.id} 
              appointment={appointment} 
              isSelected={selectedAppointment?.id === appointment.id}
              onSelect={() => setSelectedAppointment(appointment)}
            />
          ))}
        </div>

      </div>

      {/* Sidebar */}
      <Sidebar 
        selectedAppointment={selectedAppointment} 
        onAppointmentUpdated={handleAppointmentCreated}
      />

    </div>
  )
}
