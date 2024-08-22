import { CgPlayTrackNext, CgPlayTrackPrev } from "react-icons/cg";
import { BsGrid3X2 } from "react-icons/bs";
import Select from 'react-select'
import { FcInfo } from "react-icons/fc";
import { useEffect, useState } from "react";


const years = [
    { value: '19-20', label: '2019 - 2020' },
    { value: '20-21', label: '2020 - 2021' },
    { value: '21-22', label: '2021 - 2022' },
    { value: '22-23', label: '2022 - 2023' },
    { value: '23-24', label: '2023 - 2024' },
    { value: '24-25', label: '2024 - 2025' },
    { value: '25-26', label: '2025 - 2026' },
]

const cours = [
    { value: 'HK01', label: 'HK01' },
    { value: 'HK02', label: 'HK02' },
    { value: 'HK03', label: 'HK03' },
]

const weeks = [
    { value: 'w1', label: '12/08/2024-18/8/2024' },
    { value: 'w2', label: '19/08/2024-25/8/2024' },
    { value: 'w3', label: '26/08/2024-01/9/2024' },
]



const Tkb = () => {
    const [year, setYear] = useState(0)

    const handleGetYear = (year) => {
        setYear(year.value)
    } 
    useEffect(() => {
     
        setYear(year+1)
     
    }, [])
    
    console.log("🚀 ~ Tkb ~ year:", year)

  return (
    <div className='w-full bg-gray-100 p-6 overflow-auto mt-16 h-[90vh]'>
        <div className="flex items-center ">
            <FcInfo className="w-[33px] h-[33px]"/>
            <h1 className="text-[1.4993rem] pl-[8px] font-bold text-red-700 uppercase">Thời Khóa Biểu</h1>
        </div>
        <hr className="mb-3"></hr>
        <div className='p-4 bg-white shadow-sm border'>
            <div className='mb-[22.5px] flex '>
                <div className='relative w-1/6'>
                    <label htmlFor="sl-year" className='absolute -top-2 left-3 bg-white px-1 text-gray-400 text-xs z-10'>Năm học</label>
                    <Select id='sl-year' options={years} className='mr-4 text-sm text-gray-800 ' onChange={handleGetYear}/>
                </div>
                <div className='relative w-1/5'>
                    <label htmlFor="sl-cours" className='absolute -top-2 left-3 bg-white px-1 text-gray-400 text-xs z-10'>Học kỳ</label>
                    <Select id='sl-cours' options={cours} className='mr-4 text-sm text-gray-800 '/>
                </div>
                <div className='relative w-1/4'>
                    <label htmlFor="sl-week" className='absolute -top-2 left-3 bg-white px-1 text-gray-400 text-xs z-10'>Tuần</label>
                    <Select id='sl-weeks' options={weeks} className='mr-4 text-sm text-gray-800 '/>
                </div>
                <div className="items-center flex">
                    <button className="border bg-red-800 px-2.5 py-1 rounded text-white"><CgPlayTrackPrev className="w-11 h-[22.5px] " /></button>
                    <button className="border bg-red-800 px-2.5 py-1 rounded text-white text-xs font-semibold"><BsGrid3X2 className="text-xl h-[22.5px] inline-block" /> Hiện tại</button>
                    <button className="border bg-red-800 px-2.5 py-1 rounded text-white"><CgPlayTrackNext className="w-11 h-[22.5px] " /></button>
                </div>
            </div>
            <table className="min-w-full bg-white border-collapse border border-gray-200 text-[13px]">
                <thead className='text-sm'>
                    <tr className="bg-red-800 text-white ">
                        <th className="border border-gray-400 px-4 py-[6px] w-6 font-normal" rowSpan="2">Tiết</th>
                        <th className="border-x border-t border-gray-400 px-4 pt-[6px] font-normal" rowSpan="1">Thứ 2</th>
                        <th className="border-x border-t border-gray-400 px-4 pt-[6px] font-normal" rowSpan="1">Thứ 3</th>
                        <th className="border-x border-t border-gray-400 px-4 pt-[6px] font-normal" rowSpan="1">Thứ 4</th>
                        <th className="border-x border-t border-gray-400 px-4 pt-[6px] font-normal" rowSpan="1">Thứ 5</th>
                        <th className="border-x border-t border-gray-400 px-4 pt-[6px] font-normal" colSpan="1">Thứ 6</th>
                        <th className="border-x border-t border-gray-400 px-4 pt-[6px] font-normal" rowSpan="1">Thứ 7</th>
                        <th className="border-x border-t border-gray-400 px-4 pt-[6px] font-normal" rowSpan="1">Chủ nhật</th>
                    </tr>
                    <tr className="bg-red-800 text-white">
                        <th className="border-x border-gray-400 px-4 pb-[6px] w-12 font-normal">18/08/2024</th>
                        <th className="border-x border-gray-400 px-4 pb-[6px] w-12 font-normal">19/08/2024</th>
                        <th className="border-x border-gray-400 px-4 pb-[6px] w-12 font-normal">19/08/2024</th>
                        <th className="border-x border-gray-400 px-4 pb-[6px] w-12 font-normal">19/08/2024</th>
                        <th className="border-x border-gray-400 px-4 pb-[6px] w-12 font-normal">19/08/2024</th>
                        <th className="border-x border-gray-400 px-4 pb-[6px] w-12 font-normal">19/08/2024</th>
                        <th className="border-x border-gray-400 px-4 pb-[6px] w-12 font-normal">19/08/2024</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    <tr className="">
                        <td className="border border-gray-400 px-4 py-[6px]">1</td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                    </tr>
                    <tr className="">
                        <td className="border border-gray-400 px-4 py-[6px]">2</td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                    </tr>
                    <tr className="">
                        <td className="border border-gray-400 px-4 py-[6px]">3</td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                    </tr>
                    <tr className="">
                        <td className="border border-gray-400 px-4 py-[6px]">4</td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                    </tr>
                    <tr className="">
                        <td className="border border-gray-400 px-4 py-[6px]">5</td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                    </tr>
                    <tr className="">
                        <td className="border border-gray-400 px-4 py-[6px]">6</td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                    </tr>
                    <tr className="">
                        <td className="border border-gray-400 px-4 py-[6px]">7</td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                    </tr>
                    <tr className="">
                        <td className="border border-gray-400 px-4 py-[6px]">8</td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                    </tr>
                    <tr className="">
                        <td className="border border-gray-400 px-4 py-[6px]">9</td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                    </tr>
                    <tr className="">
                        <td className="border border-gray-400 px-4 py-[6px]">10</td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                    </tr>
                    <tr className="">
                        <td className="border border-gray-400 px-4 py-[6px]">11</td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                    </tr>
                    <tr className="">
                        <td className="border border-gray-400 px-4 py-[6px]">12</td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                    </tr>
                    <tr className="">
                        <td className="border border-gray-400 px-4 py-[6px]">13</td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                    </tr>
                    <tr className="">
                        <td className="border border-gray-400 px-4 py-[6px]">14</td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                    </tr>
                    <tr className="">
                        <td className="border border-gray-400 px-4 py-[6px]">15</td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                    </tr>
                    <tr className="">
                        <td className="border border-gray-400 px-4 py-[6px]">16</td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                        <td className="border border-gray-400 px-4 py-[6px]"></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

  )
}

export default Tkb
