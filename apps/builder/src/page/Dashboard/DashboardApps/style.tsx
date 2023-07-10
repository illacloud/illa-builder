import { SerializedStyles, css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/react"

export const CARD_WIDTH = 380
export const CARD_HEIGHT = 228
export const CARD_GAP_SIZE = 24
export const fullWidthStyle: SerializedStyles = css`
  width: 100%;
  height: 100%;
  overflow: auto;
`
export const appsContainerStyle: SerializedStyles = css`
  display: flex;
  height: 100%;
  overflow: hidden;
  flex-grow: 1;
  flex-direction: column;
  margin: 0 auto;
  // Compatible child element box-shadow style
  width: calc(70% + 16px);
  padding: 40px 16px;
`

export const listTitleContainerStyle: SerializedStyles = css`
  display: flex;
  padding: 24px 0;
  justify-content: space-between;
  align-items: center;
`

export const teamInfoContainerStyle: SerializedStyles = css`
  display: flex;
  align-items: center;
  gap: 16px;
`

export const teamAvatarStyle: SerializedStyles = css`
  width: 40px;
  height: 40px;
`

export const listContainerStyle: SerializedStyles = css`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${CARD_GAP_SIZE}px;
  height: ${CARD_HEIGHT + CARD_GAP_SIZE}px;
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

export const emptyStyle: SerializedStyles = css`
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  font-weight: 600;
  line-height: 22px;
`
