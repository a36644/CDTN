/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TableDetails = ({ columns, data }) => {
    const [selectedRow, setSelectedRow] = useState(null); 
    const navigate = useNavigate()
    const handleRowClick = (row) => {
        setSelectedRow(row); 
        localStorage.setItem('room', JSON.stringify({...row,shiftStart:3,shiftEnd:5}))
    };

    return (
        <div>
            {/* Bảng */}
            <table className="w-full text-xs text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr className="text-center">
                        {columns.map((col) => (
                            <th
                                key={col.key}
                                className={`px-4 py-3 ${col.headerClassName || ''}`}
                                style={col.headerStyle || {}}
                            >
                                {col.headerName}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr
                            key={rowIndex}
                            onClick={() => {handleRowClick(row)
                                navigate('ListClassRoom')
                            }}
                            className={`cursor-pointer ${
                                rowIndex % 2 === 0
                                    ? 'odd:bg-white odd:dark:bg-gray-900'
                                    : 'even:bg-gray-50 even:dark:bg-gray-800'
                            } border-b dark:border-gray-700`}
                        >
                            {columns.map((col) => (
                                <td
                                    key={col.key}
                                    className={`p-4 ${col.className || ''}`}
                                    style={col.style || {}}
                                >
                                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedRow && (
                <div className="mt-4 p-4 border rounded-lg dark:border-gray-700 dark:bg-gray-800">
                    <h3 className="text-lg font-semibold">Chi tiết hàng đã chọn:</h3>
                    <pre className="text-sm">
                        {JSON.stringify(selectedRow, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
};

export default TableDetails;
