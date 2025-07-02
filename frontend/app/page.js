"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ChefHat, Sparkles, ArrowRight, Star } from "lucide-react"

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [0, 5, 0],
      transition: {
        duration: 6,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  return (
    <>
      {/* Full Screen Background - Fixed positioning to break out of layout */}
      <div className="fixed inset-0 z-0">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Background Image with Modern Overlay */}
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <Image
            src="/bg_img.jpeg"
            fill
            className="object-cover"
            alt="Recipe background"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-slate-900/70 to-blue-900/80" />
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>
      </div>

      {/* Main Content - Relative positioning to appear above background */}
      <div className="relative z-10 min-h-screen flex items-center justify-center -mx-4 -my-8">
        <motion.div
          className="w-full px-4 sm:px-6 lg:px-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-120px)]">
              {/* Left Content */}
              <motion.div className="text-center lg:text-left space-y-8" variants={itemVariants}>
                {/* Badge */}
                <motion.div
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm font-medium text-white">Discover Amazing Recipes</span>
                </motion.div>

                {/* Main Heading */}
                <motion.div variants={itemVariants}>
                  <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
                    Welcome to the
                    <motion.span
                      className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
                      animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                    >
                      Recipe Store
                    </motion.span>
                  </h1>
                </motion.div>

                {/* Subtitle */}
                <motion.p className="text-xl sm:text-2xl text-gray-300 max-w-2xl" variants={itemVariants}>
                  Unleash your culinary creativity and explore delicious recipes from around the world. Your kitchen
                  adventure starts here.
                </motion.p>

                {/* CTA Button */}
                <motion.div variants={itemVariants}>
                  <Link href="/home">
                    <motion.button
                      className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold text-lg rounded-full overflow-hidden shadow-2xl"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1, duration: 0.8 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "0%" }}
                        transition={{ duration: 0.3 }}
                      />
                      <span className="relative z-10">Start Exploring</span>
                      <motion.div
                        className="relative z-10"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      >
                        <ArrowRight className="w-5 h-5" />
                      </motion.div>
                    </motion.button>
                  </Link>
                </motion.div>

                {/* Stats */}
                <motion.div
                  className="flex flex-wrap gap-8 justify-center lg:justify-start pt-8"
                  variants={itemVariants}
                >
                  {[
                    { number: "10K+", label: "Recipes" },
                    { number: "50K+", label: "Happy Cooks" },
                    { number: "4.9", label: "Rating" },
                  ].map((stat, index) => (
                    <motion.div key={index} className="text-center" whileHover={{ scale: 1.1 }}>
                      <div className="text-2xl font-bold text-white">{stat.number}</div>
                      <div className="text-sm text-gray-400">{stat.label}</div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Right Content - Floating Cards */}
              <motion.div className="relative hidden lg:block" variants={itemVariants}>
                {/* Main Recipe Card */}
                <motion.div
                  className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 shadow-2xl"
                  variants={floatingVariants}
                  animate="animate"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <ChefHat className="w-8 h-8 text-purple-400" />
                    <div>
                      <h3 className="text-white font-semibold">Featured Recipe</h3>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-48 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl mb-4 relative overflow-hidden">
                    <Image
                      src="/bg_img.jpeg"
                      fill
                      className="object-cover"
                      alt="Featured recipe"
                    />
                  </div>
                  <h4 className="text-white font-medium mb-2">Spicy Thai Curry</h4>
                  <p className="text-gray-300 text-sm">A delicious blend of aromatic spices...</p>
                </motion.div>

                {/* Floating Elements */}
                <motion.div
                  className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                    scale: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                  }}
                >
                  <Sparkles className="w-8 h-8 text-white" />
                </motion.div>

                <motion.div
                  className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg"
                  animate={{
                    y: [-5, 5, -5],
                    rotate: [0, -10, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  <ChefHat className="w-6 h-6 text-white" />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-white rounded-full mt-2"
              animate={{
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>
      </div>
    </>
  )
}
