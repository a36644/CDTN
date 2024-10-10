import { useState, useEffect } from "react";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import Select from "react-select";
import { fetchData, postData } from "../../../lib/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddCourseSemesterGroup = () => {
  const [selectedPeriods, setSelectedPeriods] = useState({}); // Store selected periods by day
  const [classTime, setClassTime] = useState([]); // Display class time range
  const [currentStep, setCurrentStep] = useState(1); // Track the current form step
  const [selectedClassroom, setSelectedClassroom] = useState(null); // Store selected classroom
  const [teachers, setTeachers] = useState([]); // List of teachers
  const [selectedTeacher, setSelectedTeacher] = useState(null); // Store selected teacher
  const [scheduleList, setScheduleList] = useState([]); // List to hold the scheduled classes
  const [selectedSemester, setSelectedSemester] = useState();
  const [semester, setSemester] = useState([]);
  const [courseOfSemester, setCourseOfSemester] = useState([]);
  const [selectedCourseOfSemester, setSelectedCourseOfSemester] = useState([]);
  const [disabledSlots, setDisabledSlots] = useState([]);
  const [classRoom, setClassRoom] = useState([]);

  const navigate = useNavigate();

  function isRoomDisabled(room, selectedSlot) {
    // selectedSlot là ca học người dùng chọn với start và finish
    const { start: selectedStart, finish: selectedFinish } = selectedSlot;

    // Duyệt qua các lớp học trong phòng để kiểm tra sự trùng lặp
    for (const lop of room.lopList) {
      const { start: lopStart, finish: lopFinish } = lop;

      // Kiểm tra xem ca học có trùng hoặc giao với khoảng thời gian được chọn hay không
      if (selectedStart <= lopFinish && selectedFinish >= lopStart) {
        return true; // Phòng này cần disable
      }
    }

    // Nếu không có ca học nào trùng
    return false;
  }

  // Filter teachers based on selected classTime
  const filterTeachersByAvailability = () => {
    if (classTime.length === 0) return teachers; // If no classTime is selected, show all teachers

    const selectedStart = classTime[0].start;
    const selectedFinish = classTime[0].finish;

    return teachers.filter((teacher) => {
      return teacher.teachingScheduleList.every((schedule) => {
        return (
          selectedFinish < schedule.start || selectedStart > schedule.finish
        );
      });
    });
  };

  useEffect(() => {
    fetchData("admin/SemesterGroup/getAllSemesterGroup")
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
      fetchData(`admin/getTeacherBySemester?semester=${selectedSemester}`)
        .then(setTeachers)
        .catch((e) => {
          console.error(e);
          toast.error(e.response.data);
        });

      fetchData(`admin/Room/getAllRoom?id=${selectedSemester}`)
        .then(setClassRoom)
        .catch((e) => {
          console.error(e);
          toast.error(e.response.data);
        });
      fetchData(
        `admin/CourseSemester/getAllCourseSemesterGroup?id=${selectedSemester}`
      )
        .then((result) => {
          setCourseOfSemester(
            result.map((item) => ({
              value: item.courseId,
              label: item.courseName,
            }))
          );
        })
        .catch((e) => {
          console.error(e);
          toast.error(e.response.data);
        });
    }
  }, [selectedSemester]);

  // Helper function to determine range of selected periods for a given day
  const getPeriodRange = (periods) => {
    const sortedPeriods = periods.sort((a, b) => a - b);
    const ranges = [];
    let start = sortedPeriods[0];

    for (let i = 1; i < sortedPeriods.length; i++) {
      if (sortedPeriods[i] !== sortedPeriods[i - 1] + 1) {
        ranges.push(`${start}-${sortedPeriods[i - 1]}`);
        start = sortedPeriods[i];
      }
    }
    ranges.push(`${start}-${sortedPeriods[sortedPeriods.length - 1]}`);
    return ranges.join(", ");
  };

  const handleAdd = () => {
    const transformData = {
      courseSemesterGroupId: selectedCourseOfSemester + "_" + selectedSemester,
      lichHocRequestList: scheduleList.map((item) => {
        return {
          teacher: item.teacher,
          roomId: item.classroom,
          start: item.start,
          finish: item.finish,
        };
      }),
    };

    postData("admin/ClassRoom/addClassroom", transformData)
      .then(() => {
        toast.success("Thêm mới thành công");
        setScheduleList([]);
        navigate("/admin/CourseSemesterGroupController");
      })
      .catch((e) => toast.error(e.response.data));
  };

  const isPeriodDisabled = (day, period) => {
    const start = (day - 2) * 10 + period; // Tính giá trị start
    return disabledSlots.some(
      (slot) => start >= slot.start && start <= slot.finish
    );
  };

  const updateSchedule = () => {
    if (selectedClassroom && selectedTeacher && classTime.length > 0) {
      const newSchedule = classTime.map((time) => ({
        time: time.text,
        start: time.start - 1,
        finish: time.finish - 1,
        classroom: selectedClassroom,
        teacher: selectedTeacher.personId,
      }));
      console.log("🚀 ~ newSchedule ~ newSchedule:", newSchedule)

      // Cập nhật các ca học đã chọn để disable trong lần chọn tiếp theo
      const newDisabledSlots = classTime.map((time) => ({
        start: time.start,
        finish: time.finish,
      }));
      setDisabledSlots((prev) => [...prev, ...newDisabledSlots]);

      setScheduleList((prev) => [...prev, ...newSchedule]);
      setSelectedPeriods({});
      setSelectedClassroom(null);
      setSelectedTeacher(null);
      setCurrentStep(1);
      setClassTime([]);
    }
  };


