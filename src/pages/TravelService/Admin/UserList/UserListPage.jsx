import { apiGetUsers } from "@/api-client";

import NoSearchResult from "@/components/Search/NoSearchResult.jsx";
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

export default UserListPage;
