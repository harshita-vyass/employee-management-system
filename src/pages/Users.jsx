import React, { useEffect, useState, useRef } from "react";
import { apiClient } from "../api/axios";
import { formatDate } from "../utils/common";
import PageNavigator from "../components/PageNavigator";
import FilterInteraction from "../components/FilterInteraction";
import HeaderList from "../components/HeaderList";
import { ASC } from "../utils/constants";
import {Loader} from "../components/Loader";

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
      width: "40",
      title: "Name",
      keyName: "name",
      onClickFunc: true,
    },
    {
      width: "40",
      title: "Designation",
      keyName: "",
      onClickFunc: false,
    },
    {
      width: "24",
      title: "DOB",
      keyName: "dob",
      onClickFunc: true,
    },
    {
      width: "40",
      title: "Department",
      keyName: "Department",
      onClickFunc: false,
    },
    {
      width: "24",
      title: "DOJ",
      keyName: "doj",
      onClickFunc: true,
    },
    {
      width: "40",
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
    console.log("sort", sort);
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
    {loading && <Loader /> }
      <div className="space-y-5 pt-5 w-11/12  mx-auto">
        <FilterInteraction
          pageName={"userSearchPage"}
          functionName={fetchUserData}
          setPage={setPage}
          page={page}
          searchRef={searchRef}
          setPayload={setPayload}
        />
        <div>
          <div className="table-fixed text-black space-y-4">
            <HeaderList
              headersList={headersList}
              sort={sort}
              setSort={setSort}
            />
            {users &&
              users.map((user) => (
                <ul
                  key={user.id}
                  className="border-b-2 flex w-[95%] gap-5 justify-between whitespace-nowrap text-left"
                >
                  <li className="capitalize max-w-40 min-w-40">{user.name}</li>
                  <li className="max-w-40 min-w-40 !truncate">
                    {user.designation}
                  </li>
                  <li className="max-w-24 min-w-24">{formatDate(user.dob)}</li>
                  <li className="max-w-40 min-w-40">{user.department}</li>
                  <li className="max-w-24 min-w-24">{formatDate(user.doj)}</li>
                  <li className="max-w-40 min-w-40">{user.managerName}</li>
                </ul>
              ))}
          </div>
          <PageNavigator
            page={page}
            totalPages={totalPages}
            setPage={setPage}
          />
        </div>
      </div>
    </>
  );
};

export default Users;
