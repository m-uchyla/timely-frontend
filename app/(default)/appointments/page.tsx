"use client";

import Card from './card';
import Sidebar from './sidebar';
import { Appointment } from '@/lib/types';
import { ApiError, fetchAppointments } from '@/lib/api';
import { useEffect, useState } from 'react';

export default function CreditCards() {

  const [feedbackModalOpen, setFeedbackModalOpen] = useState<boolean>(false)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Pagination and filtering state
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [status, setStatus] = useState('')
  
      // Load appointments on component mount and when filters change
      useEffect(() => {
        loadAppointments()
      }, [currentPage, searchQuery, status])

      const loadAppointments = async () => {
        try {
          setLoading(true)
          setError(null)

          const response = await fetchAppointments({
            page: currentPage,
            limit: 12,
            search: searchQuery || undefined,
            status: status || undefined
          })

          setAppointments(response.appointments)
        } catch (err) {
          if (err instanceof ApiError) {
            setError(`Failed to load appointments: ${err.message}`)
          } else {
            console.log(err)
            setError('An unexpected error occurred while loading appointments')
          }
          console.error('Error loading appointments:', err)
        } finally {
          setLoading(false)
        }
      }
  return (
    <div className="lg:relative lg:flex bg-gray-100 dark:bg-gray-900">

      {/* Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">

        {/* Page header */}
        <div className="sm:flex sm:justify-between sm:items-center mb-5">

          {/* Left: Title */}
          <div className="mb-4 sm:mb-0">
            <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Cards</h1>
          </div>

          {/* Add card button */}
          <button className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white">Add Card</button>
        </div>

        {/* Filters */}
        <div className="mb-5">
          <ul className="flex flex-wrap -m-1">
            <li className="m-1">
              <button className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-transparent shadow-sm bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-800 transition">
                View All
              </button>
            </li>
            <li className="m-1">
              <button className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 shadow-sm bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 transition">
                Physical Cards
              </button>
            </li>
            <li className="m-1">
              <button className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 shadow-sm bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 transition">
                Virtual Cards
              </button>
            </li>
          </ul>
        </div>

        {/* Appointments */}
        <div className="space-y-2">

          {/* Cards */}
          {loading && <p className="text-gray-500 dark:text-gray-400">Loading appointments...</p>}
          {error && <p className="text-red-500 dark:text-red-400">{error}</p>}
          {appointments.map((appointment) => (
            <Card key={appointment.id} appointment={appointment} />
          ))}
        </div>

      </div>

      {/* Sidebar */}
      <Sidebar />

    </div>
  )
}
