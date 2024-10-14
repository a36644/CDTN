import { useEffect, useState } from "react";
import { FcInfo } from "react-icons/fc";
import { toast } from "react-toastify";
import { deleteData, fetchData } from "../../lib/api";

const transformData = (subjectName, data) => {
  const transformedData = {};

  data.forEach((classRoom) => {
    const className = classRoom.classRoomId;
    const schedules = classRoom.lichHocList.map((schedule) => ({
      start: schedule.start,
      end: schedule.finish,
      gv: schedule.teacher.fullName,
      room: schedule.roomId,
    }));

    const key = `${subjectName}-${className}`;

    transformedData[key] = {
      className,
      schedules,
    };
  });

  return transformedData;
};

const Dkh = () => {
  const [selected, setSelected] = useState({});
  const [openSubject, setOpenSubject] = useState(null);
  const [classRoom, setClassRoom] = useState([]);
  const [subjectsData, setSubjectsData] = useState();
  const [isRefresh, setIsRefresh] = useState(false);

  useEffect(() => {
    fetchData("student/register")
      .then((res) => setClassRoom(res))
      .catch((e) => toast.error(e.response.data));
  }, []);

  useEffect(() => {
    fetchData("student/register/getRegister")
      .then((res) => {
        setSelected(transformData("", res));
      })
      .catch((e) => e);
  }, [isRefresh]);

  useEffect(() => {
    if (classRoom) {
      const output = classRoom
        .filter((item) => item.classRoomDtos?.length > 0)
        .reduce((result, course) => {
          const classRooms = course.classRoomDtos.map((classRoom) => ({
            name: classRoom.classRoomId,
            currentSlot: classRoom.currentSlot,
            maxSlot: classRoom.maxSlot,
            schedules: classRoom.lichHocList.map((lichHoc) => ({
              start: lichHoc.start,
              end: lichHoc.finish,
            })),
          }));

          result[course.courseName] = { classes: classRooms };
          return result;
        }, {});

      setSubjectsData(output);
    }
  }, [classRoom]);

  const handleClassSelect = (subject, className, schedules) => {
    const newSelected = { ...selected };
    const key = `-${className}`;


    if (newSelected[key]) {
      deleteData(`student/register/remove?id=${className}`)
        .then(() => {
          delete newSelected[key];
          setSelected(newSelected);

          const updatedSubjectsData = { ...subjectsData };

          setSubjectsData(updatedSubjectsData);
          setIsRefresh(!isRefresh);
          toast.success("Đã hủy đăng ký lớp học thành công");
          fetchData("student/register")
            .then((res) => {
              setClassRoom(res);
              const output = res
                .filter((item) => item.classRoomDtos?.length > 0)
                .reduce((result, course) => {
                  const classRooms = course.classRoomDtos.map((classRoom) => ({
                    name: classRoom.classRoomId,
                    currentSlot: classRoom.currentSlot,
                    maxSlot: classRoom.maxSlot,
                    schedules: classRoom.lichHocList.map((lichHoc) => ({
                      start: lichHoc.start,
                      end: lichHoc.finish,
                    })),
                  }));
                  result[course.courseName] = { classes: classRooms };
                  return result;
                }, {});
              setSubjectsData(output);
            })
            .catch((e) => toast.error(e.response.data));
        })
        .catch((e) => {
          toast.error(e.response?.data || "Hủy đăng ký thất bại");
        });
    } else {
      Object.keys(newSelected).forEach((selectedKey) => {
        if (selectedKey.startsWith(`${subject}-`)) {
          delete newSelected[selectedKey];
        }
      });
      // Thêm lớp mới
      newSelected[key] = { className, schedules };
      fetchData(`student/register/add?id=${className}`)
        .then(() => {
          setSelected(newSelected);

          const updatedSubjectsData = { ...subjectsData };
          setSubjectsData(updatedSubjectsData);
          setIsRefresh(!isRefresh);
          toast.success("Đăng ký lớp học thành công");
          fetchData("student/register")
            .then((res) => {
              setClassRoom(res);
              const output = res
                .filter((item) => item.classRoomDtos?.length > 0)
                .reduce((result, course) => {
                  const classRooms = course.classRoomDtos.map((classRoom) => ({
                    name: classRoom.classRoomId,
                    currentSlot: classRoom.currentSlot,
                    maxSlot: classRoom.maxSlot,
                    schedules: classRoom.lichHocList.map((lichHoc) => ({
                      start: lichHoc.start,
                      end: lichHoc.finish,
                    })),
                  }));
                  result[course.courseName] = { classes: classRooms };
                  return result;
                }, {});
              setSubjectsData(output);
            })
            .catch((e) => toast.error(e.response.data));
        })
        .catch((e) => {
          toast.error(e.response?.data || "Đăng ký thất bại");
        });
    }
  };

  const toggleSubject = (subject) => {
    setOpenSubject((prev) => (prev === subject ? null : subject));
  };

  const createTimetable = () => {
    const timetable = Array.from({ length: 10 }, () => Array(7).fill(null));
    Object.entries(selected).forEach(([key, { className, schedules }]) => {
      schedules.forEach(({ start, end, gv, room }) => {
        for (let period = start; period <= end; period++) {
          const periodIndex = period % 10;
          const dayIndex = Math.floor(period / 10);
          timetable[periodIndex][dayIndex] = {
            subject: key.split("-")[0],
            class: className,
            gv,
            room,
          };
        }
      });
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
                return null;
              }

              let rowSpan = 1;
              for (let i = periodIndex + 1; i < 10; i++) {
                if (
                  timetable[i][dayIndex] &&
                  timetable[i][dayIndex].class === cell?.class &&
                  timetable[i][dayIndex].subject === cell?.subject
                ) {
                  rowSpan++;
                } else {
                  break;
                }
              }

              if (rowSpan > 1) {
                rowSpanTracker[dayIndex] = rowSpan - 1;
              }

              return (
                <td
                  key={dayIndex}
                  className="border border-gray-300 p-2 max-w-4 "
                  rowSpan={rowSpan}
                >
                  <div className="flex flex-col">
                    <span>{cell ? `${cell.class} ${cell.subject}` : ""}</span>
                    <span>{cell ? cell.gv : ""}</span>
                    <span>{cell ? cell.room : ""}</span>
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
    <div className="w-full bg-gray-100 p-6 overflow-auto mt-16 h-[90vh] ">
      <div className="flex items-center ">
        <FcInfo className="w-[33px] h-[33px]" />
        <h1 className="text-[1.4993rem] pl-[8px] font-bold text-red-700 uppercase">
          Đăng ký học
        </h1>
      </div>
      <hr className="mb-3"></hr>
      <div className="p-4 bg-white shadow-sm border">
        <h3 className="p-5 text-center text-xl font-bold">Danh sách môn</h3>
        <div className="flex flex-wrap bg-gray-50 p-2 shadow-lg">
          {Object.keys(subjectsData || {}).map((subject) => (
            <div key={subject} className="relative group mx-8">
              <button
                onClick={() => toggleSubject(subject)}
                className="text-blue-600 hover:font-bold"
              >
                {subject}
              </button>
            </div>
          ))}
        </div>
        <div className="mt-4 min-h-40 bg-gray-50 p-2 shadow-lg">
          <h3 className="font-bold">Lớp học:</h3>
          {openSubject && (
            <ul className="">
              {Object.entries(
                subjectsData[openSubject].classes.reduce((acc, curr) => {
                  const key = curr.name;
                  if (!acc[key]) {
                    acc[key] = curr;
                  } else {
                    acc[key].schedules = [
                      ...new Set([
                        ...acc[key].schedules,
                        ...curr.schedules.map(JSON.stringify),
                      ]),
                    ].map(JSON.parse);
                  }
                  return acc;
                }, {})
                // eslint-disable-next-line no-unused-vars
              ).map(([name, { schedules, currentSlot, maxSlot }]) => (
                <li key={name} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={
                      selected[`${openSubject}-${name}`]?.className === name ||
                      selected[`-${name}`]?.className === name
                    }
                    onChange={() =>
                      handleClassSelect(openSubject, name, schedules)
                    }
                    className="mr-2"
                  />
                  <span
                    onClick={() =>
                      handleClassSelect(openSubject, name, schedules)
                    }
                    className="cursor-pointer rounded p-2 mr-2 hover:text-blue-700"
                  >
                    {`${name} (${schedules
                      .map(
                        (s) =>
                          `Thứ ${Math.floor((s.start + 20) / 10)}: ${
                            (s.start + 1) % 10
                          }-${(s.end + 1) % 10}`
                      )
                      .join(" | ")})`}
                  </span>
                  <span className="text-gray-500 ml-2">{`Slots: ${currentSlot}/${maxSlot}`}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="mt-4">
          <h3 className="font-bold mb-2">Thời khóa biểu:</h3>
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
    </div>
  );
};

export default Dkh;
