import { motion } from 'framer-motion'
import { useState } from 'react'

const AirtimeForm = ({ provider, onSubmit, onBack }) => {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    amount: '',
    currency: 'USD'
  })

  const handleBackClick = (e) => {
    e.preventDefault()
    onBack()
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="relative bg-gradient-to-br from-purple-900/10 via-orange-50 to-teal-900/10 p-6 rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
    >
      {/* Cosmic Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.3, 1],
            x: ['-10%', '10%', '-10%'],
            y: ['-20%', '20%', '-20%']
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute w-48 h-48 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            rotate: [360, 0],
            scale: [1.2, 1, 1.2],
            x: ['20%', '-20%', '20%'],
            y: ['10%', '-10%', '10%']
          }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="absolute w-64 h-64 bg-gradient-to-r from-teal-500/20 to-blue-500/20 rounded-full blur-3xl"
        />
      </div>

      {/* Header with Neon Glow */}
      <div className="relative z-10 mb-8 flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.2, rotate: 90, boxShadow: '0 0 15px rgba(255, 75, 43, 0.7)' }}
          whileTap={{ scale: 0.9 }}
          onClick={handleBackClick}
          type="button"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-red-600 text-white shadow-lg hover:shadow-orange-500/50 transition-all duration-300"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <motion.span
            animate={{ color: ['#ff4b2b', '#8b5cf6', '#ff4b2b'] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {provider.name}
          </motion.span>
          <motion.span
            animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-3xl"
          >
            ⚡️
          </motion.span>
        </h2>
      </div>

      {/* Form with Holographic Inputs */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit(formData)
        }}
        className="relative z-10 space-y-6"
      >
        {/* Phone Number */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="relative group"
        >
          <motion.label
            className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-orange-500 transition-colors"
          >
            Phone Number
          </motion.label>
          <div className="relative">
            <input
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              className="w-full px-4 py-3 bg-white/80 border border-gray-300/50 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-500/30 text-gray-800 placeholder-gray-400 transition-all duration-300"
              placeholder="Enter your digits"
            />
            <motion.div
              animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl text-orange-500"
            >
              📡
            </motion.div>
          </div>
        </motion.div>

        {/* Amount and Currency */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 gap-4"
        >
          <div className="relative group">
            <motion.label className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-orange-500">
              Amount
            </motion.label>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="w-full px-4 py-3 bg-white/80 border border-gray-300/50 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-500/30 text-gray-800 placeholder-gray-400"
              placeholder="0.00"
            />
          </div>
          <div className="relative group">
            <motion.label className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-orange-500">
              Currency
            </motion.label>
            <select
              value={formData.currency}
              onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
              className="w-full px-4 py-3 bg-white/80 border border-gray-300/50 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-500/30 text-gray-800"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
          </div>
        </motion.div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ 
            scale: 1.05, 
            boxShadow: '0 0 20px rgba(255, 75, 43, 0.7), 0 0 40px rgba(255, 75, 43, 0.3)' 
          }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full py-4 px-6 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-orange-500/50 transition-all duration-300"
        >
          <motion.span
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Beam It Up!
          </motion.span>
        </motion.button>
      </form>

      {/* Cosmic Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 p-4 bg-gradient-to-br from-purple-500/10 to-teal-500/10 rounded-xl border border-white/20 relative z-10"
      >
        <div className="flex items-start gap-3">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            className="text-2xl text-purple-500"
          >
            🌌
          </motion.div>
          <div>
            <h3 className="text-sm font-semibold text-purple-700">Cosmic Tip</h3>
            <p className="text-sm text-gray-600 mt-1">
              Double-check that phone number—don’t send your credits into a black hole!
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default AirtimeForm