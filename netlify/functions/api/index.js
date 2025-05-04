const { login } = require("./auth/login.js");
const { userByAuthId } = require("./auth/userByAuthId.js");
const { clients } = require("./clients/clients.js");
const { designations } = require("./common/designations.js");
const { filter } = require("./common/filters.js");
const { holidays } = require("./common/holidays.js");
const { leaveTypes } = require("./common/leaveTypes.js");
const { projects } = require("./projects/projects.js");
const { users } = require("./users/users.js");

const handler = async (event) => {
  try {
    const { path, httpMethod, body } = event;
    const route = path.replace("/api/v1", "");
    console.log("Route:", route);
    console.log("HTTP Method:", httpMethod);
    console.log("Body:", body);
    const routeKey = `${httpMethod} ${route}`;

    switch (routeKey) {
      case "POST /auth/login":
        return await login(event);

      case "GET /user":
        return await userByAuthId(event);

      case "GET /constants/designations":
        return await designations(event);

      case "GET /filters":
        return await filter(event);

      case "GET /constants/leaveTypes":
        return await leaveTypes(event);

      case "GET /holidays":
        return await holidays(event);

      case "POST /projects":
        return await projects(event);

      case "POST /clients":
        return await clients(event);

        case "POST /users":
          return await users(event);

      default:
        return {
          statusCode: 404,
          body: JSON.stringify({ error: "Route not found" }),
        };
    }
  } catch (error) {
    console.error("Error occurred:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};

module.exports = { handler };
