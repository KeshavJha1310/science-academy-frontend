import React, { useState, useEffect } from "react";
import "./AddStudentsForm.css";
import "./AddSubjectForm.css";
import "./LaunchExamForm.css";
import axios from "axios";
import Swal from "sweetalert2";
import Select from "react-select";
import {communicationService} from '../../Services/updateDBFlagService'
const LaunchExamForm = () => {
  useEffect(() => {
    fetchSubjects();
    fetchClassData();
    
  }, []);

  const [examFromData, setexamFromData] = useState({
    classID: null,
    examName: "",
    examType: "",
    subjectId: null,
    date: "",
    maxMarks: null,
    duration: null,
    createAt: new Date()
  });

  const [errors, setErrors] = useState({});
  const [subjectdata, setSubjectData] = useState([]);
  const [classData , setClassData] = useState([]);

  const fields = [
    { name: "examName", label: "Exam Name", type: "text", required: true },
    { name: "date", label: "Date of Exam", type: "date", required: true },
    { name: "maxMarks", label: "Total Marks", type: "number", required: true },
    { name: "duration", label: "Duration (in hr)", type: "number", required: true },
  ];

  const fetchSubjects = () => {
    axios
      .get("http://localhost:5000/api/subjectsDetails")
      .then((res) =>{
        setSubjectData(
          res.data.data.map((subject) => ({
            value: subject._id,
            label: subject.subjectName,
          }))
        )
      
      })
      .catch((err) => console.error(err));
  };

  const fetchClassData = () => {
    axios
      .get("http://localhost:5000/api/classData")
      .then((res) => {
        if (res.data && res.data.data) {
          setClassData(
            res.data.data.map((classItem) => ({
              value: classItem._id, 
              label: classItem.className, 
            }))
          );
        }
      })
      .catch((error) => console.error("Error fetching class data:", error));
  };  

  const validateField = (name, value) => {
    let errorMsg = "";
    const field = fields.find((f) => f.name === name);

    if (field?.required && !value) {
      errorMsg = `${field.label} is required.`;
    }else if (field?.type === "number" && value < 0) {
      errorMsg = `${field.label} cannot be negative.`;
    } 
    return errorMsg;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    setexamFromData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = fields.reduce((acc, { name }) => {
      const error = validateField(name, examFromData[name]);
      if (error) acc[name] = error;
      return acc;
    }, {});

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    axios
      .post("http://localhost:5000/api/launchExams", examFromData)
      .then((res) => {
        console.log("Response:", res.data);
        showNotification(
          "Success",
          examFromData.examName,
          "has been launched successfully",
          "success"
        );
        communicationService.setAddExamFlag(true);
        setexamFromData({
          classID: null,
          examName: "",
          examType: "", 
          subjectId: null,
          date: "",
          maxMarks: null,
          duration:null,
          modeOfConduct: "",
        });
      })
      .catch((err) => {
        console.error("Error:", err);
        showNotification("Oops", "", "Failed to launch exam", "error");
      });
  };

  const modeOfTest = ["Online","Offline"].map((modes)=>({
    value:modes.toUpperCase(),
    label:modes,
    isDisabled: modes === "Online",
  }))

  const category = ["Weekly", "Unit", "Semester", "End Semester"].map((item)=>({
    value:item,
    label: `${item} Test`
  }))

  const showNotification = (title, examName, message, status) => {
    Swal.fire({
      title: title,
      text: `${examName} ${message}`,
      icon: status,
      confirmButtonText: "Okay",
    });
  };

  return (
    <div className="formContainer">
      <h4 className="form-head">Launch Exam</h4>
      <div className="card-admin1-launchExam">
        <form onSubmit={handleSubmit} className="adminform">
          <div className="form-grid">
            {fields.map(({ name, label, type, required }) => (
              <div key={name}>
                <input
                  style={{ color: "black" }}
                  name={name}
                  value={examFromData[name]}
                  onChange={handleChange}
                  placeholder={label}
                  className="input-admin"
                  type={type}
                  required={required}
                />
                {errors[name] && (
                  <p style={{ color: "red" }} className="error">
                    {errors[name]}
                  </p>
                )}
              </div>
            ))}

            <Select
              options={classData}
              value={classData.find(
                (option) => option.value === examFromData.classID
              )}
              onChange={(selected) =>
                setexamFromData({ ...examFromData, classID: selected.value })
              }
              placeholder="Select class..."
              className="select-admin"
              styles={{
                container: (base) => ({
                  ...base,
                  width: "100%",
                  margin: "5px 0",
                  border: "1px solid #000000",
                  border: "1px solid #000000",
                  borderRadius: "5px",
                  backgroundColor: "rgb(247, 247, 247)",
                }),
                menu: (base) => ({
                  ...base,
                  zIndex: 9999,
                  backgroundColor: "rgb(247, 247, 247)",
                }),
              }}
            />
            <Select
              options={subjectdata}
              value={subjectdata.find(
                (option) => option.value === examFromData.subjectId
              )}
              onChange={(selected) =>
                setexamFromData({ ...examFromData, subjectId: selected.value })
              }
              placeholder="Select subject..."
              className="select-admin"
              styles={{
                container: (base) => ({
                  ...base,
                  width: "100%",
                  margin: "5px 0",
                  border: "1px solid #000000",
                  borderRadius: "5px",
                  backgroundColor: "rgb(247, 247, 247)",
                }),
                menu: (base) => ({
                  ...base,
                  zIndex: 9999,
                  backgroundColor: "rgb(247, 247, 247)",
                }),
              }}
            />
            <Select
            options={category}
            value={category.find(
              (option)=>option.value === examFromData.examType
            )}
            onChange={(selected)=>setexamFromData({...examFromData,examType:selected.value})}
            placeholder="Select Exam Type..."
            className="select-admin"
            styles={{
              container: (base) => ({
                ...base,
                width: "100%",
                margin: "5px 0",
                border: "1px solid #000000",
                borderRadius: "5px",
                backgroundColor: "rgb(247, 247, 247)",
              }),
              menu: (base) => ({
                ...base,
                zIndex: 9999,
                backgroundColor: "rgb(247, 247, 247)",
              }),
            }}
            />
            <Select
            options={modeOfTest}
            value={modeOfTest.find(
              (option)=>option.value === examFromData.modeOfConduct
            )}
            onChange={(selected)=>setexamFromData({...examFromData,modeOfConduct:selected.value})}
            placeholder="Exam Mode"
            className="select-admin"
            styles={{
              container: (base) => ({
                ...base,
                width: "100%",
                margin: "5px 0",
                border: "1px solid #000000",
                borderRadius: "5px",
                backgroundColor: "rgb(247, 247, 247)",
              }),
              menu: (base) => ({
                ...base,
                zIndex: 9999,
                backgroundColor: "rgb(247, 247, 247)",
              }),
            }}
            />

          </div>
          <div className="Submitbutton">
            <button type="submit" className="btn bttn btn-primary">
              SUBMIT
            </button>
          </div>
        </form>
      </div>
      
    </div>
  );
};

export default LaunchExamForm;
