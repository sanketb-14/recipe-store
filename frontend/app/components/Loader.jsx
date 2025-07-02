"use client"

import { motion } from "framer-motion"
import { ChefHat } from "lucide-react"

export default function Loader() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-base-100 to-base-200/50">
      <motion.div
        className="flex flex-col items-center gap-6"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Animated Chef Hat */}
        <motion.div
          className="relative"
          animate={{
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <div className="p-6 bg-primary/10 rounded-3xl">
            <ChefHat className="w-16 h-16 text-primary" />
          </div>

          {/* Floating dots */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-accent rounded-full"
              style={{
                top: `${20 + i * 10}%`,
                right: `${-10 - i * 5}%`,
              }}
              animate={{
                y: [-5, 5, -5],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>

        {/* Loading Text */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-primary mb-2">Cooking up something delicious...</h2>
          <p className="text-base-content/60">Please wait while we prepare your recipes</p>
        </motion.div>

        {/* Loading Spinner */}
        <motion.div
          className="loading loading-ring loading-lg text-primary"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </motion.div>
    </div>
  )
}
