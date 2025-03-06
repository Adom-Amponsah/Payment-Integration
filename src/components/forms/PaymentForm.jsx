import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const PaymentForm = ({ amount, currency, onBack, onSubmit }) => {
  const [paymentMethod, setPaymentMethod] = useState(null)
  const [formData, setFormData] = useState({
    mobileNumber: '',
    provider: 'mpesa',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    saveCard: false
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="relative"
    >
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
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
          <h2 className="text-xl font-semibold text-gray-800">Payment Method</h2>
        </div>

        {/* Amount Display */}
        <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
          <p className="text-sm text-gray-600">Amount to Pay</p>
          <p className="text-2xl font-bold text-gray-800">{currency} {amount}</p>
        </div>
      </div>

      {/* Payment Method Selection - Always visible now */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setPaymentMethod('mobile')}
          className={`p-6 rounded-xl bg-white border-2 transition-all ${
            paymentMethod === 'mobile' 
              ? 'border-orange-500 shadow-lg shadow-orange-100' 
              : 'border-orange-100 hover:border-orange-300'
          }`}
        >
          <div className="text-3xl mb-3">📱</div>
          <h3 className="font-semibold text-gray-800">Mobile Money</h3>
          <p className="text-sm text-gray-500 mt-1">Pay using mobile money</p>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setPaymentMethod('card')}
          className={`p-6 rounded-xl bg-white border-2 transition-all ${
            paymentMethod === 'card' 
              ? 'border-orange-500 shadow-lg shadow-orange-100' 
              : 'border-orange-100 hover:border-orange-300'
          }`}
        >
          <div className="text-3xl mb-3">💳</div>
          <h3 className="font-semibold text-gray-800">Card Payment</h3>
          <p className="text-sm text-gray-500 mt-1">Pay with credit/debit card</p>
        </motion.button>
      </div>

      {/* Forms */}
      <AnimatePresence mode="wait">
        {paymentMethod === 'mobile' && (
          <motion.form
            key="mobile"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onSubmit={(e) => {
              e.preventDefault()
              onSubmit({ method: 'mobile', ...formData })
            }}
            className="space-y-4"
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile Money Provider
                </label>
                <select
                  value={formData.provider}
                  onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                >
                  <option value="mpesa">M-Pesa</option>
                  <option value="airtel">Airtel Money</option>
                  <option value="tigopesa">Tigo Pesa</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  value={formData.mobileNumber}
                  onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                  placeholder="Enter mobile number"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-4 px-6 bg-[#ff4b2b] text-white rounded-xl font-medium shadow-xl shadow-orange-500/20 hover:shadow-orange-500/40 transition-all duration-200"
            >
              Pay Now
            </motion.button>
          </motion.form>
        )}

        {paymentMethod === 'card' && (
          <motion.form
            key="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onSubmit={(e) => {
              e.preventDefault()
              onSubmit({ method: 'card', ...formData })
            }}
            className="space-y-4"
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  value={formData.cardNumber}
                  onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                    placeholder="MM/YY"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CVV
                  </label>
                  <input
                    type="text"
                    value={formData.cvv}
                    onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                    placeholder="123"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="saveCard"
                  checked={formData.saveCard}
                  onChange={(e) => setFormData({ ...formData, saveCard: e.target.checked })}
                  className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                />
                <label htmlFor="saveCard" className="text-sm text-gray-600">
                  Save card for future payments
                </label>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-4 px-6 bg-[#ff4b2b] text-white rounded-xl font-medium shadow-xl shadow-orange-500/20 hover:shadow-orange-500/40 transition-all duration-200"
            >
              Pay Now
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>

      {!paymentMethod && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-gray-500 mt-4"
        >
          Select a payment method to continue
        </motion.div>
      )}
    </motion.div>
  )
}

export default PaymentForm 