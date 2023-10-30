import Breadcrumb from "react-bootstrap/Breadcrumb";
import { useLocation } from "react-router-dom";
import { routes } from "../utilities/routes";
const MyBreadcrumb = () => {
  const location = useLocation();
  const matchingRouteList = routes.filter(
    (route) => route.path === location.pathname
  );
  return (
    <Breadcrumb>
      <Breadcrumb.Item href="/">首頁</Breadcrumb.Item>
      {matchingRouteList.map((route, index) => (
        <Breadcrumb.Item key={index} active href={route.path}>
          {route.name}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default MyBreadcrumb;
