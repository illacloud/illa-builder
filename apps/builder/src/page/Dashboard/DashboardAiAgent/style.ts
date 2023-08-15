import { css } from "@emotion/react"
// TODO: @AruSeito @smallSohoSolo refactor this usage
import { agent_card_width } from "@illa-public/market-agent-card/style"
import { getColor } from "@illa-design/react"

export const containerStyle = css`
  display: flex;
  width: 100%;
  height: 100%;
  overflow: auto;
  flex-grow: 1;
  flex-direction: column;
`

export const listTitleContainerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding: 24px 0 40px;
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.06);
  z-index: 1;
`

export const teamInfoContainerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`
export const teamAvatarStyle = css`
  width: 64px;
  height: 64px;
  flex-shrink: 0;
`

export const teamNameStyle = css`
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  color: ${getColor("grayBlue", "02")};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

// contentBody

export const contentContainerStyle = css`
  width: 100%;
  padding: 0 68px 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`

export const listFilterContainerStyle = css`
  display: flex;
  justify-content: space-between;
  position: sticky;
  top: 0;
  padding: 24px 68px;
  background: ${getColor("white", "01")};
`

export const loadingStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`

export const listContainerStyle = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(${agent_card_width}px, 1fr));
  grid-gap: 24px 24px;
  padding: 0 68px 24px;
`

export const applyShowStyle = (show: boolean) => {
  return show
    ? css``
    : css`
        display: none;
      `
}
