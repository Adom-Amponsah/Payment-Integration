import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ReservationForm = ({ provider, onSubmit, onBack }) => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: '2',
    specialRequests: '',
    location: '',
    contactName: '',
    contactPhone: ''
  });
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  
  // Random availability spots to create urgency
  const [spotsLeft, setSpotsLeft] = useState(Math.floor(Math.random() * 5) + 1);
  const [viewingCount, setViewingCount] = useState(Math.floor(Math.random() * 10) + 3);
  
  // Simulated "hot dates" - days that are supposedly in high demand
  const hotDates = ['2025-03-14', '2025-03-20', '2025-03-27'];
  
  // Confetti effect when user selects a date
  useEffect(() => {
    if (formData.date) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [formData.date]);
  
  // Simulate other people viewing in real-time
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly fluctuate the viewing count for a live feeling
      setViewingCount(prev => Math.max(3, prev + Math.floor(Math.random() * 3) - 1));
      
      // Occasionally decrease spots left to create urgency
      if (Math.random() > 0.8) {
        setSpotsLeft(prev => Math.max(1, prev - 1));
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const getProviderIcon = () => {
    switch (provider.id) {
      case 'hotels':
        return '🏨';
      case 'car-rental':
        return '🚗';
      case 'events':
        return '🎉';
      case 'restaurants':
        return '🍽️';
      case 'spa':
        return '💆';
      case 'yacht':
        return '⛵';
      case 'helicopter':
        return '🚁';
      default:
        return '📅';
    }
  };

  const handleBackClick = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else if (typeof onBack === 'function') {
      onBack();
    }
  };
  
  const nextStep = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep(currentStep + 1);
      setIsAnimating(false);
    }, 300);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentStep < 3) {
      nextStep();
    } else {
      onSubmit(formData);
    }
  };
  
  // Determine if the selected date is a "hot date"
  const isHotDate = formData.date && hotDates.includes(formData.date);
  
  // Get tomorrow's date for min attribute
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];
  
  // Generate time slots based on provider type
  const getTimeSlots = () => {
    if (provider.id === 'restaurants') {
      return ['18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'];
    } else if (provider.id === 'spa') {
      return ['10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'];
    } else {
      return ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
    }
  };
  
  // Decoration particles for the confetti effect
  const ConfettiParticle = ({ index }) => {
    const colors = ['#FFA500', '#FF4500', '#FFD700', '#FF6347', '#FF8C00'];
    const size = Math.random() * 10 + 5;
    const initialX = Math.random() * 100;
    
    return (
      <motion.div
        initial={{ 
          x: initialX, 
          y: -20, 
          opacity: 1,
          rotate: 0
        }}
        animate={{ 
          y: 400, 
          x: initialX + (Math.random() * 50 - 25),
          opacity: 0,
          rotate: Math.random() * 360
        }}
        transition={{ 
          duration: 2,
          ease: "easeOut" 
        }}
        style={{
          position: 'absolute',
          width: size,
          height: size,
          backgroundColor: colors[index % colors.length],
          borderRadius: Math.random() > 0.5 ? '50%' : '0%',
          zIndex: 20
        }}
      />
    );
  };

  return (
    <motion.div
      // initial={{ opacity: 0, y: 20 }}
      // animate={{ opacity: 1, y: 0 }}
      // exit={{ opacity: 0, y: -20 }}
      className="relative bg-slate-50 p-7 overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -right-20 -top-20 w-40 h-40 bg-orange-500/5 rounded-full blur-2xl"
        />
        <motion.div
          // animate={{ 
          //   x: [0, 10, -10, 0],
          //   y: [0, -10, 10, 0]
          // }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute top-0 left-0 w-full h-16 bg-gradient-to-r from-orange-600/20 to-amber-400/10 rounded-t-2xl"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-amber-500/5 to-transparent rounded-full blur-3xl"
        />
        
        {/* Animated dots in background */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-orange-500/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>
      
      {/* Confetti effect when date is selected */}
      {showConfetti && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <ConfettiParticle key={i} index={i} />
          ))}
        </div>
      )}

      {/* Status bar with live indicators */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-xs font-medium text-slate-600">Secure Booking</span>
        </div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-3"
        >
          <div className="text-xs text-rose-500 flex items-center gap-1 animate-pulse">
            {/* <span className="inline-block w-2 h-2 bg-rose-500 rounded-full"></span>
            <span>{viewingCount} viewing now</span> */}
          </div>
          <div className="text-xs text-slate-500 flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>256-bit SSL</span>
          </div>
        </motion.div>
      </div>
      
      {/* Header with back button and provider info */}
      <div className="mb-6 py-4">
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
          <div className="flex items-center gap-3 mt-1">
            <motion.div 
              whileHover={{ 
                scale: 1.1, 
                rotate: [0, 5, -5, 0],
                transition: { duration: 0.5 }
              }}
              className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center border border-orange-100 text-xl"
            >
              {getProviderIcon()}
            </motion.div>
            <div>
              <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                {provider.name}
                {provider.featured && (
                  <span className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full">
                    Premium
                  </span>
                )}
              </h2>
              <div className="flex items-center text-xs text-slate-500">
                <span>Make a Reservation</span>
                <span className="mx-2">•</span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map(star => (
                    <svg 
                      key={star} 
                      className={`w-3 h-3 ${star <= 4 ? "text-amber-400" : "text-slate-300"}`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Step indicator */}
        <div className="w-full bg-slate-100 h-1 rounded-full mt-4 overflow-hidden">
          <motion.div
            initial={{ width: "33.3%" }}
            animate={{ width: `${currentStep * 33.3}%` }}
            className="h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"
          />
        </div>
        <div className="flex justify-between mt-1 text-xs text-slate-500">
          <span className={currentStep >= 1 ? "text-orange-600 font-medium" : ""}>Details</span>
          <span className={currentStep >= 2 ? "text-orange-600 font-medium" : ""}>Contact</span>
          <span className={currentStep >= 3 ? "text-orange-600 font-medium" : ""}>Confirm</span>
        </div>
      </div>

      {/* Multi-step Form */}
      <form onSubmit={handleSubmit}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-5"
          >
            {/* Step 1: Basic Details */}
            {currentStep === 1 && (
              <>
                {/* Date Input with hot date indicator */}
                <div className="relative">
                  <motion.label
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    Date
                  </motion.label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                      <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <input
                      type="date"
                      min={tomorrowStr}
                      value={formData.date}
                      onChange={(e) => {
                        setFormData({ ...formData, date: e.target.value });
                        // Random discount for selected dates
                        if (Math.random() > 0.7) {
                          setTimeout(() => {
                            alert(`Lucky! You've unlocked a 15% discount for ${e.target.value}!`);
                          }, 500);
                        }
                      }}
                      className={`w-full pl-12 pr-12 py-3 rounded-lg border ${
                        isHotDate ? 'border-amber-300 bg-amber-50' : 'border-slate-200'
                      } focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 bg-white`}
                    />
                    {isHotDate && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800">
                          Hot Date 🔥
                        </span>
                      </div>
                    )}
                  </div>
                  {formData.date && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-xs text-orange-600 flex items-center"
                    >
                      <span className="font-medium">Only {spotsLeft} spots left for this date!</span>
                    </motion.div>
                  )}
                </div>

                {/* Time and Guests in one row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <motion.label
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      className="block text-sm font-medium text-slate-700 mb-1"
                    >
                      Time
                    </motion.label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2">
                        <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <select
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full pl-12 py-3 rounded-lg border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 bg-white appearance-none"
                      >
                        <option value="">Select time</option>
                        {getTimeSlots().map(time => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <motion.label
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      className="block text-sm font-medium text-slate-700 mb-1"
                    >
                      Guests
                    </motion.label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2">
                        <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <select
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                        className="w-full pl-12 py-3 rounded-lg border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 bg-white appearance-none"
                      >
                        <option value="">Select guests</option>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                          <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                        ))}
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Location Input */}
                <div className="relative">
                  <motion.label
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    Location
                  </motion.label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                      <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <select
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full pl-12 py-3 rounded-lg border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 bg-white appearance-none"
                    >
                      <option value="">Select location</option>
                      <option value="downtown">Downtown</option>
                      <option value="uptown">Uptown</option>
                      <option value="westside">West Side</option>
                      <option value="eastside">East Side</option>
                      <option value="marina">Marina District</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Step 2: Contact Info */}
            {currentStep === 2 && (
              <>
                {/* Contact details */}
                <div className="relative">
                  <motion.label
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    Full Name
                  </motion.label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                      <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 bg-white"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>
                
                <div className="relative">
                  <motion.label
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    Phone Number
                  </motion.label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                      <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <input
                      type="tel"
                      value={formData.contactPhone}
                      onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 bg-white"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>
                
                {/* Special Requests */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="text-sm font-medium text-slate-700 mb-3">Special Requests</h3>
                  <textarea
                    value={formData.specialRequests}
                    onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                    rows="3"
                    placeholder="Any special requirements or preferences..."
                  />
                </div>
              </>
            )}

            {/* Step 3: Confirmation */}
            {currentStep === 3 && (
              <>
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="text-base font-medium text-slate-800 mb-4">Reservation Summary</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between pb-2 border-b border-slate-100">
                      <span className="text-sm text-slate-500">Service</span>
                      <span className="text-sm font-medium text-slate-700">
                        {provider.name} {getProviderIcon()}
                      </span>
                    </div>
                    
                    <div className="flex justify-between pb-2 border-b border-slate-100">
                      <span className="text-sm text-slate-500">Date</span>
                      <span className="text-sm font-medium text-slate-700">
                        {formData.date || 'Not selected'}
                        {isHotDate && <span className="ml-2 text-amber-600">🔥</span>}
                      </span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-slate-100">
                      <span className="text-sm text-slate-500">Time</span>
                      <span className="text-sm font-medium text-slate-700">{formData.time || 'Not selected'}</span>
                    </div>
                    
                    <div className="flex justify-between pb-2 border-b border-slate-100">
                      <span className="text-sm text-slate-500">Guests</span>
                      <span className="text-sm font-medium text-slate-700">{formData.guests || 'Not selected'}</span>
                    </div>
                    
                    <div className="flex justify-between pb-2 border-b border-slate-100">
                      <span className="text-sm text-slate-500">Location</span>
                      <span className="text-sm font-medium text-slate-700">
                        {formData.location ? formData.location.charAt(0).toUpperCase() + formData.location.slice(1) : 'Not selected'}
                      </span>
                    </div>
                    
                    <div className="flex justify-between pb-2 border-b border-slate-100">
                      <span className="text-sm text-slate-500">Name</span>
                      <span className="text-sm font-medium text-slate-700">{formData.contactName || 'Not provided'}</span>
                    </div>
                    
                    <div className="flex justify-between pb-2 border-b border-slate-100">
                      <span className="text-sm text-slate-500">Phone</span>
                      <span className="text-sm font-medium text-slate-700">{formData.contactPhone || 'Not provided'}</span>
                    </div>
                    
                    {formData.specialRequests && (
                      <div className="pt-2">
                        <span className="text-sm text-slate-500">Special Requests</span>
                        <p className="text-sm font-medium text-slate-700 mt-1">{formData.specialRequests}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Terms and privacy notice */}
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mt-6">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="terms"
                      className="mt-1 h-4 w-4 text-orange-600 focus:ring-orange-500 border-slate-300 rounded"
                    />
                    <label htmlFor="terms" className="text-xs text-slate-500">
                      By confirming this reservation, I agree to the <a href="#" className="text-orange-600 hover:underline">Terms of Service</a> and <a href="#" className="text-orange-600 hover:underline">Privacy Policy</a>. I understand that the provider will contact me at the provided phone number.
                    </label>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Form buttons */}
        <div className="flex justify-between mt-6">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={handleBackClick}
            className={`px-5 py-3 rounded-lg text-sm font-medium ${
              currentStep === 1 ? 'text-slate-400 bg-slate-100' : 'text-slate-600 bg-white border border-slate-200 hover:bg-slate-50'
            }`}
            disabled={currentStep === 1 && !onBack}
          >
            {currentStep === 1 ? 'Cancel' : 'Back'}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className={`px-6 py-3 rounded-lg text-sm font-medium bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md hover:shadow-lg hover:from-orange-600 hover:to-amber-600 transition-all duration-200 flex items-center gap-2 ${
              isAnimating ? 'opacity-70 pointer-events-none' : ''
            }`}
          >
            {currentStep === 3 ? 'Confirm Reservation' : 'Continue'}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>
        
        {/* Emergency availability popup */}
        {formData.date && formData.time && Math.random() > 0.7 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 max-w-xs bg-white rounded-xl shadow-xl border border-orange-100 p-4 z-50"
          >
            <div className="flex items-start gap-3">
              <div className="shrink-0 w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center text-orange-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-medium text-slate-800">Availability Alert</h4>
                <p className="text-xs text-slate-500 mt-1">Someone just released a reservation for your selected time. Secure your spot now!</p>
                <button 
                  className="text-xs font-medium text-orange-600 mt-2 hover:text-orange-700"
                  onClick={() => nextStep()}
                >
                  Continue to booking
                </button>
              </div>
              <button 
                className="absolute top-2 right-2 text-slate-400 hover:text-slate-600"
                onClick={(e) => e.target.parentNode.remove()}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </form>
    </motion.div>
  );
};

export default ReservationForm;