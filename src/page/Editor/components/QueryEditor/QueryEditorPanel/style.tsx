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

export const QueryEditorPanelActionSelect = css`
  height: 32px;
  font-size: 14px;

  & > div {
    padding: 0 16px;
  }
`

export const ModeSelect = css`
  max-width: 115px;
  border-radius: 8px 0 0 8px !important;
`
export const TriggerSelect = css`
  max-width: 313px;
  margin-right: 8px;
  border-radius: 0 8px 8px 0px !important;
`
export const ResourceSelectContainer = css``

export const ResourceSelect = css`
  min-width: 151px !important;
  max-width: 151px;
  border-radius: 8px 0 0 8px !important;
`

export const EditIcon = css`
  width: 32px;
  height: 32px;
  border: 1px solid ${globalColor(`--${illaPrefix}-grayblue-08`)};
  border-radius: 0 8px 8px 0;
  box-sizing: border-box;

  & > svg {
    margin: 8px;
    color: ${globalColor(`--${illaPrefix}-grayblue-08`)};
  }
`
