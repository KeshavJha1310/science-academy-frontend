import axios from 'axios'
import { useState } from 'react'
import './AddStudentsForm.css'
// import { useNavigate } from 'react-router-dom'

function AddStudents() {
  // const navigate = useNavigate();
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [className, setClassName] = useState('');
  const [StudentLoginPassword, setStudentLoginpassword] = useState('');
  const [StudentLoginID, setStudentLoginID] = useState('');
  const [fatherName, setfatherName] = useState('');
  const [motherName, setmotherName] = useState('');
  const [contactNo, setcontactNo] = useState('');
  const [schoolName, setschoolName] = useState('');
  const [addmissionDate, setaddmissionDate] = useState('');
  const [studentAddress, setStudentAddress] = useState('')
  const [status, setStatus] = useState('');
  const [type, setType] = useState('');
  const [gender, setGender] = useState('');
  const [sections, setSection] = useState('');
  const [imgFile, setImgFile] = useState(null);

  const handleSingleFileChange = (e) => {
    const file = e.target.files[0];
    setImgFile(file); // Update imgFile state with the selected file

    // Create a FileReader to read the file as a data URL and set it to the image element for preview
    const reader = new FileReader();

    reader.readAsDataURL(file);
  };

  const handleClick = () => {
    const formData = new FormData()
    if (imgFile) {
      formData.append('StudentPic', imgFile);
    }
    formData.append('StudentName', userName)
    formData.append('StudentFatherName', fatherName)
    formData.append('StudentMotherName', motherName)
    formData.append('StudentContactNumber', contactNo)
    formData.append('StudentClassId', className)
    formData.append('StudentClassPassword', password)
    formData.append('StudentLoginId', StudentLoginID)
    formData.append('StudentLoginPassword', StudentLoginPassword)
    formData.append('StudentAddmissionDate', addmissionDate)
    formData.append('SchoolName', schoolName)
    formData.append('StudentAddress', studentAddress)
    formData.append('status', status)
    formData.append('type', type)
    formData.append('Gender', gender)
    formData.append('Class', sections)

    axios.post('http://127.0.0.1:5000/api/students', formData)
      .then(res => {
        console.log(res.data.data)

        const { message } = res.data;
        console.log(message)
        if (message === 'Added_successfully') {

          showNotification('Student', `${userName}`, 'successfully added');
          window.location.reload();
        }
        //  window.location.reload();
      })
      .catch(err => {
        console.log(err)
      })
  };
  const showNotification = (title, className, message) => {
    if ('Notification' in window) {
      // Check if the browser supports notifications
      if (Notification.permission === 'granted') {
        // If permission is granted, show the notification
        new Notification(title, { body: `${className} ${message}` });
      } else if (Notification.permission !== 'denied') {
        // Request permission from the user
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            new Notification(title, { body: `${className} ${message}` });
          }
        });
      }
    }
  };
  return (
    <div className='AdminPanel'>
      <div className='card-admin1'>
        <h4 style={{ color: 'white', marginTop: '20%' }}>Add Students</h4>
        <div className='adminform form-grid'>
          <input
            style={{ color: 'black' }}
            value={userName}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Student-Full-Name'
            className='input-admin'
            type='text'
          />
          <input
            style={{ color: 'black' }}
            value={fatherName}
            onChange={(e) => setfatherName(e.target.value)}
            placeholder='Student-Father-Name'
            className='input-admin'
            type='text'
          />
          <input
            style={{ color: 'black' }}
            value={motherName}
            onChange={(e) => setmotherName(e.target.value)}
            placeholder='Student-Mother-Name'
            className='input-admin'
            type='text'
          />
          <input
            style={{ color: 'black' }}
            value={contactNo}
            onChange={(e) => setcontactNo(e.target.value)}
            placeholder='Student/Parents-Contact-Number'
            className='input-admin'
            type='text'
          />
          <input
            style={{ color: 'black' }}
            value={studentAddress}
            onChange={(e) => setStudentAddress(e.target.value)}
            placeholder='Student Address'
            className='input-admin'
            type='text'
          />
          <input
            style={{ color: 'black' }}
            value={schoolName}
            onChange={(e) => setschoolName(e.target.value)}
            placeholder='School Name'
            className='input-admin'
            type='text'
          />
          <input
            style={{ color: 'black' }}
            value={addmissionDate}
            onChange={(e) => setaddmissionDate(e.target.value)}
            placeholder='AddmissionDate-dd/mm/yyyy'
            className='input-admin'
            type='text'
          />
          <input
            style={{ color: 'black' }}
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            placeholder='Student-Class-Id'
            className='input-admin'
            type='text'
          />
          <input
            style={{ color: 'black' }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Student-Class-Password'
            className='input-admin'
            type='password'
          />
          <input
            style={{ color: 'black' }}
            value={StudentLoginID}
            onChange={(e) => setStudentLoginID(e.target.value)}
            placeholder='Student-Login-Id'
            className='input-admin'
            type='text'
          />
          <input
            style={{ color: 'black' }}
            value={StudentLoginPassword}
            onChange={(e) => setStudentLoginpassword(e.target.value)}
            placeholder='Student-Login-Password'
            className='input-admin'
            type='password'
          />
                 <input
            // Remove the value attribute to avoid the error
            onChange={handleSingleFileChange}
            placeholder="Select the image"
            className="input-admin"
            type="file"

          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className='select-admin'
          >
            <option >Status</option>
            <hr></hr>
            <option >ACTIVE</option>
            <option >BLOCK</option>
            <option >DELETE</option>
          </select>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className='select-admin'
          >
            <option >Type</option>
            <hr></hr>
            <option >STUDENT</option>
            {/* <option >TEACHER</option> */}
          </select>

          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className='select-admin'
          >
            <option >Gender</option>
            <hr></hr>
            <option >Male</option>
            <option >Female</option>
            <option >Others</option>
          </select>
          <select
            value={sections}
            onChange={(e) => setSection(e.target.value)}
            className='select-admin'
          >
            <option >Sections</option>
            <hr></hr>
            <option >Class 1</option>
            <option >Class 2</option>
            <option >Class 3</option>
            <option >Class 4</option>
            <option >Class 5</option>
            <option >Class 6</option>
            <option >Class 7</option>
            <option >Class 8</option>
            <option >Class 9</option>
            <option >Class 10</option>
            <option >Class 11</option>
            <option >Class 12</option>
            {/* <option ></option> 
          <option ></option>*/}
          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className='select-admin'
          >
            <option >Status</option>
            <hr></hr>
            <option >ACTIVE</option>
            <option >BLOCK</option>
            <option >DELETE</option>
          </select>
   
          <button onClick={handleClick} className='btn btn-primary'>
            SUBMIT
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddStudents