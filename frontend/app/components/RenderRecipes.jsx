"use client"
import { motion } from "framer-motion"
import Recipe from "./Recipe"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

const RenderRecipes = ({ recipes, viewMode = "grid", user }) => {
  const recipeList = recipes || []

  if (recipeList.length === 0) {
    return (
      <motion.div
        className="col-span-full flex flex-col items-center justify-center py-16"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-6xl mb-4">🍳</div>
        <h3 className="text-2xl font-semibold text-base-content/70 mb-2">No recipes found</h3>
        <p className="text-base-content/50">Try adjusting your search or filters</p>
      </motion.div>
    )
  }

  return (
    <motion.div className="contents" variants={containerVariants} initial="hidden" animate="visible">
      {recipeList.map((recipe, index) => (
        <motion.div key={recipe.id} variants={itemVariants} whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
          <Recipe recipe={recipe} user={user} viewMode={viewMode} />
        </motion.div>
      ))}
    </motion.div>
  )
}

export default RenderRecipes
