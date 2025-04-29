import React, { Fragment , useState, useEffect  } from 'react';
import axios from 'axios';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {Link} from 'react-scroll';
// import logo from '../images/keshav.png';
// import logo from '../images/logo.JPG';
import e1 from '../images/new_year.jpg';
import e2 from '../images/republic.jpg';
import e3 from '../images/field_visit.jpg';
import e4 from '../images/Independance_Day.jpg';
import e5 from '../images/childrens_day.jpg';
import { Carousel } from 'react-responsive-carousel';
import '../MyComponents/WhyUs.css';
import styled from 'styled-components';

  const ResponsiveImage = styled.img`
  height: 400px;
  width: auto;

 

  @media (max-width: 480px) {
    height: 200px;
   
  }
`;

const ResponsiveText = styled.p`
  background: transparent;
  font-size: 30px;
  color: orange;
  font-weight: bold;
  padding: "10px",
  position: "relative",
  bottom: "20px",
  left: "20px",
  width: "40%",
  textAlign: "center",

  @media (max-width: 480px) {
      fontSize:'15px';
      fontWeight:'bold';
      background: transparent;
      color:'orange';
    }
`;

const ResponsiveText1 = styled.p`
@media (max-width: 480px) {
    fontSize:'10px';
   
  }
`;

const WhyUs = () => {

  const [teachersData, setTeachersData] = useState([]);
  const [toggleState, setToggleState] = useState(1);
  const [subjectsData, setSubjectsData] = useState([]);
  const [subjectNamesMap, setSubjectNamesMap] = useState({});
    useEffect(() => {
      fetchTeachers();
      fetchSubjects();
    }, []); 

    const getSubjectNames = (subjectIds) => {
      return subjectIds.map((id) => subjectNamesMap[id] || "All Subjects");
    };

    const fetchSubjects = () => {
      axios
        .get("http://localhost:5000/api/subjectsDetails")
        .then((response) => {
          const fetchedSubjects = response.data.data;
          console.log("Subjects Data:", fetchedSubjects);
    
          // Build a map of subject IDs to names for quick lookup
          const subjectsMap = fetchedSubjects.reduce((map, subject) => {
            map[subject._id] = subject.subjectName;
            return map;
          }, {});
          setSubjectsData(fetchedSubjects);
          setSubjectNamesMap(subjectsMap);
        })
        .catch((error) => {
          console.error("Error fetching subject data:", error);
        });
    };

    const fetchTeachers = () => {
      axios
        .get("http://localhost:5000/api/teachers")
        .then((response) => {
          const fetchedTeachers = response.data.data;
          console.log("Teachers Data:", fetchedTeachers);
          setTeachersData(fetchedTeachers);
        })
        .catch((error) => {
          console.error("Error fetching teacher data:", error);
        });
    };

    const testimonials = [...teachersData.map((teacher) => ({
      name: teacher.teacherName,
      Qualification: teacher.qualification,
      Experience: teacher.experiance,
      Subjects: getSubjectNames(teacher.subject).join(", "),
      image: `http://localhost:5000/${teacher.teacherPic}`,
    }))];
 
    const toggleTab = (index) => {
      setToggleState(index);
    };

    const [current, setCurrent] = useState(0);

    const handleNext = () => {
      setCurrent(current === testimonials.length - 1 ? 0 : current + 1);
    };
  
    const handlePrev = () => {
      setCurrent(current === 0 ? testimonials.length - 1 : current - 1);
    };
   

    return (
       
      <Fragment>
   <div className="about" id='whyus'>
      <div className="bloc-tabs">
        <button
        id='whyus'
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          Features
        </button>
        <button
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
          Activities
        </button>
        <button
          className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(3)}
        >
          Teachers
        </button>
        {/* <button
          className={toggleState === 4 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(4)}
        >
          AboutUs
        </button> */}
      </div>

      <div className="content-tabs">
        <div
          className={toggleState === 1 ? "content  active-content" : "content"}
        >
           
           <div className='cont-head' style={{position: 'relative', top: 0, left: 0,}}><h2 className='h2' >Key Features</h2></div>
          <br />
          <main> 
             <section className='feature'>
            <div className='h2'><li>Quality Education</li></div>
            <p>We Focus on Quality Education <br></br>Our educators are knowledgeable and experienced in the field of teaching, capable of imparting high-quality education to the learners.</p>
        </section>
        <section className='feature'>
            <div className='h2'><li>Flexible Learning Hours</li></div>
            <p>We provide flexibility in timing, such as weekend classes or evening classes, to accommodate the schedule of working professionals.</p>
        </section>

            <section className='feature'>
            <div className='h2'><li>Every Weekend Test</li></div>
            <p>Our educators are knowledgeable and experienced in the field of business, capable of imparting high-quality education to the learners.</p>
        </section>
        <section className='feature'>
            <div className='h2'><li>Practical Learning</li></div>
            <p>Including case studies, projects, and other practical applications in the curriculum can help students to understand the concepts more effectively.</p>
        </section>
        <section className='feature'>
            <div className='h2'><li>Online Student's Records</li></div>
            <p>Parents can track student's success growth online</p>
        </section>
  
        <section className='feature-end'>
            <div className='h2'>To Known More</div>
            <p>Kindly Contact Us</p>
            {/* <button id="contactButton">Contact Us</button> */}
            <Link activeClass="active" to="contact" spy={true} smooth={true} offset={50} duration={500}  >  <button id="contactButton">Contact Us</button></Link>
        </section>
       
         </main>
        </div>

        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'top' , height:'70px' , position:'relative'}}><h2 style={{textAlign: "top"}} className='h2' > Activities</h2></div> 
          <br />
          <section className='feature'>
            <div className='h2' >Learnings with Fun</div>
            <ResponsiveText1 >Along with the curriculum , we also focus on the mental balance of the students.<br></br>We keep on conducting some fun events so that students can explore themselves. </ResponsiveText1>
            
            </section>
            <Carousel 
             
            showThumbs={false} 
            showStatus={false} 
            infiniteLoop  
            swipeable
            >
           <div>
      <ResponsiveImage src={e1} alt="Image 1" />
      <div>
      <ResponsiveText className="legend">New Year celebration</ResponsiveText>
  </div>
