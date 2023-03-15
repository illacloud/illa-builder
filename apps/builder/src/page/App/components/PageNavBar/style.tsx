import { SerializedStyles, css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const navBarStyle = css`
  display: flex;
  box-sizing: border-box;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${getColor("grayBlue", "08")};
  padding: 6px 16px;
`

export const rowCenter = css`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const viewControlStyle = css`
  color: ${getColor("grayBlue", "04")};

  ${rowCenter}
  & > svg {
    &:hover {
      color: ${getColor("grayBlue", "02")};
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
  cursor: pointer;
  color: ${getColor("grayBlue", "02")};
`

export const descriptionStyle = css`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: ${getColor("grayBlue", "04")};
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
      ? getColor("grayBlue", "03")
      : getColor("grayBlue", "05")};
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
    background: ${getColor("grayBlue", "09")};
  }
`

export const previewButtonGroupWrapperStyle = css`
  display: flex;
  align-items: center;
  gap: 16px;
  height: 32px;
`

export const appSizeContainerStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const appSizeIconContainerStyle = css`
  width: 32px;
  height: 32px;
  display: flex;
  cursor: pointer;
`

export const appSizeIconStyle = css`
  margin: auto;
  height: 100%;
  display: flex;
  & > svg {
    width: 16px;
    height: 16px;
    margin: auto;
  }
`

export const getAppSizeIconSelectedStyle = (
  active: boolean,
): SerializedStyles => {
  if (active) {
    return css`
      box-shadow: inset 0px -2px 0px ${getColor("grayBlue", "02")};
    `
  }
  return css``
}

export const lineStyle = css`
  display: inline-block;
  width: 1px;
  height: 16px;
  margin: 0 16px;
  background-color: ${getColor("grayBlue", "08")};
`

export const closeIconStyle = css`
  width: 8px;
  height: 8px;
  color: ${getColor("grayBlue", "04")};
`

export const inputAreaWrapperStyle = css`
  width: 100%;
  gap: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const inputAreaLabelWrapperStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  gap: 8px;
  color: ${getColor("grayBlue", "02")};
`

export const appNameEditorWrapperStyle = css`
  width: 280px;
  height: 128px;
  border-radius: 8px;
  padding: 24px 0 16px 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
  background-color: ${getColor("white", "01")};
  border: 1px solid ${getColor("grayBlue", "08")};
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
`

export const appNameInputWrapperStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  gap: 16px;
`

export const appNameInputLabelStyle = css`
  font-size: 12px;
  line-height: 20px;
  color: ${getColor("grayBlue", "02")};
  text-align: center;
`

export const appNameEditorSaveButtonWrapperStyle = css`
  margin: 0 16px;
`

export const triggerStyle = css`
  margin-top: 20px;
`
