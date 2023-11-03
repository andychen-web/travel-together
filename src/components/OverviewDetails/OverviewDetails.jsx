import React from "react";
const DetailItem = ({ label, content }) => {
  return (
    content && (
      <div>
        {label}: {content}
      </div>
    )
  );
};
const DetailLink = ({ label, link }) => {
  return (
    link && (
      <div>
        <span>{label}: </span>
        <a href={link} target="_blank" rel="noReferrer">
          {link}
        </a>
      </div>
    )
  );
};
const OverviewDetails = ({
  currentRoute,
  timeDuration,
  phone,
  address,
  websiteUrl,
  remarks,
  ticketInfo,
  overviewName,
}) => {
  return (
    <div className="lh-lg me-5 details-wrap">
      {currentRoute === "/Activity" ? (
        <div className="d-flex flex-column bg-light p-3 rounded">
          <DetailItem label="活動時間" content={timeDuration} />
          <DetailItem label="聯絡電話" content={phone} />
          <div>
            <span>活動地點: </span>
            <a
              href={`https://www.google.com/maps/search/${overviewName}`}
              target="_blank"
              rel="noReferrer"
            >
              {address}
            </a>
          </div>
          <DetailLink label="官方網站" link={websiteUrl} />
          <DetailItem label="活動費用" content={ticketInfo} />
          <DetailItem label="注意事項" content={remarks} />
        </div>
      ) : (
        <></>
      )}
      {currentRoute === "/ScenicSpot" ? (
        <div className="d-flex flex-column bg-light p-3 rounded">
          <DetailItem label="開放時間" content={timeDuration} />
          <DetailItem label="服務電話" content={phone} />
          {address && (
            <div>
              <span>景點地址: </span>
              <a
                href={`https://www.google.com/maps/search/${overviewName}`}
                target="_blank"
                rel="noReferrer"
              >
                {address}
              </a>
            </div>
          )}
          <DetailLink label="官方網站" link={websiteUrl} />
          <DetailItem label="票價資訊" content={ticketInfo} />
          <DetailItem label="注意事項" content={remarks} />
        </div>
      ) : (
        <></>
      )}
      {currentRoute === "/Restaurant" ? (
        <div className="d-flex flex-column bg-light p-3 rounded">
          <DetailItem label="營業時間" content={timeDuration} />
          <DetailItem label="聯絡電話" content={phone} />
          <div>
            <span>餐廳地址: </span>
            <a
              href={`https://www.google.com/maps/search/${overviewName}`}
              target="_blank"
              rel="noReferrer"
            >
              {address}
            </a>
          </div>
          <DetailLink label="官方網站" link={websiteUrl} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default OverviewDetails;
