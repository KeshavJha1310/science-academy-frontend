    import { useEffect, useRef, useState } from 'react';
    import { Link, useLocation } from 'react-router-dom';
    import './AdminSideBar.css';  
    import './AddSubject.css' 
    import abhay from './abhay.png'

    const sidebarNavItems = [
        {
            display: 'Admin Panel',
            icon: <i className='bx bx-home' style={{fontSize:'25px'}}></i>,
            to: '/Admin/AdminPanel',
            section: 'Admin'
        },
        {
            display: 'Add Subject',
            icon:<i className="fa-light fa-chalkboard"></i>,
            to: '/Admin/AddSubject',
            section: 'Admin'
        },
         {
          display: 'Student List',
          icon: <i className="fa-solid fa-table-list" style={{color: "#ffffff",fontSize:'20px'}}></i> ,
          to : '/Admin/StudentList',
          section:'list'
        },
        {
            display: 'Add Students',
            icon:<i className='bx bx-user-circle'></i>,
            to: '/Admin/AddStudents',
            section: 'Students'
        },
        {
            display: 'Add Notice',
            icon: <i className='bx bx-star'></i>,
            to: '/Admin/AddNotice',
            section: 'Notice'
        },        
        {
            display: 'Add Teachers',
            icon:<i className='bx bxs-graduation'></i>
            ,
            to: '/Admin/AddTeachers',
            section: 'teacherss'
        },
        {
          display: 'Launch Exam',
          icon:<i className="fa-solid fa-pen" style={{color: "#ffffff",fontSize:'17px'}}></i>,
          to: '/Admin/LaunchExam',
          section: 'Exam'
        },
        {
            display: 'Add Marks',
            icon: <i className='bx bx-receipt' style={{fontSize:'24px'}}></i>,
            to: '/Admin/AddMarks',
            section: 'Marks'
        },
        {
            display: 'Installments',
            icon:<i className="fa-brands fa-instalod"  style={{color: "#ffffff",fontSize:'22px'}}></i>,
            to: '/Admin/Installments',
            section: 'Installment'
        },
        {
            display: 'Fees Upadate',
            icon:<i className="fa-solid fa-wallet" style={{color: "#ffffff",fontSize:'20px'}}></i>,
            to: '/Admin/FeesUpadate',
            section: 'Fees'
        },
   
    ]

    const Sidebar = () => {
        const [activeIndex, setActiveIndex] = useState(0);
        const [stepHeight, setStepHeight] = useState(0);
        const sidebarRef = useRef();
        const indicatorRef = useRef();
        const location = useLocation();
        const [isSidebarOpen, setIsSidebarOpen] = useState(false);
       const [isSlideBarVisible, setIsSlideBarVisible] = useState(false);


        setTimeout(() => {
          if (sidebarRef.current) {
            const sidebarItem = sidebarRef.current.querySelector('.sidebar__menu__item');
            if (sidebarItem) {
              indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
              setStepHeight(sidebarItem.clientHeight);
            }
          }
        }, 50);

        // change active index
        useEffect(() => {
            const curPath = window.location.pathname.split('/')[1];
            const activeItem = sidebarNavItems.findIndex(item => item.section === curPath);
            setActiveIndex(curPath.length === 0 ? 0 : activeItem);
        }, [location]);

         const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('sidebar--hidden');
  };
return<div className= {`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar__profile">
          <div className="sidebar__profile__photo">
            <img src={abhay} alt="Profile" />
          </div>
          <div className="sidebar__profile__name">
            Abhay Yadav
            <hr />
          </div>
        </div>
        <div ref={sidebarRef} className={`sidebar__menu ${isSlideBarVisible ? 'slide-bar-visible' : ''}`}>
          {/* <div ref={indicatorRef}></div> */}
          {sidebarNavItems.map((item, index) => (
            <Link to={item.to} key={index} ref={indicatorRef}>
              <div className={`sidebar__menu__item ${activeIndex === index ? 'active' : ''}`}>
                <div className="sidebar__menu__item__icon">{item.icon}</div>
                <div className="sidebar__menu__item__text">{item.display}</div>
              </div>
              <hr />
            </Link>
          ))}
        </div>
      <div className="sidebar__toggle" onClick={handleToggleSidebar}>
      {!isSidebarOpen ? (
        <i className="fa-solid fa-xmark" style={{ color: 'white', height: '2em' }}></i>
      ) : (
        <i className="fa-solid fa-bars" style={{ color: 'white', height: '2em' }}></i>
      )}
    </div>

      </div>
    };

    export default Sidebar;