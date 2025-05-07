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
        <div className="overflow-x-auto whitespace-nowrap">
          <table className=" text-black  w-full border-collapse">
            <HeaderList
              headersList={headersList}
              sort={sort}
              setSort={setSort}
            />
            {projectList &&
              projectList.map((item) => (
                <tbody
                  key={projectList.id}
                  className="text-left"
                >
                  <tr>
                    <td className="border p-2">{item.name}</td>
                    <td className="border p-2">{item.businessUnit}</td>
                    <td className="border p-2">{formatDate(item.startDate)}</td>
                    <td className="border p-2">{formatDate(item.endDate)}</td>
                    <td className="border p-2">{item.clientName}</td>
                    <td className="border p-2">{item.employeeCount}</td>
                  </tr>
                </tbody>
              ))}
          </table>
        </div>
        <PageNavigator
          page={page}
          totalPages={totalPages}
          setPage={setPage}
        />

      </div>
    </>
  );
};

export default Projects;
