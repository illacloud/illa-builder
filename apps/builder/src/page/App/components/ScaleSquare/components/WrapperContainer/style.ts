import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"
import { WIDGET_PADDING } from "@/page/App/components/ScaleSquare/constant/widget"

export const hoverHotSpotStyle = css`
  width: 100%;
  height: 100%;
`

export const applyWrapperPendingStyle = ({
  isSelected,
  hasError,
  isEditor,
  isLimitedModeAndOverLap = false,
}: {
  isSelected: boolean
  hasError: boolean
  isEditor: boolean
  isLimitedModeAndOverLap: boolean
}) => css`
  width: 100%;
  height: 100%;
  padding: ${WIDGET_PADDING}px;
  background-color: ${isEditor && hasError && !isSelected
    ? getColor("red", "08")
    : "transparent"};
  ${isLimitedModeAndOverLap && isSelected
    ? `border-bottom:unset !important`
    : ""}
  ${isEditor && "cursor: move"}
`
