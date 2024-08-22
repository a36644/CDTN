import Select from 'react-select'
import { FcInfo } from "react-icons/fc";

const ctdt = [
  { value: 'CNTT-K32', label: 'Công nghệ thông tin - Khóa 32' },
]

const Ctdt = () => {
  return (
    <div className="w-full bg-gray-100 p-6 overflow-auto mt-16 h-[90vh]" >
      <div className="flex items-center ">
        <FcInfo className="w-[33px] h-[33px]"/>
        <h1 className="text-[1.4993rem] pl-[8px] font-bold text-red-700 uppercase">Chương trình đào tạo</h1>
      </div>
      <hr className="mb-3"></hr>
      <div className='p-4 bg-white shadow-sm border'>
        <div className='mb-[22.5px] relative'>
          <label htmlFor="sl-cours" className='absolute -top-2 left-3 bg-white px-1 text-gray-500 text-xs z-30'>Chương trình đào tạo</label>
          <Select options={ctdt} className='w-1/4'/>
        </div>
        <table className="min-w-full bg-white border-collapse border border-gray-200 text-[13px]">
          <thead className='text-sm font-thin'>
            <tr className="bg-red-800 text-white">
                <th className="border border-gray-400 px-4 py-[6px]" rowSpan="2">STT</th>
                <th className="border border-gray-400 px-4 py-[6px]" rowSpan="2">MÃ HỌC PHẦN</th>
                <th className="border border-gray-400 px-4 py-[6px]" rowSpan="2">TÊN HỌC PHẦN</th>
                <th className="border border-gray-400 px-4 py-[6px]" rowSpan="2">NHÓM TỰ CHỌN</th>
                <th className="border border-gray-400 px-4 py-[6px]" rowSpan="2">SỐ TC</th>
                <th className="border border-gray-400 px-4 py-[6px]" colSpan="2">SỐ TIẾT</th>
                <th className="border border-gray-400 px-4 py-[6px]" rowSpan="2">HỌC PHẦN TIÊN QUYẾT</th>
                <th className="border border-gray-400 px-4 py-[6px]" rowSpan="2">HỌC PHẦN HỌC TRƯỚC</th>
                <th className="border border-gray-400 px-4 py-[6px] w-[216px]" rowSpan="2">HỌC PHẦN TƯƠNG ĐƯƠNG</th>
                <th className="border border-gray-400 px-4 py-[6px] w-[130px]" rowSpan="2">KHOA/BỘ MÔN</th>
            </tr>
            <tr className="bg-red-800 text-white">
                <th className="border border-gray-400 px-4 py-[6px] w-12">LT</th>
                <th className="border border-gray-400 px-4 py-[6px] w-12">TH</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="font-bold text-left px-4 py-2 border border-gray-400" colSpan="11">Chưa phân học kỳ</td>
            </tr>
            <tr>
              <td className="font-bold text-left px-4 py-2 border border-gray-400" colSpan="11">Bắt buộc</td>
            </tr>
            <tr className="">
              <td className="border border-gray-400 px-4 py-[6px]">1</td>
              <td className="border border-gray-400 px-4 py-[6px]">CF213</td>
              <td className="border border-gray-400 px-4 py-[6px]">Cấu trúc dữ liệu và giải thuật</td>
              <td className="border border-gray-400 px-4 py-[6px]"></td>
              <td className="border border-gray-400 px-4 py-[6px]">4</td>
              <td className="border border-gray-400 px-4 py-[6px]">45</td>
              <td className="border border-gray-400 px-4 py-[6px]">36</td>
              <td className="border border-gray-400 px-4 py-[6px]"></td>
              <td className="border border-gray-400 px-4 py-[6px]"></td>
              <td className="border border-gray-400 px-4 py-[6px]"></td>
              <td className="border border-gray-400 px-4 py-[6px]">Khoa Công Nghệ Thông Tin</td>
            </tr>
            <tr className="">
              <td className="border border-gray-400 px-4 py-[6px]">2</td>
              <td className="border border-gray-400 px-4 py-[6px]">CF231</td>
              <td className="border border-gray-400 px-4 py-[6px]">Lý thuyết thông tin và mã hóa</td>
              <td className="border border-gray-400 px-4 py-[6px]"></td>
              <td className="border border-gray-400 px-4 py-[6px]">2</td>
              <td className="border border-gray-400 px-4 py-[6px]">18</td>
              <td className="border border-gray-400 px-4 py-[6px]">24</td>
              <td className="border border-gray-400 px-4 py-[6px]"></td>
              <td className="border border-gray-400 px-4 py-[6px]"></td>
              <td className="border border-gray-400 px-4 py-[6px]"></td>
              <td className="border border-gray-400 px-4 py-[6px]">Khoa Công Nghệ Thông Tin</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Ctdt

