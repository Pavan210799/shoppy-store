import {
  Menu,
  Sun,
  Moon,
  Heart,
  ShoppingBag,
  UserRound,
} from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { useProducts } from "../../context/ProductContext";
import { useTheme } from "../../context/ThemeContext";
import ProfileDrawer from "./ProfileDrawer";
import SideDrawer from "./SideDrawer";

function Header({ onMenuClick }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const { currentUser, logout } = useAuth();
  const [drawer, setDrawer] = useState(null);

  const {
    products,
    wishlist,
    cart,
    removeFromWishlist,
    removeFromCart,
  } = useProducts();

  const pageInfo = {
    "/dashboard": {
      title: "Dashboard",
      subtitle: "Overview of your product catalog",
    },
    "/products": {
      title: "Products",
      subtitle: "Browse and manage your product collection",
    },
    "/categories": {
      title: "Categories",
      subtitle: "Browse products by collection",
    },
  };

  const productDetailsMatch = location.pathname.match(
    /^\/products\/([^/]+)$/
  );

  const detailsProduct = productDetailsMatch
    ? products.find(
        (product) =>
          String(product.id) === productDetailsMatch[1]
      )
    : null;

  const currentPage = productDetailsMatch
    ? {
        title: "Product Details",
        subtitle:
          detailsProduct?.title ||
          "View full product information",
      }
    : pageInfo[location.pathname] || pageInfo["/dashboard"];

  const wishlistProducts = products.filter(
    (product) => wishlist.includes(product.id)
  );

  const cartProducts = products.filter(
    (product) => cart.includes(product.id)
  );

  const initials = currentUser?.name
    ? currentUser.name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join("")
    : "";

  const handleLogout = () => {
    logout();
    setDrawer(null);
    navigate("/login");
  };

  const handleProfileClick = () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    setDrawer((current) =>
      current === "profile" ? null : "profile"
    );
  };

  return (
    <>
      <header className="sticky top-0 z-30 bg-page/95 backdrop-blur">
        <div className="flex min-h-[76px] items-center justify-between gap-2 px-4 sm:gap-4 sm:px-6 lg:px-8">

          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <button
              onClick={onMenuClick}
              className="group flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line bg-card text-secondary transition-all duration-200 hover:scale-105 hover:border-line-hover hover:bg-hover hover:text-accent active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/20 lg:hidden"
              aria-label="Open sidebar"
            >
              <Menu
                size={20}
                strokeWidth={1.8}
                className="transition-transform duration-200 group-hover:scale-110"
              />
            </button>

            <div className="min-w-0 sm:pt-3">
              <h1 className="truncate text-base font-semibold tracking-[-0.02em] text-ink sm:text-xl lg:text-[22px]">
                {currentPage.title}
              </h1>

              <p className="mt-1 hidden max-w-full truncate border-b-2 border-accent/70 pb-1 text-xs font-semibold text-quiet sm:inline-block">
                {currentPage.subtitle}
              </p>
            </div>
          </div>

          <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              className="group flex h-10 w-10 items-center justify-center rounded-full text-quiet transition-all duration-200 hover:scale-110 hover:bg-hover hover:text-accent active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/20"
              aria-label={isDark ? "Switch to light theme" : "Switch to night theme"}
            >
              {isDark ? (
                <Sun
                  size={19}
                  strokeWidth={1.8}
                  className="transition-transform duration-300 group-hover:rotate-45 group-hover:scale-110"
                />
              ) : (
                <Moon
                  size={19}
                  strokeWidth={1.8}
                  className="transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110"
                />
              )}
            </button>

            <button
              type="button"
              onClick={() => setDrawer("wishlist")}
              className="group relative flex h-10 w-10 items-center justify-center rounded-full text-quiet transition-all duration-200 hover:scale-110 hover:bg-hover hover:text-accent active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/20"
              aria-label="Wishlist"
            >
              <Heart
                size={19}
                strokeWidth={1.8}
                className={`transition-transform duration-200 group-hover:scale-110 ${
                  wishlist.length > 0
                    ? "fill-accent text-accent"
                    : ""
                }`}
              />

              <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[9px] font-bold text-white transition-transform duration-200 group-hover:scale-110">
                {wishlist.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setDrawer("cart")}
              className="group relative flex h-10 w-10 items-center justify-center rounded-full text-quiet transition-all duration-200 hover:scale-110 hover:bg-hover hover:text-accent active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/20"
              aria-label="Cart"
            >
              <ShoppingBag
                size={19}
                strokeWidth={1.8}
                className="transition-transform duration-200 group-hover:-rotate-6 group-hover:scale-110"
              />

              <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[9px] font-bold text-white transition-transform duration-200 group-hover:scale-110">
                {cart.length}
              </span>
            </button>

            <button
              type="button"
              onClick={handleProfileClick}
              className="group ml-1 flex h-10 w-10 items-center justify-center rounded-full bg-ink text-page shadow-none transition-all duration-200 hover:scale-110 hover:bg-accent hover:text-white hover:shadow-[0_6px_16px_rgba(217,93,57,0.28)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30"
              aria-label={currentUser ? "Open profile" : "Log in"}
            >
              {currentUser ? (
                <span className="text-[10px] font-semibold">
                  {initials}
                </span>
              ) : (
                <UserRound
                  size={18}
                  strokeWidth={1.8}
                  className="transition-transform duration-200 group-hover:scale-110"
                />
              )}
            </button>
          </div>
        </div>
      </header>

      {drawer === "wishlist" && (
        <SideDrawer
          type="wishlist"
          products={wishlistProducts}
          onClose={() => setDrawer(null)}
          onRemove={removeFromWishlist}
        />
      )}

      {drawer === "cart" && (
        <SideDrawer
          type="cart"
          products={cartProducts}
          onClose={() => setDrawer(null)}
          onRemove={removeFromCart}
        />
      )}

      {drawer === "profile" && currentUser && (
        <ProfileDrawer
          user={currentUser}
          onClose={() => setDrawer(null)}
          onLogout={handleLogout}
        />
      )}
    </>
  );
}

export default Header;
