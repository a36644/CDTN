import { FcInfo } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { deleteData, fetchData, postData, putData } from "../../../lib/api";
import Select from "react-select";
import LoadingSpinner from "../../../components/LoadingSpinner";
import Datepicker from "react-tailwindcss-datepicker";
import { toast } from "react-toastify";

const group = [
  { value: "N1", label: "Nhóm 1" },
  { value: "N2", label: "Nhóm 2" },
  { value: "N3", label: "Nhóm 3" },
];

const semestercourses = [
  {
    semester: "K1-N1-24-25",
    courses: ["Toán rời rạc", "Thể dục cổ truyền", "Lập trình Java"],
  },
  {
    semester: "K2-N1-24-25",
    courses: ["Giải tích", "Toán rời rạc", "Kinh tế học"],
  },
  {
    semester: "K3-N1-24-25",
    courses: ["Tư tưởng Hồ Chí Minh", "Lập trình hướng đối tượng", "Giải tích"],
  },
];

const ListSemesterGroup = () => {
  const { register, handleSubmit, reset, setValue, watch } = useForm();
  const [semesters, setSemesters] = useState([]);
  const [isRefresh, setIsRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isModalNewSemesterOpen, setIsModalNewSemesterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGroup, setSelectedGroup] = useState();
  const [date, setDate] = useState({
    startDate: null,
    endDate: null,
  });

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const result = await fetchData(
          "admin/SemesterGroup/getAllSemesterGroup"
        );
        setSemesters(result);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [isRefresh]);

  const semestercourse = watch("semestercourse");

  useEffect(() => {
    const selectedSemestercourse = semestercourses.find(
      (f) => f.semester === semestercourse
    );
    if (selectedSemestercourse) {
      setValue("course", selectedSemestercourse.courses[0]);
    }
  }, [semestercourse, setValue]);

  const transformDate = (date)=> {
    const newDate = date.split("T")?.[0]
    return newDate
  }

  // Hàm thêm/sửa
  const onSubmit = async (data) => {
    const transformData = {
      groupId: selectedGroup,
      baseCost: data.baseCost,
      start: transformDate(new Date(date.startDate).toISOString()),
      end: transformDate(new Date(date.endDate).toISOString()),
      timeDKHoc: transformDate(data.timeDKHoc),
      semesterGroupId: editingId?.semesterGroupId
    };
    console.log("🚀 ~ onSubmit ~ transformData:", transformData)
    if (editingId !== null) {
      await putData("admin/SemesterGroup/updateSemesterGroup", transformData);
      toast.success("Cập nhật thành công")
      setIsRefresh(!isRefresh);
      setLoading(false);
      setEditingId(null);
    } else {
      // Thêm mới
      try {
        await postData("admin/SemesterGroup/addSemesterGroup", transformData);
        toast.success("Thêm kỳ học thành công")
        setIsRefresh(!isRefresh);
        setLoading(false);
        setDate({
          startDate: null,
          endDate: null,
        });
      } catch (error) {
        toast.error(error.response.data);
      } finally {
        setLoading(false);
      }
    }
    reset();
    closeModalNewSemester();
  };

  const handleDelete = (id) => {
    const confirm = window.confirm("Bạn có chắc chắn muốn xóa không?");
    if (confirm) {
      deleteData(`admin/SemesterGroup/deleteSemesterGroupById`, { id })
        .then(() => {
          toast.success("Xóa thành công");
          setIsRefresh(!isRefresh);
        })
        .catch((e) => toast.error(e.data));
    }
  };

  const openModalNewSemester = () => {
    setIsModalNewSemesterOpen(true);
  };

  const closeModalNewSemester = () => {
    reset();
    setIsModalNewSemesterOpen(false);
  };

  // Hàm chỉnh sửa
  // const handleEdit = (data) => {
  //   if (data) {
  //     setValue("baseCost", data.baseCost);
    
  //   setDate({
  //     startDate: new Date(data.start),  // Convert start date
  //     endDate: new Date(data.finish),   // Convert end date
  //   });

  //   // Set the "Thời gian đăng ký học"
  //   setValue("timeDKHoc", new Date(data.timeDangKyHoc).toISOString().split('T')[0]);

  //   setSelectedGroup(data.groupID); // Assuming groupID is the selected group

  //   setEditingId(data);  // Store the editing ID to update later
  //   openModalNewSemester();  // Open the modal
  //   }
  // };
  
  // Hàm tìm kiếm
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Lọc danh sách theo từ khóa tìm kiếm
  const filteredCourseSemester = semesters.filter((semester) =>
    semester.semesterGroupId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full bg-gray-100 p-6 overflow-auto mt-16 h-[90vh]">
    {loading && <LoadingSpinner/>}
      <div className="flex items-center ">
        <FcInfo className="w-[33px] h-[33px]" />
        <h1 className="text-[1.4993rem] pl-[8px] font-bold text-red-700 uppercase">
          Danh sách kỳ học
        </h1>
      </div>
      <hr className="mb-3"></hr>
      <div className="p-4 bg-white shadow-sm border ">
        <div className="w-full  mb-2 mx-auto gap-10 flex items-center">
          {/* Search */}
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
                placeholder="Mã học kỳ..."
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
              onClick={openModalNewSemester}
              className="mx-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
            >
              Thêm kỳ học
            </button>
          </div>
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-xs text-left rtl:text-right text-gray-500">
            <thead className="text-gray-700 bg-gray-50">
              <tr className="text-center">
                <th className="px-4 py-3">Mã học kỳ</th>
                <th className="px-4 py-3">Giá cơ bản</th>
                <th className="px-4 py-3">Thời gian bắt đầu</th>
                <th className="px-4 py-3">Thời gian kết thúc</th>
                <th className="px-4 py-3">Thời gian đăng ký</th>
                <th className="px-4 py-3">Trạng thái</th>
                <th className="px-4 py-3 w-[150px]">Chức năng</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourseSemester.length > 0 ? (
                filteredCourseSemester.map((semester) => (
                  <tr key={semester.semesterGroupId} className="hover:bg-gray-100 text-center">
                    <td className="px-6 py-4 border-b border-gray-300">
                      {semester.semesterGroupId}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-300">
                      {semester.baseCost}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-300">
                      {semester.start}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-300">
                      {semester.finish}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-300">
                      {semester.timeDangKyHoc}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-300">
                      {semester.status}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-300">
                      {/* <button
                        onClick={() => handleEdit(semester)}
                        className="mr-auto px-2 text-blue-600"
                      >
                        Sửa
                      </button> */}
                      <button
                        onClick={() => handleDelete(semester.semesterGroupId)}
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
                    Không tìm thấy dữ liệu
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Modal add new semester */}
      {isModalNewSemesterOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          {/* Modal Content */}
          <div className="relative w-1/3 bg-white rounded-lg shadow">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
              <h2 className="text-lg font-semibold text-gray-900">
                Thêm kỳ học
              </h2>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                onClick={closeModalNewSemester}
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
            <form
              className="p-4 md:p-5"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="grid gap-4 mb-4">
                <div className="">
                  <label
                    htmlFor="sl-group"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Nhóm
                  </label>
                  <Select
                    options={group}
                    placeholder="Chọn nhóm"
                    onChange={(e) => setSelectedGroup(e.value)}
                  />
                </div>
                <div className="">
                  <label
                    htmlFor="baseCost"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Giá cơ bản
                  </label>
                  <input
                    {...register("baseCost", { required: true })}
                    type="text"
                    id="baseCost"
                    name="baseCost"
                    placeholder="vnd/credit"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                  />
                </div>
                <div className="">
                  <label
                    htmlFor="dateRange"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Thời gian học
                  </label>
                  <Datepicker
                    id="dateRange"
                    value={date}
                    onChange={(newDate) => {
                      setDate(newDate)
                    }}
                    showShortcuts={false}
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="timeDKHoc"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Thời gian đăng ký
                  </label>
                  <input
                    {...register("timeDKHoc", { required: true })}
                    type="date"
                    id="timeDKHoc"
                    name="timeDKHoc"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  ></input>
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

export default ListSemesterGroup;
