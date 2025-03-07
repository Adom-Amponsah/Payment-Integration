import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const services = [
  {
    category: 'Airtime',
    icon: '📱',
    color: '#3B82F6',
    providers: [
      { id: 'vodacom', name: 'Vodacom', logo: '/path/to/vodacom.png' },
      { id: 'airtel', name: 'Airtel', logo: '/path/to/airtel.png' },
      { id: 'orange', name: 'Orange', logo: '/path/to/orange.png' },
      { id: 'africell', name: 'Africell', logo: '/path/to/africell.png' }
    ]
  },
  {
    category: 'Airlines',
    icon: '✈️',
    color: '#3B82F6',
    providers: [
      { id: 'ethiopian', name: 'Ethiopian Airlines', logo: '/path/to/ethiopian.png' },
      { id: 'kenya', name: 'Kenya Airways', logo: '/path/to/kenya.png' },
      { id: 'rwandair', name: 'RwandAir', logo: '/path/to/rwandair.png' },
      { id: 'air-tanzania', name: 'Air Tanzania', logo: '/path/to/airtanzania.png' }
    ]
  },
  {
    category: 'Transfers',
    icon: '💸',
    color: '#3B82F6',
    providers: [
      { 
        id: 'gtp', 
        name: 'GTP Transfer', 
        logo: '/path/to/gtp.png',
        category: 'Transfers'
      }
    ]
  },
  {
    category: 'Reservations',
    icon: '🏨',
    color: '#3B82F6',
    providers: [
      { id: 'hotels', name: 'Hotels & Lodges', logo: '/path/to/hotels.png' },
      { id: 'car-rental', name: 'Car Rental', logo: '/path/to/car.png' },
      { id: 'events', name: 'Event Venues', logo: '/path/to/events.png' },
      { id: 'restaurants', name: 'Restaurants', logo: '/path/to/restaurants.png' }
    ]
  },
  {
    category: 'Internet',
    icon: '🌐',
    color: '#3B82F6',
    providers: [
      { id: 'vodacom-net', name: 'Vodacom', logo: '/path/to/vodacom.png' },
      { id: 'airtel-net', name: 'Airtel', logo: '/path/to/airtel.png' }
    ]
  },
  {
    category: 'Utilities',
    icon: '💡',
    color: '#3B82F6',
    providers: [
      { id: 'water', name: 'Water Bill', logo: '/path/to/water.png' },
      { id: 'electricity', name: 'Electricity', logo: '/path/to/electricity.png' }
    ]
  },
]

const ServiceSelector = ({ onSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [hoveredCategory, setHoveredCategory] = useState(null)

  return (
    <div className="relative w-full bg-slate-50 p-6 ">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative z-10"
      >
        <div className="flex items-center justify-between mb-8">
          <img 
            src="/images/logo.png" 
            alt="Araka" 
            className="w-32"
          />
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-sm font-medium text-slate-700">Secure Payment</span>
          </div>
        </div>
        
        <h2 className="text-xl font-semibold text-slate-800 mb-2">Quick Payments</h2>
        <p className="text-slate-500 mb-6">Select a service category to proceed with your transaction</p>
        
        <div className="space-y-3">
          {services.map((service) => (
            <motion.div
              key={service.category}
              initial={false}
              animate={{ 
                height: selectedCategory === service.category ? 'auto' : '60px',
                backgroundColor: hoveredCategory === service.category ? '#F8FAFC' : '#FFFFFF'
              }}
              className="rounded-xl overflow-hidden shadow-sm border border-slate-200"
            >
              <motion.button
                onHoverStart={() => setHoveredCategory(service.category)}
                onHoverEnd={() => setHoveredCategory(null)}
                onClick={() => setSelectedCategory(
                  selectedCategory === service.category ? null : service.category
                )}
                className="w-full px-6 h-[60px] flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{
                      rotate: selectedCategory === service.category ? 90 : 0,
                      color: hoveredCategory === service.category ? '#3B82F6' : '#64748B'
                    }}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50"
                  >
                    <span className="text-lg">{service.icon}</span>
                  </motion.div>
                  <div className="flex justify-center ml-4">
                    <span className="font-medium text-slate-700 group-hover:text-blue-600 block">
                      {service.category}
                    </span>
                    {/* <span className="text-xs text-slate-400">
                      {service.providers.length} options available
                    </span> */}
                  </div>
                </div>
                <motion.div
                  animate={{ 
                    rotate: selectedCategory === service.category ? 180 : 0,
                    color: hoveredCategory === service.category ? '#3B82F6' : '#64748B'
                  }}
                  className="bg-slate-100 rounded-full p-1"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {selectedCategory === service.category && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="p-4 bg-gradient-to-br from-slate-50 to-white"
                  >
                    <div className="grid grid-cols-2 gap-3">
                      {service.providers.map((provider) => (
                        <motion.button
                          key={provider.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => onSelect(provider)}
                          className="flex items-center gap-3 p-3 rounded-lg bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all"
                        >
                          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                            {/* <img
                              src={provider.logo}
                              alt={provider.name}
                              className="w-6 h-6 object-contain"
                            /> */}
                          </div>
                          <div>
                            <span className="text-sm font-medium text-slate-700 block">
                              {provider.name}
                            </span>
                            {/* <span className="text-xs text-slate-400">Tap to proceed</span> */}
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Banking-style Decorative Elements */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-400/10 to-transparent rounded-full blur-2xl -z-10" />
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-blue-500/5 to-transparent rounded-full blur-3xl -z-10" />
      
      {/* Security badge */}
      <div className="mt-8 flex items-center justify-center gap-2 bg-slate-100 p-3 rounded-lg">
        <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        <span className="text-xs font-medium text-slate-600">Transactions are secured with end-to-end encryption</span>
      </div>
    </div>
  )
}

export default ServiceSelector