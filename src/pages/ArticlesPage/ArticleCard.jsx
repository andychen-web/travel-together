import React from "react";
import noResult from "../../assets/images/icons/no-search-result.svg";
const ArticleCard = ({ article }) => {
  return (
    <div id="article">
      <div className="article_head">
        <h5 className="py-2">{article.title}</h5>
      </div>
      <div className="article_summary">
        <img
          src={article.image ? article.image : noResult}
          height="150px"
          className="w-100 object-fit-cover rounded"
          alt="article-img"
        />
        {article.tag?.map((tag, index) => (
          <button
            key={index}
            className="border bg-white border-info border-1 rounded text-info py-1 px-2 me-2 my-2"
          >
            {tag}
          </button>
        ))}
        <p>{article.description}</p>
      </div>
    </div>
  );
};

export default ArticleCard;
