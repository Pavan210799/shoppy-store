import {
  RefreshCw,
  Search,
  ChevronsUpDown,
} from "lucide-react";
import { useEffect, useRef } from "react";

function ProductFilters({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  priceRange,
  setPriceRange,
  categories,
  maxPrice,
}) {
  const safeMaxPrice = Number(maxPrice) || 0;

  const minPrice = Math.min(
    Math.max(
      0,
      Number(priceRange?.min) || 0
    ),
    safeMaxPrice
  );

  const currentMaxPrice = Math.min(
    Math.max(
      minPrice + 1,
      Number(priceRange?.max) || safeMaxPrice
    ),
    safeMaxPrice
  );

  const trackRef = useRef(null);
  const activeThumbRef = useRef(null);

  // Slider positions
  const minPosition =
    safeMaxPrice > 0
      ? (minPrice / safeMaxPrice) * 100
      : 0;

  const maxPosition =
    safeMaxPrice > 0
      ? (currentMaxPrice / safeMaxPrice) * 100
      : 100;

  // Reset filters
  const handleReset = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSortBy("default");

    setPriceRange({
      min: 0,
      max: safeMaxPrice,
    });
  };

  // Convert mouse position to price
  const valueFromClientX = (clientX) => {
    const track = trackRef.current;

    if (!track || safeMaxPrice <= 0) {
      return 0;
    }

    const rect =
      track.getBoundingClientRect();

    if (rect.width <= 0) {
      return 0;
    }

    const ratio = Math.min(
      1,
      Math.max(
        0,
        (clientX - rect.left) /
          rect.width
      )
    );

    return Math.round(
      ratio * safeMaxPrice
    );
  };

  // Update selected thumb
  const applyThumbValue = (
    thumb,
    clientX
  ) => {
    const nextValue =
      valueFromClientX(clientX);

    if (safeMaxPrice <= 0) {
      return;
    }

    if (thumb === "min") {
      const nextMin = Math.min(
        nextValue,
        currentMaxPrice - 1
      );

      setPriceRange({
        min: Math.max(0, nextMin),
        max: currentMaxPrice,
      });

      return;
    }

    const nextMax = Math.max(
      nextValue,
      minPrice + 1
    );

    setPriceRange({
      min: minPrice,
      max: Math.min(
        safeMaxPrice,
        nextMax
      ),
    });
  };

  // Start dragging
  const startDrag = (
    thumb,
    event
  ) => {
    event.preventDefault();
    event.stopPropagation();

    activeThumbRef.current = thumb;

    applyThumbValue(
      thumb,
      event.clientX
    );
  };

  // Drag handlers
  useEffect(() => {
    const handlePointerMove = (
      event
    ) => {
      const thumb =
        activeThumbRef.current;

      if (!thumb) {
        return;
      }

      applyThumbValue(
        thumb,
        event.clientX
      );
    };

    const stopDrag = () => {
      activeThumbRef.current = null;
    };

    window.addEventListener(
      "pointermove",
      handlePointerMove
    );

    window.addEventListener(
      "pointerup",
      stopDrag
    );

    window.addEventListener(
      "pointercancel",
      stopDrag
    );

    return () => {
      window.removeEventListener(
        "pointermove",
        handlePointerMove
      );

      window.removeEventListener(
        "pointerup",
        stopDrag
      );

      window.removeEventListener(
        "pointercancel",
        stopDrag
      );
    };
  });

  // Click track to move nearest thumb
  const handleTrackPointerDown = (
    event
  ) => {
    if (event.target !== event.currentTarget) {
      return;
    }

    const nextValue =
      valueFromClientX(
        event.clientX
      );

    const distanceToMin =
      Math.abs(
        nextValue - minPrice
      );

    const distanceToMax =
      Math.abs(
        nextValue -
          currentMaxPrice
      );

    const thumb =
      distanceToMin <= distanceToMax
        ? "min"
        : "max";

    activeThumbRef.current = thumb;

    applyThumbValue(
      thumb,
      event.clientX
    );
  };

  return (
    <section
      className="
        w-full
        rounded-2xl
        border border-line
        bg-card
        p-4
      "
    >
      {/* Row 1 */}
      <div
        className="
          flex
          flex-row
          items-center
          gap-3
          lg:gap-4
        "
      >
        {/* Search */}
        <div
          className="
            group
            relative
            min-w-0
            flex-1
          "
        >
          <Search
            size={15}
            strokeWidth={1.8}
            className="
              pointer-events-none
              absolute
              left-3
              top-1/2
              z-10
              -translate-y-1/2
              text-subtle
              transition-all
              duration-200
              group-hover:scale-110
              group-hover:text-accent
              group-focus-within:scale-110
              group-focus-within:text-accent
            "
          />

          <input
            type="text"
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(
                event.target.value
              )
            }
            placeholder="Search products..."
            className="
              h-9
              w-full
              rounded-xl
              border border-line
              bg-muted
              px-3
              pl-9
              text-xs
              font-medium
              text-secondary
              outline-none
              transition-all
              duration-200
              placeholder:text-subtle
              hover:border-line-hover
              focus:border-line-hover
              focus:bg-card
              focus:ring-2
              focus:ring-accent/10
            "
          />
        </div>

        {/* Reset */}
        <button
          type="button"
          onClick={handleReset}
          aria-label="Reset filters"
          title="Reset filters"
          className="
            group
            inline-flex
            h-9
            shrink-0
            items-center
            justify-center
            gap-1.5
            rounded-xl
            border border-accent
            bg-accent
            px-2.5
            text-xs
            font-semibold
            text-white
            outline-none
            transition-all
            duration-200
            hover:-translate-y-0.5
            hover:border-[#b94728]
            hover:bg-accent-hover
            hover:shadow-[0_8px_16px_rgba(217,93,57,0.28)]
            active:translate-y-0
            active:scale-95
            focus:border-accent-hover
            focus:bg-accent-hover
            focus:ring-2
            focus:ring-accent/20
            md:px-3
            lg:px-3
          "
        >
          <RefreshCw
            size={15}
            strokeWidth={1.8}
            className="transition-transform duration-300 group-hover:rotate-180"
          />

          <span className="hidden md:inline">
            Reset
          </span>
        </button>
      </div>

      {/* Row 2 */}
      <div
        className="
          mt-3
          flex
          flex-col
          gap-3
          sm:flex-row
          sm:gap-5
        "
      >
        {/* Category */}
        <div className="group relative">
          <select
            value={selectedCategory}
            onChange={(event) =>
              setSelectedCategory(
                event.target.value
              )
            }
            className="
              h-9
              w-full
              appearance-none
              rounded-xl
              border border-line
              bg-muted
              px-3
              pr-9
              text-xs
              font-medium
              capitalize
              text-secondary
              outline-none
              transition-all
              duration-200
              hover:border-line-hover
              focus:border-line-hover
              focus:bg-card
              focus:ring-2
              focus:ring-accent/10
              sm:w-[180px]
            "
          >
            <option value="all">
              All Categories
            </option>

            {categories.map(
              (category) => (
                <option
                  key={category}
                  value={category}
                >
                  {category}
                </option>
              )
            )}
          </select>

          <ChevronsUpDown
            size={14}
            strokeWidth={1.8}
            className="
              pointer-events-none
              absolute
              right-3
              top-1/2
              -translate-y-1/2
              text-subtle
              transition-all
              duration-200
              group-hover:scale-110
              group-hover:text-accent
              group-focus-within:scale-110
              group-focus-within:text-accent
            "
          />
        </div>

        {/* Sort */}
        <div className="group relative">
          <select
            value={sortBy}
            onChange={(event) =>
              setSortBy(
                event.target.value
              )
            }
            className="
              h-9
              w-full
              appearance-none
              rounded-xl
              border border-line
              bg-muted
              px-3
              pr-9
              text-xs
              font-medium
              text-secondary
              outline-none
              transition-all
              duration-200
              hover:border-line-hover
              focus:border-line-hover
              focus:bg-card
              focus:ring-2
              focus:ring-accent/10
              sm:w-[150px]
            "
          >
            <option value="default">
              Sort By
            </option>

            <option value="price-low">
              Price: Low to High
            </option>

            <option value="price-high">
              Price: High to Low
            </option>

            <option value="rating-high">
              Rating: High to Low
            </option>
          </select>

          <ChevronsUpDown
            size={14}
            strokeWidth={1.8}
            className="
              pointer-events-none
              absolute
              right-3
              top-1/2
              -translate-y-1/2
              text-subtle
              transition-all
              duration-200
              group-hover:scale-110
              group-hover:text-accent
              group-focus-within:scale-110
              group-focus-within:text-accent
            "
          />
        </div>

        {/* Price Slider */}
        <div
          className="
            min-w-0
            flex-1
            sm:ml-1
          "
        >
          <div
            ref={trackRef}
            className="
              relative
              h-7
              w-full
              touch-none
              select-none
            "
            onPointerDown={
              handleTrackPointerDown
            }
          >
            {/* Track */}
            <div
              className="
                pointer-events-none
                absolute
                left-0
                right-0
                top-1/2
                h-[3px]
                -translate-y-1/2
                rounded-full
                bg-line
              "
            />

            {/* Selected range */}
            <div
              className="
                pointer-events-none
                absolute
                top-1/2
                h-[3px]
                -translate-y-1/2
                rounded-full
                bg-accent
              "
              style={{
                left: `${minPosition}%`,
                width: `${Math.max(
                  0,
                  maxPosition -
                    minPosition
                )}%`,
              }}
            />

            {/* Minimum thumb */}
            <div
              role="slider"
              aria-label="Minimum price"
              aria-valuemin={0}
              aria-valuemax={
                safeMaxPrice
              }
              aria-valuenow={minPrice}
              tabIndex={0}
              className="
                group
                absolute
                top-1/2
                z-30
                flex
                h-7
                w-7
                -translate-x-1/2
                -translate-y-1/2
                cursor-pointer
                items-center
                justify-center
                rounded-full
                outline-none
                transition-transform
                duration-200
                hover:scale-110
                active:scale-95
                focus-visible:ring-2
                focus-visible:ring-accent/25
              "
              style={{
                left: `${minPosition}%`,
              }}
              onPointerDown={(
                event
              ) =>
                startDrag(
                  "min",
                  event
                )
              }
            >
              <span
                className="
                  h-3
                  w-3
                  rounded-full
                  border-2
                  border-white
                  bg-accent
                  shadow-[0_1px_5px_rgba(41,35,31,0.25)]
                  transition-transform
                  duration-200
                  group-hover:scale-125
                  group-active:scale-110
                "
              />
            </div>

            {/* Maximum thumb */}
            <div
              role="slider"
              aria-label="Maximum price"
              aria-valuemin={0}
              aria-valuemax={
                safeMaxPrice
              }
              aria-valuenow={
                currentMaxPrice
              }
              tabIndex={0}
              className="
                group
                absolute
                top-1/2
                z-20
                flex
                h-7
                w-7
                -translate-x-1/2
                -translate-y-1/2
                cursor-pointer
                items-center
                justify-center
                rounded-full
                outline-none
                transition-transform
                duration-200
                hover:scale-110
                active:scale-95
                focus-visible:ring-2
                focus-visible:ring-accent/25
              "
              style={{
                left: `${maxPosition}%`,
              }}
              onPointerDown={(
                event
              ) =>
                startDrag(
                  "max",
                  event
                )
              }
            >
              <span
                className="
                  h-3
                  w-3
                  rounded-full
                  border-2
                  border-white
                  bg-accent
                  shadow-[0_1px_5px_rgba(41,35,31,0.25)]
                  transition-transform
                  duration-200
                  group-hover:scale-125
                  group-active:scale-110
                "
              />
            </div>
          </div>

          {/* Price labels */}
          <div
            className="
              flex
              justify-between
              text-[9px]
              text-subtle
            "
          >
            <span>
              ${minPrice}
            </span>

            <span>
              ${currentMaxPrice}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductFilters;