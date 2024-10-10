/* eslint-disable no-unused-vars */
import { FcInfo } from "react-icons/fc";
import { useEffect, useState } from "react";
import { fetchData, postData } from "../../../lib/api";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { FaPlus } from "react-icons/fa6";
import TableDetails from "../../../components/tableDetails";


const columns = [
    {
        key: 'roomID',
        headerName: 'Mã phòng',
        headerClassName: 'w-20',
    },
    {
        key: 'roomName',
        headerName: 'Tên phòng',
    },
    {
        key: 'seat',
        headerName: 'Số chỗ ngồi',
        className: 'text-center',
    },
    {
        key: 'lopList',
        headerName: 'Danh sách lớp học',
        className: 'text-center',
    },
    {
        key: 'action',
        headerName: 'Action',
        className: 'flex justify-between w-40',
        headerClassName: 'w-40',
        // eslint-disable-next-line no-unused-vars
        render: (value, row) => (
            <>
                <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-4"
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

const GetAllRoom = () => {
    const [data, setData] = useState([])
    const [isRefresh, setIsRefresh] = useState(false)
    const [loading, setLoading] = useState(false)  

    useEffect(() => {
        const getData = async () => {
            setLoading(true)
          try {
            const result = await fetchData('https://66d969784ad2f6b8ed5485c8.mockapi.io/Room/ListRoom');
            setData(result);
            setLoading(false)
          } catch (error) {
            console.error('Failed to fetch data:', error);
          }finally {
            setLoading(false)
          }
        };

        getData();
      }, [isRefresh]);
    const handleAdd = async () =>{
        setLoading(true)
        const formData = {
            classId: 'classID',
            className:'className',
            type: 'type',
            teacherName: 'teacherName',
            classRoom: 'classRoom',
        }
        try {
            await postData('https://66d969784ad2f6b8ed5485c8.mockapi.io/Room/ListRoom', formData)
            setIsRefresh(!isRefresh)
            setLoading(false)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className="relative">
        {loading && <LoadingSpinner/>}
            <a href="addNewCourseSemesterGroup" className="flex text-white absolute bottom-3 right-8 z-10 my-auto bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-[50%] text-xl w-9 h-9 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><FaPlus className="m-auto"/></a>
            <div className="w-full bg-gray-100 p-6 overflow-auto mt-16 h-[90vh] " >
                <div className="flex items-center ">
                    <FcInfo className="w-[33px] h-[33px]"/>
                    <h1 className="text-[1.4993rem] pl-[8px] font-bold text-red-700 uppercase">Danh sách phòng</h1>
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
                        <TableDetails columns={columns} data={data} />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default GetAllRoom
