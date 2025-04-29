import React, { useState , useEffect } from 'react';
import axios from 'axios';
import './AddNoticeForm.css';
import Swal from 'sweetalert2';
// import { useNavigate } from 'react-router-dom';

function AddNoticeForm() {
  // const navigate = useNavigate();

  // const [imgFile, setImgFile] = useState(null);
  const [multiFiles, setMultiFiles] = useState([]);
  const [className, setClassName] = useState('');
  const [data, setData] = useState([]); 

  const handleMultiFileChange = (e) => {
    const files = Array.from(e.target.files);
    setMultiFiles(files);
  };

  useEffect(() => {
    // Fetch notices data from the server
    fetchNoticeImages();
  }, []);

  const fetchNoticeImages = () =>{
    axios.get('http://localhost:5000/api/notice_images')
      .then(res => {
        setData(res.data.data);
      })
      .catch(err => {
        console.log(err);
      });

  }

  const handleClick = () => {
    const formData = new FormData()
    multiFiles.forEach((file, index) => {
      formData.append('notice', file);
    });
  
    formData.append('title' , className )
    axios.post('http://localhost:5000/api/notice_images' , formData)
    .then(res => {
       
        const { message } = res.data; 
        console.log(message)
           if (message === 'Added_successfully') {
       
        showNotification('Add Notice', `${className}`,'successfully added','success');
      }
   
      // window.location.reload();

    })
    .catch(err =>{
        console.log(err);
        showNotification('Add Notice', `${className}`,'successfully added','success');
    })
  };
  const handleDelete = (noticeId) => {
    axios
      .delete(`http://localhost:5000/api/notice_images/${noticeId}`)
      .then((res) => {
        let message = res.data.message
        if(message === 'Notice_deleted_successfully'){
          showNotification('Delete Notice', 'notice','successfully deleted','success')
        }
        
        setData(prevData => prevData.filter(item => item._id !== noticeId));  
        // window.location.reload();
      })
      .catch((err) => {
        showNotification('Oops', 'notice','Something went wrong','error')
      });
  };
  const showNotification = (title, NoticeName, message , status) => {
    if(status == 'success'){
      Swal.fire({
        title: title,
        text: `${NoticeName} ${message}`,
        icon: status,
        confirmButtonText: 'Okay'
      });
      fetchNoticeImages();
    }else if(status == 'error'){
      Swal.fire({
        title: title,
        text: `${message}`,
        icon: status,
        confirmButtonText: 'Okay'
      });
      fetchNoticeImages();
    }
  };
  return (
    <div className="card-admin" >
      <h4 style={{ color: 'white'}}>Add Notice</h4>
      <div className="adminform">
       
        <input multiple onChange={handleMultiFileChange} placeholder="Select the image" className="input-admin-file" type="file" />
        <ul className="file-list">{/* Apply the "file-list" class to the <ul> element */} 
        {multiFiles.map((file, index) => (
          <li key={index}>{file.name}</li>
        ))}
      </ul>
        <div className="multi-file-preview">
          {multiFiles.map((file, index) => (
            <img key={index} src={URL.createObjectURL(file)} alt={`Selected ${index}`} className="image-preview" />
          ))}
        </div>
        <input style={{color:'black'}}
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          placeholder='Title'
          className='input-admin'
          type='text'
          id='className'
          required
        />
        <button onClick={handleClick} className="btn btn-primary" style={{position:'relative',left:'7em',margin:'10px'}}>
          SUBMIT
        </button>
      </div>
       {/* Display the list of notices */}
 
       <div className='wrapper'>
    
       {data.map((notice) => (
        <div key={notice._id} className="notice-item">
          <span >{notice.title}</span>
         

          {/* Add a delete button */}
          <button  className='delete-button' onClick={() => handleDelete(notice._id)}>Delete</button>
        </div>
      ))}
      </div>
    </div>
  );
}

export default AddNoticeForm;
