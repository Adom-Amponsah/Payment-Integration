import { motion } from 'framer-motion'
import { useState } from 'react'

const TransferForm = ({ provider, onSubmit, onBack }) => {
  const [formData, setFormData] = useState({
    recipientName: '',
    accountNumber: '',
    amount: '',
    currency: 'USD',
    transferType: 'standard',
    note: ''
  })

  const handleBackClick = (e) => {
    e.preventDefault()
    if (typeof onBack === 'function') {
      onBack()
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="relative bg-slate-50 p-6"
    >
      {/* Decorative banking elements - enhanced for transfer theme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1],
            x: [0, 10, -10, 0],
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute -right-20 -top-20 w-40 h-40 bg-orange-500/5 rounded-full blur-2xl"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-0 left-0 w-full h-16 bg-gradient-to-r from-orange-600/20 to-amber-400/10 rounded-t-2xl"
        />
        <motion.div
          animate={{ 
            rotate: [0, -360],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-amber-500/5 to-transparent rounded-full blur-3xl"
        />
        
        {/* New animated money transfer illustration */}
        <motion.div
          animate={{ 
            x: [-10, 150],
            opacity: [0, 1, 0],
            scale: [0.8, 1, 0.8]
          }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
          className="absolute top-40 left-10 w-8 h-8 bg-green-500/30 rounded-full blur-sm"
        />
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-xs font-medium text-slate-600">Secure Transfer</span>
        </div>
        <div className="text-xs text-slate-500 flex items-center gap-1">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span>256-bit SSL</span>
        </div>
      </div>
      
      {/* Header with steps indicator */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleBackClick}
            type="button"
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-md border border-slate-100"
          >
            <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>
          <div className="flex items-center gap-3 mt-2">
            <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center border border-orange-100">
              <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-800">
                Money Transfer
              </h2>
              <p className="text-xs text-slate-500">Instant & Secure</p>
            </div>
          </div>
        </div>
      </div>

      {/* Combined Form */}
      <form onSubmit={handleSubmit}>
        <div className="space-y-5">
          {/* Recipient Information */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-4">
            {/* Recipient Name Input */}
            <div className="relative">
              <motion.label
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Recipient Name
              </motion.label>
              <motion.div
                whileFocus={{ scale: 1.01 }}
                className="relative"
              >
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={formData.recipientName}
                  onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 bg-white"
                  placeholder="Enter recipient's full name"
                  required
                />
              </motion.div>
            </div>

            {/* Account Number Input */}
            <div className="relative">
              <motion.label
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Account Number
              </motion.label>
              <motion.div
                whileFocus={{ scale: 1.01 }}
                className="relative"
              >
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={formData.accountNumber}
                  onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 bg-white"
                  placeholder="Enter account number"
                  required
                />
                <motion.div 
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2"
                  animate={{ opacity: formData.accountNumber.length > 8 ? 1 : 0 }}
                >
                  <span className="text-xs text-slate-400">Validated</span>
                  <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
              </motion.div>
            </div>

            {/* Add Amount and Currency */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <motion.label
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Amount
                </motion.label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="w-full pl-11 py-3 rounded-lg border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>

              <div className="relative">
                <motion.label
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Currency
                </motion.label>
                <select
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 bg-white appearance-none"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                </select>
              </div>
            </div>

            {/* Note field */}
            {/* <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Note (Optional)
              </label>
              <textarea
                value={formData.note}
                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                placeholder="Add a note for the recipient"
                rows={2}
              ></textarea>
            </div> */}
          </div>

          {/* Payment summary */}
          <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-slate-700">Total Amount</span>
              <span className="text-lg font-semibold text-slate-800">
                {formData.amount 
                  ? `${formData.currency} ${(parseFloat(formData.amount) + (formData.transferType === 'instant' ? 2.99 : 0)).toFixed(2)}` 
                  : `${formData.currency} 0.00`
                }
              </span>
            </div>
            <div className="text-xs text-slate-500 flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Includes {formData.transferType === 'instant' ? 'instant transfer' : 'standard transfer'} fee</span>
            </div>
          </div>

          {/* Submit Button with animated icons */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-4 px-6 bg-orange-600 text-white rounded-xl font-medium shadow-xl shadow-orange-500/20 hover:shadow-orange-500/30 transition-all duration-200 flex items-center justify-center gap-2 overflow-hidden group"
          >
            <span>Complete Transfer</span>
            <div className="relative w-5 h-5">
              <motion.svg 
                className="w-5 h-5 absolute"
                animate={{ opacity: [1, 0], y: [0, -10] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </motion.svg>
              <motion.svg 
                className="w-5 h-5 absolute"
                animate={{ opacity: [0, 1], y: [10, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </motion.svg>
            </div>
          </motion.button>
        </div>
      </form>

      {/* Security Banner */}
      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6 p-4 rounded-lg bg-white border border-slate-200 shadow-sm"
      >
        <div className="flex items-start gap-3">
          <div className="p-2 bg-indigo-50 rounded-full">
            <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-700">Secure Transaction</h3>
            <p className="text-xs text-slate-500 mt-1">
              Your transfer is protected with end-to-end encryption. We monitor all transfers for suspicious activity.
            </p>
          </div>
        </div>
      </motion.div> */}

      {/* Transfer partners */}
      {/* <div className="mt-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xs text-slate-400 mb-2">Trusted by leading financial institutions</p>
          <div className="flex items-center justify-center gap-4">
            <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center opacity-50"></div>
            <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center opacity-50"></div>
            <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center opacity-50"></div>
            <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center opacity-50"></div>
          </div>
        </div>
      </div> */}
    </motion.div>
  )
}

export default TransferForm