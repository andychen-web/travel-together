import React, { useEffect, useState } from "react";
import FilterHotelsForm from "./FilterHotelsForm";
import Loader from "@/components/Loader";
import HotelList from "./HotelList";
import MyBreadCrumb from "@/components/MyBreadCrumb.jsx";
import NoSearchResult from "@/components/Search/NoSearchResult.jsx";
const HotelsPage = () => {
  const [hotels, setHotels] = useState([]);
  const [isLoadingArray, setIsLoadingArray] = useState([]);
  const isAllLoading = isLoadingArray.some((singleLoading) => singleLoading);
  return (
    <main className="container">
      <MyBreadCrumb routes={["飯店查詢"]} />
      <Loader isLoading={isAllLoading} />
      <FilterHotelsForm
        setHotels={setHotels}
        setIsLoadingArray={setIsLoadingArray}
      />

      {hotels && Object.keys(hotels).length ? (
        <HotelList hotels={hotels} />
      ) : (
        <NoSearchResult></NoSearchResult>
      )}
    </main>
  );
};

export default HotelsPage;
