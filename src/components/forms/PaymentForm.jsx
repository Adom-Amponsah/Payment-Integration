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

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                staggerChildren: 0.1
            }
        },
        exit: {
            opacity: 0,
            y: -20,
            transition: { duration: 0.3 }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    }

    // Card logos
    const cardLogos = [
        { name: 'Visa', color: '#1A1F71' },
        { name: 'Mastercard', color: '#EB001B' },
        { name: 'Amex', color: '#006FCF' },
        { name: 'Discover', color: '#FF6000' }
    ]

    // Mobile money providers with colors
    const mobileProviders = [
        { value: 'mpesa', name: 'MPesa', color: '#4CAF50' },
        { value: 'airtel', name: 'Airtel Money', color: '#E53935' },
        { value: 'tigopesa', name: 'Vodacom', color: '#2196F3' }
    ]

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8 rounded-2xl shadow-lg border border-slate-200"
        >
            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl" />
                <div className="absolute -bottom-32 -left-20 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl" />
                <div className="absolute top-1/4 right-1/4 w-20 h-20 bg-orange-500/10 rounded-full blur-xl" />
                <div className="absolute w-full h-36 top-0 left-0 bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-red-500/10 rounded-t-2xl" />
            </div>

            {/* Security badge */}
            {/* <div className="absolute top-6 right-6 flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-slate-200">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-medium text-slate-700">Secured Payment</span>
                <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            </div> */}

            {/* Header */}
            <div className="mb-8 relative z-10">
                <div className="flex items-center gap-4 mb-6">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={onBack}
                        type="button"
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md border border-slate-100 text-orange-600 hover:bg-orange-50 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </motion.button>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">Payment Method</h2>
                        <p className="text-slate-500 text-sm mt-1">Choose how you'd like to pay</p>
                    </div>
                </div>

                {/* Amount Display */}
                {/* <motion.div
                    variants={itemVariants}
                    className="bg-gradient-to-br from-indigo-600 to-indigo-800 p-6 rounded-xl shadow-lg shadow-indigo-600/20"
                >
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-indigo-200 text-sm font-medium">Amount to Pay</p>
                            <p className="text-3xl font-bold text-white mt-1">{currency} {parseFloat(amount).toFixed(2)}</p>
                        </div>
                        <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center">
                            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-indigo-500/30">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-1.5">
                                <svg className="w-4 h-4 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-xs text-indigo-200">Includes all transaction fees</span>
                            </div>
                            <div className="text-xs text-indigo-200 flex items-center gap-1">
                                <span>Transaction ID:</span>
                                <span className="font-medium">TXN-{Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}</span>
                            </div>
                        </div>
                    </div>
                </motion.div> */}
            </div>

            {/* Payment Method Selection */}
            <motion.div variants={itemVariants} className="mb-8 flex flex-col items-center">
                {/* <h3 className="text-slate-700 font-medium mb-4">Select Payment Method</h3> */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                    <motion.button
                        whileHover={{ scale: 1.02, y: -5 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setPaymentMethod('mobile')}
                        className={`p-4 md:p-6 rounded-xl bg-white border-2 transition-all duration-300 relative overflow-hidden ${
                            paymentMethod === 'mobile'
                                ? 'border-orange-500 shadow-lg shadow-orange-100'
                                : 'border-slate-200 hover:border-orange-300'
                        }`}
                    >
                        <div className={`absolute inset-0 bg-orange-50 transition-all duration-500 ${paymentMethod === 'mobile' ? 'opacity-100' : 'opacity-0'
                            }`} />

                        <div className="relative z-10 flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-3">
                                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-slate-800">Mobile Money</h3>
                            <p className="text-sm text-slate-500 mt-1">Fast and secure mobile payments</p>

                            {paymentMethod === 'mobile' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="absolute top-3 right-3 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center"
                                >
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </motion.div>
                            )}
                        </div>
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.02, y: -5 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setPaymentMethod('card')}
                        className={`p-4 md:p-6 rounded-xl bg-white border-2 transition-all duration-300 relative overflow-hidden ${
                            paymentMethod === 'card'
                                ? 'border-orange-500 shadow-lg shadow-orange-100'
                                : 'border-slate-200 hover:border-orange-300'
                        }`}
                    >
                        <div className={`absolute inset-0 bg-orange-50 transition-all duration-500 ${paymentMethod === 'card' ? 'opacity-100' : 'opacity-0'
                            }`} />

                        <div className="relative z-10 flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-3">
                                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-slate-800">Card Payment</h3>
                            <p className="text-sm text-slate-500 mt-1">Pay with credit/debit card</p>

                            {paymentMethod === 'card' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="absolute top-3 right-3 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center"
                                >
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </motion.div>
                            )}
                        </div>
                    </motion.button>
                </div>
            </motion.div>

            {/* Forms */}
            <AnimatePresence mode="wait">
                {paymentMethod === 'mobile' && (
                    <motion.form
                        key="mobile"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        onSubmit={(e) => {
                            e.preventDefault()
                            onSubmit({ method: 'mobile', ...formData })
                        }}
                        className="space-y-6"
                    >
                        <div className="bg-white p-4 md:p-6 rounded-xl border border-slate-200 shadow-sm space-y-4 md:space-y-5">
                            <h3 className="font-medium text-slate-800 flex items-center gap-2 pb-3 border-b border-slate-100">
                                <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                                Mobile Money Details
                            </h3>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 mb-4">
                                {mobileProviders.map((provider) => (
                                    <motion.button
                                        whileHover={{ y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="button"
                                        key={provider.value}
                                        onClick={() => setFormData({ ...formData, provider: provider.value })}
                                        className={`px-2 md:px-3 py-2 md:py-2.5 rounded-lg border-2 flex flex-col items-center justify-center transition-all ${
                                            formData.provider === provider.value
                                                ? `border-${provider.color} bg-${provider.color}/10`
                                                : 'border-slate-200 hover:border-slate-300'
                                        }`}
                                    >
                                        <div className="w-6 h-6 md:w-8 md:h-8 rounded-full mb-1" style={{ backgroundColor: provider.color }}></div>
                                        <span className="text-xs font-medium text-slate-700">{provider.name}</span>
                                    </motion.button>
                                ))}
                            </div>

                            <div className="relative">
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                    Mobile Number
                                </label>
                                <div className="relative">
                                    <div className="absolute left-4 inset-y-0 flex items-center pointer-events-none">
                                        <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="tel"
                                        value={formData.mobileNumber}
                                        onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                                        placeholder="Enter mobile number"
                                        className="w-full pl-10 md:pl-12 pr-4 py-3 md:py-3.5 rounded-lg border border-slate-200 text-sm md:text-base focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                                    />
                                </div>
                                <p className="mt-2 text-xs md:text-sm text-slate-500 flex items-center gap-1.5">
                                    <svg className="w-3 h-3 md:w-3.5 md:h-3.5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>You'll receive a confirmation prompt on your mobile device</span>
                                </p>
                            </div>
                        </div>

                        {/* Payment summary */}
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-slate-600">You'll pay</span>
                                <span className="text-lg font-semibold text-slate-800">{currency} {parseFloat(amount).toFixed(2)}</span>
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.01, boxShadow: '0 10px 25px -5px rgba(234, 88, 12, 0.4)' }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="w-full py-3 md:py-4 px-4 md:px-6 bg-orange-600 text-white rounded-xl font-medium text-sm md:text-base shadow-xl shadow-orange-500/20 hover:bg-orange-700 transition-all duration-200 flex items-center justify-center gap-2"
                        >
                            <span>Complete Payment</span>
                            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </motion.button>
                    </motion.form>
                )}

                {paymentMethod === 'card' && (
                    <motion.form
                        key="card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        onSubmit={(e) => {
                            e.preventDefault()
                            onSubmit({ method: 'card', ...formData })
                        }}
                        className="space-y-6"
                    >
                        <div className="bg-white p-4 md:p-6 rounded-xl border border-slate-200 shadow-sm space-y-4 md:space-y-5">
                            <h3 className="font-medium text-slate-800 flex items-center gap-2 pb-3 border-b border-slate-100">
                                <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                </svg>
                                Card Details
                            </h3>

                            {/* Card Number - Full Width Row */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                    Card Number
                                </label>
                                <div className="relative">
                                    <div className="absolute left-4 inset-y-0 flex items-center pointer-events-none">
                                        <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        value={formData.cardNumber}
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/\D/g, '').slice(0, 16)
                                            setFormData({ ...formData, cardNumber: value })
                                        }}
                                        placeholder="1234 5678 9012 3456"
                                        className="w-full pl-12 pr-4 py-3.5 rounded-lg border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                                    />
                                </div>
                            </div>

                            {/* Expiry Date and CVV in one row */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                        Expiry Date
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.expiryDate}
                                        onChange={(e) => {
                                            let value = e.target.value.replace(/\D/g, '')
                                            if (value.length > 2) {
                                                value = value.slice(0, 2) + '/' + value.slice(2, 4)
                                            }
                                            setFormData({ ...formData, expiryDate: value })
                                        }}
                                        placeholder="MM/YY"
                                        className="w-full px-4 py-3.5 rounded-lg border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                        CVV
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="cvv"
                                            type="text"
                                            value={formData.cvv}
                                            onChange={(e) => {
                                                const value = e.target.value.replace(/\D/g, '').slice(0, 3)
                                                setFormData({ ...formData, cvv: value })
                                            }}
                                            placeholder="123"
                                            className="w-full px-4 py-3.5 rounded-lg border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                                        />
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <div className="relative inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        id="saveCard"
                                        checked={formData.saveCard}
                                        onChange={(e) => setFormData({ ...formData, saveCard: e.target.checked })}
                                        className="peer sr-only"
                                    />
                                    <div className="w-5 h-5 border border-slate-300 rounded peer-checked:bg-orange-500 peer-checked:border-orange-500 transition-all"></div>
                                    <svg
                                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-white opacity-0 peer-checked:opacity-100"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <label htmlFor="saveCard" className="ml-2 text-sm text-slate-700 cursor-pointer">
                                        Save card for future payments
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Payment summary */}
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-slate-600">You'll pay</span>
                                <span className="text-lg font-semibold text-slate-800">{currency} {parseFloat(amount).toFixed(2)}</span>
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.01, boxShadow: '0 10px 25px -5px rgba(79, 70, 229, 0.4)' }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="w-full py-4 px-6 bg-orange-600 text-white rounded-xl font-medium shadow-xl shadow-orange-500/20 hover:bg-orange-700 transition-all duration-200 flex items-center justify-center gap-2"
                        >
                            <span>Complete Payment</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </motion.button>
                    </motion.form>
                )}

                {/* Display help text when no payment method is selected */}
                {!paymentMethod && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 p-6 bg-white rounded-xl border border-slate-200 text-center"
                    >
                        <div className="w-16 h-16 bg-orange-100 rounded-full mx-auto flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-slate-800 mb-2">Choose a Payment Method</h3>
                        <p className="text-slate-500 text-sm">Select one of the payment options above to continue with your payment.</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Payment Security and Help Section */}
            <motion.div
                variants={itemVariants}
                className="mt-8 text-center space-y-4"
            >
                {/* <div className="flex items-center justify-center gap-3">
                    {cardLogos.map((logo, index) => (
                        <div
                            key={index}
                            className="w-10 h-6 rounded border border-slate-200 flex items-center justify-center text-xs font-semibold"
                            style={{ backgroundColor: logo.color, color: 'white' }}
                        >
                            {logo.name.substring(0, 1)}
                        </div>
                    ))}
                </div> */}

                <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span>Secured with 256-bit encryption</span>
                </div>
            </motion.div>

            {/* Chat Support Button */}
            {/* <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 flex items-center justify-center hover:bg-indigo-700 transition-colors"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
            </motion.button> */}
        </motion.div>
    )
}

