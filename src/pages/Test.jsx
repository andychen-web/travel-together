import React, { useState, useEffect, useCallback } from "react";

// TODO
// 1. refer to senior's code to upd (30mins) for list fetch
// 2. create form+table+pagination+hooks+imports template all in one page before actually separate
// 2. save diff component templates in hackmd

import {
  apiGetUsers,
  apiBlockUserById,
  apiUnblockUserById,
} from "@/api";

import NoSearchResult from "@/components/Search/NoSearchResult.jsx";
import Pagination from "@/components/Pagination/Pagination.jsx";

const QueryForm = ({ query, setQuery, fetchList }) => {
  // 處理查詢條件變更
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuery({
      ...query,
      [name]: value,
    });
  };

  const handleSearch = async () => {
    await fetchList();
  };

  return (
    <form className="mb-3 container">
      <div className="row">
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="姓名"
            name="name"
            value={query.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="col">
          <input
            type="email"
            className="form-control"
            placeholder="電子郵件"
            name="email"
            value={query.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="col">
          <button
            className="btn-custom-primary"
            type="button"
            onClick={handleSearch}
          >
            查詢
          </button>
        </div>
      </div>
    </form>
  );
};

// Feat: 停用(toggle)、開窗編輯(toggle)
const TableList = ({ users, fetchList }) => {
  // 篩選用戶列表
  const sortedUsers = users.data.filter((user) => {
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
          {sortedUsers.map((user) => (
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
// export default TableList;

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  // 設置查詢條件的狀態
  const [query, setQuery] = useState({
    name: undefined,
    email: undefined,
    isBlocked: false,
  });
  // snippet: uchList
  const fetchUsers = useCallback(async () => {
    const res = await apiGetUsers(query);
    setUsers(res);
  }, [query]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div>
      <QueryForm query={query} setQuery={setQuery} fetchList={fetchUsers} />
      {users.length === 0 || users.data.length === 0 ? (
        <NoSearchResult />
      ) : (
        <TableList users={users} fetchList={fetchUsers} />
      )}
    </div>
  );
};

// export default UserListPage

const Test = () => {
  return (
    <div>
      <UserListPage />
    </div>
  );
};

export default Test;
