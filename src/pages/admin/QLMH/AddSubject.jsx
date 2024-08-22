import { FcInfo } from "react-icons/fc";
import Select from 'react-select'

const major = [
    { value: 'GDDC', label: 'Giáo dục đại cương' },
    { value: 'TT', label: 'Công nghệ thông tin' },
    { value: 'TE', label: 'Toán ứng dụng' },
]

const type = [
    { value: 'CN', label: 'Chuyên ngành' },
    { value: 'CS', label: 'Cơ sở' },
]

const AddSubject = () => {
  return (
    <div className="w-full bg-gray-100 p-6 overflow-auto mt-16 h-[90vh]">
        <div className="flex items-center">
            <FcInfo className="w-[33px] h-[33px]"/>
            <h1 className="text-[1.4993rem] pl-[8px] font-bold text-red-700 uppercase">Thêm môn học</h1>
        </div>
        <hr className="mb-4"></hr>
        <form className="bg-white p-4 shadow-sm border">            
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12 grid grid-cols-1 gap-y-6">
                    <div className="flex gap-5">
                        <div className="sm:col-span-4 relative w-1/6">
                            <label htmlFor="mamon" className="absolute left-3 top bg-white px-1 text-gray-400 text-xs z-10">
                                Mã môn học
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                    <input
                                    id="mamon"
                                    name="mamon"
                                    type="text"
                                    autoComplete="mamon"
                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"/>
                                </div>
                            </div>
                        </div>
                        <div className="sm:col-span-4 relative w-1/3">
                            <label htmlFor="tenmon" className="absolute left-3 top bg-white px-1 text-gray-400 text-xs z-10">
                                Môn học
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                    <input
                                    id="tenmon"
                                    name="tenmon"
                                    type="text"
                                    autoComplete="tenmon"
                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"/>
                                </div>
                            </div>
                        </div>
                        <div className="sm:col-span-4 relative w-1/6">
                            <label htmlFor="tinchi" className="absolute left-3 top bg-white px-1 text-gray-400 text-xs z-10">
                                Số tín chỉ
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                    <input
                                    id="tinchi"
                                    name="tinchi"
                                    type="number"
                                    autoComplete="tinchi"
                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-5">
                        <div className="sm:col-span-4 relative w-1/4">
                            <div className='relative '>
                                <label htmlFor="sl-cours" className='absolute -top-2 left-3 bg-white px-1 text-gray-400 text-xs z-30'>Chuyên ngành</label>
                                <Select id='sl-cours' options={major} className='text-sm text-gray-800 focus-within:ring-2 focus-within:ring-inset focus-within:ring-red-800 z-20'/>
                            </div>
                        </div>
                        <div className="sm:col-span-4 relative w-1/4">
                            <label htmlFor="dktq" className="absolute left-3 top-[-8px] bg-white px-1 text-gray-400 text-xs z-10">
                                Điều kiện tiên quyết
                            </label>
                            <div className="">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                <input
                                    id="dktq"
                                    name="dktq"
                                    type="text"
                                    autoComplete="dktq"
                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"/>
                                </div>
                            </div>
                        </div>
                        <div className="sm:col-span-4 relative w-1/6">
                            <label htmlFor="requestCredits" className="absolute left-3 -top-2 bg-white px-1 text-gray-400 text-xs z-10">
                                Yêu cầu tín chỉ
                            </label>
                            <div className="">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                    <input
                                    id="requestCredits"
                                    name="requestCredits"
                                    type="number"
                                    autoComplete="requestCredits"
                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-5">
                        <div className="sm:col-span-4 relative w-1/5">
                            <label  htmlFor="sogio" className="absolute left-3 top-[-8px] bg-white px-1 text-gray-400 text-xs z-10">
                                Số giờ
                            </label>
                            <div  className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                <input
                                    id="sogio"
                                    name="sogio"
                                    type="number"
                                    autoComplete="sogio"
                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"/>
                            </div>
                        </div>
                        <div className="sm:col-span-4 relative w-1/5">
                            <label  htmlFor="heso" className="absolute left-3 top-[-8px] bg-white px-1 text-gray-400 text-xs z-10">
                                Hệ số
                            </label>
                            <div  className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                <input
                                    id="heso"
                                    name="heso"
                                    type="number"
                                    autoComplete="heso"
                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"/>
                            </div>
                        </div>
                        <div className="sm:col-span-4 relative w-1/4">
                            <div className='relative '>
                                <label htmlFor="type" className='absolute -top-2 left-3 bg-white px-1 text-gray-400 text-xs z-30'>Phân loại môn</label>
                                <Select id='type' options={type} className='text-sm text-gray-800 focus-within:ring-2 focus-within:ring-inset focus-within:ring-red-800 z-20'/>
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

export default AddSubject
