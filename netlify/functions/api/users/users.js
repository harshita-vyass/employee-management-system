const { usersList } = require("./staticList");

const users = async (event) => {
  const payload = JSON.parse(event.body);
  const page = parseInt(payload?.pageRequest?.page) || 0;
  const pageSize = parseInt(payload?.pageRequest?.size) || 5;
  const userFilter = payload?.userIds;
  const roleFilter = payload?.roles;
  const designationFilter = payload?.designations;
  const departmentFilter = payload?.departments;
  const managerFilter = payload?.managerIds;
  const businessUnitFilter = payload?.businessUnits;
  const search = payload?.search;
  const sort = payload?.sort;

  let filtered = usersList;
    if (userFilter) {
      filtered = filtered.filter((c) => userFilter.includes(c.id));
    }
    if (roleFilter) {
      filtered = filtered.filter((c) => roleFilter.includes(c.role));
    }
    if (designationFilter) {
      filtered = filtered.filter((c) =>
        designationFilter.includes(c.designationId)
      );
    }
    if (departmentFilter) {
      filtered = filtered.filter((c) =>
        departmentFilter.includes(c.departmentId)
      );
    }
    if (managerFilter) {
      filtered = filtered.filter((c) => managerFilter.includes(c.managerId));
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
            order: sort?.order || "DESC",
        },
        pageRequest: {
          page: page,
          size: pageSize,
        },
        totalItems: filtered.length,
        totalPages: Math.ceil(filtered.length / pageSize),
        sortableParams: ["name", "dob", "managerName", "doj"],
      },
    }),
  };
};

module.exports = { users };
