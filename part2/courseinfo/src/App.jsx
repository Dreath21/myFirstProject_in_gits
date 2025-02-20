import { useState } from 'react'
import Course from './Course'

const App = ({courses}) => {
  console.log("course running!...", courses);
  return (
    <div>
      {courses.map(course=> <Course key={course.id} course={course} />)}
      
    </div>
  )
}

export default App