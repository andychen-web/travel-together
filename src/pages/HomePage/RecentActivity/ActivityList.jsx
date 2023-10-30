import React, { useEffect, useState } from "react";
import { getActivity } from "../../../api/api";
import ActivityCard from "./ActivityCard";
const ActivityList = () => {
  const [activities, setActivities] = useState([]);
  useEffect(() => {
    getActivity()
      .then((data) => {
        let shownActivities = data.filter(
          (element) => element.ActivityName.length <= 13
        );
        shownActivities = shownActivities.map((element) => {
          if (element.ActivityName.includes("2023")) {
            return {
              ...element,
              ActivityName: element.ActivityName.replace("2023", ""),
            };
          } else {
            return element;
          }
        });
        setActivities(shownActivities.slice(0, 4));
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <ul className="p-0">
      <div className="row">
        {activities.map((activity, index) => (
          <li key={index} className="col-md-6">
            <ActivityCard activity={activity} />
          </li>
        ))}
      </div>
    </ul>
  );
};

export default ActivityList;
