import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ArticleCard from "../ArticlesPage/ArticleCard";
import axios from "axios";

const ArticlePage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState([]);
  const baseUrl = process.env.REACT_APP_CUSTOM_API;
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${baseUrl}/article/${id}`)
      .then((res) => {
        setArticle(res.data.article);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <main className="container px-5 mb-5">
      <ArticleCard article={article} />
      <button
        onClick={() => navigate(-1)}
        className="btn btn-primary text-white"
      >
        返回上頁
      </button>
    </main>
  );
};

export default ArticlePage;
