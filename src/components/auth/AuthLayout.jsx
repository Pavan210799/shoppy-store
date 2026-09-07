import { Moon, Sun } from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import logo from "../../assets/shoppy-logo.png";
import AuthBackground from "./AuthBackground";

function AuthLayout() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="relative min-h-screen overflow-hidden bg-page text-ink">
      <AuthBackground />

      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="flex items-center justify-between px-5 py-5 sm:px-8">
          <Link to="/login" className="flex items-center gap-1.5">
            <img
              src={logo}
              alt="Shoppy"
              className="h-12 w-12 shrink-0 object-contain sm:h-14 sm:w-14"
            />
            <span className="text-lg font-medium tracking-tight text-ink sm:text-xl">
              ShoppyStore
            </span>
          </Link>

          <button
            type="button"
            onClick={toggleTheme}
            className="group flex h-10 w-10 items-center justify-center rounded-full text-quiet transition-all duration-200 hover:scale-110 hover:bg-hover hover:text-accent active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/20"
            aria-label={
              isDark ? "Switch to light theme" : "Switch to night theme"
            }
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
        </header>

        <main className="flex flex-1 items-center justify-center px-4 py-6 sm:px-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AuthLayout;
