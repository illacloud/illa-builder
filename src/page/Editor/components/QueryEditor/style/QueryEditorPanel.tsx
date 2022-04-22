import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const QueryEditorPanelContainer = css`
  flex: 1;
`

export const QueryEditorPanelHeader = css`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  height: 48px;
  border-bottom: 1px solid ${globalColor(`--${illaPrefix}-grayblue-08`)};
`

export const QueryEditorPanelAction = css`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  height: 48px;
`

export const QueryEditorPanelFilling = css`
  flex: 1;
`

export const QueryEditorPanelHeaderButton = css`
  height: 32px;
  & + & {
    margin-left: 8px;
  }
`

export const QueryEditorPanelActionSelect = css``
export const ModeSelect = css`
  width: 115px;
`
export const TriggerSelect = css`
  width: 300px;
  margin-right: 8px;
`
export const ResourceSelect = css`
  display: flex;
  align-items: center;
  border: 1px solid ${globalColor(`--${illaPrefix}-grayblue-08`)};
`
