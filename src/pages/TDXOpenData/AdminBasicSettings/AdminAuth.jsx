import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import Loader from "@/components/Loader.jsx";
const AdminAuth = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const cookies = new Cookies();
  const adminToken = cookies.get("adminToken");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (adminToken) {
      navigate("/Admin/Articles");
    }
  }, [adminToken,navigate]);
  const adminSignIn = () => {
    setIsLoading(true);
    axios
      .post(`${process.env.REACT_APP_AUTH_API}/admin/signin`, {
        username: email,
        password,
      })
      .then((res) => {
        if (res.data.success) {
          authorizeAdmin(res.data.token);
        } else {
          setErrorMessage("登入失敗");
        }
      })
      .catch((err) => {
        setErrorMessage("登入失敗");
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const authorizeAdmin = (token) => {
    axios
      .post(`${process.env.REACT_APP_AUTH_API}/api/user/check`, {
        headers: { Authorization: token },
      })
      .then((res) => {
        if (res.data.success) {
          cookies.set("adminToken", token, {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
          });
          navigate("/Admin/Articles");
        }
      })
      
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    adminSignIn();
  };
  return (
    <main className="d-flex justify-content-center align-items-center">
      <Loader isLoading={isLoading} />
      <div>
        <form onSubmit={handleSubmit} autoComplete="on">
          <h2>限管理員登入</h2>
          <div className="mb-3 w-75">
            <label htmlFor="InputEmail" className="form-label">
              帳號
            </label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="InputEmail"
            />
          </div>
          <div className="mb-3 w-75">
            <label htmlFor="InputPassword" className="form-label">
              密碼
            </label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="InputPassword"
            />
          </div>
          <p className="text-danger">{errorMessage}</p>
          <button type="submit" className="btn-custom-primary">
            登入
          </button>
        </form>
      </div>
    </main>
  );
};

export default AdminAuth;
