/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import Notice from "../../components/Notice";
import Student from "./Student";
import Faculty from "./Faculty";
import Subjects from "./Subject";
import { baseApiURL } from "../../baseUrl";
import Admin from "./Admin";
import Profile from "./Profile";
const Home = () => {
  const [load, setLoad] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("Profile");
  const [dashboardData, setDashboardData] = useState({
    studentCount: "",
    facultyCount: "",
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setLoad(true);
  }, []);

  useEffect(() => {
    getStudentCount();
    getFacultyCount();
  }, []);

  const getStudentCount = () => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .get(`${baseApiURL()}/student/details/count`, {
        headers: headers,
      })
      .then((response) => {
        if (response.data.success) {
          setDashboardData((prevData) => ({
            ...prevData,
            studentCount: response.data.user,
          }));
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getFacultyCount = () => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .get(`${baseApiURL()}/faculty/details/count`, {
        headers: headers,
      })
      .then((response) => {
        if (response.data.success) {
          setDashboardData((prevData) => ({
            ...prevData,
            facultyCount: response.data.user,
          }));
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      {load && (
        <>
          <Navbar setIsSidebarOpen={setIsSidebarOpen} isSidebarOpen={isSidebarOpen} />
          <div className="flex">
            <aside
              className={`bg-green-500 text-white lg:w-1/4 w-full lg:block ${isSidebarOpen ? 'block' : 'hidden'} lg:relative fixed inset-0 lg:inset-auto z-50 lg:z-auto`}
              style={{ padding: '20px' }}
            >
              <div className="px-4 py-2 text-sm border-b border-green-600/50">
                Students:{" "}
                {dashboardData.studentCount !== ""
                  ? dashboardData.studentCount
                  : "—"}{" "}
                · Faculty:{" "}
                {dashboardData.facultyCount !== ""
                  ? dashboardData.facultyCount
                  : "—"}
              </div>
              <ul className="py-4">
              <li
  className={`px-4 py-2 cursor-pointer ${selectedMenu === "Profile" ? "bg-green-700" : ""}`}
  onClick={() => { setSelectedMenu("Profile"); setIsSidebarOpen(false); }}
>
  Profile
</li>
<li
  className={`px-4 py-2 cursor-pointer ${selectedMenu === "Student" ? "bg-green-700" : ""}`}
  onClick={() => { setSelectedMenu("Student"); setIsSidebarOpen(false); }}
>
  Student
</li>
<li
  className={`px-4 py-2 cursor-pointer ${selectedMenu === "Faculty" ? "bg-green-700" : ""}`}
  onClick={() => { setSelectedMenu("Faculty"); setIsSidebarOpen(false); }}
>
  Faculty
</li>
<li
  className={`px-4 py-2 cursor-pointer ${selectedMenu === "Notice" ? "bg-green-700" : ""}`}
  onClick={() => { setSelectedMenu("Notice"); setIsSidebarOpen(false); }}
>
  Notice
</li>
<li
  className={`px-4 py-2 cursor-pointer ${selectedMenu === "Subjects" ? "bg-green-700" : ""}`}
  onClick={() => { setSelectedMenu("Subjects"); setIsSidebarOpen(false); }}
>
  Subjects
</li>
<li
  className={`px-4 py-2 cursor-pointer ${selectedMenu === "Admin" ? "bg-green-700" : ""}`}
  onClick={() => { setSelectedMenu("Admin"); setIsSidebarOpen(false); }}
>
  Admin
</li>

              </ul>
            </aside>
            <div className="flex-1 max-w-6xl mx-auto relative">
              
              <div className="my-8">
                <>
                  {selectedMenu === "Notice" && <Notice />}
                  {selectedMenu === "Student" && <Student />}
                  {selectedMenu === "Faculty" && <Faculty />}
                  {selectedMenu === "Subjects" && <Subjects />}
                  {selectedMenu === "Admin" && <Admin />}
                  {selectedMenu === "Profile" && <Profile />}
                </>
              </div>
            </div>
          </div>
        </>
      )}
      <Toaster position="bottom-center" />
    </>
  );
};

export default Home;
