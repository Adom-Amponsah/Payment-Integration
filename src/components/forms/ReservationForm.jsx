import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const ReservationForm = ({ provider, onSubmit, onBack }) => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: '',
    specialRequests: ''
  })

  const handleBack = () => {
    window.history.back() // This will take us back to the previous page
  }

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
        <div className="space-y-6">
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
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 bg-white"
            />
          </div>

          <div className="relative">
            <motion.label
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Time
            </motion.label>
            <select
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 bg-white"
            >
              {[1,2,3,4,5,6,7,8].map(num => (
                <option key={num} value={num}>
                  {num} {provider.id === 'hotels' ? 'Night(s)' : 'Hour(s)'}
                </option>
              ))}
            </select>
          </div>

          <div className="relative">
            <motion.label
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Guests
            </motion.label>
            <select
              value={formData.guests}
              onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 bg-white"
            >
              {[1,2,3,4,5,6,7,8,9,10].map(num => (
                <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>

          <div className="relative">
            <motion.label
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Special Requests
            </motion.label>
            <textarea
              value={formData.specialRequests}
              onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
              rows="3"
              placeholder="Any special requirements..."
            />
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
        className="mt-6 p-4 rounded-lg bg-primary-50 border border-primary-100"
      >
        <div className="flex items-start gap-3">
          <div className="text-xl">{getProviderIcon()}</div>
          <div>
            <h3 className="text-sm font-medium text-primary-700">Booking Info</h3>
            <p className="text-sm text-primary-600 mt-1">
              {provider.id === 'hotels' 
                ? 'Check-in time usually starts from 14:00'
                : provider.id === 'restaurants'
                ? 'Reservation can be held for 15 minutes after booking time'
                : 'Please arrive 10 minutes before your scheduled time'}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ReservationForm 