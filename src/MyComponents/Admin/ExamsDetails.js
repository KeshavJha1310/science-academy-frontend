import React, { Fragment, useState, useEffect, useImperativeHandle, forwardRef } from "react";
import axios from 'axios';
import './examDetails.css';
// import Cookies from 'js-cookie';
import { communicationService } from "../../Services/updateDBFlagService";

const ExamsDetails = (props, ref) => {
    const [onGoingExam, setonGoingExam] = useState([]);
    const [upCommingExam, setupCommingExam] = useState([]);
    const [completedExam, setcompletedExam] = useState([]);
    const [toggleState, setToggleState] = useState(1);
    const [classDetails , setclassDetails] = useState([]);
    const [subjectDetails, setsubjectDetails] = useState([]);
    const [showReload, setShowReload] = useState(false);
    

    useEffect(() => {
        fetchExamDetails();
        fetchClassDetails();
        fetchSubjectDetails();
    communicationService.addedExam$.subscribe((flag)=>{
    if(flag){
        setShowReload(flag)
    }else{
        setShowReload(false)
    }
})
    }, []);

    const fetchExamDetails = () => {
        axios
            .get("http://localhost:5000/api/getLaunchedExam")
            .then((response) => {
                const currentDate = new Date();
                const examDetails = response.data.data;

                if (Array.isArray(examDetails)) {
                    const completed = [];
                    const ongoing = [];
                    const upcoming = [];

                    examDetails.forEach((exam) => {
                        const examDate = new Date(exam.date);

                        if (examDate < currentDate) {
                            completed.push(exam);
                        } else if (examDate.toDateString() === currentDate.toDateString()) {
                            ongoing.push(exam);
                        } else {
                            upcoming.push(exam);
                        }
                    });

                    setcompletedExam(completed);
                    setonGoingExam(ongoing);
                    setupCommingExam(upcoming);
                    
                    
                } else {
                    console.error("Expected an array but got:", examDetails);
                }
            })
            .catch((error) => console.error("Error fetching exam details:", error));
    };

    const fetchClassDetails = () =>{
        axios
        .get('http://localhost:5000/api/classData')
        .then((response)=>{
            const classDetails = response.data.data;
            if(classDetails){
                setclassDetails(classDetails)
            }
        })
        .catch((error) => console.error("Error fetching class details:", error));
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


    const getClassName = (classId) =>{
        const classInfo = classDetails.find((classInfo) => classInfo._id === classId);
        return classInfo ? classInfo.className : "No class name";
    }

    const getNumberofStudent=(classId)=>{
        const classInfo = classDetails.find((classInfo)=>classInfo._id === classId)
        return classInfo ? classInfo.students.length : 0;
    }

    const getSubjectName = (subjectId) =>{
        const subjectInfo = subjectDetails.find((subject)=>subject._id === subjectId);
        return subjectInfo ? subjectInfo.subjectName : "No subject name";
    }

    const toggleTab = (index) => {
        setToggleState(index);
    };
 

    const handleReload = () => {
    fetchExamDetails();    
    // Cookies.remove('ExamAdded');
    setShowReload(false);
    };

    const renderExamTable = (exams) => (
        <div className="custom-table">
            <div className="custom-table-header">
                <div>Sr.No</div>
                <div>Test Name</div>
                <div>Category</div>
                <div>Marks</div>
                <div>Duration</div>
                <div>Mode</div>
                <div>Class</div>
                <div>Subject</div>
                <div>Students</div>
                <div>Date</div>
            </div>
            {exams.map((exam, index) => (
                <div className="custom-table-row" key={exam._id}>
                    <div>{index + 1}</div>
                    <div>{exam.examName}</div>
                    <div>{exam.examType}</div>
                    <div>{exam.maxMarks}</div>
                    <div>{exam.mode}</div>
                    <div>{exam.duration} hrs</div>
                    <div>{getClassName(exam.classId)}</div>
                    <div>{getSubjectName(exam.subjectId)}</div>
                    <div>{getNumberofStudent(exam.classId)}</div>
                    <div>{new Date(exam.date).toLocaleDateString()}</div>
                </div>
            ))}
        </div>
    );

    return (
        <Fragment>
            { showReload && 
             (<div className="reload-button-container">
                <i className="fa-solid fa-rotate-right" onClick={handleReload} style={{ color: "#9e9e9e", fontSize: "20px", marginRight: "8px" }}></i>Reload
            </div>)
            }


            <div className="examDetails">
                <div className="exam-tabs">
                    <button
                        className={toggleState === 1 ? "exams-tabs active-exams-tabs" : "exams-tabs"}
                        onClick={() => toggleTab(1)}
                    >
                        Ongoing Exams
                    </button>
                    <button
                        className={toggleState === 2 ? "exams-tabs active-exams-tabs" : "exams-tabs"}
                        onClick={() => toggleTab(2)}
                    >
                        Completed Exams
                    </button>
                    <button
                        className={toggleState === 3 ? "exams-tabs active-exams-tabs" : "exams-tabs"}
                        onClick={() => toggleTab(3)}
                    >
                        Upcoming Exams
                    </button>
                </div>

     
                <div className="exams-content-tabs">
                    {toggleState === 1 && (
                        <div className="exams-content active-exams-content">
                            {onGoingExam.length > 0 ? (
                                renderExamTable(onGoingExam)
                            ) : (
                                <div className="no-exams">
                                    <p>No ongoing exams at the moment!</p>
                                </div>
                            )}
                        </div>
                    )}

                    {toggleState === 2 && (
                        <div className="exams-content active-exams-content">
                            {completedExam.length > 0 ? (
                                renderExamTable(completedExam)
                            ) : (
                                <div className="no-exams">
                                    <p>No completed exams at the moment!</p>
                                </div>
                            )}
                        </div>
                    )}

                    {toggleState === 3 && (
                        <div className="exams-content active-exams-content">
                            {upCommingExam.length > 0 ? (
                                renderExamTable(upCommingExam)
                            ) : (
                                <div className="no-exams">
                                    <p>No upcoming exams at the moment!</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </Fragment>
    );
};

export default ExamsDetails;
