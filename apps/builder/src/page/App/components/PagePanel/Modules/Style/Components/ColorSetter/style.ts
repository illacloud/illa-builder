import { SerializedStyles, css } from "@emotion/react"
import { getColor, globalColor, illaPrefix } from "@illa-design/react"
import alpha from "@/assets/alpha.svg"

export function applyCircleStyle(color: string): SerializedStyles {
  return css`
    &::after {
      content: "";
      display: inline-block;
      background-color: ${color};
      width: 100%;
      height: 100%;
    }

    background-image: url(${alpha});
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 1px solid ${globalColor(`--${illaPrefix}-grayBlue-08`)};
    flex: none;
    position: relative;
    overflow: hidden;
  `
}

export const colorTipAndValueContainerStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const buttonContentWrapperStyle = css`
  display: flex;
  width: 170px;
  cursor: pointer;
  align-items: center;
  border-radius: 8px;
  padding: 4px 12px 4px 8px;
  justify-content: space-between;
  border: 1px solid ${getColor("grayBlue", "08")};

  :hover {
    background-color: ${globalColor(`--${illaPrefix}-grayBlue-09`)};
  }

  :active {
    background-color: ${globalColor(`--${illaPrefix}-grayBlue-08`)};
  }
`

export const colorContentStyle = css`
  text-align: left;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  align-self: center;
  line-height: 24px;
  flex: none;
`

export const alphaContentStyle = css`
  font-size: 12px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  align-self: center;
  line-height: 24px;
  flex: none;
`
