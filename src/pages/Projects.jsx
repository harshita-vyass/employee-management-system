import React, { useEffect, useReducer, useRef, useState } from "react";
import { apiClient } from "../api/axios";
import { formatDate } from "../utils/common";
import { BiSort } from "react-icons/bi";
import PageNavigator from "../components/PageNavigator";

import FilterInteraction from "../components/FilterInteraction";
import { ASC } from "../utils/constants";
import HeaderList from "../components/HeaderList";

const headersList = [
  {
    width: "52",
    title: "Name",
    keyName: "name",
    onClickFunc: true,
  },
  {
    width: "32",
    title: "Business Unit",
    keyName: "",
    onClickFunc: false,
  },
  {
    width: "24",
    title: "Start Date",
    keyName: "startDate",
    onClickFunc: true,
  },
  {
    width: "24",
    title: "End Date",
    keyName: "endDate",
    onClickFunc: false,
  },
  {
    width: "40",
    title: "Client Name",
    keyName: "clientName",
    onClickFunc: true,
  },
  {
    width: "40",
    title: "Employees",
    keyName: "employeeCount",
    onClickFunc: true,
  },
];

const Projects = () => {
  const [projectList, setProjectList] = useState([]);
  const searchRef = useRef();
  const [sort, setSort] = useState({ sortBy: "", order: ASC });
  const [payload, setPayload] = useState({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const size = 5;

  useEffect(() => {
    getProjects();
  }, [page, payload, sort]);

  const getProjects = () => {
    const pageRequest = { page: page - 1, size: size };
    const search = searchRef.current.value;
    const params = { pageRequest, ...payload, search };
    if (sort.sortBy) {
      params["sort"] = sort;
    }

    apiClient
      .post("/projects", params)
      .then((response) => {
        setProjectList(response.items);
        setTotalPages(response.meta.totalPages);
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <div className="space-y-5 pt-5 w-11/12  mx-auto">
        <FilterInteraction
          pageName={"projectSearchPage"}
          functionName={getProjects}
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
            {projectList &&
              projectList.map((item) => (
                <ul
                  key={projectList.id}
                  className="border-b-2 flex w-[95%] gap-5 justify-between whitespace-nowrap text-left"
                >
                  <li className=" min-w-52">{item.name}</li>
                  <li className="min-w-32 ">{item.businessUnit}</li>
                  <li className="min-w-24">{formatDate(item.startDate)}</li>
                  <li className="min-w-24">{formatDate(item.endDate)}</li>
                  <li className="min-w-40">{item.clientName}</li>
                  <li className="min-w-40">{item.employeeCount}</li>
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

export default Projects;
