import React from "react";
import Logo from "../assets/images/icons/Logo-desktop.svg";
import { routes } from "../utilities/routes";
const Navigation = () => {
  return (
    <nav className="navbar navbar-expand-sm container">
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
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
