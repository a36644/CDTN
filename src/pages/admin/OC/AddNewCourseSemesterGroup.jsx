import { FcInfo } from "react-icons/fc";
import Select from 'react-select'

const groups = [
    { value: 'N1', label: 'Nhóm 1' },
    { value: 'N2', label: 'Nhóm 2' },
    { value: 'N3', label: 'Nhóm 3' },
]

const years = [
    { value: '19-20', label: '2019 - 2020' },
    { value: '20-21', label: '2020 - 2021' },
    { value: '21-22', label: '2021 - 2022' },
    { value: '22-23', label: '2022 - 2023' },
    { value: '23-24', label: '2023 - 2024' },
    { value: '24-25', label: '2024 - 2025' },
    { value: '25-26', label: '2025 - 2026' },
]

const semesters = [
    { value: 'HK01', label: 'HK01' },
    { value: 'HK02', label: 'HK02' },
    { value: 'HK03', label: 'HK03' },
]

const courses = [
    { value: 'CF213', label: 'CF213 - Cấu trúc dữ iệu và giải thuật'},
    { value: 'CF231', label: 'CF231 - Lý thuyết thông tin và mã hóa'},
    { value: 'CS122', label: 'CS122 - Lập trính hướng đối tượng'},
]

const AddNewCourseSemesterGroup = () => {
  return (
    <div className="w-full bg-gray-100 p-6 overflow-auto mt-16 h-[90vh]">
        <div className="flex items-center">
            <FcInfo className="w-[33px] h-[33px]"/>
            <h1 className="text-[1.4993rem] pl-[8px] font-bold text-red-700 uppercase">Mở Lớp</h1>
        </div>
        <hr className="mb-4"></hr>
        <form className="bg-white p-4 shadow-sm border">            
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12 grid grid-cols-1 gap-y-6">
                    <div className="flex items-center gap-4 mb-6">
                        <div className='relative w-1/5 mb-[-24px]'>
                            <label htmlFor="sl-cours" className='absolute -top-2 left-3 bg-white px-1 text-gray-400 text-xs z-50'>Học kỳ</label>
                            <Select id='sl-cours' options={semesters} className='text-sm text-gray-800 z-40'/>
                        </div>
                        <div className='relative w-1/4 mb-[-24px] '>
                            <label htmlFor="sl-group" className='absolute -top-2 left-3 bg-white px-1 text-gray-400 text-xs z-50'>Nhóm</label>
                            <Select id='sl-group' options={groups} className='text-sm text-gray-800 focus-within:ring-2 focus-within:ring-inset focus-within:ring-red-800 z-40'/>
                        </div>
                        <div className='relative w-1/5 mb-[-24px]'>
                            <label htmlFor="sl-year" className='absolute -top-2 left-3 bg-white px-1 text-gray-400 text-xs z-50'>Năm học</label>
                            <Select id='sl-year' options={years} className='text-sm text-gray-800 z-40'/>
                        </div>
                    </div>
                    <div className="flex gap-5">
                        <div className='relative w-1/3 '>
                            <label htmlFor="sl-cours" className='absolute -top-2 left-3 bg-white px-1 text-gray-400 text-xs z-30'>Môn học</label>
                            <Select id='sl-cours' options={courses} className='text-sm text-gray-800 focus-within:ring-2 focus-within:ring-inset focus-within:ring-red-800 z-20'/>
                        </div>
                        <div className="sm:col-span-4 relative w-1/6">
                            <label htmlFor="slTinChi" className="absolute left-3 top-[-8px] bg-white px-1 text-gray-400 text-xs z-10">
                                SemesterGroupId
                            </label>
                            <div className="">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                    <input
                                    id="slTinChi"
                                    name="slTinChi"
                                    type="text"
                                    autoComplete="slTinChi"
                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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

export default AddNewCourseSemesterGroup
