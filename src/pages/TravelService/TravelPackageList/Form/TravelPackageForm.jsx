import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useParams } from "react-router-dom";
import { travelPackagesParameters } from "@/api/travel-packages/travelPackages_api";
const { travelPackagesAddModel, travelPackagesEditModel } =
  travelPackagesParameters();

const travelPackageSchema = z.object({
  name: z.string().min(1, "姓名為必填項目"),
  destination: z.string().min(1, "目的地為必填項目"),
  startDate: z.string().min(1, "開始日期為必填項目"),
  endDate: z.string().min(1, "結束日期為必填項目"),
  price: z.number().min(0, "價格必須為正數"),
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
        <label>姓名</label>
        <input {...register("name")} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <div>
        <label>目的地</label>
        <input {...register("destination")} />
        {errors.destination && <p>{errors.destination.message}</p>}
      </div>
      <div>
        <label>開始日期</label>
        <input type="date" {...register("startDate")} />
        {errors.startDate && <p>{errors.startDate.message}</p>}
      </div>
      <div>
        <label>結束日期</label>
        <input type="date" {...register("endDate")} />
        {errors.endDate && <p>{errors.endDate.message}</p>}
      </div>
      <div>
        <label>價格</label>
        <input type="number" {...register("price")} />
        {errors.price && <p>{errors.price.message}</p>}
      </div>
      <button type="submit">提交</button>
    </form>
  );
};

export default TravelPackageForm;
