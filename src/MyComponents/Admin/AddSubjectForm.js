import React, { useState, useEffect } from "react";
import "./AddSubjectForm.css";
import "./AddStudentsForm.css";
import Swal from "sweetalert2";
import Select from "react-select";
import axios from "axios";
import SubjectDetails from './SubjectDetails';


const AddSubjectForm = () => {
  const [subjectTeacher, setSubjectTeacher] = useState([]);
  const [formData, setFormData] = useState({
    subjectName: "",
    aboutSubject: "",
    classes: [],
    subject_teacher: [],
  });
  const [errors, setErrors] = useState({});

  // Fetch teachers from API
  useEffect(() => {
    fetchTeacher();
  }, []);

  const fetchTeacher =() =>{
    axios
    .get("http://localhost:5000/api/teachers")
    .then((res) => {
      const formattedTeachers = res.data.data.map((teacher) => ({
        value: teacher._id,
        label: teacher.teacherName,
      }));
      setSubjectTeacher(formattedTeachers);
    })
    .catch((err) => {
      console.error("Error fetching teachers:", err);
    });
  }

  // Class options
  const classOptions = [...Array(12)].map((_, i) => ({
    value: `Class ${i + 1}`,
    label: `Class ${i + 1}`,
  }));

  // Input fields metadata
  const fields = [
    { name: "subjectName", label: "Subject Name", type: "text", required: true },
    { name: "aboutSubject", label: "About Subject", type: "text", required: false },
  ];

  // Field validation
  const validateField = (name, value) => {
    let errorMsg = "";
    const field = fields.find((f) => f.name === name);

    if (field?.required && !value) {
      errorMsg = `${field.label} is required.`;
    }
    return errorMsg;
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Validation
    const validationErrors = fields.reduce((acc, { name }) => {
      const error = validateField(name, formData[name]);
      if (error) acc[name] = error;
      return acc;
    }, {});
  
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  
    axios
      .post("http://localhost:5000/api/subjects", formData)
      .then((res) => {
        console.log("Response:", res.data);
        showNotification(
          "Success",
          formData.subjectName,
          "has been added successfully",
          "success"
        );
        setFormData({
          subjectName: "",
          aboutSubject: "",
          classes: [],
          subject_teacher: [],
        }); // Reset form
      })
      .catch((err) => {
        console.error("Error:", err);
        showNotification("Oops", "", "Failed to add subject", "Something went wrong!");
      });
  };
  

  const showNotification = (title, className, message, status) => {
    Swal.fire({
      title: title,
      text: `${className} ${message}`,
      icon: status,
      confirmButtonText: "Okay",
    });
    fetchTeacher();
  };

  return (
    <div className="formContainer">
      <h4 className="form-head">Add New Subject</h4>
      <div className="card-admin1-addSubject">
        <form onSubmit={handleSubmit} className="adminform">
          <div className="form-grid">
            {fields.map(({ name, label, type, required }) => (
              <div key={name}>
                <input
                  style={{ color: "black" }}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  placeholder={label}
                  className="input-admin"
                  type={type}
                  required={required}
                />
                {errors[name] && <p style={{ color: "red" }} className="error">{errors[name]}</p>}
              </div>
            ))}

            <Select
              isMulti
              options={classOptions}
              value={formData.classes.map((c) => ({
                value: c,
                label: c,
              }))}
              onChange={(selected) =>
                setFormData({ ...formData, classes: selected.map((s) => s.value) })
              }
              placeholder="Select classes..."
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

            {/* Teacher Selection */}
            <Select
              isMulti
              options={subjectTeacher}
              value={formData.subject_teacher.map((id) =>
                subjectTeacher.find((teacher) => teacher.value === id)
              )}
              onChange={(selected) =>
                setFormData({ ...formData, subject_teacher: selected.map((s) => s.value) })
              }
              placeholder="Assign Teachers..."
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

          {/* Submit Button */}
          <div className="Submitbutton">
            <button type="submit" className="btn bttn btn-primary">
              SUBMIT
            </button>
          </div>
        </form>
      </div>
      <SubjectDetails/>
    </div>
  );
};

export default AddSubjectForm;
