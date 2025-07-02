"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChefHat, Clock, Zap, Coffee, Server } from "lucide-react"

const ColdStartLoader = ({ startTime }) => {
  const [elapsedTime, setElapsedTime] = useState(0)
  const [currentTip, setCurrentTip] = useState(0)

  const tips = [
    "Our server is waking up from a cozy nap! ☕",
    "First-time loads take a moment while we boot up the kitchen 👨‍🍳",
    "Good things come to those who wait... like perfectly baked cookies! 🍪",
    "We're dusting off the recipe books and firing up the ovens 🔥",
    "Almost there! The server is putting on its chef's hat 👨‍🍳",
    "Thanks for your patience! Fresh recipes coming right up! 🍽️",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      if (startTime) {
        const elapsed = Math.floor((Date.now() - startTime) / 1000)
        setElapsedTime(elapsed)

        // Change tip every 8 seconds
        if (elapsed > 0 && elapsed % 8 === 0) {
          setCurrentTip((prev) => (prev + 1) % tips.length)
        }
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [startTime, tips.length])

  const progress = Math.min((elapsedTime / 50) * 100, 95) // Cap at 95% until actual load

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-base-100 to-base-200/50 px-4">
      <motion.div
        className="max-w-2xl w-full text-center space-y-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Main Animation */}
        <div className="relative">
          <motion.div
            className="mx-auto w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center relative overflow-hidden"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            <ChefHat className="w-16 h-16 text-primary" />

            {/* Floating elements */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 bg-accent/60 rounded-full"
                style={{
                  top: `${20 + Math.sin(i) * 30}%`,
                  left: `${20 + Math.cos(i) * 30}%`,
                }}
                animate={{
                  scale: [0.5, 1.2, 0.5],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.3,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>

          {/* Server status indicator */}
          <motion.div
            className="absolute -top-2 -right-2 bg-warning/20 backdrop-blur-sm rounded-full p-2"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
            }}
          >
            <Server className="w-6 h-6 text-warning" />
          </motion.div>
        </div>

        {/* Title and Description */}
        <div className="space-y-4">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-primary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Server is Waking Up!
          </motion.h2>

          <motion.div
            className="bg-info/10 backdrop-blur-sm rounded-2xl p-6 border border-info/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Clock className="w-5 h-5 text-info" />
              <span className="text-info font-semibold">First-time load: ~50 seconds</span>
            </div>
            <p className="text-base-content/70 text-sm sm:text-base">
              Our server goes to sleep when not in use to save energy. The first visit takes a moment to boot up, but
              subsequent requests will be lightning fast! ⚡
            </p>
          </motion.div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm text-base-content/60">
            <span>Loading progress</span>
            <span>{elapsedTime}s / ~50s</span>
          </div>
          <div className="w-full bg-base-300/30 rounded-full h-3 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Rotating Tips */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTip}
            className="bg-accent/10 backdrop-blur-sm rounded-2xl p-4 border border-accent/20"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-base-content/80 text-sm sm:text-base font-medium">💡 {tips[currentTip]}</p>
          </motion.div>
        </AnimatePresence>

        {/* Fun Facts */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          {[
            { icon: Zap, text: "Next loads: <2s", color: "text-success" },
            { icon: Coffee, text: "Eco-friendly", color: "text-warning" },
            { icon: ChefHat, text: "Worth the wait", color: "text-primary" },
          ].map((item, index) => (
            <div key={index} className="bg-base-100/50 backdrop-blur-sm rounded-xl p-4 border border-base-300/20">
              <item.icon className={`w-6 h-6 ${item.color} mx-auto mb-2`} />
              <p className="text-xs sm:text-sm text-base-content/70 font-medium">{item.text}</p>
            </div>
          ))}
        </motion.div>

        {/* Estimated time remaining */}
        {elapsedTime > 10 && elapsedTime < 45 && (
          <motion.div
            className="bg-success/10 backdrop-blur-sm rounded-xl p-3 border border-success/20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <p className="text-success font-medium text-sm">
              🎉 Almost ready! Estimated {Math.max(0, 50 - elapsedTime)} seconds remaining
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

export default ColdStartLoader
