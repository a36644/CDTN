import Select from 'react-select'
import { FcInfo } from "react-icons/fc";
import Table from '../../../components/table';

const major = [
  { value: 'TT', label: 'TT - Công nghệ thông tin' },
  { value: 'TE', label: 'TE - Toán ứng dụng' },
]

const data = [
    {
        courseId: 'KT9914',
        courseName: 'KE TOAN DN',
        credits: '2',
        coefficient: '1.6',
        type: 'CHUYENNGANH',
        departmentId: 'KT',
        majorID: 'AT',
        reqiId: 'MA101',
        requestCredits: '90',
    },
];

const columns = [
    {
        key: 'courseId',
        headerName: 'Mã học phần',
        headerClassName: 'w-20',
    },
    {
        key: 'courseName',
        headerName: 'Tên học phần',
    },
    {
        key: 'credits',
        headerName: 'Tín chỉ',
    },
    {
        key: 'coefficient',
        headerName: 'Hệ số',
    },
    {
        key: 'type',
        headerName: 'Phân loại',
    },
    {
        key: 'departmentId',
        headerName: 'Mã Khoa',
    },
    {
        key: 'majorID',
        headerName: 'Mã Chuyên ngành',
    },
    {
        key: 'reqiId',
        headerName: 'DK tiên quyết',
    },
    {
        key: 'requestCredits',
        headerName: 'Tín chỉ tối thiểu',
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

const ListSubject = () => {
  return (
    <div className="w-full bg-gray-100 p-6 overflow-auto mt-16 h-[90vh]" >
        <div className="flex items-center ">
            <FcInfo className="w-[33px] h-[33px]"/>
            <h1 className="text-[1.4993rem] pl-[8px] font-bold text-red-700 uppercase">Danh sách môn học</h1>
        </div>
        <hr className="mb-3"></hr>
        <div className='p-4 bg-white shadow-sm border '>
            <div className='relative mb-[22.5px]'>
                <label htmlFor="sl-cours" className='absolute -top-2 left-3 bg-white px-1 text-gray-500 text-xs z-30'>Chuyên ngành</label>
                <Select options={major} className='w-1/4'/>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <Table columns={columns} data={data} />
            </div>

        </div>
    </div>
  )
}

export default ListSubject

