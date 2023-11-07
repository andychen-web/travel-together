import React, { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const baseUrl = process.env.REACT_APP_CUSTOM_API;
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${baseUrl}/articles`)
      .then((res) => setArticles(res.data.articles))
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  return (
    <main className="container px-5">
      <Loader isLoading={isLoading} />
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
