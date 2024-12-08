import React, { useState } from "react";
import { Button, ButtonGroup, Container, Row, Col } from "react-bootstrap";

const GuestDropdown = () => {
  const [GuestDropdownOpen, setGuestDropdownOpen] = useState(false);
  const [travelerCounts, setTravelerCounts] = useState({
    adults: 2,
    children: 0,
    pets: 0,
  });
  const buttonStyle = {
    backgroundColor: "#ffffff",
    border: "1px solid #ced4da",
    color: "#495057",
  };
  const travelerTypes = [
    { label: "成人", key: "adults" },
    { label: "孩童", key: "children" },
    { label: "寵物", key: "pets" },
  ];
  const handleIncrement = (type) => {
    setTravelerCounts((prevCounts) => ({
      ...prevCounts,
      [type]: prevCounts[type] + 1,
    }));
  };
  const handleDecrement = (type) => {
    setTravelerCounts((prevCounts) => ({
      ...prevCounts,
      [type]: prevCounts[type] > 0 ? prevCounts[type] - 1 : 0,
    }));
  };
  const toggleGuestDropdown = () => {
    setGuestDropdownOpen(!GuestDropdownOpen);
  };
  return (
    <div>
      <button
        className="btn-custom-primary"
        onClick={(e) => {
          e.preventDefault();
          toggleGuestDropdown();
        }}
        style={{ marginBottom: "10px" }}
      >
        人數
      </button>
      {GuestDropdownOpen && (
        <Container
          className="p-3"
          style={{
            border: "1px solid #ced4da",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            borderRadius: "5px",
          }}
        >
          {travelerTypes.map(({ label, key }) => (
            <Row key={key} className="mb-3 align-items-center">
              <Col md="8">{label}</Col>
              <Col md="4">
                <ButtonGroup className="d-flex align-items-center">
                  <Button
                    style={buttonStyle}
                    onClick={() => handleDecrement(key)}
                    disabled={travelerCounts[key] <= 0}
                  >
                    -
                  </Button>
                  <Button style={buttonStyle} disabled>
                    {travelerCounts[key]}
                  </Button>
                  <Button
                    style={buttonStyle}
                    onClick={() => handleIncrement(key)}
                  >
                    +
                  </Button>
                </ButtonGroup>
              </Col>
            </Row>
          ))}
          <button
            className="btn btn-secondary"
            onClick={() => setGuestDropdownOpen(false)}
          >
            關閉
          </button>
        </Container>
      )}
    </div>
  );
};
export default GuestDropdown;
