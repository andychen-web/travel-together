import React from "react";
import { ThreeDots } from "react-loader-spinner";

import Modal from "react-bootstrap/Modal";

const Loader = ({ isLoading }) => {
  return (
    <Modal
      show={isLoading}
      id="loader-wrap"
      className="d-flex justify-content-center"
    >
      <ThreeDots
        show={true}
        height="80"
        width="80"
        radius="9"
        color="#4fa94d"
        ariaLabel="three-dots-loading"
        wrapperClass="position-relative"
        wrapperStyle={{ background: "none", top: "30vh" }}
        visible={true}
      />
    </Modal>
  );
};
export default Loader;
