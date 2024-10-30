import React from "react";
import { Link } from "react-router-dom";
const PageNotFound = () => {
  return (
    <main className="container">
      <div className="row">
        <div className="col">
          <p className="lead mt-5">找無此頁面</p>
          <Link to="/" className="btn btn-primary">
            返回首頁
          </Link>
        </div>
      </div>
    </main>
  );
};

export default PageNotFound;
