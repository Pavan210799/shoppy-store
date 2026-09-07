import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import ProductFilters from "../components/products/ProductFilters";
import ProductGrid from "../components/products/ProductGrid";
import ProductPagination from "../components/products/ProductPagination";

function getProductRating(product) {
  if (typeof product?.rating === "number") {
    return product.rating;
  }

  return Number(product?.rating?.rate) || 0;
}

function productMatchesSearch(product, searchTerm) {
  const search = searchTerm.toLowerCase().trim();

  if (!search) {
    return true;
  }

  const fields = [
    product.title,
    product.brand,
    product.category,
    product.description,
    product.sku,
    ...(Array.isArray(product.tags) ? product.tags : []),
  ];

  return fields.some((field) =>
    String(field || "")
      .toLowerCase()
      .includes(search)
  );
}

function getProductsPerPage() {
  if (typeof window === "undefined") {
    return 9;
  }

  if (window.matchMedia("(min-width: 1024px)").matches) {
    return 9;
  }

  if (window.matchMedia("(min-width: 768px)").matches) {
    return 8;
  }

  return 6;
}

function ProductsPageSkeleton({ productsPerPage }) {
  return (
    <div className="space-y-4">
      <section className="w-full rounded-2xl border border-line bg-card p-4">
        <div className="flex items-center gap-3">
          <div className="h-9 min-w-0 flex-1 animate-pulse rounded-xl bg-soft" />
          <div className="h-9 w-9 shrink-0 animate-pulse rounded-xl bg-soft md:w-20" />
        </div>

        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:gap-5">
          <div className="h-9 w-full animate-pulse rounded-xl bg-soft sm:w-[180px]" />
          <div className="h-9 w-full animate-pulse rounded-xl bg-soft sm:w-[150px]" />
          <div className="h-9 min-w-0 flex-1 animate-pulse rounded-xl bg-soft" />
        </div>
      </section>

      <ProductGrid
        products={[]}
        productsPerPage={productsPerPage}
        loading
        error={null}
        wishlist={[]}
        cart={[]}
        onToggleWishlist={() => {}}
        onToggleCart={() => {}}
      />
    </div>
  );
}

