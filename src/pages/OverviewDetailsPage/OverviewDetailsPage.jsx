import React, { useState, useEffect } from "react";
import MyBreadCrumb from "../../components/MyBreadCrumb.jsx";
import { useParams } from "react-router-dom";
import Carousel from "../HomePage/Carousel/Carousel.jsx";
import OverviewTitle from "../../components/OverviewDetails/OverviewTitle.jsx";
import OverviewDescription from "../../components/OverviewDetails/OverviewDescription.jsx";
import OverviewDetails from "../../components/OverviewDetails/OverviewDetails.jsx";
import GoogleMap from "../../components/OverviewDetails/GoogleMap.jsx";
import Card from "../../components/Card.jsx";
import useQueryParams from "../../hooks/useQueryParams.jsx";
import { routes } from "../../utilities/routes";
import { getScenicSpots, getActivities, getRestaurants } from "../../api/apis";
const OverviewDetailsPage = () => {
  const { id } = useParams();
  const { pathname } = useQueryParams();

  const currentRoute = "/" + pathname.split("/")[1];
  const matchingRoute = routes.filter((route) => route.path === currentRoute);
  const routeName = matchingRoute[0].name;

  const [overview, setOverview] = useState({});
  const [suggestList, setSuggestList] = useState([]);

  const {
    City,
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
  } = overview;
  useEffect(() => {
    if (currentRoute === "/ScenicSpot") {
      getScenicSpots({ getById: id }).then((data) => setOverview(data[0]));
      // get spots from same city (1/3)  setSuggestList(data)
      getScenicSpots({ city: City }).then((data) => setSuggestList(data));
    }
    if (currentRoute === "/Activity") {
      getActivities({ getById: id }).then((data) => setOverview(data[0]));
    }
    if (currentRoute === "/Restaurant") {
      getRestaurants({ getById: id }).then((data) => setOverview(data[0]));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const overviewClassList = [
    overview?.Class1,
    overview?.Class2,
    overview?.Class,
  ].filter(Boolean);
  const overviewName =
    overview.ActivityName || overview.RestaurantName || overview.ScenicSpotName;

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
        />
        <GoogleMap />
      </div>
      <h2 className="suggestions-title mt-3">還有這些不能錯過</h2>
      <ul className="d-flex">
        {suggestList?.map((item, index) => (
          <Card key={index} />
        ))}
      </ul>
    </main>
  ) : (
    <></>
  );
};

export default OverviewDetailsPage;
