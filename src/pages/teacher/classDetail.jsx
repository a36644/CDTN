import { useEffect, useState } from "react";
import { FcInfo } from "react-icons/fc";
import Select from "react-select";
import { fetchData, putData } from "../../lib/api";
import { toast } from "react-toastify";

const removeDuplicateClassrooms = (classrooms) => {
  const uniqueClassrooms = [];
  const seenIds = new Set();

  classrooms.forEach((classroom) => {
    if (!seenIds.has(classroom.classRoomId)) {
      seenIds.add(classroom.classRoomId);
      uniqueClassrooms.push(classroom);
    }
  });

  return uniqueClassrooms;
};

const ClassDetail = () => {
  const [editableId, setEditableId] = useState(null);
  const [midTermInput, setMidTermInput] = useState(0);
  const [finalScoreInput, setFinalScoreInput] = useState(0);
  const [semesters, setSemesters] = useState([]);
  const [listSemesters, setListSemesters] = useState([]);
  const [classRoom, setClassRoom] = useState([]);
  const [selectSemester, setSelectSemester] = useState(null);
  const [classDetail, setClassDetail] = useState([]);
  const [selectClassRoom, setSelectClassRoom] = useState();
  const [isRefresh, setIsRefresh] = useState(false)

  useEffect(() => {
    fetchData("teacher/getAllSemester")
      .then((result) => {
        setListSemesters(result);
        setSemesters(
          result.map((item) => {
            return {
              value: item.semesterGroupId,
              label: item.semesterGroupId,
            };
          })
        );
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    fetchData(
      `teacher/getDetailClass?semesterGroupId=${selectSemester}&ClassId=${selectClassRoom}`
    )
      .then((result) => {
        setClassDetail(result.studentList);
      })
      .catch((e) => {console.log(e);
      });
  }, [selectClassRoom, isRefresh]);

  const handleEdit = (student) => {
    setEditableId(student.studentId);
    setMidTermInput(student.midScore);
    setFinalScoreInput(student.endScore);
  };

  const handleSave = (student) => {

    const midScore = Number(midTermInput);
  const finalScore = Number(finalScoreInput);

  // Kiểm tra điểm phải nằm trong khoảng 0 đến 10
  if (midScore < 0 || midScore > 10 || finalScore < 0 || finalScore > 10) {
    toast.error("Điểm phải nằm trong khoảng từ 0 đến 10.");
    return;
  }
  
    const dataEdit = {
      midScore: Number(midTermInput),
      endScore: Number(finalScoreInput),
      semesterId: selectSemester,
      classRoomId: selectClassRoom,
      studentId: student.studentId
    };
    putData("teacher/updateStudentScore", dataEdit)
      .then(() => {
        toast.success("Thành công")
        setIsRefresh(!isRefresh)
      })
      .catch((e) => toast.error(e.response.data));
    setEditableId(null);
  };

  const handleChangeSemester = (semester) => {
    setSelectSemester(semester);
    const optionsClassRoom = listSemesters.find(
      (item) => item.semesterGroupId === semester
    )?.listClass;
    setClassRoom(removeDuplicateClassrooms(optionsClassRoom));
  };
  return (
    <div className="w-full bg-gray-100 p-6 overflow-auto mt-16 h-[90vh]">
      <div className="flex items-center ">
        <FcInfo className="w-[33px] h-[33px]" />
        <h1 className="text-[1.4993rem] pl-[8px] font-bold text-red-700 uppercase">
          Thông Tin Lớp Học
        </h1>
      </div>
      <hr className="mb-3"></hr>
      <div className="p-4 bg-white shadow-sm border">
        <div className="w-full  mb-2 mx-auto gap-10 flex items-center">
          <div className="relative w-1/4">
            <label
              htmlFor="sl-cours"
              className="absolute -top-2 left-3 bg-white px-1 text-gray-500 text-xs z-30"
            >
              Học kỳ
            </label>
            <Select
              options={semesters}
              onChange={(e) => handleChangeSemester(e.value)}
            />
          </div>
          <div className="relative w-1/4">
            <label
              htmlFor="sl-cours"
              className="absolute -top-2 left-3 bg-white px-1 text-gray-500 text-xs z-30"
            >
              Lớp
            </label>
            <Select
              onChange={(e) => setSelectClassRoom(e.value)}
              options={classRoom.map((item) => {
                return { value: item.classRoomId, label: item.classRoomName };
              })}
            />
          </div>
        </div>
        <hr className="my-4"></hr>
        <div className="text-center font-bold text-xl mt-4">
          Danh sách sinh viên
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Mã SV
                </th>
                <th scope="col" className="px-6 py-3">
                  Tên Sinh Viên
                </th>
                <th scope="col" className="px-6 py-3">
                  Ngày Sinh
                </th>
                <th scope="col" className="px-6 py-3">
                  Điểm quá trình
                </th>
                <th scope="col" className="px-6 py-3">
                  Điểm tổng kết
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {classDetail.map((student) => (
                <tr
                  className="hover:bg-gray-100 text-center"
                  key={student.studentId}
                >
                  <td className="px-6 py-3 border-b border-gray-300">
                    {student.studentId}
                  </td>
                  <td className="px-6 py-3 border-b text-start border-gray-300">
                    {student.studentName}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-300">
                    {student.birthDay}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-300">
                    {editableId === student.studentId ? (
                      <input
                        type="text"
                        value={midTermInput}
                        onChange={(e) => setMidTermInput(e.target.value)}
                        className="text-center text-sm w-10 p-0 border-0 bg-inherit"
                      />
                    ) : (
                      student.midScore
                    )}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-300">
                    {editableId === student.studentId ? (
                      <input
                        type="text"
                        value={finalScoreInput}
                        onChange={(e) => setFinalScoreInput(e.target.value)}
                        className="text-center text-sm w-10 p-0 border-0 bg-inherit"
                      />
                    ) : (
                      student.endScore
                    )}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-300">
                    {editableId === student.studentId ? (
                      <button
                        className="bg-green-500 text-white px-3 py-1 rounded w-20"
                        onClick={() => handleSave(student)}
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded w-20"
                        onClick={() => handleEdit(student)}
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClassDetail;
