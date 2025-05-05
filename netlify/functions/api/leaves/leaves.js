const { forApproval } = require("./approvalStaticList");

const leaveApply = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      id: 452,
      type: "CL",
      appliedDate: "2025-05-05T17:33:49.294086",
      startDate: "2025-06-25",
      endDate: "2025-06-28",
      reason: "Casual Leave",
      leaveCount: 4,
      status: "PENDING",
      employeeId: "EMP10000",
      managerId: "EMP10010",
    }),
  };
};

const leaveStats = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      total: 40,
      availed: 18,
      remaining: 22,
    }),
  };
};

const leaveRequest = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify([
      {
        id: 452,
        type: "CL",
        appliedDate: "2025-05-05T17:33:49.294086",
        startDate: "2025-06-25",
        endDate: "2025-06-28",
        reason: "Casual Leave",
        leaveCount: 4,
        status: "PENDING",
        employeeId: "EMP10000",
        managerId: "EMP10010",
      },
      {
        id: 352,
        type: "PL",
        appliedDate: "2024-12-03T23:19:35.917691",
        startDate: "2024-12-03",
        endDate: "2024-12-04",
        reason: "Planned Leave",
        leaveCount: 2,
        status: "APPROVED",
        employeeId: "EMP10000",
        managerId: null,
      },
      {
        id: 304,
        type: "CL",
        appliedDate: "2024-10-28T01:59:20.620352",
        startDate: "2024-11-16",
        endDate: "2024-11-16",
        reason: "Casual Leave",
        leaveCount: 1,
        status: "APPROVED",
        employeeId: "EMP10000",
        managerId: null,
      },
      {
        id: 303,
        type: "CL",
        appliedDate: "2024-10-28T01:58:32.521503",
        startDate: "2024-11-14",
        endDate: "2024-11-15",
        reason: "Casual Leave",
        leaveCount: 2,
        status: "APPROVED",
        employeeId: "EMP10000",
        managerId: null,
      },
      {
        id: 302,
        type: "PL",
        appliedDate: "2024-10-28T01:57:45.276831",
        startDate: "2024-10-30",
        endDate: "2024-10-31",
        reason: "Casual Leave",
        leaveCount: 2,
        status: "APPROVED",
        employeeId: "EMP10000",
        managerId: null,
      },
      {
        id: 253,
        type: "MATL",
        appliedDate: "2024-10-28T01:48:35.332819",
        startDate: "2024-10-15",
        endDate: "2024-10-17",
        reason: "Casual Leave",
        leaveCount: 3,
        status: "APPROVED",
        employeeId: "EMP10000",
        managerId: null,
      },
      {
        id: 252,
        type: "CL",
        appliedDate: "2024-10-28T01:03:27.069993",
        startDate: "2024-09-25",
        endDate: "2024-09-29",
        reason: "Casual Leave",
        leaveCount: 4,
        status: "APPROVED",
        employeeId: "EMP10000",
        managerId: null,
      },
      {
        id: 152,
        type: "PL",
        appliedDate: "2024-06-24T00:00:57.579171",
        startDate: "2024-06-13",
        endDate: "2024-06-14",
        reason: "Apply leave",
        leaveCount: 2,
        status: "APPROVED",
        employeeId: "EMP10000",
        managerId: null,
      },
      {
        id: 103,
        type: "PL",
        appliedDate: "2024-06-11T01:58:53.927914",
        startDate: "2024-05-30",
        endDate: "2024-05-31",
        reason: "Apply leave",
        leaveCount: 2,
        status: "APPROVED",
        employeeId: "EMP10000",
        managerId: null,
      },
    ]),
  };
};

const leaveRequestForApproval = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(forApproval),
  };
};

module.exports = {
  leaveApply,
  leaveStats,
  leaveRequest,
  leaveRequestForApproval,
};