function Products() {
  const {
    products,
    loading: initialLoading,
    error,
    wishlist,
    cart,
    toggleWishlist,
    toggleCart,
  } = useProducts();

  const [searchParams, setSearchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    () => searchParams.get("category") || "all"
  );
  const [sortBy, setSortBy] = useState("default");

  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: 0,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(
    getProductsPerPage
  );

  const [filterLoading, setFilterLoading] =
    useState(false);
  const [paginationLoading, setPaginationLoading] =
    useState(false);
  const [pageReady, setPageReady] = useState(false);

  const hasShownProducts = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPageReady(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const updateProductsPerPage = () => {
      setProductsPerPage(getProductsPerPage());
    };

    window.addEventListener("resize", updateProductsPerPage);

    return () => {
      window.removeEventListener("resize", updateProductsPerPage);
    };
  }, []);

  const handleCategoryChange = (nextCategory) => {
    setSelectedCategory(nextCategory);

    const params = new URLSearchParams(searchParams);

    if (!nextCategory || nextCategory === "all") {
      params.delete("category");
    } else {
      params.set("category", nextCategory);
    }

    setSearchParams(params, { replace: true });
  };

  useEffect(() => {
    const categoryFromUrl = searchParams.get("category") || "all";

    setSelectedCategory(categoryFromUrl);
  }, [searchParams]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [selectedCategory]);

  useEffect(() => {
    if (products.length === 0) {
      return;
    }

    const maximumPrice = Math.max(
      ...products.map(
        (product) => Number(product.price) || 0
      )
    );

    setPriceRange((current) =>
      current.max > 0
        ? current
        : {
            min: 0,
            max: maximumPrice,
          }
    );
  }, [products]);

  const categories = useMemo(
    () => [
      ...new Set(
        products.map(
          (product) => product.category
        )
      ),
    ],
    [products]
  );

  const maxPrice = useMemo(() => {
    if (products.length === 0) {
      return 0;
    }

    return Math.max(
      ...products.map(
        (product) => Number(product.price) || 0
      )
    );
  }, [products]);

  const filteredProducts = useMemo(() => {
    const minFilter = Math.max(
      0,
      Number(priceRange.min) || 0
    );

    const maxFilter =
      priceRange.max == null || Number(priceRange.max) <= 0
        ? maxPrice
        : Number(priceRange.max);

    const result = products.filter((product) => {
      if (!productMatchesSearch(product, searchTerm)) {
        return false;
      }

      if (
        selectedCategory !== "all" &&
        String(product.category || "").toLowerCase() !==
          String(selectedCategory).toLowerCase()
      ) {
        return false;
      }

      if (maxPrice > 0) {
        const price = Number(product.price) || 0;

        if (price < minFilter || price > maxFilter) {
          return false;
        }
      }

      return true;
    });

    const sorted = [...result];

    switch (sortBy) {
      case "name-asc":
        sorted.sort((a, b) =>
          String(a.title || "").localeCompare(
            String(b.title || "")
          )
        );
        break;

      case "name-desc":
        sorted.sort((a, b) =>
          String(b.title || "").localeCompare(
            String(a.title || "")
          )
        );
        break;

      case "price-low":
        sorted.sort(
          (a, b) =>
            (Number(a.price) || 0) -
            (Number(b.price) || 0)
        );
        break;

      case "price-high":
        sorted.sort(
          (a, b) =>
            (Number(b.price) || 0) -
            (Number(a.price) || 0)
        );
        break;

      case "rating-high":
        sorted.sort(
          (a, b) =>
            getProductRating(b) -
            getProductRating(a)
        );
        break;

      default:
        break;
    }

    return sorted;
  }, [
    products,
    searchTerm,
    selectedCategory,
    sortBy,
    priceRange,
    maxPrice,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredProducts.length / productsPerPage
    )
  );

  const safePage = Math.min(
    Math.max(1, currentPage),
    filteredProducts.length === 0 ? 1 : totalPages
  );

  const paginatedProducts =
    filteredProducts.slice(
      (safePage - 1) * productsPerPage,
      safePage * productsPerPage
    );

  const handleSetCurrentPage = (nextPage) => {
    setCurrentPage((page) => {
      const lastPage = Math.max(1, totalPages);
      const base = Math.min(page, lastPage) || 1;
      const resolved =
        typeof nextPage === "function"
          ? nextPage(base)
          : nextPage;

      const newPage = Math.min(
        Math.max(1, resolved),
        lastPage
      );

      if (newPage !== page) {
        setPaginationLoading(true);
      }

      return newPage;
    });
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchTerm,
    selectedCategory,
    sortBy,
    priceRange,
  ]);

  useEffect(() => {
    if (initialLoading || products.length === 0) {
      return;
    }

    if (!hasShownProducts.current) {
      if (priceRange.max > 0) {
        hasShownProducts.current = true;
      }

      return;
    }

    setFilterLoading(true);

    const timer = setTimeout(() => {
      setFilterLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, [
    searchTerm,
    selectedCategory,
    sortBy,
    priceRange,
    initialLoading,
    products.length,
  ]);

  useEffect(() => {
    if (!paginationLoading) {
      return;
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [currentPage, paginationLoading]);

  useEffect(() => {
    if (!paginationLoading) {
      return;
    }

    const timer = setTimeout(() => {
      setPaginationLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, [paginationLoading]);

  const loading =
    initialLoading ||
    filterLoading ||
    paginationLoading;

  if (initialLoading || !pageReady) {
    return (
      <ProductsPageSkeleton productsPerPage={productsPerPage} />
    );
  }

  return (
    <div className="space-y-4">
      <ProductFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={handleCategoryChange}
        sortBy={sortBy}
        setSortBy={setSortBy}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        categories={categories}
        maxPrice={maxPrice}
      />

      <ProductGrid
        products={paginatedProducts}
        productsPerPage={productsPerPage}
        loading={loading}
        error={error}
        wishlist={wishlist}
        cart={cart}
        onToggleWishlist={
          toggleWishlist
        }
        onToggleCart={toggleCart}
      />

      {!loading &&
        !error &&
        filteredProducts.length > 0 && (
          <ProductPagination
            currentPage={safePage}
            totalPages={totalPages}
            setCurrentPage={
              handleSetCurrentPage
            }
          />
        )}
    </div>
  );
}

export default Products;
