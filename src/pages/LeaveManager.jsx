import React, { useEffect, useRef, useState } from "react";
import { apiClient } from "../api/axios";
import { formatDate, getLeaveTypeFromKey } from "../utils/common";

const LeaveManager = () => {
  const [leaveStats, setLeaveStats] = useState();
  const [leaveUpdateTrigger, setLeaveUpdateTrigger] = useState(0);
  const [appliedLeaves, setAppliedLeaves] = useState([]);
  const [holidaysList, setHolidaysList] = useState([]);
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [isManager, setIsManager] = useState(false);
  const [leavesForApproval, setLeavesForApproval] = useState([]);
  const leaveTypeRef = useRef();
  const startDateRef = useRef();
  const endDateRef = useRef();
  const user = JSON.parse(localStorage.getItem("employee"))

  const handleData = (e) => {
    e.preventDefault();
    console.log(leaveTypeRef.current.value);
    console.log(startDateRef.current.value);
    console.log(endDateRef.current.value);

    const payload = {
      type: leaveTypeRef.current.value,
      startDate: startDateRef.current.value,
      endDate: endDateRef.current.value,
      employeeId: user.id,
      reason: "Casual Leave",
    };

    apiClient
      .post("leaves/requests", payload)
      .then((response) => {
        console.log(response);
        setLeaveUpdateTrigger((prev) => prev + 1);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleLeaveStatus = (leaveId, action) => {
    console.log("Leave id:" + leaveId, "Action :" + action);
    apiClient
      .patch(`/leaves/requests/${leaveId}/${action}`)
      .then(() => {
        setLeavesForApproval((prev) =>
          prev.filter((leave) => leave.id !== leaveId)
        );
        setAppliedLeaves((prev) =>
          prev.map((leave) => {
            if (leave.id === leaveId) {
              leave.status = action;
            }
            return leave;
          })
        );
      })
      .catch((error) => console.error("Error on Leave Action:", error));
  };

  useEffect(() => {
    const managerStatus = user?.roles.find(role => role === "MANAGER");
    setIsManager(managerStatus);
    apiClient
      .get("leaves/requests/" + user.id,)
      .then((response) => {
        console.log(response);
        setAppliedLeaves(response);
      })
      .catch((error) => {
        console.error(error);
      });

    apiClient
      .get("/leaves/requests/" + user.id + "/approval")
      .then((response) => setLeavesForApproval(response))
      .catch((error) =>
        console.error("Error fetching leaves for approval:", error)
      );
  }, [leaveUpdateTrigger]);

  useEffect(() => {
    apiClient
      .get("leaves/balance/" + user.id,)
      .then((response) => {
        console.log(response);
        setLeaveStats(response);
      })
      .catch((error) => {
        console.error(error);
      });

    apiClient
      .get("holidays")
      .then((response) => {
        setHolidaysList(response);
      })
      .catch((error) => {
        console.error(error);
      });

    apiClient
      .get("constants/leaveTypes")
      .then((response) => {
        setLeaveTypes(response);
        localStorage.setItem("leaveTypes", JSON.stringify(response));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (

    <div className=" mx-auto space-y-5 w-11/12 pt-10">
      <div className="space-y-4 w-3/4">
        <p className="text-2xl text-black font-bold">Leaves Statistics</p>
        <div className="flex justify-between">
          {leaveStats &&
            Object.entries(leaveStats).map(([label, value], index) => {
              return (
                <div
                  key={index}
                  className="p-5 w-52 bg-green-800 rounded-md text-white space-y-3"
                >
                  <p className="text-5xl text-center">{value}</p>
                  <p className="text-center capitalize">{label} Leaves</p>
                </div>
              );
            })}
        </div>
      </div>

      <div className="text-black">
        <form className="w-full space-y-5" onSubmit={handleData}>
          <div className="space-y-3">
            <p className="text-2xl font-bold">Leave Type</p>
            <div className="overflow-x-auto w-4/5">
              <table className="min-w-full table-auto">

                <tbody>
                  <tr>
                    <td className="px-4 py-2">Select Leave Type</td>
                    <td className="px-4 py-2">
                      <select ref={leaveTypeRef} className="bg-green-50 focus:outline-none">
                        <option className="p-2">Select Leave Type</option>
                        {Object.entries(leaveTypes).map(([label, value], index) => (
                          <option key={index} value={label}>
                            {value}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">Start Date:</td>
                    <td className="px-4 py-2">
                      <input
                        type="date"
                        className="py-1.5 px-10 bg-green-50 rounded-xl"
                        ref={startDateRef}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">End Date:</td>
                    <td className="px-4 py-2">
                      <input
                        type="date"
                        className="py-1.5 px-10 bg-green-50 rounded-xl"
                        ref={endDateRef}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <button className="px-5 !py-1.5 rounded-md bg-green-800 hover:bg-green-800/90 text-white mt-4">
                Apply
              </button>
            </div>


          </div>

        </form>
      </div>

      <div className="space-y-5" >
        <h2 className="text-2xl font-bold text-black">Applied Leaves</h2>
        <table className="text-black w-11/12 ">
          <thead>
            <tr className="text-left">
              <th>Type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Leave Count</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody >
            {appliedLeaves.map((item) => (
              <tr key={item.id} className="text-left">
                <td className="">{leaveTypes[item.type]}</td>
                {/* <td className="">{JSON.parse(localStorage.getItem("leaveTypes"))[item.type]}</td> */}
                <td className="">{formatDate(item.startDate)}</td>
                <td className="">{formatDate(item.endDate)}</td>
                <td className="">{item.leaveCount}</td>
                <td className="">{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isManager && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-green-600 mb-4">
            Leaves for Approval
          </h2>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border p-2 bg-gray-200">Employee</th>
                <th className="border p-2 bg-gray-200">Type</th>
                <th className="border p-2 bg-gray-200">Start Date</th>
                <th className="border p-2 bg-gray-200">End Date</th>
                <th className="border p-2 bg-gray-200">Leave Days</th>
                <th className="border p-2 bg-gray-200">Action</th>
              </tr>
            </thead>
            <tbody>
              {leavesForApproval.map((leave) => (
                <tr key={leave.id}>
                  <td className="border p-2">{leave.employeeId}</td>
                  <td className="border p-2">
                    {getLeaveTypeFromKey(leave.type)}
                  </td>
                  <td className="border p-2">{formatDate(leave.startDate)}</td>
                  <td className="border p-2">{formatDate(leave.endDate)}</td>
                  <td className="border p-2">{leave.leaveCount}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleLeaveStatus(leave.id, "APPROVE")}
                      className="bg-green-600 text-white py-1 px-3 rounded-md shadow-sm hover:bg-green-700 mr-2"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleLeaveStatus(leave.id, "REJECT")}
                      className="bg-red-600 text-white py-1 px-3 rounded-md shadow-sm hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="space-y-5">
        <h2 className="text-2xl font-bold text-black">Holiday Lists</h2>
        <table className="text-black text-left w-1/2">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {holidaysList.map((item) => (
              <tr key={item.id}>
                <td className="">{item.holidayDate}</td>
                <td className="">{item.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveManager;
