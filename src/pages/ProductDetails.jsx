import { useEffect } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Heart,
  Package,
  RotateCcw,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import ProductGallery from "../components/products/ProductGallery";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    products,
    loading,
    error,
    wishlist,
    cart,
    toggleWishlist,
    toggleCart,
  } = useProducts();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  const product = products.find(
    (item) => String(item.id) === String(id)
  );

  if (loading) {
    return (
      <div className="space-y-5">
        <div className="h-5 w-36 animate-pulse rounded bg-soft" />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div className="flex gap-3">
            <div className="hidden h-[520px] w-16 animate-pulse rounded-xl bg-soft lg:block" />
            <div className="aspect-square w-full animate-pulse rounded-2xl bg-soft" />
          </div>

          <div className="space-y-4 rounded-2xl border border-line bg-card p-6">
            <div className="h-4 w-24 animate-pulse rounded bg-soft" />
            <div className="h-8 w-3/4 animate-pulse rounded bg-soft" />
            <div className="h-4 w-full animate-pulse rounded bg-soft" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-soft" />
            <div className="h-10 w-32 animate-pulse rounded bg-soft" />
            <div className="h-24 w-full animate-pulse rounded bg-soft" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="max-w-md rounded-2xl border border-line bg-card p-8 text-center">
          <Package
            size={36}
            strokeWidth={1.5}
            className="mx-auto text-accent"
          />

          <h2 className="mt-4 text-lg font-semibold text-ink">
            Product not found
          </h2>

          <p className="mt-2 text-sm text-subtle">
            {error || "We couldn't load this product."}
          </p>

          <button
            type="button"
            onClick={() => navigate("/products")}
            className="
              mt-6
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-accent
              px-4
              py-2.5
              text-sm
              font-semibold
              text-white
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:bg-accent-hover
              hover:shadow-[0_8px_16px_rgba(217,93,57,0.28)]
              active:translate-y-0
              active:scale-95
            "
          >
            <ArrowLeft size={15} />
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const images = Array.from(
    new Set(
      [
        ...(Array.isArray(product.images)
          ? product.images
          : []),
        product.thumbnail,
      ].filter(Boolean)
    )
  );

  const isWishlisted = wishlist.includes(product.id);
  const isInCart = cart.includes(product.id);

  const rating = Number(product.rating) || 0;
  const stock = Number(product.stock) || 0;
  const discount = Number(product.discountPercentage) || 0;
  const currentPrice = Number(product.price) || 0;
  const originalPrice =
    discount > 0 && discount < 100
      ? currentPrice / (1 - discount / 100)
      : null;

  const dimensions = product.dimensions;
  const dimensionLabel =
    dimensions?.width != null &&
    dimensions?.height != null &&
    dimensions?.depth != null
      ? `${dimensions.width} × ${dimensions.height} × ${dimensions.depth}`
      : null;

  return (
    <div className="w-full min-w-0 max-w-full space-y-5 overflow-x-hidden">
      <button
        type="button"
        onClick={() => navigate("/products")}
        className="
          group
          inline-flex
          items-center
          gap-2
          text-sm
          font-medium
          text-secondary
          transition-all
          duration-200
          hover:text-accent
        "
      >
        <ArrowLeft
          size={16}
          className="transition-transform duration-200 group-hover:-translate-x-0.5"
        />
        Back to Products
      </button>

      <section className="w-full min-w-0 overflow-hidden rounded-2xl border border-line bg-card">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="min-w-0 border-b border-line p-4 sm:p-5 lg:border-b-0 lg:border-r lg:p-6">
            <ProductGallery
              images={images}
              title={product.title}
            />
          </div>

          <div className="min-w-0 p-4 sm:p-5 lg:p-6">
            <p className="truncate text-[10px] font-semibold uppercase tracking-[0.1em] text-subtle">
              {product.category}
            </p>

            <h1 className="mt-2 break-words text-xl font-semibold leading-tight text-ink sm:text-2xl lg:text-[28px]">
              {product.title}
            </h1>

            {product.brand && (
              <p className="mt-2 text-sm text-subtle">
                Brand:{" "}
                <span className="font-medium text-secondary">
                  {product.brand}
                </span>
              </p>
            )}

            <div className="mt-4 flex min-w-0 flex-wrap items-center gap-x-3 gap-y-2">
              <StarRating value={rating} />

              <span className="text-sm font-semibold text-secondary">
                {rating.toFixed(2)}
              </span>

              {Array.isArray(product.reviews) && (
                <span className="text-xs text-subtle">
                  ({product.reviews.length} reviews)
                </span>
              )}

              <span className="text-[#d8c9b8]">•</span>

              <span
                className={`
                  inline-flex
                  items-center
                  gap-1.5
                  rounded-full
                  px-2.5
                  py-1
                  text-[11px]
                  font-semibold
                  ${
                    stock > 0
                      ? "bg-soft text-secondary"
                      : "bg-red-50 text-red-600"
                  }
                `}
              >
                <CheckCircle2 size={13} />
                {product.availabilityStatus ||
                  `${stock} in stock`}
              </span>
            </div>

            <div className="mt-6 flex flex-wrap items-end gap-3">
              <span className="text-3xl font-semibold text-accent">
                ${currentPrice.toFixed(2)}
              </span>

              {originalPrice && (
                <>
                  <span className="pb-1 text-sm text-subtle line-through">
                    ${originalPrice.toFixed(2)}
                  </span>

                  <span className="mb-1 rounded-lg bg-soft px-2 py-1 text-[10px] font-semibold text-accent">
                    {discount.toFixed(0)}% OFF
                  </span>
                </>
              )}
            </div>

            <p className="mt-5 break-words text-sm leading-6 text-secondary">
              {product.description}
            </p>

            <div className="mt-7 flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={() => toggleCart(product.id)}
                className={`
                  group
                  inline-flex
                  h-11
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  px-4
                  text-sm
                  font-semibold
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  active:translate-y-0
                  active:scale-95
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-accent/20
                  sm:w-auto
                  sm:min-w-[160px]
                  sm:px-5
                  ${
                    isInCart
                      ? "bg-[#29231f] text-white hover:bg-[#403731] hover:text-white hover:shadow-[0_8px_16px_rgba(41,35,31,0.18)] dark:bg-[#3a332e] dark:hover:bg-[#4a433c] dark:hover:text-white"
                      : "bg-accent text-white hover:bg-accent-hover hover:text-white hover:shadow-[0_8px_16px_rgba(217,93,57,0.28)]"
                  }
                `}
              >
                <ShoppingCart
                  size={17}
                  className="shrink-0 transition-transform duration-200 group-hover:-rotate-6 group-hover:scale-110"
                />
                {isInCart ? "Remove from Cart" : "Add to Cart"}
              </button>

              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                className={`
                  group
                  inline-flex
                  h-11
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  px-4
                  text-sm
                  font-semibold
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  active:translate-y-0
                  active:scale-95
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-accent/20
                  sm:w-auto
                  ${
                    isWishlisted
                      ? "border-accent bg-accent text-white hover:bg-accent-hover hover:shadow-[0_8px_16px_rgba(217,93,57,0.28)]"
                      : "border-line bg-muted text-secondary hover:border-accent hover:text-accent"
                  }
                `}
              >
                <Heart
                  size={17}
                  className={`shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                    isWishlisted
                      ? "fill-white"
                      : "group-hover:fill-accent"
                  }`}
                />
                {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full min-w-0 rounded-2xl border border-line bg-card p-4 sm:p-5 lg:p-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-subtle">
          Delivery & support
        </p>

        <h2 className="mt-1 text-lg font-semibold text-ink">
          Shipping, warranty & returns
        </h2>

        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
          <Highlight
            icon={Truck}
            title="Shipping"
            text={
              product.shippingInformation ||
              "Standard shipping available"
            }
          />

          <Highlight
            icon={ShieldCheck}
            title="Warranty"
            text={
              product.warrantyInformation ||
              "Manufacturer warranty included"
            }
          />

          <Highlight
            icon={RotateCcw}
            title="Returns"
            text={
              product.returnPolicy ||
              "See return policy at checkout"
            }
          />
        </div>
      </section>

      <section className="w-full min-w-0 rounded-2xl border border-line bg-card p-4 sm:p-5 lg:p-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-subtle">
          Product information
        </p>

        <h2 className="mt-1 text-lg font-semibold text-ink">
          Specifications
        </h2>

        <div className="mt-5 overflow-hidden rounded-xl border border-line">
          <InfoRow label="Brand" value={product.brand} />
          <InfoRow
            label="Category"
            value={product.category}
          />
          <InfoRow label="SKU" value={product.sku} />
          <InfoRow
            label="Availability"
            value={product.availabilityStatus}
          />
          <InfoRow
            label="Stock"
            value={stock ? `${stock} in stock` : null}
          />
          <InfoRow
            label="Weight"
            value={
              product.weight != null
                ? String(product.weight)
                : null
            }
          />
          <InfoRow
            label="Dimensions"
            value={dimensionLabel}
            last
          />
        </div>

        {Array.isArray(product.tags) &&
          product.tags.length > 0 && (
            <div className="mt-5">
              <p className="text-xs font-semibold text-ink">
                Tags
              </p>

              <div className="mt-2 flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="
                      rounded-lg
                      bg-soft
                      px-2.5
                      py-1.5
                      text-[10px]
                      font-medium
                      capitalize
                      text-secondary
                    "
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
      </section>

      {Array.isArray(product.reviews) &&
        product.reviews.length > 0 && (
          <section className="w-full min-w-0 rounded-2xl border border-line bg-card p-4 sm:p-5 lg:p-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-subtle">
              Customer feedback
            </p>

            <div className="mt-1 flex flex-wrap items-end justify-between gap-3">
              <h2 className="text-lg font-semibold text-ink">
                Reviews
              </h2>

              <div className="flex min-w-0 items-center gap-2">
                <StarRating value={rating} />
                <span className="text-xs font-medium text-subtle">
                  {rating.toFixed(2)} · {product.reviews.length}{" "}
                  reviews
                </span>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
              {product.reviews.map((review, index) => {
                const initials = getInitials(
                  review.reviewerName
                );

                return (
                  <article
                    key={`${review.reviewerName}-${index}`}
                    className="
                      min-w-0
                      rounded-xl
                      border
                      border-line
                      bg-muted
                      p-4
                      transition-all
                      duration-200
                      hover:-translate-y-0.5
                      hover:border-line-hover
                      hover:shadow-[0_8px_18px_rgba(41,35,31,0.06)]
                    "
                  >
                    <div className="flex min-w-0 items-start justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <span
                          className="
                            flex
                            h-9
                            w-9
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-hover
                            text-[11px]
                            font-semibold
                            text-secondary
                          "
                        >
                          {initials}
                        </span>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-ink">
                            {review.reviewerName}
                          </p>

                          {review.date && (
                            <p className="mt-0.5 text-[10px] text-subtle">
                              {formatReviewDate(review.date)}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="shrink-0">
                        <StarRating
                          value={review.rating}
                          size={12}
                        />
                      </div>
                    </div>

                    <p className="mt-3 break-words text-sm leading-5 text-secondary">
                      {review.comment}
                    </p>
                  </article>
                );
              })}
            </div>
          </section>
        )}
    </div>
  );
}

function Highlight({ icon: Icon, title, text }) {
  return (
    <div className="flex min-w-0 items-start gap-3 rounded-xl bg-muted p-4">
      <Icon
        size={18}
        className="mt-0.5 shrink-0 text-accent"
      />

      <div className="min-w-0">
        <p className="text-sm font-semibold text-ink">
          {title}
        </p>
        <p className="mt-1 break-words text-xs leading-5 text-subtle">
          {text}
        </p>
      </div>
    </div>
  );
}

function InfoRow({ label, value, last = false }) {
  return (
    <div
      className={`
        flex
        min-w-0
        flex-col
        gap-1
        px-3
        py-3
        sm:grid
        sm:grid-cols-[8.5rem_minmax(0,1fr)]
        sm:items-center
        sm:gap-4
        sm:px-4
        ${last ? "" : "border-b border-line"}
      `}
    >
      <p className="text-xs font-medium text-subtle">
        {label}
      </p>

      <p className="min-w-0 break-words text-sm font-medium capitalize text-ink">
        {value != null && value !== ""
          ? String(value)
          : "N/A"}
      </p>
    </div>
  );
}

function StarRating({ value, size = 14 }) {
  const rounded = Math.round(Number(value) || 0);

  return (
    <div className="flex shrink-0 items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          size={size}
          strokeWidth={1.8}
          className={
            index < rounded
              ? "fill-accent text-accent"
              : "text-line"
          }
        />
      ))}
    </div>
  );
}

function getInitials(name) {
  return String(name || "C")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function formatReviewDate(value) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default ProductDetails;
