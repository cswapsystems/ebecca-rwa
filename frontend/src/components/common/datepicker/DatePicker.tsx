"use client";

import type { FC, JSX, ButtonHTMLAttributes } from "react";
import { useState, useCallback, useRef } from "react";
import Image from "next/image";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Flex } from "@/components/primitives";
import { Button } from "@/components/common";
import Typography from "../typography/Typography";
import {
  DatePickerTitle,
  DatePickerInputButton,
  DatePickerCalendarCard,
  CalendarFooterWrapper,
  CalendarArrowButton,
} from "./DatePickerStyles";

export interface DatePickerProps {
  title: string;
  selectedDate?: Date | null;
  onDateChange?: (date: Date | null) => void;
}

interface DatePickerCustomInputProps extends Pick<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  value?: string;
}

const DatePickerCustomInput: FC<DatePickerCustomInputProps> = ({ value, onClick }): JSX.Element => (
  <DatePickerInputButton type="button" onClick={onClick}>
    <Flex.Row alignItems="center" justifyContent="space-between" width="100%">
      <Typography.Span
        weight={400}
        size="16px"
        lineHeight={22}
        color={(theme) => (!value ? theme.colors.base500 : theme.colors.base950)}
      >
        {value || "Select date"}
      </Typography.Span>
      <Image src="/icons/calendar.svg" alt="Calendar" width={21} height={21} unoptimized />
    </Flex.Row>
  </DatePickerInputButton>
);

const DatePicker: FC<DatePickerProps> = ({ title, selectedDate, onDateChange }): JSX.Element => {
  const [selectedDateState, setSelectedDateState] = useState<Date | null>(selectedDate ?? null);
  const datePickerRef = useRef<ReactDatePicker | null>(null);

  const handleDateChange = useCallback((date: Date | null): void => {
    setSelectedDateState(date);
  }, []);

  return (
    <Flex.Column rowGap="8px">
      <DatePickerTitle weight={500} texttransform="capitalize" color={(theme) => theme.colors.base300}>
        {title}
      </DatePickerTitle>

      <ReactDatePicker
        ref={datePickerRef}
        selected={selectedDateState}
        customInput={<DatePickerCustomInput />}
        calendarContainer={(props): JSX.Element => (
          <DatePickerCalendarCard {...props}>
            {props.children}
            <CalendarFooterWrapper alignItems="center" width="100%" columnGap="10px">
              <Button
                variant="secondary"
                fontSize="16px"
                onClick={() => {
                  setSelectedDateState(null);
                  datePickerRef.current?.setOpen(false);
                }}
                width="100%"
              >
                Close
              </Button>
              <Button
                variant="primary"
                fontSize="16px"
                onClick={() => {
                  if (selectedDateState) {
                    onDateChange?.(selectedDateState);
                  }
                  datePickerRef.current?.setOpen(false);
                }}
                width="100%"
              >
                Continue
              </Button>
            </CalendarFooterWrapper>
          </DatePickerCalendarCard>
        )}
        renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
          <Flex.Column rowGap="10px">
            <Flex.Row alignItems="center" justifyContent="space-between" width="100%">
              <CalendarArrowButton type="button" onClick={decreaseMonth} aria-label="Previous Month">
                <Image src="/icons/chevron-left.svg" alt="Arrow Left" width={4.65} height={10} />
              </CalendarArrowButton>
              <Typography.H3 weight={600} size="14px" lineHeight={20} color={(theme) => theme.colors.base950}>
                {date.toLocaleString("default", {
                  month: "long",
                  year: "numeric",
                })}
              </Typography.H3>
              <CalendarArrowButton type="button" onClick={increaseMonth} aria-label="Next Month">
                <Image src="/icons/chevron-right.svg" alt="Arrow Left" width={4.65} height={10} />
              </CalendarArrowButton>
            </Flex.Row>
          </Flex.Column>
        )}
        onChange={handleDateChange}
        dayClassName={() => {
          return "react-datepicker__day";
        }}
        popperPlacement="bottom-start"
        showPopperArrow={false}
        shouldCloseOnSelect={false}
      />
    </Flex.Column>
  );
};

export default DatePicker;
