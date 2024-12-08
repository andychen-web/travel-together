import React from "react";
import router from "@/router";

const NavContext = React.createContext();

const NavProvider = ({ children }) => {
  const routes = router.routes;
  const navLinks = routes.reduce((acc, route) => {
    // 排除不存在的路由
    if (!route || !route.children) {
      return acc;
    }

    const childrenLinks = route.children
      .filter((child) => child.name)
      .map((child) => ({
        key: `${route.path}-${child.path}`,
        path: child.path ? `${route.path}/${child.path}` : `${route.path}`,
        name: child.name,
      }));

    return [...acc, ...childrenLinks];
  }, []);
  return (
    <NavContext.Provider
      value={{
        navLinks,
        routes,
      }}
    >
      {children}
    </NavContext.Provider>
  );
};

export { NavContext, NavProvider };
