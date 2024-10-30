import React, { useState, useEffect, useContext } from "react";
import Logo from "@/assets/images/icons/Logo-desktop.svg";
import { NavContext } from "@/context/NavContext";
import Cookies from "universal-cookie";
import { useLocation, useNavigate, Link } from "react-router-dom";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import { basePath } from "@/utilities/data";
const Navigation = () => {
  const { routes, navLinks } = useContext(NavContext);
  const links = routes
    .map((item) => {
      if (!item.name) return; //若無nav說明
      return {
        parent: { path: item.path, name: item.name, children: item.children },
      };
    })
    .filter((item) => {
      return item;
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
      style={{ width: "100vw", top: 0 }}
      className="position-fixed custom-nav z-3"
    >
      <Container>
        <img width={"30%"} src={Logo} alt="logo" onClick={handleLogoClick} />
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
      </Container>
    </Navbar>
  );
};

export default Navigation;
