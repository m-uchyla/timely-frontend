import Link from 'next/link'
import Image, { StaticImageData } from 'next/image'
import EditMenu from '@/components/edit-menu'
import { Employee } from '@/lib/types'

export default function TileCard({ employee }: { employee: Employee }) {
  return (
    <div className="col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <div className="flex flex-col h-full">
        {/* Card top */}
        <div className="grow p-5">
          <div className="flex justify-between items-start">
            {/* Image + name */}
            <header>
              <div className="flex mb-2">
                <div className="mt-1 pr-1">
                  <div className="inline-flex text-gray-800 dark:text-gray-100 hover:text-gray-900 dark:hover:text-white">
                    <h2 className="text-xl leading-snug justify-center font-semibold">{employee.firstName} {employee.lastName}</h2>
                  </div>
                </div>
              </div>
            </header>
          </div>
            {/* Calendar */}
            <div className="mt-2">
            {/* Desktop (horizontal) view */}
            <div className="hidden sm:block">
              <table className="w-full text-sm text-left rounded-xl overflow-hidden">
              <thead>
                <tr>
                {["Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Niedz"].map((day) => (
                  <th
                  key={day}
                  className="py-2 px-2 font-semibold bg-violet-100 dark:bg-violet-900 text-violet-700 dark:text-violet-200 text-center"
                  >
                  {day}
                  </th>
                ))}
                </tr>
              </thead>
              <tbody>
                {[["08:00", "08:00", "08:00", "08:00", "08:00", "-", "-"], ["16:00", "16:00", "16:00", "16:00", "16:00", "-", "-"]].map(
                (row, rowIdx) => (
                  <tr key={rowIdx}>
                  {row.map((hour, idx) => (
                    <td
                    key={idx}
                    className={`py-2 px-2 text-center ${
                      hour === "-"
                      ? "bg-gray-100 dark:bg-gray-700 text-gray-400"
                      : "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200"
                    }`}
                    >
                    {hour}
                    </td>
                  ))}
                  </tr>
                )
                )}
              </tbody>
              </table>
            </div>
            {/* Mobile (vertical) view */}
            <div className="block sm:hidden ">
              <div className="space-y-2">
                {["Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Niedz"].map((day, idx) => {
                  const hours1 = ["08:00", "08:00", "08:00", "08:00", "08:00", "-", "-"];
                  const hours2 = ["16:00", "16:00", "16:00", "16:00", "16:00", "-", "-"];
                  const isEmpty = hours1[idx] === "-" && hours2[idx] === "-";
                  return (
                    <div key={day} className="flex items-center justify-between py-2 px-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                      <div className="font-semibold px-3 py-1 rounded">
                        {day}
                      </div>
                      <div className="flex gap-2">
                        {isEmpty ? (
                          <span className="text-gray-400">-</span>
                        ) : (
                          <>
                            <span className="bg-violet-100 dark:bg-violet-900 text-violet-700 dark:text-violet-200  px-2 py-1 rounded text-sm">
                              {hours1[idx]}
                            </span>
                            <span className="bg-violet-100 dark:bg-violet-900 text-violet-700 dark:text-violet-200  px-2 py-1 rounded text-sm">
                              {hours2[idx]}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            </div>
        </div>
        {/* Card footer */}
        <div className="border-t border-gray-100 dark:border-gray-700/60">
          <div className="flex divide-x divide-gray-100 dark:divide-gray-700/60">
            <Link className="block flex-1 text-center text-sm text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-200 font-medium px-3 py-4" href="/messages">
              <div className="flex items-center justify-center">
                <svg className="fill-current shrink-0 mr-2" width="16" height="16" viewBox="0 0 16 16">
                  <path d="M8 0C3.6 0 0 3.1 0 7s3.6 7 8 7h.6l5.4 2v-4.4c1.2-1.2 2-2.8 2-4.6 0-3.9-3.6-7-8-7zm4 10.8v2.3L8.9 12H8c-3.3 0-6-2.2-6-5s2.7-5 6-5 6 2.2 6 5c0 2.2-2 3.8-2 3.8z" />
                </svg>
                <span>Sprawdź rezerwacje</span>
              </div>
            </Link>
            <Link className="block flex-1 text-center text-sm text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-200 font-medium px-3 py-4 group" href="/settings/account">
              <div className="flex items-center justify-center">
                <svg className="fill-current text-gray-400 dark:text-gray-600 group-hover:text-gray-500 shrink-0 mr-2" width="16" height="16" viewBox="0 0 16 16">
                  <path d="M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z" />
                </svg>
                <span>Edytuj</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
