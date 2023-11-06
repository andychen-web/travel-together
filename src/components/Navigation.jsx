import React, { useState, useEffect } from "react";
import Logo from "../assets/images/icons/Logo-desktop.svg";
import { routes } from "../utilities/routes";
import Cookies from "universal-cookie";
import { useLocation } from "react-router-dom";
const Navigation = () => {
  const cookies = new Cookies();
  const cookieAdminToken = cookies.get("adminToken");
  const { pathname } = useLocation();
  useEffect(() => {
    setAdminToken(cookies.get("adminToken"));
  }, [pathname]);
  const [adminToken, setAdminToken] = useState(cookieAdminToken);
  return (
    <nav className="navbar navbar-expand-md container">
      <div className="container-fluid">
        <a className="navbar-brand w-sm-75 w-md-50  me-0" href="/">
          <img width={"70%"} src={Logo} alt="logo" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse w-100" id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto">
            {routes.map((route, index) => (
              <a key={index} className="nav-link" href={route.path}>
                {route.name}
              </a>
            ))}
            {adminToken ? (
              <span
                className="nav-link cursor-pointer"
                onClick={() => {
                  cookies.remove("adminToken");
                  window.location.reload();
                }}
              >
                登出
              </span>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
