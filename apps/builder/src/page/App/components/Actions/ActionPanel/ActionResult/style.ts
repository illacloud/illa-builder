import { SerializedStyles, css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const actionResultContainerStyle = css`
  padding-top: 120px;
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 100%;
  pointer-events: none;
  justify-content: end;
  height: 100%;
`

export function applyActionContentContainerStyle(
  renderResult: boolean,
): SerializedStyles {
  return css`
    visibility: ${renderResult ? "visible" : "hidden"};
    position: relative;
    pointer-events: auto;
    z-index: 10;
  `
}

export const alertBarStyle = css`
  width: 100%;
  background: ${getColor("grayBlue", "09")};
  height: 40px;
  display: flex;
  flex-direction: row;
  padding: 0 16px;
  align-items: center;
`

export const restApiAlertBarStyle = css`
  width: 100%;
  background: ${getColor("grayBlue", "09")};
  height: 48px;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`

export const alertTabsContainerStyle = css`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 8px;
  height: 32px;
`

export const alertTabsItemStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 8px;
  gap: 10px;
  cursor: pointer;
  width: 82px;
  height: 32px;
  font-size: 14px;
`

export const tabsContentStyle = css`
  line-height: 22px;
`

export const getActiveStyle = (active: boolean): SerializedStyles => {
  if (active) {
    return css`
      box-shadow: inset 0px -2px 0px ${getColor("grayBlue", "02")};
    `
  }
  return css``
}

export const alertInfoContainerStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0;
  gap: 24px;
  height: 24px;
  position: absolute;
  right: 40px;
`

export const alertInfoStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  color: ${getColor("grayBlue", "04")};
  font-size: 14px;
  line-height: 22px;
`

export const applyStatusCodeStyle = (statusCode: number) => css`
  font-weight: 500;
  font-size: 14px;

  color: ${statusCode >= 400 ? getColor("red", "03") : getColor("green", "03")};
`

export const timestampStyle = css`
  font-weight: 500;
  font-size: 14px;

  color: ${getColor("grayBlue", "02")};
`

export const alertTextStyle = css`
  font-weight: 500;
  flex-grow: 1;
  font-size: 14px;
  margin-left: 8px;
`

export const customerCodeStyle = css`
  border: none;
  border-radius: 0;
  background-color: ${getColor("white", "01")};

  .cm-editor.ͼ1 {
    border: none;
    border-radius: 0;

    & > .cm-scroller > .cm-gutters {
      border-radius: 0;
    }
  }
`
