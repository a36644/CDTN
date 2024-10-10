import { useEffect, useState } from "react";
import { FcInfo } from "react-icons/fc";
import { RiPencilFill } from "react-icons/ri";
import { fetchData } from "../../lib/api";
import { toast } from "react-toastify";
import LoadingSpinner from "../../components/LoadingSpinner";
import { FaUser } from "react-icons/fa";

const StudentInfo = () => {
  const [student, setStudent] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchData("student")
      .then((res) => setStudent(res))
      .catch((e) => toast.error(e.response.data))
      .finally(() => setLoading(false));
  }, []);
  return (
    <div className="w-full bg-gray-100 p-6 overflow-auto mt-16 h-[90vh]">
      {loading && <LoadingSpinner />}
      <div className="flex items-center">
        <FcInfo className="w-[33px] h-[33px]" />
        <h1 className="text-[1.4993rem] pl-[8px] font-bold text-red-700">
          THÔNG TIN SINH VIÊN
        </h1>
      </div>
      <hr className="mb-3"></hr>
      <div className="flex gap-4">
        <div className="w-1/3">
          <div className="bg-white border rounded-sm p-4 text-center items-center shadow-sm mb-4">
            <div className="py-2 text-center">
              <FaUser className="w-24 h-24 m-auto border rounded-[50%] p-3 bg-gray-500 text-white" />
            </div>
            <p className="uppercase text-[0.875rem]">{student?.fullName}</p>
          </div>
          <div className="bg-white border rounded-sm shadow-sm mb-4">
            <h2 className="font-bold text-base border-b p-4">
              Thông tin sinh viên
            </h2>
            <div className="flex p-4 text-xs font-medium">
              <p className="w-2/5 ">Mã sinh viên</p>
              <p className="text-gray-400">{student?.personId}</p>
            </div>
            <hr></hr>
            <div className="flex p-4 text-xs font-medium">
              <p className="w-2/5 ">Họ tên</p>
              <p className="text-gray-400">{student?.fullName}</p>
            </div>
            <hr></hr>
            <div className="flex p-4 text-xs font-medium">
              <p className="w-2/5 ">Giới tính</p>
              <p className="text-gray-400">
                {student?.sex === 0 ? "Nữ" : "Nam"}
              </p>
            </div>
            <hr></hr>
            <div className="flex p-4 text-xs font-medium">
              <p className="w-2/5 ">Số điện thoại</p>
              <p className="text-gray-400">{student?.phoneNumber}</p>
            </div>
            <hr></hr>
            <div className="flex p-4 text-xs font-medium">
              <p className="w-2/5 ">Chuyên ngành</p>
              <p className="text-gray-400">
                {student?.major?.majorId}-{student?.major?.majorName}
              </p>
            </div>
            <hr></hr>
            <div className="p-4 text-center">
              <button className="bg-red-800 text-white py-2 px-4 rounded text-xs font-semibold">
                <RiPencilFill className="inline-block text-xl mt-[-5px]" />
                Cập nhật thông tin cá nhân
              </button>
            </div>
          </div>
        </div>

        <div className="w-2/3">
          <div className="bg-white border rounded-sm shadow-sm mb-4">
            <h2 className="font-bold text-base border-b p-4">
              Thông tin liên lạc
            </h2>
            <div className="flex p-4 text-xs font-medium">
              <p className="w-2/5 ">Dân tộc</p>
              <p className="text-gray-400"></p>
            </div>
            <hr></hr>
            <div className="flex p-4 text-xs font-medium">
              <p className="w-2/5 ">Tôn giáo</p>
              <p className="text-gray-400"></p>
            </div>
            <hr></hr>
            <div className="flex p-4 text-xs font-medium">
              <p className="w-2/5 ">Quốc gia</p>
              <p className="text-gray-400"></p>
            </div>
            <hr></hr>
            <div className="flex p-4 text-xs font-medium">
              <p className="w-2/5 ">Tỉnh thành</p>
              <p className="text-gray-400"></p>
            </div>
            <hr></hr>
            <div className="flex p-4 text-xs font-medium">
              <p className="w-2/5 ">Quận huyện</p>
              <p className="text-gray-400"></p>
            </div>
            <hr></hr>
            <div className="flex p-4 text-xs font-medium">
              <p className="w-2/5 ">Di động</p>
              <p className="text-gray-400">{student?.phoneNumber}</p>
            </div>
            <hr></hr>
            <div className="flex p-4 text-xs font-medium">
              <p className="w-2/5 ">Điện thoại</p>
              <p className="text-gray-400"></p>
            </div>
            <hr></hr>
            <div className="flex p-4 text-xs font-medium">
              <p className="w-2/5 ">Email cá nhân</p>
              <p className="text-gray-400">{student?.email}</p>
            </div>
            <hr></hr>
            <div className="flex p-4 text-xs font-medium">
              <p className="w-2/5 ">CCCD/CMND</p>
              <p className="text-gray-400"></p>
            </div>
            <hr></hr>
            <div className="flex p-4 text-xs font-medium">
              <p className="w-2/5 ">Giới tính</p>
              <p className="text-gray-400">
                {student?.sex === 0 ? "Nữ" : "Nam"}
              </p>
            </div>
          </div>
          <div className="bg-white border rounded-sm shadow-sm mb-4">
            <h2 className="font-bold text-base border-b p-4">
              Thông tin khóa học
            </h2>
            <div className="flex p-4 text-xs font-medium">
              <p className="w-2/3 ">Khóa học</p>
              <p className="text-gray-400">
                {student?.generation?.generationId}
              </p>
            </div>
            <hr></hr>
            <div className="flex p-4 text-xs font-medium">
              <p className="w-2/3 ">Chức vụ</p>
              <p className="text-gray-400"></p>
            </div>
            <hr></hr>
            <div className="flex p-4 text-xs font-medium">
              <p className="w-2/3 ">Đối tượng</p>
              <p className="text-gray-400"></p>
            </div>
            <hr></hr>
            <div className="flex p-4 text-xs font-medium">
              <p className="w-2/3 ">THPT lớp 12</p>
              <p className="text-gray-400"></p>
            </div>
            <hr></hr>
            <div className="flex p-4 text-xs font-medium">
              <p className="w-2/3 ">Đoàn</p>
              <p className="text-gray-400"></p>
            </div>
            <hr></hr>
            <div className="flex p-4 text-xs font-medium">
              <p className="w-2/3 ">Ngày vào Đoàn</p>
              <p className="text-gray-400"></p>
            </div>
            <hr></hr>
            <div className="flex p-4 text-xs font-medium">
              <p className="w-2/3 ">Đảng</p>
              <p className="text-gray-400"></p>
            </div>
            <hr></hr>
            <div className="flex p-4 text-xs font-medium">
              <p className="w-2/3 ">Ngày vào Đảng</p>
              <p className="text-gray-400"></p>
            </div>
            <hr></hr>
            <div className="flex p-4 text-xs font-medium">
              <p className="w-2/3 ">Hình thức đào tạo</p>
              <p className="text-gray-400">Chính quy</p>
            </div>
            <hr></hr>
            <div className="flex p-4 text-xs font-medium">
              <p className="w-2/3 ">Cố vấn học tập</p>
              <p className="text-gray-400"></p>
            </div>
            <hr></hr>
            <div className="flex p-4 text-xs font-medium">
              <p className="w-2/3 ">Liên hệ cố vấn học tập</p>
              <p className="text-gray-400"></p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="bg-white border rounded-sm shadow-sm mb-4">
          <h2 className="font-bold text-base border-b p-4">
            Thông tin người liên hệ
          </h2>
          <div className="flex p-4 text-xs font-medium">
            <div className="w-1/2">
              <div className="w-1/2 ">Họ tên người liên hệ</div>
              <p className="text-gray-500 uppercase font-normal mt-1">
                {student?.fullName}
              </p>
            </div>
            <div>
              <div>Điện thoại người liên hệ</div>
              <p className="text-gray-500 uppercase font-normal mt-1">
                {student?.phoneNumber}
              </p>
            </div>
          </div>
          <hr></hr>
          <div className="flex p-4 text-xs font-medium">
            <p className="w-1/2 ">Địa chỉ người liên hệ</p>
            <p className="text-gray-400"></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentInfo;