// Function to format card number with spaces
const formatCardNumber = (value) => {
    if (!value) return ''
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = matches && matches[0] || ''
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
        parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
        return parts.join(' ')
    } else {
        return value
    }
}

// Function to format expiry date
const formatExpiryDate = (value) => {
    const val = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (val.length > 2) {
        return val.slice(0, 2) + '/' + val.slice(2, 4)
    }
    return val
}

// Function to validate mobile number
const validateMobileNumber = (number) => {
    // Basic validation - could be expanded based on specific country requirements
    return /^[0-9]{10,12}$/.test(number.replace(/\s+/g, ''))
}

// Function to validate card details
const validateCard = (card) => {
    const errors = {}

    // Validate card number (basic Luhn algorithm)
    if (!card.cardNumber || card.cardNumber.replace(/\s+/g, '').length < 13) {
        errors.cardNumber = 'Please enter a valid card number'
    }

    // Validate expiry date
    if (!card.expiryDate || !/^\d{2}\/\d{2}$/.test(card.expiryDate)) {
        errors.expiryDate = 'Please enter a valid expiry date'
    } else {
        const [month, year] = card.expiryDate.split('/')
        const now = new Date()
        const currentYear = now.getFullYear() % 100
        const currentMonth = now.getMonth() + 1

        if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
            errors.expiryDate = 'Card has expired'
        }
    }

    // Validate CVV
    if (!card.cvv || !/^\d{3,4}$/.test(card.cvv)) {
        errors.cvv = 'Please enter a valid CVV'
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    }
}

export default PaymentForm