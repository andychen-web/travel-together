import React, { useMemo, useContext } from "react";
import Logo from "@/assets/images/icons/Logo-desktop.svg";
import { NavContext } from "@/context/NavContext";
import { useAuth } from "@/context/AuthContext";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { userRoutes } from "@/router";
// import { useCookieManager } from "@/hooks/useCookieManager";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const AppHeader = () => {
  const { routes } = useContext(NavContext);
  const { isLoggedIn } = useAuth();
  // const { getCookie } = useCookieManager();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  
  const { mainMenuItems, userMenuItems } = useMemo(() => {
    console.log(routes);
    const visibleParentRoutes = routes
      .filter(parent => parent.isVisibleOnNav)
      .map(parent => ({
        ...parent,
        children: parent.children?.filter(child => child.isVisibleOnNav) || []
      }));
    
    return {
      mainMenuItems: visibleParentRoutes,
      userMenuItems: userRoutes
    };
  }, [routes]);
  
  const handleLogoClick = () => navigate("/");
  
  return (
    <Navbar
      collapseOnSelect
      expand="sm"
      bg="light"
      data-bs-theme="light"
      style={{ width: "100vw", top: 0, maxHeight: "80px" }}
      className="position-fixed px-5 custom-nav z-3"
      aria-label="Main navigation"
    >
      <img 
        width="170px" 
        src={Logo} 
        alt="Travel Taiwan Logo" 
        onClick={handleLogoClick}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => e.key === 'Enter' && handleLogoClick()}
      />
      
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      
      <Navbar.Collapse
        id="responsive-navbar-nav"
        className="justify-content-end"
      >
        <Nav>
          {/* 會員相關路由 */}
          {isLoggedIn && userMenuItems.map((route, index) => (
            <NavDropdown key={index} title={route.name}>
              {route.children?.map((child) => (
                <NavDropdown.Item
                  key={child.path}
                  as={Link}
                  to={`${route.path}/${child.path}`}
                >
                  {child.name}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          ))}
          {/* 其他路由 */}
          {mainMenuItems.map((route, index) => (
            <NavDropdown key={index} title={route.name}>
              {route.children?.map((child) => (
                <NavDropdown.Item
                  key={child.path}
                  as={Link}
                  to={`${route.path}/${child.path}`}
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

export default AppHeader;
