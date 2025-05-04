import React, { useEffect, useRef, useState } from "react";
import PageNavigator from "../components/PageNavigator";
import FilterInteraction from "../components/FilterInteraction";
import HeaderList from "../components/HeaderList";
import { apiClient } from "../api/axios";
import { formatDate } from "../utils/common";
import { ASC } from "../utils/constants";

const headersList = [
    {
        width: "52",
        title: "Name",
        keyName: "name",
        onClickFunc: true,
    },
    {
        width: "32",
        title: "Since",
        keyName: "associationSince",
        onClickFunc: false,
    },
    {
        width: "24",
        title: "Till",
        keyName: "associationTill",
        onClickFunc: true,
    },
    {
        width: "24",
        title: "Revenue Potential",
        keyName: "revenuePotential",
        onClickFunc: false,
    },
    {
        width: "40",
        title: "Status",
        keyName: "status",
        onClickFunc: true,
    },
    {
        width: "40",
        title: "Region",
        keyName: "regionCode",
        onClickFunc: true,
    },
];

const Clients = () => {
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [clientList, setClientList] = useState([]);
    const [payload, setPayload] = useState({});
    const [sort, setSort] = useState({ sortBy: "", order: ASC });
    const searchRef = useRef("");
    const size = 5;

    useEffect(() => {
        getClients(page)
    }, [page, payload, sort]);

    const getClients = (page) => {
        const search = searchRef.current.value
        const params = { pageRequest: { page: page - 1, size: size }, ...payload, search }
        console.log(params);
        if (searchRef.current.value) {
            params.search = searchRef.current.value;
        }
        if (sort.sortBy) {
            params["sort"] = sort
        }
        apiClient
            .post("/clients", params)
            .then((response) => {
                console.log(response)
                setClientList(response.items);
                setTotalPages(response.meta.totalPages);
            })
            .catch((error) => console.error(error));
    };

    return (
        <>
            <div className="space-y-5 pt-5 w-11/12  mx-auto">
                <FilterInteraction
                    pageName={"clientSearchPage"}
                    functionName={getClients}
                    setPage={setPage}
                    page={page}
                    searchRef={searchRef}
                    setPayload={setPayload}
                />
                <div>
                    <div className="table-fixed text-black space-y-4">
                        <HeaderList headersList={headersList} sort={sort} setSort={setSort} />
                        {clientList &&
                            clientList.map((item) => (
                                <ul
                                    key={item.id}
                                    className="border-b-2 flex w-[95%] gap-5 justify-between whitespace-nowrap text-left"
                                >
                                    <li className=" min-w-52">{item.name}</li>
                                    <li className="min-w-24">
                                        {formatDate(item.associationSince)}
                                    </li>
                                    <li className="min-w-24">
                                        {formatDate(item.associationTill)}
                                    </li>
                                    <li className="min-w-32 ">{item.revenuePotential}</li>
                                    <li className="min-w-40">{item.status}</li>
                                    <li className="min-w-40" title={item.regionName}>
                                        {item.regionCode}
                                    </li>
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

export default Clients;
