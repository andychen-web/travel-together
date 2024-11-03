import React, { useState, useEffect, useContext } from "react";
import Logo from "@/assets/images/icons/Logo-desktop.svg";
import { NavContext } from "@/context/NavContext";
import Cookies from "universal-cookie";
import { useLocation, useNavigate, Link } from "react-router-dom";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { basePath } from "@/utilities/data";
const Navigation = () => {
  const { routes, navLinks } = useContext(NavContext);
  const parentLinks = routes.filter((item) => {
    return item.isVisibleOnNav; //排除不顯示的Parent路由
  });
  parentLinks.forEach((item) => {
    item.children.forEach((child, i) => {
      if (!child.isVisibleOnNav) {
        delete item.children[i]; //排除不顯示的Child路由
      }
    });
  });
  // 最終navbar links
  let links = parentLinks.map((item) => {
    return {
      parent: { path: item.path, name: item.name, children: item.children },
    };
  });

  const cookies = new Cookies();
  const cookieAdminToken = cookies.get("adminToken");
  const { pathname } = useLocation();
  const [adminToken, setAdminToken] = useState(cookieAdminToken);
  const navigate = useNavigate();
  useEffect(() => {
    setAdminToken(cookies.get("adminToken"));
  }, [pathname]);
  const handleLogoClick = () => {
    navigate(basePath);
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
          {links.map((route, index) => (
            <NavDropdown key={index} title={route.parent.name}>
              {route.parent.children?.map(
                (child, childIndex) =>
                  child.name && (
                    <NavDropdown.Item
                      key={childIndex}
                      as={Link}
                      to={route.parent.path + "/" + child.path}
                      href={route.parent.path + "/" + child.path}
                    >
                      {child.name}
                    </NavDropdown.Item>
                  )
              )}
            </NavDropdown>
          ))}
        </Nav>

        {false && (
          <Nav>
            {navLinks.map((link) => (
              <Nav.Link
                key={link.key}
                className="custom-link nav-link"
                as={Link}
                to={link.path}
                href={link.path}
              >
                {link.name}
              </Nav.Link>
            ))}

            {/* <Nav.Link className="custom-link nav-link" href="/userAuth">
              會員登入
            </Nav.Link> */}
            {adminToken ? (
              <Nav.Link
                className="custom-link nav-link"
                onClick={() => {
                  cookies.remove("adminToken");
                  navigate("/");
                }}
              >
                登出
              </Nav.Link>
            ) : (
              <></>
            )}

            {/* <NavDropdown
              variant="light"
              title={<span className="text-white">後台管理</span>}
            >
              <NavDropdown.Item href="/adminAuth">管理員登入</NavDropdown.Item>
              <NavDropdown.Item href="/admin/orders">訂單管理</NavDropdown.Item>
              <NavDropdown.Item href="/admin/products">
                商品管理
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
