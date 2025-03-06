import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const services = [
  {
    category: 'Airtime',
    icon: '📱',
    color: '#FF6B6B',
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
    color: '#4A90E2',
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
    color: '#45B7D1',
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
    color: '#45B7D1',
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
    color: '#4ECDC4',
    providers: [
      { id: 'vodacom-net', name: 'Vodacom', logo: '/path/to/vodacom.png' },
      { id: 'airtel-net', name: 'Airtel', logo: '/path/to/airtel.png' }
    ]
  },
  {
    category: 'Utilities',
    icon: '💡',
    color: '#45B7D1',
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
    <div className="relative w-full">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative z-10"
      >
        <img 
          src="/images/logo.png" 
          alt="Araka" 
          className="w-32 mx-auto mb-6"
        />
        
        <div className="space-y-3">
          {services.map((service) => (
            <motion.div
              key={service.category}
              initial={false}
              animate={{ 
                height: selectedCategory === service.category ? 'auto' : '60px',
                backgroundColor: hoveredCategory === service.category ? '#fff1eb' : '#fff'
              }}
              className="rounded-xl overflow-hidden shadow-sm border border-orange-100"
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
                      color: hoveredCategory === service.category ? '#ff4b2b' : '#666'
                    }}
                    className="text-2xl"
                  >
                    {service.icon}
                  </motion.div>
                  <span className="font-medium text-gray-700 group-hover:text-orange-500">
                    {service.category}
                  </span>
                </div>
                <motion.div
                  animate={{ 
                    rotate: selectedCategory === service.category ? 180 : 0,
                    color: hoveredCategory === service.category ? '#ff4b2b' : '#666'
                  }}
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
                    className="p-4 bg-gradient-to-br from-orange-50 to-white"
                  >
                    <div className="grid grid-cols-2 gap-3">
                      {service.providers.map((provider) => (
                        <motion.button
                          key={provider.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => onSelect(provider)}
                          className="flex items-center gap-3 p-3 rounded-lg bg-white border border-orange-100 hover:border-orange-300 hover:shadow-md transition-all"
                        >
                          <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center">
                            <img
                              src={provider.logo}
                              alt={provider.name}
                              className="w-6 h-6 object-contain"
                            />
                          </div>
                          <span className="text-sm font-medium text-gray-700">
                            {provider.name}
                          </span>
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

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-400/20 to-transparent rounded-full blur-2xl -z-10" />
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-orange-500/10 to-transparent rounded-full blur-3xl -z-10" />
    </div>
  )
}

export default ServiceSelector 