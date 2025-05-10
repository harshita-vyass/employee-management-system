const { businessUnitsMap } = require("../common/constants");
const { projectList } = require("./staticList");

const projects = async (event) => {
  const payload = JSON.parse(event.body);
  console.log("Payload:", payload);
  const page = parseInt(payload?.pageRequest?.page) || 0;
  const pageSize = parseInt(payload?.pageRequest?.size) || 5;
  const projectFilter = payload?.projectIds;
  const clientFilter = payload?.clientIds;
  let businessUnitFilter = payload?.businessUnits;
  const search = payload?.search;
  const sort = payload?.sort;

  // Apply filter
  let filtered = projectList;
  if (projectFilter) {
    filtered = filtered.filter((c) => projectFilter.includes(c.id));
    console.log("projectFilter: ", projectFilter);
    console.log("projectFilter applied: ", filtered.length);
  }
  if (clientFilter) {
    filtered = filtered.filter((c) => clientFilter.includes(c.clientId));
    console.log("clientFilter: ", clientFilter);
    console.log("clientFilter applied: ", filtered.length);
  }
  if (businessUnitFilter) {
    businessUnitFilter = businessUnitFilter.map(businessUnit => businessUnitsMap[businessUnit]);
    filtered = filtered.filter((c) => businessUnitFilter.includes(c.businessUnit));
    console.log("businessUnitFilter: ", businessUnitFilter);
    console.log("businessUnitFilter applied: ", filtered.length);
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
          order: sort?.order || "DESC",
        },
        pageRequest: {
          page: page,
          size: pageSize,
        },
        totalItems: filtered.length,
        totalPages: Math.ceil(filtered.length / pageSize),
        sortableParams: ["name", "startDate", "clientName", "employeeCount"],
      },
    }),
  };
};
module.exports = { projects };
