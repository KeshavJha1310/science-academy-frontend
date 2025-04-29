import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
  
} from "react-router-dom";
import Class_1 from './Class_Comp_details/Class_1';
import Class_2 from './Class_Comp_details/Class_2';
import Class_3 from './Class_Comp_details/Class_3';
import Class_4 from './Class_Comp_details/Class_4';
import Class_5 from './Class_Comp_details/Class_5';
import Class_6 from './Class_Comp_details/Class_6';
import Class_7 from './Class_Comp_details/Class_7';
import Class_8 from './Class_Comp_details/Class_8';
import Class_9 from './Class_Comp_details/Class_9';
import Class_10 from './Class_Comp_details/Class_10';
import Class_11 from './Class_Comp_details/Class_11';
import Class_12 from './Class_Comp_details/Class_12';
import AdminLogin from './MyComponents/Admin/AdminLogin';
import AdminPanel from './MyComponents/Admin/AdminPanel';
import AddStudentsForm from './MyComponents/Admin/AddStudentsForm';
import AddNoticeForm from './MyComponents/Admin/AddNotice';
import AddTeacherForm from './MyComponents/Admin/AddTeachers';
import StudentsLists from './MyComponents/Admin/StudentsLists';
import AddSubject from './MyComponents/Admin/AddSubject';
import AddMarks from './MyComponents/Admin/AddMarks';
import LaunchExam from './MyComponents/Admin/LaunchExam';
import Installments from './MyComponents/Admin/Installments';

const router = createBrowserRouter([
  {
    path: "/",
    element:<App/>,
  },
  {
    path: "/Class_1",
    element:<Class_1/>,
  },
  {
    path: "/Class_2",
    element:<Class_2/>,
  },
  {
    path: "/Class_3",
    element:<Class_3/>,
  },
  {
    path: "/Class_4",
    element:<Class_4/>,
  },
  {
    path: "/Class_5",
    element:<Class_5/>,
  },
  {
    path: "/Class_6",
    element:<Class_6/>,
  },
  {
    path: "/Class_7",
    element:<Class_7/>,
  },
  {
    path: "/Class_8",
    element:<Class_8/>,
  },
  {
    path: "/Class_9",
    element:<Class_9/>,
  },
  {
    path: "/Class_10",
    element:<Class_10/>,
  },
  {
    path: "/Class_11",
    element:<Class_11/>,
  },
  {
    path: "/Class_12",
    element:<Class_12/>,
  },
  {
    path: "/AdminLogin",
    element:<AdminLogin/>,
  },
  {
    path: "/Admin/AdminPanel",
    element:<AdminPanel/>,
  },
  {
    path: "/Admin/AddStudents",
    element:<AddStudentsForm/>,
  },
  {
    path: "/Admin/AddNotice",
    element:<AddNoticeForm/>,
  },
  {
    path: "/Admin/AddTeachers",
    element:<AddTeacherForm/>,
  },
  {
    path: "/Admin/StudentList",
    element:<StudentsLists/>,
  },
  {
    path: "/Admin/AddSubject",
    element:<AddSubject/>,
  },
  {
    path: "/Admin/AddMarks",
    element:<AddMarks/>,
  },
  {
    path: "/Admin/LaunchExam",
    element:<LaunchExam/>,
  },
  {
    path: "/Admin/Installments",
    element:<Installments/>,
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

   <RouterProvider router={router}/>

);

