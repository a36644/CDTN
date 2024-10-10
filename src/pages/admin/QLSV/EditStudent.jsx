/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { FcInfo } from "react-icons/fc";

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

const EditStudent = ({ students, onSave }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const student = students.find((s) => s.id === id);

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      name: student?.name || "",
      dob: student?.dob || "",
      gender: student?.gender || "Nam",
      cccd: student?.cccd || "",
      phone: student?.phone || "",
      faculty: student?.faculty || faculties[0].name,
      major: student?.major || faculties[0].majors[0],
    },
  });

  const faculty = watch("faculty");

  useEffect(() => {
    const selectedFaculty = faculties.find((f) => f.name === faculty);
    if (selectedFaculty) {
      setValue("major", selectedFaculty.majors[0]);
    }
  }, [faculty, setValue]);

  const onSubmit = (data) => {
    const updatedStudent = { ...data, id };
    onSave(updatedStudent);
    navigate("/admin/User");
  };

  if (!student) return <div>Loading...</div>;

  return (
    <div className="w-full bg-gray-100 p-6 overflow-auto mt-16 h-[90vh]">
      <div className="flex items-center">
        <FcInfo className="w-[33px] h-[33px]" />
        <h1 className="text-[1.4993rem] pl-[8px] font-bold text-red-700 uppercase">
          Chỉnh sửa sinh viên
        </h1>
      </div>
      <hr className="mb-20" />

      <form className="max-w-md mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <div className="relative z-0 w-full mb-5 group">
          <input
            {...register("name", { required: true })}
            type="text"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
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
              {...register("dob", { required: true })}
              type="date"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
            <label
              htmlFor="dob"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Ngày sinh
            </label>
          </div>

          <div className="mb-5 group">
            <p className="text-[10px] text-gray-500 mt-[-8px]">Giới tính:</p>
            <div className="flex pt-1">
              <div className="flex items-center me-4">
                <input
                  {...register("gender")}
                  type="radio"
                  value="Nam"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label className="ms-2 text-sm text-gray-500 dark:text-gray-300">
                  Nam
                </label>
              </div>
              <div className="flex items-center me-4">
                <input
                  {...register("gender")}
                  type="radio"
                  value="Nữ"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label className="ms-2 text-sm text-gray-500 dark:text-gray-300">
                  Nữ
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            {...register("cccd", { required: true })}
            type="text"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="cccd"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            CCCD/CMND
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            {...register("phone", {
              required: true,
              pattern: /^(\+84|0)(3|5|7|8|9)\d{8}$/,
            })}
            type="tel"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="phone"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Số điện thoại
          </label>
        </div>

        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <select
              {...register("faculty", { required: true })}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            >
              {faculties.map((f) => (
                <option key={f.name} value={f.name}>
                  {f.name}
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
              {...register("major", { required: true })}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            >
              {faculties
                .find((f) => f.name === faculty)
                ?.majors.map((m) => (
                  <option key={m} value={m}>
                    {m}
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
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Lưu
        </button>
      </form>
    </div>
  );
};

export default EditStudent;
