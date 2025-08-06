'use client'

import SearchForm from '@/components/search-form'
import FilterButton from '@/components/dropdown-filter'
import ServiceCard from './service-card'
import PaginationNumeric from '@/components/pagination-numeric'

import Image01 from '@/public/images/user-28-01.jpg'
import Image02 from '@/public/images/user-28-02.jpg'
import Image03 from '@/public/images/user-28-03.jpg'
import Image04 from '@/public/images/user-28-04.jpg'
import Image05 from '@/public/images/user-28-05.jpg'
import Image06 from '@/public/images/user-28-06.jpg'
import Image07 from '@/public/images/user-28-07.jpg'
import Image08 from '@/public/images/user-28-08.jpg'
import Image09 from '@/public/images/user-28-09.jpg'
import Image10 from '@/public/images/user-28-10.jpg'
import Image11 from '@/public/images/user-28-11.jpg'
import Image12 from '@/public/images/user-28-12.jpg'
import ModalBasic from '@/components/modal-basic'
import { useState } from 'react'

export default function Campaigns() {

  const [feedbackModalOpen, setFeedbackModalOpen] = useState<boolean>(false)

  // Some dummy campaigns data
  const campaigns = [
    {
      id: 0,
      category: '1',
      members: [
        {
          name: 'User 01',
          image: Image01,
          link: '#0'
        },
        {
          name: 'User 02',
          image: Image02,
          link: '#0'
        },
        {
          name: 'User 03',
          image: Image03,
          link: '#0'
        },
      ],
      title: 'Monitor progress in Real Time Value',
      link: '#0',
      content: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts.',
      dates: {
        from: 'Jan 20',
        to: 'Jan 27'
      },
      type: 'Aktywna'
    },
    {
      id: 1,
      category: '2',
      members: [
        {
          name: 'User 04',
          image: Image04,
          link: '#0'
        },
        {
          name: 'User 05',
          image: Image05,
          link: '#0'
        },
      ],
      title: 'Monitor progress in Real Time Value',
      link: '#0',
      content: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts.',
      dates: {
        from: 'Jan 20',
        to: 'Jan 27'
      },
      type: 'Wstrzymana'
    },
    {
      id: 3,
      category: '3',
      members: [
        {
          name: 'User 07',
          image: Image07,
          link: '#0'
        },
        {
          name: 'User 08',
          image: Image08,
          link: '#0'
        },
        {
          name: 'User 09',
          image: Image09,
          link: '#0'
        },
      ],
      title: 'Monitor progress in Real Time Value',
      link: '#0',
      content: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts.',
      dates: {
        from: 'Jan 20',
        to: 'Jan 27'
      },
      type: 'Aktywna'
    },
    {
      id: 4,
      category: '1',
      members: [
        {
          name: 'User 10',
          image: Image10,
          link: '#0'
        },
      ],
      title: 'Monitor progress in Real Time Value',
      link: '#0',
      content: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts.',
      dates: {
        from: 'Jan 20',
        to: 'Jan 27'
      },
      type: 'Aktywna'
    },
    {
      id: 5,
      category: '4',
      members: [
        {
          name: 'User 11',
          image: Image11,
          link: '#0'
        },
        {
          name: 'User 05',
          image: Image05,
          link: '#0'
        },
        {
          name: 'User 12',
          image: Image12,
          link: '#0'
        },
      ],
      title: 'Monitor progress in Real Time Value',
      link: '#0',
      content: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts.',
      dates: {
        from: 'Jan 20',
        to: 'Jan 27'
      },
      type: 'Aktywna'
    },
    {
      id: 6,
      category: '2',
      members: [
        {
          name: 'User 07',
          image: Image07,
          link: '#0'
        },
        {
          name: 'User 04',
          image: Image04,
          link: '#0'
        },
        {
          name: 'User 11',
          image: Image11,
          link: '#0'
        },
      ],
      title: 'Monitor progress in Real Time Value',
      link: '#0',
      content: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts.',
      dates: {
        from: 'Jan 20',
        to: 'Jan 27'
      },
      type: 'Aktywna'
    },
    {
      id: 7,
      category: '4',
      members: [
        {
          name: 'User 01',
          image: Image01,
          link: '#0'
        },
        {
          name: 'User 02',
          image: Image02,
          link: '#0'
        },
        {
          name: 'User 06',
          image: Image06,
          link: '#0'
        },
      ],
      title: 'Monitor progress in Real Time Value',
      link: '#0',
      content: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts.',
      dates: {
        from: 'Jan 20',
        to: 'Jan 27'
      },
      type: 'Aktywna'
    },
    {
      id: 8,
      category: '1',
      members: [
        {
          name: 'User 09',
          image: Image09,
          link: '#0'
        },
        {
          name: 'User 01',
          image: Image01,
          link: '#0'
        },
      ],
      title: 'Monitor progress in Real Time Value',
      link: '#0',
      content: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts.',
      dates: {
        from: 'Jan 20',
        to: 'Jan 27'
      },
      type: 'Wstrzymana'
    },
    {
      id: 9,
      category: '3',
      members: [
        {
          name: 'User 07',
          image: Image07,
          link: '#0'
        },
        {
          name: 'User 08',
          image: Image08,
          link: '#0'
        },
        {
          name: 'User 09',
          image: Image09,
          link: '#0'
        },
        {
          name: 'User 06',
          image: Image06,
          link: '#0'
        },
      ],
      title: 'Monitor progress in Real Time Value',
      link: '#0',
      content: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts.',
      dates: {
        from: 'Jan 20',
        to: 'Jan 27'
      },
      type: 'Aktywna'
    },
    {
      id: 10,
      category: '4',
      members: [
        {
          name: 'User 06',
          image: Image06,
          link: '#0'
        },
        {
          name: 'User 11',
          image: Image11,
          link: '#0'
        },
      ],
      title: 'Monitor progress in Real Time Value',
      link: '#0',
      content: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts.',
      dates: {
        from: 'Jan 20',
        to: 'Jan 27'
      },
      type: 'Wstrzymana'
    },
    {
      id: 11,
      category: '2',
      members: [
        {
          name: 'User 05',
          image: Image05,
          link: '#0'
        },
      ],
      title: 'Monitor progress in Real Time Value',
      link: '#0',
      content: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts.',
      dates: {
        from: 'Jan 20',
        to: 'Jan 27'
      },
      type: 'Wstrzymana'
    },
    {
      id: 12,
      category: '3',
      members: [
        {
          name: 'User 07',
          image: Image07,
          link: '#0'
        },
        {
          name: 'User 08',
          image: Image08,
          link: '#0'
        },
        {
          name: 'User 09',
          image: Image09,
          link: '#0'
        },
      ],
      title: 'Monitor progress in Real Time Value',
      link: '#0',
      content: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts.',
      dates: {
        from: 'Jan 20',
        to: 'Jan 27'
      },
      type: 'Aktywna'
    },
  ]

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">

      {/* Page header */}
      <div className="sm:flex sm:justify-between sm:items-center mb-8">

        {/* Left: Title */}
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Usługi</h1>
        </div>

        {/* Right: Actions */}
        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
          {/* Search form */}
          <SearchForm />
          {/* Filter button */}
          <FilterButton align="right" />
          {/* Send Feedback */}
          <div>
            {/* Start */}
            <button
              className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white"
              aria-controls="feedback-modal"
              onClick={() => {
          setFeedbackModalOpen(true)
              }}
            >
              Dodaj usługę
            </button>
            <ModalBasic isOpen={feedbackModalOpen} setIsOpen={setFeedbackModalOpen} title="Dodaj usługę">
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
        {campaigns.map(campaign => (
          <ServiceCard
            key={campaign.id}
            service={campaign} />
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8">
        <PaginationNumeric />
      </div>

    </div>
  )
}
