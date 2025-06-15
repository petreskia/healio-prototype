"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SimpleCalendarProps {
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;
  disabled?: (date: Date) => boolean;
  className?: string;
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
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

export function SimpleCalendar({
  selected,
  onSelect,
  disabled,
  className,
}: SimpleCalendarProps) {
  const [currentDate, setCurrentDate] = React.useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const firstDayWeekday = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleDateClick = (day: number) => {
    const date = new Date(year, month, day);
    if (disabled && disabled(date)) return;
    onSelect?.(date);
  };

  const isSelected = (day: number) => {
    if (!selected) return false;
    const date = new Date(year, month, day);
    return selected.toDateString() === date.toDateString();
  };

  const isToday = (day: number) => {
    const today = new Date();
    const date = new Date(year, month, day);
    return today.toDateString() === date.toDateString();
  };

  const isDisabled = (day: number) => {
    if (!disabled) return false;
    const date = new Date(year, month, day);
    return disabled(date);
  };

  // Generate calendar days
  const days = [];

  // Empty cells for days before the first day of the month
  for (let i = 0; i < firstDayWeekday; i++) {
    days.push(<div key={`empty-${i}`} className="h-9 w-9" />);
  }

  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(
      <Button
        key={day}
        variant={isSelected(day) ? "default" : "ghost"}
        size="sm"
        className={cn(
          "h-9 w-9 p-0 font-normal",
          isToday(day) &&
            !isSelected(day) &&
            "bg-accent text-accent-foreground",
          isSelected(day) &&
            "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
          isDisabled(day) &&
            "text-muted-foreground opacity-50 cursor-not-allowed"
        )}
        onClick={() => handleDateClick(day)}
        disabled={isDisabled(day)}
      >
        {day}
      </Button>
    );
  }

  return (
    <div className={cn("p-3", className)}>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <Button variant="outline" size="sm" onClick={previousMonth}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-sm font-medium">
          {MONTHS[month]} {year}
        </h2>
        <Button variant="outline" size="sm" onClick={nextMonth}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Days of week header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAYS.map((day) => (
          <div
            key={day}
            className="h-9 w-9 flex items-center justify-center text-sm font-medium text-muted-foreground"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">{days}</div>
    </div>
  );
}