const togglePeriod = (day, period) => {
  setSelectedPeriods((prev) => {
    let updatedPeriods = { ...prev };

    // Nếu chọn ca trong ngày khác, bỏ chọn tất cả ca đã chọn trước đó
    if (!updatedPeriods[day]) {
      updatedPeriods = {}; // Reset nếu chưa có ca nào được chọn
    }

    const dayPeriods = updatedPeriods[day] || [];

    // Kiểm tra buổi sáng (1-5) và buổi chiều (6-10)
    const isMorningPeriod = period >= 1 && period <= 5;
    const isAfternoonPeriod = period >= 6 && period <= 10;

    // Nếu chưa có ca nào được chọn, ca này sẽ là ca bắt đầu
    if (dayPeriods.length === 0) {
      updatedPeriods[day] = [period];
    } else {
      // Nếu đã có 1 ca được chọn
      const firstSelectedPeriod = dayPeriods[0];
      const isSelectedMorning = firstSelectedPeriod >= 1 && firstSelectedPeriod <= 5;
      const isSelectedAfternoon = firstSelectedPeriod >= 6 && firstSelectedPeriod <= 10;

      // Nếu ca mới thuộc buổi khác, bỏ chọn ca đã chọn trước đó
      if ((isMorningPeriod && isSelectedAfternoon) || (isAfternoonPeriod && isSelectedMorning)) {
        updatedPeriods[day] = [period]; // Bỏ chọn ca trước, chỉ giữ ca mới
      } else if (dayPeriods.length === 1) {
        // Nếu đã có 1 ca được chọn, ca này sẽ là ca kết thúc
        const start = Math.min(dayPeriods[0], period);
        const end = Math.max(dayPeriods[0], period);
        updatedPeriods[day] = Array.from({ length: end - start + 1 }, (_, i) => start + i);
      } else {
        // Nếu đã chọn cả ca bắt đầu và kết thúc, reset lại để chọn mới
        updatedPeriods[day] = [period];
      }
    }

    return updatedPeriods;
  });
};





  // Update class time display based on selected periods
  useEffect(() => {
    const selectedDays = Object.keys(selectedPeriods);
    if (selectedDays.length > 0) {
      const classTimes = selectedDays.map((day) => {
        const start = (day - 2) * 10 + selectedPeriods[day][0];
        const finish =
          (day - 2) * 10 +
          selectedPeriods[day][selectedPeriods[day].length - 1];
        const periods = selectedPeriods[day];
        return {
          text: `Thứ ${day}: Ca ${getPeriodRange(periods)}`,
          start,
          finish,
        };
      });
      setClassTime(classTimes);
    } else {
      setClassTime([]); // No periods selected
    }
  }, [selectedPeriods]);

  // Function to select a classroom (Step 2)
  const selectClassroom = (room) => {
    if (room) {
      setSelectedClassroom(room.roomId);
    }
  };

  // Function to move to the next step
  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };

  // Function to update schedule list with selected details

  // Function to remove a scheduled class
  const removeSchedule = (scheduleToRemove) => {
    // Lọc bỏ ca học cần xóa khỏi danh sách lịch học
    const updatedScheduleList = scheduleList.filter(
      (schedule) =>
        schedule.start !== scheduleToRemove.start &&
        schedule.finish !== scheduleToRemove.finish
    );

    // Tính toán lại các ca đã được chọn (disableSlots) dựa trên danh sách mới
    const updatedDisabledSlots = updatedScheduleList.map((schedule) => ({
      start: schedule.start +1,
      finish: schedule.finish +1,
    }));

    // Cập nhật lại state
    setScheduleList(updatedScheduleList);
    setDisabledSlots(updatedDisabledSlots);
  };

  return (
    <div className="flex p-4 mt-16 h-[92vh] bg-gray-100">
      {/* Left Sidebar */}
      <div className="w-1/4 bg-white rounded-lg text-gray-800 shadow-xl relative">
        <div className="shadow-lg rounded-lg w-full pb-2">
          <h2 className="text-xl bg-red-800 rounded-t-lg py-3 text-white text-center font-bold mb-4">
            Thêm Mới Lớp
          </h2>
          <div className="px-2">
            <div className="mb-2">
              <label className="block mb-1 font-medium">Kỳ Học</label>
              <Select
                placeholder="Chọn kỳ học"
                options={semester}
                onChange={(e) => setSelectedSemester(e.value)}
                className="text-sm focus-visible:ring z-auto"
              />
            </div>
            <div className="mb-2">
              <label className="block mb-1 font-medium">Môn Học</label>
              <Select
                placeholder="Chọn môn học"
                options={courseOfSemester}
                onChange={(e) => setSelectedCourseOfSemester(e.value)}
                className="text-sm focus-visible:ring z-auto"
              />
            </div>
          </div>
        </div>
        <div className="">
          <p className="text-center font-medium py-2">Danh sách ca học</p>
          <ul className="pl-2">
            {scheduleList.length > 0 ? (
              scheduleList.map((schedule, index) => (
                <li key={index} className="text-gray-900 flex items-center">
                  {`${schedule.time} - ${schedule.classroom} - ${schedule.teacher}`}
                  <button
                    className="text-red-500 ml-4"
                    onClick={() => removeSchedule(schedule)}
                  >
                    <IoIosRemoveCircleOutline />
                  </button>
                </li>
              ))
            ) : (
              <li className="text-gray-500">Chưa có ca học nào được thêm.</li>
            )}
          </ul>
          <button
            className={
              scheduleList.length
                ? "px-4 py-2 border rounded-md bg-blue-500 text-white w-full absolute bottom-0 "
                : "px-4 py-2 border rounded-md bg-blue-300 text-white w-full cursor-not-allowed absolute bottom-0 "
            }
            disabled={!scheduleList.length}
            onClick={handleAdd}
          >
            Thêm mới
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-6 border ml-2 bg-white">
        {/* Stepper */}
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            <span
              className={`rounded-full w-8 h-8 flex justify-center items-center ${
                currentStep >= 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-black"
              }`}
            >
              1
            </span>
            <span className="ml-2 font-semibold">Chọn Ca Học</span>
          </div>
          <div className="mx-4 border-t-2 border-gray-300 flex-1"></div>
          <div className="flex items-center">
            <span
              className={`rounded-full w-8 h-8 flex justify-center items-center ${
                currentStep >= 2
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-black"
              }`}
            >
              2
            </span>
            <span className="ml-2">Chọn Phòng Học</span>
          </div>
          <div className="mx-4 border-t-2 border-gray-300 flex-1"></div>
          <div className="flex items-center">
            <span
              className={`rounded-full w-8 h-8 flex justify-center items-center ${
                currentStep >= 3
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-black"
              }`}
            >
              3
            </span>
            <span className="ml-2">Chọn Giáo Viên</span>
          </div>
        </div>

        {/* Selected Class Time and Classroom */}
        <div className="p-4 mb-4 rounded bg-slate-50">
          {classTime.length > 0 ? (
            classTime.map((time, index) => (
              <p
                key={index}
                className="text-gray-700 font-semibold text-center flex justify-between"
              >
                <span>{`Ca học: ${time.text}`}</span>
                <span>{`Phòng: ${selectedClassroom || "Chưa chọn"}`}</span>
                <span>{`Giáo viên: ${
                  selectedTeacher ? selectedTeacher.personId : "Chưa chọn"
                }`}</span>
              </p>
            ))
          ) : (
            <p className="text-gray-700 font-semibold flex justify-between">
              <span>Ca học: Chưa chọn</span>
              <span>{`Phòng: ${selectedClassroom || "Chưa chọn"}`}</span>
              <span>{`Giáo viên: ${
                selectedTeacher ? selectedTeacher.name : "Chưa chọn"
              }`}</span>
            </p> // Default message when no periods or classroom are selected
          )}
        </div>

        {/* Conditional rendering based on the current step */}
        {currentStep === 1 && (
          <div>
            {/* Timetable for Step 1 */}
            <table className="table-auto w-full text-center">
              <thead>
                <tr className="text-white bg-red-800 border ">
                  <th className="px-4 py-2 border w-20">Ca/Thứ</th>
                  <th className="px-4 py-2 border">Thứ 2</th>
                  <th className="px-4 py-2 border">Thứ 3</th>
                  <th className="px-4 py-2 border">Thứ 4</th>
                  <th className="px-4 py-2 border">Thứ 5</th>
                  <th className="px-4 py-2 border">Thứ 6</th>
                  <th className="px-4 py-2 border">Thứ 7</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(10).keys()].map((period) => (
                  <tr key={period}>
                    <td className="border px-4 py-2">{period + 1}</td>
                    {[...Array(6).keys()].map((day) => (
                      <td
                        key={day}
                        className={`border px-4 py-2 ${
                          isPeriodDisabled(day + 2, period + 1)
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : selectedPeriods[day + 2]?.includes(period + 1)
                            ? "bg-red-700 text-white"
                            : "hover:bg-red-200"
                        }`}
                        onClick={() => {
                          if (!isPeriodDisabled(day + 2, period + 1)) {
                            togglePeriod(day + 2, period + 1);
                          }
                        }}
                      >
                        {selectedPeriods[day + 2]?.includes(period + 1)
                          ? ""
                          : ""}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {currentStep === 2 && (
          <div className="grid grid-cols-9 gap-2">
            {classRoom.map((classroom) => (
              <button
                key={classroom.roomId}
                onClick={() => selectClassroom(classroom)}
                className={`py-2 px-4 text-center border rounded ${
                  selectedClassroom === classroom.roomId
                    ? "bg-blue-500 text-white"
                    : !isRoomDisabled(classroom, {
                        start: classTime[0]?.start,
                        finish: classTime[0]?.finish,
                      })
                    ? "bg-white text-gray-800 hover:bg-blue-100"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                disabled={isRoomDisabled(classroom, {
                  start: classTime[0]?.start,
                  finish: classTime[0]?.finish,
                })}
              >
                {classroom.roomId}
              </button>
            ))}
          </div>
        )}

        {currentStep === 3 && (
          <div className="p-4">
            <h3 className="font-semibold mb-2">Chọn Giáo Viên</h3>
            <div className="mb-4">
              <Select
                options={filterTeachersByAvailability().map((item) => {
                  return {
                    value: item.personId,
                    label: item.fullName,
                  };
                })}
                onChange={(selectedOption) => {
                  const selected = teachers.find(
                    (teacher) => teacher.personId === selectedOption.value
                  );
                  setSelectedTeacher(selected);
                }}
                placeholder="Chọn giáo viên"
              />
            </div>
            <div className="flex justify-between">
              <button
                className="bg-gray-400 text-white py-2 px-4 rounded mt-2 mr-2"
                onClick={prevStep}
              >
                Quay lại
              </button>
              <button
                className={`bg-green-500 text-white py-2 px-4 rounded mt-2 ${
                  !selectedTeacher ||
                  classTime.length === 0 ||
                  !selectedClassroom
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={
                  !selectedTeacher ||
                  classTime.length === 0 ||
                  !selectedClassroom
                }
                onClick={updateSchedule}
              >
                Cập Nhật
              </button>
            </div>
          </div>
        )}
        {currentStep < 3 && (
          <div className="flex justify-between mt-3">
            <button
              onClick={prevStep}
              className={`bg-gray-400 text-white py-2 px-4 rounded mr-2 ${
                currentStep === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={currentStep === 1}
            >
              Quay lại
            </button>
            <button
              onClick={nextStep}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Tiếp tục
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddCourseSemesterGroup;
