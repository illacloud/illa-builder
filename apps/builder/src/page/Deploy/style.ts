import { SerializedStyles, css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/react"

export const deployContainerStyle = css`
  width: 100%;
  height: 100%;
  position: relative;
`

export const loadingStyle = css`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: absolute;
`

export function applyPopupStateStyle(openState?: boolean): SerializedStyles {
  const transform = openState
    ? css`
        transform: rotate(180deg);
      `
    : css`
        transform: rotate(0deg);
      `

  return css`
    margin-left: 8px;
    transition: transform 0.2s ease;
    ${transform};
  `
}

export const upgradeBgStyle = css`
  padding: 5px 4px;
`

export const upgradePopContainerStyle = css`
  text-align: center;
  font-size: 12px;
  line-height: 20px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-03`)};
  ${upgradeBgStyle};
`

export const upgradeTitleStyle = css`
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
`

export const upgradeConfigStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 8px;
  ${upgradeBgStyle};
`
