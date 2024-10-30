import React from "react";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  const openNewWindow = (url) => {
    console.log(url);
    window.open(url, "_blank");
  };
  return (
    <footer
      style={{ height: "4.5rem" }}
      className="footer bg-primary text-white p-3 text-center"
    >
      <div>
        <span className="mt-1">旅遊景點導覽</span>
        <FaGithub
          className="cursor-pointer"
          onClick={() =>
            openNewWindow("https://github.com/andychen-web/travel-taiwan.git")
          }
          style={{ marginRight: "0.5rem" }}
        />
      </div>
    </footer>
  );
};

export default Footer;
