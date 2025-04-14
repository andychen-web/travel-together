import React, { useEffect, useState } from "react";
import { apiGetTdxActivities } from "@/api-client";

import ActivityCard from "./ActivityCard";
import Card from "@/components/Card.jsx";
import Cookies from "universal-cookie";

const activityPath = window.location.pathname;

const ActivityList = ({ pathname, searchActivities }) => {
  const [recentActivities, setRecentActivities] = useState([]);
  const cookies = new Cookies();
  const token = cookies.get("tdx_token");
  const fetchActivities = async () => {
    apiGetTdxActivities({}).then((data) => {
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
      setRecentActivities(shownActivities.slice(0, 4));
    });
  };
  useEffect(() => {
    if (pathname !== activityPath && token) {
      fetchActivities();
    }
  }, [pathname, token]);
  return (
    <ul className="row">
      {/* 活動頁面 */}
      {pathname === activityPath ? (
        <>
          {searchActivities.map((item, index) => (
            <li key={index} className="col-md-3 col-6">
              <Card
                item={item}
                id={item.ActivityID}
                city={item.City}
                name={item.ActivityName}
                currentPath={window.location.pathname}
                img={item.Picture.PictureUrl1}
              />
            </li>
          ))}
        </>
      ) : (
        <>
          {/* 首頁-近期活動 */}
          {recentActivities.map((activity, index) => (
            <li key={index} className="col-md-6">
              <ActivityCard activity={activity} />
            </li>
          ))}
        </>
      )}
    </ul>
  );
};

export default ActivityList;
