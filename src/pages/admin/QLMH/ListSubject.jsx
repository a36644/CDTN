import { FcInfo } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { fetchData, postData, putData } from "../../../lib/api";
import "../../../App.css";
import Select from "react-select";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { toast } from "react-toastify";

const type = [
  { value: "COSO", label: "Cơ Sở" },
  { value: "COSONGANH", label: "Cơ Sở Ngành" },
  { value: "CHUYENNGANH", label: "Chuyên Ngành" },
];

function getMajorsByDepartmentIds(departments, departmentIds) {
  return departments
    .filter((department) => departmentIds.includes(department.departmentId))
    .map((department) => department.listMajor)
    .flat();
}

const ListSubject = () => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [courses, setCourses] = useState([]);
  const [isRefresh, setIsRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selectedType, setSelectedType] = useState();
  const [isModalNewCoursOpen, setIsModalNewCoursOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReqiId, setSelectedReqiId] = useState([]);
  const [optionDepartment, setOptionDepartment] = useState([]);
  const [departmentId, setDepartmentId] = useState([]);
  const [majorId, setMajorId] = useState([]);
  const [listMajorOfDepartment, setListMajorOfDepartment] = useState([]);
  const [departmentCourses, setDepartmentCourses] = useState([]);
  const [majorCourses, setMajorCourses] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [coefficient, setCoefficient] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    fetchData("admin/Department")
      .then((res) => {
        setOptionDepartment(res.body);
      })
      .catch((e) => toast.error(e.response.data))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchData("admin/Course/getAllBaseCourse")
      .then((data) => {
        const courses = data.map((course) => ({
          value: course.courseId,
          label: course.courseName,
        }));
        setListMajorOfDepartment(courses); // Đặt danh sách khóa học cơ bản mặc định
      })
      .catch((e) => toast.error(e.response.data))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const result = await fetchData("admin/Course/getAllCourse");
        setCourses(result);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [isRefresh]);

  // Hàm thêm/sửa
  const onSubmit = async (data) => {
    const transformData = {
      ...data,
      reqiId: selectedReqiId,
      departmentId: departmentId,
      majorId: majorId,
      type: selectedType,
    };

    if (editingId !== null) {
      try {
        await putData("admin/Course/updateCourse", transformData);
        setLoading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        await postData("admin/Course/addCourse", transformData);
        toast.success("Thêm môn học thành công");
        setIsRefresh(!isRefresh);
        setLoading(false);
      } catch (e) {
        toast.error(e.response.data);
        setIsRefresh(!isRefresh);
      } finally {
        setLoading(false);
      }
    }
    reset();
    closeModalNewCours();
  };

  const openModalNewCours = () => {
    setIsModalNewCoursOpen(true);
  };

  const resetPrerequisiteList = () => {
    setSelectedReqiId([]);
    setListMajorOfDepartment([]);
    fetchData("admin/Course/getAllBaseCourse")
      .then((data) => {
        const courses = data.map((course) => ({
          value: course.courseId,
          label: course.courseName,
        }));
        setListMajorOfDepartment(courses); // Đặt lại danh sách khóa học cơ bản mặc định
      })
      .catch((error) => console.error("Failed to reset base courses:", error));
  };

  const closeModalNewCours = () => {
    reset();
    resetPrerequisiteList();
    setIsModalNewCoursOpen(false);
    setDepartmentId([]);
    setMajorId([]);
    setEditingId(null);
    setSelectedReqiId([]);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCourseSemester = courses.filter(
    (course) =>
      course.courseId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.courseName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (selectedType) {
      setSelectedReqiId([]);
      setValue("departmentId", null);
      setValue("majorId", null);
    }
  }, [selectedType]);

  useEffect(() => {
    Promise.all(
      departmentId.map((id) =>
        fetchData(`admin/Course/getAllCoursebyDepartment?id=${id}`)
          .then((res) =>
            res.map((course) => ({
              value: course.courseId,
              label: course.courseName,
              departmentId: id,
            }))
          )
          .catch((e) => {
            console.error(`Failed to fetch courses for departmentId: ${id}`, e);
            return [];
          })
      )
    ).then((allDepartmentCourses) => {
      const newDepartmentCourses = {};
      allDepartmentCourses.forEach((courses, index) => {
        newDepartmentCourses[departmentId[index]] = courses;
      });
      setDepartmentCourses(newDepartmentCourses);

      updatePrerequisiteList(newDepartmentCourses, majorCourses);
    });
  }, [departmentId]);

  useEffect(() => {
    Promise.all(
      majorId.map((id) =>
        fetchData(`admin/Course/getCourseByMajor?id=${id}`)
          .then((res) =>
            res.map((course) => ({
              value: course.courseId,
              label: course.courseName,
              majorId: id,
            }))
          )
          .catch((e) => {
            console.error(`Failed to fetch courses for majorId: ${id}`, e);
            return [];
          })
      )
    ).then((allMajorCourses) => {
      const newMajorCourses = {};
      allMajorCourses.forEach((courses, index) => {
        newMajorCourses[majorId[index]] = courses;
      });
      setMajorCourses(newMajorCourses);

      updatePrerequisiteList(departmentCourses, newMajorCourses);
    });
  }, [majorId]);

  const updatePrerequisiteList = (departmentCourses, majorCourses) => {
    const departmentCoursesArray = Object.values(departmentCourses).flat();
    const majorCoursesArray = Object.values(majorCourses).flat();

    const combinedCourses = [
      ...listMajorOfDepartment.filter(
        (course) => !course.departmentId && !course.majorId
      ), // giữ các khóa học cơ bản
      ...departmentCoursesArray,
      ...majorCoursesArray,
    ];

    const uniqueCourses = combinedCourses.reduce((acc, current) => {
      if (!acc.some((course) => course.value === current.value)) {
        acc.push(current);
      }
      return acc;
    }, []);

    setListMajorOfDepartment(uniqueCourses);
  };

  const handleCoefficientChange = (e) => {
    const value = e.target.value;
    if (value && (isNaN(value) || parseFloat(value) < 0)) {
      setError('Hệ số không được nhỏ hơn 0 và phải là số');
    } else {
      setError('');
    }

    setCoefficient(value);
  };

  return (
    <div className="">
      {loading && <LoadingSpinner />}
      <div className="w-full bg-gray-100 p-6 overflow-auto mt-16 h-[90vh] ">
        <div className="flex items-center ">
          <FcInfo className="w-[33px] h-[33px]" />
          <h1 className="text-[1.4993rem] pl-[8px] font-bold text-red-700 uppercase">
            Danh sách môn
          </h1>
        </div>
        <hr className="mb-3"></hr>
        <div className="p-4 bg-white shadow-sm border">
          <div className="w-full mb-2 mx-auto gap-10 flex items-center">
            <div className="w-1/3">
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only"
              >
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 h-[38px] start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500"
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
                  placeholder="Search ID"
                  required
                />
                <button
                  type="submit"
                  className="text-white absolute end-1 bottom-1 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-3 py-1.5"
                >
                  Search
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
            </div>
          </div>

          <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-xs text-left rtl:text-right text-gray-500">
              <thead className="text-gray-700 bg-gray-50">
                <tr className="text-center">
                  <th className="px-4 py-3 w-6">Mã học phần</th>
                  <th className="px-4 py-3">Tên học phần</th>
                  <th className="px-4 py-3">Tín chỉ</th>
                  <th className="px-4 py-3">Hệ số</th>
                  <th className="px-4 py-3">Phân loại</th>
                  <th className="px-4 py-3">Yêu cầu tín chỉ</th>
                </tr>
              </thead>
              <tbody>
                {filteredCourseSemester.length > 0 ? (
                  filteredCourseSemester.map((course) => (
                    <tr
                      key={course.courseId}
                      className="hover:bg-gray-100 text-center"
                    >
                      <td className="px-6 py-4 border-b border-gray-300">
                        {course.courseId}
                      </td>
                      <td className="px-6 py-4 border-b border-gray-300">
                        {course.courseName}
                      </td>
                      <td className="px-6 py-4 border-b border-gray-300">
                        {course.credits}
                      </td>
                      <td className="px-6 py-4 border-b border-gray-300">
                        {course.coefficient}
                      </td>
                      <td className="px-6 py-4 border-b border-gray-300">
                        {course.type}
                      </td>
                      <td className="px-6 py-4 border-b border-gray-300">
                        {course.requestCredits}
                      </td>
                    </tr>
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

      {isModalNewCoursOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative w-1/2 bg-white rounded-lg shadow">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
              <h2 className="text-lg font-semibold text-gray-900">
                {editingId !== null ? "Cập nhật môn học" : "Thêm Môn Học"}
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
            <form className="p-4 md:p-5" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2 grid-cols-2">
                <div className="">
                  <label
                    htmlFor="courseId"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Mã học phần
                  </label>
                  <input
                    {...register("courseId", { required: true })}
                    type="text"
                    id="courseId"
                    name="courseId"
                    placeholder="Mã học phần"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                  />
                </div>
                <div className="">
                  <label
                    htmlFor="courseName"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Tên học phần
                  </label>
                  <input
                    {...register("courseName", { required: true })}
                    type="text"
                    id="courseName"
                    name="courseName"
                    placeholder="Tên học phần"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                  />
                </div>
                <div className="">
                  <label
                    htmlFor="credits"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Tín chỉ
                  </label>
                  <input
                    {...register("credits", { required: true })}
                    type="number"
                    min={1}
                    id="credits"
                    name="credits"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Số tín"
                    required
                  />
                </div>
                <div className="">
                  <label
                    htmlFor="coefficient"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Hệ số
                  </label>
                  <input
                    {...register("coefficient", { required: true })}
                    type="text"
                    id="coefficient"
                    name="coefficient"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Hệ số"
                    onChange={handleCoefficientChange}
                    required
                  />
                  {error && <p className="text-red-600 font-thin text-xs">{error}</p>}
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="sl-group"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Phân loại môn
                  </label>
                  <Select
                    placeholder="Phân loại môn"
                    options={type}
                    onChange={(e) => {
                      setSelectedType(e.value);
                      if (e.value === "COSO") {
                        resetPrerequisiteList();
                      }
                    }}
                    className="text-sm focus-visible:ring"
                  />
                </div>
                {selectedType === "COSONGANH" && (
                  <>
                    <div className="relative w-full mb-3 group col-span-2">
                      <label
                        htmlFor="faculty"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Khoa
                      </label>
                      <Select
                        name="departmentId"
                        isMulti
                        placeholder="Chọn khoa"
                        onChange={(e) => {
                          setDepartmentId(e.map((item) => item.value));
                        }}
                        options={optionDepartment.map((item) => {
                          return {
                            value: item.departmentId,
                            label: item.departmentName,
                          };
                        })}
                      />
                    </div>
                  </>
                )}

                {selectedType === "CHUYENNGANH" && (
                  <>
                    <div className="relative w-full group col-span-2">
                      <label
                        htmlFor="faculty"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Khoa
                      </label>
                      <Select
                        name="departmentId"
                        isMulti
                        placeholder="Chọn khoa"
                        onChange={(e) =>
                          setDepartmentId(e.map((item) => item.value))
                        }
                        options={optionDepartment.map((item) => {
                          return {
                            value: item.departmentId,
                            label: item.departmentName,
                          };
                        })}
                      />
                    </div>

                    <div className="relative w-full group col-span-2">
                      <label
                        htmlFor="majorId"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Chuyên ngành
                      </label>
                      <Select
                        name="majorId"
                        isMulti
                        placeholder="Chọn chuyên ngành"
                        onChange={(e) =>
                          setMajorId(e.map((item) => item.value))
                        }
                        options={getMajorsByDepartmentIds(
                          optionDepartment,
                          departmentId
                        ).map((item) => {
                          return {
                            value: item.majorId,
                            label: item.majorName,
                          };
                        })}
                      />
                    </div>
                  </>
                )}
                <div className="col-span-2">
                  <label
                    htmlFor="requestCourse"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Học phần tiên quyết
                  </label>
                  <Select
                    options={listMajorOfDepartment}
                    isMulti
                    placeholder="Chọn điều kiện tiên quyết"
                    onChange={(e) =>
                      setSelectedReqiId(e.map((item) => item.value))
                    }
                  />
                </div>

                <div className="col-span-2">
                  <label
                    htmlFor="requestCredits"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Yêu cầu tín chỉ
                  </label>
                  <input
                    {...register("requestCredits")}
                    type="number"
                    min={0}
                    defaultValue={0}
                    name="requestCredits"
                    placeholder="Yêu cầu tín chỉ"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  />
                </div>

                <div className="flex justify-end col-span-2">
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
                    {editingId !== null ? "Cập nhật" : "Thêm mới"}
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

export default ListSubject;
