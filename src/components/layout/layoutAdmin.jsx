import { FaCircleUser } from "react-icons/fa6";
import { FaPenToSquare } from "react-icons/fa6";
import { IoIosNotifications } from "react-icons/io";
import { Link, Outlet } from "react-router-dom";
import '../../App.css'
const menuItems = [
  {
    title: "QUẢN LÝ SINH VIÊN",
    links: [
      { label: "Danh sách sinh viên", icon: FaPenToSquare, href: "listStudent" },
      { label: "Thêm sinh viên", icon: FaPenToSquare, href: "createStudent" },
    ],
  },
  {
    title: "QUẢN LÝ GIÁO VIÊN",
    links: [
      { label: "Danh sách giáo viên", icon: FaPenToSquare, href: "listTeacher" },
      { label: "Thêm giáo viên", icon: FaPenToSquare, href: "createTeacher" },
    ],
  },
  {
    title: "QUẢN LÝ KỲ HỌC",
    links: [
      { label: "Danh sách các kỳ học", icon: FaPenToSquare, href: "getAllSemesterGroup" },
      { label: "Thêm kỳ học", icon: FaPenToSquare, href: "addSemesterGroup" },
      { label: "Cập nhật kỳ học", icon: FaPenToSquare, href: "updateSemesterGroup" },
    ],
  },
  {
    title: "QUẢN LÝ MÔN HỌC",
    links: [
      { label: "Danh sách môn", icon: FaPenToSquare, href: "listCourse" },
      { label: "Thêm môn học", icon: FaPenToSquare, href: "addCourse" },
      { label: "Cập nhật môn học", icon: FaPenToSquare, href: "updateCourse" },
    ],
  },
  {
    title: "MỞ MÔN",
    links: [
      { label: "Mở lớp", icon: FaPenToSquare, href: "addNewCourseSemesterGroup" },
      { label: "Danh sách môn", icon: FaPenToSquare, href: "getAllCourseSemesterGroup" },
    ],
  },
  
];

const LayoutAdmin = () => {
  return (
    <div className="min-h-screen grid grid-cols-[280px_1fr] box">
      <div className="h-[100vh] overflow-y-auto p-0 border">
        <div className="w-full bg-white flex justify-center flex-col items-center ">
          <div className="flex items-center py-[18px] w-full pl-16">
          <Link href="">
              <img
              width="100px"
              src="https://thanglong.edu.vn/themes/md_tlu/img/logo.svg"
              alt="Logo"
              />
          </Link>
          </div>
          <hr className="w-full"></hr>
          <div className="flex items-center space-x-4 h-20 text-center my-4">
            <Link href="">
                <FaCircleUser className="w-12 h-12" />
            </Link>
            <div className="text-center text-xs leading-5 ml-4">
                <p className="font-normal uppercase">ĐẶNG TOÀN THẮNG</p>
                <p className="text-gray-400">Admin</p>
            </div>
          </div>
        </div>
        <hr></hr>
        
        {/* Menu */}
        <div className="w-full">
            {menuItems.map((menu, index) => (
            <div key={index}>
                <ul className="flex justify-center flex-col p-4">
                <li className="text-xs font-sans font-medium h-[28px]">{menu.title}</li>
                {menu.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                        <Link
                            to={link.href}
                            className="active py-[6px] px-4 h-[47px] flex text-[0.875rem] text-gray-400 items-center hover:bg-gray-200 transition ease-linear"
                        >
                            <link.icon className="inline-block mr-2 text-base" />
                            {link.label}
                        </Link>
                    </li>
                ))}
                </ul>
            </div>
            ))}
        </div>
      </div>

      {/* Main Content */}
      <div>
        <div className="h-16 flex place-content-between items-center bg-red-800 px-6 fixed top-0 right-0 left-[280px]">
          <p className="uppercase font-semibold text-slate-300 ml-4">Trường đại học Thăng Long</p>
          <div className="flex justify-center">
            <button className="p-3 justify-center">
              <span>
                <img className="w-6 h-4" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/225px-Flag_of_Vietnam.svg.png"></img>
              </span>
            </button>
            <button className="text-white p-3 ml-2 text-[24px]">
              <span>
                <IoIosNotifications />
              </span>
            </button>
            <button>
              <div className="w-8 h-8 ml-4">
                <img className="rounded-[50%]" src="https://scontent.fhan15-2.fna.fbcdn.net/v/t1.30497-1/453178253_471506465671661_2781666950760530985_n.png?stp=dst-png_p200x200&_nc_cat=1&ccb=1-7&_nc_sid=136b72&_nc_eui2=AeEaC_WJQwIBT5o8RsXrTCOyWt9TLzuBU1Ba31MvO4FTUM3hwN7nhoYaIVIN4AEVSWO9x82eY25ugSu3z1X5p7Mm&_nc_ohc=kWxeXr9no-YQ7kNvgGhZo8y&_nc_ht=scontent.fhan15-2.fna&oh=00_AYAwAtOcexofQo-20fe_uW4UvjZciV284qBxGsjPtuPbUQ&oe=66E4DEBA"></img>
              </div>
            </button>
          </div>
        </div>
        
        <div className="box">
          <Outlet className="h-[100vh] overflow-y-auto p-0 border" />
        </div>
      </div>
    </div>
  );
};

export default LayoutAdmin;
