import React, { useRef, useEffect ,Fragment } from 'react';
import '../MyComponents/Header.css';
import ReactPlayer from 'react-player'
// import logo_1 from '../images/slide1.JPG';
// import logo_2 from '../images/logo192.png';
// import logo_3 from '../images/logo512.png';
import video from '../images/TO.mp4';

//import { Carousel } from 'react-bootstrap';

  
const Header = () => {
 
 return (
  <Fragment>
 
    <div className='video' id='/' >
  
    { <video autoPlay={true} src="https://video.wixstatic.com/video/0b340f_b4aaabafff194cf6ac9ee5511f58099d/1080p/mp4/file.mp4" preload="auto" muted loop tabIndex="0" /> }

    </div>
    <h1>Welcome</h1>
      <h2>Science Academy</h2>
      <h3>...A step towards quality learning </h3>
     
     
   

  </Fragment>
  )
}

export default Header
