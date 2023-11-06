import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
const AdminAuth = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const cookies = new Cookies();
  const adminSignIn = () => {
    axios
      .post(`${process.env.REACT_APP_CUSTOM_API}/admin/signin`, {
        username: email,
        password,
      })
      .then((res) => {
        if (res.data.success) {
          authorizeAdmin(res.data.token);
        }
      })
      .catch((err) => {
        setErrorMessage("登入失敗");
        console.log(err);
      });
  };
  const authorizeAdmin = (token) => {
    axios
      .post(`${process.env.REACT_APP_CUSTOM_API}/api/user/check`, {
        headers: { Authorization: token },
      })
      .then((res) => {
        if (res.data.success) {
          cookies.set("adminToken", token);
          navigate("/Admin/Articles");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    adminSignIn();
  };
  return (
    <main className="d-flex justify-content-center align-items-center">
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
          <button type="submit" className="btn btn-primary text-white">
            登入
          </button>
          <p className="text-danger">{errorMessage}</p>
        </form>
      </div>
    </main>
  );
};

export default AdminAuth;
