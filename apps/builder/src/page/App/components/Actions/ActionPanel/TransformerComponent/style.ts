import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/react"

export const transformTitleStyle = css`
  min-height: 48px;
  width: 100%;
  margin: 0;
  padding: 0 16px;
  display: flex;
  align-items: center;
  flex-direction: row;
`

export const transformRadioStyle = css`
  width: 184px;
`

export const transformSpaceStyle = css`
  flex-grow: 1;
`

export const codeMirrorStyle = css`
  margin: 8px 16px;
  width: 100%;
`

export const transformTitle = css`
  min-width: 160px;
  font-size: 14px;
  font-weight: 500;
  text-align: right;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
`

export const codeMirrorContainer = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 48px;
`

export const codeMirrorPaddingContainer = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 48px;
  padding: 0 0 0 16px;
`

export const getCodeMirrorContainerStyle = (mysqlLike: boolean) => {
  if (mysqlLike) {
    return css`
      ${codeMirrorContainer}
    `
  } else {
    return css`
      ${codeMirrorPaddingContainer}
    `
  }
}
