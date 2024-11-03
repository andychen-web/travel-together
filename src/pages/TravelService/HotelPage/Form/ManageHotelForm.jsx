import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
// import DetailsSection from "./DetailsSection";
// import TypeSection from "./TypeSection";
// import FacilitiesSection from "./FacilitiesSection";
// import GuestsSection from "./GuestsSection";
// import ImagesSection from "./ImagesSection";

const ManageHotelForm = ({ onSave, isLoading, hotel }) => {
  const formMethods = useForm();
  const { handleSubmit, reset } = formMethods;

  useEffect(() => {
    // If a hotel is provided, set it in the form
    if (hotel) {
      reset(hotel);
    }
  }, [hotel, reset]);

  const onSubmit = handleSubmit((formDataJson) => {
    const formData = new FormData();
    if (hotel) {
      formData.append("hotelId", hotel._id);
    }
    formData.append("name", formDataJson.name);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
    formData.append("description", formDataJson.description);
    formData.append("type", formDataJson.type);
    formData.append("pricePerNight", formDataJson.pricePerNight.toString());
    formData.append("starRating", formDataJson.starRating.toString());
    formData.append("adultCount", formDataJson.adultCount.toString());
    formData.append("childCount", formDataJson.childCount.toString());

    formDataJson.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });

    if (formDataJson.imageUrls) {
      formDataJson.imageUrls.forEach((url, index) => {
        formData.append(`imageUrls[${index}]`, url);
      });
    }

    Array.from(formDataJson.imageFiles).forEach((imageFile) => {
      formData.append(`imageFiles`, imageFile);
    });

    onSave(formData);
  });

  return (
    <FormProvider {...formMethods}>
      <form className="d-flex flex-column gap-3" onSubmit={onSubmit}>
        {/* <DetailsSection />
        <TypeSection />
        <FacilitiesSection />
        <GuestsSection />
        <ImagesSection />
        <div className="d-flex justify-content-end">
          <button
            disabled={isLoading}
            type="submit"
            className="btn btn-primary"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div> */}
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;
