import { useEffect, useState } from "react";
import { FcInfo } from "react-icons/fc";
import { fetchData } from "../../lib/api";
import { Toast } from "flowbite-react";
import LoadingSpinner from "../../components/LoadingSpinner";
import { FaCheckCircle } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";

const Kqht = () => {
  const [transcript, setTranscript] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setLoading(true);
    fetchData("student/getTranscript")
      .then((res) => {
        console.log(res);
        setTranscript(res);
      })
      .catch((e) => Toast.error(e.response?.data))
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredTrainingProgram =
    transcript?.listCourseGrade?.filter((TrainingProgram) =>
      TrainingProgram.courseID.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];
  return (
    <div className="w-full bg-gray-100 p-6 overflow-auto mt-16 h-[90vh]">
      {loading && <LoadingSpinner />}
      <div className="flex items-center ">
        <FcInfo className="w-[33px] h-[33px]" />
        <h1 className="text-[1.4993rem] pl-[8px] font-bold text-red-700 uppercase">
          Kết quả học tập
        </h1>
      </div>
      <hr className="mb-3"></hr>
      <div className="flex items-center mb-2 w-2/5">
        <label
          htmlFor="default-search"
          className="text-sm font-medium text-gray-900 sr-only"
        >
          Search
        </label>
        <div className="relative w-full z-1">
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
            className="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Mã học phần..."
            value={searchTerm}
            onChange={handleSearch}
            required
          />
          <button
            type="submit"
            className="text-white absolute end-1 bottom-1 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </div>
      <div className="p-4 bg-white shadow-sm border">
        <table className="min-w-full bg-white border-collapse border border-gray-200 text-[13px]">
          <thead className="text-xs font-normal">
            <tr className="bg-red-800 text-white">
              <th className="border border-gray-400 py-2">STT</th>
              <th className="border border-gray-400 py-2 w-[10%]">
                Mã môn học
              </th>
              <th className="border border-gray-400 py-2">Tên môn học</th>
              <th className="border border-gray-400 py-2">Số TC</th>
              <th className="border border-gray-400 py-2">Điểm quá trình</th>
              <th className="border border-gray-400 py-2">Điểm cuối kỳ</th>
              <th className="border border-gray-400 py-2">Điểm tổng kết</th>
              <th className="border border-gray-400 py-2">Kết quả</th>
            </tr>
          </thead>
          <tbody>
            {filteredTrainingProgram.length > 0 ? (
              filteredTrainingProgram.map((course, index) => (
                <tr key={index} className="hover:bg-gray-100 text-center">
                  <td className="px-6 py-4 border-b border-gray-300">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-300">
                    {course.courseID}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-300">
                    {course.courseName}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-300">
                    {course.credits}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-300">
                    {course.midScore}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-300">
                    {course.endScore}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-300">
                    {course.finalScore}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-300">
                    {course.status === "DAT" ? (
                      <FaCheckCircle className="w-4 h-4 mx-auto text-green-600" />
                    ) : (
                      <IoCloseCircle className="w-4 h-4 mx-auto text-red-600" />
                    )}
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
        <div className="px-2 mt-4">
          <p className="text-sm font-bold text-gray-800">
            Tổng tín tích lũy: {transcript.totalCredits}
          </p>
          <p className="text-sm font-bold text-gray-800">
            Điểm trung bình: {transcript.score}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Kqht;
