import React, { useState } from "react";
import { Context } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FiSettings } from "react-icons/fi";

import { CgLogOut } from "react-icons/cg";

const Dashboard = () => {
  const navTo = useNavigate();
  const { currentUser, logout } = Context();
  const [error, setError] = useState("");

  async function handelLogout() {
    setError("");
    try {
      await logout();
      navTo("/login");
    } catch {
      setError("Failed to logout");
    }
  }
  return (
    <>
      <div className="flex flex-col border border-black p-10 rounded-lg gap-2.5 w-1/3">
        {error && (
          <h2 className="text-center bg-red-400 p-2 text-white">{error}</h2>
        )}
        <div className="flex  justify-between items-center">
          <h1>
            Welcome to your Account{" "}
            <strong> {currentUser && currentUser.email.split("@")[0]}</strong>
          </h1>

          <Link
            to={"/update-profile"}
            className="   flex flex-col  items-center  link"
          >
            <FiSettings size={25} />
            <p className="text-sm"> Profile</p>
          </Link>
        </div>

        <h1>
          <strong>Email :</strong>
          {currentUser && currentUser.email}
        </h1>
      </div>
      <div className="w-1/3 flex mt-4 ">
        <Link className="link " to="/login" onClick={handelLogout}>
          <CgLogOut className="inline-block mr-2" size={22} />
          Log Out
        </Link>
      </div>
    </>
  );
};

export default Dashboard;
