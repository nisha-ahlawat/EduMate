import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { baseApiURL } from "../../../baseUrl";
import { FiUpload } from "react-icons/fi";

const AddStudent = () => {
  const [file, setFile] = useState();
  const [previewImage, setPreviewImage] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [data, setData] = useState({
    enrollmentNo: "",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    semester: "",
    branch: "",
    gender: "",
  });

  const branches = ["CSE", "DSAI", "EE", "ME", "MT"]; // Predefined branches

  useEffect(() => {
    axios.get(`${baseApiURL()}/subject/getSubject`)
      .then((response) => {
        if (response.data.success) {
          setSubjects(response.data.subject);
        } else {
          toast.error("Failed to fetch subjects");
        }
      })
      .catch((error) => {
        toast.error("Failed to fetch subjects");
      });
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    const imageUrl = URL.createObjectURL(selectedFile);
    setPreviewImage(imageUrl);
  };

  const handleSubjectChange = (e) => {
    const { checked, value } = e.target;
    const subject = subjects.find(sub => sub.name === value); // Get the subject object
    if (checked) {
      setSelectedSubjects([...selectedSubjects, subject]);
    } else {
      setSelectedSubjects(selectedSubjects.filter(sub => <sub className="name"></sub>!== value));
    }
  };

  const addStudentProfile = (e) => {
    e.preventDefault();
    toast.loading("Adding Student");
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    formData.append("type", "profile");
    formData.append("profile", file);
    const subjectNames = selectedSubjects.map(subject => subject.name);
    formData.append("subjects", JSON.stringify(subjectNames)); 

    axios.post(`${baseApiURL()}/student/details/addDetails`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((response) => {
      toast.dismiss();
      if (response.data.success) {
        toast.success(response.data.message);
        axios.post(`${baseApiURL()}/student/auth/register`, {
          loginid: data.enrollmentNo,
          password: data.enrollmentNo,
        })
        .then((response) => {
          toast.dismiss();
          if (response.data.success) {
            toast.success(response.data.message);
            setFile();
            setData({
              enrollmentNo: "",
              firstName: "",
              middleName: "",
              lastName: "",
              email: "",
              phoneNumber: "",
              semester: "",
              branch: "",
              gender: "",
            });
            setPreviewImage("");
            setSelectedSubjects([]);
          } else {
            toast.error(response.data.message);
          }
        })
        .catch((error) => {
          toast.dismiss();
          toast.error(error.response.data.message);
        });
      } else {
        toast.error(response.data.message);
      }
    })
    .catch((error) => {
      toast.dismiss();
      toast.error(error.response.data.message);
    });
  };

  return (
    <form onSubmit={addStudentProfile} className="w-[70%] flex flex-wrap gap-6 mx-auto mt-10">
      {/* Form fields for student details */}
      {Object.keys(data).map((key) => (
        key !== 'branch' && key !== 'gender' &&
        <div className="w-[40%]" key={key}>
          <label htmlFor={key} className="leading-7 text-sm">{`Enter ${key.charAt(0).toUpperCase() + key.slice(1)}`}</label>
          <input
            type={key === 'email' ? 'email' : 'text'}
            id={key}
            value={data[key]}
            onChange={(e) => setData({ ...data, [key]: e.target.value })}
            className="w-full bg-green-50 rounded border focus:border-green-500 focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      ))}
      {/* Branch, Gender, Subject chooser, and File upload */}
      <div className="w-[40%]">
        <label htmlFor="branch" className="leading-7 text-sm">Select Branch</label>
        <select id="branch" value={data.branch} onChange={(e) => setData({ ...data, branch: e.target.value })} className="w-full bg-green-50 rounded border focus:border-green-500 focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
          <option defaultValue>Select</option>
          {branches.map((branch) => <option value={branch} key={branch}>{branch}</option>)}
        </select>
      </div>
      <div className="w-[40%]">
        <label htmlFor="gender" className="leading-7 text-sm">Select Gender</label>
        <select id="gender" value={data.gender} onChange={(e) => setData({ ...data, gender: e.target.value })} className="w-full bg-green-50 rounded border focus:border-green-500 focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
          <option defaultValue>Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
      <div className="w-[40%]">
        <label htmlFor="subjects" className="leading-7 text-sm">Select Subjects</label>
        {subjects.map((subject) => (
          <div key={subject._id} className="flex items-center">
            <input
              type="checkbox"
              id={subject._id}
              value={subject.name}
              checked={selectedSubjects.some(sub => sub.name === subject.name)}
              onChange={handleSubjectChange}
              className="mr-2"
            />
            <label htmlFor={subject._id}>{subject.name}</label>
          </div>
        ))}
      </div>
      <div className="w-[40%]">
        <label htmlFor="file" className="leading-7 text-sm">Select Profile</label>
        <label htmlFor="file" className="px-2 bg-green-50 py-3 rounded-sm text-base w-full flex justify-center items-center cursor-pointer text-green-900">
          Upload<span className="ml-2"><FiUpload /></span>
        </label>
        <input hidden type="file" id="file" accept="image/*" onChange={handleFileChange} />
      </div>
      {previewImage && <div className="w-full flex justify-center items-center"><img src={previewImage} alt="student" className="h-36" /></div>}
      <button type="submit" className="bg-green-500 px-6 py-3 rounded-sm mb-6 text-white hover:bg-green-600">Add New Student</button>
    </form>
  );
};

export default AddStudent;
