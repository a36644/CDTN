import { FaBell, FaUserAlt } from "react-icons/fa";
import { FaCircleUser, FaUser } from "react-icons/fa6";
import { FaClipboardList } from "react-icons/fa6";
import { FaBusinessTime } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";
import { IoIosNotifications } from "react-icons/io";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "../../App.css";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { PiExamBold } from "react-icons/pi";
import { fetchData } from "../../lib/api";
import LoadingSpinner from "../LoadingSpinner";
const menuItems = [
  {
    title: "TRANG CÁ NHÂN",
    links: [
      { label: "Thông tin cá nhân", icon: FaUserAlt, href: "StudentInfo" },
      { label: "Thông báo", icon: FaBell, href: "#" },
    ],
  },
  {
    title: "TRA CỨU THÔNG TIN",
    links: [
      { label: "Chương trình đào tạo", icon: FaClipboardList, href: "Ctdt" },
      { label: "Lịch học", icon: FaBusinessTime, href: "Tkb" },
      { label: "Kết quả học tập", icon: PiExamBold, href: "KQHT" },
    ],
  },
  {
    title: "CHỨC NĂNG TRỰC TUYẾN",
    links: [{ label: "Đăng ký học", icon: FaPenToSquare, href: "Dkh" }],
  },
];



const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [student, setStudent] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  const logout = () => {
    localStorage.clear("token");
    toast.success("Đăng xuất thành công");
    navigate("/authenticate/signin");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setLoading(true);
    fetchData("student")
      .then((res) => setStudent(res))
      .catch((e) => toast.error(e.response.data))
      .finally(() => setLoading(false));
  }, []);
  return (
    <div className="min-h-screen grid grid-cols-[280px_1fr] ">
      {loading && <LoadingSpinner />}
      <div className="box">
        <div className="h-[100vh] overflow-y-auto p-0 border">
          <div className="w-full bg-white flex justify-center flex-col items-center ">
            <div className="flex items-center py-[18px] w-full pl-16">
              <Link href="./student">
                <img
                  width="100px"
                  src="https://thanglong.edu.vn/themes/md_tlu/img/logo.svg"
                  alt="Logo"
                />
              </Link>
            </div>
            <hr className="w-full"></hr>
            <div className="flex items-center space-x-4 h-20 text-center my-4">
              <Link href="./student">
                <FaCircleUser className="w-12 h-12" />
              </Link>
              <div className="text-center text-xs leading-5 ml-4">
                <p className="font-normal">{student?.fullName}</p>
                <p className="text-gray-400">{student?.role}</p>
              </div>
            </div>
          </div>
          <hr></hr>

          {/* Menu */}
          <div className="w-full">
            {menuItems.map((menu, index) => (
              <div key={index}>
                <ul className="flex justify-center flex-col p-4">
                  <li className="text-xs font-sans font-medium h-[28px]">
                    {menu.title}
                  </li>
                  {menu.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        to={link.href}
                        className="py-[6px] px-4 h-[47px] flex text-[0.875rem] text-gray-400 items-center hover:bg-gray-200 transition duration-150 ease-linear custom-dropdown"
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
      </div>

      {/* Main Content */}
      <div className="">
        <div className="h-16 flex place-content-between items-center bg-red-800 px-6 fixed top-0 right-0 left-[280px]">
          <p className="uppercase font-semibold text-slate-300 ml-4">
            Trường đại học Thăng Long
          </p>
          <div className="flex justify-center items-center">
            <button className="p-3 justify-center">
              <span>
                <img
                  className="w-6 h-4"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/225px-Flag_of_Vietnam.svg.png"
                ></img>
              </span>
            </button>
            <button className="text-white p-3 ml-2 text-[24px]">
              <span>
                <IoIosNotifications />
              </span>
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white px-3 py-2 "
              id="menu-button"
              aria-expanded="true"
              aria-haspopup="true"
              onClick={toggleMenu}
            >
              <span className="uppercase text-lg">u</span>
            </button>
            {isOpen && (
              <div
                className="origin-top-right absolute z-10 top-10 right-5 mt-2 py-2 rounded-sm shadow-xl bg-gray-50 ring-1 ring-black ring-opacity-5"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
              >
                <div className="py-1 text-gray-800 font-medium" role="none">
                  <div className="block w-full text-gray-600 text-left px-6 pt-2 pb-4 text-sm uppercase border-b">
                    {student?.fullName} - {student?.personId}
                  </div>

                  <div className="py-3">
                    <button
                      className="w-full text-left px-4 py-3 flex items-center text-sm hover:bg-gray-100"
                      role="menuitem"
                    >
                      <FaUser className="inline-block text-gray-500 mr-4 text-base" />
                      Hồ sơ của tôi
                    </button>
                  </div>

                  <div className="">
                    <button
                      className="text-center m-auto block w-11/12 border border-red-700 rounded-[5px] px-4 py-2 text-sm hover:bg-red-50 text-red-800"
                      role="menuitem"
                      onClick={logout}
                    >
                      Đăng xuất
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
