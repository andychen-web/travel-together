import React, { useEffect, useState } from "react";
import TravelPackageForm from "@/pages/TravelPackagesPage/Form/TravelPackageForm.jsx";
import MyBreadCrumb from "@/components/MyBreadCrumb.jsx";
import { useParams } from "react-router-dom";
const TravelPackagesListPage = () => {
  // const [product, setproduct] = useState(initialState);

  useEffect(() => {}, []);
  return (
    <main className="container">
      <MyBreadCrumb routes={["套裝行程"]} />
      <TravelPackageForm />
    </main>
  );
};

export default TravelPackagesListPage;
