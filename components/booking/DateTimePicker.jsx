"use client";

import { useEffect } from 'react';

const DateTimePicker = ({ 
  dateId, 
  timeId, 
  dateValue, 
  timeValue, 
  onDateChange, 
  onTimeChange,
  minDate,
  dateLabelText = "Date",
  timeLabelText = "Heure"
}) => {
  useEffect(() => {
    // Set default date to today if not set
    if (!dateValue) {
      const today = new Date();
      const formattedDate = formatDate(today);
      onDateChange(formattedDate);
    }
    
    // Set default time to current time + 1 hour if not set
    if (!timeValue) {
      const defaultTime = new Date();
      defaultTime.setHours(defaultTime.getHours() + 1);
      const formattedTime = formatTime(defaultTime);
      onTimeChange(formattedTime);
    }
  }, [dateValue, timeValue, onDateChange, onTimeChange]);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };
  
  // Get minimum date (today)
  const today = new Date();
  const defaultMinDate = formatDate(today);
  
  // Get minimum time (current time if date is today)
  const isToday = dateValue === defaultMinDate;
  const now = new Date();
  const minTime = isToday ? formatTime(now) : '00:00';

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <label htmlFor={dateId} className="block text-sm font-medium text-gray-700 mb-2">
          {dateLabelText} <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <i className="fas fa-calendar-alt text-gray-400"></i>
          </span>
          <input
            type="date"
            id={dateId}
            value={dateValue}
            min={minDate || defaultMinDate}
            onChange={(e) => onDateChange(e.target.value)}
            className="w-full pl-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
            required
            aria-describedby={`${dateId}-description`}
          />
        </div>
      </div>
      
      <div className="relative flex-1">
        <label htmlFor={timeId} className="block text-sm font-medium text-gray-700 mb-2">
          {timeLabelText} <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <i className="fas fa-clock text-gray-400"></i>
          </span>
          <input
            type="time"
            id={timeId}
            value={timeValue}
            min={isToday ? minTime : undefined}
            onChange={(e) => onTimeChange(e.target.value)}
            className="w-full pl-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
            required
            aria-describedby={`${timeId}-description`}
          />
        </div>
      </div>
    </div>
  );
};

export default DateTimePicker;