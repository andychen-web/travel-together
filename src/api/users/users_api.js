import commonAxiosInstance from "@/api/common/commonAxiosInstance";

export const usersParameters = () => {
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
  return commonAxiosInstance.get(url, {
    params: filter,
    toastText: "使用者",
  });
}
export async function getUserById(id) {
  const url = `/users/${id}`;
  return commonAxiosInstance.get(url);
}

export async function blockUserById(id) {
  const url = `/users/${id}/block`;
  return commonAxiosInstance.delete(url);
}
export async function unblockUserById(id) {
  const url = `/users/${id}/unblock`;
  return commonAxiosInstance.put(url);
}
