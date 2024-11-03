import React, { useState, useEffect } from "react";
import { Card, Badge } from "react-bootstrap";


const RoomCard = ({hotelData}) => {
  const [hotel, setHotel] = useState({});

  useEffect(() => {
    setHotel(hotelData);
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

export default RoomCard;
