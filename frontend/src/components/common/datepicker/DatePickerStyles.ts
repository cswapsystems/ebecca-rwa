import styled from "styled-components";
import { CalendarContainer as CalendarContainerBase } from "react-datepicker";

import Typography from "../typography/Typography";
import { Flex } from "@/components/primitives";

import { breakpoints } from "@/constants";

export const DatePickerTitle = styled(Typography.Span)`
  font-size: 14px;
  line-height: 20px;

  @media only screen and (min-width: ${breakpoints.s + 1}px) {
    font-size: 16px;
    line-height: 22px;
  }
`;

export const DatePickerInputButton = styled.button`
  width: 100%;
  border-radius: 12px;
  border: ${({ theme }) => `1px solid ${theme.colors.base200}`};
  padding: 8px 12px;
  background-color: transparent;
  cursor: pointer;
`;

export const DatePickerCalendarCard = styled(CalendarContainerBase)`
  display: flex;
  flex-direction: column;
  margin-top: 8px;
  border-radius: 12px;
  border: 1px solid #eaebf0;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0 14px 40px rgba(15, 23, 42, 0.12);
  padding: 16px 18px 14px;
  width: 343px;

  .react-datepicker {
    border: none;
    background: transparent;
    font-family: var(--inter), sans-serif;
  }

  .react-datepicker__month-container {
    width: 100%;
  }

  .react-datepicker__header {
    background: transparent;
    border-bottom: none;
    padding-top: 0;
  }

  .react-datepicker__day-names {
    margin-top: 8px;
  }

  .react-datepicker__day-name {
    width: 2rem;
    color: #d1d5db;
    font-size: 11px;
  }

  .react-datepicker__day {
    width: 2rem;
    line-height: 2.5rem;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.base950};
    font-weight: 600 !important;
  }

  .react-datepicker__day--outside-month {
    opacity: 0.2;
  }

  .react-datepicker__day--selected,
  .react-datepicker__day--keyboard-selected {
    background-color: #e0ecff;
    color: #2563eb;
    border-radius: 8px;
  }

  .react-datepicker__day:hover {
    border-radius: 8px;
    background-color: #eff6ff;
  }
`;

export const CalendarFooterWrapper = styled(Flex.Row)`
  margin-top: 10px;
`;

export const CalendarArrowButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
`;
