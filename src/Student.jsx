import axios from 'axios';
import {useEffect, useState } from "react";
import './Student.css';

 
function Student()
{
    const [studentId, setId] = useState('');
    const [studentName, setName] = useState("");
    const [studentDob, setDob] = useState("");
    const [studentEmail, setEmail] = useState("");
    const [studentMobile, setMobile] = useState("");
    const [studentCourse, setCourse] = useState("");
    const [students, setStudents] = useState([]);
  
  
   
  useEffect(() => {
    (async () => await Load())();
    }, []);
   
   
    async function  Load()
    {
       const result = await axios.get(
           "http://localhost:4000/student/get-all");
           setStudents(result.data);
           console.log(result.data);
    }
   
  
    
       async function save(event)
      {
          event.preventDefault();
      try
          {
           await axios.post("http://localhost:4000/student/save",
          {
          studentName: studentName,
          studentDob: studentDob,
          studentEmail:studentEmail,
          studentMobile:studentMobile,
          studentCourse: studentCourse
          });
            alert("Student Registation Successfully");
            setId("");
            setName("");
            setDob("");
            setEmail("");
            setMobile("");
            setCourse("");
            Load();
          }
      catch(err)
          {
            alert("User Registation Failed");
          }
     }
  
   
     async function editStudent(students)
     {
        setId(students.studentId);
      setName(students.studentName);
      setDob(students.studentDob);
      setEmail(students.studentEmail);
      setMobile(students.studentMobile);
      setCourse(students.studentCourse);
      
     }
   
     async function DeleteStudent(studentId)
     {
          await axios.delete("http://localhost:4000/student/delete/" + studentId); 
          alert("Student deleted Successfully");
          Load();
     }
   
     async function update(event)
     {
      event.preventDefault();
   
     try
         {
          await axios.put("http://localhost:4000/student/edit/" + studentId ,
         {
  
            studentName: studentName,
            studentDob: studentDob,
            studentEmail:studentEmail,
            studentMobile:studentMobile,
            studentCourse: studentCourse
         
         });
           alert("Registation Updateddddd");
           setId("");
           setName("");
           setDob("");
           setEmail("");
           setMobile("");
           setCourse("");
           Load();
         }
     catch(err)
         {
           alert("Student Updateddd Failed");
         }
    }
    return (
        <div>
           <h1>Student Details</h1>
           <div class="container mt-4" >
              <form>
                 
                  <div class="form-group">
                    <label>Student Name</label>
                    <input  type="text" class="form-control" id="studentname"
                    value={studentName}
                    onChange={(event) =>
                      {
                        setName(event.target.value);      
                      }}
                    />
                  </div>
    
    
                  <div class="form-group">
                    <label>Student DOB</label>
                    <input  type="text" class="form-control" id="studentaddress" 
                     value={studentDob}
                      onChange={(event) =>
                        {
                          setDob(event.target.value);      
                        }}
                    />
                  </div>
    
                  <div class="form-group">
                    <label>Mobile</label>
                    <input type="text" class="form-control" id="mobile" 
                      value={studentMobile}
                    onChange={(event) =>
                      {
                        setMobile(event.target.value);      
                      }}
                    />    
                  </div>

                  <div class="form-group">
                    <label>Email</label>
                    <input type="text" class="form-control" id="mobile" 
                      value={studentEmail}
                    onChange={(event) =>
                      {
                        setEmail(event.target.value);      
                      }}
                    />
                  </div>

                  <div class="form-group">
                    <label>Course</label>
                    <input type="text" class="form-control" id="mobile" 
                      value={studentCourse}
                    onChange={(event) =>
                      {
                        setCourse(event.target.value);      
                      }}
                    />
                  </div>
                  <div>
                  <button   class="btn btn-primary mt-4"  onClick={save}>Register</button>
    
                  <button   class="btn btn-warning mt-4"  onClick={update}>Update</button>
                  </div>   
                </form>
              </div>
                    <br/>
    <table class="table table-dark" align="center">
      <thead>
        <tr>
          <th scope="col">Student Name</th>
          <th scope="col">DOB</th>
          <th scope="col">Mobile</th>
          <th scope="col">Email</th>
          <th scope="col">Course</th>
          
          <th scope="col">Option</th>
        </tr>
      </thead>
           {students.map(function fn(student)
           {
                return(
                <tbody>
                    <tr>
                    <td>{student.studentName}</td>
                    <td>{student.studentDob}</td>
                    <td>{student.studentMobile}</td>      
                    <td>{student.studentEmail}</td>      
                    <td>{student.studentCourse}</td>      
                    <td>
                        <button type="button" class="btn btn-warning"  onClick={() => editStudent(student)} >Edit</button>  
                        <button type="button" class="btn btn-danger" onClick={() => DeleteStudent(student.studentId)}>Delete</button>
                    </td>
                    </tr>
                </tbody>
                );
                })}
                </table>
           </div>
                );
            }
      
      export default Student;  