import React from "react";
import pointerGrey from "../../../assets/images/icons/pointer-grey.svg";
import arrowPrimary from "../../../assets/images/icons/arrow-right-primary.svg";
const ActivityCard = ({ activity }) => {
  return (
    <div className="card d-flex flex-row mb-2">
      <div>
        <img
          className="activity-card-img rounded-start"
          height={"100%"}
          src={activity.Picture.PictureUrl1}
          alt={activity.ActivityName}
        />
      </div>
      {/* card detail */}
      <div className="card-body d-flex flex-column justify-content-between py-1">
        <div>
          <div className="text-secondary d-lg-flex">
            <div>{activity.StartTime.slice(0, 10)}</div>
            <div>-{activity.EndTime.slice(0, 10)}</div>
          </div>
          <span className="fw-bold h6">{activity.ActivityName}</span>
        </div>
        <div className="d-flex justify-content-between">
          <span>
            <img src={pointerGrey} alt="pointer" /> {activity.City}
          </span>
          <a href="/" className="d-none d-lg-block">
            詳細介紹
            <img src={arrowPrimary} alt="arrow" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
