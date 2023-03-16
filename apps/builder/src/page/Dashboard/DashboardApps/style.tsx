import { SerializedStyles, css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/react"

export const appsContainerStyle: SerializedStyles = css`
  display: flex;
  height: 100%;
  overflow: hidden;
  flex-grow: 1;
  flex-direction: column;
  margin: 0 auto;
  // Compatible child element box-shadow style
  width: calc(67% + 16px);
  padding: 40px 16px;
`

export const listTitleContainerStyle: SerializedStyles = css`
  display: flex;
  min-height: 80px;
  align-items: center;
  flex-direction: row;
`

export const listTitleStyle: SerializedStyles = css`
  font-size: 20px;
  font-weight: 500;
  flex-grow: 1;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
`

export const hoverStyle = css`
  &:hover {
    cursor: pointer;

    .dashboardAppEditButton,
    .dashboardAppLaunchButton {
      visibility: visible;
    }
  }
`
