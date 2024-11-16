import React, { useState } from "react";
import ManageHotelForm from "./Form/ManageHotelForm.jsx";
import { showToast, notifyError } from "@/utilities/globalUtil";
// import { useAppContext } from "../contexts/AppContext";
const AddHotel = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async (hotelFormData) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/hotels", {
        method: "POST",
        body: hotelFormData,
      });

      if (!response.ok) {
        throw new Error("Error Saving Hotel");
      }

      showToast({ type: "OK", msg: "Hotel Saved!" });
    } catch (error) {
      notifyError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Hotel</h2>
      <ManageHotelForm onSave={handleSave} isLoading={isLoading} />
    </div>
  );
};

export default AddHotel;
