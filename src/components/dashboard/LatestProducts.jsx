import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../../context/ProductContext";

function LatestProducts() {
  const { products } = useProducts();
  const navigate = useNavigate();

  const latestProducts = useMemo(
    () =>
      [...products]
        .sort(
          (a, b) =>
            new Date(b.meta?.createdAt || 0) -
            new Date(a.meta?.createdAt || 0)
        )
        .slice(0, 3),
    [products]
  );

  return (
    <section className="h-full w-full min-w-0 rounded-2xl border border-line bg-card px-5 pb-1 pt-5">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-base font-semibold tracking-[-0.01em] text-ink">
          Latest Products
        </h2>

        <button
          type="button"
          onClick={() => navigate("/products")}
          className="px-1 py-0 text-xs font-semibold text-accent transition-all duration-200 hover:font-bold hover:text-accent-hover hover:underline"
        >
          View All
        </button>
      </div>

      <div className="space-y-2">
        {latestProducts.map((product) => (
          <div
            key={product.id}
            role="link"
            tabIndex={0}
            onClick={() => navigate(`/products/${product.id}`)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                navigate(`/products/${product.id}`);
              }
            }}
            className="
              group relative flex cursor-pointer items-center gap-3
              overflow-hidden rounded-xl border border-line bg-muted p-2
              transition-all duration-200 ease-out
              hover:-translate-y-1 hover:border-line-hover
              hover:shadow-[0_12px_28px_rgba(41,35,31,0.08)]
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/20
            "
          >
            <div className="pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full bg-soft opacity-0 blur-2xl transition-opacity duration-200 group-hover:opacity-100" />

            <div className="relative z-10 h-[52px] w-[52px] shrink-0 overflow-hidden rounded-lg bg-image transition-transform duration-200 ease-out group-hover:scale-105">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="relative z-10 min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-ink transition-colors duration-200 group-hover:text-accent">
                {product.title}
              </p>

              <p className="mt-0.5 truncate text-[11px] font-medium capitalize text-subtle">
                {product.category}
              </p>
            </div>

            <p className="relative z-10 shrink-0 text-sm font-semibold text-accent transition-transform duration-200 ease-out group-hover:-translate-y-0.5">
              ${product.price}
            </p>

            <div className="absolute bottom-0 left-3 right-3 h-[2px] origin-left scale-x-0 rounded-full bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100" />
          </div>
        ))}
      </div>
    </section>
  );
}

export default LatestProducts;
