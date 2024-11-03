import React from "react";
import LatestDestinationCard from "./Card/LatestDestinationCard";
import NoSearchResult from "@/components/Search/NoSearchResult.jsx";
const HotelList = ({ hotels }) => {
  return (
    <main className="container">
      <h2  className="my-4">查詢結果</h2>
      {hotels.data.length ? (
        hotels.data.map((hotel) => (
          <LatestDestinationCard hotel={hotel} key={hotel._id} />
        ))
      ) : (
        <NoSearchResult />
      )}
    </main>
  );
};

export default HotelList;
