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

export default QueryForm;
