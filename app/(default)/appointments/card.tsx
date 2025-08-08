interface Appointment {
  date: Date
  startTime: string
  endTime: string
  notes: string | null
  cancellationReason: string | null
  price: number | null
  employeeName: string,
  serviceName: string,
  status: 'pending' | 'confirmed' | 'declined' | 'cancelled'
}

export default function Card({ appointment }: { appointment: Appointment }) {
   const statusColor = new Map([
    ['pending', 'bg-yellow-500/20 text-yellow-700'],
    ['confirmed', 'bg-green-500/20 text-green-700'],
    ['declined', 'bg-gray-500/20 text-gray-700'],
    ['cancelled', 'bg-red-500/20 text-red-700']
  ]);
  const statusToText = new Map([
    ['pending', 'Oczekująca'],
    ['confirmed', 'Aktywna'],
    ['declined', 'Odrzucona'],
    ['cancelled', 'Anulowana']
  ]);
  return (<label className="relative block cursor-pointer text-left w-full bg-white dark:bg-gray-900">
            <input type="radio" name="radio-buttons" className="peer sr-only" defaultChecked />
            <div className="p-4 rounded-lg dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 shadow-sm transition">
              <div className="grid grid-cols-18 items-center gap-x-2">
                {/* Card */}
                <div className="col-span-4 order-1 sm:order-none sm:col-span-3 flex items-center space-x-4 lg:sidebar-expanded:col-span-6 xl:sidebar-expanded:col-span-3">
                  <div>
                    <div className="text-sm font-medium text-gray-800 dark:text-gray-100">{appointment.date.toLocaleDateString()}</div>
                    <div className="text-xs">{appointment.startTime} - {appointment.endTime}</div>
                  </div>
                </div>
                {/* Name */}
                <div className="col-span-4 order-2 sm:order-none sm:col-span-3 text-left sm:text-center lg:sidebar-expanded:hidden xl:sidebar-expanded:block">
                  <div className="text-sm font-medium text-gray-800 dark:text-gray-100 truncate">{appointment.employeeName}</div>
                </div>
                {/* Service */}
                <div className="col-span-4 order-3 sm:order-none sm:col-span-3 text-left sm:text-center lg:sidebar-expanded:hidden xl:sidebar-expanded:block">
                  <div className="text-sm font-medium text-gray-800 dark:text-gray-100 truncate">{appointment.serviceName}</div>
                </div>
                {/* Employee */}
                <div className="col-span-4 order-4 sm:order-none sm:col-span-3 text-left sm:text-center lg:sidebar-expanded:hidden xl:sidebar-expanded:block">
                  <div className="text-sm font-medium text-gray-800 dark:text-gray-100 truncate">{appointment.employeeName}</div>
                </div>
                {/* Price */}
                <div className="col-span-4 order-5 sm:order-none sm:col-span-4 text-right sm:text-center lg:sidebar-expanded:col-span-6 xl:sidebar-expanded:col-span-4">
                  <div className="text-sm">{appointment.price ?? '-'}</div>
                </div>
                {/* Status */}
                <div className="col-span-4 order-6 sm:order-none sm:col-span-2 text-right lg:sidebar-expanded:hidden xl:sidebar-expanded:block">
                  <div className={`text-xs inline-flex font-medium ${statusColor.get(appointment.status)} rounded-full text-center px-2.5 py-1`}>
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