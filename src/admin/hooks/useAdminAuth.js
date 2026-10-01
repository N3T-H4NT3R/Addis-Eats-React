import { useState } from "react";

const useAdminAuth = () => {
  const [admin, setAdmin] = useState(() => {
    const savedAdmin = localStorage.getItem("admin");

    return savedAdmin
      ? JSON.parse(savedAdmin)
      : null;
  });

  const login = (email, password) => {
    if (
      email === "admin@email.com" &&
      password === "admin123"
    ) {
      const adminData = {
        email,
        role: "admin",
      };

      localStorage.setItem(
        "admin",
        JSON.stringify(adminData)
      );

      setAdmin(adminData);

      return true;
    }

    return false;
  };

  const logout = () => {
    localStorage.removeItem("admin");
    setAdmin(null);
  };

  return {
    admin,
    isAdmin: !!admin,
    login,
    logout,
  };
};

export default useAdminAuth;