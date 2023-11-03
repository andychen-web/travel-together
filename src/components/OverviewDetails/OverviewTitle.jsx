import React from "react";

const OverviewTitle = ({ overviewName, overviewClassList }) => {
  return (
    <div>
      <h1>{overviewName}</h1>
      <ul className="d-flex">
        {overviewClassList?.map((className, index) => (
          <li
            key={index}
            className="border border-info border-1 rounded text-info py-1 px-2 me-2"
          >
            #{className}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OverviewTitle;
