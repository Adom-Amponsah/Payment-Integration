import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import ServiceSelector from './components/ServiceSelector'
import AirtimeForm from './components/forms/AirtimeForm'
import UtilityForm from './components/forms/UtilityForm'
import AirlineForm from './components/forms/AirlineForm'
import ReservationForm from './components/forms/ReservationForm'
import TransferForm from './components/forms/TransferForm'
import PaymentForm from './components/forms/PaymentForm'
import UserAuthStep from './components/forms/UserAuthStep'

function App() {
  const [selectedProvider, setSelectedProvider] = useState(null)
  const [step, setStep] = useState('select-service')
  const [paymentDetails, setPaymentDetails] = useState(null)
  const [transactionData, setTransactionData] = useState(null)

  const handleProviderSelect = (provider) => {
    console.log('Selected Provider:', provider)
    setSelectedProvider(provider)
    setStep('enter-details')
  }

  const handleBack = () => {
    switch (step) {
      case 'payment':
        setStep('enter-details')
        setPaymentDetails(null)
        break
      case 'auth':
        setStep('payment')
        break
      default:
        setStep('select-service')
        setSelectedProvider(null)
        setTransactionData(null)
    }
  }

  const handleSubmit = (formData) => {
    setPaymentDetails(formData)
    setTransactionData({
      ...formData,
      provider: selectedProvider
    })
    setStep('payment')
  }

  const handlePaymentSubmit = (paymentData) => {
    setTransactionData(prev => ({
      ...prev,
      payment: paymentData
    }))
    setStep('auth')
  }

  const handleAuthComplete = (data) => {
    console.log('Complete transaction with:', {
      ...data,
      provider: selectedProvider,
      payment: paymentDetails
    })
    setStep('select-service')
    setSelectedProvider(null)
    setPaymentDetails(null)
    setTransactionData(null)
  }

  const renderForm = () => {
    if (!selectedProvider) return null

    if (step === 'auth') {
      return (
        <UserAuthStep
          transactionData={transactionData}
          onComplete={handleAuthComplete}
          onBack={handleBack}
        />
      )
    }

    if (step === 'payment') {
      return (
        <PaymentForm 
          amount={paymentDetails.amount}
          currency={paymentDetails.currency || 'USD'}
          onBack={handleBack}
          onSubmit={handlePaymentSubmit}
        />
      )
    }

    const props = {
      provider: selectedProvider,
      onSubmit: handleSubmit,
      onBack: handleBack
    }

    const category = selectedProvider?.type || selectedProvider?.category || ''
    console.log('Provider Category:', category)

    switch (category.toLowerCase()) {
      case 'airtime':
        return <AirtimeForm {...props} />
      case 'airline':
      case 'airlines':
        return <AirlineForm {...props} />
      case 'reservation':
      case 'reservations':
        return <ReservationForm {...props} />
      case 'utility':
      case 'utilities':
        return <UtilityForm {...props} />
      case 'transfer':
      case 'transfers':
        return <TransferForm {...props} />
      default:
        console.log('No matching category found, defaulting to Airtime')
        return <AirtimeForm {...props} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50 to-primary-50 flex items-center justify-center p-6">
      <div className="w-[450px] backdrop-blur-xl rounded-3xl shadow-2xl relative overflow-hidden border border-white/20 bg-slate-50">
        <AnimatePresence mode="wait">
          {step === 'select-service' ? (
            <ServiceSelector onSelect={handleProviderSelect} />
          ) : (
            renderForm()
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default App
