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
      className="relative bg-slate-50 p-6 "
    >
      {/* Decorative banking elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -right-20 -top-20 w-40 h-40 bg-orange-500/5 rounded-full blur-2xl"
        />
        <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-r from-orange-600/20 to-amber-400/10 rounded-t-2xl" />
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-amber-500/5 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-xs font-medium text-slate-600">Secure Transaction</span>
        </div>
        <div className="text-xs text-slate-500 flex items-center gap-1">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span>256-bit SSL</span>
        </div>
      </div>
      
      {/* Header */}
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
          <div className="flex items-center gap-3 mt-4">
            <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center border border-orange-100">
              {/* <img
                src={provider.logo || '/path/to/default.png'}
                alt={provider.name}
                className="w-6 h-6 object-contain"
              /> */}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-800">
                {provider.name}
              </h2>
              <p className="text-xs text-slate-500">Airtime Purchase</p>
            </div>
          </div>
        </div>
        {/* <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full w-1/3 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"></div>
        </div> */}
      </div>

      {/* Form */}
      <form onSubmit={(e) => {
        e.preventDefault()
        onSubmit(formData)
      }}>
        <div className="space-y-5">
          {/* Phone Number Input */}
          <div className="relative">
            <motion.label
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Phone Number
            </motion.label>
            <motion.div
              whileFocus={{ scale: 1.01 }}
              className="relative"
            >
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <input
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 bg-white"
                placeholder="Enter phone number"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <span className="text-xs text-slate-400">Verified</span>
                <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </motion.div>
          </div>

          {/* Amount and Currency */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-medium text-slate-700 mb-3">Transaction Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <motion.label
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="block text-xs font-medium text-slate-600 mb-1"
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
                    className="w-full pl-11 py-3 rounded-lg border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 text-right pr-4"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="relative">
                <motion.label
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="block text-xs font-medium text-slate-600 mb-1"
                >
                  Currency
                </motion.label>
                <div className="relative">
                  <select
                    value={formData.currency}
                    onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 bg-white appearance-none"
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500">Processing Fee</span>
                <span className="text-sm font-medium text-slate-700">$0.50</span>
              </div>
            </div>
          </div>

          {/* Payment summary */}
          <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-slate-700">Total Amount</span>
              <span className="text-lg font-semibold text-slate-800">
                {formData.amount ? `${formData.currency} ${(parseFloat(formData.amount) + 0.50).toFixed(2)}` : `${formData.currency} 0.00`}
              </span>
            </div>
            <div className="text-xs text-slate-500 flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Includes processing fee and taxes</span>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-4 px-6 bg-orange-600 text-white rounded-xl font-medium shadow-xl shadow-orange-500/20 hover:shadow-orange-500/30 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <span>Proceed to Payment</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
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
          <div className="p-2 bg-orange-50 rounded-full">
            <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-700">Secure Transaction</h3>
            <p className="text-xs text-slate-500 mt-1">
              Your payment information is securely encrypted with bank-level security. We never store your full card details.
            </p>
          </div>
        </div>
      </motion.div> */}
      
      {/* Payment methods */}
      {/* <div className="mt-6 flex items-center justify-center gap-3">
        <div className="w-8 h-5 bg-slate-100 rounded"></div>
        <div className="w-8 h-5 bg-slate-100 rounded"></div>
        <div className="w-8 h-5 bg-slate-100 rounded"></div>
        <div className="w-8 h-5 bg-slate-100 rounded"></div>
        <span className="text-xs text-slate-400">Accepted payment methods</span>
      </div> */}
    </motion.div>
  )
}

export default AirtimeForm