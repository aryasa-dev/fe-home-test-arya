import { getPagination } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"

type PaginationProps = {
  total: number
  current: number
  perPage: number
  onChange: (page: number) => void
}

export function Pagination({ total, current, perPage, onChange }: PaginationProps) {
  const totalPages = Math.ceil(total / perPage)

  const pages = getPagination(current, totalPages)

  return (
    <div className="flex items-center justify-center space-x-1">
      <button
        onClick={() => current > 1 && onChange(current - 1)}
        className="px-3 py-1 rounded-md text-sm text-slate-900 flex items-center font-medium"
        disabled={current === 1}
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        Previous
      </button>

      {pages.map((page, idx) =>
        page === "..." ? (
          <span key={idx} className="px-3 py-1 text-sm text-gray-500">
            ...
          </span>
        ) : (
          <button
            key={idx}
            onClick={() => onChange(page)}
            className={`px-3 py-1 rounded-md border cursor-pointer text-sm ${
              page === current
                ? "border-slate-200"
                : "border-transparent"
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => current < totalPages && onChange(current + 1)}
        className="px-3 py-1 rounded-md text-sm text-slate-900 flex items-center font-medium"
        disabled={current === totalPages}
      >
        Next
        <ChevronRight className="w-4 h-4 ml-1" />
      </button>
    </div>
  )
}
