import { SerializedStyles } from "@emotion/serialize"
import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const applyAppsContainerCss: SerializedStyles = css`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  margin: 0 auto;
  width: 67%;
  height: 100%;
`

export const applyListTitleContainerCss: SerializedStyles = css`
  display: flex;
  height: 80px;
  align-items: center;
  flex-direction: row;
`

export const applyListTitleCss: SerializedStyles = css`
  font-size: 20px;
  font-weight: 500;
  flex-grow: 1;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
`

export const applyItemExtraContainer: SerializedStyles = css`
  display: flex;
  height: 100%;
  align-items: center;
  flex-direction: row;
`

export const applyMenuButtonCss: SerializedStyles = css`
  margin-left: 4px;
`

export const applyItemMenuButtonCss: SerializedStyles = css`
  margin-left: 4px;
`
