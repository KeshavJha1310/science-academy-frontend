import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SubjectDetails.css';
import Swal from 'sweetalert2'
import { FaTrash, FaEye, FaEdit } from 'react-icons/fa';
import SlimSelect from "slim-select";
import Select from "react-select";


const SubjectDetails = ()=>{
    const [subjectdata,setSubjectData] = useState([]);
    const [editSubjectData, setEditSubjectData] = useState({});
    const [subjectTeacher, setSubjectTeacher] = useState([]);
    
    const [formData, setFormData] = useState({
        subjectName: "",
        aboutSubject: "",
        classes: [],
        subject_teacher: [],
      });
      
      useEffect(()=>{
          fetchSubjects();
          fetchTeachers();
      },[]);

      const classOptions = [...Array(12)].map((_, i) => ({
        value: `Class ${i + 1}`,
        label: `Class ${i + 1}`,
      }));

      const fetchSubjects = () => {
        axios
          .get('http://localhost:5000/api/subjectsDetails')
          .then((res) => setSubjectData(res.data.data))
          .catch((err) => console.error(err));
      };

      const fetchTeachers = ()=>{
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

      const handleEdit = async (subject) => {
        const classOptionsHTML = classOptions.reduce((acc, option) => {
          const selected = (subject.classes || []).includes(option.value) ? "selected" : "";
          return acc + `<option value="${option.value}" ${selected}>${option.label}</option>`;
        }, "");
      
        const teacherOptionsHTML = subjectTeacher.reduce((acc, teacher) => {
          const selected = (subject.assignedTeachers.map((t) => t._id) || []).includes(teacher.value)
            ? "selected"
            : "";
          return acc + `<option value="${teacher.value}" ${selected}>${teacher.label}</option>`;
        }, "");
      
        const { value: formValues } = await Swal.fire({
          title: "Edit Subject",
          html: `
            <label for="subjectName" style="display: block; text-align: left;">Subject Name</label>
            <input id="subjectName" class="swal2-input" value="${subject.subjectName || ""}">
        
            <label for="description" style="display: block; text-align: left;">Description</label>
            <input id="description" class="swal2-input" value="${subject.subjectDescription || ""}">

            <p style="display: block; text-align: left; font-size: 15px; margin:10px;color:red">Note: for multiple select 'Ctrl + select'</p>

            <label for="classes" style="display: block; text-align: left;">Classes</label>
            <select id="classes" multiple>
                ${classOptionsHTML}
            </select>
        
            <label for="subjectTeacher" style="display: block; text-align: left;">Assign Teachers</label>
            <select id="subjectTeacher" multiple>
                ${teacherOptionsHTML}
            </select>
          `,
          focusConfirm: false,
          showCancelButton: true,
          confirmButtonText: "Save Changes",
          preConfirm: () => {
            const subjectName = document.getElementById("subjectName").value;
            const subjectDescription = document.getElementById("description").value;
      
            const classes = Array.from(
              document.getElementById("classes").selectedOptions
            ).map((opt) => opt.value);
      
            const assignedTeachers = Array.from(
              document.getElementById("subjectTeacher").selectedOptions
            ).map((opt) => opt.value);
      
            if (!subjectName || !subjectDescription) {
              Swal.showValidationMessage("Subject name and description are required!");
              return null;
            }
      
            return { subjectName, subjectDescription, classes, assignedTeachers };
          },
        });
      
        if (formValues) {
          try {
            console.log("formVlues :- ",formValues)
            // API call to update the subject
            const response = await axios.put(`http://localhost:5000/api/subjects/${subject._id}`, formValues);
            Swal.fire({
              icon: "success",
              title: "updated successfully!",
              text: `${response.data.data} Added`,
            });
      
            fetchSubjects();
          } catch (error) {
            Swal.fire({
              icon: "error",
              title: "Update Failed",
              text: error.response?.data?.message || "An error occurred while updating the subject.",
            });
          }
        }
      };

      const handleDelete = (subjectId)=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                deleteSubect(subjectId);
            }
          });
      }
          
      const deleteSubect=(subjectId)=>{
            axios
            .delete(`http://localhost:5000/api/subjects/${subjectId}`)
            .then((res)=>{
                Swal.fire({
                    icon: "success",
                    title: "Delete Subject",
                    text: `${res.data.message}`,
                  });
                  fetchSubjects();
            })
            .catch((error)=>{
                console.error(error)
                Swal.fire({
                    icon: "error",
                    title: "Delete Subject",
                    text: `${error}`,
                  });
            })
      }

          return(
            <div className="wrapper">
      <h4 style={{ color: 'white', textAlign: 'center', marginBottom: '20px' }}>Subject Details</h4>
      <div className='card-container'>
      {subjectdata.length > 0 ? (
        subjectdata.map((subjects) => (
        <div key={subjects._id} className="subject-card">
        <div className="subject-card-header">
          <h5>{subjects.subjectName}</h5>
        </div>
        <div className="subject-card-body">
          <p><strong>Description:</strong> {subjects.subjectDescription || 'No description available'}</p>
          <p><strong>Classes:</strong> {subjects.classes.join(', ')}</p>
          <p><strong>Teachers:</strong> {subjects.assignedTeachers.map((teacher) => teacher.teacherName).join(', ')}</p>
        </div>
        <div className="subject-card-footer">
          {/* <button className="view-button" onClick={() => handleView(subjects._id)}>
            <FaEye size={16} /> View
          </button> */}
          <button className="edit-button" onClick={() => handleEdit(subjects)}>
            <FaEdit size={16} /> Edit
          </button>
          <button className="delete-button" onClick={() => handleDelete(subjects._id)}>
            <FaTrash size={16} /> Delete
          </button>
        </div>
 
      </div>
    ))
) : (
    <div className="no-subjects">
      <p>No Subjects available at the moment!</p>
    </div>
  )}
  </div>
</div>

          )
}

export default SubjectDetails



