import { SerializedStyles, css } from "@emotion/react"
import { getColor, globalColor, illaPrefix } from "@illa-design/react"

export const navBarStyle = css`
  display: flex;
  box-sizing: border-box;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${globalColor(`--${illaPrefix}-grayBlue-08`)};
  padding: 6px 16px;
`

export const rowCenter = css`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const viewControlStyle = css`
  color: ${globalColor(`--${illaPrefix}-grayBlue-04`)};

  ${rowCenter}
  & > svg {
    &:hover {
      color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
      cursor: pointer;
    }
  }
`

export const rightContentStyle = css`
  display: flex;
  align-self: flex-end;
  justify-content: space-between;
  align-items: center;
  gap: 29px;
`

export const informationStyle = css`
  margin-left: 24px;
  display: flex;
  flex-direction: column;
  font-size: 12px;
  flex-shrink: 1;
`

export const nameStyle = css`
  font-weight: 500;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
`

export const descriptionStyle = css`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: ${globalColor(`--${illaPrefix}-grayBlue-04`)};
`

export const saveFailedTipStyle = css`
  display: flex;
  align-items: center;
  width: 100%;
  color: ${getColor("grayBlue", "03")};
  gap: 4px;
`

export function windowIconStyle(selected: boolean): SerializedStyles {
  return css`
    flex: none;
    width: 16px;
    height: 16px;
    font-size: 16px;
    color: ${selected
      ? globalColor(`--${illaPrefix}-grayBlue-03`)
      : globalColor(`--${illaPrefix}-grayBlue-05`)};
  `
}

export const logoCursorStyle = css`
  cursor: pointer;
`

export const windowIconBodyStyle = css`
  width: 24px;
  height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 2px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: ${globalColor(`--${illaPrefix}-grayBlue-09`)};
  }
`

export const previewButtonGroupWrapperStyle = css`
  margin-left: 24px;
  display: flex;
  align-items: center;
`
export const lineStyle = css`
  display: inline-block;
  width: 1px;
  height: 32px;
  background-color: ${getColor("grayBlue", "08")};
`

export const closeIconStyle = css`
  width: 8px;
  height: 8px;
  color: ${getColor("grayBlue", "04")};
`

export const hasMarginClosIconStyle = css`
  margin-left: 8px;
  margin-right: 8px;
  ${closeIconStyle}
`

export const viewportFontStyle = css`
  color: #000;
  width: 48px;
  display: inline-block;
  user-select: none;
`

export const downIconStyle = css`
  color: ${getColor("grayBlue", "04")};
`

export const previewPopContentWrapperStyle = css`
  width: 280px;
  height: 168px;
  background-color: ${getColor("white", "01")};
  border: 1px solid ${getColor("grayBlue", "08")};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  position: relative;
`

export const previewPopContentHeaderStyle = css`
  width: 100%;
  height: 48px;
  margin-top: 8px;
  padding: 8px 8px 8px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const resetLabelStyle = css`
  font-weight: 500;
  color: ${getColor("grayBlue", "02")};
  font-size: 14px;
`
export const resetIconStyle = css`
  font-size: 14px;
  color: ${getColor("grayBlue", "02")};
`

export const resetButtonContentStyle = css`
  color: ${getColor("grayBlue", "02")};
  font-size: 14px;
`

export const inputAreaWrapperStyle = css`
  padding: 8px 16px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const inputAreaLabelWrapperStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
  line-height: 20px;
`

export const saveButtonWrapperStyle = css`
  padding: 0 16px;
  position: absolute;
  bottom: 16px;
  width: 100%;
`
