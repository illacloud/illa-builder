import { SerializedStyles, css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/react"
import alpha from "@/assets/alpha.svg"

export function applyCircleStyle(color: string): SerializedStyles {
  return css`
    &::after {
      top: 0;
      left: 0;
      content: "";
      position: absolute;
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

export const inListSetterWrapperStyle = css`
  width: 154px;
  height: 40px;
`

export const ButtonContentWrapperStyle = css`
  display: flex;
  width: 100%;
  height: 100%;
  cursor: pointer;
  align-items: center;
  border-radius: 8px;
  padding: 8px;

  :hover {
    background-color: ${globalColor(`--${illaPrefix}-grayBlue-09`)};
  }

  :active {
    background-color: ${globalColor(`--${illaPrefix}-grayBlue-08`)};
  }
`

export const colorContentStyle = css`
  width: 60px;
  margin-left: 17px;
  margin-right: 3px;
  text-align: left;
  font-size: 12px;
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
