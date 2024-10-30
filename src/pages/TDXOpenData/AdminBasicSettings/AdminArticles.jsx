import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import Cookies from "universal-cookie";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ArticleCard from "../ArticlePage/Card/ArticleCard";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/Loader";
const baseUrl = `${process.env.REACT_APP_CUSTOM_API}/admin`;
const AdminArticles = () => {
  const [isLoading, setIsLoading] = useState(false);
  const cookies = new Cookies();
  const adminToken = cookies.get("adminToken");
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateArticleId, setUpdateArticleId] = useState("");
  const articleInitState = {
    title: "",
    description: "",
    image: "",
    tag: [""],
    create_at: Math.floor(new Date().getTime() / 1000),
    author: "",
    isPublic: false,
    content: "內容",
  };
  const [newArticle, setNewArticle] = useState(articleInitState);
  const handleInputChange = (e) => {
    setNewArticle((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const [updatedArticle, setUpdatedArticle] = useState(articleInitState);
  useEffect(() => {
    const article = articles.filter(
      (article) => article.id === updateArticleId
    );
    setUpdatedArticle(article[0]);
  }, [articles, updateArticleId]);

  const handleUpdateChange = (e) => {
    if (e.target.value === "true") {
      setUpdatedArticle((prevState) => ({
        ...prevState,
        [e.target.name]: true,
      }));
    } else if (e.target.value === "false") {
      setUpdatedArticle((prevState) => ({
        ...prevState,
        [e.target.name]: false,
      }));
    } else {
      setUpdatedArticle((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const getArticles = useCallback(() => {
    setIsLoading(true);
    axios
      .get(`${baseUrl}/articles`, { headers: { Authorization: adminToken } })
      .then((res) => {
        setArticles(res.data.articles);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, [adminToken]);
  const postArticle = () => {
    axios
      .post(
        `${baseUrl}/article`,
        {
          data: {
            title: newArticle.title,
            description: newArticle.description,
            image: newArticle.image,
            tag: newArticle.tag,
            create_at: newArticle.create_at,
            author: newArticle.author,
            isPublic: false,
            content: newArticle.content,
          },
        },
        {
          headers: {
            Authorization: adminToken,
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
          toast("成功新增", { autoClose: 2000 });
          setShowAddModal(false);
          getArticles();
          setNewArticle(articleInitState);
        } else {
          toast("操作失敗", { autoClose: 2000 });
        }
      })
      .catch((err) => {
        console.log(err);
        toast("操作失敗", { autoClose: 2000 });
      });
  };
  const putArticle = () => {
    axios
      .put(
        `${baseUrl}/article/${updateArticleId}`,
        {
          data: {
            title: updatedArticle.title,
            description: updatedArticle.description,
            image: updatedArticle.image,
            tag: updatedArticle.tag,
            create_at: updatedArticle.create_at,
            author: updatedArticle.author,
            isPublic: updatedArticle.isPublic,
            content: "content",
          },
        },
        {
          headers: { Authorization: adminToken },
        }
      )
      .then((res) => {
        if (res.data.success) {
          getArticles();
          toast("成功更新", { autoClose: 2000 });
          setShowUpdateModal(false);
          setNewArticle(articleInitState);
        } else {
          toast("操作失敗", { autoClose: 2000 });
        }
      })
      .catch((err) => {
        toast("操作失敗", { autoClose: 2000 });
        console.log(err);
      });
  };

  const deleteArticle = (articleId) => {
    axios
      .delete(`${baseUrl}/article/${articleId}`, {
        headers: { Authorization: adminToken },
      })
      .then((res) => {
        if (res.data.success) {
          getArticles();
          toast("成功刪除", { autoClose: 2000 });
        } else {
          toast("操作失敗", { autoClose: 2000 });
        }
      })
      .catch((err) => {
        toast("操作失敗", { autoClose: 2000 });
        console.log(err);
      });
  };
  useEffect(() => {
    if (adminToken) {
      getArticles();
    } else {
      navigate("/Admin/Auth");
    }
  }, [adminToken, navigate, getArticles]);

  return (
    <main className="container">
      <Loader isLoading={isLoading} />
      <ToastContainer />
      <div className="pt-2">
        <h1>文章管理</h1>
        <button
          className="btn-custom-primary"
          onClick={() => setShowAddModal(true)}
        >
          新增文章
        </button>
      </div>
      <Modal show={showAddModal}>
        <Modal.Header>
          <Modal.Title>新增文章</Modal.Title>
          <button
            className="btn-close"
            onClick={() => setShowAddModal(false)}
          />
        </Modal.Header>
        <Modal.Body>
          <Modal.Body>
            <div>
              <label className="pe-5" htmlFor="newArticle-title">
                標題
              </label>
              <input
                type="text"
                id="newArticle-title"
                name="title"
                value={newArticle.title}
                onChange={handleInputChange}
              />
            </div>

            <div className="pt-2">
              <label className="pe-3" htmlFor="newArticle-image">
                圖片網址
              </label>
              <input
                type="text"
                id="newArticle-image"
                name="image"
                value={newArticle.image}
                onChange={handleInputChange}
              />
            </div>

            <div className="pt-2">
              <label className="pe-5" htmlFor="newArticle-tag">
                標籤
              </label>
              <input
                type="text"
                id="newArticle-tag"
                name="tag"
                placeholder="tag1,tag2"
                value={newArticle.tag.join(",")}
                onChange={(e) =>
                  setNewArticle({
                    ...newArticle,
                    tag: e.target.value.split(","),
                  })
                }
              />
            </div>

            <div className="pt-2">
              <label className="pe-5" htmlFor="newArticle-author">
                作者
              </label>
              <input
                type="text"
                id="newArticle-author"
                name="author"
                value={newArticle.author}
                onChange={handleInputChange}
              />
            </div>

            <div className="pt-2">
              <label className="pe-3" htmlFor="newArticle-isPublic">
                是否公開
              </label>

              <select
                id="newArticle-isPublic"
                name="isPublic"
                value={newArticle.isPublic}
                onChange={handleInputChange}
              >
                <option value={true}>是</option>
                <option value={false}>否</option>
              </select>
            </div>

            <div className="d-flex pt-2">
              <div>
                <label
                  className="pe-5 position-relative top-0"
                  htmlFor="newArticle-description"
                >
                  內容
                </label>
              </div>
              <div>
                <textarea
                  id="newArticle-description"
                  name="description"
                  rows="5"
                  cols="25"
                  value={newArticle.description}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </Modal.Body>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn-custom-primary"
            onClick={() => postArticle()}
          >
            確認新增
          </button>
        </Modal.Footer>
      </Modal>
      {/* 更新文章 */}
      <Modal show={showUpdateModal}>
        <Modal.Header>
          <Modal.Title>更新文章</Modal.Title>
          <button
            className="btn-close"
            onClick={() => setShowUpdateModal(false)}
          />
        </Modal.Header>
        <Modal.Body>
          <Modal.Body>
            <div>
              <label className="pe-5" htmlFor="updatedArticle-title">
                標題
              </label>
              <input
                type="text"
                id="updatedArticle-title"
                name="title"
                value={updatedArticle?.title || ""}
                onChange={handleUpdateChange}
              />
            </div>

            <div className="pt-2">
              <label className="pe-3" htmlFor="updatedArticle-image">
                圖片網址
              </label>
              <input
                type="text"
                id="updatedArticle-image"
                name="image"
                value={updatedArticle?.image || ""}
                onChange={handleUpdateChange}
              />
            </div>

            <div className="pt-2">
              <label className="pe-5" htmlFor="updatedArticle-tag">
                標籤
              </label>
              <input
                type="text"
                id="updatedArticle-tag"
                name="tag"
                placeholder="tag1,tag2"
                value={updatedArticle?.tag.join(",") || ""}
                onChange={(e) =>
                  setUpdatedArticle({
                    ...updatedArticle,
                    tag: e.target.value.split(","),
                  })
                }
              />
            </div>

            <div className="pt-2">
              <label className="pe-5" htmlFor="updatedArticle-author">
                作者
              </label>
              <input
                type="text"
                id="updatedArticle-author"
                name="author"
                value={updatedArticle?.author || ""}
                onChange={handleUpdateChange}
              />
            </div>

            <div className="pt-2">
              <label className="pe-3" htmlFor="updatedArticle-isPublic">
                是否公開
              </label>
              <select
                id="updatedArticle-isPublic"
                name="isPublic"
                value={updatedArticle?.isPublic || false}
                onChange={handleUpdateChange}
              >
                <option value={true}>是</option>
                <option value={false}>否</option>
              </select>
            </div>

            <div className="d-flex pt-2">
              <div>
                <label
                  className="pe-5 position-relative top-0"
                  htmlFor="updatedArticle-description"
                >
                  內容
                </label>
              </div>
              <div>
                <textarea
                  id="updatedArticle-description"
                  name="description"
                  rows="5"
                  cols="25"
                  value={updatedArticle?.description || ""}
                  onChange={handleUpdateChange}
                />
              </div>
            </div>
          </Modal.Body>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn-custom-primary"
            onClick={() => putArticle()}
          >
            確認更新
          </button>
        </Modal.Footer>
      </Modal>

      <ul className="row mt-2">
        {articles?.map((article, index) => (
          <li
            key={index}
            className="border border-1 col-md-6 col-12 article-height d-flex flex-column justify-content-between"
          >
            <ArticleCard article={article} />
            <div className="mb-2">
              <div>公開狀態: {article.isPublic ? "公開" : "不公開"}</div>
              <button
                className="btn btn-info text-white me-2"
                onClick={() => {
                  setUpdateArticleId(article.id);
                  setShowUpdateModal(true);
                }}
              >
                更新
              </button>
              <button
                className="btn btn-warning text-white"
                onClick={() => deleteArticle(article.id)}
              >
                刪除
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default AdminArticles;
