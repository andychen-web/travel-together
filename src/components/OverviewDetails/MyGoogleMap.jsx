import React from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";

const MyGoogleMap = ({ position }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
  });

  return (
    <div className="w-100">
      {!isLoaded ? (
        <div>載入中...</div>
      ) : (
        position && (
          <GoogleMap
            zoom={10}
            center={{ lat: position?.PositionLat, lng: position?.PositionLon }}
            mapContainerClassName="map-frame mt-3 mt-md-0"
          >
            <MarkerF
              center
              position={{
                lat: position?.PositionLat,
                lng: position?.PositionLon,
              }}
            />
          </GoogleMap>
        )
      )}
    </div>
  );
};

export default MyGoogleMap;
