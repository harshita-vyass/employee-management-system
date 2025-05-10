import React, { useEffect, useRef } from "react";
import { authClient, apiClient } from "../api/axios";
import { useNavigate } from "react-router-dom";
import { IS_AUTHENTICATED } from "../utils/constants";

const Login = () => {
  const emailRef = useRef();
  const passRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
      setTimeout(() => {
        alert("Credentials are prefilled for demo purpose. Please proceed with the login.")
  
    }, 1000);
    emailRef.current.value = "jane_doe"
    passRef.current.value = "password"
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    authClient.post('auth/login', { username: emailRef.current.value, password: passRef.current.value })
      .then((response) => {
        saveLoginResponseToLocalStorage(response)
        localStorage.setItem(IS_AUTHENTICATED, true);
        fetchUserDetails();
        navigate('/');
      }).catch((error) => {
        console.error("error: ", error);
      });
  };



  const fetchUserDetails = () => {
    apiClient
      .get("user", { authenticationId: localStorage.getItem("id") })
      .then((response) => {
        localStorage.setItem("employee", JSON.stringify(response))
      })
      .catch((error) => {
        console.error(error);
      });
    getDesignation()
    filterAllByCategory()
  }

  const getDesignation = () => {
    apiClient.get("constants/designations")
      .then((response) => {
        localStorage.setItem("designation", JSON.stringify(response))
      })
      .catch((error) => console.error(error))
  }

  const filterAllByCategory = () => {
    apiClient.get("filters")
      .then((response) => {
        localStorage.setItem("filters", JSON.stringify(response))
      })
      .catch((error) => (console.error(error)))
  }

  const saveLoginResponseToLocalStorage = (response) => {
    Object.entries(response).map(([key, value], index) => localStorage.setItem(key, JSON.stringify(value)))
  }



  return (
    <section className="bg-green-800 h-[100dvh] flex flex-col items-center gap-4 justify-center">
      <div className="w-11/12 mx-auto bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h2 className="text-3xl text-center  ">Login</h2>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Your email
              </label>
              <input
                ref={emailRef}
                type="text"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus:outline focus:outline-green-700 focus:outline-2"
                placeholder="name@company.com"
                required=""
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Password
              </label>
              <input
                ref={passRef}
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg  block w-full p-2.5 focus:outline focus:outline-green-700 focus:outline-2"
                required=""
              />
            </div>

            <button
              type="submit"
              className="w-full text-white bg-green-800 hover:bg-green-800/90  font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Log in
            </button>

          </form>

          <div className="flex justify-end  ">
            <button className="cursor-pointer hover:text-green-800 hover:underline">Forgot password?</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
