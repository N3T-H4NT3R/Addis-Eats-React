import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  LogOut,
} from "lucide-react";
import useAdminAuth from "../admin/hooks/useAdminAuth";
import "./AdminLayout.css"




const AdminLayout = () => {
  const { logout } = useAdminAuth();

  return (
    <div className="admin-layout">

      <aside className="admin-sidebar">

        <div className="admin-sidebar-header">
          <h2>Addis Eats</h2>
          <p>Admin Panel</p>
        </div>

        <nav className="admin-sidebar-nav">

          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              isActive ? "admin-nav-link active" : "admin-nav-link"
            }
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/admin/menus"
            className={({ isActive }) =>
              isActive ? "admin-nav-link active" : "admin-nav-link"
            }
          >
            <ShoppingBag size={20} />
            <span>Menus</span>
          </NavLink>

          <NavLink
            to="/admin/orders"
            className={({ isActive }) =>
              isActive ? "admin-nav-link active" : "admin-nav-link"
            }
          >
            <ShoppingBag size={20} />
            <span>Orders</span>
          </NavLink>

        </nav>

        <button
          className="admin-logout-button"
          onClick={logout}
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>

      </aside>

      <main className="admin-main">
        <Outlet />
      </main>

    </div>
  );
};

export default AdminLayout;