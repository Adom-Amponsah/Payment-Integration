import { motion } from 'framer-motion'
import { useState } from 'react'

const UtilityForm = ({ provider, onSubmit, onBack }) => {
  const [formData, setFormData] = useState({
    meterNumber: '',
    amount: '',
    currency: 'USD',
    utilityType: 'electricity', // New field specific to utilities
    accountName: '' // New field for account verification
  })

  // Explicit handler for back button
  const handleBackClick = (e) => {
    e.preventDefault()
    console.log('Back button clicked in UtilityForm')
    if (typeof onBack === 'function') {
      onBack()
    }
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="relative bg-slate-50 p-6"
    >
      {/* Decorative utility elements */}
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
              <motion.div
                animate={{ rotate: [0, 15, 0, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="text-lg"
              >
                ⚡
              </motion.div>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-800">
                {provider.name}
              </h2>
              <p className="text-xs text-slate-500">Utility Payment</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={(e) => {
        e.preventDefault()
        onSubmit(formData)
      }}>
        <div className="space-y-5">
          {/* Utility Type Selector - New element */}
          {/* <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-medium text-slate-700 mb-3">Utility Type</h3>
            <div className="grid grid-cols-3 gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => setFormData({ ...formData, utilityType: 'electricity' })}
                className={`p-3 rounded-lg flex flex-col items-center justify-center transition-all ${
                  formData.utilityType === 'electricity' 
                    ? 'bg-blue-50 border-blue-200 border' 
                    : 'bg-slate-50 border-slate-100 border'
                }`}
              >
                <div className="text-xl mb-1">⚡</div>
                <span className="text-xs font-medium text-slate-700">Electricity</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => setFormData({ ...formData, utilityType: 'water' })}
                className={`p-3 rounded-lg flex flex-col items-center justify-center transition-all ${
                  formData.utilityType === 'water' 
                    ? 'bg-blue-50 border-blue-200 border' 
                    : 'bg-slate-50 border-slate-100 border'
                }`}
              >
                <div className="text-xl mb-1">💧</div>
                <span className="text-xs font-medium text-slate-700">Water</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => setFormData({ ...formData, utilityType: 'gas' })}
                className={`p-3 rounded-lg flex flex-col items-center justify-center transition-all ${
                  formData.utilityType === 'gas' 
                    ? 'bg-blue-50 border-blue-200 border' 
                    : 'bg-slate-50 border-slate-100 border'
                }`}
              >
                <div className="text-xl mb-1">🔥</div>
                <span className="text-xs font-medium text-slate-700">Gas</span>
              </motion.button>
            </div>
          </div> */}

          {/* Meter Number Input */}
          <div className="relative">
            <motion.label
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Meter Number
            </motion.label>
            <motion.div
              whileFocus={{ scale: 1.01 }}
              className="relative"
            >
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <input
                type="text"
                value={formData.meterNumber}
                onChange={(e) => setFormData({ ...formData, meterNumber: e.target.value })}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 bg-white"
                placeholder="Enter meter number"
              />
              <motion.div 
                animate={{ 
                  opacity: [1, 0.5, 1],
                  scale: [1, 1.05, 1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2"
              >
                <span className="text-xs text-slate-400">Scanning</span>
                <svg className="w-4 h-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4v16M7 4v16M11 4v16M15 4v16M19 4v16" />
                </svg>
              </motion.div>
            </motion.div>
          </div>

          {/* Account Name - New field */}
          <div className="relative">
            <motion.label
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Account Name
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
                value={formData.accountName}
                onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 bg-white"
                placeholder="Name on utility account"
              />
            </motion.div>
          </div>

          {/* Amount and Currency */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-medium text-slate-700 mb-3">Payment Details</h3>
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
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</div>
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="w-full pl-8 py-3 rounded-lg border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 text-right pr-4"
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
            <div className="mt-4 pt-3 border-t border-slate-100">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500">Service Fee</span>
                <span className="text-sm font-medium text-slate-700">$1.25</span>
              </div>
            </div>
          </div>

          {/* Usage Estimate - New element */}
          {/* <motion.div 
            className="bg-blue-50 p-4 rounded-xl border border-blue-100"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-1 bg-blue-100 rounded-full">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-sm font-medium text-slate-700">Usage Estimate</h3>
            </div>
            <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: formData.amount ? `${Math.min(parseInt(formData.amount) / 2, 100)}%` : "5%" }}
                className="h-full bg-gradient-to-r from-blue-400 to-cyan-400"
              />
            </div>
            <div className="mt-2 flex justify-between text-xs text-slate-600">
              <span>Low</span>
              <span>Average</span>
              <span>High</span>
            </div>
            <p className="mt-2 text-xs text-blue-600">
              {formData.amount 
                ? `Based on your payment amount, we estimate this covers approximately ${Math.round(parseInt(formData.amount) * 0.8)} kWh of electricity usage.`
                : "Enter an amount to see your estimated utility usage."}
            </p>
          </motion.div> */}

          {/* Payment summary */}
          <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-slate-700">Total Payment</span>
              <span className="text-lg font-semibold text-slate-800">
                {formData.amount ? `${formData.currency} ${(parseFloat(formData.amount) + 1.25).toFixed(2)}` : `${formData.currency} 0.00`}
              </span>
            </div>
            <div className="text-xs text-slate-500 flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Includes service fee and taxes</span>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-4 px-6 bg-orange-600 text-white rounded-xl font-medium shadow-xl shadow-orange-500/20 hover:shadow-orange-500/30 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <span>Complete Payment</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </motion.button>
        </div>
      </form>

      {/* Utility Tips - New element */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 p-4 rounded-lg bg-white border border-slate-200 shadow-sm"
      >
        <div className="flex items-start gap-3">
          <div className="p-2 bg-orange-50 rounded-full">
            <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-700">Energy Saving Tip</h3>
            <p className="text-xs text-slate-500 mt-1">
              {formData.utilityType === 'electricity' && "LED bulbs use up to 90% less energy than traditional bulbs and last 15 times longer."}
              {formData.utilityType === 'water' && "Fixing a leaky faucet can save up to 3,000 gallons of water per year."}
              {formData.utilityType === 'gas' && "Lowering your thermostat by just 1°F can reduce your heating bill by up to 3%."}
              {!['electricity', 'water', 'gas'].includes(formData.utilityType) && "Smart meters can help you track and optimize your utility usage in real-time."}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default UtilityForm