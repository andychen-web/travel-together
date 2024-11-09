import Breadcrumb from "react-bootstrap/Breadcrumb";
import { useLocation, Link } from "react-router-dom";
const MyBreadcrumb = ({ routes }) => {
  const location = useLocation();
  const typeRoute = location.pathname.split("/")[1];
  return (
    <Breadcrumb className="mt-5 pt-2">
      <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
        首頁
      </Breadcrumb.Item>
      {routes.map((route, index) => {
        return (
          <Breadcrumb.Item
            active={index === routes.length - 1 ? "true" : ""}
            key={index}
            linkAs={Link} linkProps={{ to: "/" + typeRoute }}
          >
            {route}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

export default MyBreadcrumb;
