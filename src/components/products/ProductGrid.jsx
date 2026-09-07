import ProductCard from "./ProductCard";

function ProductSkeleton() {
  return (
    <article
      className="
        overflow-hidden
        rounded-2xl
        border border-line
        bg-card
        p-4
      "
    >
      {/* Image */}
      <div
        className="
          aspect-[4/5]
          w-full
          animate-pulse
          rounded-xl
          bg-image
        "
      />

      {/* Content */}
      <div className="mt-4 animate-pulse">
        {/* Category */}
        <div className="h-2.5 w-20 rounded bg-soft" />

        {/* Title */}
        <div className="mt-2 h-4 w-3/4 rounded bg-soft" />

        {/* Rating + stock */}
        <div className="mt-3 flex gap-2">
          <div className="h-3 w-12 rounded bg-soft" />
          <div className="h-3 w-20 rounded bg-soft" />
        </div>

        {/* Brand */}
        <div className="mt-3 h-3 w-28 rounded bg-soft" />

        {/* Price + buttons */}
        <div className="mt-4 flex items-center justify-between">
          <div className="h-5 w-16 rounded bg-soft" />

          <div className="flex gap-2">
            <div className="h-9 w-9 rounded-xl bg-soft" />
            <div className="h-9 w-9 rounded-xl bg-soft" />
          </div>
        </div>
      </div>
    </article>
  );
}

function ProductGrid({
  products,
  productsPerPage = 9,
  loading,
  error,
  wishlist,
  cart,
  onToggleWishlist,
  onToggleCart,
}) {
  /*
    Loading skeleton
  */
  if (loading) {
    return (
      <section
        className="
          grid
          w-full
          min-w-0
          grid-cols-1
          gap-4
          sm:grid-cols-2
          lg:grid-cols-3
        "
      >
        {Array.from({ length: productsPerPage }).map((_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </section>
    );
  }

  /*
    Error state
  */
  if (error) {
    return (
      <section
        className="
          flex
          min-h-[240px]
          w-full
          items-center
          justify-center
          rounded-2xl
          border border-line
          bg-card
          p-6
        "
      >
        <p className="text-sm font-medium text-secondary">
          {error}
        </p>
      </section>
    );
  }

  /*
    Empty state
  */
  if (products.length === 0) {
    return (
      <section
        className="
          flex
          min-h-[240px]
          w-full
          items-center
          justify-center
          rounded-2xl
          border border-line
          bg-card
          p-6
        "
      >
        <p className="text-sm font-medium text-subtle">
          No products found.
        </p>
      </section>
    );
  }

  /*
    Product list
  */
  return (
    <section
      className="
        grid
        w-full
        min-w-0
        grid-cols-1
        gap-4
        sm:grid-cols-2
        lg:grid-cols-3
      "
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isWishlisted={wishlist.includes(product.id)}
          isInCart={cart.includes(product.id)}
          onToggleWishlist={onToggleWishlist}
          onToggleCart={onToggleCart}
        />
      ))}
    </section>
  );
}

export default ProductGrid;