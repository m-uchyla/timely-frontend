import Link from 'next/link'
import Image, { StaticImageData } from 'next/image'
import { ServiceProperties } from './service-properties'

interface Service {
  id: number
  category: string
  members: {
    name: string
    image: StaticImageData
    link: string
  }[]
  title: string
  link: string
  content: string
  dates: {
    from: string
    to: string
  }
  type: string
}

export default function ServiceCard({ service }: { service: Service }) {

  const {
    typeColor,
    categoryIcon,
  } = ServiceProperties() 

  return (
    <div className="col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <div className="flex flex-col h-full p-5">
        <div className="grow mt-2">
          <Link className="inline-flex text-gray-800 dark:text-gray-100 hover:text-gray-900 dark:hover:text-white mb-1" href={service.link}>
            <h2 className="text-xl leading-snug font-semibold">{service.title}</h2>
          </Link>
          <div className="text-sm">{service.content}</div>
        </div>
        <footer className="mt-5">
          <div className="text-sm font-medium text-gray-500 mb-2">{service.dates.from} <span className="text-gray-400 dark:text-gray-600">-&gt;</span> {service.dates.to} zł</div>
          <div className="flex justify-between items-center">
            <div>
              <div className={`text-xs inline-flex font-medium rounded-full text-center px-2.5 py-1 ${typeColor(service.type)}`}>{service.type}</div>
            </div>
            <div>
              <Link className="text-sm font-medium text-violet-500 hover:text-violet-600 dark:hover:text-violet-400" href={service.link}>Edytuj -&gt;</Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
