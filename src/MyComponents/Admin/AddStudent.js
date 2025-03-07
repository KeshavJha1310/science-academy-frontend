import axios from 'axios'
import { useState } from 'react'
import Swal from 'sweetalert2'
import './AddStudentsForm.css'
// import { useNavigate } from 'react-router-dom'

function AddStudents() {
  // const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: '',
    password: '',
    className: '',
    StudentLoginPassword: '',
    StudentLoginID: '',
    fatherName: '',
    motherName: '',
    contactNo: '',
    schoolName: '',
    addmissionDate: '',
    studentAddress: '',
    status: '',
    type: '',
    gender: '',
    sections: '',
    imgFile: null,
  });

  const [errors, setErrors] = useState({});

  const fields = [
    { name: 'userName', label: 'Student Full Name', type: 'text', required: true },
    { name: 'fatherName', label: 'Father Name', type: 'text', required: true },
    { name: 'motherName', label: 'Mother Name', type: 'text', required: true },
    { name: 'contactNo', label: 'Contact Number', type: 'text', required: true, pattern: /^\d{10}$/ },
    { name: 'studentAddress', label: 'Student Address', type: 'text', required: true },
    { name: 'schoolName', label: 'School Name', type: 'text', required: true },
    { name: 'addmissionDate', label: 'Admission Date (dd/mm/yyyy)', type: 'date', required: true },
    { name: 'className', label: 'Class ID', type: 'text', required: true },
    { name: 'password', label: 'Class Password', type: 'password', required: true },
    { name: 'StudentLoginID', label: 'Login ID', type: 'text', required: true },
    { name: 'StudentLoginPassword', label: 'Login Password', type: 'password', required: true },
    { name: 'imgFile', label: 'Student Image', type: 'file', required: true },
  ];

  const validateField = (name, value) => {
    let errorMsg = '';
    const field = fields.find(f => f.name === name);

    if (field.required && !value) errorMsg = `${field.label} is required`;
    else if (field.pattern && !field.pattern.test(value)) errorMsg = `Invalid ${field.label}`;

    return errorMsg;
  };


const handleChange = (e) => { 
  const { name, value, files } = e.target;
  const fieldValue = name === 'imgFile' ? files[0] : value;

  setErrors({ ...errors, [name]: validateField(name, fieldValue) });
  setFormData({ ...formData, [name]: fieldValue });
};


  const handleClick = () => {
    const newErrors = {};
    fields.forEach(({ name }) => {
      const error = validateField(name, formData[name]);
      if (error) newErrors[name] = error;
    });
  
    setErrors(newErrors);
  
    if (Object.keys(newErrors).length > 0) {
      console.error("Form validation failed:", newErrors);
      return;
    }
  
    const formDataObj = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formDataObj.append(key, value);
      } else {
        console.warn(`Key "${key}" has an invalid value:`, value);
      }
    });
  
    console.log("Submitting formDataObj with data:", Array.from(formDataObj.entries()));
  
    axios
      .post('http://127.0.0.1:5000/api/students', formDataObj , {
        headers: {
          'Content-Type': 'multipart/form-data',  
        }
  })
      .then(res => {
        const { message } = res.data;
        if (message === 'Added_successfully') {
          showNotification('Student Added', `${formData.userName}`, 'successfully added','success');
        }
      })
      .catch(err =>{ 
        console.error("Error submitting form:", err)
        showNotification('Oops',`${formData.userName}`,'Something went wrong!','error')
      });
  };
  
  const showNotification = (title, className, message , status) => {
    if(status == 'success'){
      Swal.fire({
        title: title,
        text: `${className} ${message}`,
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
    <div className='AdminPanel'>
      <div className='card-admin1-addTeacher'>
        <h4 style={{ color: 'white' }}>Add Students</h4>
        <div className='adminform form-grid'>
          {fields.map(({ name, label, type  ,required}) => (
            <div key={name}>
              <input
                style={{ color: 'black' }}
                name={name}
                value={type === 'file' ? undefined : formData[name]}
                onChange={handleChange}
                placeholder={label}
                className={type === 'file' ? 'input-admin-file' : 'input-admin'}
                type={type}
                required={required}
              />
              {errors[name] && <p style={{color:'red'}} className="error">{errors[name]}</p>}
            </div>
          ))}

          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className='select-admin'
          >
            <option value='' >Type</option>
            <option value='STUDENT' >STUDENT</option>
            {/* <option value='TEACHER'>TEACHER</option> */}
          </select>

          <select
            value={formData.gender}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            className='select-admin'
          >
            <option value='' >Gender</option>     
            <option value='Male' >Male</option>
            <option value='Female' >Female</option>
            <option value='Others' >Others</option>
          </select>
          <select
            value={formData.sections}
            onChange={(e) => setFormData({ ...formData, sections: e.target.value })}
            className='select-admin'
          >
            <option value=''>Sections</option>
            {[...Array(12)].map((_, i) => (
              <option key={i} value={`Class ${i + 1}`}>Class {i + 1}</option>
            ) )}
          </select>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className='select-admin'
          >
            <option value=''>Status</option>
            <option value='ACTIVE'>ACTIVE</option>
            <option value='BLOCK'>BLOCK</option>
            <option value='DELETE'>DELETE</option>
          </select>
        <button onClick={handleClick} className='btn btn-primary' style={{ margin: '10px 0px 8px 0px', width: '15em' }}>
          SUBMIT
        </button>
        </div>
      </div>
    </div>
  )
}

export default AddStudents