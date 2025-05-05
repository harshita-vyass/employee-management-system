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
  if (userFilter) {
    filtered = filtered.filter((c) => userFilter.includes(c.id));
  }
  if (regionsFilter) {
    filtered = filtered.filter((c) => regionsFilter.includes(c.regionCode));
  }
  if (revenueFilter) {
    revenueFilter = revenueFilter.map(
      (c) => c.charAt(0).toUpperCase() + c.slice(1).toLowerCase()
    );
    filtered = filtered.filter((c) =>
      revenueFilter.includes(c.revenuePotential)
    );
  }
  if (statusFilter) {
    statusFilter = statusFilter.map(
      (c) => c.charAt(0).toUpperCase() + c.slice(1).toLowerCase()
    );

    filtered = filtered.filter((c) => statusFilter.includes(c.status));
  }

  if (search) {
    filtered = filtered.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase())
    );
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
  console.log("filtered", filtered);

  // Pagination
  const start = page * pageSize;
  console.log("pageSize", pageSize);
  console.log("page", page);
  console.log("start", start);
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
