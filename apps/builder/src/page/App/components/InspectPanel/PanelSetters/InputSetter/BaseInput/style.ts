import { css } from "@emotion/react"
import { fixedWidthStyle } from "../../style"

export const applyInputSetterWrapperStyle = (
  isSetterSingleRow: boolean = false,
) => {
  return isSetterSingleRow
    ? css`
        width: 100%;
      `
    : fixedWidthStyle
}

export const setterContainerStyle = (
  isSetterSingleRow: boolean = false,
  onlyHasSetter: boolean,
) => {
  const basicStyle = css`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `
  const singleRowStyle = css`
    flex-direction: column;
    gap: 8px;
  `
  return css`
    display: flex;
    padding: ${onlyHasSetter ? `0` : `8px 0`};
    ${isSetterSingleRow ? singleRowStyle : basicStyle};
    width: 100%;
  `
}
