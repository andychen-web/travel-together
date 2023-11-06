import React, { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const baseUrl = process.env.REACT_APP_CUSTOM_API;
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${baseUrl}/articles`)
      .then((res) => setArticles(res.data.articles))
      .catch((err) => console.log(err));
  }, []);
  return (
    <main className="container px-5">
      <h1 className="mt-3">文章列表</h1>
      <ul className="row">
        {articles?.map((article, index) => (
          <li key={index} className="col-md-6 col-12">
            <ArticleCard article={article} />
            <button
              onClick={() => navigate(`/Articles/${article.id}`)}
              className="btn btn-primary text-white"
            >
              查看更多
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default ArticleList;
