import { css } from "@emotion/react"
import { View } from "react-big-calendar"
import { getColor, getSpecialThemeColor } from "@illa-design/react"

const applyCalendarFont = css`
  font-family: "Inter";
  font-style: normal;
  font-size: 14px;
  font-weight: 400;
`

export const applyEventStyle = css`
  line-height: 14px;
  ${applyCalendarFont};
  display: flex;
  flex-direction: column;
  gap: 4px;
  & p {
    padding: 0;
    margin: 0;
    font-weight: 500;
  }
`

const applyEventCardStyle = (
  eventBackground: string,
  eventTextColor: string,
  view: View,
) => {
  return css`
    .rbc-event {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      background-color: ${getColor(eventBackground, "08")};
      border-left: 2px solid ${getSpecialThemeColor(eventBackground)}!important;
      border-radius: 4px;
      color: ${getSpecialThemeColor(eventTextColor)};
      padding: ${view !== "month" ? "12px 16px" : ""};
      overflow: hidden;
    }
    .rbc-month-view .rbc-event {
      padding: 5px 8px;
    }
  `
}

const applyMonthView = (titleColor: string, eventTextColor: string) => {
  return css`
    .rbc-month-view {
      color: ${getSpecialThemeColor(titleColor)};
      font-weight: 600;
      .rbc-off-range {
        color: ${getColor(titleColor, "06")}!important;
      }
      .rbc-off-range-bg {
        background: none;
      }
      .rbc-addons-dnd-resizable span {
        display: none;
      }
      .rbc-show-more {
        ${applyCalendarFont};
        background-color: transparent !important;
        &:focus,
        &:hover {
          color: ${getSpecialThemeColor(eventTextColor)};
        }
      }
    }
  `
}
const applyAgenda = css`
  .rbc-agenda-view {
    font-size: 14px;
    font-weight: 400;
    .rbc-agenda-date-cell {
      border-right: 1px solid #ebebeb;
    }
  }
`

const applyIndicatorStyle = (indicatorTop: number) => {
  return css`
    .rbc-current-time-indicator {
      background-color: red;
    }
    .rbc-current-time-indicator {
      display: none;
    }
    .rbc-day-slot::before {
      position: absolute;
      z-index: 3;
      content: "";
      height: 1px;
      width: 100%;
      top: ${indicatorTop}px;
      visibility: ${indicatorTop ? "visible" : "hidden"};
      background-color: ${getColor("red", "03")};
    }
  `
}

const buttonGroupStyle = (titleColor: string, isLight: boolean) => {
  const color = css`
    color: ${getSpecialThemeColor(titleColor)}!important;
  `
  return css`
    .rbc-btn-group {
      background-color: transparent !important;
      ${color};
      button {
        background-color: transparent !important;
        ${color};
        &:active,
        &:hover,
        &:focus {
          background-color: transparent !important;
          ${color};
          box-shadow: none !important;
        }
      }
      .rbc-active {
        box-shadow: none !important;
        background-color: ${isLight
          ? getColor("blackAlpha", "09")
          : getColor("white", "09")}!important;
        ${color};
        &:focus,
        &:active {
          ${color};
          background-color: ${isLight
            ? getColor("blackAlpha", "09")
            : getColor("white", "09")}!important;
        }
      }
    }
  `
}
const applyCalendarBg = (slotBackground: string) => {
  return css`
    background-color: ${getColor(slotBackground, "08")}!important;
    .rbc-header,
    .rbc-row-bg,
    .rbc-label,
    .rbc-time-gutter,
    .rbc-day-slot,
    .rbc-calendar,
    tbody {
      background-color: ${getColor(slotBackground, "08")}!important;
    }
  `
}
const applyBorderStyle = (isLight: boolean) => {
  return css`
    .rbc-time-view,
    .rbc-agenda-view,
    .rbc-time-view div,
    .rbc-time-view button,
    .rbc-time-header.rbc-overflowing {
      border-color: ${isLight
        ? getColor("blackAlpha", "08")
        : getColor("white", "08")};
    }
    .rbc-btn-group button,
    .rbc-day-bg,
    .rbc-month-row,
    .rbc-month-view,
    .rbc-agenda-view,
    .rbc-header,
    .rbc-toolbar,
    tbody,
    tr,
    thead,
    table,
    .rbc-agenda-date-cell,
    .rbc-agenda-event-cell,
    .rbc-time-gutter {
      border-color: ${isLight
        ? getColor("blackAlpha", "08")
        : getColor("white", "08")}!important;
    }
  `
}

