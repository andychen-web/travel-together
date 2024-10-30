import Breadcrumb from "react-bootstrap/Breadcrumb";
import { useLocation } from "react-router-dom";
const MyBreadcrumb = ({ routes }) => {
  const location = useLocation();
  const typeRoute = location.pathname.split("/")[1];
  return (
    <Breadcrumb className="mt-5 pt-2">
      <Breadcrumb.Item href="/">首頁</Breadcrumb.Item>
      {routes.map((route, index) => {
        return (
          <Breadcrumb.Item
            active={index === routes.length - 1 ? "true" : ""}
            key={index}
            href={"/" + typeRoute}
          >
            {route}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

export default MyBreadcrumb;
