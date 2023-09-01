import { SerializedStyles, css } from "@emotion/react"

export const appsContainerStyle: SerializedStyles = css`
  display: flex;
  width: 100%;
  overflow: hidden;
  flex-grow: 1;
  flex-direction: column;
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