export const applyTitleColor = (titleColor: string) => {
  return css`
    .rbc-header,
    .rbc-button-link,
    .rbc-time-gutter .rbc-timeslot-group,
    tbody {
      color: ${getSpecialThemeColor(titleColor)};
    }
    .rbc-off-range .rbc-button-link {
      color: ${getColor(titleColor, "06")}!important;
    }
  `
}

const hiddenToolBarStyle = (showResource: boolean) => {
  return css`
    .rbc-toolbar .rbc-btn-group:last-of-type {
      button:first-of-type,
      button:last-of-type {
        display: ${!showResource ? "inline-block" : "none"};
      }
    }
  `
}

export const ApplyCustomStyle = (
  date: string,
  indicatorTop: number,
  showCurrentTime: boolean | undefined,
  slotBackground: string,
  titleColor: string,
  eventBackground: string,
  eventTextColor: string,
  isLight: boolean,
  displayName: string,
  showResource: boolean,
  view: View,
) => {
  let needHiddenLabel = -1
  if (date) {
    const [hour, minus] = Array.from(date.split(":"), (v) => parseInt(v))
    if (minus <= 15) {
      needHiddenLabel = hour
    } else if (minus >= 45) {
      needHiddenLabel = hour + 1
    }
  }
  return css`
    height: 100%;
    width: 100%;
    .rbc-today {
      background: none !important;
    }
    [data-target="${displayName}"] {
      color: ${getSpecialThemeColor(titleColor)} !important;
      visibility: ${showCurrentTime ? "visible" : "hidden"} !important;
    }
    .rbc-addons-dnd-resizable {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .rbc-time-view {
      .rbc-time-gutter::after {
        position: absolute;
        z-index: 11;
        left: 0;
        width: 100%;
        content: " ${date}";
        top: ${indicatorTop}px;
        visibility: ${indicatorTop ? "visible" : "hidden"};
        color: ${getColor("red", "03")};
        transform: translateY(-50%);
        text-align: right;
        white-space: nowrap;
        padding: 0 5px;
      }
      .rbc-time-gutter {
        position: sticky;
        left: 0;
        background-color: white;
        border-right: 1px solid #ebebeb;
        z-index: 10 !important;
        margin-right: -1px;
        ${applyCalendarFont};
        font-family: "SF Pro Display";
        line-height: 24px;
      }
      .rbc-timeslot-group .rbc-time-slot:first-of-type {
        transform: translateY(-50%);
      }
      .rbc-time-gutter .rbc-timeslot-group {
        border-bottom: none;
      }
      .rbc-timeslot-group:nth-of-type(${needHiddenLabel + 1}) .rbc-label,
      .rbc-timeslot-group:first-of-type .rbc-label {
        visibility: hidden;
      }
    }
    }
    .rbc-addons-dnd-resizable {
      overflow: hidden;
    }
    .rbc-month-row {
      min-height: 80px;
    }
    .rbc-row-content {
      min-height: 60px;
    }
    .rbc-day-slot {
      min-width: 140px;
    }
    .rbc-day-slot .rbc-events-container {
      margin: 0 8px;
      padding: 8px;
    }
    .rbc-time-header-cell .rbc-header,
    .rbc-allday-cell .rbc-day-bg {
      box-sizing: border-box;
      min-width: 140px;
    }
    .rbc-event-label {
      font-size: 14px;
      font-weight: 500;
    }
    .${displayName} {
      .rbc-event {
        border-right: none;
        border-top: none;
        border-bottom: none;
        min-height: ${view !== "month" ? "40px" : "24px"};
        overflow: hidden;
        margin-left: ${view !== "month" ? "1px" : "0"};
        border-radius: ${view !== "month" ? "4px" : "0"}!important;
      }
      .rbc-selected {
        background-color: ${getColor(eventBackground, "08")}!important;
      }
      .rbc-addons-dnd-resize-ew-anchor {
        top: 50%;
        transform: translateY(-50%);
      }
      .rbc-addons-dnd-resize-ew-icon {
        width: 100% !important;
        height: 100% !important;
      }
      .rbc-header {
        font-weight: 400;
        font-size: 14px;
        line-light: 22px;
      }
      .rbc-day-slot .rbc-time-slot {
        border: none;
      }
      .rbc-timeslot-group {
        min-height: 80px;
      }
      ${applyIndicatorStyle(indicatorTop)};
      ${applyMonthView(titleColor, eventTextColor)};
      ${applyCalendarBg(slotBackground)};
      ${applyAgenda};
      ${buttonGroupStyle(titleColor, isLight)};
      ${applyTitleColor(titleColor)};
      ${applyEventCardStyle(eventBackground, eventTextColor, view)};
      ${applyBorderStyle(isLight)};
      ${hiddenToolBarStyle(showResource)};
    }
  `
}

export const applyEventWrapper = css`
  margin: 4px;
`
