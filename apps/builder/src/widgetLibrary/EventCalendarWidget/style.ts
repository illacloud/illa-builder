import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

const applyCalendarFont = css`
  font-family: "Inter";
  font-style: normal;
  font-size: 14px;
  font-weight: 400;
`

export const applyEventStyle = css`
  line-height: 14px;
  ${applyCalendarFont}
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
) => {
  return css`
    .rbc-event {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      background: ${getColor(eventBackground, "07")};
      border-left: 2px solid ${getColor(eventBackground, "03")}!important;
      border-radius: 4px;
      color: ${getColor(eventTextColor, "01")};
    }
  `
}
const applyTimeView = (date: string, indicatorTop: number) => {
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
  .rbc-time-view {
    .rbc-time-gutter::after {
      position: absolute;
      z-index: 11;
      left: 0;
      width: 100%;
      content: " ${date}";
      top: ${indicatorTop}px;
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
      border-right: 1px solid #EBEBEB;;
      z-index: 10!important;
      margin-right: -1px;
      ${applyCalendarFont}
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
`
}
const applyMonthView = (titleColor: string, eventTextColor: string) => {
  return css`
    .rbc-month-view {
      color: ${getColor(titleColor, "01")};
      font-weight: 600;
      .rbc-off-range {
        color: ${getColor(titleColor, "05")}!important;
      }
      .rbc-off-range-bg {
        background: none;
      }
      .rbc-addons-dnd-resizable span {
        display: none;
      }
      .rbc-show-more {
        ${applyCalendarFont}
        &:focus, &:hover {
          color: ${getColor(eventTextColor, "03")};
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

const applyIndicatorStyle = (
  timeContentWidth: number,
  indicatorTop: number,
  showResource: boolean,
) => {
  let width
  if (showResource) {
    width = css`
      width: ${timeContentWidth}px;
    `
  } else {
    width = css`
      width: 100%;
    `
  }
  return css`
    .rbc-current-time-indicator {
      background: red;
    }
    .rbc-current-time-indicator {
      display: none;
    }
    .rbc-time-content::before {
      position: absolute;
      z-index: 3;
      content: "";
      height: 1px;
      ${width}
      top: ${indicatorTop}px;
      background-color: ${getColor("red", "03")};
    }
  `
}

const buttonGroupStyle = (titleColor: string, isLight: boolean) => {
  const color = css`
    color: ${getColor(titleColor, "01")}!important;
  `
  return css`
    .rbc-btn-group {
      background: transparent !important;
      ${color}
      button {
        background: transparent !important;
        ${color}
        &:active,
        &:hover,
        &:focus {
          background: transparent !important;
          ${color}
          box-shadow: none!important;
        }
      }
      .rbc-active {
        box-shadow: none !important;
        background: ${isLight
          ? getColor("blackAlpha", "09")
          : getColor("white", "09")}!important;
        ${color}
        &:focus,
        &:active {
          ${color}
          background: ${isLight
            ? getColor("blackAlpha", "09")
            : getColor("white", "09")}!important;
        }
      }
    }
  `
}
const applyCalendarBg = (slotBackground: string) => {
  return css`
    .rbc-header,
    .rbc-row-bg,
    .rbc-label,
    .rbc-time-gutter,
    .rbc-day-slot,
    .rbc-calendar,
    tbody {
      background-color: ${getColor(slotBackground, "01")}!important;
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
      color: ${getColor(titleColor, "01")};
    }
    .rbc-off-range .rbc-button-link {
      color: ${getColor(titleColor, "05")}!important;
    }
  `
}

export const ApplyCustomStyle = (
  date: string,
  indicatorTop: number,
  timeContentWidth: number,
  showCurrentTime: boolean,
  slotBackground: string,
  titleColor: string,
  eventBackground: string,
  eventTextColor: string,
  showResource: boolean,
  isLight: boolean,
) => {
  return css`
    height: 100%;
    .rbc-event {
      border-right: none;
      border-top: none;
      border-bottom: none;
    }
    .rbc-selected {
      background: ${getColor(eventBackground, "07")};
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
    .rbc-today {
      background: none;
    }
    .rbc-toolbar-label {
      color: ${getColor(titleColor, "01")};
      visibility: ${showCurrentTime ? "visible" : "hidden"};
    }
    .rbc-day-slot .rbc-time-slot {
      border: none;
    }
    .rbc-addons-dnd-resizable {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    ${applyTimeView(date, indicatorTop)}
    ${applyIndicatorStyle(timeContentWidth, indicatorTop, showResource)}
    ${applyMonthView(titleColor, eventTextColor)}
    ${applyAgenda}
    ${buttonGroupStyle(titleColor, isLight)}
    ${applyCalendarBg(slotBackground)}
    ${applyTitleColor(titleColor)}
    ${applyEventCardStyle(eventBackground, eventTextColor)}
    ${applyBorderStyle(isLight)}
  `
}
