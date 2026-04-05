

import React from "react";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import api from "../api/client";
import { useDispatch, useSelector } from "react-redux";
import { RxDashboard } from "react-icons/rx";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const role = useSelector((s) => s.userData?.role);
  const roleLabel = role
    ? role.charAt(0).toUpperCase() + role.slice(1)
    : "";
  return (
    <div className="shadow-md px-6 py-4">
      <div className="max-w-6xl flex justify-between items-center mx-auto">
        <p
          className="font-semibold text-2xl flex justify-center items-center cursor-pointer text-darkblue"
          onClick={() => navigate("/")}
        >
          <span className="mr-2">
            <RxDashboard />
          </span>{" "}
          Welcome to {roleLabel} Dashboard
        </p>
        <button
          className="flex justify-center items-center text-red-500 px-3 py-2 font-semibold rounded-sm"
          onClick={async () => {
            try { await api.post("/auth/logout"); } catch (_) {}
            dispatch({ type: "AUTH_CLEAR" });
            navigate("/");
          }}
        >
          Logout
          <span className="ml-2">
            <FiLogOut />
          </span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
