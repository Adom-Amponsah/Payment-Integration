import { motion } from 'framer-motion'
import { useState } from 'react'

const AirlineForm = ({ provider, onSubmit, onBack }) => {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    date: '',
    passengers: '1',
    class: 'economy'
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="relative"
    >
      <div className="mb-6 flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onBack}
          type="button"
          className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-lg"
        >
          <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>
        <h2 className="text-xl font-semibold text-gray-800">
          {provider.name}
        </h2>
      </div>

      <form onSubmit={(e) => {
        e.preventDefault()
        onSubmit(formData)
      }}>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <motion.label
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                From
              </motion.label>
              <input
                type="text"
                value={formData.from}
                onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                placeholder="Departure City"
              />
            </div>

            <div className="relative">
              <motion.label
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                To
              </motion.label>
              <input
                type="text"
                value={formData.to}
                onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                placeholder="Destination City"
              />
            </div>
          </div>

          <div className="relative">
            <motion.label
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Date
            </motion.label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <motion.label
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Passengers
              </motion.label>
              <select
                value={formData.passengers}
                onChange={(e) => setFormData({ ...formData, passengers: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 bg-white"
              >
                {[1,2,3,4,5].map(num => (
                  <option key={num} value={num}>{num} {num === 1 ? 'Passenger' : 'Passengers'}</option>
                ))}
              </select>
            </div>

            <div className="relative">
              <motion.label
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Class
              </motion.label>
              <select
                value={formData.class}
                onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 bg-white"
              >
                <option value="economy">Economy</option>
                <option value="business">Business</option>
                <option value="first">First Class</option>
              </select>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-4 px-6 bg-[#ff4b2b] text-white rounded-xl font-medium shadow-xl shadow-[#ff4b2b]/20 hover:shadow-[#ff4b2b]/40 transition-all duration-200"
          >
            Continue to Payment
          </motion.button>
        </div>
      </form>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6 p-4 rounded-lg bg-blue-50 border border-blue-100"
      >
        <div className="flex items-start gap-3">
          <div className="text-xl">🎫</div>
          <div>
            <h3 className="text-sm font-medium text-blue-700">Booking Tips</h3>
            <p className="text-sm text-blue-600 mt-1">
              Book in advance for better rates. Flexible dates might show cheaper options.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default AirlineForm 