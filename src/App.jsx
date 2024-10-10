import { BrowserRouter, Route, Routes } from "react-router-dom";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import LayoutAdmin from "./components/layout/layoutAdmin";
import ListStudent from "./pages/admin/QLSV/ListStudent";
import ListTeacher from "./pages/admin/QLGV/ListTeacher";
import GetAllCourseSemesterGroup from "./pages/admin/OC/GetAllCourseSemesterGroup";
import Layout from "./components/layout/layout";
import StudentInfo from "./pages/student/StudentInfo";
import Ctdt from "./pages/student/Ctdt";
import Tkb from "./pages/student/Tkb";
import SignIn from "./pages/auth/signin";
import LayoutTeacher from "./components/layout/layoutTeacher";
import Tkbgv from "./pages/teacher/tkbgv";
import ClassDetail from "./pages/teacher/classDetail";
import TeacherInformation from "./pages/teacher/teacherInFormation";
import ListSubject from "./pages/admin/QLMH/ListSubject";
import ListSemesterGroup from "./pages/admin/QLKH/ListSemesterGroup";
import Dkh from "./pages/student/dkh";
import PrivateRouter from "./components/privateRoute";
import AddCourseSemesterGroup from "./pages/admin/OC/AddNewCourseSemesterGroup";
import Kqht from "./pages/student/Kqht";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/authenticate/signin" element={<SignIn />} />

        {/* <Route path="/teacher" element={<LayoutTeacher/>}>
          <Route path="getSchedule" element={<GetSchedule/>}/>
          <Route path="getDetailClass" element={<GetDetailClass/>}/>
          <Route path="updateStudentScore" element={<UpdateStudentScore/>}/>
        </Route> */}

        {/* <Route path="/student" element={<LayoutStudent/>}>
          <Route path="getInformation" element={<StudentInfo/>}/>
          <Route path="register" element={<RegisterClassInfo/>}>
            <Route path="add" element={<AddRegisterClass/>}/>
            <Route path="getRegister" element={<GetRegisterClass/>}/>
            <Route path="remove" element={<RemoveRegisterClass/>}/>
          </Route>
          <Route path="getTimeTable" element={<GetTimeTable/>}/>
          <Route path="getTranscript" element={<GetTranscript/>}/>
        </Route> */}

        <Route
          path="/student"
          element={
            <PrivateRouter requiredRole="STUDENT">
              <Layout />
            </PrivateRouter>
          }
        >
          <Route index element={<StudentInfo />} />
          <Route path="StudentInfo" element={<StudentInfo />} />
          <Route path="Ctdt" element={<Ctdt />} />
          <Route path="Tkb" element={<Tkb />} />
          <Route path="Dkh" element={<Dkh />} />
          <Route path="KQHT" element={<Kqht />} />
        </Route>
        <Route
          path="/teacher"
          element={
            <PrivateRouter requiredRole="TEACHER">
              <LayoutTeacher />
            </PrivateRouter>
          }
        >
          <Route index element={<TeacherInformation />} />
          <Route path="Tkbgv" element={<Tkbgv />} />
          <Route path="classDetail" element={<ClassDetail />} />
        </Route>
        <Route
          path="/admin"
          element={
            <PrivateRouter>
              <LayoutAdmin />
            </PrivateRouter>
          }
        >
          <Route path="/admin" index element={<ListStudent />} />
          <Route path="User">
            <Route index element={<ListStudent />} />
            <Route path="getTeacher" element={<ListTeacher />} />
          </Route>
          <Route path="getAllSemesterGroup" element={<ListSemesterGroup />} />
          <Route path="getAllCourse" element={<ListSubject />} />
          <Route
            path="CourseSemesterGroupController"
            element={<GetAllCourseSemesterGroup />}
          />
          <Route
            path="AddCourseSemesterGroup"
            element={<AddCourseSemesterGroup />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
