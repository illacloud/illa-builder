import { SerializedStyles, css } from "@emotion/react"
import { fixedWidthStyle } from "@/page/App/components/InspectPanel/PanelSetters/style"

export const applyRadioGroupWrapperStyle = (
  isSetterSingleRow: boolean = false,
): SerializedStyles => {
  return isSetterSingleRow
    ? css`
        padding-top: 8px;
        width: 100%;
      `
    : fixedWidthStyle
}

export const radioGroupStyle = css`
  width: 100%;
`

export const baseRadioGroupContainerStyle = (
  isSetterSingleRow: boolean = false,
) => {
  return css`
    display: flex;
    flex-direction: ${!isSetterSingleRow ? "row" : "column"};
    align-items: ${!isSetterSingleRow ? "center" : "flex-start"};
    justify-content: ${!isSetterSingleRow ? "space-between" : "flex-start"};
    width: 100%;
    padding: 8px 16px;
  `
}
