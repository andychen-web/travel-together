import React, { useState } from "react";
import ManageHotelForm from "./Form/ManageHotelForm.jsx";
import { showToast } from "@/utilities/globalUtil";
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

      showToast({ message: "Hotel Saved!", type: "SUCCESS" });
    } catch (error) {
      showToast({ message: error.message, type: "ERROR" });
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
