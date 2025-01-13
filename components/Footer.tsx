export default function Footer() {
    const currentYear = new Date().getFullYear()
  return (
    <footer className="bg-white dark:bg-slate-800 py-6">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <p className="text-center text-sm text-gray-600 dark:text-white">
        &copy; {currentYear} Booking App. All rights reserved.
      </p>
    </div>
  </footer>
  )
}