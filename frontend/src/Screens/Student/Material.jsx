import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Heading from "../../components/Heading";
import { IoMdLink } from "react-icons/io";
import { HiOutlineCalendar, HiOutlineSearch } from "react-icons/hi";
import toast from "react-hot-toast";
import { baseApiURL } from "../../baseUrl";

const Material = () => {
  const [allSubjects, setAllSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [materials, setMaterials] = useState([]);
  const userData = useSelector((state) => state.userData);

 // Inside your Material component

 useEffect(() => {
  if (userData) {
    toast.loading("Loading Subjects");
    axios
      .get(`${baseApiURL()}/student/details/getStudentSubjects/${userData.enrollmentNo}`)
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          setAllSubjects(response.data.subjects);
          // Fetch all subjects here
          axios
            .get(`${baseApiURL()}/subject/getSubject`)
            .then((res) => {
              if (res.data.success) {
                console.log(res.data)
                const allSubjects = res.data.subject;
                console.log(allSubjects);
                // Now, filter the subjects that match the student's subjects
                const studentSubjects = response.data.subjects.map(subject => subject);
              console.log(studentSubjects)
              console.log(studentSubjects[0])
                const matchedSubjects = allSubjects.filter(subject => studentSubjects[0].includes(subject.name));
                setAllSubjects(matchedSubjects);
              } else {
                toast.error(res.data.message);
              }
            })
            .catch((error) => {
              toast.error("Failed to fetch subjects");
            });
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error("Failed to fetch subjects");
      });
  }
}, [userData]);


  const getSubjectMaterial = () => {
    if (selectedSubject) {
      toast.loading("Loading Material");
      axios
        .post(
          `${baseApiURL()}/material/getMaterial`,
          { subject: selectedSubject },
          { headers: { "Content-Type": "application/json" } }
        )
        .then((response) => {
          toast.dismiss();
          if (response.data.success) {
            setMaterials(response.data.material);
          } else {
            toast.error(response.data.message);
          }
        })
        .catch((error) => {
          toast.dismiss();
          toast.error("Failed to fetch material");
        });
    }
  };

  const onSelectChangeHandler = (e) => {
    setSelectedSubject(e.target.value);
  };

  return (
    <div className="w-full mx-auto mt-10 flex justify-center items-start flex-col mb-10">
      <Heading title="Material" />
      <div className="mt-8 w-full flex justify-center items-center flex-col">
        <div className="flex justify-center items-center w-[40%]">
          <select
            value={selectedSubject}
            name="subject"
            id="subject"
            onChange={onSelectChangeHandler}
            className="px-2 bg-green-50 py-3 rounded-sm text-base accent-green-700"
          >
            <option value="">Select Subject</option> {/* Default option */}
            {allSubjects.map((subject) => (
              <option value={subject.name} key={subject._id}>
                {subject.name}
              </option>
            ))}
          </select>
          <button
            onClick={getSubjectMaterial}
            className="bg-green-500 text-white py-3 px-4 text-2xl rounded-sm ml-4"
            disabled={!selectedSubject}
          >
            <HiOutlineSearch />
          </button>
        </div>
        <div className="mt-8 w-full">
          {materials &&
            materials.map((item, index) => (
              <div
                key={index}
                className="border-green-500 border-2 w-full rounded-md shadow-sm py-4 px-6 relative mb-4"
              >
                <p
                  className={`text-xl font-medium flex justify-start items-center ${
                    item.link && "cursor-pointer"
                  } group`}
                  onClick={() =>
                    item.link &&
                    window.open(
                      process.env.REACT_APP_MEDIA_LINK + "/" + item.link
                    )
                  }
                >
                  {item.title}{" "}
                  {item.link && (
                    <span className="text-2xl group-hover:text-green-500 ml-1">
                      <IoMdLink />
                    </span>
                  )}
                </p>
                <p className="text-base font-normal mt-1">
                  {item.subject} - {item.faculty}
                </p>
                <p className="text-sm absolute top-4 right-4 flex justify-center items-center">
                  <span className="text-base mr-1">
                    <HiOutlineCalendar />
                  </span>{" "}
                  {item.createdAt.split("T")[0].split("-").reverse().join("/")}
                </p>
              </div>
            ))}
          {!materials.length && selectedSubject && (
            <p className="text-center">No Material For {selectedSubject}!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Material;
