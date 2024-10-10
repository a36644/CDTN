import React, { useState, useEffect } from 'react';

const ScheduleTable = () => {
  const [Thu, setThu] = useState([]);
  const [Locate, setLocate] = useState([]);
  const [rows] = useState(Array.from({ length: 10 }, (_, i) => i));
  const [columns] = useState(Array.from({ length: 6 }, (_, i) => i));
  const [start, setStart] = useState(-1);
  const [finish, setFinish] = useState(-1);
  
  useEffect(() => {
    renderData();
  }, []);
  
  const renderData = () => {
    const thuArray = [];
    for (let i = 0; i < 6; i++) {
      thuArray.push('Thứ ' + (i + 2));
    }
    setThu(thuArray);
    
    const locateArray = Array.from({ length: 60 }, (_, i) => ({
      locate: i,
      status: false,
      passStatus: false
    }));
    setLocate(locateArray);
  };

  const handleClick = (i) => {
    if (Locate[i].status) {
      const updatedLocate = [...Locate];
      for (let k = i; k <= finish; k++) {
        updatedLocate[k].status = false;
      }
      if (start === i) {
        setFinish(-1);
        setStart(-1);
      } else {
        setFinish(i - 1);
      }
      setLocate(updatedLocate);
    } else {
      checkPosition(i);
    }
  };

  const checkPosition = (i) => {
    const updatedLocate = [...Locate];
    if (start === -1) {
      setStart(i);
      setFinish(i);
      updatedLocate[i].status = true;
    } else {
      if (Math.floor(start / 5) !== Math.floor(i / 5)) {
        for (let k = start; k <= finish; k++) {
          updatedLocate[k].status = false;
        }
        setFinish(i);
        setStart(i);
        updatedLocate[i].status = true;
      } else {
        if (i < start) {
          setStart(i);
        }
        if (i > finish) {
          setFinish(i);
        }
        for (let k = start; k <= finish; k++) {
          if (updatedLocate[k].passStatus) {
            for (let j = start; j <= finish; j++) {
              updatedLocate[j].status = false;
            }
            setStart(i);
            setFinish(i);
            updatedLocate[k].status = true;
            updatedLocate[i].status = true;
          } else {
            updatedLocate[k].status = true;
          }
        }
      }
    }
    setLocate(updatedLocate);
  };

  const convertSchedule = (start, finish) => {
    if (start === -1) {
      return '';
    }
    const length = finish - start;
    const thu = 'Thứ ' + Math.floor(start / 5 / 2 + 2);
    const ca = 'Ca Học :' + ((start % 10) + 1) + '-' + ((start % 10) + 1 + length);
    return thu + ' : ' + ca;
  };

  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-300 text-center py-2">Ca/Thứ</th>
            {Thu.map((item, index) => (
              <th key={index} className="border border-gray-300 text-center py-2">{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-gray-100' : ''}>
              <td className="border border-gray-300 text-center py-2">{i + 1}</td>
              {columns.map((col) => {
                const index = col * rows.length + i;
                return (
                  <td key={col} className="border border-gray-300">
                    <button
                      className={`w-full h-full border rounded-md transition-colors duration-300 
                        ${Locate[index].passStatus ? 'bg-gray-400 cursor-not-allowed' : Locate[index].status ? 'bg-red-500' : 'bg-white'}`}
                      onClick={() => handleClick(index)}
                      disabled={Locate[index].passStatus}
                    ></button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleTable;
