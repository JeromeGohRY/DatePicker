import { useState, useRef, useEffect } from "react";
import dayjs from "dayjs";

const DatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const datePickerRef = useRef(null);

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const startOfMonth = currentMonth.startOf("month").day();
  const daysInMonth = currentMonth.daysInMonth();
  const daysArray = Array.from({ length: daysInMonth }, (_, index) => index + 1);

  const handlePrevMonth = () => setCurrentMonth(currentMonth.subtract(1, "month"));
  const handleNextMonth = () => setCurrentMonth(currentMonth.add(1, "month"));
  const handleDateSelect = (day) => {
    const newDate = currentMonth.date(day);
    setSelectedDate(newDate);
    setIsOpen(false);
  };

  const handleDocumentClick = (e) => {
    if (datePickerRef.current && !datePickerRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        top: "10px",
        right: "10px",
        zIndex: 1000,
      }}
      ref={datePickerRef}
    >
      {/* Input to display the selected date */}
      <input
        type="text"
        readOnly
        value={selectedDate.format("D MMMM YYYY")} // Formatted date
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        style={{
          padding: "8px",
          fontSize: "14px",
          cursor: "pointer",
          width: "150px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />

      {/* Dropdown Calendar */}
      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "40px",
            right: "0",
            background: "white",
            border: "1px solid #ccc",
            borderRadius: "4px",
            boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
            zIndex: 1000,
            width: "280px",
            padding: "16px",
          }}
        >
          {/* Month Navigation */}
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <button onClick={handlePrevMonth}>&lt;</button>
            <span>{currentMonth.format("MMMM YYYY")}</span>
            <button onClick={handleNextMonth}>&gt;</button>
          </div>

          {/* Days of Week Header */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", textAlign: "center" }}>
            {daysOfWeek.map((day) => (
              <div key={day} style={{ fontWeight: "bold", padding: "4px 0" }}>
                {day}
              </div>
            ))}
          </div>

          {/* Days of the Month */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", textAlign: "center" }}>
            {/* Empty cells for days before the start of the month */}
            {Array.from({ length: startOfMonth }, (_, index) => (
              <div key={index}></div>
            ))}

            {/* Days of the month */}
            {daysArray.map((day) => (
              <div
                key={day}
                onClick={() => handleDateSelect(day)}
                style={{
                  padding: "8px 0",
                  cursor: "pointer",
                  background:
                    selectedDate.date() === day &&
                    selectedDate.month() === currentMonth.month() &&
                    selectedDate.year() === currentMonth.year()
                      ? "#007BFF"
                      : "transparent",
                  color:
                    selectedDate.date() === day &&
                    selectedDate.month() === currentMonth.month() &&
                    selectedDate.year() === currentMonth.year()
                      ? "white"
                      : "black",
                  borderRadius: "50%",
                  transition: "background 0.3s",
                }}
              >
                {day}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
