const { usersList } = require("./staticList");

const users = async (event) => {
  const payload = JSON.parse(event.body);
  return {
    statusCode: 200,
    body: JSON.stringify({
      items: usersList,
      meta: {
        sort: {
          sortBy: "name",
          order: "DESC",
        },
        pageRequest: {
          page: 0,
          size: 5,
        },
        totalItems: 5,
        totalPages: 1,
        sortableParams: ["name", "startDate", "clientName", "employeeCount"],
      },
    }),
  };
};

module.exports = { users };
