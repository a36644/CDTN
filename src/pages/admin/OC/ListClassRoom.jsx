/* eslint-disable no-unused-vars */
import { FcInfo } from "react-icons/fc";
import { useEffect, useState } from "react";

const ListClassRoom = () => {
    const [roomDetail, setRoomDetail] = useState({
        "roomID": "02321",
        "roomName": "Reva Branch",
        "seat": 39967,
        "lopList": "Salad",
        "id": "1",
        "shifts": {
          "Thứ 2": [
            { "shiftStart": 1, "shiftEnd": 2, "subjects": "Math" },
            { "shiftStart": 3, "shiftEnd": 4, "subjects": "History" }
          ],
          "Thứ 3": [
            { "shiftStart": 2, "shiftEnd": 4, "subjects": "Science" },
            { "shiftStart": 5, "shiftEnd": 6, "subjects": "Art" }
          ],
          "Thứ 4": [
            { "shiftStart": 1, "shiftEnd": 3, "subjects": "English" },
            { "shiftStart": 4, "shiftEnd": 5, "subjects": "Biology" }
          ],
          "Thứ 5": [
            { "shiftStart": 2, "shiftEnd": 4, "subjects": "Chemistry" },
            { "shiftStart": 5, "shiftEnd": 6, "subjects": "Geography" }
          ],
          "Thứ 6": [
            { "shiftStart": 1, "shiftEnd": 2, "subjects": "Physics" },
            { "shiftStart": 3, "shiftEnd": 4, "subjects": "Music" }
          ],
          "Thứ 7": [
            { "shiftStart": 2, "shiftEnd": 3, "subjects": "PE" },
            { "shiftStart": 4, "shiftEnd": 5, "subjects": "Drama" }
          ],
          "Chủ nhật": [
            { "shiftStart": 1, "shiftEnd": 2, "subjects": "Philosophy" },
            { "shiftStart": 3, "shiftEnd": 4, "subjects": "Economics" }
          ]
        }
      }
      );
    const days = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'];
    
    useEffect(() => {
        // Load room details from localStorage
        // setRoomDetail(JSON.parse(localStorage.getItem('room')));
    }, []);

    const renderTable = () => {
        const rows = [];
        const mergeMap = {}; // To track rowspan for each subject in each day
    
        // Loop through each row (representing each period)
        for (let i = 1; i <= 16; i++) {
            const cells = [];
    
            // Loop through each day of the week
            for (let j = 0; j < 7; j++) {
                const day = days[j];
                const shifts = roomDetail?.shifts[day] || [];
    
                // Find the current shift that includes this period
                const shift = shifts.find(shift => i >= shift.shiftStart && i <= shift.shiftEnd);
                const isHighlighted = !!shift;
                const subject = isHighlighted ? shift.subjects : null;
    
                if (subject) {
                    const key = `${day}-${subject}`;
                    
                    // If the subject has been seen before and is still within its rowspan, skip rendering this cell
                    if (mergeMap[key] && mergeMap[key].remainingRows > 0) {
                        mergeMap[key].remainingRows--; // Decrease the remaining rows to span
                        continue; // Skip rendering this cell
                    } else if (!mergeMap[key]) {
                        // New subject - calculate rowspan
                        const rowSpan = shift.shiftEnd - shift.shiftStart + 1;
                        mergeMap[key] = { rowSpan, remainingRows: rowSpan - 1 };
    
                        // Render the cell with the calculated rowspan
                        cells.push(
                            <td
                                key={j}
                                rowSpan={rowSpan}
                                title={roomDetail.roomName + "\nc" + roomDetail.roomID}
                                className='border border-gray-300 px-4 py-2 bg-red-500'
                            >
                                {subject}
                            </td>
                        );
                    }
                } else {
                    // Add an empty cell if there's no subject
                    cells.push(
                        <td
                            key={j}
                            className='border border-gray-300 px-4 py-2'
                        ></td>
                    );
                }
            }
    
            rows.push(
                <tr key={i}>
                    <td className='border border-gray-300 px-4 py-[6px]'>{i}</td>
                    {cells}
                </tr>
            );
        }
    
        return rows;
    };
    
    

    return (
        <div className="w-full bg-gray-100 p-6 overflow-auto mt-16 h-[90vh]">
            <div className="flex items-center">
                <FcInfo className="w-[33px] h-[33px]" />
                <h1 className="text-[1.4993rem] pl-[8px] font-bold text-red-700 uppercase">Danh sách lớp sử dụng phòng</h1>
            </div>
            <hr className="mb-4" />
            <table className="min-w-full bg-white border-collapse border border-gray-200 text-[13px]">
                <thead className='text-sm'>
                    <tr className="bg-red-800 text-white h-12">
                        <th className="border border-gray-300 px-4 py-[6px] w-6 font-normal">Tiết</th>
                        {days.map((day) => (
                            <th key={day} className="border-x border-t border-gray-300 px-4 py-[6px] font-normal">
                                {day}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className='text-center'>{renderTable()}</tbody>
            </table>
        </div>
    );
};

export default ListClassRoom;
