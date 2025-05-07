import React, { useEffect, useRef, useState } from "react";
import PageNavigator from "../components/PageNavigator";
import FilterInteraction from "../components/FilterInteraction";
import HeaderList from "../components/HeaderList";
import { apiClient } from "../api/axios";
import { formatDate } from "../utils/common";
import { ASC } from "../utils/constants";

const headersList = [
    {
        title: "Name",
        keyName: "name",
        onClickFunc: true,
    },
    {
        title: "Since",
        keyName: "associationSince",
        onClickFunc: false,
    },
    {
        title: "Till",
        keyName: "associationTill",
        onClickFunc: true,
    },
    {
        title: "Revenue Potential",
        keyName: "revenuePotential",
        onClickFunc: false,
    },
    {
        title: "Status",
        keyName: "status",
        onClickFunc: true,
    },
    {
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
                <div className="whitespace-nowrap overflow-auto">   
                    <table className="text-black w-full border-collapse">
                        <HeaderList headersList={headersList} sort={sort} setSort={setSort} />
                        {clientList &&
                            clientList.map((item) => (
                                <tbody
                                    key={item.id}
                                    className=""
                                >
                                    <tr>
                                    <td className="border p-2">{item.name}</td>
                                    <td className="border p-2">
                                        {formatDate(item.associationSince)}
                                    </td>
                                    <td className="border p-2">
                                        {formatDate(item.associationTill)}
                                    </td>
                                    <td className="border p-2 ">{item.revenuePotential}</td>
                                    <td className="border p-2">{item.status}</td>
                                    <td className="border p-2" title={item.regionName}>
                                        {item.regionCode}
                                    </td>
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

export default Clients;
