import { SerializedStyles, css } from "@emotion/react"
import { fixedWidthStyle } from "@/page/App/components/InspectPanel/PanelSetters/style"

export const applyRadioGroupWrapperStyle = (
  isSetterSingleRow: boolean = false,
): SerializedStyles => {
  let width = isSetterSingleRow
    ? css`
        width: 100%;
      `
    : fixedWidthStyle
  return css`
    display: flex;
    flex: none;
    flex-direction: column;
    gap: 8px;
    ${width};
  `
}

export const radioGroupStyle = css`
  width: 100%;
`

export const baseRadioGroupContainerStyle = (
  isSetterSingleRow: boolean = false,
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
    padding: 8px 0;
    ${isSetterSingleRow ? singleRowStyle : basicStyle};
    width: 100%;
  `
}

export const uploadButtonStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 4px;
`
