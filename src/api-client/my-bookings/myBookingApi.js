import travelAxiosInstance from "@/api-client/axios/travelAxiosInstance";

export const myBookingParams = () => {
  // 查詢條件
  const myBookingFilter = { userId: "" };

  return {
    myBookingFilter,
  };
};

export async function getUserBookings(filter) {
  const url = `/my-bookings`;
  return travelAxiosInstance.get(url, {
    params: filter,
    withCredentials: true,
  });
}