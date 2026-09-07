import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Armchair,
  Flower2,
  ShoppingBasket,
  Sparkles,
} from "lucide-react";
import { useProducts } from "../context/ProductContext";

const CATEGORY_DETAILS = {
  beauty: {
    icon: Sparkles,
    description: "Makeup, skincare, and personal care.",
  },
  fragrances: {
    icon: Flower2,
    description: "Perfumes and signature scents.",
  },
  furniture: {
    icon: Armchair,
    description: "Beds, seating, and home pieces.",
  },
  groceries: {
    icon: ShoppingBasket,
    description: "Everyday food and household picks.",
  },
};

function CategoriesSkeleton() {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <article
          key={index}
          className="overflow-hidden rounded-2xl border border-line bg-card p-4"
        >
          <div className="aspect-square animate-pulse rounded-xl bg-soft" />
          <div className="mt-4 space-y-3">
            <div className="h-4 w-24 animate-pulse rounded bg-soft" />
            <div className="h-3 w-full animate-pulse rounded bg-soft" />
            <div className="h-3 w-2/3 animate-pulse rounded bg-soft" />
          </div>
        </article>
      ))}
    </section>
  );
}

function Categories() {
  const navigate = useNavigate();
  const { products, loading, error } = useProducts();
  const [pageReady, setPageReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPageReady(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const categories = useMemo(() => {
    const grouped = new Map();

    products.forEach((product) => {
      const name = String(product.category || "").trim();

      if (!name) {
        return;
      }

      const current = grouped.get(name) || {
        name,
        count: 0,
        image: product.thumbnail || product.images?.[0] || "",
      };

      current.count += 1;

      if (!current.image) {
        current.image =
          product.thumbnail || product.images?.[0] || "";
      }

      grouped.set(name, current);
    });

    return [...grouped.values()];
  }, [products]);

  if (loading || !pageReady) {
    return <CategoriesSkeleton />;
  }

  if (error) {
    return (
      <section className="flex min-h-[240px] items-center justify-center rounded-2xl border border-line bg-card p-6">
        <p className="text-sm font-medium text-secondary">
          {error}
        </p>
      </section>
    );
  }

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {categories.map((category) => {
        const details = CATEGORY_DETAILS[category.name] || {
          icon: Sparkles,
          description: "Browse products in this collection.",
        };
        const Icon = details.icon;

        return (
          <button
            key={category.name}
            type="button"
            onClick={() => {
              window.scrollTo({
                top: 0,
                left: 0,
                behavior: "instant",
              });
              navigate(
                `/products?category=${encodeURIComponent(category.name)}`
              );
            }}
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
              text-left
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

            <div className="relative aspect-square overflow-hidden rounded-xl bg-image p-8 sm:p-10">
              {category.image ? (
                <img
                  src={category.image}
                  alt={category.name}
                  className="
                    h-full
                    w-full
                    object-contain
                    transition-transform
                    duration-300
                    ease-out
                    group-hover/card:scale-105
                  "
                />
              ) : null}

              <div className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-xl bg-card/90 text-accent">
                <Icon size={18} strokeWidth={1.8} />
              </div>
            </div>

            <div className="relative z-10 mt-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-subtle">
                {category.count} products
              </p>

              <h2 className="mt-1 truncate text-lg font-semibold capitalize text-ink transition-colors duration-200 group-hover/card:text-accent">
                {category.name}
              </h2>

              <p className="mt-2 text-xs leading-5 text-quiet">
                {details.description}
              </p>
            </div>
          </button>
        );
      })}
    </section>
  );
}

export default Categories;
