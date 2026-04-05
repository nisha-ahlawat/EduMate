import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Profile from "./Profile";
import Timetable from "./Timetable";
import Marks from "./Marks";
import Notice from "../../components/Notice";
import Material from "./Material";
import { Toaster } from "react-hot-toast";
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
      <Navbar setIsSidebarOpen={setIsSidebarOpen} isSidebarOpen={isSidebarOpen} />
      <div className="flex">
        <aside className={`bg-green-500 text-white w-1/4 ${isSidebarOpen ? '' : 'hidden'}`}>
          <ul className="py-4">
            <li className={`px-4 py-2 cursor-pointer ${selectedMenu === "My Profile" ? "bg-green-700" : ""}`} onClick={() => { setSelectedMenu("My Profile"); setIsSidebarOpen(false); }}>My Profile</li>
            <li className={`px-4 py-2 cursor-pointer ${selectedMenu === "Timetable" ? "bg-green-700" : ""}`} onClick={() => { setSelectedMenu("Timetable"); setIsSidebarOpen(false); }}>Timetable</li>
            <li className={`px-4 py-2 cursor-pointer ${selectedMenu === "Marks" ? "bg-green-700" : ""}`} onClick={() => { setSelectedMenu("Marks"); setIsSidebarOpen(false); }}>Marks</li>
            <li className={`px-4 py-2 cursor-pointer ${selectedMenu === "Material" ? "bg-green-700" : ""}`} onClick={() => { setSelectedMenu("Material"); setIsSidebarOpen(false); }}>Material</li>
            <li className={`px-4 py-2 cursor-pointer ${selectedMenu === "Notice" ? "bg-green-700" : ""}`} onClick={() => { setSelectedMenu("Notice"); setIsSidebarOpen(false); }}>Notice</li>
          </ul>
        </aside>
        <div className="max-w-6xl mx-auto w-3/4 relative lg:pl-16"> {/* Added lg:pl-16 */}
          {load && (
            <>
              <FaBars className="absolute top-4 left-0 lg:left-4 lg:top-6 lg:text-black text-3xl lg:text-4xl cursor-pointer" onClick={() => setIsSidebarOpen(!isSidebarOpen)} />
              {selectedMenu === "Timetable" && <Timetable />}
              {selectedMenu === "Marks" && <Marks />}
              {selectedMenu === "Material" && <Material />}
              {selectedMenu === "Notice" && <Notice />}
              {selectedMenu === "My Profile" && <Profile />}
            </>
          )}
        </div>
      </div>
      <Toaster position="bottom-center" />
    </section>
  );
};

export default Home;
