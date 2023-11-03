import React, { useState, useEffect } from "react";
import MyBreadCrumb from "../../components/MyBreadCrumb.jsx";
import { useParams } from "react-router-dom";
import Carousel from "../HomePage/Carousel/Carousel.jsx";
import OverviewTitle from "../../components/OverviewDetails/OverviewTitle.jsx";
import OverviewDescription from "../../components/OverviewDetails/OverviewDescription.jsx";
import OverviewDetails from "../../components/OverviewDetails/OverviewDetails.jsx";
import MyGoogleMap from "../../components/OverviewDetails/MyGoogleMap.jsx";
import Card from "../../components/Card.jsx";
import useQueryParams from "../../hooks/useQueryParams.jsx";
import { routes } from "../../utilities/routes";
import {
  getScenicSpots,
  getActivities,
  getRestaurants,
  getSuggestions,
} from "../../api/apis";
import { CITIES } from "../../utilities/const";
const OverviewDetailsPage = () => {
  const { id } = useParams();
  const { pathname } = useQueryParams();

  const currentRoute = "/" + pathname.split("/")[1];
  const dataType = pathname.split("/")[1];
  const matchingRoute = routes.filter((route) => route.path === currentRoute);
  const routeName = matchingRoute[0].name;

  const [overview, setOverview] = useState({});
  const [suggestList, setSuggestList] = useState([]);
  const getCityValue = (cityLabel) => {
    const cityValue = CITIES.filter((city) => city.label === cityLabel)[0]
      .value;
    return cityValue;
  };
  const {
    City = "",
    Description,
    StartTime,
    EndTime,
    Location,
    Remarks,
    Phone,
    Organizer,
    Address,
    WebsiteUrl,
    Picture,
    Position,
    TicketInfo,
  } = overview || {};

  useEffect(() => {
    if (currentRoute === "/ScenicSpot") {
      getScenicSpots({ id }).then((data) => {
        setOverview(data[0]);
      });
      if (City) {
        getSuggestions({ id, dataType, city: getCityValue(City) }).then(
          (data) => {
            setSuggestList(data.slice(0, 4));
          }
        );
      }
    }
    if (currentRoute === "/Activity") {
      getActivities({ id }).then((data) => {
        setOverview(data[0]);
      });
      if (City) {
        getSuggestions({ id, dataType, city: getCityValue(City) }).then(
          (data) => {
            setSuggestList(data.slice(0, 4));
          }
        );
      }
    }
    if (currentRoute === "/Restaurant") {
      getRestaurants({ id }).then((data) => {
        setOverview(data[0]);
      });
      if (City) {
        getSuggestions({ id, dataType, city: getCityValue(City) }).then(
          (data) => {
            setSuggestList(data.slice(0, 4));
          }
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, overview?.City]);
  const overviewClassList = [
    overview?.Class1,
    overview?.Class2,
    overview?.Class,
  ].filter(Boolean);
  const overviewName =
    overview?.ActivityName ||
    overview?.RestaurantName ||
    overview?.ScenicSpotName;

  const timeDuration =
    StartTime && StartTime.slice(0, 10) + " - " + EndTime.slice(0, 10);
  return overview ? (
    <main className="container">
      <MyBreadCrumb routes={[routeName, overviewName]} />
      <Carousel overviewPictures={Picture} />
      <OverviewTitle
        overviewName={overviewName}
        overviewClassList={overviewClassList}
      />
      <OverviewDescription description={Description} />
      <div className="d-flex flex-wrap flex-md-nowrap">
        <OverviewDetails
          currentRoute={currentRoute}
          location={Location}
          remarks={Remarks}
          phone={Phone}
          organizer={Organizer}
          address={Address}
          websiteUrl={WebsiteUrl}
          position={Position}
          timeDuration={timeDuration}
          ticketInfo={TicketInfo}
          overviewName={overviewName}
        />
        <MyGoogleMap position={Position} />
      </div>
      <h2 className="suggestions-title mt-3">還有這些不能錯過</h2>
      <ul className="row">
        {suggestList?.map((item, index) => (
          <li key={index} className="col-md-3 col-6">
            <Card
              item={item}
              id={item.ActivityID || item.ScenicSpotID || item.RestaurantID}
              city={item.City}
              name={
                item.ActivityName || item.ScenicSpotName || item.RestaurantName
              }
              dataType={dataType}
              img={item.Picture.PictureUrl1}
            />
          </li>
        ))}
      </ul>
    </main>
  ) : (
    <></>
  );
};

export default OverviewDetailsPage;
