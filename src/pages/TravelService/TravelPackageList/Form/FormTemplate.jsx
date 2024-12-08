import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useParams } from "react-router-dom";
import { travelPackagesParams } from "@/api-client/travel-packages/travelPackages_api";
const { travelPackagesAddModel, travelPackagesEditModel } =
  travelPackagesParams();

const travelPackageSchema = z.object({
  name: z.string().min(1, "Name is required"),
  destination: z.string().min(1, "Destination is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  price: z.number().min(0, "Price must be a positive number"),
});

const TravelPackageForm = ({ onSubmit }) => {
  const { id } = useParams();
  const isAddMode = !id; // 有id 則為編輯模式，沒有則為新增模式

  const formModel = isAddMode
    ? travelPackagesAddModel
    : travelPackagesEditModel;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(travelPackageSchema),
    formModel,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name</label>
        <input {...register("name")} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <div>
        <label>Destination</label>
        <input {...register("destination")} />
        {errors.destination && <p>{errors.destination.message}</p>}
      </div>
      <div>
        <label>Start Date</label>
        <input type="date" {...register("startDate")} />
        {errors.startDate && <p>{errors.startDate.message}</p>}
      </div>
      <div>
        <label>End Date</label>
        <input type="date" {...register("endDate")} />
        {errors.endDate && <p>{errors.endDate.message}</p>}
      </div>
      <div>
        <label>Price</label>
        <input type="number" {...register("price")} />
        {errors.price && <p>{errors.price.message}</p>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default TravelPackageForm;
