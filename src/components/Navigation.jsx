import React from "react";
import Logo from "../assets/images/icons/Logo-desktop.svg";
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
            <a className="nav-link" href="/ScenicSpot">
              探索景點
            </a>
            <a className="nav-link" href="/Activity">
              節慶活動
            </a>
            <a className="nav-link" href="/Restaurant">
              品嚐美食
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
