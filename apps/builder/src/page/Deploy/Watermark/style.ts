import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const deployLogoStyle = css`
  position: absolute;
  bottom: 16px;
  right: 16px;
  box-shadow: 0 0 8px 0 ${getColor("blackAlpha", "07")};
  border: solid 1px ${getColor("grayBlue", "09")};
  border-radius: 8px;
  font-size: 12px;
  padding: 0 12px;
  height: 40px;
  display: flex;
  align-items: center;
  font-weight: 500;
  cursor: pointer;
  background-color: ${getColor("white", "01")};
  gap: 8px;
`
export const logoStyle = css`
  width: 25px;
  height: 12px;
`

export function applyPopupStateStyle(openState: boolean) {
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
  color: ${getColor("grayBlue", "03")};
  ${upgradeBgStyle};
`

export const upgradeTitleStyle = css`
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  color: ${getColor("grayBlue", "02")};
`

export const upgradeConfigStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 8px;
  ${upgradeBgStyle};
`
