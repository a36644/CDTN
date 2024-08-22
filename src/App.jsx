import { BrowserRouter, Route, Routes } from "react-router-dom"
import SignIn from "./pages/auth/signin"
import Layout from "./components/layout/layout"
import LayoutAdmin from "./components/layout/layoutAdmin"
import StudentIfo from "./pages/student/studentifo"
import Tkb from "./pages/student/Tkb"
import Ctdt from "./pages/student/CTDT"
import ListSubject from "./pages/admin/QLMH/ListSubject"
import EditSubject from "./pages/admin/QLMH/EditSubject"
import AddSubject from "./pages/admin/QLMH/AddSubject"
import ListStudent from "./pages/admin/QLSV/ListStudent"
import CreateStudent from "./pages/admin/QLSV/CreateStudent"
import ListTeacher from "./pages/admin/QLGV/ListTeacher"
import CreateTeacher from "./pages/admin/QLGV/createTeacher"
import AddSemesterGroup from "./pages/admin/QLKH/AddSemesterGroup"
import ListSemesterGroup from "./pages/admin/QLKH/ListSemesterGroup"
import UpdateSemesterGroup from "./pages/admin/QLKH/UpdateSemesterGroup"
import AddNewCourseSemesterGroup from "./pages/admin/OC/AddNewCourseSemesterGroup"
import GetAllCourseSemesterGroup from "./pages/admin/OC/getAllCourseSemesterGroup"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/" element={<Layout/>}>
          <Route index element={<StudentIfo />} /> 
          <Route path="StudentInfo" element={<StudentIfo/>}/>
          <Route path="Ctdt" element={<Ctdt/>}/>
          <Route path="Tkb" element={<Tkb/>}/>
        </Route>
        <Route path="/admin" element={<LayoutAdmin/>}>
          <Route path="listStudent" element={<ListStudent/>}/>
          <Route path="createStudent" element={<CreateStudent/>}/>   
          <Route path="listTeacher" element={<ListTeacher/>}/>
          <Route path="createTeacher" element={<CreateTeacher/>}/> 
          <Route path="listCourse" element={<ListSubject/>}/>
          <Route path="addCourse" element={<AddSubject/>}/>   
          <Route path="updateCourse" element={<EditSubject/>}/>   
          <Route path="addSemesterGroup" element={<AddSemesterGroup/>}/>
          <Route path="getAllSemesterGroup" element={<ListSemesterGroup/>}/>
          <Route path="updateSemesterGroup" element={<UpdateSemesterGroup/>}/>
          <Route path="addNewCourseSemesterGroup" element={<AddNewCourseSemesterGroup/>}/>
          <Route path="getAllCourseSemesterGroup" element={<GetAllCourseSemesterGroup/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
