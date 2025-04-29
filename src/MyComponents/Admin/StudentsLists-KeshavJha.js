import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StudentsList.css';
// import './AddNoticeForm.css'
// import '../Boards.css';
import Navbar2 from './NavbarAdmin';
import Sidebar from './AdminSideBar';
import Boards from '../Boards';
// import AOS from 'aos';
// import 'aos/dist/aos.css';


const StudentsLists = () => {
  const [students, setStudents] = useState([]);
  const [primaryStudents, setPrimaryStudents] = useState([])
  const [secondaryStudents, setSecondaryStudents] = useState([])
  const [boardstudents, setBoardstudents] = useState([])
  const [higher, setHigherStudents] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  console.log(searchQuery)

  useEffect(() => {
    // Fetch student data from the server
    axios.get('http://localhost:5000/api/studentsList')
      .then(res => {
        const fetchedStudents = res.data.data;
        if (Array.isArray(fetchedStudents)) {

          setStudents(fetchedStudents);

        } else if (typeof fetchedStudents === 'object') {
          // If fetchedStudents is an object, convert it to an array (if necessary) and set the students state
          const studentArray = Object.values(fetchedStudents);
          setStudents(studentArray);
        } else {
          console.error('Fetched data is not an array :---', fetchedStudents);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    // After students state is updated, process the data
    const UpdatedPrimaryStudents = getPrimaryStudents(students);
    setPrimaryStudents(UpdatedPrimaryStudents);
    const UpdatedSecondaryStudents = getSecondaryStudents(students);
    setSecondaryStudents(UpdatedSecondaryStudents);
    const UpdatedBoardsStudents = getBoardsStudent(students);
    setBoardstudents(UpdatedBoardsStudents);
    const UpdatedHigherStudents = getHigherStudent(students);
    setHigherStudents(UpdatedHigherStudents);
  }, [students]);

  function getPrimaryStudents(students) {
    // Filter students based on their class

    return students.filter(student => {
      // Assuming student.Class.ClassStd contains the class information
      const classStd = parseInt(student.Class.ClassStd.replace("Class ", ""));
      // Check if the class is between 1 and 4
      return classStd >= 1 && classStd <= 4;
    });
  }
  const cardimg = {
    maxWidth: '100px',
    maxHeight: '100px',
    margin: '10px',
  };

  function getSecondaryStudents(students) {
    // console.log("Entering into the Secondary function")
    return students.filter(student => {
      const classStd = parseInt(student.Class.ClassStd.replace("Class ", " "));
      return classStd >= 5 && classStd <= 9;
    })
  }

  function getBoardsStudent(students) {
    // console.log("Entering into the Boards function")
    return students.filter(student => {
      const classStd = parseInt(student.Class.ClassStd.replace("Class ", " "));
      return classStd == 10;
    })
  }

  function getHigherStudent(students) {
    // console.log("Entering into the higher function")
    return students.filter(student => {
      const classStd = parseInt(student.Class.ClassStd.replace("Class ", " "));
      return classStd >= 11 && classStd <= 12
    })
  }

  // const filteredStudents = students.filter(students => students.StudentName.toLowerCase().includes(searchQuery.toLowerCase()));
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value)
  }

  // console.log(students)
  // console.log("this is primary:----", primaryStudents)
  // console.log("this is secondary----", secondaryStudents)
  // console.log("this is boards:----", boardstudents)
  // console.log("this is higher:----", higher)

  return (
    <div className='AdminPanel'>
      <Navbar2 />
      <div className='sidebar'>
        <Sidebar />
      </div>
        <div className='SearchBar'>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchInputChange}
            className='searchInput'
            />
        </div>
      <div className='StudentsList' >
        <span className='heading' style={{ marginBottom: '20px', fontSize: '30px', color: 'white' }}>Primary Section</span>
        <hr className='underline' />
        <div className='Primary'>
          {primaryStudents.length > 0 ? (
            primaryStudents.filter(
              (res_student) => {
                const res = searchQuery.toLowerCase() === "" ? res_student
                  : (res_student.StudentName.toLowerCase().includes(searchQuery));
                console.log("loging res :--- ", res)
                return res
              }
            ).map((student) => (
              <div class="cardlist" key={student.id} >
                <img src={`http://localhost:5000/${student.StudentPic}`} class="card-img-top" alt="students" style={cardimg} />
                <div class="card-body">
                  <h5 class="card-title" style={{ color: '#dadada', wordWrap: 'break-word', whiteSpace: 'normal', overflow: 'hidden', maxWidth: '200px', fontSize: '16px' }}>{student.StudentName}</h5>
                  {/* <div className="d-flex align-items-start">
                        <strong className="card-text"></strong><span className="card-text" style={{fontWeight: 'bold',fontSize:'19px'}}>{student.StudentName}</span><br />
                    </div> */}
                  <div className="d-flex align-items-start">
                    <strong className="card-text"></strong><span className="card-text" style={{ fontWeight: 'bold', color: "antiquewhite" }}>{student.Class.ClassStd}</span><br />
                  </div>
                  <div className="d-flex align-items-start">
                    <strong className="card-text"></strong><span className="card-text" style={{ fontWeight: 'bold', color: student.status == 'ACTIVE' ? 'green' : 'red' }}>{student.status}</span><br />
                  </div>
                  <a href="Class_11" class="btn ac_btn">For more details</a>
                </div>
              </div>
            ))
          ) : (
            <p style={{ color: 'red' }}>No Students</p>
          )
          }
        </div>

        <span className='heading' style={{ marginBottom: '20px', fontSize: '30px', color: 'white' }}>Secondary Section</span>
        <hr className='underline' />
        <div className='Secondary'>
          {secondaryStudents.length > 0 ? (
            secondaryStudents.filter(
              (res_student) => {
                const res = searchQuery.toLowerCase() === "" ? res_student
                  : (res_student.StudentName.toLowerCase().includes(searchQuery));
                console.log("loging res :--- ", res)
                return res
              }
            ).map((student) => (
              <div class="cardlist" key={student.id} >
                <img src={`http://localhost:5000/${student.StudentPic}`} class="card-img-top" alt="students" style={cardimg} />
                <div class="card-body">
                  <h5 class="card-title" style={{ color: '#dadada', whiteSpace: 'normal', overflow: 'hidden', maxWidth: '200px', fontSize: '16px' }}>{student.StudentName}</h5>
                  {/* <div className="d-flex align-items-start">
                        <strong className="card-text"></strong><span className="card-text" style={{fontWeight: 'bold',fontSize:'19px'}}>{student.StudentName}</span><br />
                    </div> */}
                  <div className="d-flex align-items-start">
                    <strong className="card-text"></strong><span className="card-text" style={{ fontWeight: 'bold', color: "antiquewhite" }}>{student.Class.ClassStd}</span><br />
                  </div>
                  <div className="d-flex align-items-start">
                    <strong className="card-text"></strong><span className="card-text" style={{ fontWeight: 'bold', color: student.status == 'ACTIVE' ? 'green' : 'red' }}>{student.status}</span><br />
                  </div>
                  <a href="Class_11" class="btn ac_btn">For more details</a>
                </div>
              </div>
            ))
          ) : (
            <p style={{ color: 'red' }}>No Students</p>
          ) }
        </div>
        <span className='heading' style={{ marginBottom: '20px', fontSize: '30px', color: 'white' }}>Boards Section</span>
        <hr className='underline' />
        <div className='BoardsList'>
          {boardstudents.length > 0 ? (
            boardstudents.filter(
              (res_student) => {
                const res = searchQuery.toLowerCase() === "" ? res_student :
                  (res_student.StudentName.toLowerCase().includes(searchQuery));
                console.log("loging res :--- ", res)
                return res
              }
            ).map((student) => (
              <div class="cardlist" key={student.id} >
                <img src={`http://localhost:5000/${student.StudentPic}`} class="card-img-top" alt="students" style={cardimg} />
                <div class="card-body">
                  <h5 class="card-title" style={{ color: '#dadada', whiteSpace: 'normal', overflow: 'hidden', maxWidth: '200px', fontSize: '16px' }}>{student.StudentName}</h5>
                  {/* <div className="d-flex align-items-start">
                        <strong className="card-text"></strong><span className="card-text" style={{fontWeight: 'bold',fontSize:'19px'}}>{student.StudentName}</span><br />
                    </div> */}
                  <div className="d-flex align-items-start">
                    <strong className="card-text"></strong><span className="card-text" style={{ fontWeight: 'bold', color: "antiquewhite" }}>{student.Class.ClassStd}</span><br />
                  </div>
                  <div className="d-flex align-items-start">
                    <strong className="card-text"></strong><span className="card-text" style={{ fontWeight: 'bold', color: student.status == 'ACTIVE' ? 'green' : 'red' }}>{student.status}</span><br />
                  </div>
                  <a href="Class_11" class="btn ac_btn">For more details</a>
                </div>
              </div>
            ))
          ) : (
            <p style={{ color: 'red' }}>No Students</p>
          )
          }
        </div>
      <span className='heading' style={{ marginBottom: '20px', fontSize: '30px', color: 'white' }}>Higher Section</span>
        <div className='Higher'>
          {higher.length > 0 ? (
            higher.filter(
              (res_student) => {
                const res = searchQuery.toLowerCase() === "" ? res_student :
                  (res_student.StudentName.toLowerCase().includes(searchQuery));
                console.log("loging res :--- ", res)
                return res
              }
            ).map((student) => (
              <div class="cardlist" key={student.id} >
                <img src={`http://localhost:5000/${student.StudentPic}`} class="card-img-top" alt="students" style={cardimg} />
                <div class="card-body">
                  <h5 class="card-title" style={{ color: '#dadada', whiteSpace: 'normal', overflow: 'hidden', maxWidth: '200px', fontSize: '16px' }}>{student.StudentName}</h5>
                  <div className="d-flex align-items-start">
                    <strong className="card-text"></strong><span className="card-text" style={{ fontWeight: 'bold', color: "antiquewhite" }}>{student.Class.ClassStd}</span><br />
                  </div>
                  <div className="d-flex align-items-start">
                    <strong className="card-text"></strong><span className="card-text" style={{ fontWeight: 'bold', color: student.status == 'ACTIVE' ? 'green' : 'red' }}>{student.status}</span><br />
                  </div>
                  <a href="Class_11" class="btn ac_btn">For more details</a>
                </div>
              </div>
            ))
          ) : (

            <p style={{color: 'red'}}>No Students</p>
          )
          }
        </div>


      </div>

    </div>

  );
};

export default StudentsLists;
