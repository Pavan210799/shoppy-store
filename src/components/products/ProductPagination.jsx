import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

function ProductPagination({
  currentPage,
  totalPages,
  setCurrentPage,
}) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div
      className="
        flex
        items-center
        justify-center
        gap-2
        pt-1
      "
    >
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() =>
          setCurrentPage(
            (page) => page - 1
          )
        }
        className="
          group
          flex
          h-8
          w-8
          items-center
          justify-center
          rounded-lg
          border border-line
          bg-card
          text-secondary
          transition-all
          duration-200
          hover:-translate-y-0.5
          hover:border-accent
          hover:text-accent
          hover:shadow-[0_6px_12px_rgba(217,93,57,0.16)]
          active:translate-y-0
          active:scale-95
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-accent/20
          disabled:pointer-events-none
          disabled:cursor-not-allowed
          disabled:opacity-40
        "
      >
        <ChevronLeft
          size={15}
          className="transition-transform duration-200 group-hover:-translate-x-0.5"
        />
      </button>

      <div
        className="
          flex
          h-8
          min-w-8
          items-center
          justify-center
          rounded-lg
          bg-accent
          px-2.5
          text-xs
          font-semibold
          text-white
          shadow-[0_6px_12px_rgba(217,93,57,0.20)]
          transition-transform
          duration-200
        "
      >
        {currentPage}
      </div>

      <span className="text-xs text-subtle">
        of {totalPages}
      </span>

      <button
        type="button"
        disabled={
          currentPage ===
          totalPages
        }
        onClick={() =>
          setCurrentPage(
            (page) => page + 1
          )
        }
        className="
          group
          flex
          h-8
          w-8
          items-center
          justify-center
          rounded-lg
          border border-line
          bg-card
          text-secondary
          transition-all
          duration-200
          hover:-translate-y-0.5
          hover:border-accent
          hover:text-accent
          hover:shadow-[0_6px_12px_rgba(217,93,57,0.16)]
          active:translate-y-0
          active:scale-95
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-accent/20
          disabled:pointer-events-none
          disabled:cursor-not-allowed
          disabled:opacity-40
        "
      >
        <ChevronRight
          size={15}
          className="transition-transform duration-200 group-hover:translate-x-0.5"
        />
      </button>
    </div>
  );
}

export default ProductPagination;