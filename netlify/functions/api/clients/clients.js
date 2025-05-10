const { revenuePotentialMap, statusMap } = require("../common/constants");
const { clientLists } = require("./staticList");

const clients = async (event) => {
  const payload = JSON.parse(event.body);
  const page = parseInt(payload?.pageRequest?.page) || 0;
  const pageSize = parseInt(payload?.pageRequest?.size) || 5;
  const userFilter = payload?.clientIds;
  const regionsFilter = payload?.regions;
  let revenueFilter = payload?.revenuePotential;
  let statusFilter = payload?.status;
  const search = payload?.search;
  const sort = payload?.sort;

  let filtered = clientLists;
  console.log("clients: ", clientLists.length);
  if (userFilter) {
    filtered = filtered.filter((c) => userFilter.includes(c.id));
    console.log("userFilter applied: ", filtered.length);
  }
  if (regionsFilter) {
    filtered = filtered.filter((c) => regionsFilter.includes(c.regionCode));
    console.log("regionsFilter: ", regionsFilter);
    console.log("regionsFilter applied: ", filtered.length);
  }
  if (revenueFilter) {
    revenueFilter = revenueFilter.map(revenue => revenuePotentialMap[revenue]);
    filtered = filtered.filter((c) => revenueFilter.includes(c.revenuePotential));
    console.log("revenueFilter: ", revenueFilter);
    console.log("revenueFilter applied: ", filtered.length);
  }
  if (statusFilter) {
    statusFilter = statusFilter.map(status => statusMap[status]);
    filtered = filtered.filter((c) => statusFilter.includes(c.status));
    console.log("statusFilter: ", statusFilter);
    console.log("statusFilter applied: ", filtered.length);
  }

  if (search) {
    filtered = filtered.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase())
    );
    console.log("search: ", search);
    console.log("search applied: ", filtered.length);
  }

  // Sort
  const { sortBy, order } = sort || { sortBy: "name", order: "ASC" };
  filtered = filtered.sort((a, b) => {
    if (order === "ASC") {
      return a[sortBy] > b[sortBy] ? 1 : -1;
    } else {
      return a[sortBy] < b[sortBy] ? 1 : -1;
    }
  });

  // Pagination
  const start = page * pageSize;
  const paginated = filtered.slice(start, start + pageSize);

  return {
    statusCode: 200,
    body: JSON.stringify({
      items: paginated,
      meta: {
        sort: {
          sortBy: sort?.sortBy || "name",
          order: sort?.order || "ASC",
        },
        pageRequest: {
          page: page,
          size: pageSize,
        },
        totalItems: filtered.length,
        totalPages: Math.ceil(filtered.length / pageSize),
        sortableParams: [
          "name",
          "associationSince",
          "associationTill",
          "revenuePotential",
        ],
      },
    }),
  };
};

module.exports = { clients };
