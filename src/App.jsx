import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { IntlProvider } from 'react-intl'
import ServiceSelector from './components/ServiceSelector'
import AirtimeForm from './components/forms/AirtimeForm'
import UtilityForm from './components/forms/UtilityForm'
import AirlineForm from './components/forms/AirlineForm'
import ReservationForm from './components/forms/ReservationForm'
import TransferForm from './components/forms/TransferForm'
import PaymentForm from './components/forms/PaymentForm'
import UserAuthStep from './components/forms/UserAuthStep'
import InternetForm from './components/forms/InternetForm'
import enMessages from './translations/en'
import frMessages from './translations/fr'

function App() {
  const [selectedProvider, setSelectedProvider] = useState(null)
  const [step, setStep] = useState('select-service')
  const [paymentDetails, setPaymentDetails] = useState(null)
  const [transactionData, setTransactionData] = useState(null)
  const [locale, setLocale] = useState('en')

  const messages = {
    en: {
      'app.securePayment': 'Secure Payment',
      'app.quickPayments': 'Quick Payments',
      'app.selectService': 'Select a service category to proceed with your transaction',
      'app.secureTransactions': 'Transactions are secured with end-to-end encryption',
      'category.airtime': 'Airtime',
      'category.transfers': 'Transfers',
      'category.internet': 'Internet',
      'category.utilities': 'Utilities',
      'provider.vodacom': 'Vodacom',
      'provider.airtel': 'Airtel',
      'provider.orange': 'Orange',
      'provider.africell': 'Africell',
      'provider.gtp': 'GTP Transfer',
      'provider.water': 'Water Bill',
      'provider.electricity': 'Electricity',
      'app.secureConnection': 'Secure Connection',
      'internet.highSpeed': 'High Speed',
      'internet.mobileData': '📱 Mobile Data',
      'internet.wifiPackage': '📡 WiFi Package',
      'internet.selectPlan': 'Select your preferred plan',
      'internet.validity': '{duration} Hours',
      'internet.unlimited': 'Unlimited',
      'internet.basic': 'Basic',
      'internet.standard': 'Standard',
      'internet.premium': 'Premium',
      'internet.ultra': 'Ultra',
      'form.proceed': 'Proceed to Payment',
      'auth.signIn': 'Sign In',
      'auth.createAccount': 'Create Account',
      'auth.signInDesc': 'Sign in to complete your transaction',
      'auth.createAccountDesc': 'Create an account to continue',
      'auth.fullName': 'Full Name',
      'auth.enterName': 'Enter your full name',
      'auth.email': 'Email Address',
      'auth.enterEmail': 'Enter your email',
      'auth.password': 'Password',
      'auth.enterPassword': 'Enter your password',
      'auth.confirmPassword': 'Confirm Password',
      'auth.reenterPassword': 'Re-enter your password',
      'auth.orContinueWith': 'Or continue with',
      'auth.noAccount': "Don't have an account? Sign up",
      'auth.haveAccount': 'Already have an account? Sign in',
      'airtime.topup': 'Mobile top-up',
      'form.phoneNumber': 'Phone Number',
      'form.enterPhoneNumber': "Enter recipient's phone number",
      'form.amount': 'Amount',
      'form.enterAmount': 'Enter amount',
      'transfer.moneyTransfer': 'Send money securely',
      'transfer.recipientName': 'Recipient Name',
      'transfer.enterRecipientName': "Enter recipient's name",
      'transfer.accountNumber': 'Account Number',
      'transfer.enterAccountNumber': 'Enter account number',
      'transfer.description': 'Description',
      'transfer.enterDescription': 'Enter transfer description (optional)',
      'payment.title': 'Payment Details',
      'payment.amount': 'Amount to pay: {currency}{amount}',
      'payment.cardNumber': 'Card Number',
      'payment.enterCardNumber': 'Enter your card number',
      'payment.expiryDate': 'Expiry Date',
      'payment.cvv': 'CVV',
      'payment.cardholderName': 'Cardholder Name',
      'payment.enterName': 'Enter cardholder name',
      'payment.pay': 'Pay Now',
      'form.verified': 'Verified',
      'form.transactionDetails': 'Transaction Details',
      'form.currency': 'Currency',
      'form.processingFee': 'Processing Fee',
      'form.totalAmount': 'Total Amount',
      'form.includesFees': 'Includes processing fee and taxes',
      'utility.payment': 'Utility Payment',
      'utility.meterNumber': 'Meter Number',
      'utility.enterMeterNumber': 'Enter meter number',
      'utility.scanning': 'Scanning',
      'utility.accountName': 'Account Name',
      'utility.enterAccountName': 'Name on utility account',
      'payment.details': 'Payment Details',
      'form.serviceFee': 'Service Fee',
      'form.completePayment': 'Complete Payment',
      'payment.method': 'Payment Method',
      'payment.chooseMethod': "Choose how you'd like to pay",
      'payment.mobileMoney': 'Mobile Money',
      'payment.mobileDesc': 'Fast and secure mobile payments',
      'payment.cardPayment': 'Card Payment',
      'payment.cardDesc': 'Pay with credit/debit card',
      'payment.mobileDetails': 'Mobile Money Details',
      'payment.youllPay': "You'll pay",
      'payment.totalPayment': 'Total Payment',
      'payment.includesServiceFeeAndTaxes': 'Includes service fee and taxes',
      'payment.mobileNumber': 'Mobile Number',
      'payment.enterMobileNumber': 'Enter mobile number',
      'payment.confirmationPrompt': "You'll receive a confirmation prompt on your mobile device",
      'payment.saveCard': 'Save card for future payments',
      'payment.choosePaymentMethod': 'Choose a Payment Method',
      'payment.selectOption': 'Select one of the payment options above to continue with your payment.'
    },
    fr: {
      'app.securePayment': 'Paiement Sécurisé',
      'app.quickPayments': 'Paiements Rapides',
      'app.selectService': 'Sélectionnez une catégorie de service pour procéder à votre transaction',
      'app.secureTransactions': 'Les transactions sont sécurisées avec un cryptage de bout en bout',
      'category.airtime': 'Crédit Téléphonique',
      'category.transfers': 'Transferts',
      'category.internet': 'Internet',
      'category.utilities': 'Services Publics',
      'provider.vodacom': 'Vodacom',
      'provider.airtel': 'Airtel',
      'provider.orange': 'Orange',
      'provider.africell': 'Africell',
      'provider.gtp': 'Transfert GTP',
      'provider.water': 'Facture d\'eau',
      'provider.electricity': 'Électricité',
      'app.secureConnection': 'Connexion Sécurisée',
      'internet.highSpeed': 'Haut Débit',
      'internet.mobileData': '�� Données Mobiles',
      'internet.wifiPackage': '📡 Forfait WiFi',
      'internet.selectPlan': 'Sélectionnez votre forfait préféré',
      'internet.validity': '{duration} Heures',
      'internet.unlimited': 'Illimité',
      'internet.basic': 'Basique',
      'internet.standard': 'Standard',
      'internet.premium': 'Premium',
      'internet.ultra': 'Ultra',
      'form.proceed': 'Procéder au Paiement',
      'auth.signIn': 'Se Connecter',
      'auth.createAccount': 'Créer un Compte',
      'auth.signInDesc': 'Connectez-vous pour compléter votre transaction',
      'auth.createAccountDesc': 'Créez un compte pour continuer',
      'auth.fullName': 'Nom Complet',
      'auth.enterName': 'Entrez votre nom complet',
      'auth.email': 'Adresse Email',
      'auth.enterEmail': 'Entrez votre email',
      'auth.password': 'Mot de Passe',
      'auth.enterPassword': 'Entrez votre mot de passe',
      'auth.confirmPassword': 'Confirmer le Mot de Passe',
      'auth.reenterPassword': 'Ré-entrez votre mot de passe',
      'auth.orContinueWith': 'Ou continuer avec',
      'auth.noAccount': "Pas de compte ? Inscrivez-vous",
      'auth.haveAccount': 'Déjà un compte ? Connectez-vous',
      'airtime.topup': 'Recharge Mobile',
      'form.phoneNumber': 'Numéro de Téléphone',
      'form.enterPhoneNumber': 'Entrez le numéro du destinataire',
      'form.amount': 'Montant',
      'form.enterAmount': 'Entrez le montant',
      'transfer.moneyTransfer': 'Envoyez de l\'argent en toute sécurité',
      'transfer.recipientName': 'Nom du Bénéficiaire',
      'transfer.enterRecipientName': 'Entrez le nom du bénéficiaire',
      'transfer.accountNumber': 'Numéro de Compte',
      'transfer.enterAccountNumber': 'Entrez le numéro de compte',
      'transfer.description': 'Description',
      'transfer.enterDescription': 'Entrez la description du transfert (optionnel)',
      'payment.title': 'Détails du Paiement',
      'payment.amount': 'Montant à payer: {currency}{amount}',
      'payment.cardNumber': 'Numéro de Carte',
      'payment.enterCardNumber': 'Entrez votre numéro de carte',
      'payment.expiryDate': 'Date d\'Expiration',
      'payment.cvv': 'CVV',
      'payment.cardholderName': 'Nom du Titulaire',
      'payment.enterName': 'Entrez le nom du titulaire',
      'payment.pay': 'Payer Maintenant',
      'form.verified': 'Vérifié',
      'form.transactionDetails': 'Détails de la Transaction',
      'form.currency': 'Devise',
      'form.processingFee': 'Frais de Transaction',
      'form.totalAmount': 'Montant Total',
      'form.includesFees': 'Inclut les frais de traitement et les taxes',
      'utility.payment': 'Paiement des Services',
      'utility.meterNumber': 'Numéro de Compteur',
      'utility.enterMeterNumber': 'Entrez le numéro de compteur',
      'utility.scanning': 'Scan en cours',
      'utility.accountName': 'Nom du Compte',
      'utility.enterAccountName': 'Nom sur le compte',
      'payment.details': 'Détails du Paiement',
      'form.serviceFee': 'Frais de Service',
      'form.completePayment': 'Finaliser le Paiement',
      'payment.method': 'Mode de Paiement',
      'payment.chooseMethod': 'Choisissez comment vous souhaitez payer',
      'payment.mobileMoney': 'Argent Mobile',
      'payment.mobileDesc': 'Paiements mobiles rapides et sécurisés',
      'payment.cardPayment': 'Paiement par Carte',
      'payment.cardDesc': 'Payer par carte de crédit/débit',
      'payment.mobileDetails': "Détails de l'Argent Mobile",
      'payment.youllPay': 'Vous paierez',
      'payment.totalPayment': 'Paiement Total',
      'payment.includesServiceFeeAndTaxes': 'Inclut les frais de service et les taxes',
      'payment.mobileNumber': 'Numéro Mobile',
      'payment.enterMobileNumber': 'Entrez le numéro mobile',
      'payment.confirmationPrompt': 'Vous recevrez une demande de confirmation sur votre appareil mobile',
      'payment.saveCard': 'Enregistrer la carte pour les paiements futurs',
      'payment.choosePaymentMethod': 'Choisir un Mode de Paiement',
      'payment.selectOption': 'Sélectionnez l\'une des options de paiement ci-dessus pour continuer votre paiement.'
    }
  }

  const handleProviderSelect = (provider) => {
    console.log('Selected Provider:', provider)
    console.log('Service ID:', provider.serviceId)
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

  const handleLanguageChange = (newLocale) => {
    setLocale(newLocale)
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

    console.log('Rendering form for serviceId:', selectedProvider.serviceId)

    switch (selectedProvider.serviceId) {
      case 'airtime':
        return <AirtimeForm {...props} />
      case 'transfers':
        return <TransferForm {...props} />
      case 'internet':
        return <InternetForm {...props} />
      case 'utilities':
        return <UtilityForm {...props} />
      default:
        console.error('No matching form found for service:', selectedProvider.serviceId)
        return null
    }
  }

  return (
    <IntlProvider 
      messages={messages[locale]} 
      locale={locale} 
      defaultLocale="en"
    >
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50 to-primary-50 flex items-center justify-center p-6">
        <div className="w-[450px] backdrop-blur-xl rounded-3xl shadow-2xl relative overflow-hidden border border-white/20 bg-slate-50">
          <AnimatePresence mode="wait">
            {step === 'select-service' ? (
              <ServiceSelector 
                onSelect={handleProviderSelect} 
                onLanguageChange={handleLanguageChange}
              />
            ) : (
              renderForm()
            )}
          </AnimatePresence>
        </div>
      </div>
    </IntlProvider>
  )
}

export default App
