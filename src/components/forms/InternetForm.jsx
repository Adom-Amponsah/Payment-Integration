import { motion } from 'framer-motion'
import { useState } from 'react'

const InternetForm = ({ provider, onSubmit, onBack }) => {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    packageType: 'data', // 'data' or 'wifi'
    plan: '',
    amount: '',
    currency: 'USD'
  })

  const internetPlans = {
    data: [
      { id: '1gb', name: '1GB', validity: '24 Hours', price: 1 },
      { id: '5gb', name: '5GB', validity: '7 Days', price: 5 },
      { id: '10gb', name: '10GB', validity: '30 Days', price: 10 },
      { id: 'unlimited', name: 'Unlimited', validity: '30 Days', price: 30 }
    ],
    wifi: [
      { id: 'basic', name: 'Basic', speed: '10 Mbps', price: 20 },
      { id: 'standard', name: 'Standard', speed: '25 Mbps', price: 35 },
      { id: 'premium', name: 'Premium', speed: '50 Mbps', price: 50 },
      { id: 'ultra', name: 'Ultra', speed: '100 Mbps', price: 75 }
    ]
  }

  const handlePlanSelect = (plan) => {
    setFormData({
      ...formData,
      plan: plan.id,
      amount: plan.price
    })
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
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute -right-20 -top-20 w-40 h-40 bg-orange-500/5 rounded-full blur-2xl"
        />
        <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-r from-orange-600/20 to-amber-400/10 rounded-t-2xl" />
      </div>

      {/* Status bar */}
      <div className="relative z-20 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-xs font-medium text-slate-600">Secure Connection</span>
          </div>
          <div className="text-xs text-slate-500 flex items-center gap-1">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-4 h-4"
            >
              🌐
            </motion.div>
            <span>High Speed</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="relative z-10 mb-6">
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-md border border-slate-100"
          >
            <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-lg">
              📶
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-800">
                {provider.name} Internet
              </h2>
              <p className="text-xs text-slate-500">Select your preferred plan</p>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Package Type Toggle */}
        <div className="bg-white rounded-lg p-1 flex shadow-sm">
          {['data', 'wifi'].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setFormData({ ...formData, packageType: type })}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                formData.packageType === type
                  ? 'bg-orange-100 text-orange-600'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {type === 'data' ? '📱 Mobile Data' : '📡 WiFi Package'}
            </button>
          ))}
        </div>

        {/* Phone Number Input */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            {formData.packageType === 'data' ? 'Phone Number' : 'Account Number'}
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {formData.packageType === 'data' ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                )}
              </svg>
            </div>
            <input
              type={formData.packageType === 'data' ? 'tel' : 'text'}
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
              placeholder={formData.packageType === 'data' ? 'Enter phone number' : 'Enter account number'}
              required
            />
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-2 gap-4">
          {internetPlans[formData.packageType].map((plan) => (
            <motion.button
              key={plan.id}
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handlePlanSelect(plan)}
              className={`relative p-4 rounded-xl border-2 transition-all duration-200 ${
                formData.plan === plan.id
                  ? 'border-orange-500 bg-orange-50/50 shadow-lg shadow-orange-500/10'
                  : 'border-slate-200 bg-white hover:border-orange-200'
              }`}
            >
              <div className="text-lg font-semibold text-slate-800 mb-1">
                {plan.name}
              </div>
              <div className="text-sm text-slate-500 mb-2">
                {formData.packageType === 'data' ? plan.validity : plan.speed}
              </div>
              <div className="text-xl font-bold text-orange-600">
                ${plan.price}
              </div>
              {formData.plan === plan.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-2 right-2 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center"
                >
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>

        {/* Network Quality Indicator */}
        {/* {formData.plan && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-orange-50 to-amber-50 p-4 rounded-xl border border-orange-100"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-600">Network Quality</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    animate={{
                      height: ['15px', '25px', '15px'],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                    className="w-1.5 bg-orange-500 rounded-full"
                  />
                ))}
              </div>
            </div>
            <div className="text-xs text-slate-500 flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Optimized for streaming and gaming</span>
            </div>
          </motion.div>
        )} */}

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={!formData.plan}
          className="w-full py-4 px-6 bg-orange-600 text-white rounded-xl font-medium shadow-xl shadow-orange-500/20 hover:shadow-orange-500/30 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70"
        >
          <span>Proceed to Payment</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </motion.button>
      </form>
    </motion.div>
  )
}

export default InternetForm 