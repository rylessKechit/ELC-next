// components/booking/DateTimePicker.jsx
"use client"

import { useEffect } from 'react'
import { formatDate, formatTime } from '@/lib/formatter'

const DateTimePicker = ({ 
  dateId, 
  timeId, 
  dateValue, 
  timeValue, 
  onDateChange, 
  onTimeChange,
  minDate 
}) => {
  useEffect(() => {
    // Set default date to tomorrow if not set
    if (!dateValue) {
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      const formattedDate = formatDate(tomorrow)
      onDateChange(formattedDate)
    }
    
    // Set default time to current time + 1 hour if not set
    if (!timeValue) {
      const defaultTime = new Date()
      defaultTime.setHours(defaultTime.getHours() + 1)
      const formattedTime = formatTime(defaultTime)
      onTimeChange(formattedTime)
    }
  }, [dateValue, timeValue, onDateChange, onTimeChange])

  // Get minimum date (today or provided minDate)
  const today = new Date()
  const minimumDate = minDate || formatDate(today)
  
  // Get minimum time (current time if date is today)
  const isToday = dateValue === formatDate(today)
  const now = new Date()
  const minimumTime = isToday ? formatTime(now) : '00:00'

  return (
    <div className="flex gap-3">
      <div className="flex-1">
        <input
          type="date"
          id={dateId}
          value={dateValue}
          min={minimumDate}
          onChange={(e) => onDateChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
          required
        />
      </div>
      <div className="flex-1">
        <input
          type="time"
          id={timeId}
          value={timeValue}
          min={isToday ? minimumTime : undefined}
          onChange={(e) => onTimeChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
          required
        />
      </div>
    </div>
  )
}

export default DateTimePicker