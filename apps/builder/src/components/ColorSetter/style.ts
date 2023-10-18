import { SerializedStyles, css } from "@emotion/react"
import { getColor, globalColor, illaPrefix } from "@illa-design/react"
import alpha from "@/assets/alpha.svg"

export const circleHotSpotStyle = css`
  width: 24px;
  height: 24px;
  padding: 4px;
  display: flex;
  align-items: center;
`

export function applyCircleStyle(color: string): SerializedStyles {
  return css`
    &::after {
      content: "";
      display: inline-block;
      background-color: ${color};
      width: 16px;
      height: 16px;
    }

    background-image: url(${alpha});
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 1px solid ${globalColor(`--${illaPrefix}-grayBlue-08`)};
    overflow: hidden;
    flex: none;
  `
}

export const colorTipAndValueContainerStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const buttonContentWrapperStyle = (
  setterSize: "small" | "medium",
) => css`
  display: flex;
  width: ${setterSize === "medium" ? "182px" : "170px"};
  cursor: pointer;
  align-items: center;
  border-radius: 8px;
  padding: 3px 12px 3px 12px;
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
