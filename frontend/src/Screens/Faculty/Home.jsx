import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Notice from "../../components/Notice";
import Profile from "./Profile";
import Timetable from "./Timetable";
import { Toaster } from "react-hot-toast";
import Material from "./Material";
import Marks from "./Marks";

import { FaBars } from "react-icons/fa";

const Home = () => {
  const [selectedMenu, setSelectedMenu] = useState("My Profile");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setLoad(true);
  }, []);

  return (
    <section>
      {load && (
        <>
          <Navbar setIsSidebarOpen={setIsSidebarOpen} isSidebarOpen={isSidebarOpen} />
          <div className="flex">
            <aside className={`bg-green-500 text-white w-1/4 ${isSidebarOpen ? '' : 'hidden'}`} style={{ padding: '20px' }}>
              <FaBars className="lg:hidden absolute top-4 left-4 lg:left-auto lg:right-4 lg:top-6 lg:text-black text-3xl lg:text-4xl cursor-pointer" onClick={() => setIsSidebarOpen(!isSidebarOpen)} />
              <ul className="py-4">
                <li className={`px-4 py-2 cursor-pointer ${selectedMenu === "My Profile" ? "bg-green-700" : ""}`} onClick={() => { setSelectedMenu("My Profile"); setIsSidebarOpen(false); }}>My Profile</li>
                
                <li className={`px-4 py-2 cursor-pointer ${selectedMenu === "Upload Marks" ? "bg-green-700" : ""}`} onClick={() => { setSelectedMenu("Upload Marks"); setIsSidebarOpen(false); }}>Upload Marks</li>
                <li className={`px-4 py-2 cursor-pointer ${selectedMenu === "Timetable" ? "bg-green-700" : ""}`} onClick={() => { setSelectedMenu("Timetable"); setIsSidebarOpen(false); }}>Timetable</li>
                <li className={`px-4 py-2 cursor-pointer ${selectedMenu === "Notice" ? "bg-green-700" : ""}`} onClick={() => { setSelectedMenu("Notice"); setIsSidebarOpen(false); }}>Notice</li>
                <li className={`px-4 py-2 cursor-pointer ${selectedMenu === "Material" ? "bg-green-700" : ""}`} onClick={() => { setSelectedMenu("Material"); setIsSidebarOpen(false); }}>Material</li>
              </ul>
            </aside>
            <div className="max-w-6xl mx-auto w-3/4 relative">
              {load && (
                <>
                  <FaBars className="hidden lg:block absolute top-0 left-0 lg:left-0 lg:top-0 lg:text-black text-3xl lg:text-4xl cursor-pointer" onClick={() => setIsSidebarOpen(!isSidebarOpen)} />
                  {selectedMenu === "Timetable" && <Timetable />}
                  {selectedMenu === "Upload Marks" && <Marks />}
                  {selectedMenu === "Material" && <Material />}
                  {selectedMenu === "Notice" && <Notice />}
                  {selectedMenu === "My Profile" && <Profile />}
                  
                </>
              )}
            </div>
          </div>
        </>
      )}
      <Toaster position="bottom-center" />
    </section>
  );
};

export default Home;
