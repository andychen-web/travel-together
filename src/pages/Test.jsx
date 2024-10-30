import React, { useState, useEffect } from "react";
import commonAxiosInstance from "../api/common/commonAxiosInstance";
import { apiGetHotels, apiHotelParams } from "@/api";

import {
  FaWifi,
  FaSwimmer,
  FaDumbbell,
  FaUtensils,
  FaGlassCheers,
} from "react-icons/fa"; // 引入相應的圖標
// import './Facilities.css'; // 引入 CSS 檔案

const facilities = [
  { name: "免費Wi-Fi", icon: <FaWifi /> },
  { name: "游泳池", icon: <FaSwimmer /> },
  { name: "健身房", icon: <FaDumbbell /> },
  { name: "餐廳", icon: <FaUtensils /> },
  { name: "酒吧", icon: <FaGlassCheers /> },
];

const Facilities = () => {
  return (
    <section className="container my-4">
      <div className="d-flex justify-content-start  flex-wrap">
        {facilities.map((facility) => (
          <div key={facility.name} className="mx-2">
            <span className="badge rounded-pill bg-primary">
              {facility.icon} {facility.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

const Test = () => {
  const [state, setState] = useState(null);

  useEffect(() => {
    apiGetHotels()
  }, []);

  return (
    <div>
      <Facilities></Facilities>
    </div>
  );
};

export default Test;
