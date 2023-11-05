import React, { useEffect, useState } from "react";
import { getActivities } from "../../../api/apis";
import ActivityCard from "./ActivityCard";
import { routes } from "../../../utilities/routes";
import Card from "../../../components/Card.jsx";
import Cookies from "universal-cookie";

const ActivityList = ({ pathname, searchActivities }) => {
  const [recentActivities, setRecentActivities] = useState([]);
  const activityPath = routes[1].path;
  const cookies = new Cookies();
  const token = cookies.get("token");

  useEffect(() => {
    if (pathname !== activityPath && token) {
      getActivities({})
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
          setRecentActivities(shownActivities.slice(0, 4));
        })
        .catch((err) => console.log(err));
    }
  }, [pathname, token]);
  return (
    <ul className="row">
      {pathname === activityPath ? (
        <>
          {searchActivities.map((item, index) => (
            <li key={index} className="col-md-3 col-6">
              <Card
                item={item}
                id={item.ActivityID}
                city={item.City}
                name={item.ActivityName}
                dataType={"Activity"}
                img={item.Picture.PictureUrl1}
              />
            </li>
          ))}
        </>
      ) : (
        <>
          {/* // Home page route */}
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
