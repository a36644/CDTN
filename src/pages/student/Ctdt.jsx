import { FcInfo } from "react-icons/fc";
import { useEffect, useState } from "react";
import { fetchData } from "../../lib/api";
import { toast } from "react-toastify";
import LoadingSpinner from "../../components/LoadingSpinner";

const Ctdt = () => {
  const [TrainingPrograms, setTrainingPrograms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setLoading(true);
    fetchData("student/getTrainingProgram")
      .then((res) => setTrainingPrograms(res))
      .catch((e) => toast.error(e.response.data))
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredTrainingProgram = TrainingPrograms.filter((TrainingProgram) =>
    TrainingProgram.courseId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full bg-gray-100 p-6 overflow-auto mt-16 h-[90vh]">
      {loading && <LoadingSpinner />}
      <div className="flex items-center ">
        <FcInfo className="w-[33px] h-[33px]" />
        <h1 className="text-[1.4993rem] pl-[8px] font-bold text-red-700 uppercase">
          Chương trình đào tạo
        </h1>
      </div>
      <hr className="mb-3"></hr>
      <div className="p-4 bg-white shadow-sm border">
        <div className="flex items-center mb-2">
          <div className="flex m-auto items-center w-2/5">
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
                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Mã học phần..."
                value={searchTerm}
                onChange={handleSearch}
                required
              />
              <button
                type="submit"
                className="text-white absolute end-0 bottom-0 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <table className="min-w-full bg-white border-collapse border border-gray-200 text-[13px]">
          <thead className="text-sm font-thin">
            <tr className="bg-red-800 text-white">
              <th className="border border-gray-400  py-2">STT</th>
              <th className="border border-gray-400  py-2">MÃ HỌC PHẦN</th>
              <th className="border border-gray-400  py-2">TÊN HỌC PHẦN</th>
              <th className="border border-gray-400  py-2">PHÂN LOẠI</th>
              <th className="border border-gray-400  py-2">SỐ TC</th>
              <th className="border border-gray-400  py-2">HỆ SỐ</th>
              <th className="border border-gray-400  py-2">
                HỌC PHẦN TIÊN QUYẾT
              </th>
              <th className="border border-gray-400  py-2">YÊU CẦU TÍN CHỈ</th>
              {/* <th className="border border-gray-400  py-2">KHOA/BỘ MÔN</th> */}
            </tr>
          </thead>
          <tbody>
            {filteredTrainingProgram.length > 0 ? (
              filteredTrainingProgram.map((TrainingProgram, index) => (
                <tr key={index} className="hover:bg-gray-100 text-center">
                  <td className="px-6 py-4 border-b border-gray-300">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-300">
                    {TrainingProgram.courseId}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-300">
                    {TrainingProgram.courseName}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-300">
                    {TrainingProgram.type}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-300">
                    {TrainingProgram.credits}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-300">
                    {TrainingProgram.coefficient}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-300">
                    {TrainingProgram.reqiId && TrainingProgram.reqiId.length > 0
                      ? TrainingProgram.reqiId.map((id, idx) => (
                          <span key={idx} className="mx-1">
                            {id}
                          </span>
                        ))
                      : "None"}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-300">
                    {TrainingProgram.requestCredits}
                  </td>

                  {/* <td className="px-6 py-4 border-b border-gray-300">
                    {TrainingProgram.department}
                  </td> */}
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
  );
};

export default Ctdt;
