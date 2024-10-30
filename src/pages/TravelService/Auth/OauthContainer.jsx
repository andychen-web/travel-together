// OauthContainer.jsx
import React from "react";

const OauthContainer = ({ t }) => {
  return (
    <div className="my-4 text-center">
      <p>{t("login.oauthTitle")}</p>
      <div>
        <button className="btn-custom-primary me-2">Google</button>
      </div>
    </div>
  );
};

export default OauthContainer;
