import { motion } from 'framer-motion'
import { useState } from 'react'

const TransferForm = ({ provider, onSubmit, onBack }) => {
  const [formData, setFormData] = useState({
    accountNumber: '',
    amount: '',
    currency: 'USD',
    description: ''
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
          className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-lg"
        >
          <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <span>{provider.name}</span>
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-xl"
          >
            💸
          </motion.span>
        </h2>
      </div>

      <form onSubmit={(e) => {
        e.preventDefault()
        onSubmit(formData)
      }}>
        <div className="space-y-4">
          <div className="relative">
            <motion.label
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Account Number
            </motion.label>
            <input
              type="text"
              value={formData.accountNumber}
              onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
              placeholder="Enter account number"
            />
          </div>

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

          <div className="relative">
            <motion.label
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </motion.label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
              rows="3"
              placeholder="Enter transfer description..."
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
          <div className="text-xl">ℹ️</div>
          <div>
            <h3 className="text-sm font-medium text-primary-700">Transfer Info</h3>
            <p className="text-sm text-primary-600 mt-1">
              Please verify the account number before proceeding with the transfer.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default TransferForm 