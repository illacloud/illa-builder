import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

const applyCalendarFont = css`
  font-family: "Inter";
  font-style: normal;
  font-size: 14px;
  // color: ${getColor("blue", "03")}; //TODO
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

const applyEventCardStyle = css`
  .rbc-event {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    background: ${getColor("blue", "07")};
    border-left: 2px solid ${getColor("blue", "03")};
    border-radius: 4px;
    color: ${getColor("blue", "03")};
  }
`
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
    ${applyEventCardStyle}
  }
}
`
}
const applyMonthView = (titleColor: string) => {
  return css`
  .rbc-month-view {
    color: ${getColor(titleColor, "02")};
    font-weight: 600;
    .rbc-off-range {
      color: ${getColor(titleColor, "06")};
    }
    .rbc-off-range-bg {
      background: none;
    }
    .rbc-addons-dnd-resizable span {
      display: none;
    }
    .rbc-show-more {
      ${applyCalendarFont}
    }
    .
    ${applyEventCardStyle}
  }
`
}
const applyWeekView = css`
  ${applyEventCardStyle}
`
const applyAgenda = css`
  .rbc-agenda-view {
    // color: ${getColor("grey", "03")}!important;得到的是一个计算值
    color: #1f1f1f;
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

const buttonGroupStyle = (slotBackground: string, titleColor: string) => {
  return css`
    .rbc-btn-group {
      background: ${getColor(slotBackground, "01")};
      color: ${getColor(titleColor, "02")};
      button {
        background: none;
        color: ${getColor(titleColor, "02")};
        &:active,
        &:hover,
        &:focus {
          background: ${getColor(slotBackground, "03")}!important;
          color: ${getColor(titleColor, "02")};
          box-shadow: none !important;
        }
      }
      .rbc-active {
        box-shadow: none !important;
        background: ${getColor(slotBackground, "03")}!important;
        color: ${getColor(titleColor, "02")}!important;
        &:focus,
        &:active {
          color: ${getColor(titleColor, "02")};
          background: ${getColor(slotBackground, "03")};
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
    tbody {
      background-color: ${getColor(slotBackground, "01")}!important;
    }
  `
}
const applyBorderStyle = (borderColor: string) => {
  return css`
    .rbc-header,
    .rbc-btn-group button,
    .rbc-day-bg,
    .rbc-month-row,
    .rbc-time-view div,
    .rbc-time-view button {
      border-color: ${getColor(borderColor, "05")}!important;
    }
  `
}

export const applyTitleColor = (titleColor: string) => {
  return css`
    .rbc-header,
    .rbc-button-link,
    .rbc-time-gutter .rbc-timeslot-group,
    tbody {
      color: ${getColor(titleColor, "02")}!important;
    }
  `
}

export const ApplyCustomStyle = (
  date: string,
  indicatorTop: number,
  timeContentWidth: number,
  showCurrentTime: boolean,
  slotBackground: string,
  borderColor: string,
  titleColor: string,
  showResource: boolean,
) => {
  return css`
    height: 100%;
    .rbc-event {
      border-right: none;
      border-top: none;
      border-bottom: none;
    }
    .rbc-selected {
      background-color: ${getColor("blue", "06")};
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
      color: ${getColor(titleColor, "02")};
      visibility: ${showCurrentTime ? "visible" : "hidden"};
    }
    .rbc-day-slot .rbc-time-slot {
      border: none;
    }
    ${applyTimeView(date, indicatorTop)}
    ${applyIndicatorStyle(timeContentWidth, indicatorTop, showResource)}
    ${applyMonthView(titleColor)}
    ${applyWeekView}
    ${applyAgenda}
    ${buttonGroupStyle(slotBackground, titleColor)}
    ${applyCalendarBg(slotBackground)}
    ${applyBorderStyle(borderColor)}
    ${applyTitleColor(titleColor)}
  `
}
