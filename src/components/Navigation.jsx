import React, { useState, useEffect, useContext } from "react";
import Logo from "@/assets/images/icons/Logo-desktop.svg";
import { NavContext } from "@/context/NavContext";
import { useAuth } from "@/context/AuthContext";
import Cookies from "universal-cookie";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { userRoutes } from "@/router";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
const Navigation = () => {
  const { routes } = useContext(NavContext);
  const { isLoggedIn } = useAuth();
  const parentLinks = JSON.parse(JSON.stringify(routes)).filter((parent) => {
    return parent.isVisibleOnNav && !parent.hasDynamicRoutes; //排除不顯示的Parent路由
  });

  function filterChildrenRoutes() {
    parentLinks.forEach((item) => {
      if (!item.children) return;
      item.children.forEach((child, i) => {
        if (!child.isVisibleOnNav) {
          delete item.children[i]; //排除不顯示的Child路由
        }
      });
    });
  }
  filterChildrenRoutes();
  // user相關links處理
  const userLinks = userRoutes;
  console.log(isLoggedIn);
  console.log(userLinks);

  // 準備顯示用navbar links
  let links = parentLinks.map((parent) => {
    return {
      parent: {
        path: parent.path,
        name: parent.name,
        children: parent.children,
      },
    };
  });
  //                 onClick={() => {
  //   cookies.remove("adminToken");
  //   navigate("/");
  // }}
  // 登出

  // TODO
  const cookies = new Cookies();
  const cookieAdminToken = cookies.get("adminToken");
  const { pathname } = useLocation();
  const [adminToken, setAdminToken] = useState(cookieAdminToken);
  const navigate = useNavigate();
  useEffect(() => {
    setAdminToken(cookies.get("adminToken"));
  }, [pathname]);
  const handleLogoClick = () => {
    navigate("/");
  };
  return (
    <Navbar
      collapseOnSelect
      expand="sm"
      bg="light"
      data-bs-theme="light"
      style={{ width: "100vw", top: 0, maxHeight: "80px" }}
      className="position-fixed px-5 custom-nav z-3"
    >
      <img width={"170px"} src={Logo} alt="logo" onClick={handleLogoClick} />
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse
        id="responsive-navbar-nav"
        className="justify-content-end"
      >
        <Nav>
          {/* 會員中心 */}
          {userLinks.map((route, index) => (
            <NavDropdown key={index} title={route.name}>
              {route.children?.map((child) => (
                <NavDropdown.Item
                  key={child.path}
                  as={Link}
                  to={route.path + "/" + child.path}
                  href={route.path + "/" + child.path}
                >
                  {child.name}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          ))}
          {/* 其他路由 */}
          {links.map((route, index) => (
            <NavDropdown key={index} title={route.parent.name}>
              {route.parent.children?.map((child) => (
                <NavDropdown.Item
                  key={child.path}
                  as={Link}
                  to={route.parent.path + "/" + child.path}
                  href={route.parent.path + "/" + child.path}
                >
                  {child.name}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          ))}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
