import React, {useState ,useEffect} from 'react';
import axios from 'axios';
import './AddNoticeForm.css';
import Swal from 'sweetalert2'
import { FaTrash, FaEye, FaEdit } from 'react-icons/fa';
import { communicationService } from '../../Services/updateDBFlagService';
const TeacherList = () => {
  const [data, setData] = useState([]); 
  const [subjectdata,setSubjectData] = useState([]);
  const [showReload, setShowReload] = useState(false);


    useEffect(() => {
        // Fetch notices data from the server
        fetchTeachers();
        fetchSubjects();
        // const teacherAddedFlag = Cookies.get('teacherAdded');
        // setShowReload(teacherAddedFlag === 'true');
        communicationService.addedTeacher$.subscribe((flag)=>{
          if(flag){
            setShowReload(flag)
          }else{
            setShowReload(false)
          }
        })
      }, []);

      const fetchTeachers=()=>{
        axios.get('http://127.0.0.1:5000/api/teachers')
        .then(res => {
          setData(res.data.data);
        })
        .catch(err => {
          console.log(err);
        });
      }

      const fetchSubjects = () => {
        axios
          .get("http://127.0.0.1:5000/api/subjectsDetails")
          .then((res) => {
            const formattedSubjects = res.data.data.map((subject) => ({
              value: subject._id,
              label: subject.subjectName,
            }));
            setSubjectData(formattedSubjects);
          })
          .catch((err) => console.error("Error fetching subjects:", err));
      };

      const confirmDelete = (teacherId)=>{
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
                  handleDelete(teacherId);
                }
              });
      }
      
      const handleDelete = (teacherId) => {
        axios
          .delete(`http://127.0.0.1:5000/api/teachers/${teacherId}`)
          .then((res) => {
            let message = res.data.message
            console.log('teacher:-',res.data)
            if(message ==='Teacher_deleted_successfully'){
              showNotification('Delete Teacher', res.data.deleted_teacher,'successfully Removed','success');
            }else if(message == 'Teacher_not_found'){
              showNotification('Oops', res.data.deleted_teacher,'Something went wrong while removing','error');
            }
            setData(prevData => prevData.filter(item => item._id !== teacherId));  
            //window.location.reload();
          })
          .catch((err) => {
            console.log(err);
            showNotification('Oops', res.data.deleted_teacher,'Something went wrong while removing','error');
          });
      };
      const handleReload = () => {
        fetchTeachers();    
        // Cookies.remove('teacherAdded');
        setShowReload(false);
      };
      const classOptions = [...Array(12)].map((_, i) => ({
        value: `Class ${i + 1}`,
        label: `Class ${i + 1}`,
      }));

      const handleEdit = async (teacher) => {
        const SubjectsOptionsHTML = subjectdata.reduce((acc, option) => {
          const selected = (teacher.subject || []).includes(option.value)
            ? "selected"
            : "";
          return (
            acc +
            `<option value="${option.value}" ${selected}>${option.label}</option>`
          );
        }, "");
      
        const classOptionsHTML = classOptions.reduce((acc, option) => {
          const selected = (teacher.classes || []).includes(option.value)
            ? "selected"
            : "";
          return acc + `<option value="${option.value}" ${selected}>${option.label}</option>`;
        }, "");
      
        const { value: formValues } = await Swal.fire({
          title: "Edit Teacher",
          html: `
                  <label for="teacherName" style="display: block; text-align: left;">Teacher Name</label>
                  <input id="teacherName" class="swal2-input" value="${teacher.teacherName || ""}">
      
                  <label for="qualification" style="display: block; text-align: left;">Qualification</label>
                  <input id="qualification" class="swal2-input" value="${teacher.qualification || ""}">
                  
                  <label for="experiance" style="display: block; text-align: left;">Years of Experience</label>
                  <input id="experiance" class="swal2-input" value="${teacher.experiance || ""}">
      
                  <label for="status" style="display: block; text-align: left;">Select Status:</label>
                  <select id="status" class="status-dropdown">
                    <option value="ACTIVE" ${teacher.status === "ACTIVE" ? "selected" : ""}>ACTIVE</option>
                    <option value="BLOCK" ${teacher.status === "BLOCK" ? "selected" : ""}>BLOCK</option>
                    <option value="DELETE" ${teacher.status === "DELETE" ? "selected" : ""}>DELETE</option>
                  </select>
      
                  <label for="type" style="display: block; text-align: left;">Select Type:</label>
                  <select id="type" class="type-dropdown">
                    <option value="ClassTeacher" ${
                      teacher.type === "ClassTeacher" ? "selected" : ""
                    }>Class Teacher</option>
                    <option value="SubjectTeacher" ${
                      teacher.type === "SubjectTeacher" ? "selected" : ""
                    }>Subject Teacher</option>
                    <option value="AssistantTeacher" ${
                      teacher.type === "AssistantTeacher" ? "selected" : ""
                    }>Assistant Teacher</option>
                  </select>
      
                  <p style="display: block; text-align: left; font-size: 15px; margin:10px;color:red">Note: for multiple select 'Ctrl + select'</p>
      
                  <label for="subject" style="display: block; text-align: left;">Select Subjects:</label>
                  <select id="subject" class="subject-dropdown" multiple>
                    ${SubjectsOptionsHTML}
                  </select>
      
                  <label for="classes" style="display: block; text-align: left;">Select Classes:</label>
                  <select id="classes" class="classes-dropdown" multiple>
                    ${classOptionsHTML}
                  </select>
      
                  <label for="file-upload" style="display: block; text-align: left;">Upload Picture:</label>
                  <input style="display: block; text-align: left;" type="file" id="myFile" name="filename">
              `,
          focusConfirm: false,
          showCancelButton: true,
          confirmButtonText: "Save Changes",
          preConfirm: () => {

            const teacherName = document.getElementById("teacherName").value;
            const qualification = document.getElementById("qualification").value;
            const experience = document.getElementById("experiance").value;
            const status = document.getElementById("status").value;
            const type = document.getElementById("type").value;
      
            const subjects = Array.from(
              document.getElementById("subject").selectedOptions
            ).map((opt) => opt.value);
      
            const classes = Array.from(
              document.getElementById("classes").selectedOptions
            ).map((opt) => opt.value);
      
            const fileInput = document.getElementById("myFile");
            const teacherPic = fileInput.files[0]; // Capture the selected file
      
            if (!teacherName || !qualification || !experience || !status || !type) {
              Swal.showValidationMessage("All fields are required!");
              return null;
            }
      
            return {
              teacherName,
              qualification,
              experience,
              status,
              type,
              subjects,
              classes,
              teacherPic,
            };
          },
        });
      
        if (formValues) {

          try{
            console.log(teacher._id)
            console.log(formValues)
            const response = await axios.put(
              `http://127.0.0.1:5000/api/teachers/update/${teacher._id}`,
              formValues,
              { headers: { "Content-Type": "multipart/form-data" } }
            );
            Swal.fire({
              icon: "success",
              title: "Teacher updated successfully!",
              text: response.data.message,
            });
      
            fetchTeachers();
          }catch(error){
            Swal.fire({
              icon: "error",
              title: "Update Failed",
              text:
                error.response?.data?.message || "An error occurred while updating the teacher.",
            });
          }
        }
      };
      
      const showNotification = (title, teacherName, message , status) => {
        if(status == 'success'){
          Swal.fire({
            title: title,
            text: `${teacherName} ${message}`,
            icon: status,
            confirmButtonText: 'Okay'
          });
        }else if(status == 'error'){
          Swal.fire({
            title: title,
            text: `${message} ${teacherName}`,
            icon: status,
            confirmButtonText: 'Okay'
          });
        }
      };
  return (
    
       <div className='wrapper'>  
       <div style={{display:'flex',justifyContent:'space-between'}}>
       <h4 style={{ color: 'white' }}>Teachers List</h4>
       {showReload && (
        <button onClick={handleReload} className="reload-button">
          <i
            className="fa-solid fa-rotate-right"
            style={{ color: '#9e9e9e', fontSize: '20px', marginRight: '8px' }}
          ></i>
          Reload
        </button>
      )}
       </div>
       {
       data.length > 0 ?(
        data.map((teacher) => (
          <div key={teacher._id} className="notice-item">
            <span >{teacher.teacherName}</span>
          <div className='btns'>
            <button  className='view-button' onClick={() => {/*handleDelete(teacher._id)*/}}> <div className='icons'><FaEye size={20} color="black" /></div>View</button>
            <button  className='edit-button' onClick={() => handleEdit(teacher)}>  <div className='icons'><FaEdit size={20} color="white" /></div>Edit</button>
            <button  className='delete-button' onClick={() => confirmDelete(teacher._id)}><div className='icons'><FaTrash size={20} color="white" /></div> Delete</button>
          </div>
          </div>
        ))
       ):(
      
          <div className="no-teachers">
        <p style={{ color: 'white', fontSize: '18px', textAlign: 'center' ,color:'red'}}>
          No teachers available at the moment!
        </p>
      </div>
      
       )
}
      </div>
    
  )
}

export default TeacherList
