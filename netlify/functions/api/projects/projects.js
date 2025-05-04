const { projectList } = require("./staticList");

const projects = async (event) => {
  const payload = JSON.parse(event.body);
  console.log("Payload:", payload);
  const page = parseInt(payload?.pageRequest?.page) || 0;
  const pageSize = parseInt(payload?.pageRequest?.size) || 5;
  const projectFilter = payload?.projectIds;
  const clientFilter = payload?.clientIds;
  const businessUnitFilter = payload?.businessUnits;
  const search = payload?.search;
  const sort = payload?.sort;
  
  console.log("sort", sort);
  console.log("projectFilter", projectFilter);
  console.log("clientFilter", clientFilter);
  console.log("businessUnitFilter", businessUnitFilter);
  console.log("search", search);

  // Apply filter
  let filtered = projectList;
  if (projectFilter) {
    filtered = filtered.filter((c) => projectFilter.includes(c.id));
  }
  if (clientFilter) {
    filtered = filtered.filter((c) => clientFilter.includes(c.clientId));
  }
  if (businessUnitFilter) {
    filtered = filtered.filter((c) =>
      businessUnitFilter.includes(c.businessUnit)
    );
  }
  if (search) {
    filtered = filtered.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Sort
  if (sort) {
    const { sortBy, order } = sort;
    filtered = filtered.sort((a, b) => {
      if (order === "ASC") {
        return a[sortBy] > b[sortBy] ? 1 : -1;
      } else {
        return a[sortBy] < b[sortBy] ? 1 : -1;
      }
    });
  }
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
          sortBy: "name",
          order: "DESC",
        },
        pageRequest: {
          page: page,
          size: pageSize,
        },
        totalItems: paginated.length,
        totalPages: Math.ceil(paginated.length / pageSize),
        sortableParams: ["name", "startDate", "clientName", "employeeCount"],
      },
    }),
  };
};
module.exports = { projects };