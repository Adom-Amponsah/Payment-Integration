import { motion } from 'framer-motion'
import { useState } from 'react'
import { useIntl } from 'react-intl'
import { FaApple, FaFacebook, FaGoogle, FaTwitter } from 'react-icons/fa'
import SocialButton from '../buttons/SocialButton'

const UserAuthStep = ({ transactionData, onComplete, onBack }) => {
  const intl = useIntl()
  const [authMode, setAuthMode] = useState('login') // 'login' or 'signup'
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phoneNumber: transactionData?.phoneNumber || ''
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsProcessing(true)

    try {
      // Validate form
      if (authMode === 'signup') {
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Passwords do not match')
        }
        if (formData.password.length < 6) {
          throw new Error('Password must be at least 6 characters')
        }
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Mock user data
      const userData = {
        id: 'usr_' + Math.random().toString(36).substr(2, 9),
        name: authMode === 'login' ? formData.email.split('@')[0] : formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber
      }

      // Complete the transaction with user data
      onComplete({
        transactionData,
        userData
      })
    } catch (err) {
      setError(err.message || 'Authentication failed')
    } finally {
      setIsProcessing(false)
    }
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
          animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -right-20 -top-20 w-40 h-40 bg-orange-500/5 rounded-full blur-2xl"
        />
        <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-r from-orange-600/20 to-amber-400/10 rounded-t-2xl" />
      </div>

      {/* Status bar */}
      <div className="relative z-20 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-xs font-medium text-slate-600">Secure Authentication</span>
          </div>
          <div className="text-xs text-slate-500 flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>256-bit SSL</span>
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
          <div>
            <h2 className="text-lg font-semibold text-slate-800">
              {intl.formatMessage({ 
                id: authMode === 'login' ? 'auth.signIn' : 'auth.createAccount',
                defaultMessage: authMode === 'login' ? "Sign In" : "Create Account"
              })}
            </h2>
            <p className="text-xs text-slate-500">
              {intl.formatMessage({ 
                id: authMode === 'login' ? 'auth.signInDesc' : 'auth.createAccountDesc',
                defaultMessage: authMode === 'login' 
                  ? "Sign in to complete your transaction" 
                  : "Create an account to continue"
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Auth Mode Toggle */}
      <div className="bg-white rounded-lg p-1 flex mb-6 shadow-sm">
        <button 
          onClick={() => setAuthMode('login')}
          className={`flex-1 py-2 text-sm font-medium rounded-md transition ${
            authMode === 'login' 
              ? 'bg-orange-100 text-orange-600' 
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Login
        </button>
        <button 
          onClick={() => setAuthMode('signup')}
          className={`flex-1 py-2 text-sm font-medium rounded-md transition ${
            authMode === 'signup' 
              ? 'bg-orange-100 text-orange-600' 
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Sign Up
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            {intl.formatMessage({ id: 'auth.email', defaultMessage: "Email Address" })}
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200"
              placeholder={intl.formatMessage({ id: 'auth.enterEmail', defaultMessage: "Enter your email" })}
              required
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            {intl.formatMessage({ id: 'auth.password', defaultMessage: "Password" })}
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200"
              placeholder={intl.formatMessage({ id: 'auth.enterPassword', defaultMessage: "Enter your password" })}
              required
            />
          </div>
        </div>

        {/* Additional Sign Up Fields */}
        {authMode === 'signup' && (
          <>
            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                {intl.formatMessage({ id: 'auth.confirmPassword', defaultMessage: "Confirm Password" })}
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200"
                  placeholder={intl.formatMessage({ id: 'auth.reenterPassword', defaultMessage: "Re-enter your password" })}
                  required
                />
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                {intl.formatMessage({ id: 'auth.fullName', defaultMessage: "Full Name" })}
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200"
                  placeholder={intl.formatMessage({ id: 'auth.enterName', defaultMessage: "Enter your full name" })}
                  required
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                {intl.formatMessage({ id: 'auth.phoneNumber', defaultMessage: "Phone Number" })}
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200"
                  placeholder={intl.formatMessage({ id: 'auth.enterPhone', defaultMessage: "Enter your phone number" })}
                  required
                />
              </div>
            </div>
          </>
        )}

        {/* Error Message */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isProcessing}
          className="w-full py-4 px-6 bg-orange-600 text-white rounded-xl font-medium shadow-xl shadow-orange-500/20 hover:shadow-orange-500/30 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {isProcessing ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            <>
              <span>{intl.formatMessage({ 
                id: authMode === 'login' ? 'auth.signIn' : 'auth.createAccount',
                defaultMessage: authMode === 'login' ? "Sign In" : "Create Account"
              })}</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </>
          )}
        </motion.button>

        {/* Social Login Buttons */}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-slate-50 text-slate-500">
                {intl.formatMessage({ id: 'auth.orContinueWith', defaultMessage: "Or continue with" })}
              </span>
            </div>
          </div>

          <div className="mt-6 flex space-x-3">
            <SocialButton Icon={FaGoogle} bgColor="bg-red-500" />
            <SocialButton Icon={FaApple} bgColor="bg-black" />
            <SocialButton Icon={FaFacebook} bgColor="bg-blue-600" />
            {/* <SocialButton Icon={FaTwitter} bgColor="bg-blue-400" /> */}
          </div>
        </div>

        {/* Toggle Link */}
        <div className="text-center mt-4">
          <button
            type="button"
            onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
            className="text-sm text-orange-600 hover:text-orange-700"
          >
            {intl.formatMessage({ 
              id: authMode === 'login' ? 'auth.noAccount' : 'auth.haveAccount',
              defaultMessage: authMode === 'login'
                ? "Don't have an account? Sign up"
                : "Already have an account? Sign in"
            })}
          </button>
        </div>
      </form>
    </motion.div>
  )
}

export default UserAuthStep 