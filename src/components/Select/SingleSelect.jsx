import React from "react";
import { CITIES } from "@/utilities/data";
import { InputLabel, FormControl, NativeSelect } from "@mui/material";
const SingleSelect = ({ label, options, val, setVal }) => {
  // TODO setVal
  let optionsData = [];
  if (options.type === "twCities") {
    optionsData = CITIES;
  } else {
    optionsData = options.data;
  }
  return (
    <FormControl>
      <InputLabel variant="standard" htmlFor="uncontrolled-native">
        {label}
      </InputLabel>
      <NativeSelect
        defaultValue={val || ""}
        inputProps={{
          name: "age",
          id: "uncontrolled-native",
        }}
      >
        {optionsData.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};

export default SingleSelect;
