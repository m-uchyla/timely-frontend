import Link from 'next/link'
import Image, { StaticImageData } from 'next/image'
import { ServiceProperties } from './service-properties'
import { Service } from '@/lib/types/service'

export default function ServiceCard({ service }: { service: Service }) {

  const {
    typeColor,
    categoryIcon,
  } = ServiceProperties() 

  return (
    <div className="col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <div className="flex flex-col h-full p-5">
        <div className="grow mt-2">
          <div className="flex justify-between text-gray-800 dark:text-gray-100 hover:text-gray-900 dark:hover:text-white mb-1">
            <h2 className="text-xl leading-snug font-semibold">{service.name}</h2>
            {service.cost && (
              <h3 className="text-md leading-snug font-semibold">{service.cost} zł</h3>
            )}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            {service.description || 'Brak opisu'}
          </div>
          <div className="text-sm text-gray-500 mb-2">
            <span className="font-medium">Czas trwania:</span> {service.durationMinutes} min
          </div>
        </div>
        <footer className="mt-5">
          <div className="flex justify-between items-center">
            <div>
              <div className={`text-xs inline-flex font-medium rounded-full text-center px-2.5 py-1 ${
                service.isActive 
                  ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-200' 
                  : 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-200'
              }`}>
                {service.isActive ? 'Aktywna' : 'Nieaktywna'}
              </div>
            </div>
            <div>
              <button className="text-sm font-medium text-violet-500 hover:text-violet-600 dark:hover:text-violet-400">
                Edytuj →
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
