import { motion } from 'framer-motion'

const SocialButton = ({ Icon, bgColor }) => {
  const handleClick = (e) => {
    e.preventDefault() // Prevent form submission
    console.log('clicked')
  }

  return (
    <motion.button
      onClick={handleClick}
      type="button" // Explicitly set button type to prevent form submission
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`flex-1 ${bgColor} text-white p-3 rounded-lg shadow-lg`}
    >
      <Icon className="w-6 h-6 mx-auto" />
    </motion.button>
  )
}

export default SocialButton 