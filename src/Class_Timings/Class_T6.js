
import React from 'react'
import '../ClassTiming.css';
const Class_T6 = () => {
    const classTimings = [
        { day: 'Monday', timing: '9:00 AM - 11:00 AM' },
        { day: 'Tuesday', timing: '10:00 AM - 12:00 PM' },
        { day: 'Wednesday', timing: '11:00 AM - 1:00 PM' },
        { day: 'Thursday', timing: '1:00 PM - 3:00 PM' },
        { day: 'Friday', timing: '3:00 PM - 5:00 PM' },
        { day: 'Saturday', timing: '3:00 PM - 5:00 PM' },
        { day: 'Sunday', timing: '3:00 PM - 5:00 PM' },
      ];
  return (
    <div>
      <div className="class-timing-container">
      {classTimings.map((classTiming) => (
        <div className="class-timing" key={classTiming.day}>
          <div className="class-day">{classTiming.day}</div>
          <div className="class-timing-details">{classTiming.timing}</div>
        </div>
      ))}
    </div>
    </div>
  )
}

export default Class_T6