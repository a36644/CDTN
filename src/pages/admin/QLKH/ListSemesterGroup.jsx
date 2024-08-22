import { FcInfo } from "react-icons/fc";
import Table from "../../../components/table";

const data = [
    {
        semesterID: 'K2',
        groupID: 'N3',
        baseCost: '440000',
        start: '2025-02-15',
        end: '2025-05-15',
        timeDKHoc: '2025-02-10',
    },
];

const columns = [
    {
        key: 'semesterID',
        headerName: 'Mã kỳ học',
        headerClassName: 'w-30',
        className: 'text-center',
    },
    {
        key: 'groupID',
        headerName: 'Mã nhóm',
        className: 'text-center',
    },
    {
        key: 'baseCost',
        headerName: 'Base Cost',
        className: 'text-center',
    },
    {
        key: 'start',
        headerName: 'Thời gian bắt đầu',
        className: 'text-center',
    },
    {
        key: 'end',
        headerName: 'Thời gian kết thúc',
        className: 'text-center',
    },
    {
        key: 'timeDKHoc',
        headerName: 'Thời gian đăng ký học',
        className: 'text-center',
    },
    {
        key: 'action',
        headerName: 'Action',
        className: 'flex justify-between',
        // eslint-disable-next-line no-unused-vars
        render: (value, row) => (
            <>
                <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-2"
                >
                    Edit
                </a>
                <a
                    href="#"
                    className="font-medium text-red-600 dark:text-red-500 hover:underline mx-2"
                >
                    Remove
                </a>
            </>
        ),
    },
];
const ListSemesterGroup = () => {
  return (
    <div className="w-full bg-gray-100 p-6 overflow-auto mt-16 h-[90vh]" >
        <div className="flex items-center ">
            <FcInfo className="w-[33px] h-[33px]"/>
            <h1 className="text-[1.4993rem] pl-[8px] font-bold text-red-700 uppercase">Danh sách kỳ học</h1>
        </div>
        <hr className="mb-3"></hr>
        <div className='p-4 bg-white shadow-sm border '>      
            <form className="max-w-md mx-auto mb-2">   
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                        
                    </div>
                    <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search ID" required />
                    <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                </div>
            </form>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <Table columns={columns} data={data} />
            </div>

        </div>
    </div>
  )
}

export default ListSemesterGroup
