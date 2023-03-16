import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

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
