'use client'

import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

export function Pagination({ currentPage, totalPages, onPageChange, className }: PaginationProps) {
  const getVisiblePages = () => {
    const delta = 2
    const range = []
    const rangeWithDots = []

    for (let i = Math.max(2, currentPage - delta); 
         i <= Math.min(totalPages - 1, currentPage + delta); 
         i++) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...')
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages)
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  if (totalPages <= 1) return null

  const visiblePages = getVisiblePages()

  return (
    <nav className={cn("flex items-center justify-center space-x-1", className)}>
      {/* Previous Button */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="border-gold/30 text-gold hover:bg-gold hover:text-ink disabled:opacity-50"
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="sr-only">Previous page</span>
      </Button>

      {/* Page Numbers */}
      {visiblePages.map((page, index) => {
        if (page === '...') {
          return (
            <Button
              key={`dots-${index}`}
              variant="ghost"
              size="icon"
              disabled
              className="text-ink/40"
            >
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          )
        }

        const pageNumber = page as number
        const isActive = pageNumber === currentPage

        return (
          <Button
            key={pageNumber}
            variant={isActive ? "default" : "outline"}
            size="icon"
            onClick={() => onPageChange(pageNumber)}
            className={cn(
              isActive
                ? "bg-gradient-to-r from-gold to-yellow-400 text-ink hover:from-yellow-400 hover:to-gold"
                : "border-gold/30 text-gold hover:bg-gold hover:text-ink"
            )}
          >
            {pageNumber}
          </Button>
        )
      })}

      {/* Next Button */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="border-gold/30 text-gold hover:bg-gold hover:text-ink disabled:opacity-50"
      >
        <ChevronRight className="w-4 h-4" />
        <span className="sr-only">Next page</span>
      </Button>
    </nav>
  )
}

