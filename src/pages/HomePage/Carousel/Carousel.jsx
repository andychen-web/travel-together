import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
const Carousel = ({ items }) => {
  return (
    <Swiper
      className="rounded mb-3"
      spaceBetween={30}
      pagination={{ clickable: true }}
      navigation={true}
      slidesPerView={1}
      autoplay={{ delay: 2000, disableOnInteraction: true }}
      modules={[Autoplay, Pagination, Navigation]}
      autoHeight={true}
    >
      {items.map((item, index) => (
        <SwiperSlide key={index}>
          <div
            style={{
              height: "400px",
              backgroundImage: `url(${item.Picture.PictureUrl1})`,
            }}
            className="bg-img d-flex justify-content-center align-items-center"
          >
            <h3 className="text-white fw-bold position-absolute">
              {item.City + "|" + item.ScenicSpotName}
            </h3>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
