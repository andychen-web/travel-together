import React, { useState, useEffect, useContext } from "react";
import MyBreadCrumb from "@/components/MyBreadCrumb.jsx";
import { useParams } from "react-router-dom";
import Carousel from "../HomePage/Carousel/Carousel.jsx";
import OverviewTitle from "@/components/OverviewDetails/OverviewTitle.jsx";
import OverviewDescription from "@/components/OverviewDetails/OverviewDescription.jsx";
import OverviewDetails from "@/components/OverviewDetails/OverviewDetails.jsx";
import MyGoogleMap from "@/components/OverviewDetails/MyGoogleMap.jsx";
import Card from "@/components/Card.jsx";
import {
  apiGetTdxActivities,
  apiGetTdxRestaurants,
  apiGetTdxSuggestions,
  apiGetTdxScenicSpots,
} from "@/api";
import { CITIES } from "../../../utilities/data.js";
import { NavContext } from "@/context/NavContext";
const OverviewDetailsPage = () => {
  const { id } = useParams(); // 取得 URL 中的 id 參數

  // 取得目前路徑和資料類型
  const pathname = window.location.pathname;
  const currentRoute = pathname;
  const dataType = pathname.split("/")[2];
  const { navLinks } = useContext(NavContext);
  // 根據路徑找到對應的路由名稱
  // 取路由
  const newPath = pathname.substring(0, pathname.lastIndexOf("/"));
  const matchingRoute = navLinks.find((route) => (route.key = newPath));
  const routeName = matchingRoute.name;

  // 定義狀態變數
  const [overview, setOverview] = useState({});
  const [suggestList, setSuggestList] = useState([]);

  // 根據城市標籤取得城市值
  const getCityValue = (cityLabel) => {
    const cityValue =
      CITIES.find((city) => city.label === cityLabel)?.value || "";
    return cityValue;
  };

  // 效果函式用來根據路由和ID取得詳細資料和建議
  useEffect(() => {
    // 取得詳細資料和建議
    const fetchData = async () => {
      try {
        switch (dataType) {
          case "ScenicSpot":
            const scenicSpotData = await apiGetTdxScenicSpots({ id });
            setOverview(scenicSpotData[0]);
            break;
          case "Activity":
            const activityData = await apiGetTdxActivities({ id });
            setOverview(activityData[0]);
            break;
          case "Restaurant":
            const restaurantData = await apiGetTdxRestaurants({ id });
            setOverview(restaurantData[0]);
            break;
          default:
            return;
        }

        // 如果詳細資料中有 City，則取得建議
        if (overview.City) {
          const cityValue = getCityValue(overview.City);
          const suggestions = await apiGetTdxSuggestions({
            id,
            dataType,
            city: cityValue,
            top: 4,
          });
          setSuggestList(suggestions);
        }
      } catch (error) {
        console.error("取得資料時發生錯誤:", error);
      }
    };

    fetchData();
  }, [id, overview?.City]); // 只有在 id 或 overview.City 改變時才重新執行效果

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
    overview.StartTime &&
    `${overview.StartTime.slice(0, 10)} - ${overview.EndTime.slice(0, 10)}`;

  return Object.keys(overview).length > 0 ? (
    <main className="container">
      <MyBreadCrumb routes={[routeName, overviewName]} />
      <Carousel overviewPictures={overview.Picture} />
      <OverviewTitle
        overviewName={overviewName}
        overviewClassList={overviewClassList}
      />
      <OverviewDescription description={overview.Description} />
      <div className="d-flex flex-wrap flex-md-nowrap">
        <OverviewDetails
          currentRoute={currentRoute}
          location={overview.Location}
          remarks={overview.Remarks}
          phone={overview.Phone}
          organizer={overview.Organizer}
          address={overview.Address}
          websiteUrl={overview.WebsiteUrl}
          position={overview.Position}
          timeDuration={timeDuration}
          ticketInfo={overview.TicketInfo}
          overviewName={overviewName}
        />
        <MyGoogleMap position={overview.Position} />
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
              currentPath={window.location.pathname}
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
