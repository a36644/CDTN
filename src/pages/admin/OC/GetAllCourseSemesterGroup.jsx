import { FcInfo } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { deleteData, fetchData, postData } from "../../../lib/api";
import Select from "react-select";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

const GetAllCourseSemesterGroup = () => {
  const { handleSubmit, reset, setValue } = useForm();
  const [courses, setCourses] = useState([]);
  const [isRefresh, setIsRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isModalNewCoursOpen, setIsModalNewCoursOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [semester, setSemester] = useState([]);
  const [course, setCourse] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState();
  const [selectedCourse, setSelectedCourse] = useState();
  const [classRoom, setClassRoom] = useState([]);
  const [slKyHoc, setslKyHoc] = useState();

  const [expandedRows, setExpandedRows] = useState([]);

  const navigate = useNavigate();
  const handleExpand = (courseId) => {
    if (expandedRows.includes(courseId)) {
      setExpandedRows(expandedRows.filter((id) => id !== courseId));
    } else {
      setExpandedRows([...expandedRows, courseId]);
    }
  };

  useEffect(() => {
    fetchData("admin/SemesterGroup/getAllSemesterGroup")
      .then((result) => {
        setSemester(
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

    fetchData("admin/Course/getAllCourse")
      .then((result) => {
        setCourse(
          result.map((item) => {
            return {
              value: item.courseId,
              label: item.courseName,
            };
          })
        );
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    if (slKyHoc) {
      fetchData(`admin/ClassRoom/getAllRoomBySemester?id=${slKyHoc}`)
        .then((result) => {
          setClassRoom(result);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [slKyHoc, isRefresh]);

  useEffect(() => {
    if (semester) {
      setslKyHoc(semester[0]?.value);
    }
  }, [semester]);

  // Hàm thêm/sửa
  const onSubmit = async (data) => {
    if (editingId !== null) {
      const updatedCourses = courses.map((course) =>
        course.id === editingId ? { ...course, ...data } : course
      );
      setCourses(updatedCourses);
      setEditingId(null);
    } else {
      const newCourse = {
        courseId: selectedCourse,
        semesterGroupId: selectedSemester,
      };

      try {
        await postData(
          "admin/CourseSemester/addNewCourseSemesterGroup",
          newCourse
        );
        setIsRefresh(!isRefresh);
        setLoading(false);
        toast.success("Thêm thành công");
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    reset();
    closeModalNewCours();
  };

  // eslint-disable-next-line no-unused-vars
  const handleDelete = (id) => {
    const confirm = window.confirm("Bạn có chắc chắn muốn xóa không?");
    if (confirm) {
      deleteData(
        `https://66bb44386a4ab5edd637d70b.mockapi.io/api/name/monHK/`,
        id
      );
      setIsRefresh(!isRefresh);
    }
  };

  const openModalNewCours = () => {
    setIsModalNewCoursOpen(true);
  };

  const closeModalNewCours = () => {
    reset();
    setIsModalNewCoursOpen(false);
    setEditingId(null);
  };

  const openModalNewClass = () => {
    navigate("/admin/AddCourseSemesterGroup");
  };

  // Hàm đóng modal

  // Hàm chỉnh sửa
  // eslint-disable-next-line no-unused-vars
  const handleEdit = (id) => {
    const course = courses.find((course) => course.id === id);
    if (course) {
      setValue("id", course.id);
      setValue("courseSemesterGroupId", course.courseSemesterGroupId);
      setValue("name", course.courseName);
      setValue("credits", course.credits);
      setValue("coefficient", course.coefficient);
      setValue("faculty", course.faculty);
      setValue("course", course.course);
      setEditingId(id);
      openModalNewCours();
    }
  };

  // Hàm tìm kiếm
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Lọc danh sách theo từ khóa tìm kiếm
  const filteredClassRoom = classRoom.filter(
    (classRoom) =>
      classRoom.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      classRoom.courseName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="">
      {loading && <LoadingSpinner />}
      <div className="w-full bg-gray-100 p-6 overflow-auto mt-16 h-[90vh] ">
        <div className="flex items-center ">
          <FcInfo className="w-[33px] h-[33px]" />
          <h1 className="text-[1.4993rem] pl-[8px] font-bold text-red-700 uppercase">
            Đăng ký mở lớp
          </h1>
        </div>
        <hr className="mb-3"></hr>
        <div className="p-4 bg-white shadow-sm border ">
          <div className="w-full  mb-2 mx-auto gap-10 flex items-center">
            <div className="relative w-1/4">
              <label
                htmlFor="sl-cours"
                className="absolute -top-2 left-3 bg-white px-1 text-gray-500 text-xs z-30"
              >
                Học kỳ
              </label>
              <Select
                defaultValue={{ label: semester[0]?.label, value: semester[0]?.value }}
                options={semester}
                onChange={(e) => setslKyHoc(e.value)}
              />
            </div>
            {/* Search */}
            <div className="w-1/3">
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 h-[38px] start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  value={searchTerm}
                  onChange={handleSearch}
                  className="h-[38px] block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Mã lớp, tên lớp..."
                  required
                />
                <button
                  type="submit"
                  className="text-white absolute end-1 bottom-1 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-3 py-1.5"
                >
                  Tìm kiếm
                </button>
              </div>
            </div>
            <div className="ml-auto">
              <button
                onClick={openModalNewCours}
                className="mx-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
              >
                Thêm môn học
              </button>
              <button
                onClick={openModalNewClass}
                className="mx-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
              >
                Mở lớp
              </button>
            </div>
          </div>

          <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-xs text-left rtl:text-right text-gray-500">
              <thead className="text-gray-700 bg-gray-50">
                <tr className="text-center">
                  <th className="px-4 py-3 w-20">Id</th>
                  <th className="px-4 py-3">Tên môn</th>
                  <th className="px-4 py-3">Kỳ học</th>
                  <th className="px-4 py-3">Lịch học</th>
                  {/* <th className="px-4 py-3 w-[150px]">Chức năng</th> */}
                </tr>
              </thead>
              <tbody>
                {filteredClassRoom.length > 0 ? (
                  filteredClassRoom.map((course) => (
                    <>
                      <tr
                        key={course.id + course.courseName}
                        className="hover:bg-gray-100 text-center"
                      >
                        <td className="px-6 py-4 border-b border-gray-300">
                          {course.id}
                        </td>
                        <td className="px-6 py-4 border-b border-gray-300">
                          {course.courseName}
                        </td>
                        <td className="px-6 py-4 border-b border-gray-300">
                          {course.semesterGroupId}
                        </td>
                        <td className="px-6 py-4 border-b border-gray-300">
                          <button
                            onClick={() => handleExpand(course.id)}
                            className="text-gray-600"
                          >
                            {expandedRows.includes(course.id)
                              ? <FaAngleUp />
                              : <FaAngleDown />}
                          </button>
                        </td>
                        {/* <td className="px-6 py-4 border-b border-gray-300">
                          <button
                            onClick={() => handleEdit(course.id)}
                            className="mr-auto px-2 text-blue-600"
                          >
                            Sửa
                          </button>
                          <button
                            onClick={() => handleDelete(course.id)}
                            className="ml-auto px-2 text-red-600"
                          >
                            Xóa
                          </button>
                        </td> */}
                      </tr>

                      {/* Expanded Row Content */}
                      {expandedRows.includes(course.id) && (
                        <tr key={course.id + "_expanded"}>
                          <td colSpan="5" className="border-b border-gray-300">
                            <div className="p-4 bg-gray-50 flex text-left">
                              <p className="ml-10">
                                {course.classRoomDtos.map((item, index) => (
                                  <span className="flex" key={index}>
                                    {item.classRoomId}-
                                    <div className=" gap-2" key={index}>
                                      {item.lichHocList.map((lh, index) => (
                                        <div className="" key={index}>
                                          <strong> Thứ: </strong>
                                          <span className="mr-2">
                                            {Math.floor(lh.start / 10) + 2},
                                          </span>
                                          <strong> Tiết: </strong>
                                          <span>{lh.start % 10 + 1}</span>-
                                          <span className="mr-2">
                                            {lh.finish % 10 + 1},
                                          </span>
                                          <strong> Phòng:</strong>{" "}
                                          <span className="mr-2">
                                            {lh.roomId},
                                          </span>
                                          <strong> GV:</strong>{" "}
                                          <span className="mr-2">
                                            {lh.teacher?.fullName},
                                          </span>{" "}
                                          <strong> Số điện thoại: </strong>
                                          <span className="mr-2">
                                            {lh.teacher.phoneNumber};
                                          </span>
                                        </div>
                                      ))}
                                    </div>
                                  </span>
                                ))}
                              </p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-4">
                      Không tìm thấy dữ liệu
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal add new course */}
      {isModalNewCoursOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          {/* Modal Content */}
          <div className="relative w-1/3 bg-white rounded-lg shadow">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
              <h2 className="text-lg font-semibold text-gray-900">
                {editingId !== null ? "Edit Course" : "Thêm Môn Trong Kỳ"}
              </h2>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                onClick={closeModalNewCours}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* Modal Body */}
            <form className="p-4 md:p-5" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-4 mb-4">
                <div className="relative w-full mb-5 group z-auto">
                  <label
                    htmlFor="sl-semester"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Học kỳ
                  </label>
                  <Select
                    placeholder="Chọn kỳ học"
                    options={semester}
                    onChange={(e) => setSelectedSemester(e.value)}
                    className="text-sm focus-visible:ring"
                  />
                </div>

                <div className="relative w-full mb-5 group">
                  <label
                    htmlFor="sl-course"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Học phần
                  </label>
                  <Select
                    placeholder="Chọn môn học"
                    options={course}
                    onChange={(e) => setSelectedCourse(e.value)}
                    className="text-sm focus-visible:ring"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    <svg
                      className="me-1 -ms-1 mb-[-2px] w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Thêm mới
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetAllCourseSemesterGroup;
