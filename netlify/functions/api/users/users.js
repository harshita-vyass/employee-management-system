const { rolesMap, departmentsMap, businessUnitsMap, designationMap } = require("../common/constants");
const { usersList } = require("./staticList");

const users = async (event) => {
  const payload = JSON.parse(event.body);
  const page = parseInt(payload?.pageRequest?.page) || 0;
  const pageSize = parseInt(payload?.pageRequest?.size) || 5;
  const userFilter = payload?.userIds;
  let roleFilter = payload?.roles;
  let designationFilter = payload?.designations;
  let departmentFilter = payload?.departments;
  const managerFilter = payload?.managerIds;
  let businessUnitFilter = payload?.businessUnits;
  const search = payload?.search;
  const sort = payload?.sort;

  let filtered = usersList;
    if (userFilter) {
      filtered = filtered.filter((c) => userFilter.includes(c.id));
    }
    if (roleFilter) {
      roleFilter = roleFilter.map(role => rolesMap[role]);
      filtered = filtered.filter((c) => roleFilter.includes(c.role));
      console.log("roleFilter: ", roleFilter);
      console.log("roleFilter applied: ", filtered.length);
    }
    if (designationFilter) {
      designationFilter = designationFilter.map(designation => designationMap[designation]);
      filtered = filtered.filter((c) =>
        designationFilter.includes(c.designation)
      );
      console.log("designationFilter: ", designationFilter);
      console.log("designationFilter applied: ", filtered.length);
    }
    if (departmentFilter) {
      departmentFilter = departmentFilter.map(department => departmentsMap[department]);
      filtered = filtered.filter((c) =>
        departmentFilter.includes(c.department)
      );
      console.log("departmentFilter: ", departmentFilter);
      console.log("departmentFilter applied: ", filtered.length);
    }
    if (managerFilter) {
      filtered = filtered.filter((c) => managerFilter.includes(c.managerId));
    }
    if (businessUnitFilter) {
      filtered = filtered.filter((c) =>
        businessUnitFilter.includes(c.businessUnit)
      );
      businessUnitFilter = businessUnitFilter.map(businessUnit => businessUnitsMap[businessUnit]);
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
        sortableParams: ["name", "dob", "managerName", "doj"],
      },
    }),
  };
};

module.exports = { users };
