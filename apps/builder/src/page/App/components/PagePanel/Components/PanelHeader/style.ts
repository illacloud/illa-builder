import { SerializedStyles, css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/react"

export const publicPaddingStyle = css`
  padding: 0 16px;
  box-sizing: border-box;
`

export const baseLabelStyle = css`
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

export const ListLabelStyle = css`
  color: ${globalColor(`--${illaPrefix}-grayBlue-04`)};
  font-weight: 400;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

export function applyLabelStyle(isInList?: boolean): SerializedStyles {
  return isInList ? ListLabelStyle : baseLabelStyle
}

export function applyLabelTipsStyle(
  isInList?: boolean,
  hasLabelDesc?: boolean,
): SerializedStyles {
  const labelStyle = applyLabelStyle(isInList)
  const borderBottomStyle = hasLabelDesc
    ? css`
        border-bottom: 1px dashed ${globalColor(`--${illaPrefix}-grayBlue-06`)};
      `
    : css``
  return css`
    ${labelStyle};
    ${borderBottomStyle};
  `
}

export const panelHeaderWrapperStyle = css`
  display: flex;
  width: 100%;
  height: 48px;
  justify-content: space-between;
  align-items: center;
  flex: none;
  ${publicPaddingStyle}
`

export const panelHeaderIconWrapperStyle = css`
  margin-left: 16px;
  cursor: pointer;
`

export function applySetterWrapperStyle(
  isSetterSingleRow: boolean = false,
  isInList: boolean = false,
  isSetterSingleRowWrapper: boolean = false,
  useCustomLayout: boolean = false,
): SerializedStyles {
  if (useCustomLayout) {
    return css``
  }
  if (isSetterSingleRow) {
    return css`
      ${publicPaddingStyle}
    `
  }

  const basicStyle = css`
    display: flex;
    align-items: ${isInList ? "center" : "baseline"};
    justify-content: space-between;
  `
  return css`
    ${isInList ? "padding: 0 12px;" : "padding: 0 16px;"};
    ${basicStyle};
  `
}

export const unselectedTipWrapperStyle = css`
  width: 100%;
  height: 319px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const unselectedTipIconStyle = css`
  font-size: 30px;
`

export const unselectedTipTextStyle = css`
  margin-top: 4px;
`

export const singleSelectedPanelWrapperStyle = css`
  width: 100%;
`

export const singleSelectedPanelSetterWrapperStyle = css`
  max-height: calc(100vh - 150px);
  overflow-y: auto;
`

export const ghostEmptyStyle = css`
  margin-bottom: 8px;
`

export const applySetterPublicWrapperStyle = (
  isInList: boolean = false,
  isSetterSingleRowWrapper: boolean = false,
  notNeedPadding: boolean,
) => {
  const widthStyle = isSetterSingleRowWrapper
    ? css`
        width: 100%;
      `
    : null
  if (notNeedPadding) {
    return css`
      min-height: 48px;
      align-items: center;
    `
  }
  return isInList
    ? css`
        min-height: 40px;
        display: flex;
        align-items: center;
        ${widthStyle}
      `
    : css`
        padding: 8px 0;
        min-height: 48px;
        ${widthStyle}
      `
}

export const multiSelectedPanelWrapper = css`
  padding: 0 16px;
  width: 100%;
  font-size: 14px;
`

export const formHeaderStyle = css`
  height: 48px;
  display: flex;
  align-items: center;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  font-weight: 600;
`

export const formContentStyle = css`
  overflow: hidden;
  width: 100%;
  margin-bottom: 16px;
  border: 1px solid ${globalColor(`--${illaPrefix}-grayBlue-08`)};
  padding: 8px 16px;
  border-radius: 8px;
`

export const formContentItemStyle = css`
  :not(:nth-of-type(1)) {
    margin-top: 8px;
  }
  line-height: 22px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
`
