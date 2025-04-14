import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ArticleCard from "./Card/ArticleCard.jsx";
import axios from "axios";

const baseUrl = import.meta.env.REACT_APP_CUSTOM_API;

const ArticlePage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    function getArticle() {
      axios.get(`${baseUrl}/article/${id}`).then((res) => {
        setArticle(res.data.article);
      });
    }
    getArticle();
  }, [id]);
  return (
    <main className="container px-5 mb-5">
      <ArticleCard article={article} />
      <button
        onClick={() => navigate(-1)}
        className="btn-custom-primary"
      >
        返回上頁
      </button>
    </main>
  );
};

export default ArticlePage;
