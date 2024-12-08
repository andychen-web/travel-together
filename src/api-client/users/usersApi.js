import travelAxiosInstance from "@/api-client/axios/travelAxiosInstance";

export const usersParams = () => {
  // 查詢條件
  const usersFilter = {};

  const usersAddModel = {};
  const usersEditModel = {};
  //   TODO
  const usersRules = {};
  return {
    usersFilter,
    usersAddModel,
    usersEditModel,
  };
};

export async function getUsers(filter) {
  const url = `/users/list`;
  return travelAxiosInstance.get(url, {
    params: filter,
  });
}
export async function getUserById(id) {
  const url = `/users/${id}`;
  return travelAxiosInstance.get(url);
}

export async function blockUserById(id) {
  const url = `/users/${id}/block`;
  return travelAxiosInstance.delete(url);
}
export async function unblockUserById(id) {
  const url = `/users/${id}/unblock`;
  return travelAxiosInstance.put(url);
}
