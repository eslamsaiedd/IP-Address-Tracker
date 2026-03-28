import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../../public/images/Icon (1).svg";
import "../global.css";
import { ThemeToggle } from "../ThemeToggle";
import { Menu, X } from "lucide-react";

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `font-medium transition-colors duration-200 dark:text-white text-[var(--black-color)] hover:text-[#2E5BFF] ${
      isActive ? "text-[#2E5BFF] dark:text-[#2E5BFF]" : ""
    }`;

  return (
    <nav
      className="w-full bg-[#F7F9FB] dark:bg-[var(--second-primary-color)] sticky top-0 z-50 border-b border-gray-100 dark:border-[#1e293b]"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-7">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <NavLink
            to="/tracker"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2E5BFF] rounded-[6px]"
            aria-label="IPTracker home"
          >
            <img src={logo} alt="" className="w-6 h-6" aria-hidden="true" />
            <span className="text-2xl font-bold dark:text-white text-[var(--black-color)]">
              IPTracker
            </span>
          </NavLink>

          {/* Desktop nav */}
          <div className="hidden sm:flex gap-6 items-center">
            <ThemeToggle />
            <NavLink to="/tracker" className={linkClass}>
              Tracker
            </NavLink>
          </div>

          {/* Mobile: theme + hamburger */}
          <div className="flex sm:hidden items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="p-2 rounded-[8px] bg-gray-100 dark:bg-[#1e293b] text-[var(--black-color)] dark:text-white cursor-pointer hover:opacity-80 transition-opacity"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="sm:hidden border-t border-gray-100 dark:border-[#1e293b] bg-[#F7F9FB] dark:bg-[var(--second-primary-color)] px-4 py-4 flex flex-col gap-4"
          role="menu"
        >
          <NavLink
            to="/tracker"
            className={linkClass}
            onClick={() => setMenuOpen(false)}
            role="menuitem"
          >
            Tracker
          </NavLink>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
