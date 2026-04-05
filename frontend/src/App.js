import React, { useEffect } from "react";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import mystore from "./redux/store";
import StudentHome from "./Screens/Student/Home";
import FacultyHome from "./Screens/Faculty/Home";
import AdminHome from "./Screens/Admin/Home";
import api, { setAccessToken } from "./api/client";

const RequireAuth = ({ children, roles }) => {
  const token = useSelector((state) => state.accessToken);
  const user = useSelector((state) => state.userData);
  if (!token) return <Navigate to="/" replace />;
  if (roles && roles.length && !roles.includes(user.role)) return <Navigate to="/" replace />;
  return children;
};

const App = () => {
  useEffect(() => {
    // bootstrap attempt refresh to persist auth
    api
      .post(`/auth/refresh`)
      .then((resp) => {
        setAccessToken(resp.data.accessToken);
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <Provider store={mystore}>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="student" element={<RequireAuth roles={["student"]}><StudentHome /></RequireAuth>} />
            <Route path="faculty" element={<RequireAuth roles={["faculty"]}><FacultyHome /></RequireAuth>} />
            <Route path="admin" element={<RequireAuth roles={["admin"]}><AdminHome /></RequireAuth>} />
          </Routes>
        </Router>
      </Provider>
    </>
  );
};

export default App;
