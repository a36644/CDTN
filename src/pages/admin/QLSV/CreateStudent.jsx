/* eslint-disable no-unused-vars */

import { useState } from "react";
import { FcInfo } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";

const CreateStudent = ({ createStudent }) => {
  const navigate = useNavigate();
  const [faculty, setFaculty] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    createStudent(data);
    navigate("/admin/User");
  };

  const handleFacultyChange = (e) => {
    setFaculty(e.target.value);
    // setMajor(''); // Reset chuyên ngành khi thay đổi khoa
  };

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

  // const handleSubmit = (e) => {
  //     e.preventDefault();
  //     createStudent({id, name, dob, gender, cccd, phone, faculty, major})
  //     setId('');
  //     setName('');
  //     setDob('');
  //     setGender('');
  //     setCCCD('');
  //     setPhone('');
  //     setFaculty('');
  //     setMajor('');
  //     navigate('/admin/User');
  //   };
  return (
    <div className="w-full bg-gray-100 p-6 overflow-auto mt-16 h-[90vh]">
      <div className="flex items-center">
        <FcInfo className="w-[33px] h-[33px]" />
        <h1 className="text-[1.4993rem] pl-[8px] font-bold text-red-700 uppercase">
          Thêm sinh viên
        </h1>
      </div>
      <hr className="mb-4"></hr>

      <form className="max-w-md mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <div className="relative z-0 w-full mb-5 group">
          <input
            id="id"
            name="id"
            type="text"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            {...register("id")}
          />
          <label
            htmlFor="id"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Mã sinh viên
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            id="name"
            name="name"
            type="text"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            {...register("name")}
          />
          <label
            htmlFor="name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Họ tên
          </label>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              id="dob"
              name="dob"
              type="date"
              {...register("dob")}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="dob"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Ngày sinh
            </label>
          </div>
          <div className="mb-5 group border-0 border-b-2 border-gray-300">
            <p className="text-[10px] text-gray-500 mt-[-8px] ">Giới tính:</p>
            <div className="flex pt-1">
              <div className="flex items-center me-4">
                <input
                  id="male"
                  name="gender"
                  type="radio"
                  value="Nam"
                  {...register("gender")}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="male"
                  className="ms-2 text-sm text-gray-500 dark:text-gray-300"
                >
                  Nam
                </label>
              </div>
              <div className="flex items-center me-4">
                <input
                  id="female"
                  name="gender"
                  type="radio"
                  value="Nữ"
                  {...register("gender")}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="female"
                  className="ms-2 text-sm text-gray-500 dark:text-gray-300"
                >
                  Nữ
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            id="cccd"
            name="cccd"
            type="text"
            {...register("cccd")}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="CCCD/CMND"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            CCCD/CMND
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            id="phone"
            name="phone"
            type="tel"
            pattern="(\+84|0)(3|5|7|8|9)\d{8}"
            {...register("phone")}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_phone"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Số điện thoại
          </label>
        </div>

        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <select
              id="faculty"
              name="faculty"
              {...register("faculty")}
              onChange={(e) => handleFacultyChange(e)}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            >
              <option value="" disabled>
                Chọn khoa
              </option>
              {faculties.map((faculty) => (
                <option key={faculty.name} value={faculty.name}>
                  {faculty.name}
                </option>
              ))}
            </select>
            <label
              htmlFor="faculty"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Khoa
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <select
              id="major"
              name="major"
              type="text"
              {...register("major")}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            >
              <option value="" disabled>
                Chọn chuyên ngành
              </option>
              {faculties
                .find((f) => f.name === faculty)
                ?.majors.map((major) => (
                  <option key={major} value={major}>
                    {major}
                  </option>
                ))}
            </select>
            <label
              htmlFor="major"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Chuyên ngành
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

CreateStudent.propTypes = {
  createStudent: PropTypes.func.isRequired,
};

export default CreateStudent;
