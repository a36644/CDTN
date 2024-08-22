import { FcInfo } from "react-icons/fc";
import { RiPencilFill } from "react-icons/ri";

const StudentIfo = () => {
    return (
      <div className="w-full bg-gray-100 p-6 overflow-auto mt-16 h-[90vh]">
        <div className="flex items-center">
          <FcInfo className="w-[33px] h-[33px]"/>
          <h1 className="text-[1.4993rem] pl-[8px] font-bold text-red-700">THÔNG TIN SINH VIÊN</h1>
        </div>
        <hr className="mb-3"></hr>
        <div className="flex gap-4">
          <div className="w-1/3">
            <div className="bg-white border rounded-sm p-4 text-center items-center shadow-sm mb-4">
              <div className="py-2">
                <img className="w-[118px] h-[118px] rounded-[50%] p-2 m-auto border border-dotted" src="https://scontent.fhan15-2.fna.fbcdn.net/v/t1.30497-1/453178253_471506465671661_2781666950760530985_n.png?stp=dst-png_p200x200&_nc_cat=1&ccb=1-7&_nc_sid=136b72&_nc_eui2=AeEaC_WJQwIBT5o8RsXrTCOyWt9TLzuBU1Ba31MvO4FTUM3hwN7nhoYaIVIN4AEVSWO9x82eY25ugSu3z1X5p7Mm&_nc_ohc=kWxeXr9no-YQ7kNvgGhZo8y&_nc_ht=scontent.fhan15-2.fna&oh=00_AYAwAtOcexofQo-20fe_uW4UvjZciV284qBxGsjPtuPbUQ&oe=66E4DEBA"></img>
              </div>
              <p className="uppercase text-[0.875rem]">Đặng Toàn Thắng</p>
            </div>
            <div className="bg-white border rounded-sm shadow-sm mb-4">
              <h2 className="font-bold text-base border-b p-4">Thông tin sinh viên</h2>
              <div className="flex p-4 text-xs font-medium">
                <p className="w-2/5 ">Mã sinh viên</p>
                <p className="text-gray-400">A36644</p>
              </div>
              <hr></hr>
              <div className="flex p-4 text-xs font-medium">
                <p className="w-2/5 ">Họ tên</p> 
                <p className="text-gray-400">ĐẶNG TOÀN THẮNG</p>
              </div>
              <hr></hr>
              <div className="flex p-4 text-xs font-medium">
                <p className="w-2/5 ">Giới tính</p> 
                <p className="text-gray-400">Nam</p>
              </div>
              <hr></hr>
              <div className="flex p-4 text-xs font-medium">
                <p className="w-2/5 ">CMND/CCCD</p> 
                <p className="text-gray-400">030201004177</p>
              </div>
              <hr></hr>
              <div className="flex p-4 text-xs font-medium">
                <p className="w-2/5 ">Lớp sinh viên:</p>
                <p className="text-gray-400">TT32g1</p>
              </div>
              <hr></hr>
              <div className="p-4 text-center">
                <button className="bg-red-800 text-white py-2 px-4 rounded text-xs font-semibold"><RiPencilFill className="inline-block text-xl mt-[-5px]"/>Cập nhật thông tin cá nhân</button>
              </div>
            </div>
          </div>

          <div className="w-2/3">
            <div className="bg-white border rounded-sm shadow-sm mb-4">
              <h2 className="font-bold text-base border-b p-4">Thông tin liên lạc</h2>
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
                <p className="text-gray-400">0383384412</p>
              </div>
              <hr></hr>
              <div className="flex p-4 text-xs font-medium">
                <p className="w-2/5 ">Điện thoại</p> 
                <p className="text-gray-400"></p>
              </div>
              <hr></hr>
              <div className="flex p-4 text-xs font-medium">
                <p className="w-2/5 ">Email cá nhân</p> 
                <p className="text-gray-400">A36644@thanglong.edu.vn</p>
              </div>
              <hr></hr>
              <div className="flex p-4 text-xs font-medium">
                <p className="w-2/5 ">CCCD/CMND</p> 
                <p className="text-gray-400">030201004177</p>
              </div>
              <hr></hr>
              <div className="flex p-4 text-xs font-medium">
                <p className="w-2/5 ">Giới tính</p>
                <p className="text-gray-400">Nam</p>
              </div>
            </div>
            <div className="bg-white border rounded-sm shadow-sm mb-4">
              <h2 className="font-bold text-base border-b p-4">Thông tin khóa học</h2>
              <div className="flex p-4 text-xs font-medium">
                <p className="w-2/3 ">Khóa học</p>
                <p className="text-gray-400">Khóa 32</p>
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
            <h2 className="font-bold text-base border-b p-4">Thông tin người liên hệ</h2>
            <div className="flex p-4 text-xs font-medium">
              <div className="w-1/2">
                <div className="w-1/2 ">Họ tên người liên hệ</div>
                <p className="text-gray-500 uppercase font-normal mt-1">Đặng Toàn Thắng</p>
              </div>
              <div>
                <div>Điện thoại người liên hệ</div>
                <p className="text-gray-500 uppercase font-normal mt-1">0383384412</p>
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
}

export default StudentIfo
