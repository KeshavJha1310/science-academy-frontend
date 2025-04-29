import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StudentsList.css';
import Navbar2 from './NavbarAdmin';
import Sidebar from './AdminSideBar';

const StudentsLists = () => {
  const [students, setStudents] = useState([]);
  const [class1 , setClass1] = useState([]);
  const [class2 , setClass2] = useState([]);
  const [class3 , setClass3] = useState([]);
  const [class4 , setClass4] = useState([]);
  const [class5 , setClass5] = useState([]);
  const [class6 , setClass6] = useState([]);
  const [class7 , setClass7] = useState([]);
  const [class8 , setClass8] = useState([]);
  const [class9 , setClass9] = useState([]);
  const [class10 , setClass10] = useState([]);
  const [class11 , setClass11] = useState([]);
  const [class12 , setClass12] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch student data from the server
  useEffect(() => {
    axios.get('http://localhost:5000/api/studentsList')
      .then(res => {
        const fetchedStudents = res.data.data;
        if (Array.isArray(fetchedStudents)) {
          console.log(fetchedStudents)
          setStudents(fetchedStudents);
          processStudentData(fetchedStudents);
        } else if (typeof fetchedStudents === 'object') {
          const studentArray = Object.values(fetchedStudents);
          setStudents(studentArray);
          processStudentData(studentArray);
        } else {
          console.error('Fetched data is not an array :---', fetchedStudents);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  // Process student data based on class sections
  const processStudentData = (students) => {
    setClass1(students.filter(student => student.Class.ClassStd === 'Class 1'));
    setClass2(students.filter(student => student.Class.ClassStd === 'Class 2'));
    setClass3(students.filter(student => student.Class.ClassStd === 'Class 3'));
    setClass4(students.filter(student => student.Class.ClassStd === 'Class 4'));
    setClass5(students.filter(student => student.Class.ClassStd === 'Class 5'));
    setClass6(students.filter(student => student.Class.ClassStd === 'Class 6'));
    setClass7(students.filter(student => student.Class.ClassStd === 'Class 7'));
    setClass8(students.filter(student => student.Class.ClassStd === 'Class 8'));
    setClass9(students.filter(student => student.Class.ClassStd === 'Class 9'));
    setClass10(students.filter(student => student.Class.ClassStd === 'Class 10'));
    setClass11(students.filter(student => student.Class.ClassStd === 'Class 11'));
    setClass12(students.filter(student => student.Class.ClassStd === 'Class 12'));
  };

 

  const handleSearchInputChange = (event) => {
    console.log(event.target.value)
    setSearchQuery(event.target.value);
  };

  const filterStudentsBySearch = (students) => {
    return students.filter(student =>
      student.StudentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.Class.ClassStd.toLowerCase().includes(searchQuery.toLowerCase()) // Also allows searching by class
    );
  };

  const cardStyle = {
    maxWidth: '100px',
    maxHeight: '100px',
    margin: '10px',
  };

  return (
    <div className='AdminPanel-list'>
      <Navbar2 />
      <div className='sidebar'>
        <Sidebar />
      </div>

      <div className='StudentsList'>
        <div className='SearchBar'>
          <input
            type="text"
            id='searchInput'
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchInputChange}
            className='searchInput'
          />
        </div>
        {/* Primary Section */}
        <span className='heading' style={{ marginBottom: '20px', fontSize: '30px', color: 'white' }}>Class 1</span>
        <hr className='underline' />
        <div className='Primary'>
          {filterStudentsBySearch(class1).length > 0 ? (
            filterStudentsBySearch(class1).map(student => (
              <div className="cardlist" key={student.id}>
                <img src={`http://localhost:5000/${student.StudentPic}`} className="card-img-top" alt="students" style={cardStyle} />
                <div className="card-body">
                  <h5 className="card-title" style={{ color: 'black', wordWrap: 'break-word', maxWidth: '200px', fontSize: '16px' }}>{student.StudentName}</h5>
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <span className="card-text" style={{ fontWeight: 'bold', color: "#624E88" }}>
                        {student.Class.ClassStd}
                      </span>
                    </div>
                    <div>
                      <span className="card-text" style={{ fontWeight: 'bold', color: student.status === 'ACTIVE' ? 'green' : 'red' }}>
                        {student.status}
                      </span>
                    </div>
                  </div>
                  <div className='btn-wrapper'>
                    <div className='stu-details'>
                      <a href="Class_11" className="btn studetails">
                        <span className="material-icons">info</span> {/* Info icon */}
                      </a>
                    </div>
                    <div className='stu-edit'>
                      <a href="Class_11" className="btn stuedit">
                        <span className="material-icons">edit</span> {/* Edit icon */}
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            ))
          ) : (
            <p style={{ color: 'red' }}>No Students</p>
          )}
        </div>

        <span className='heading' style={{ marginBottom: '20px', fontSize: '30px', color: 'white' }}>Class 2</span>
        <hr className='underline' />
        <div className='Primary'>
          {filterStudentsBySearch(class2).length > 0 ? (
            filterStudentsBySearch(class2).map(student => (
              <div className="cardlist" key={student.id}>
                <img src={`http://localhost:5000/${student.StudentPic}`} className="card-img-top" alt="students" style={cardStyle} />
                <div className="card-body">
                  <h5 className="card-title" style={{ color: 'black', wordWrap: 'break-word', maxWidth: '200px', fontSize: '16px' }}>{student.StudentName}</h5>
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <span className="card-text" style={{ fontWeight: 'bold', color: "#624E88" }}>
                        {student.Class.ClassStd}
                      </span>
                    </div>
                    <div>
                      <span className="card-text" style={{ fontWeight: 'bold', color: student.status === 'ACTIVE' ? 'green' : 'red' }}>
                        {student.status}
                      </span>
                    </div>
                  </div>
                  <div className='btn-wrapper'>
                    <div className='stu-details'>
                      <a href="Class_11" className="btn studetails">
                        <span className="material-icons">info</span> {/* Info icon */}
                      </a>
                    </div>
                    <div className='stu-edit'>
                      <a href="Class_11" className="btn stuedit">
                        <span className="material-icons">edit</span> {/* Edit icon */}
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            ))
          ) : (
            <p style={{ color: 'red' }}>No Students</p>
          )}
        </div>

        <span className='heading' style={{ marginBottom: '20px', fontSize: '30px', color: 'white' }}>Class 3</span>
        <hr className='underline' />
        <div className='Primary'>
          {filterStudentsBySearch(class3).length > 0 ? (
            filterStudentsBySearch(class3).map(student => (
              <div className="cardlist" key={student.id}>
                <img src={`http://localhost:5000/${student.StudentPic}`} className="card-img-top" alt="students" style={cardStyle} />
                <div className="card-body">
                  <h5 className="card-title" style={{ color: 'black', wordWrap: 'break-word', maxWidth: '200px', fontSize: '16px' }}>{student.StudentName}</h5>
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <span className="card-text" style={{ fontWeight: 'bold', color: "#624E88" }}>
                        {student.Class.ClassStd}
                      </span>
                    </div>
                    <div>
                      <span className="card-text" style={{ fontWeight: 'bold', color: student.status === 'ACTIVE' ? 'green' : 'red' }}>
                        {student.status}
                      </span>
                    </div>
                  </div>
                  <div className='btn-wrapper'>
                    <div className='stu-details'>
                      <a href="Class_11" className="btn studetails">
                        <span className="material-icons">info</span> {/* Info icon */}
                      </a>
                    </div>
                    <div className='stu-edit'>
                      <a href="Class_11" className="btn stuedit">
                        <span className="material-icons">edit</span> {/* Edit icon */}
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            ))
          ) : (
            <p style={{ color: 'red' }}>No Students</p>
          )}
        </div>

        <span className='heading' style={{ marginBottom: '20px', fontSize: '30px', color: 'white' }}>Class 4</span>
        <hr className='underline' />
        <div className='Primary'>
          {filterStudentsBySearch(class4).length > 0 ? (
            filterStudentsBySearch(class4).map(student => (
              <div className="cardlist" key={student.id}>
                <img src={`http://localhost:5000/${student.StudentPic}`} className="card-img-top" alt="students" style={cardStyle} />
                <div className="card-body">
                  <h5 className="card-title" style={{ color: 'black', wordWrap: 'break-word', maxWidth: '200px', fontSize: '16px' }}>{student.StudentName}</h5>
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <span className="card-text" style={{ fontWeight: 'bold', color: "#624E88" }}>
                        {student.Class.ClassStd}
                      </span>
                    </div>
                    <div>
                      <span className="card-text" style={{ fontWeight: 'bold', color: student.status === 'ACTIVE' ? 'green' : 'red' }}>
                        {student.status}
                      </span>
                    </div>
                  </div>
                  <div className='btn-wrapper'>
                    <div className='stu-details'>
                      <a href="Class_11" className="btn studetails">
                        <span className="material-icons">info</span> {/* Info icon */}
                      </a>
                    </div>
                    <div className='stu-edit'>
                      <a href="Class_11" className="btn stuedit">
                        <span className="material-icons">edit</span> {/* Edit icon */}
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            ))
          ) : (
            <p style={{ color: 'red' }}>No Students</p>
          )}
        </div>

        <span className='heading' style={{ marginBottom: '20px', fontSize: '30px', color: 'white' }}>Class 5</span>
        <hr className='underline' />
        <div className='Primary'>
          {filterStudentsBySearch(class5).length > 0 ? (
            filterStudentsBySearch(class5).map(student => (
              <div className="cardlist" key={student.id}>
                <img src={`http://localhost:5000/${student.StudentPic}`} className="card-img-top" alt="students" style={cardStyle} />
                <div className="card-body">
                  <h5 className="card-title" style={{ color: 'black', wordWrap: 'break-word', maxWidth: '200px', fontSize: '16px' }}>{student.StudentName}</h5>
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <span className="card-text" style={{ fontWeight: 'bold', color: "#624E88" }}>
                        {student.Class.ClassStd}
                      </span>
                    </div>
                    <div>
                      <span className="card-text" style={{ fontWeight: 'bold', color: student.status === 'ACTIVE' ? 'green' : 'red' }}>
                        {student.status}
                      </span>
                    </div>
                  </div>
                  <div className='btn-wrapper'>
                    <div className='stu-details'>
                      <a href="Class_11" className="btn studetails">
                        <span className="material-icons">info</span> {/* Info icon */}
                      </a>
                    </div>
                    <div className='stu-edit'>
                      <a href="Class_11" className="btn stuedit">
                        <span className="material-icons">edit</span> {/* Edit icon */}
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            ))
          ) : (
            <p style={{ color: 'red' }}>No Students</p>
          )}
        </div>

        <span className='heading' style={{ marginBottom: '20px', fontSize: '30px', color: 'white' }}>Class 6</span>
        <hr className='underline' />
        <div className='Primary'>
          {filterStudentsBySearch(class6).length > 0 ? (
            filterStudentsBySearch(class6).map(student => (
              <div className="cardlist" key={student.id}>
                <img src={`http://localhost:5000/${student.StudentPic}`} className="card-img-top" alt="students" style={cardStyle} />
                <div className="card-body">
                  <h5 className="card-title" style={{ color: 'black', wordWrap: 'break-word', maxWidth: '200px', fontSize: '16px' }}>{student.StudentName}</h5>
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <span className="card-text" style={{ fontWeight: 'bold', color: "#624E88" }}>
                        {student.Class.ClassStd}
                      </span>
                    </div>
                    <div>
                      <span className="card-text" style={{ fontWeight: 'bold', color: student.status === 'ACTIVE' ? 'green' : 'red' }}>
                        {student.status}
                      </span>
                    </div>
                  </div>
                  <div className='btn-wrapper'>
                    <div className='stu-details'>
                      <a href="Class_11" className="btn studetails">
                        <span className="material-icons">info</span> {/* Info icon */}
                      </a>
                    </div>
                    <div className='stu-edit'>
                      <a href="Class_11" className="btn stuedit">
                        <span className="material-icons">edit</span> {/* Edit icon */}
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            ))
          ) : (
            <p style={{ color: 'red' }}>No Students</p>
          )}
        </div>

        <span className='heading' style={{ marginBottom: '20px', fontSize: '30px', color: 'white' }}>Class 7</span>
        <hr className='underline' />
        <div className='Primary'>
          {filterStudentsBySearch(class7).length > 0 ? (
            filterStudentsBySearch(class7).map(student => (
              <div className="cardlist" key={student.id}>
                <img src={`http://localhost:5000/${student.StudentPic}`} className="card-img-top" alt="students" style={cardStyle} />
                <div className="card-body">
                  <h5 className="card-title" style={{ color: 'black', wordWrap: 'break-word', maxWidth: '200px', fontSize: '16px' }}>{student.StudentName}</h5>
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <span className="card-text" style={{ fontWeight: 'bold', color: "#624E88" }}>
                        {student.Class.ClassStd}
                      </span>
                    </div>
                    <div>
                      <span className="card-text" style={{ fontWeight: 'bold', color: student.status === 'ACTIVE' ? 'green' : 'red' }}>
                        {student.status}
                      </span>
                    </div>
                  </div>
                  <div className='btn-wrapper'>
                    <div className='stu-details'>
                      <a href="Class_11" className="btn studetails">
                        <span className="material-icons">info</span> {/* Info icon */}
                      </a>
                    </div>
                    <div className='stu-edit'>
                      <a href="Class_11" className="btn stuedit">
                        <span className="material-icons">edit</span> {/* Edit icon */}
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            ))
          ) : (
            <p style={{ color: 'red' }}>No Students</p>
          )}
        </div>

        <span className='heading' style={{ marginBottom: '20px', fontSize: '30px', color: 'white' }}>Class 8</span>
        <hr className='underline' />
        <div className='Primary'>
          {filterStudentsBySearch(class8).length > 0 ? (
            filterStudentsBySearch(class8).map(student => (
              <div className="cardlist" key={student.id}>
                <img src={`http://localhost:5000/${student.StudentPic}`} className="card-img-top" alt="students" style={cardStyle} />
                <div className="card-body">
                  <h5 className="card-title" style={{ color: 'black', wordWrap: 'break-word', maxWidth: '200px', fontSize: '16px' }}>{student.StudentName}</h5>
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <span className="card-text" style={{ fontWeight: 'bold', color: "#624E88" }}>
                        {student.Class.ClassStd}
                      </span>
                    </div>
                    <div>
                      <span className="card-text" style={{ fontWeight: 'bold', color: student.status === 'ACTIVE' ? 'green' : 'red' }}>
                        {student.status}
                      </span>
                    </div>
                  </div>
                  <div className='btn-wrapper'>
                    <div className='stu-details'>
                      <a href="Class_11" className="btn studetails">
                        <span className="material-icons">info</span> {/* Info icon */}
                      </a>
                    </div>
                    <div className='stu-edit'>
                      <a href="Class_11" className="btn stuedit">
                        <span className="material-icons">edit</span> {/* Edit icon */}
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            ))
          ) : (
            <p style={{ color: 'red' }}>No Students</p>
          )}
        </div>

        <span className='heading' style={{ marginBottom: '20px', fontSize: '30px', color: 'white' }}>Class 9</span>
        <hr className='underline' />
        <div className='Primary'>
          {filterStudentsBySearch(class9).length > 0 ? (
            filterStudentsBySearch(class9).map(student => (
              <div className="cardlist" key={student.id}>
                <img src={`http://localhost:5000/${student.StudentPic}`} className="card-img-top" alt="students" style={cardStyle} />
                <div className="card-body">
                  <h5 className="card-title" style={{ color: 'black', wordWrap: 'break-word', maxWidth: '200px', fontSize: '16px' }}>{student.StudentName}</h5>
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <span className="card-text" style={{ fontWeight: 'bold', color: "#624E88" }}>
                        {student.Class.ClassStd}
                      </span>
                    </div>
                    <div>
                      <span className="card-text" style={{ fontWeight: 'bold', color: student.status === 'ACTIVE' ? 'green' : 'red' }}>
                        {student.status}
                      </span>
                    </div>
                  </div>
                  <div className='btn-wrapper'>
                    <div className='stu-details'>
                      <a href="Class_11" className="btn studetails">
                        <span className="material-icons">info</span> {/* Info icon */}
                      </a>
                    </div>
                    <div className='stu-edit'>
                      <a href="Class_11" className="btn stuedit">
                        <span className="material-icons">edit</span> {/* Edit icon */}
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            ))
          ) : (
            <p style={{ color: 'red' }}>No Students</p>
          )}
        </div>

        <span className='heading' style={{ marginBottom: '20px', fontSize: '30px', color: 'white' }}>Class 10</span>
        <hr className='underline' />
        <div className='Primary'>
          {filterStudentsBySearch(class10).length > 0 ? (
            filterStudentsBySearch(class10).map(student => (
              <div className="cardlist" key={student.id}>
                <img src={`http://localhost:5000/${student.StudentPic}`} className="card-img-top" alt="students" style={cardStyle} />
                <div className="card-body">
                  <h5 className="card-title" style={{ color: 'black', wordWrap: 'break-word', maxWidth: '200px', fontSize: '16px' }}>{student.StudentName}</h5>
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <span className="card-text" style={{ fontWeight: 'bold', color: "#624E88" }}>
                        {student.Class.ClassStd}
                      </span>
                    </div>
                    <div>
                      <span className="card-text" style={{ fontWeight: 'bold', color: student.status === 'ACTIVE' ? 'green' : 'red' }}>
                        {student.status}
                      </span>
                    </div>
                  </div>
                  <div className='btn-wrapper'>
                    <div className='stu-details'>
                      <a href="Class_11" className="btn studetails">
                        <span className="material-icons">info</span> {/* Info icon */}
                      </a>
                    </div>
                    <div className='stu-edit'>
                      <a href="Class_11" className="btn stuedit">
                        <span className="material-icons">edit</span> {/* Edit icon */}
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            ))
          ) : (
            <p style={{ color: 'red' }}>No Students</p>
          )}
        </div>

        <span className='heading' style={{ marginBottom: '20px', fontSize: '30px', color: 'white' }}>Class 11</span>
        <hr className='underline' />
        <div className='Primary'>
          {filterStudentsBySearch(class11).length > 0 ? (
            filterStudentsBySearch(class11).map(student => (
              <div className="cardlist" key={student.id}>
                <img src={`http://localhost:5000/${student.StudentPic}`} className="card-img-top" alt="students" style={cardStyle} />
                <div className="card-body">
                  <h5 className="card-title" style={{ color: 'black', wordWrap: 'break-word', maxWidth: '200px', fontSize: '16px' }}>{student.StudentName}</h5>
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <span className="card-text" style={{ fontWeight: 'bold', color: "#624E88" }}>
                        {student.Class.ClassStd}
                      </span>
                    </div>
                    <div>
                      <span className="card-text" style={{ fontWeight: 'bold', color: student.status === 'ACTIVE' ? 'green' : 'red' }}>
                        {student.status}
                      </span>
                    </div>
                  </div>
                  <div className='btn-wrapper'>
                    <div className='stu-details'>
                      <a href="Class_11" className="btn studetails">
                        <span className="material-icons">info</span> {/* Info icon */}
                      </a>
                    </div>
                    <div className='stu-edit'>
                      <a href="Class_11" className="btn stuedit">
                        <span className="material-icons">edit</span> {/* Edit icon */}
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            ))
          ) : (
            <p style={{ color: 'red' }}>No Students</p>
          )}
        </div>

        <span className='heading' style={{ marginBottom: '20px', fontSize: '30px', color: 'white' }}>Class 12</span>
        <hr className='underline' />
        <div className='Primary'>
          {filterStudentsBySearch(class12).length > 0 ? (
            filterStudentsBySearch(class12).map(student => (
              <div className="cardlist" key={student.id}>
                <img src={`http://localhost:5000/${student.StudentPic}`} className="card-img-top" alt="students" style={cardStyle} />
                <div className="card-body">
                  <h5 className="card-title" style={{ color: 'black', wordWrap: 'break-word', maxWidth: '200px', fontSize: '16px' }}>{student.StudentName}</h5>
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <span className="card-text" style={{ fontWeight: 'bold', color: "#624E88" }}>
                        {student.Class.ClassStd}
                      </span>
                    </div>
                    <div>
                      <span className="card-text" style={{ fontWeight: 'bold', color: student.status === 'ACTIVE' ? 'green' : 'red' }}>
                        {student.status}
                      </span>
                    </div>
                  </div>
                  <div className='btn-wrapper'>
                    <div className='stu-details'>
                      <a href="Class_11" className="btn studetails">
                        <span className="material-icons">info</span> {/* Info icon */}
                      </a>
                    </div>
                    <div className='stu-edit'>
                      <a href="Class_11" className="btn stuedit">
                        <span className="material-icons">edit</span> {/* Edit icon */}
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            ))
          ) : (
            <p style={{ color: 'red' }}>No Students</p>
          )}
        </div>

      </div>

    </div>
  );
};

export default StudentsLists;