</div>
{/* <div>
  <ResponsiveImage src={e2} alt="Image 2" />
  <ResponsiveText className="legend">Republic Day</ResponsiveText>
</div> */}
<div>
  <ResponsiveImage src={e3} alt="Image 3" />
  <ResponsiveText className="legend">Field Visit</ResponsiveText>
</div>
<div>
  <ResponsiveImage src={e4} alt="Image 4" />
  <ResponsiveText className="legend">Independence Day</ResponsiveText>
</div>
<div>
  <ResponsiveImage src={e5} alt="Image 5" />
  <ResponsiveText className="legend">Childrens Day</ResponsiveText>
</div>

            {/* Add as many slides as you need... */}
        </Carousel>

        
        </div>

        <div
          className={toggleState === 3 ? "content  active-content" : "content"}
        >
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'top' , height:'70px' , position:'relative'}}> <h2 style={{textAlign: "top"}} className='h2'>Educators</h2></div> 
          <br />
          <section className='feature'>
            <div className='h2' >Quality Tutors</div>
            <p style={{fontSize:'25px'}}> Quality Education Requires Quality Educators and thats what we try to provide </p>
            </section>
            <section className="container">
      <div className="testimonial">
        {testimonials.map((testimonial, index) => (
          <div className={`slide1 ${index === current ? 'active' : ''}`} key={index}>
            <img src={testimonial.image} alt="" className="image" />
            <p>{testimonial.text}</p>
            <i className="bx bxs-quote-alt-left quote-icon"></i>
            <div className="details">
              <span className="name">{testimonial.name}</span><br></br>
              <span className="Qualification">{testimonial.Qualification}</span><br></br>
              <span className="Subjects">{testimonial.Subjects}</span><br></br>
              <span className="Experience">{testimonial.Experience}</span><br></br>
            </div>
          </div>
        ))}
        <button className="nav-btn" onClick={handlePrev}>Prev</button>
        <button className="nav-btn" onClick={handleNext}>Next</button>
      </div>
    </section>
        </div>

        {/* <div
          className={toggleState === 4 ? "content  active-content" : "content"}
        >
          <h2  className='h2'>About Us</h2>
          <br />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos sed
            nostrum rerum laudantium totam unde adipisci incidunt modi alias!
            Accusamus in quia odit aspernatur provident et ad vel distinctio
            recusandae totam quidem repudiandae omnis veritatis nostrum
            laboriosam architecto optio rem, dignissimos voluptatum beatae
            aperiam voluptatem atque. Beatae rerum dolores sunt.
          </p>
        </div> */}
      </div>
    </div>
      </Fragment>
    )
}

export default WhyUs