import React from "react";
import router from "@/router";

const NavContext = React.createContext();

const NavProvider = ({ children }) => {
  const routes = router.routes;
  const indexToRemoved = [];
  const navLinks = routes.flatMap((route, index) => {
    if (!route || !route.children) {
      indexToRemoved.push(index);
      return;
    }
    return route.children
      .filter((child) => child.name)
      .map((child) => ({
        key: `${route.path}-${child.path}`,
        path: child.path ? `${route.path}/${child.path}` : `${route.path}`,
        name: child.name,
      }));
  });
  indexToRemoved.forEach((index) => navLinks.splice(index, 1));
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
