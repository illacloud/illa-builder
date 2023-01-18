import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const applyHintTooltipContentWrapperStyle = (hasError: boolean) => css`
  display: flex;
  width: 100%;
  padding: 4px 0;
  border-radius: 0 0 8px 8px;
  font-family: "fira code", monospace;
  background-color: ${hasError
    ? getColor("red", "07")
    : getColor("green", "07")};
`

export const applyHintTooltipContentMainWrapperStyle = (
  hasError: boolean,
) => css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: ${hasError ? getColor("red", "01") : getColor("green", "01")};
  flex: 9;
`

export const hintTooltipContentTitleWrapperStyle = css`
  gap: 4px;
  align-items: center;
  padding: 0 8px;
  position: relative;
`
export const hintTooltipContentTitleStyle = css`
  font-size: 14px;
  font-weight: 600;
  line-height: 22px;
`

export const hintTooltipResultStyle = css`
  word-break: break-all;
  max-height: 150px;
  overflow: auto;
  padding: 0 8px;
`

export const copyIconStyle = css`
  cursor: pointer;
  position: absolute;
  top: 4px;
  right: 4px;
`
