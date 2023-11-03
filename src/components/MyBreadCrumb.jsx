import Breadcrumb from "react-bootstrap/Breadcrumb";
const MyBreadcrumb = ({ routes }) => {
  return (
    <Breadcrumb>
      <Breadcrumb.Item href="/">首頁</Breadcrumb.Item>
      {routes.map((route, index) => (
        <Breadcrumb.Item active key={index}>
          {route}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default MyBreadcrumb;
