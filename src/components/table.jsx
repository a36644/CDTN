/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
const Table = ({ columns, data }) => {
    return (
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
                        className={`${
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
    );
};

export default Table;