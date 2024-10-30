import React, { useEffect, useState } from "react";
import ArticleCard from "../ArticlePage/Card/ArticleCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/Loader";
import Pagination from "@/components/Pagination/Pagination";
import { useParams } from "react-router-dom";

const baseUrl = process.env.REACT_APP_CUSTOM_API;
const getArticles = () => {
  axios.get(`${baseUrl}/articles`);
};
const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [paginationData, setPaginationData] = useState({});
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${baseUrl}/articles`)
      .then((res) => {
        setPaginationData(res.data.pagination);
        setArticles(res.data.articles);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  const { page } = useParams();
  useEffect(() => {
    // TODO
    console.log("page", page);
  }, [page]);

  return (
    <main className="container px-5 pt-4">
      <Loader isLoading={isLoading} />
      <h1 className="mt-3">文章列表</h1>
      <ul className="row">
        {articles?.map((article, index) => (
          <li key={index} className="col-md-6 col-12">
            <ArticleCard article={article} />
            <button
              onClick={() => navigate(`/Articles/${article.id}`)}
              className="btn-custom-primary"
            >
              查看更多
            </button>
          </li>
        ))}
      </ul>
      <Pagination paginationData={paginationData} />
    </main>
  );
};

export default ArticleList;
