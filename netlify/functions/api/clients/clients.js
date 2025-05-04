const { clientLists } = require("./staticList");

const clients = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      items: clientLists,
      meta: {
        sort: {
          sortBy: "name",
          order: "DESC",
        },
        pageRequest: {
          page: 0,
          size: 50,
        },
        totalItems: 12,
        totalPages: 1,
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
