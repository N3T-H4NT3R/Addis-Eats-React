import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import useCartStore from "../../store/cartStore";
import { useSearch } from "../../Context/SearchContext";

import {
  ShoppingCart,
  Moon,
  Sun,
  Menu,
  Search,
  X,
} from "lucide-react";
import { useTheme } from "../../Context/ThemeContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const { search, setSearch } = useSearch();

  const items = useCartStore((state) => state.items);

  const totalItems = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const { theme, changeTheme } = useTheme();

  return (
    <nav className="navbar">

      <div className="left-nav">
        <Link to="/" className="title">
          Addis<span className="sub-title">Eats</span>
        </Link>
      </div>

      {/* Menu checkbox */}
      <input
        type="checkbox"
        id="menu-toggle"
        checked={menuOpen}
        onChange={() => setMenuOpen(!menuOpen)}
      />

      <label htmlFor="menu-toggle" className="menu-button">
        <Menu size={28} />
      </label>

      <div
        className={`center-nav ${
          menuOpen ? "show-menu" : ""
        } ${searchOpen ? "search-active" : ""}`}
      >
        <ul>
          <NavLink
            className={({ isActive }) =>
              isActive ? "active" : "nav-link"
            }
            to="/menu"
          >
            Menu
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive ? "active" : "nav-link"
            }
            to="/orders"
          >
            Order
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive ? "active" : "nav-link"
            }
            to="/favorites"
          >
            Favorite
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive ? "active" : "nav-link"
            }
            to="/admin"
          >
            Admin
          </NavLink>
        </ul>
      </div>

      <div className="right-nav">

        {/* Cart */}
        <NavLink to="/cart" className="cart-link">
          <ShoppingCart size={24} />
          <span className="cart-badge">{totalItems}</span>
        </NavLink>

        {/* Theme */}
        {theme ? (
          <Moon
            className="theme"
            onClick={changeTheme}
            size={26}
          />
        ) : (
          <Sun
            className="theme"
            onClick={changeTheme}
            size={26}
          />
        )}

        {/* Search */}
        {searchOpen ? (
          <div className="search-bar">
            <div className="search-input-wrapper">
              <input
                type="text"
                placeholder="Search dishes..."
                className="search-input"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoFocus
              />

              <X
                className="search-close"
                size={22}
                onClick={() => {
                  setSearchOpen(false);
                  setSearch("");
                }}
              />
            </div>
          </div>
        ) : (
          <Search
            className="search-icon"
            size={26}
            onClick={() => {
              setSearchOpen(true);
              setMenuOpen(false);
            }}
          />
        )}

      </div>

    </nav>
  );
};

export default Navbar;