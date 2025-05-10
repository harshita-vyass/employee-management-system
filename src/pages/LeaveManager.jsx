import React, { useEffect, useRef, useState } from "react";
import { apiClient } from "../api/axios";
import { formatDate } from "../utils/common";
import { Loader } from "../components/Loader";

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
  const [loading, setLoading] = useState(true);

  const handleData = (e) => {
    e.preventDefault();

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
        setLeaveUpdateTrigger((prev) => prev + 1);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleLeaveStatus = (leaveId, action) => {
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
    setTimeout(() => setLoading(false), 500);
    apiClient
      .get("leaves/balance/" + user.id,)
      .then((response) => {
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
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (loading) {
    return <Loader />
  }

  return (
    <div className=" mx-auto space-y-5 w-11/12 pt-10">
      <div className="space-y-4 w-full">
        <p className="text-2xl text-black font-bold">Leaves Statistics</p>
        <div className="flex flex-wrap justify-between">
          {leaveStats &&
            Object.entries(leaveStats).map(([label, value], index) => {
              return (
                <div
                  key={index}
                  className="p-4 md:w-[29%] w-[32%] text-center gap-4 bg-green-800 rounded-md text-white "
                >
                  <p className="md:text-5xl text-3xl ">{value}</p>
                  <p className="md:text-lg text-sm capitalize ">{label} Leaves</p>
                </div>
              );
            })}
        </div>
      </div>

      <div className="text-black">
        <form className="w-full space-y-5" onSubmit={handleData}>

          <p className="text-2xl font-bold">Leave Type</p>
          <div className="w-full">
            <div className="flex flex-col md:flex-row md:items-center">
              <label htmlFor="leaveType" className="md:w-1/3 md:px-4 py-2 font-medium">
                Select Leave Type
              </label>
              <div className="md:w-2/3 md:px-4 py-2">
                <select
                  id="leaveType"
                  ref={leaveTypeRef}
                  className="bg-green-50 focus:outline-none w-full p-2 rounded"
                >
                  <option>Select Leave Type</option>
                  {Object.entries(leaveTypes).map(([label, value], index) => (
                    <option key={index} value={label}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center">
              <label htmlFor="startDate" className="md:w-1/3 md:px-4 py-2 font-medium">
                Start Date:
              </label>
              <div className="md:w-2/3 md:px-4 py-2">
                <input
                  type="date"
                  id="startDate"
                  ref={startDateRef}
                  className="py-1.5 px-3 bg-green-50 rounded-xl w-full outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center">
              <label htmlFor="endDate" className="md:w-1/3 md:px-4 py-2 font-medium">
                End Date:
              </label>
              <div className="md:w-2/3 md:px-4 py-2">
                <input
                  type="date"
                  id="endDate"
                  ref={endDateRef}
                  className="py-1.5 px-5 bg-green-50 rounded-xl w-full outline-none"
                />
              </div>
            </div>
            <button className="px-5 !py-1.5 rounded-md bg-green-800 hover:bg-green-800/90 text-white mt-4">
              Apply
            </button>
          </div>




        </form>
      </div>

      <div className="space-y-5 " >
        <h2 className="text-2xl font-bold text-black">Applied Leaves</h2>
        <div className="whitespace-nowrap overflow-auto">
          <table className="text-black w-full border-collapse">
            <thead>
              <tr className="text-left">
                <th className="border p-2 bg-gray-200">Type</th>
                <th className="border p-2 bg-gray-200">Start Date</th>
                <th className="border p-2 bg-gray-200">End Date</th>
                <th className="border p-2 bg-gray-200">Leave Count</th>
                <th className="border p-2 bg-gray-200">Status</th>
              </tr>
            </thead>
            <tbody >
              {appliedLeaves.map((item) => (
                <tr key={item.id} className="text-left">
                  <td className="border p-2">{leaveTypes[item.type]}</td>
                  {/* <td className="">{JSON.parse(localStorage.getItem("leaveTypes"))[item.type]}</td> */}
                  <td className="border p-2">{formatDate(item.startDate)}</td>
                  <td className="border p-2">{formatDate(item.endDate)}</td>
                  <td className="border p-2">{item.leaveCount}</td>
                  <td className="border p-2">{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isManager && (
        <>
          <h2 className="text-2xl font-bold text-black mb-4">
            Leaves for Approval
          </h2>
          <div className="overflow-x-auto whitespace-nowrap">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left">
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
                      {leaveTypes[leave.type]}
                    </td>
                    <td className="border p-2">{formatDate(leave.startDate)}</td>
                    <td className="border p-2">{formatDate(leave.endDate)}</td>
                    <td className="border p-2">{leave.leaveCount}</td>
                    <td className="border p-2">
                      <button
                        onClick={() => handleLeaveStatus(leave.id, "APPROVE")}
                        className="border-green-800 border-2 text-black py-1 w-24  hover:text-white rounded-md shadow-sm hover:bg-green-800 mr-2"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleLeaveStatus(leave.id, "REJECT")}
                        className="border-red-800 border-2 text-black py-1 w-24  hover:text-white rounded-md shadow-sm hover:bg-red-800"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
        // </div>
      )}

      <div className="space-y-5">
        <h2 className="text-2xl font-bold text-black">Holiday Lists</h2>
        <div className="overflow-x-auto whitespace-nowrap">
          <table className="text-black text-left w-full">
            <thead>
              <tr>
                <th className="border p-2 bg-gray-200">Date</th>
                <th className="border p-2 bg-gray-200">Description</th>
              </tr>
            </thead>
            <tbody>
              {holidaysList.map((item) => (
                <tr key={item.id}>
                  <td className="border p-2">{item.holidayDate}</td>
                  <td className="border p-2">{item.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeaveManager;
