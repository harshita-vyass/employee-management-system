import { DATE_FORMAT } from "./constants";

export const getStringFromLocalStorage = (key, errorIfNotFound = true) => {
  if (!key) throw new Error("Invalid Key");
  const value = localStorage.getItem(key);
  if (!value)
    if (errorIfNotFound) throw new Error(`No value found for Key : ${key}`);
    else return;
  return JSON.parse(value);
};

export const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getDisplayName = () => {
  return `${JSON.parse(localStorage.getItem("employee"))?.firstName} ${JSON.parse(localStorage.getItem("employee"))?.lastName
    }`;
};

export const fetchDesignation = (id) => {
  console.log(id);
  const value = JSON.parse(localStorage.getItem("designation"))[id];
  console.log(value);
  return value;
};

export const formatDate = (date) => {
  date = new Date(date);
  return date.toLocaleDateString("en-GB", DATE_FORMAT);

  // const day = date.getDate();
  // const month = date.toLocaleString("en-US", { month: "long" });
  // const year = date.getFullYear();

  // const formattedDate = `${day} ${month}, ${year}`;
};

export const getLeaveTypeFromKey = (value) => {
  return JSON.parse(localStorage.getItem("leaveTypes"))[value];
};
