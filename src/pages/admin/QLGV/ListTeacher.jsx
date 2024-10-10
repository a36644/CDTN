import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { deleteData, fetchData, postData, putData } from "../../../lib/api";
import { FcInfo } from "react-icons/fc";
import { toast } from "react-toastify";
import LoadingSpinner from "../../../components/LoadingSpinner";


const faculties = [
  {
    name: "Công nghệ thông tin",
    majors: ["Khoa học máy tính", "Hệ thống thông tin", "Mạng máy tính"],
  },
  {
    name: "Kinh tế",
    majors: ["Quản trị kinh doanh", "Kinh tế quốc tế", "Tài chính ngân hàng"],
  },
  {
    name: "Kỹ thuật",
    majors: ["Kỹ thuật cơ khí", "Kỹ thuật điện", "Kỹ thuật ô tô"],
  },
];

const TeacherList = () => {
  const { register, handleSubmit, reset, setValue, watch } = useForm();
  const [teachers, setTeachers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [optionDepartment, setOptionDepartment] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchData("admin/User/getAllTeacher")
      .then((res) => setTeachers(res))
      .catch((e) => toast.error(e.response.data))
      .finally(() => setLoading(false));
  }, [isRefresh]);

  useEffect(() => {
    setLoading(true);
    fetchData("admin/Department")
      .then((res) => {
        setOptionDepartment(res.body);
      })
      .catch((e) => toast.error(e.response.data))
      .finally(() => setLoading(false));
  }, []);

  // Hàm thêm/sửa giáo viên
  const onSubmit = (data) => {
    if (editingId !== null) {
      // Cập nhật sinh viên
      setLoading(true);
      putData("admin/User/updateUpdate", {
        ...data,
        sex: Number(data.sex),
        personId: editingId.personId,
      })
        .then(() => {
          setIsRefresh(!isRefresh);
        })
        .catch((e) => {
          toast.error(e.response.data);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(true);
      postData("admin/User/createTeacher", {
        ...data,
        sex: Number(data.sex),
      })
        .then(() => {
          setIsRefresh(!isRefresh);
        })
        .catch((e) => {
          toast.error(e.response.data);
        })
        .finally(() => setLoading(false));
    }
    reset();
    closeModal();
  };

  const faculty = watch("faculty");

  useEffect(() => {
    const selectedFaculty = faculties.find((f) => f.name === faculty);
    if (selectedFaculty) {
      setValue("major", selectedFaculty.majors[0]);
    }
  }, [faculty, setValue]);

  // Hàm mở modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Hàm đóng modal
  const closeModal = () => {
    reset();
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleDelete = (data) => {
    const confirm = window.confirm("Bạn có chắc chắn muốn xóa không?");
    if (confirm) {
      deleteData(`admin/User/deleteStudent`, { id: data })
        .then(() => {
          toast.success("Xóa thành công");
          setIsRefresh(!isRefresh);
        })
        .catch((e) => toast.error(e.response.data));
    }
  };

  // Hàm tìm kiếm
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Lọc danh sách theo từ khóa tìm kiếm
  const filteredTeachers = teachers.filter((teacher) =>
    teacher.personId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full bg-gray-100 p-6 overflow-auto mt-16 h-[90vh]">
      {loading && <LoadingSpinner/>}
      <div className="flex items-center ">
        <FcInfo className="w-[33px] h-[33px]" />
        <h1 className="text-[1.4993rem] pl-[8px] font-bold text-red-700 uppercase">
          Danh sách giáo viên{" "}
        </h1>
      </div>
      <hr className="mb-3"></hr>
      <div className="p-4 bg-white shadow-sm border">
        <div className="flex items-center px-4 mb-2">
          <form className="w-2/5">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
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
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Mã Giáo Viên..."
                required
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
              >
                Tìm kiếm
              </button>
            </div>
          </form>
          {/* Nút mở modal để thêm giáo viên */}
          <div className="ml-auto">
            <button
              onClick={openModal}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
            >
              Thêm Giáo Viên
            </button>
          </div>
        </div>
        <div className="">
          <table className="w-full text-xs text-left rtl:text-right text-gray-500">
            <thead className="text-gray-700 bg-gray-50">
              <tr className="text-center">
                <th className="px-4 py-3 w-6">ID</th>
                <th className="px-4 py-3">Tên</th>
                <th className="px-4 py-3">Ngày sinh</th>
                <th className="px-4 py-3">Giới tính</th>
                <th className="px-4 py-3">Địa chỉ Email</th>
                <th className="px-4 py-3">Số điện thoại</th>
                <th className="px-4 py-3">Khoa</th>
                <th className="px-4 py-3 w-[150px]">Chức năng</th>
              </tr>
            </thead>
            <tbody>
              {filteredTeachers.length > 0 ? (
                filteredTeachers.map((teacher, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-100 text-center"
                  >
                    <td className="px-6 py-4 border-b border-gray-300">
                      {teacher.personId}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-300">
                      {teacher.fullName}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-300">
                      {teacher.dateOfBirth}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-300">
                      {teacher.sex === 0 ? "Nu" : "Nam"}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-300">
                      {teacher.email}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-300">
                      {teacher.phoneNumber}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-300">
                      {teacher.departmentId}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-300">
                      {/* <button
                        // onClick={() => handleEdit(teacher.id)}
                        className="mr-auto px-2 text-blue-600"
                      >
                        Sửa
                      </button> */}
                      <button
                        onClick={() => handleDelete(teacher.personId)}
                        className="ml-auto px-2 text-red-600"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-4">
                    Không tìm thấy giáo viên
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal thêm/sửa giáo viên */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          {/* Modal Content */}
          <div className="relative bg-white rounded-lg shadow w-1/3">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
              <h2 className="text-lg font-semibold text-gray-900">
                {editingId !== null ? "Sửa Thông Tin" : "Thêm Giáo Viên"}
              </h2>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                onClick={closeModal}
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
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label
                    htmlFor="fullName"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Họ và tên
                  </label>
                  <input
                    {...register("fullName", { required: true })}
                    type="text"
                    id="fullName"
                    name="fullName"
                    placeholder="Tên giáo viên"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                  />
                </div>
                <div className="relative z-0 w-full group">
                  <label
                    htmlFor="dateOfBirth"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Ngày sinh
                  </label>
                  <input
                    {...register("dateOfBirth", { required: true })}
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder=" "
                    required
                  />
                </div>
                <div className="ml-3 border-b-2 border-gray-200 group">
                  <p className="mb-2 text-sm font-medium text-gray-900">
                    Giới tính
                  </p>
                  <div className="flex pt-1">
                    <div className="flex py-1 items-center me-4">
                      <input
                        {...register("sex")}
                        type="radio"
                        value="Nam"
                        name="sex"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
                      />
                      <label className="ms-2 text-sm text-gray-500">Nam</label>
                    </div>
                    <div className="flex items-center me-4">
                      <input
                        {...register("sex")}
                        type="radio"
                        value="Nữ"
                        name="sex"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
                      />
                      <label className="ms-2 text-sm text-gray-500">Nữ</label>
                    </div>
                  </div>
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="phoneNumber"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Số điện thoại
                  </label>
                  <input
                    {...register("phoneNumber", {
                      required: true,
                      pattern: /^(\+84|0)(3|5|7|8|9)\d{8}$/,
                    })}
                    type="tel"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Số diện thoại"
                    name="phoneNumber"
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Địa chỉ email
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    name="email"
                    placeholder="Địa chỉ Email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                  />
                </div>
                <div className="relative z-0 w-full col-span-2 mb-5 group">
                  <select
                    {...register("departmentId", { required: true })}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  >
                    {optionDepartment.map((f) => (
                      <option className="" key={f.departmentName} value={f.departmentId}>
                        {f.departmentName}
                      </option>
                    ))}
                  </select>
                  <label
                    htmlFor="departmentId"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Khoa
                  </label>
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

export default TeacherList;
