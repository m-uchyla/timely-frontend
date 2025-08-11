'use client'

import SearchForm from '@/components/search-form'
import FilterButton from '@/components/dropdown-filter'
import ServiceCard from './service-card'
import PaginationNumeric from '@/components/pagination-numeric'
import ModalBasic from '@/components/modal-basic'
import { useState, useEffect } from 'react'
import { fetchServices, createService, ApiError } from '@/lib/api/services'
import { Service } from '@/lib/types/service'
import { validateServiceForm } from '@/lib/validation/service'

export default function Services() {

  // State management
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [feedbackModalOpen, setFeedbackModalOpen] = useState<boolean>(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    durationMinutes: 60,
    pausePeriodMinutes: 0,
    isActive: true,
    cost: '',
    organizationId: 1 // You might want to get this from context/auth
  })
  const [formErrors, setFormErrors] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Pagination and filtering state
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterCategory, setFilterCategory] = useState('')

  // Load services on component mount and when filters change
  useEffect(() => {
    loadServices()
  }, [currentPage, searchQuery, filterCategory])

  const loadServices = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetchServices({
        page: currentPage,
        limit: 12,
        search: searchQuery || undefined,
        category: filterCategory || undefined
      })

      setServices(response.services)
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

  const handleCreateService = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormErrors([])

    try {
      const validation = validateServiceForm(formData)
      
      if (!validation.isValid) {
        setFormErrors(validation.errors)
        return
      }

      if (validation.data) {
        await createService({
          ...validation.data,
          cost: formData.cost ? parseFloat(formData.cost) : undefined
        })
        setFeedbackModalOpen(false)
        setFormData({
          name: '',
          description: '',
          durationMinutes: 60,
          pausePeriodMinutes: 0,
          isActive: true,
          cost: '',
          organizationId: 1
        })
        // Reload services to show the new one
        await loadServices()
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setFormErrors([`Failed to create service: ${err.message}`])
      } else {
        setFormErrors(['An unexpected error occurred while creating the service'])
      }
      console.error('Error creating service:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string | number | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

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
              <form onSubmit={handleCreateService}>
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
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="name">
                        Nazwa usługi <span className="text-red-500">*</span>
                      </label>
                      <input 
                        id="name" 
                        className="form-input w-full px-2 py-1" 
                        type="text" 
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required 
                      /> 
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="description">
                        Opis
                      </label>
                      <textarea 
                        id="description" 
                        className="form-textarea w-full px-2 py-1" 
                        rows={4} 
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                      ></textarea>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="durationMinutes">
                          Czas trwania (minuty) <span className="text-red-500">*</span>
                        </label>
                        <input 
                          id="durationMinutes" 
                          className="form-input w-full px-2 py-1" 
                          type="number" 
                          min="1"
                          value={formData.durationMinutes}
                          onChange={(e) => handleInputChange('durationMinutes', parseInt(e.target.value) || 0)}
                          required 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="pausePeriodMinutes">
                          Przerwa (minuty)
                        </label>
                        <input 
                          id="pausePeriodMinutes" 
                          className="form-input w-full px-2 py-1" 
                          type="number" 
                          min="0"
                          value={formData.pausePeriodMinutes}
                          onChange={(e) => handleInputChange('pausePeriodMinutes', parseInt(e.target.value) || 0)}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="cost">
                        Koszt
                      </label>
                      <input 
                        id="cost" 
                        className="form-input w-full px-2 py-1" 
                        type="number" 
                        step="0.01"
                        min="0"
                        value={formData.cost}
                        onChange={(e) => handleInputChange('cost', e.target.value)}
                        placeholder="np. 99.99"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="isActive">
                        Status
                      </label>
                      <select 
                        id="isActive" 
                        className="form-select w-full px-2 py-1"
                        value={formData.isActive.toString()}
                        onChange={(e) => handleInputChange('isActive', e.target.value === 'true')}
                      >
                        <option value="true">Aktywna</option>
                        <option value="false">Nieaktywna</option>
                      </select>
                    </div>
                  </div>
                </div>
                {/* Modal footer */}
                <div className="px-5 py-4 border-t border-gray-200 dark:border-gray-700/60">
                  <div className="flex flex-wrap justify-end space-x-2">
                    <button
                      type="button"
                      className="btn-sm border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-gray-800 dark:text-gray-300"
                      onClick={() => {
                        setFeedbackModalOpen(false)
                        setFormErrors([])
                      }}
                    >
                      Anuluj
                    </button>
                    <button 
                      type="submit"
                      className="btn-sm bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Dodawanie...' : 'Dodaj'}
                    </button>
                  </div>
                </div>
              </form>
            </ModalBasic>
            {/* End */}
          </div>
        </div>

      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
          <button 
            onClick={loadServices}
            className="ml-3 text-red-800 underline hover:no-underline"
          >
            Spróbuj ponownie
          </button>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-gray-100"></div>
          <span className="ml-2 text-gray-600 dark:text-gray-400">Ładowanie usług...</span>
        </div>
      )}

      {/* Services Cards */}
      {!loading && (
        <div className="grid grid-cols-12 gap-6">
          {services.length === 0 && !error ? (
            <div className="col-span-12 text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">Nie znaleziono żadnych usług.</p>
            </div>
          ) : (
            services.map(service => (
              <ServiceCard
                key={service.id}
                service={service} 
              />
            ))
          )}
        </div>
      )}

      {/* Pagination */}
      {!loading && services.length > 0 && (
        <div className="mt-8">
          <PaginationNumeric />
        </div>
      )}

    </div>
  )
}
