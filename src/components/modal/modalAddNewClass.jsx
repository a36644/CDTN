/* eslint-disable react/prop-types */
import { useState } from 'react';
import Timetable from '../TimeTable'; // Make sure to adjust this path if necessary

const ModalAddNewClass = ({
  semestercourses,
  phongHocOptions,
  giaoVienOptions,
  editingId,
  isOpen,
  closeModalNewClass,
  handleSubmit,
  onSubmitFormStep,
}) => {
  const [step, setStep] = useState(1);
  const { register, watch } = handleSubmit; // Adjust if using a specific library

  const handleNextStep = () => setStep(2);
  const handlePrevStep = () => setStep(1);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      {/* Modal Content */}
      <div className="relative w-1/2 bg-white rounded-lg shadow">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
          <h2 className="text-lg font-semibold text-gray-900">
            {editingId !== null ? "Edit Course" : "Add New Class"}
          </h2>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
            onClick={closeModalNewClass}
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
        <form className="p-4 md:p-5" onSubmit={handleSubmit(onSubmitFormStep)}>
          {step === 1 && (
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="relative z-0 w-full group">
                <select
                  {...register('semestercourse', { required: true })}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                >
                  {semestercourses.map((f) => (
                    <option key={f.semester} value={f.semester}>
                      {f.semester}
                    </option>
                  ))}
                </select>
                <label
                  htmlFor="semestercourse"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Semester
                </label>
              </div>

              <div className="relative z-0 w-full group">
                <select
                  {...register('course', { required: true })}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                >
                  {semestercourses
                    .find((f) => f.semester === watch('semestercourse'))
                    ?.courses.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                </select>
                <label
                  htmlFor="course"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Course
                </label>
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="sl-shift"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Chọn ca học
                </label>
                <Timetable id="sl-shift" />
              </div>
              <div className="flex col-span-2 justify-end">
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Next
                </button>
              </div>
            </div>
          )}
          {step === 2 && (
            <div>
              <div className="relative z-0 w-full group mb-5">
                <select
                  {...register('phongHoc', { required: true })}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                >
                  <option value="">Chọn phòng học</option>
                  {phongHocOptions.map((phong, index) => (
                    <option key={index} value={phong}>
                      {phong}
                    </option>
                  ))}
                </select>
                <label
                  htmlFor="phongHoc"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Room
                </label>
              </div>

              <div className="relative z-0 w-full group mb-5">
                <select
                  {...register('giaoVien', { required: true })}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                >
                  <option value="">Chọn giáo viên</option>
                  {giaoVienOptions.map((giaoVien, index) => (
                    <option key={index} value={giaoVien}>
                      {giaoVien}
                    </option>
                  ))}
                </select>
                <label
                  htmlFor="giaoVien"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Teacher
                </label>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="text-white inline-flex items-center bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Add
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ModalAddNewClass;
