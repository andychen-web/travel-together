import React from "react";
import Arrow from "../../../assets/images/icons/arrow-right-orange.svg";
const Header = ({ title, link, linkType }) => {
  return (
    <div className="d-flex align-items-center justify-content-between">
      <h1 className="">{title}</h1>
      <a href={link} className="fw-bold link-warning">
        查看更多{linkType}
        <img src={Arrow} alt="arrow-icon" />
      </a>
    </div>
  );
};

export default Header;
