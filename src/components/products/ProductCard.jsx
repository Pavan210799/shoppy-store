import {
  Heart,
  ShoppingCart,
  Star,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function ProductCard({
  product,
  isWishlisted,
  isInCart,
  onToggleWishlist,
  onToggleCart,
}) {
  const navigate = useNavigate();

  const stock = Number(product.stock) || 0;

  const handleCardClick = () => {
    navigate(`/products/${product.id}`);
  };

  const handleWishlistClick = (event) => {
    event.stopPropagation();
    onToggleWishlist(product.id);
  };

  const handleCartClick = (event) => {
    event.stopPropagation();
    onToggleCart(product.id);
  };

  const handleCardKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      navigate(`/products/${product.id}`);
    }
  };

  return (
    <article
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      role="link"
      tabIndex={0}
      className="
        group/card
        relative
        min-w-0
        cursor-pointer
        overflow-hidden
        rounded-2xl
        border border-line
        bg-card
        p-4
        transition-all
        duration-200
        ease-out
        hover:-translate-y-1
        hover:border-line-hover
        hover:shadow-[0_12px_28px_rgba(41,35,31,0.08)]
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-accent/30
      "
    >
      <div
        className="
          pointer-events-none
          absolute
          -right-10
          -top-10
          h-24
          w-24
          rounded-full
          bg-soft
          opacity-0
          blur-2xl
          transition-opacity
          duration-200
          group-hover/card:opacity-100
        "
      />

      <div
        className="
          relative
          overflow-hidden
          rounded-xl
          bg-image
          aspect-[4/5]
        "
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          className="
            h-full
            w-full
            object-cover
            transition-transform
            duration-300
            ease-out
            group-hover/card:scale-105
          "
        />
      </div>

      <div className="relative z-10 mt-4">
        <p
          className="
            text-[10px]
            font-semibold
            uppercase
            tracking-[0.08em]
            text-subtle
          "
        >
          {product.category}
        </p>

        <h3
          className="
            mt-1
            truncate
            text-sm
            font-semibold
            text-ink
            transition-colors
            duration-200
            group-hover/card:text-accent
          "
          title={product.title}
        >
          {product.title}
        </h3>

        <div className="mt-2 flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            <Star
              size={13}
              strokeWidth={1.8}
              className="
                fill-accent
                text-accent
              "
            />

            <span
              className="
                text-xs
                font-semibold
                text-secondary
              "
            >
              {product.rating}
            </span>
          </div>

          <span className="text-[10px] text-subtle">
            •
          </span>

          <span
            className="
              text-[10px]
              font-medium
              text-subtle
            "
          >
            {stock} in stock
          </span>
        </div>

        <p
          className="
            mt-2
            text-[11px]
            font-medium
            text-subtle
          "
        >
          Brand:{" "}
          <span className="text-secondary">
            {product.brand || "N/A"}
          </span>
        </p>

        <div
          className="
            mt-4
            flex
            items-center
            justify-between
            gap-3
          "
        >
          <p
            className="
              text-lg
              font-semibold
              text-accent
            "
          >
            ${product.price}
          </p>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              aria-label={
                isWishlisted
                  ? "Remove from wishlist"
                  : "Add to wishlist"
              }
              onClick={handleWishlistClick}
              className={`
                group/wish
                inline-flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                border
                transition-all
                duration-200
                hover:scale-110
                active:scale-95
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-accent/20
                ${
                  isWishlisted
                    ? "border-accent bg-accent text-white hover:bg-accent-hover hover:shadow-[0_6px_14px_rgba(217,93,57,0.28)]"
                    : "border-line bg-muted text-secondary hover:border-accent hover:text-accent"
                }
              `}
            >
              <Heart
                size={15}
                strokeWidth={1.8}
                className={`transition-transform duration-200 group-hover/wish:scale-110 ${
                  isWishlisted
                    ? "fill-white"
                    : "group-hover/wish:fill-accent"
                }`}
              />
            </button>

            <button
              type="button"
              aria-label={
                isInCart
                  ? "Remove from cart"
                  : "Add to cart"
              }
              onClick={handleCartClick}
              className={`
                group/cart
                inline-flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                border
                transition-all
                duration-200
                hover:scale-110
                active:scale-95
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-accent/20
                ${
                  isInCart
                    ? "border-accent bg-accent text-white hover:bg-accent-hover hover:shadow-[0_6px_14px_rgba(217,93,57,0.28)]"
                    : "border-line bg-muted text-secondary hover:border-accent hover:text-accent"
                }
              `}
            >
              <ShoppingCart
                size={15}
                strokeWidth={1.8}
                className="
                  transition-transform
                  duration-200
                  group-hover/cart:-rotate-6
                  group-hover/cart:scale-110
                "
              />
            </button>
          </div>
        </div>
      </div>

      <div
        className="
          absolute
          bottom-0
          left-4
          right-4
          h-[2px]
          origin-left
          scale-x-0
          rounded-full
          bg-accent
          transition-transform
          duration-300
          ease-out
          group-hover/card:scale-x-100
        "
      />
    </article>
  );
}

export default ProductCard;