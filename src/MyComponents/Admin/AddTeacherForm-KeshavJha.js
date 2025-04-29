import React, { useState } from 'react';
import axios from 'axios';
import './AddTeachersForm.css';
import TeacherList from './TeacherList';
import Select from 'react-select';
import Swal from 'sweetalert2'
import { communicationService } from '../../Services/updateDBFlagService';

function AddTeachers() {
  const [teacherFormData, setTeacherFormData] = useState({
    teacherPic: null,
    teacherName: '',
    qualification: '',
    subject: '',
    experiance: '',
    status: '',
    type: '',
    classes:[]
  });

  const [errors, setErrors] = useState({});
  const options = [...Array(12)].map((_, i) => ({ value: `Class ${i + 1}`, label: `Class ${i + 1}` }));

  const teacherFields = [
    { name: 'teacherName', label: 'Teacher Name', type: 'text', required: true },
    { name: 'qualification', label: 'Qualification', type: 'text', required: true },
    { name: 'subject', label: 'Teaching Subject', type: 'text', required: true },
    { name: 'experiance', label: 'Years of Experience', type: 'number', required: true },
  ];

  const validateField = (name, value) => {
    let errorMsg = '';
    const field = teacherFields.find((f) => f.name === name);

    if (field && field.required && !value) {
      errorMsg = `${field.label} is required`;
    }
    return errorMsg;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const fieldValue = name === 'teacherPic' ? files[0] : value;
    setErrors({ ...errors, [name]: validateField(name, fieldValue) });
    setTeacherFormData({ ...teacherFormData, [name]: fieldValue });
  };

  const handleClick = () => {
    const newErrors = {};

    teacherFields.forEach(({ name }) => {
      const error = validateField(name, teacherFormData[name]);
      if (error) newErrors[name] = error;
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    const formData = new FormData();
    Object.entries(teacherFormData).forEach(([key, value]) => {
      if (key === 'teacherPic' && value instanceof File) {
        formData.append(key, value); 
      } else {
        formData.append(key, value); 
      }
    });

    axios
      .post('http://localhost:5000/api/teachers', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => {
        const { message } = res.data;
        if (message === 'Added_successfully') {
          showNotification(
            'Teacher Added',
            `${teacherFormData.teacherName}`,
            'Successfully Added',
            'success'
          );
          communicationService.setAddTeacherFlag(true);
          // window.location.reload();
          // Cookies.set('teacherAdded', 'true', { expires: 1 }); 
          // Cookies.set('teacherAdded', 'true'); 
        }
      })
      .catch((err) => {
        console.log(err)
        showNotification('Oops',
          `${teacherFormData.teacherName}`,
          'Something went wrong!',
          'error'
        );
      });
  };

  const showNotification = (title, TeacherName, message , status) => {
    if(status == 'success'){
      Swal.fire({
        title: title,
        text: `${TeacherName} ${message}`,
        icon: status,
        confirmButtonText: 'Okay'
      });
    }else if(status == 'error'){
      Swal.fire({
        title: title,
        text: `${message}`,
        icon: status,
        confirmButtonText: 'Okay'
      });
    }
  };

  return (
    <div className="card-admin1">
      <h4 style={{ color: 'white' }}>Add Teachers</h4>
      <div className="adminform">
        <div className="form-grid">
       
          {teacherFields.map(({ name, label, type, required }) => (
            <div key={name}>
              <input
                name={name}
                value={teacherFormData[name]}
                onChange={handleChange}
                placeholder={label}
                className="input-admin"
                type={type}
                required={required}
              />
              {errors[name] && (
                <p style={{ color: 'red' }} className="error">
                  {errors[name]}
                </p>
              )}
            </div>
          ))}
          
           <input
          type="file"
          name="teacherPic"
          className="input-admin-file"
          onChange={handleChange}
        />
          <select
            value={teacherFormData.status}
            onChange={(e) =>
              setTeacherFormData({ ...teacherFormData, status: e.target.value })
            }
            className="select-admin"
          >
            <option value="">Status</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="BLOCK">BLOCK</option>
            <option value="DELETE">DELETE</option>
          </select>
          <select
            value={teacherFormData.type}
            onChange={(e) =>
              setTeacherFormData({ ...teacherFormData, type: e.target.value })
            }
            className="select-admin"
          >
            <option value="">Type</option>
            <option value="ClassTeacher">Class Teacher</option>
            <option value="SubjectTeacher">Subject Teacher</option>
            <option value="AssistantTeacher">Assistant Teacher</option>
          </select>
          <Select
          isMulti
          options={options}
          value={teacherFormData.classes.map(c => ({ value: c, label: c }))}
          onChange={(selected) => setTeacherFormData({ ...teacherFormData, classes: selected.map(s => s.value) })}
          className="select-admin"
          styles={{
            container: (base) => ({ ...base, width: '100%',
              margin:'0px 0px ',
              border:'1px solid #000000',
              borderRadius: '5px',
              backgroundColor : 'transparent'
             }),
            menu: (base) => ({ ...base, zIndex: 9999,
              backgroundColor:'rgb(247, 247, 247)'
             }),
          }}
        />
        </div>
        <div className='Submitbutton'>
        <button onClick={handleClick} className="btn bttn btn-primary">
          SUBMIT
        </button>
        </div>
        <div className="teacherlist">
          <TeacherList />
        </div>
      </div>
    </div>
  );
}

export default AddTeachers;
