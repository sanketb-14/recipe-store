"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Pagination from "./Pagination"
import { fetchAllRecipe } from "../lib/data-service"
import RenderRecipes from "./RenderRecipes"
import Filter from "./Filter"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import Loader from "./Loader"
import { Search, Grid, List } from "lucide-react"

const RecipeList = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({})
  const [viewMode, setViewMode] = useState("grid") // grid or list
  const [searchTerm, setSearchTerm] = useState("")
  const queryClient = useQueryClient()

  const queryParams = new URLSearchParams({
    ...filters,
    page: currentPage,
    limit: 12,
    search: searchTerm,
  }).toString()

  const { isPending, data, error } = useQuery({
    queryKey: ["recipes", queryParams],
    queryFn: () => fetchAllRecipe(queryParams),
  })

  const filterMutation = useMutation({
    mutationFn: (newFilters) => {
      setFilters(newFilters)
      setCurrentPage(1)
      return Promise.resolve()
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["recipes"])
    },
  })

  const handleFilterChange = (newFilters) => {
    filterMutation.mutate(newFilters)
  }

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  if (isPending) {
    return <Loader />
  }

  if (error) {
    return (
      <motion.div
        className="alert alert-error rounded-2xl shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span>Error: {error.message}</span>
      </motion.div>
    )
  }

  const allRecipes = data?.data?.recipes || []
  const totalPages = data?.totalPages || 1

  return (
    <motion.div className="space-y-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
      {/* Search and Controls */}
      <motion.div
        className="bg-base-100/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-base-300/20"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-base-content/40 w-5 h-5" />
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchTerm}
              onChange={handleSearch}
              className="input input-bordered w-full pl-12 rounded-2xl bg-base-200/50 border-base-300/30 focus:border-primary/50 transition-all duration-300"
            />
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-2">
            <div className="join">
              <button
                className={`btn join-item btn-sm ${viewMode === "grid" ? "btn-primary" : "btn-ghost"}`}
                onClick={() => setViewMode("grid")}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                className={`btn join-item btn-sm ${viewMode === "list" ? "btn-primary" : "btn-ghost"}`}
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Filter Component */}
      <Filter onFilterChange={handleFilterChange} />

      {/* Results Count */}
      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <p className="text-base-content/60">
          Found <span className="font-semibold text-primary">{allRecipes.length}</span> recipes
        </p>
      </motion.div>

      {/* Recipe Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={viewMode}
          className={`grid gap-6 ${
            viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3" : "grid-cols-1"
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          <RenderRecipes recipes={allRecipes} viewMode={viewMode} />
        </motion.div>
      </AnimatePresence>

      {/* Pagination */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </motion.div>
    </motion.div>
  )
}

export default RecipeList
