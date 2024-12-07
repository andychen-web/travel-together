import React, { useEffect, useState } from "react";
import { apiGetHotels, apiHotelParams } from "@/api";
import { updateLoadingArrayState } from "@/utilities/globalUtil";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Button, ButtonGroup, Container, Row, Col } from "react-bootstrap";

const TravelerButtons = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
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
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  return (
    <div>
      <Button onClick={toggleDropdown} style={{ marginBottom: "10px" }}>
        人數
      </Button>
      {dropdownOpen && (
        <Container
          className="p-3"
          style={{
            border: "1px solid #ced4da",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            borderRadius: "5px",
          }}
        >
          <Row className="justify-content-end">
            <Button variant="light" onClick={() => setDropdownOpen(false)}>
              &times;
            </Button>
          </Row>
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
        </Container>
      )}
    </div>
  );
};
// export default TravelerButtons;

const FilterHotelsForm = ({ setHotels, setIsLoadingArray }) => {
  const [hotelsFilter, setHotelsFilter] = useState(
    apiHotelParams().hotelsFilter
  );
  const [checkIn, setCheckIn] = useState(hotelsFilter.checkIn);
  const [checkOut, setCheckOut] = useState(hotelsFilter.checkOut);
  const minDate = new Date();
  const maxDate = new Date();

  const fetchData = async () => {
    const data = await apiGetHotels(hotelsFilter);
    setHotels(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 處理多個loading中其中一個的狀態
    updateLoadingArrayState(setIsLoadingArray, 0, true);
    await fetchData();
    updateLoadingArrayState(setIsLoadingArray, 0, false);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="cityCode">地點</label>
          {/* // TODO */}
          <select
            className="form-select"
            id="cityCode"
            value={hotelsFilter.cityCode}
            onChange={(e) =>
              setHotelsFilter({ ...hotelsFilter, cityCode: e.target.value })
            }
          >
            {/*  */}
          </select>
          <DatePicker
            placeholderText="入住"
            selected={checkIn}
            selectsStart
            onChange={(date) => setCheckIn(date)}
            startDate={checkIn}
            endDate={checkOut}
            minDate={minDate}
            maxDate={maxDate}
            className="min-w-full bg-white p-2 focus:outline-none"
            wrapperClassName="min-w-full"
          />
          <DatePicker
            placeholderText="退房"
            selected={checkOut}
            selectsStart
            onChange={(date) => setCheckOut(date)}
            startDate={checkIn}
            endDate={checkOut}
            minDate={minDate}
            maxDate={maxDate}
            className="min-w-full bg-white p-2 focus:outline-none"
            wrapperClassName="min-w-full"
          />

          <TravelerButtons></TravelerButtons>
        </div>
        <button className="btn-custom-primary" type="submit">
          查詢
        </button>
      </form>
    </div>
  );
};

export default FilterHotelsForm;
