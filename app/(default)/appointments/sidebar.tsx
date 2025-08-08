import ServiceCard from "../services/service-card";

export default function Sidebar() {
  return (
    <div>
        <div className="lg:sticky lg:top-16 bg-linear-to-b from-gray-100 to-white dark:from-gray-800/30 dark:to-gray-900 lg:overflow-x-hidden lg:overflow-y-auto no-scrollbar lg:shrink-0 border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-gray-700/60 lg:w-[390px] lg:h-[calc(100dvh-64px)]">
          <div className="py-8 px-4 lg:px-8">
            <div className="max-w-sm mx-auto lg:max-w-none">

              <div className="text-gray-800 dark:text-gray-100 font-semibold text-center mb-6">Szczegóły rezerwacji</div>

              {/* Credit Card */}
              <div className="relative aspect-7/4 bg-linear-to-tr rounded-xl overflow-hidden">
                <ServiceCard service={{
                    id: 0,
                    category: '1',
                    title: 'Monitor progress in Real Time Value',
                    link: '#0',
                    content: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts.',
                    dates: {
                        from: 'Jan 20',
                        to: 'Jan 27'
                    },
                    type: 'Aktywna'
                    }} 
                />
              </div>

              {/* Details */}
              <div className="mt-6">
                <ul>
                  <li className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700/60">
                    <div className="text-sm">Klient</div>
                    <div className="text-sm font-medium text-gray-800 dark:text-gray-100 ml-2">Jan nowak</div>
                  </li>
                  <li className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700/60">
                    <div className="text-sm">Email</div>
                    <div className="text-sm font-medium text-gray-800 dark:text-gray-100 ml-2">Jan@nowak.pl</div>
                  </li>
                  <li className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700/60">
                    <div className="text-sm">Status</div>
                    <div className="flex items-center whitespace-nowrap">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-2" />
                      <div className="text-sm font-medium text-gray-800 dark:text-gray-100">Aktywna</div>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Payment Limits */}
              <div className="mt-6">
                <div className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-4">Payment Limits</div>
                <div className="pb-4 border-b border-gray-200 dark:border-gray-700/60">
                  <div className="flex justify-between text-sm mb-2">
                    <div>Spent This Month</div>
                    <div className="italic">
                      $750,00 <span className="text-gray-400 dark:text-gray-500">/</span> $1,500.00
                    </div>
                  </div>
                  <div className="relative w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                    <div className="absolute inset-0 bg-green-400 rounded-full" aria-hidden="true" style={{ width: '50%' }} />
                  </div>
                </div>
              </div>

              {/* Withdrawal Limits */}
              <div className="mt-6">
                <div className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-4">Withdrawal Limits</div>
                <div className="pb-4 border-b border-gray-200 dark:border-gray-700/60">
                  <div className="flex justify-between text-sm mb-2">
                    <div>Withdrawn This Month</div>
                    <div className="italic">
                      $100,00 <span className="text-gray-400 dark:text-gray-500">/</span> $1,500.00
                    </div>
                  </div>
                  <div className="relative w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                    <div className="absolute inset-0 bg-green-400 rounded-full" aria-hidden="true" style={{ width: '7.5%' }} />
                  </div>
                </div>
              </div>

              {/* Edit / Delete */}
              <div className="flex items-center space-x-3 mt-6">
                <div className="my-auto">
                  <button className="btn w-full border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-red-500">
                    <svg className="fill-current shrink-0" width="16" height="16" viewBox="0 0 16 16">
                      <path d="M14.574 5.67a13.292 13.292 0 0 1 1.298 1.842 1 1 0 0 1 0 .98C15.743 8.716 12.706 14 8 14a6.391 6.391 0 0 1-1.557-.2l1.815-1.815C10.97 11.82 13.06 9.13 13.82 8c-.163-.243-.39-.56-.669-.907l1.424-1.424ZM.294 15.706a.999.999 0 0 1-.002-1.413l2.53-2.529C1.171 10.291.197 8.615.127 8.49a.998.998 0 0 1-.002-.975C.251 7.29 3.246 2 8 2c1.331 0 2.515.431 3.548 1.038L14.293.293a.999.999 0 1 1 1.414 1.414l-14 14a.997.997 0 0 1-1.414 0ZM2.18 8a12.603 12.603 0 0 0 2.06 2.347l1.833-1.834A1.925 1.925 0 0 1 6 8a2 2 0 0 1 2-2c.178 0 .348.03.512.074l1.566-1.566C9.438 4.201 8.742 4 8 4 5.146 4 2.958 6.835 2.181 8Z" />
                    </svg>
                    <span className="ml-2">Anuluj rezerwację</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
  );
}