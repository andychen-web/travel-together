import React from "react";
import { useForm } from "react-hook-form";
import OauthContainer from "./OauthContainer";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { apiLogin } from "@/api-client";
import { useTranslation } from "react-i18next";
import router from "@/router";
const LoginPage = () => {
  // 多語系
  const { t } = useTranslation();
  // 路由
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (model) => {
    const res = await apiLogin(model);
    console.log(res);
   console.log(apiLogin);
    navigate("/travel/rooms");
  };

  return (
    <main className="container pt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1>{t("login.title")}</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="email">{t("login.email")}</label>
              <input
                type="email"
                id="email"
                {...register("email", { required: true })}
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
              />
              {errors.email && (
                <span className="text-danger">{t("login.emailError")}</span>
              )}
            </div>
            <div className="form-group mb-2">
              <label htmlFor="password">{t("login.password")}</label>
              <input
                type="password"
                id="password"
                {...register("password", {
                  required: "This field is required",
                  minLength: {
                    value: 4,
                    message: t("login.passwordLengthErr", {
                      count: 4,
                    }),
                  },
                })}
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
              />
              {errors.password && (
                <span className="text-danger">{errors.password.message}</span>
              )}
            </div>
            {/* <div className="form-check">
              <input
                type="checkbox"
                id="rememberMe"
                {...register("rememberMe")}
                className="form-check-input"
              />
              <label htmlFor="rememberMe" className="form-check-label">
                {t("login.rememberMe")}
              </label>
            </div> */}
            <button type="submit" className="btn-custom-primary">
              {t("login.loginButton")}
            </button>
          </form>
          <OauthContainer t={t} />
          <div className="text-center">
            <div>
              {t("login.noAccount")}
              <Link to="/signup">{t("login.signUp")}</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
