"use client"

import SearchForm from '@/components/search-form'
import TileCard from './tile-card'
import PaginationNumeric from '@/components/pagination-numeric'

import Image01 from '@/public/images/user-64-01.jpg'
import Image02 from '@/public/images/user-64-02.jpg'
import Image03 from '@/public/images/user-64-03.jpg'
import Image04 from '@/public/images/user-64-04.jpg'
import Image05 from '@/public/images/user-64-05.jpg'
import Image06 from '@/public/images/user-64-06.jpg'
import Image07 from '@/public/images/user-64-07.jpg'
import Image08 from '@/public/images/user-64-08.jpg'
import Image09 from '@/public/images/user-64-09.jpg'
import Image10 from '@/public/images/user-64-10.jpg'
import Image11 from '@/public/images/user-64-11.jpg'
import Image12 from '@/public/images/user-64-12.jpg'
import ModalBasic from '@/components/modal-basic'
import { useEffect, useState } from 'react'
import { Employee } from '@/lib/types'
import { ApiError, fetchEmployees } from '@/lib/api'

export default function UsersTabs() {

  const [feedbackModalOpen, setFeedbackModalOpen] = useState<boolean>(false)
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

    // Pagination and filtering state
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [searchQuery, setSearchQuery] = useState('')
    const [status, setStatus] = useState('')

    // Load services on component mount and when filters change
    useEffect(() => {
      loadServices()
    }, [currentPage, searchQuery, status])
  
    const loadServices = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetchEmployees({
          page: currentPage,
          limit: 12,
          search: searchQuery || undefined,
          status: status || undefined
        })

        setEmployees(response.employees)
      } catch (err) {
        if (err instanceof ApiError) {
          setError(`Failed to load services: ${err.message}`)
        } else {
          console.log(err)
          setError('An unexpected error occurred while loading services')
        }
        console.error('Error loading services:', err)
      } finally {
        setLoading(false)
      }
    }

  // Some dummy users data
  const users = [
    {
      id: 0,
      name: 'Dominik McNeail',
      image: Image01,
      link: '#0',
      location: '🇮🇹',
      content: 'Fitness Fanatic, Design Enthusiast, Mentor, Meetup Organizer & PHP Lover.',
    },
    {
      id: 1,
      name: 'Ivan Mesaros',
      image: Image02,
      link: '#0',
      location: '🇫🇷',
      content: 'Fitness Fanatic, Design Enthusiast, Mentor, Meetup Organizer & PHP Lover.',
    },
    {
      id: 2,
      name: 'Tisha Yanchev',
      image: Image03,
      link: '#0',
      location: '🇩🇪',
      content: 'Fitness Fanatic, Design Enthusiast, Mentor, Meetup Organizer & PHP Lover.',
    },
    {
      id: 3,
      name: 'Sergio Gonnelli',
      image: Image04,
      link: '#0',
      location: '🇮🇹',
      content: 'Fitness Fanatic, Design Enthusiast, Mentor, Meetup Organizer & PHP Lover.',
    },
    {
      id: 4,
      name: 'Jerzy Wierzy',
      image: Image05,
      link: '#0',
      location: '🇪🇸',
      content: 'Fitness Fanatic, Design Enthusiast, Mentor, Meetup Organizer & PHP Lover.',
    },
    {
      id: 5,
      name: 'Mirko Grubisic',
      image: Image06,
      link: '#0',
      location: '🇩🇪',
      content: 'Fitness Fanatic, Design Enthusiast, Mentor, Meetup Organizer & PHP Lover.',
    },
    {
      id: 6,
      name: 'Alisha Acharya',
      image: Image07,
      link: '#0',
      location: '🇬🇧',
      content: 'Fitness Fanatic, Design Enthusiast, Mentor, Meetup Organizer & PHP Lover.',
    },
    {
      id: 7,
      name: 'Brian Halligan',
      image: Image08,
      link: '#0',
      location: '🇺🇸',
      content: 'Fitness Fanatic, Design Enthusiast, Mentor, Meetup Organizer & PHP Lover.',
    },
    {
      id: 8,
      name: 'Patricia Semklo',
      image: Image09,
      link: '#0',
      location: '🇮🇳',
      content: 'Fitness Fanatic, Design Enthusiast, Mentor, Meetup Organizer & PHP Lover.',
    },
    {
      id: 9,
      name: 'Maria Martinez',
      image: Image10,
      link: '#0',
      location: '🇮🇹',
      content: 'Fitness Fanatic, Design Enthusiast, Mentor, Meetup Organizer & PHP Lover.',
    },
    {
      id: 10,
      name: 'Vedad Siljak',
      image: Image11,
      link: '#0',
      location: '🇨🇦',
      content: 'Fitness Fanatic, Design Enthusiast, Mentor, Meetup Organizer & PHP Lover.',
    },
    {
      id: 11,
      name: 'Dominik Lamakani',
      image: Image12,
      link: '#0',
      location: '🇧🇪',
      content: 'Fitness Fanatic, Design Enthusiast, Mentor, Meetup Organizer & PHP Lover.',
    },
  ]

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">

      {/* Page header */}
      <div className="sm:flex sm:justify-between sm:items-center mb-8">

        {/* Left: Title */}
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Pracownicy</h1>
        </div>

        {/* Right: Actions */}
        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
          {/* Search form */}
          <SearchForm />
          {/* Add member button */}
          <div>
                      {/* Start */}
                      <button
                        className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white"
                        aria-controls="feedback-modal"
                        onClick={() => {
                    setFeedbackModalOpen(true)
                        }}
                      >
                        Dodaj pracownika
                      </button>
                      <ModalBasic isOpen={feedbackModalOpen} setIsOpen={setFeedbackModalOpen} title="Dodaj pracownika">
                        {/* Modal content */}
                        <div className="px-5 py-4">
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="name">
                          Nazwa <span className="text-red-500">*</span>
                        </label>
                        <input id="name" className="form-input w-full px-2 py-1" type="text" required /> 
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="description">
                          Opis <span className="text-red-500">*</span>
                        </label>
                        <textarea id="description" className="form-textarea w-full px-2 py-1" rows={4} required></textarea>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="email">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input id="email" className="form-input w-full px-2 py-1" type="email" required />
                      </div>
                      
                    </div>
                        </div>
                        {/* Modal footer */}
                        <div className="px-5 py-4 border-t border-gray-200 dark:border-gray-700/60">
                    <div className="flex flex-wrap justify-end space-x-2">
                      <button
                        className="btn-sm border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-gray-800 dark:text-gray-300"
                        onClick={() => {
                          setFeedbackModalOpen(false)
                        }}
                      >
                        Cancel
                      </button>
                      <button className="btn-sm bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white">
                        Send
                      </button>
                    </div>
                        </div>
                      </ModalBasic>
                      {/* End */}
                    </div>
        </div>

      </div>

      {/* Cards */}
      <div className="grid grid-cols-12 gap-6">
        {employees.map(employee => (
          <TileCard
            key={employee.id}
            employee={employee} />
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8">
        <PaginationNumeric />
      </div>

    </div>
  )
}
