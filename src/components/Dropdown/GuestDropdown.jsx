import React, { useState } from "react";
import {
  Button,
  Container,
  Grid,
  IconButton,
  Popover,
  Typography,
} from "@mui/material";
const GuestDropdown = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const openPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const [travelerCounts, setTravelerCounts] = useState({
    adults: 2,
    children: 0,
    pets: 0,
  });
  const travelerTypes = [
    { label: "成人", type: "adults" },
    { label: "孩童", type: "children" },
    { label: "寵物", type: "pets" },
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

  if (window) {
    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={openPopover}
          style={{ marginBottom: "10px" }}
        >
          人數
        </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <Container>
            {travelerTypes.map(({ label, type }) => (
              <Grid container alignItems="center" key={type} spacing={2}>
                <Grid item xs={8}>
                  <Typography>{label}</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Grid container alignItems="center">
                    <IconButton
                      color="primary"
                      onClick={() => handleDecrement(type)}
                    >
                      －
                    </IconButton>
                    <Typography>{travelerCounts[type]}</Typography>
                    <IconButton
                      color="primary"
                      onClick={() => handleIncrement(type)}
                    >
                      +
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Container>
        </Popover>
      </div>
    );
  }
  // return (
  //   <div>
  //     <button
  //       className="btn-custom-primary"
  //       onClick={(e) => {
  //         e.preventDefault();
  //         toggleGuestDropdown();
  //       }}
  //       style={{ marginBottom: "10px" }}
  //     >
  //       人數
  //     </button>
  //     {GuestDropdownOpen && (
  //       // TODO
  //       <Container
  //         className="p-3 me-5"
  //         style={{
  //           border: "1px solid #ced4da",
  //           boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  //           borderRadius: "5px",
  //         }}
  //       >
  //         {travelerTypes.map(({ label, type }) => (
  //           <Row key={type} className="mb-3 align-items-center">
  //             <Col md="8">{label}</Col>
  //             <Col md="4">
  //               <ButtonGroup className="d-flex align-items-center">
  //                 <Button
  //                   style={buttonStyle}
  //                   onClick={() => handleDecrement(type)}
  //                   disabled={travelerCounts[type] <= 0}
  //                 >
  //                   -
  //                 </Button>
  //                 <Button style={buttonStyle} disabled>
  //                   {travelerCounts[type]}
  //                 </Button>
  //                 <Button
  //                   style={buttonStyle}
  //                   onClick={() => handleIncrement(type)}
  //                 >
  //                   +
  //                 </Button>
  //               </ButtonGroup>
  //             </Col>
  //           </Row>
  //         ))}
  //         <button
  //           className="btn btn-danger"
  //           onClick={() => setGuestDropdownOpen(false)}
  //         >
  //           關閉
  //         </button>
  //       </Container>
  //     )}
  //   </div>
  // );
};
export default GuestDropdown;
