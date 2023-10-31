import React from "react";
import pointer from "../../../assets/images/icons/pointer-yellow.svg";

const Title = () => {
  return (
    <>
      {/* md-lg screen */}
      <h1 className="d-none d-md-block">
        探索台灣之美
        <br />
        讓我們更親近這片土地
      </h1>
      {/* sm screen */}
      <h4 className="py-1 d-block d-md-none">
        探索台灣之美
        <br />
        讓我們更親近這片土地
      </h4>

      <div className=" pb-3">
        <div>
          <img src={pointer} alt="pointer" />
          台灣旅遊景點導覽
        </div>
        <div className="ps-4">Taiwan Travel Guide</div>
      </div>
    </>
  );
};

export default Title;
