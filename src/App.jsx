import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import ServiceSelector from './components/ServiceSelector'
import AirtimeForm from './components/forms/AirtimeForm'
import UtilityForm from './components/forms/UtilityForm'
import AirlineForm from './components/forms/AirlineForm'
import ReservationForm from './components/forms/ReservationForm'
import TransferForm from './components/forms/TransferForm'
import PaymentForm from './components/forms/PaymentForm'

function App() {
  const [selectedProvider, setSelectedProvider] = useState(null)
  const [step, setStep] = useState('select-service')
  const [paymentDetails, setPaymentDetails] = useState(null)

  const handleProviderSelect = (provider) => {
    setSelectedProvider(provider)
    setStep('enter-details')
  }

  const handleBack = () => {
    if (step === 'payment') {
      setStep('enter-details')
      setPaymentDetails(null)
    } else {
      setStep('select-service')
      setSelectedProvider(null)
    }
  }

  const handleSubmit = (formData) => {
    setPaymentDetails(formData)
    setStep('payment')
  }

  const handlePaymentSubmit = (paymentData) => {
    console.log('Payment submitted:', { ...paymentDetails, payment: paymentData })
    // Handle payment submission
  }

  const renderForm = () => {
    if (!selectedProvider) return null

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

    switch (selectedProvider.category) {
      case 'Airtime':
        return <AirtimeForm {...props} />
      case 'Airlines':
        return <AirlineForm {...props} />
      case 'Reservations':
        return <ReservationForm {...props} />
      case 'Utilities':
        return <UtilityForm {...props} />
      case 'Transfers':
        return <TransferForm {...props} />
      default:
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
