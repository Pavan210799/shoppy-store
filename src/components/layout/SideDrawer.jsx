import {
  Heart,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";

function SideDrawer({
  type,
  products,
  onClose,
  onRemove,
}) {
  const isWishlist = type === "wishlist";

  const title = isWishlist
    ? "Wishlist"
    : "Shopping Cart";

  const Icon = isWishlist
    ? Heart
    : ShoppingBag;

  return (
    <>
      <button
        type="button"
        aria-label="Close drawer"
        onClick={onClose}
        className="animate-fade-in fixed inset-0 z-[60] cursor-default border-0 bg-ink/25 p-0 backdrop-blur-[2px]"
      />

      <aside
        className="
          animate-slide-in-right
          fixed right-0 top-0 z-[70]
          flex h-full w-full max-w-[360px]
          flex-col border-l border-line
          bg-muted
          shadow-[-12px_0_32px_rgba(41,35,31,0.12)]
        "
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-line bg-card px-4">
          <div className="flex items-center gap-2.5">
            <Icon
              size={18}
              strokeWidth={1.8}
              className="text-accent"
            />

            <h2 className="text-sm font-semibold text-ink">
              {title}
            </h2>

            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-soft px-1.5 text-[10px] font-semibold text-secondary">
              {products.length}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="group flex h-8 w-8 items-center justify-center rounded-lg text-secondary transition-all duration-200 hover:scale-110 hover:bg-soft hover:text-accent active:scale-95"
          >
            <X
              size={18}
              strokeWidth={1.8}
              className="transition-transform duration-200 group-hover:rotate-90"
            />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
          {products.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center px-6 text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-soft">
                <Icon
                  size={22}
                  strokeWidth={1.7}
                  className="text-subtle"
                />
              </div>

              <p className="text-sm font-semibold text-ink">
                {isWishlist
                  ? "Your wishlist is empty"
                  : "Your cart is empty"}
              </p>

              <p className="mt-1 text-xs leading-5 text-subtle">
                {isWishlist
                  ? "Save products from the catalog to see them here."
                  : "Add products from the catalog to see them here."}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="group/item flex gap-3 rounded-xl border border-line bg-card p-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-line-hover hover:shadow-[0_8px_18px_rgba(41,35,31,0.08)]"
                >
                  <div className="h-[72px] w-16 shrink-0 overflow-hidden rounded-lg bg-soft">
                    <img
                      src={
                        product.thumbnail ||
                        product.images?.[0]
                      }
                      alt={product.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover/item:scale-105"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold text-ink">
                      {product.title}
                    </p>

                    <p className="mt-0.5 truncate text-[10px] capitalize text-subtle">
                      {product.category}
                    </p>

                    <div className="mt-2 flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-accent">
                        ${Number(product.price) || 0}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          onRemove(product.id)
                        }
                        aria-label={`Delete ${product.title}`}
                        className="group flex h-7 w-7 items-center justify-center rounded-lg text-subtle transition-all duration-200 hover:scale-110 hover:bg-soft hover:text-accent active:scale-95"
                      >
                        <Trash2
                          size={13}
                          strokeWidth={1.8}
                          className="transition-transform duration-200 group-hover:rotate-12"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

export default SideDrawer;
