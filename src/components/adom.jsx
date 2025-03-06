import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const services = [
  {
    category: 'Airtime',
    icon: '📱',
    providers: [
      { id: 'vodacom', name: 'Vodacom', logo: '/path/to/vodacom.png' },
      { id: 'airtel', name: 'Airtel', logo: '/path/to/airtel.png' },
      { id: 'orange', name: 'Orange', logo: '/path/to/orange.png' },
      { id: 'africell', name: 'Africell', logo: '/path/to/africell.png' }
    ]
  },
  {
    category: 'Internet',
    icon: '🌐',
    providers: [
      { id: 'vodacom-net', name: 'Vodacom', logo: '/path/to/vodacom.png' },
      { id: 'airtel-net', name: 'Airtel', logo: '/path/to/airtel.png' }
    ]
  },
  {
    category: 'Utilities',
    icon: '💡',
    providers: [
      { id: 'water', name: 'Water Bill', logo: '/path/to/water.png' },
      { id: 'electricity', name: 'Electricity', logo: '/path/to/electricity.png' }
    ]
  }
]

const ServiceSelector = ({ onSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [hoveredCategory, setHoveredCategory] = useState(null)

  const orbitVariants = {
    animate: (i) => ({
      x: Math.cos((i * 2 * Math.PI) / services.length + Date.now() * 0.001) * 150,
      y: Math.sin((i * 2 * Math.PI) / services.length + Date.now() * 0.001) * 150,
      transition: { duration: 10, repeat: Infinity, ease: 'linear' }
    })
  }

  const providerVariants = {
    hidden: { opacity: 0, scale: 0 },
    show: (i) => ({
      opacity: 1,
      scale: 1,
      x: Math.cos((i * Math.PI) / 4) * 100,
      y: Math.sin((i * Math.PI) / 4) * 100,
      transition: { duration: 0.4, delay: i * 0.1 }
    }),
    exit: { opacity: 0, scale: 0, transition: { duration: 0.2 } }
  }

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-orange-900/10 via-white to-orange-500/10 flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <div className="w-64 h-64 bg-orange-400/10 rounded-full blur-3xl absolute top-10 left-10" />
        <div className="w-96 h-96 bg-orange-500/5 rounded-full blur-3xl absolute bottom-20 right-20" />
      </motion.div>

      {/* Logo at Center */}
      <motion.img
        src="/images/logo.png"
        alt="Araka"
        className="w-40 z-20"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Orbiting Categories */}
      {!selectedCategory && (
        <div className="absolute w-full h-full flex items-center justify-center">
          {services.map((service, i) => (
            <motion.div
              key={service.category}
              custom={i}
              variants={orbitVariants}
              animate={!hoveredCategory ? "animate" : { x: Math.cos((i * 2 * Math.PI) / services.length) * 150, y: Math.sin((i * 2 * Math.PI) / services.length) * 150 }}
              onHoverStart={() => setHoveredCategory(service.category)}
              onHoverEnd={() => setHoveredCategory(null)}
              onClick={() => setSelectedCategory(service.category)}
              className="absolute cursor-pointer"
            >
              <motion.div
                className={`flex flex-col items-center p-4 rounded-full bg-white/80 backdrop-blur-md shadow-lg border ${hoveredCategory === service.category ? 'border-orange-500 scale-110' : 'border-orange-200'}`}
                whileHover={{ scale: 1.2, rotate: 10, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)' }}
              >
                <span className="text-4xl mb-2">{service.icon}</span>
                <span className="text-sm font-semibold text-gray-700">{service.category}</span>
              </motion.div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Selected Category and Providers */}
      <AnimatePresence>
        {selectedCategory && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute z-30 flex flex-col items-center"
          >
            {/* Category Header */}
            <motion.div
              className="flex items-center gap-3 p-6 bg-orange-500 text-white rounded-t-2xl shadow-xl"
              initial={{ y: -50 }}
              animate={{ y: 0 }}
            >
              <span className="text-5xl">{services.find(s => s.category === selectedCategory)?.icon}</span>
              <h2 className="text-2xl font-bold">{selectedCategory}</h2>
              <button
                onClick={() => setSelectedCategory(null)}
                className="ml-4 p-2 rounded-full bg-orange-600 hover:bg-orange-700"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>

            {/* Providers Fan-Out */}
            <motion.div className="relative mt-8">
              {services.find(s => s.category === selectedCategory)?.providers.map((provider, i) => (
                <motion.button
                  key={provider.id}
                  custom={i}
                  variants={providerVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  onClick={() => {
                    onSelect(provider)
                    // Add a crazy payment animation here
                  }}
                  className="absolute flex flex-col items-center p-4 bg-white rounded-xl shadow-lg border border-orange-200 hover:border-orange-500 hover:shadow-xl transition-all"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.img
                    src={provider.logo}
                    alt={provider.name}
                    className="w-12 h-12 mb-2 object-contain"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 0.5, repeat: 1 }}
                  />
                  <span className="text-sm font-medium text-gray-700">{provider.name}</span>
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ServiceSelector