import React, { useState, useEffect } from "react";
import RoomCard from "./Card/RoomCard";
import { apiGetHotelById } from "@/api-client";
import NoSearchResult from "@/components/Search/NoSearchResult.jsx";
import { useParams } from "react-router-dom";

const HotelDetailPage = () => {
  const { id } = useParams();
  const [hotelData, setHotelData] = useState({});

  useEffect(() => {
    async function fetchHotel(id) {
      const data = await apiGetHotelById(id);
      setHotelData(data);
    }
    fetchHotel(id);
  }, [id]);

  return (
    <>
      {!hotelData || Object.keys(hotelData).length === 0 ? (
        <NoSearchResult></NoSearchResult>
      ) : (
        <RoomCard hotelData={hotelData} />
      )}
    </>
  );
};

export default HotelDetailPage;
