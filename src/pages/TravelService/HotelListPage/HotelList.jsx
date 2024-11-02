import React from "react";

const HotelList = ({ hotels }) => {
  return (
    <div className="container">
      <h2 className="my-4">查詢結果</h2>
      <div className="row">
        {hotels.data.map((hotel) => (
          <div className="col-md-6 mb-4" key={hotel.hotelId}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{hotel.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  {hotel.chainCode}
                </h6>
                <p className="card-text">
                  <strong>Rating:</strong> {hotel.rating} stars
                  <br />
                  <strong>Distance:</strong> {hotel.distance.value}{" "}
                  {hotel.distance.unit}
                  <br />
                  <strong>Location:</strong> {hotel.geoCode.latitude},{" "}
                  {hotel.geoCode.longitude}
                  <br />
                  <strong>Last Update:</strong>{" "}
                  {new Date(hotel.lastUpdate).toLocaleDateString()}
                </p>
                <a href="#" className="btn btn-primary">
                  Book Now
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelList;
