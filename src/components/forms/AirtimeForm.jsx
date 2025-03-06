import { motion } from 'framer-motion'
import { useState } from 'react'

const AirtimeForm = ({ provider, onSubmit, onBack }) => {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    amount: '',
    currency: 'USD'
  })

  // Explicit handler for back button
  const handleBackClick = (e) => {
    e.preventDefault()
    console.log('Back button clicked in AirtimeForm')
    if (typeof onBack === 'function') {
      onBack()
    }
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="relative"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -right-20 -top-20 w-40 h-40 bg-primary-500/5 rounded-full blur-2xl"
        />
      </div>
      {/* Header */}
      <div className="mb-6 flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleBackClick}
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

      {/* Form */}
      <form onSubmit={(e) => {
        e.preventDefault()
        onSubmit(formData)
      }}>
        <div className="space-y-4">
          {/* Phone Number Input */}
          <div className="relative">
            <motion.label
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone Number
            </motion.label>
            <motion.div
              whileFocus={{ scale: 1.02 }}
              className="relative"
            >
              <input
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-200"
                placeholder="Enter phone number"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-2xl"
                >
                  📱
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Amount and Currency */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <motion.label
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Amount
              </motion.label>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                placeholder="0.00"
              />
            </div>

            <div className="relative">
              <motion.label
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Currency
              </motion.label>
              <select
                value={formData.currency}
                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 bg-white"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
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

      {/* Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6 p-4 rounded-lg bg-primary-50 border border-primary-100"
      >
        <div className="flex items-start gap-3">
          <div className="text-xl">ℹ️</div>
          <div>
            <h3 className="text-sm font-medium text-primary-700">Quick Tip</h3>
            <p className="text-sm text-primary-600 mt-1">
              Make sure to verify the phone number before proceeding with the payment.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default AirtimeForm