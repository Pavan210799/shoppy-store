import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Layers3,
  X,
} from "lucide-react";

import logo from "../../assets/shoppy-logo.png";

const navigation = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Products",
    path: "/products",
    icon: Package,
  },
  {
    name: "Categories",
    path: "/categories",
    icon: Layers3,
  },
];

function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile / Tablet Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-ink/30 backdrop-blur-[2px] transition-opacity duration-300 lg:hidden ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 z-50 h-screen w-72
          border-r border-line
          bg-surface
          transition-transform duration-300 ease-out
          lg:block lg:w-64 lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex h-full flex-col px-5 py-6">

          {/* Brand */}
<div className="px-2">
  <div className="flex items-center gap-1.5">

    {/* Logo */}
    <img
      src={logo}
      alt="Shoppy"
      className="h-14 w-14 shrink-0 object-contain"
    />

    {/* Company Name */}
    <h1 className="text-xl font-medium tracking-tight text-ink">
      ShoppyStore
    </h1>

    {/* Close Button — Mobile / Tablet */}
    <button
      onClick={onClose}
      className="
        group
        ml-auto flex h-9 w-9
        items-center justify-center
        rounded-full
        text-quiet
        transition-all duration-200
        hover:scale-110
        hover:bg-soft
        hover:text-accent
        active:scale-95
        lg:hidden
      "
      aria-label="Close sidebar"
    >
      <X
        size={19}
        strokeWidth={1.7}
        className="transition-transform duration-200 group-hover:rotate-90"
      />
    </button>
  </div>

  {/* Divider */}
  <div className="mt-6 h-px w-full bg-line" />
</div>

          {/* Navigation */}
          <nav className="mt-7 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                        `group relative flex items-center gap-3 overflow-hidden rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 active:scale-[0.98] ${
                        isActive
                            ? "bg-gradient-to-r from-accent via-[#df7653] to-[#d6a07d] text-white shadow-[0_7px_18px_rgba(217,93,57,0.20)]"
                            : "text-quiet hover:translate-x-0.5 hover:bg-soft hover:text-ink"
                        }`
                    }
                >
                  {/* Active Item Shine */}
                  <span
                    className="
                      pointer-events-none absolute
                      inset-y-0 -left-12
                      w-8 rotate-[20deg]
                      bg-card/20 blur-[2px]
                      transition-transform duration-500
                      group-hover:translate-x-72
                    "
                  />

                  {/* Icon */}
                  <Icon
                    size={19}
                    strokeWidth={1.8}
                    className="
                      relative z-10
                      transition-transform duration-200
                      group-hover:scale-105
                    "
                  />

                  {/* Label */}
                  <span className="relative z-10">
                    {item.name}
                  </span>
                </NavLink>
              );
            })}
          </nav>

          {/* Bottom Information */}
          <div className="mt-auto rounded-2xl bg-soft p-4">
            <p className="text-xs font-medium text-ink">
              Shoppy
            </p>

            <p className="mt-1 text-[11px] font-normal leading-4 text-quiet">
              Everything you need in one place.
            </p>
          </div>

        </div>
      </aside>
    </>
  );
}

export default Sidebar;