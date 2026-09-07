import { useMemo } from "react";
import { Star } from "lucide-react";
import { useProducts } from "../../context/ProductContext";

function CustomerReviews() {
  const { products } = useProducts();

  const reviews = useMemo(
    () =>
      products
        .flatMap((product) =>
          (product.reviews || []).map((review) => ({
            ...review,
            productTitle: product.title,
          }))
        )
        .filter((review) => Number(review.rating) === 5)
        .slice(0, 4),
    [products]
  );

  return (
    <section className="w-full min-w-0 rounded-2xl border border-line bg-card p-5">
      <div className="mb-4">
        <h2 className="text-base font-semibold tracking-[-0.01em] text-ink">
          Customer Says
        </h2>

        <p className="mt-1 text-xs text-subtle">
          What our customers think about their products
        </p>
      </div>

      {reviews.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {reviews.map((review, index) => (
            <div
              key={`${review.reviewerName}-${index}`}
              className="
                group relative min-w-0 overflow-hidden rounded-xl
                border border-line bg-muted p-4
                transition-all duration-200 ease-out
                hover:-translate-y-1 hover:border-line-hover
                hover:shadow-[0_12px_28px_rgba(41,35,31,0.08)]
              "
            >
              <div className="pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full bg-soft opacity-0 blur-2xl transition-opacity duration-200 group-hover:opacity-100" />

              <div className="relative z-10">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-ink transition-colors duration-200 group-hover:text-accent">
                      {review.reviewerName}
                    </p>

                    <p className="mt-0.5 truncate text-[11px] font-medium text-subtle">
                      {review.productTitle}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-0.5 transition-transform duration-200 ease-out group-hover:scale-105">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={13}
                        strokeWidth={1.8}
                        className="fill-accent text-accent"
                      />
                    ))}
                  </div>
                </div>

                <p className="mt-3 line-clamp-2 text-xs leading-5 text-secondary">
                  "{review.comment}"
                </p>
              </div>

              <div className="absolute bottom-0 left-4 right-4 h-[2px] origin-left scale-x-0 rounded-full bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex h-20 items-center justify-center">
          <p className="text-sm text-subtle">
            No five-star reviews available.
          </p>
        </div>
      )}
    </section>
  );
}

export default CustomerReviews;
