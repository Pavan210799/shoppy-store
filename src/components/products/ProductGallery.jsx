import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function ProductGallery({ images, title }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoom, setZoom] = useState(null);
  const dragStartX = useRef(null);

  useEffect(() => {
    setActiveIndex(0);
    setZoom(null);
  }, [images]);

  const gallery = images.filter(Boolean);
  const total = gallery.length;
  const activeImage = gallery[activeIndex] || "";
  const hasMultiple = total > 1;

  const goTo = (index) => {
    if (total === 0) {
      return;
    }

    setActiveIndex((index + total) % total);
  };

  const handlePointerDown = (event) => {
    dragStartX.current = event.clientX;
  };

  const handlePointerUp = (event) => {
    if (dragStartX.current == null || !hasMultiple) {
      dragStartX.current = null;
      return;
    }

    const delta = event.clientX - dragStartX.current;
    dragStartX.current = null;

    if (delta > 48) {
      goTo(activeIndex - 1);
    } else if (delta < -48) {
      goTo(activeIndex + 1);
    }
  };

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();

    if (rect.width <= 0 || rect.height <= 0) {
      return;
    }

    setZoom({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <div className="flex w-full min-w-0 max-w-full flex-col">
      <div className="min-w-0 w-full">
        <div
          className="
            group/stage
            relative
            w-full
            max-w-full
            overflow-hidden
            rounded-2xl
            bg-image
            aspect-square
            select-none
          "
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerLeave={() => {
            dragStartX.current = null;
            setZoom(null);
          }}
          onMouseMove={handleMouseMove}
        >
          {activeImage ? (
            <img
              src={activeImage}
              alt={title}
              draggable={false}
              className={`
                pointer-events-none
                h-full
                w-full
                max-w-full
                object-contain
                p-3
                sm:p-4
                transition-transform
                duration-200
                ease-out
                ${zoom ? "md:scale-150" : "scale-100"}
              `}
              style={
                zoom
                  ? {
                      transformOrigin: `${zoom.x}% ${zoom.y}%`,
                    }
                  : { transformOrigin: "center center" }
              }
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-subtle">
              No image available
            </div>
          )}

          {hasMultiple && (
            <>
              <button
                type="button"
                aria-label="Previous image"
                onClick={(event) => {
                  event.stopPropagation();
                  goTo(activeIndex - 1);
                }}
                className="
                  absolute
                  left-2
                  top-1/2
                  z-10
                  flex
                  h-8
                  w-8
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-line
                  bg-card/90
                  text-secondary
                  opacity-100
                  shadow-[0_6px_16px_rgba(41,35,31,0.10)]
                  transition-all
                  duration-200
                  hover:scale-110
                  hover:border-accent
                  hover:text-accent
                  active:scale-95
                  sm:left-3
                  sm:h-9
                  sm:w-9
                  lg:opacity-0
                  lg:group-hover/stage:opacity-100
                  focus-visible:opacity-100
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-accent/20
                "
              >
                <ChevronLeft size={18} />
              </button>

              <button
                type="button"
                aria-label="Next image"
                onClick={(event) => {
                  event.stopPropagation();
                  goTo(activeIndex + 1);
                }}
                className="
                  absolute
                  right-2
                  top-1/2
                  z-10
                  flex
                  h-8
                  w-8
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-line
                  bg-card/90
                  text-secondary
                  opacity-100
                  shadow-[0_6px_16px_rgba(41,35,31,0.10)]
                  transition-all
                  duration-200
                  hover:scale-110
                  hover:border-accent
                  hover:text-accent
                  active:scale-95
                  sm:right-3
                  sm:h-9
                  sm:w-9
                  lg:opacity-0
                  lg:group-hover/stage:opacity-100
                  focus-visible:opacity-100
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-accent/20
                "
              >
                <ChevronRight size={18} />
              </button>

              <span
                className="
                  absolute
                  bottom-3
                  right-3
                  rounded-full
                  bg-ink/80
                  px-2.5
                  py-1
                  text-[10px]
                  font-semibold
                  tracking-wide
                  text-white
                "
              >
                {activeIndex + 1} / {total}
              </span>
            </>
          )}
        </div>

        {hasMultiple && (
          <div className="mt-3 flex w-full justify-center gap-2 overflow-x-auto pb-1">
            {gallery.map((image, index) => (
              <Thumbnail
                key={`${image}-${index}`}
                image={image}
                title={title}
                index={index}
                isActive={index === activeIndex}
                onSelect={() => goTo(index)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Thumbnail({
  image,
  title,
  index,
  isActive,
  onSelect,
}) {
  return (
    <button
      type="button"
      onMouseEnter={onSelect}
      onFocus={onSelect}
      onClick={onSelect}
      aria-label={`View image ${index + 1}`}
      aria-current={isActive ? "true" : undefined}
      className={`
        h-16
        w-16
        shrink-0
        overflow-hidden
        rounded-xl
        border
        bg-image
        transition-all
        duration-200
        hover:border-accent
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-accent/20
        sm:h-[72px]
        sm:w-[72px]
        ${
          isActive
            ? "border-accent ring-1 ring-accent/30"
            : "border-line"
        }
      `}
    >
      <img
        src={image}
        alt={`${title} ${index + 1}`}
        className="h-full w-full object-contain p-1"
      />
    </button>
  );
}

export default ProductGallery;
