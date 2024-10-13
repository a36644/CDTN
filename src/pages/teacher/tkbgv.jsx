import Select from "react-select";
import { FcInfo } from "react-icons/fc";
import { useEffect, useState } from "react";
import { fetchData } from "../../lib/api";

const Tkbgv = () => {
  const [tkb, setTkb] = useState([]);
  const [semester, setSemester] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState(null);

  useEffect(() => {
    fetchData("teacher/getAllSemester")
      .then((result) => {
        setSemester(
          result.map((item) => {
            return {
              value: item.semesterGroupId,
              label: item.semesterGroupId,
            };
          })
        );
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    if (selectedSemester) {
      fetchData(`teacher/getSchedule?semester=${selectedSemester}`)
        .then((result) => {
          console.log("🚀 ~ .then ~ result:", result)
          setTkb(result);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [selectedSemester]);

  const createTimetable = () => {
    const timetable = Array.from({ length: 10 }, () => Array(7).fill(null));

    // Chuyển đổi dữ liệu mẫu vào bảng
    tkb.forEach(({ classRoomId, classRoomName, roomId, start, end }) => {
      for (let period = start; period <= end; period++) {
        const periodIndex = (period % 10);
        const dayIndex = Math.floor((period) / 10);

        timetable[periodIndex][dayIndex] = {
          classRoomId,
          classRoomName,
          roomId,
        };
      }
    });

    return timetable;
  };

  const timetable = createTimetable();

  const renderTimetable = () => {
    const rowSpanTracker = Array(7).fill(0);
    return (
      <>
        {Array.from({ length: 10 }, (_, periodIndex) => (
          <tr key={periodIndex}>
            <td className="border border-gray-300 py-2 max-w-2 text-center">
              {periodIndex + 1}
            </td>
            {timetable[periodIndex].map((cell, dayIndex) => {
              if (rowSpanTracker[dayIndex] > 0) {
                rowSpanTracker[dayIndex]--;
                return null; // Skip if there's already a rowspan for this cell
              }
  
              if (!cell) {
                return <td key={dayIndex} className="border border-gray-300 p-2 max-w-4"></td>; // Empty cell
              }
  
              let rowSpan = 1;
              // Check for overlapping classes
              for (let i = periodIndex + 1; i < 10; i++) {
                if (timetable[i][dayIndex] && timetable[i][dayIndex].classRoomId === cell.classRoomId) {
                  rowSpan++;
                } else {
                  break; // Stop when we find a non-matching cell
                }
              }
  
              if (rowSpan > 1) {
                rowSpanTracker[dayIndex] = rowSpan - 1; // Track how many we need to skip
              }
  
              return (
                <td
                  key={dayIndex}
                  className="border border-gray-300 p-2 max-w-4"
                  rowSpan={rowSpan}
                >
                  <div className="flex flex-col">
                    <span>{cell.classRoomName}</span>
                    <span>{cell.roomId}</span>
                  </div>
                </td>
              );
            })}
          </tr>
        ))}
      </>
    );
  };

  return (
    <div className="w-full bg-gray-100 p-6 overflow-auto mt-16 h-[90vh]">
      <div className="flex items-center ">
        <FcInfo className="w-[33px] h-[33px]" />
        <h1 className="text-[1.4993rem] pl-[8px] font-bold text-red-700 uppercase">
          Thời Khóa Biểu
        </h1>
      </div>
      <hr className="mb-3"></hr>
      <div className="p-4 bg-white shadow-sm border">
        <div className="mb-[22.5px] flex ">
          <div className="relative w-1/5">
            <label
              htmlFor="sl-cours"
              className="absolute -top-2 left-3 bg-white px-1 text-gray-400 text-xs z-10"
            >
              Học kỳ
            </label>
            <Select
              id="sl-cours"
              options={semester}
              onChange={(e) => setSelectedSemester(e.value)}
              className="mr-4 text-sm text-gray-800 "
            />
          </div>
        </div>
        <table className="w-full bg-white border-collapse border border-gray-200 text-[13px]">
          <thead className="text-sm">
            <tr className="bg-red-800 text-white ">
              <th className="border border-gray-400 py-[6px] font-normal max-w-10 w-10">
                Tiết
              </th>
              <th className="border border-gray-400 py-[6px] w-[13.5%] font-normal">
                Thứ 2
              </th>
              <th className="border border-gray-400 py-[6px] w-[13.5%] font-normal">
                Thứ 3
              </th>
              <th className="border border-gray-400 py-[6px] w-[13.5%] font-normal">
                Thứ 4
              </th>
              <th className="border border-gray-400 py-[6px] w-[13.5%] font-normal">
                Thứ 5
              </th>
              <th className="border border-gray-400 py-[6px] w-[13.5%] font-normal">
                Thứ 6
              </th>
              <th className="border border-gray-400 py-[6px] w-[13.5%] font-normal">
                Thứ 7
              </th>
              <th className="border border-gray-400 py-[6px] w-[13.5%] font-normal">
                Chủ nhật
              </th>
            </tr>
          </thead>
          <tbody>{renderTimetable()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Tkbgv;
