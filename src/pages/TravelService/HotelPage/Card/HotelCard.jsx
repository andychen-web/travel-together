import React, { useState, useEffect } from "react";

// 星光飯店資料
const hotelData = {
  name: "星光飯店",
  city: "台北市",
  country: "台灣",
  description:
    "星光飯店是一家豪華的飯店，提供舒適的住宿和一流的服務，讓您享受完美的假期。",
  type: "Budget",
  adultCount: 2,
  childCount: 1,
  facilities: ["免費Wi-Fi", "游泳池", "健身房", "餐廳", "酒吧"],
  pricePerNight: 3500,
  starRating: 5,
  imageUrls: [],
};

const HotelCard = () => {
  const [hotel, setHotel] = useState({});

  useEffect(() => {
    setHotel(data);
  }, []);

  const handleAppointment = () => {
    return;
  };
  return (
    <Card className="mb-3">
      {/* 飯店名稱 */}
      <Card.Header>
        {hotelData.name} <Badge variant="info">{hotelData.starRating} 星</Badge>
      </Card.Header>
      <Card.Body>
        {/* 飯店介紹 */}
        <Card.Title>
          {hotelData.city}, {hotelData.country}
        </Card.Title>
        <Card.Text>{hotelData.description}</Card.Text>
        {/* 飯店設施 */}
        <div>
          {hotelData.facilities.map((facility, index) => (
            <Badge key={index} variant="secondary" className="mx-1">
              {facility}
            </Badge>
          ))}
        </div>
        {/* 房價與預訂按鈕 */}
        <div className="mt-3">
          <h5>每晚價格: NT${hotelData.pricePerNight}</h5>
          <button className="btn-custom-primary" onClick={handleAppointment}>
            預訂
          </button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default HotelCard;
