import React,{useState,useEffect} from 'react';
import "./AddSubjectForm.css";
import "./AddStudentsForm.css";
import "./AddMarksForms.css";
import Swal from "sweetalert2";
import Select from "react-select";
import axios from "axios";

const AddMarksForms = () => {

  useEffect(()=>{
    fetchClassData();
    fetchSubjectDetails();
  },[])

  const [exam,setExam] = useState([]);
  const [student,setStudent] = useState([]);
  const [studentOpt , setStudentOpt] = useState([])
  const [classData , setClassData] = useState([]);
  const [allclassData , setAllClassData] = useState([]);
  const [errors, setErrors] = useState({});
  const [obtainedMarksLimit , setObtainedMarksLimit] = useState(0)
  const [subjectDetails, setsubjectDetails] = useState([]);
  

  const [formData,setFormData] = useState({
    examId:'',
    category:'',
    classId: '',
    studentId:'',
    subjectId:'',
    subjectName:'',
    obtainedMarks: '',
    remark:''
  });

  const fields = [
    {name:"obtainedMarks",label:"Marks Obtained",type:"number",required: true},
    {name:"remark",label:"Remark about student",type:"string",required: true}
  ]

  const validateField = (name, value) => {
    let errorMsg = "";
    const field = fields.find((f) => f.name === name);

    if (field?.required && !value) {
      errorMsg = `${field.label} is required.`;
    }else if (field?.type === "number" && value < 0) {
      errorMsg = `${field.label} cannot be negative.`;
    } 
    if(obtainedMarksLimit<value){
      console.log(obtainedMarksLimit)
      errorMsg = `${field.label} cannot be greater than the total marks.`;
    }
    return errorMsg;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = fields.reduce((acc, { name }) => {
      const error = validateField(name, formData[name]);
      if (error) acc[name] = error;
      return acc;
    }, {});

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    console.log(formData)

    axios
      .post("http://localhost:5000/api/addMarks", formData)
      .then((res) => {
        console.log("Response:", res.data);
        showNotification(
          "Success",
          'Marks',
          "has been added successfully",
          "success"
        );
        setFormData({
          examId:'',
          category:'',
          classId: '',
          studentId:'',
          subjectId:'',
          obtainedMarks: null,
          remark:''
        });
      })
      .catch((err) => {
        console.error("Error:", err);
        showNotification("Oops", "", "Failed to launch exam", "error");
      });
  };

  const fetchExamDetails = (selectedId) => {
    axios
      .get("http://localhost:5000/api/getLaunchedExam")
      .then((response) => {
        const currentDate = new Date();
        const examDetails = response.data.data;
  
        if (Array.isArray(examDetails)) {
          const completed = [];
          examDetails.forEach((exam) => {
            const examDate = new Date(exam.date);
            if (examDate < currentDate) {
              completed.push({
                value: exam._id, 
                label: exam.examName,
                maxmarks: exam.maxMarks,
                isDisabled: getClassName(exam.classId) !== getClassName(selectedId),
              });
              setFormData((prevFormData) => ({
                ...prevFormData,
                category: exam.examType,
                subjectId: exam.subjectId,
                subjectName: getSubjectName(exam.subjectId),
              }));
              console.log("total marks :- ",exam.maxMarks)
            }
          });
          setExam(completed); 
        } else {
          console.error("Expected an array but got:", examDetails);
        }
      })
      .catch((error) => console.error("Error fetching exam details:", error));
  };

  const getMaxMarks = (selectedExam) =>{
    console.log(selectedExam)
    console.log(exam)
  }

  const getClassName = (classId) =>{
    const classInfo = allclassData.find((classInfo) => classInfo._id == classId);
    return classInfo ? classInfo.className : "No class name";
}

const getSubjectName = (subjectId) =>{
  const subjectInfo = subjectDetails.find((subject)=>subject._id === subjectId);
  return subjectInfo ? subjectInfo.subjectName : "No subject name";
}

const fetchClassData = () => {
  axios
    .get("http://localhost:5000/api/classData")
    .then((res) => {
      if (res.data && res.data.data) {
        setAllClassData(res.data.data)
        setClassData(
          res.data.data.map((classItem) => ({
            value: classItem._id, 
            label: classItem.className, 
            isDisabled: classItem.students.length <= 0,
          }))
        );
      }
    })
    .catch((error) => console.error("Error fetching class data:", error));
};

const fetchStudents = (className) =>{
  axios.get('http://localhost:5000/api/studentsList')
  .then(res => {
    const fetchedStudents = res.data.data;
    if (Array.isArray(fetchedStudents)) {
      setStudent(fetchedStudents);
      processStudentData(fetchedStudents,className);
    } else if (typeof fetchedStudents === 'object') {
      const studentArray = Object.values(fetchedStudents);
      setStudent(studentArray);
      processStudentData(studentArray,className);
    } else {
      console.error('Fetched data is not an array :---', fetchedStudents);
    }
  })
  .catch(err => {
    console.log(err);
  });
}

  const fetchSubjectDetails = () =>{
  axios
  .get('http://localhost:5000/api/subjectsDetails')
  .then((response)=>{
      const subjectDetails = response.data.data;
      if(subjectDetails){
          setsubjectDetails(subjectDetails);
      }
  })
  .catch((error) => console.error("Error fetching subject details:", error));
  }

  // Process student data based on class sections
  const processStudentData = (students,className) => {
    if(student&&className){
      const processedData = students
      .filter((student) => student.Class.ClassStd === className) // Filter students by class
      .map((student) => ({
        value: student._id, // Use the unique ID of the student as the value
        label: student.StudentName, // Use the student's name as the label
      }));
      setStudentOpt(processedData);
    }
  };


  const showNotification = (title, MarksName, message, status) => {
    Swal.fire({
      title: title,
      text: `${MarksName} ${message}`,
      icon: status,
      confirmButtonText: "Okay",
    });
  };

    return (
        <div className='formContainer'>
            <h4 className='form-head'>Add Marks</h4>
            <div className='card-admin1-addExam'>
              <form onSubmit={handleSubmit} className="adminform">

              <div className="form-grid">
              <Select
              options={classData}
              value={classData.find(
                (option) =>{ 
                  option.value === formData.classId
                }
              )}
              onChange={(selected) =>
                {
                const selectedClassId = selected.value;
                const selectedClassName = classData.find((option) => option.value === selectedClassId)?.label;
                setFormData({ ...formData, classId: selected.value });
                fetchStudents(selectedClassName);
                fetchExamDetails(selected.value); 
              }
              }
              placeholder="Select class..."
              className="select-admin"
              styles={{
                container: (base) => ({
                  ...base,
                  width: "100%",
                  margin: "0px 0",
                  border: "1px solid #000000",
                  border: "1px solid #000000",
                  padding: '0px',
                  backgroundColor: "transparent",
                }),
                menu: (base) => ({
                  ...base,
                  zIndex: 9999,
                  backgroundColor: "rgb(247, 247, 247)",
                }),
              }}
            />

              <Select
              options={studentOpt}
              value={studentOpt.find(
                (option) => option.value === formData.studentId
              )}
              onChange={(selected) =>
                setFormData({ ...formData, studentId: selected.value })
              }
              placeholder="Select Student..."
              className="select-admin"
              isDisabled={!formData.classId}
              styles={{
                container: (base) => ({
                  ...base,
                  width: "100%",
                  margin: "0px 0",
                  border: "1px solid #000000",
                  border: "1px solid #000000",
                  borderRadius: "5px",
                  padding: '0px',
                  backgroundColor: "transparent",
                }),
                menu: (base) => ({
                  ...base,
                  zIndex: 9999,
                  backgroundColor: "rgb(247, 247, 247)",
                }),
              }}
            />

            <Select
              options={exam}
              value={exam.find(
                (option) => option.value === formData.examId
              )}
              onChange={(selected) =>{
                setFormData({ ...formData, examId: selected.value })
                setObtainedMarksLimit(selected.maxmarks)              }
              }
              isDisabled={!formData.classId}
              placeholder="Select Exam..."
              className="select-admin"
              styles={{
                container: (base) => ({
                  ...base,
                  width: "100%",
                  margin: "0px 0",
                  border: "1px solid #000000",
                  border: "1px solid #000000",
                  borderRadius: "5px",
                  padding: '0px',
                  backgroundColor: "transparent",
                }),
                menu: (base) => ({
                  ...base,
                  zIndex: 9999,
                  backgroundColor: "rgb(247, 247, 247)",
                }),
              }}
            />

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
                  disabled={!formData.classId}  
                />
                {errors[name] && (
                  <p style={{ color: "red" }} className="error">
                    {errors[name]}
                  </p>
                )}
              </div>
            ))}
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
}

export default AddMarksForms;
