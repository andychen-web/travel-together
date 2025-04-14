import {
  apiBlockUserById,
  apiUnblockUserById,
} from "@/api-client";
import Pagination from "@/components/Pagination/Pagination.jsx";
const TableList = ({ users, fetchList }) => {
  // 篩選用戶列表
  const filteredUsers = users.data.filter((user) => {
    return user;
  });

  // const editUser = (user) => {
  //   console.log(user);
  // };
  const blockUser = async (user) => {
    const res = await apiBlockUserById(user._id);
    if (res.success) {
      fetchList();
    }
  };
  const unblockUser = async (user) => {
    const res = await apiUnblockUserById(user._id);
    if (res.success) {
      fetchList();
    }
  };

  return (
    <div className="container">
      <table className="table table-striped border">
        <thead>
          <tr>
            <th>姓名</th>
            <th>電子郵件</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user._id}>
              <td>{`${user.firstName} ${user.lastName}`}</td>
              <td>{user.email}</td>
              <td>
                {/* <button
                  className="btn-custom-primary me-1"
                  onClick={() => editUser(user)}
                >
                  編輯
                </button> */}
                {user.isBlocked ? (
                  <button
                    className="btn-custom-primary"
                    onClick={() => unblockUser(user)}
                  >
                    啟用
                  </button>
                ) : (
                  <button
                    className="btn btn-danger me-1"
                    onClick={() => blockUser(user)}
                  >
                    停用
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        paginationDetails={users.pagination}
        paginationStyle="basic"
      />
    </div>
  );
};
export default TableList;
