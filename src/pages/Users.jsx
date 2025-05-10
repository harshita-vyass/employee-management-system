import React, { useEffect, useState, useRef } from "react";
import { apiClient } from "../api/axios";
import { formatDate } from "../utils/common";
import PageNavigator from "../components/PageNavigator";
import FilterInteraction from "../components/FilterInteraction";
import HeaderList from "../components/HeaderList";
import { ASC } from "../utils/constants";
import { Loader } from "../components/Loader";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [payload, setPayload] = useState({});
  const [loading, setLoading] = useState(true);
  const searchRef = useRef();
  const [sort, setSort] = useState({ sortBy: "", order: ASC });
  const size = 10;

  const headersList = [
    {
      title: "Name",
      keyName: "name",
      onClickFunc: true,
    },
    {
      title: "Designation",
      keyName: "",
      onClickFunc: false,
    },
    {
      title: "DOB",
      keyName: "dob",
      onClickFunc: true,
    },
    {
      title: "Department",
      keyName: "Department",
      onClickFunc: false,
    },
    {
      title: "DOJ",
      keyName: "doj",
      onClickFunc: true,
    },
    {
      title: "Manager Name",
      keyName: "managerName",
      onClickFunc: true,
    },
  ];

  useEffect(() => {
    fetchUserData(page);
    setTimeout(() => setLoading(false), 500);
  }, [page, payload, sort]);

  const fetchUserData = (page) => {
    var params = { pageRequest: { page: page - 1, size: size }, ...payload };

    if (sort.sortBy) {
      params["sort"] = sort;
    }
    if (searchRef.current.value) {
      params.search = searchRef.current.value;
    }

    apiClient
      .post("/users", params)
      .then((response) => {
        setUsers(response.items);
        setTotalPages(response.meta.totalPages);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <>
      {loading && <Loader />}
      <div className="space-y-5 pt-5 w-11/12  mx-auto">
        <FilterInteraction
          pageName={"userSearchPage"}
          functionName={fetchUserData}
          setPage={setPage}
          page={page}
          searchRef={searchRef}
          setPayload={setPayload}
        />

        <div className="overflow-x-auto whitespace-nowrap">
          <table className="w-full border-collapse">
            <HeaderList
              headersList={headersList}
              sort={sort}
              setSort={setSort}
            />
            <tbody className="text-left">
              {users && users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id}>
                    <td className="border p-2  capitalize ">{user.name}</td>
                    <td className="border p-2  !truncate">
                      {user.designation}
                    </td>
                    <td className="border p-2 ">{formatDate(user.dob)}</td>
                    <td className="border p-2 ">{user.department}</td>
                    <td className="border p-2 ">{formatDate(user.doj)}</td>
                    <td className="border p-2 ">{user.managerName}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="border p-2 text-center">
                    No Data Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <PageNavigator page={page} totalPages={totalPages} setPage={setPage} />
      </div>
    </>
  );
};

export default Users;
