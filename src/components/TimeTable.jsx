import { useState } from "react";

// eslint-disable-next-line react/prop-types
function Timetable({ setStt }) {
  const [selectedCells, setSelectedCells] = useState({});
  const [ca, setCa] = useState([]);

  const handleCellClick = (row, col) => {
    setStt((pre) => [...pre, col * 10 + row]);
    const cellKey = `${row}-${col}`;
    setSelectedCells((prev) => ({
      ...prev,
      [cellKey]: !prev[cellKey],
    }));

    const newSession = { Tiet: row, Thu: col + 2 };

    setCa((prevCa) => {
      const updatedCa = [...prevCa, newSession];
      localStorage.setItem("CaHoc", JSON.stringify(updatedCa));
      return updatedCa;
    });
  };
  const days = [
    "Thứ 2",
    "Thứ 3",
    "Thứ 4",
    "Thứ 5",
    "Thứ 6",
    "Thứ 7",
    "Chủ nhật",
  ];
  const renderTable = () => {
    const rows = [];

    for (let i = 1; i <= 10; i++) {
      const cells = [];

      for (let j = 0; j < 7; j++) {
        const cellKey = `${i}-${j}`;
        const isSelected = selectedCells[cellKey];
        cells.push(
          <td
            key={cellKey}
            className={`border border-gray-300 px-4 py-[6px] ${
              isSelected ? "bg-green-300" : ""
            }`}
            onClick={() => handleCellClick(i, j)}
          ></td>
        );
      }
      rows.push(
        <tr key={i}>
          <td className="border border-gray-300 px-4 py-2">{i}</td>
          {cells}
        </tr>
      );
    }

    return rows;
  };

  return (
    <div className="flex justify-center mt-5">
      <table className="min-w-full bg-white border-collapse border border-gray-200 text-[13px]">
        <thead className="text-sm">
          <tr className="bg-red-800 text-white h-12">
            <th className="border border-gray-300 px-4 py-[6px] w-6 font-normal">
              Tiết
            </th>
            {days.map((day) => (
              <th
                key={day}
                className="border-x border-t border-gray-300 px-4 py-[6px] font-normal"
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-center">{renderTable()}</tbody>
      </table>
    </div>
  );
}

export default Timetable;
