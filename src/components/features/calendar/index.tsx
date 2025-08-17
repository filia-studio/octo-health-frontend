"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Event {
  id: string;
  date: any;
  fullDate?: any;
  time: string;
  title: string;
}

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 7, 17)); // Updated to August 2025 to match current date
  const [viewMode, setViewMode] = useState<"Month" | "Week" | "Day" | "List">(
    "Month"
  );

  // Sample events matching the image
  const events: Event[] = [
    { id: "1", date: "2025-08-17", time: "10 AM", title: "Consultation" },
    { id: "2", date: "2025-08-19", time: "2 PM", title: "Compliance Check" },
    { id: "3", date: "2025-08-22", time: "4 PM", title: "Lab Consultation" },
    { id: "4", date: "2025-08-25", time: "11 AM", title: "Team Meeting" },
  ];

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getCurrentWeekDates = () => {
    const today = new Date(currentDate);
    const currentDay = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - currentDay);

    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      weekDates.push(date);
    }
    return weekDates;
  };

  const getEventsForDate = (date: Date) => {
    const dateString = date.toISOString().split("T")[0]; // Convert to YYYY-MM-DD format
    return events.filter((event) => event.date === dateString);
  };

  const timeSlots = [
    "12 AM",
    "1 AM",
    "2 AM",
    "3 AM",
    "4 AM",
    "5 AM",
    "6 AM",
    "7 AM",
    "8 AM",
    "9 AM",
    "10 AM",
    "11 AM",
    "12 PM",
    "1 PM",
    "2 PM",
    "3 PM",
    "4 PM",
    "5 PM",
    "6 PM",
    "7 PM",
    "8 PM",
    "9 PM",
    "10 PM",
    "11 PM",
  ];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getPreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const getNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const getPreviousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const getNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const getPreviousDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 1);
    setCurrentDate(newDate);
  };

  const getNextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 1);
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const handlePrevious = () => {
    if (viewMode === "Month") getPreviousMonth();
    else if (viewMode === "Week") getPreviousWeek();
    else if (viewMode === "Day") getPreviousDay();
    else getPreviousMonth(); // List view uses month navigation
  };

  const handleNext = () => {
    if (viewMode === "Month") getNextMonth();
    else if (viewMode === "Week") getNextWeek();
    else if (viewMode === "Day") getNextDay();
    else getNextMonth(); // List view uses month navigation
  };

  const getDisplayTitle = () => {
    if (viewMode === "Day") {
      return currentDate.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } else if (viewMode === "Week") {
      const weekDates = getCurrentWeekDates();
      const startDate = weekDates[0].toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      const endDate = weekDates[6].toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      return `${startDate} - ${endDate}`;
    }
    return `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const daysInPrevMonth = getDaysInMonth(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );

    const days = [];

    // Previous month's trailing days
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push(
        <div
          key={`prev-${daysInPrevMonth - i}`}
          className="h-24 p-2 text-gray-400 text-sm"
        >
          {daysInPrevMonth - i}
        </div>
      );
    }

    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDayDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );
      const dayEvents = getEventsForDate(currentDayDate);

      days.push(
        <div
          key={day}
          className="h-24 p-2 border-r border-b border-gray-200 bg-white"
        >
          <div className="text-sm font-medium text-gray-900 mb-1">{day}</div>
          {dayEvents.map((event) => (
            <div
              key={event.id}
              className="text-xs text-red-600 flex items-center"
            >
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-1"></div>
              <span className="truncate">
                {event.time} {event.title}
              </span>
            </div>
          ))}
        </div>
      );
    }

    // Next month's leading days
    const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;
    const remainingCells = totalCells - (firstDay + daysInMonth);

    for (let day = 1; day <= remainingCells; day++) {
      days.push(
        <div key={`next-${day}`} className="h-24 p-2 text-gray-400 text-sm">
          {day}
        </div>
      );
    }

    return days;
  };

  const renderWeekRows = () => {
    const days = renderCalendarDays();
    const weeks = [];

    for (let i = 0; i < days.length; i += 7) {
      const weekDays = days.slice(i, i + 7);
      const isAlternateWeek = Math.floor(i / 7) % 2 === 1;

      weeks.push(
        <div
          key={i}
          className={`grid grid-cols-7 ${
            isAlternateWeek ? "bg-gray-50" : "bg-white"
          }`}
        >
          {weekDays}
        </div>
      );
    }

    return weeks;
  };

  const renderWeekView = () => {
    const weekDates = getCurrentWeekDates();

    return (
      <div className="flex flex-col">
        {/* Week header */}
        <div className="grid grid-cols-8 bg-gray-50 border-b border-gray-200">
          <div className="p-3 text-center text-sm font-medium text-gray-700 border-r border-gray-200">
            Time
          </div>
          {weekDates.map((date, index) => (
            <div
              key={index}
              className="p-3 text-center text-sm font-medium text-gray-700 border-r border-gray-200 last:border-r-0"
            >
              <div>{dayNames[date.getDay()]}</div>
              <div className="text-lg font-semibold">{date.getDate()}</div>
            </div>
          ))}
        </div>

        {/* Time slots */}
        <div className="max-h-96 overflow-y-auto">
          {timeSlots.map((time, timeIndex) => (
            <div
              key={timeIndex}
              className="grid grid-cols-8 border-b border-gray-100"
            >
              <div className="p-2 text-xs text-gray-500 border-r border-gray-200 bg-gray-50">
                {time}
              </div>
              {weekDates.map((date, dateIndex) => {
                const dayEvents = getEventsForDate(date);
                const timeEvents = dayEvents.filter((event) => {
                  const eventHour = Number.parseInt(event.time);
                  const slotHour = timeIndex % 12 === 0 ? 12 : timeIndex % 12;
                  return eventHour === slotHour;
                });

                return (
                  <div
                    key={dateIndex}
                    className="p-2 h-12 border-r border-gray-200 last:border-r-0 relative"
                  >
                    {timeEvents.map((event) => (
                      <div
                        key={event.id}
                        className="text-xs text-red-600 flex items-center"
                      >
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-1"></div>
                        <span className="truncate">{event.title}</span>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderDayView = () => {
    const dayEvents = getEventsForDate(currentDate);

    return (
      <div className="flex flex-col">
        {/* Day header */}
        <div className="grid grid-cols-2 bg-gray-50 border-b border-gray-200">
          <div className="p-3 text-center text-sm font-medium text-gray-700 border-r border-gray-200">
            Time
          </div>
          <div className="p-3 text-center text-sm font-medium text-gray-700">
            <div>{dayNames[currentDate.getDay()]}</div>
            <div className="text-lg font-semibold">{currentDate.getDate()}</div>
          </div>
        </div>

        {/* Time slots */}
        <div className="max-h-96 overflow-y-auto">
          {timeSlots.map((time, timeIndex) => {
            const timeEvents = dayEvents.filter((event) => {
              const eventHour = Number.parseInt(event.time);
              const slotHour = timeIndex % 12 === 0 ? 12 : timeIndex % 12;
              return eventHour === slotHour;
            });

            return (
              <div
                key={timeIndex}
                className="grid grid-cols-2 border-b border-gray-100"
              >
                <div className="p-3 text-xs text-gray-500 border-r border-gray-200 bg-gray-50">
                  {time}
                </div>
                <div className="p-3 h-16 relative">
                  {timeEvents.map((event) => (
                    <div
                      key={event.id}
                      className="text-sm text-red-600 flex items-center mb-1"
                    >
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                      <span>{event.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderListView = () => {
    const allEvents = events?.filter(
      (event) =>
        new Date(event?.date).getFullYear() === currentDate.getFullYear() &&
        new Date(event?.date).getMonth() === currentDate.getMonth()
    );

    allEvents.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    // const allEvents = [];

    // // Collect all events for the month
    // for (let day = 1; day <= daysInMonth; day++) {
    //   const currentDayDate = new Date(
    //     currentDate.getFullYear(),
    //     currentDate.getMonth(),
    //     day
    //   );
    //   const dayEvents = getEventsForDate(currentDayDate);
    //   dayEvents.forEach((event) => {
    //     allEvents.push({
    //       ...event,
    //       fullDate: new Date(event.date), // Parse the date string into a Date object
    //     });
    //   });
    // }

    // // Sort events by date
    // allEvents.sort((a, b) => a.fullDate.getTime() - b.fullDate.getTime());

    return (
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Events for {monthNames[currentDate.getMonth()]}{" "}
          {currentDate.getFullYear()}
        </h3>
        {allEvents.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No events scheduled for this month.
          </p>
        ) : (
          <div className="space-y-3">
            {allEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{event.title}</div>
                  <div className="text-sm text-gray-600">
                    {new Date(event?.date)?.toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}{" "}
                    at {event.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderCalendarContent = () => {
    switch (viewMode) {
      case "Week":
        return renderWeekView();
      case "Day":
        return renderDayView();
      case "List":
        return renderListView();
      default:
        return (
          <div className="overflow-hidden">
            {/* Day Headers */}
            <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
              {dayNames.map((day) => (
                <div
                  key={day}
                  className="p-3 text-center text-sm font-medium text-gray-700 border-r border-gray-200 last:border-r-0"
                >
                  {day}
                </div>
              ))}
            </div>
            {/* Calendar Days */}
            <div className="border-l border-gray-200">{renderWeekRows()}</div>
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrevious}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={goToToday}
            className="px-3 py-1.5 bg-gray-800 text-white text-sm rounded-md hover:bg-gray-700 transition-colors"
          >
            Today
          </button>
        </div>

        <h1 className="text-xl font-semibold text-gray-900">
          {getDisplayTitle()}
        </h1>

        <div className="flex bg-gray-800 rounded-md overflow-hidden">
          {(["Month", "Week", "Day", "List"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-3 py-1.5 text-sm transition-colors ${
                viewMode === mode
                  ? "bg-gray-600 text-white"
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Calendar Content */}
      {renderCalendarContent()}
    </div>
  );
};

export default Calendar;
