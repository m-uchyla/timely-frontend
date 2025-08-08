export const metadata = {
  title: 'Credit Cards - Mosaic',
  description: 'Page description',
}

import Card from './card';
import Sidebar from './sidebar';

export default function CreditCards() {
  type Appointment = {
    date: Date;
    startTime: string;
    endTime: string;
    notes: string | null;
    cancellationReason: string | null;
    price: number | null;
    employeeName: string;
    serviceName: string;
    status: "confirmed" | "pending" | "cancelled" | "declined";
  };

  const appointments: Appointment[] = [
    {
      date: new Date(),
      startTime: "10:00",
      endTime: "11:00",
      notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      cancellationReason: null,
      price: null,
      employeeName: "John Doe",
      serviceName: "Consultation",
      status: 'confirmed'
    },
    {
      date: new Date(),
      startTime: "12:00",
      endTime: "13:00",
      notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      cancellationReason: null,
      price: null,
      employeeName: "Jane Smith",
      serviceName: "Follow-up",
      status: 'pending'
    },
    {
      date: new Date(),
      startTime: "14:00",
      endTime: "15:00",
      notes: null,
      cancellationReason: "Client cancelled. Reason: Personal reasons.",
      price: null,
      employeeName: "Alice Johnson",
      serviceName: "Check-up",
      status: 'cancelled'
    },
    {
      date: new Date(),
      startTime: "16:00",
      endTime: "17:00",
      notes: null,
      cancellationReason: null,
      price: null,
      employeeName: "Bob Brown",
      serviceName: "Consultation",
      status: 'declined'
    },
  ];
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
          <Card appointment={appointments[0]} />
          <Card appointment={appointments[1]} />
          <Card appointment={appointments[2]} />
          <Card appointment={appointments[3]} />
        </div>

      </div>

      {/* Sidebar */}
      <Sidebar />

    </div>
  )
}
