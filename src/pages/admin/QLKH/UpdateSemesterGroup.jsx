import { FcInfo } from "react-icons/fc";
import { useState } from "react"; 
import Datepicker from "react-tailwindcss-datepicker"; 

const UpdateSemesterGroup = () => {
    const [value, setValue] = useState({ 
        startDate: null, 
        endDate: null
    });
    return (
        <div className="w-full bg-gray-100 p-6 overflow-auto mt-16 h-[90vh]">
            <div className="flex items-center">
                <FcInfo className="w-[33px] h-[33px]"/>
                <h1 className="text-[1.4993rem] pl-[8px] font-bold text-red-700 uppercase">Chỉnh sửa kỳ học</h1>
            </div>
            <hr className="mb-4"></hr>    
            <form className="max-w-lg mx-auto bg-white p-4 shadow-sm border rounded-md">
                <div className="mb-5">
                    <label htmlFor="semesterID" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mã học kỳ</label>
                    <input type="text" id="semesterID" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="groupID" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mã nhóm</label>
                    <input type="password" id="groupID" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="baseCost" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Base Cost</label>
                    <input type="text" id="baseCost" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="dateRange" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Thời gian học</label>
                    <Datepicker id="dateRange"
                        value={value} 
                        onChange={newValue => setValue(newValue)}
                        showShortcuts={false}
                    /> 
                </div>
                <div className="mb-5">
                    <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Thời gian đăng ký</label>
                    <input type="date" id="date" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"></input> 
                </div>
                <div className="mt-6 flex items-center justify-start gap-x-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                    <button type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                    Save
                    </button>
                </div>
            </form>
    
        </div>
    )
}

export default UpdateSemesterGroup
