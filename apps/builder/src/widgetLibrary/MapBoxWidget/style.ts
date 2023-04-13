import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const applyInput = `
    background: #fff;
    position: absolute;
    width: 30%;
    border-radius: 8px;
    margin-top: 20px;
    left: 50%;
    transform: translateX(-50%);
`
export const ApplyLoadingStyle = css`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${getColor("black", "01")};
`

export const applyMapContainer = css`
  width: 100%;
  height: 100%;
`

export const applyValidStyle = css`
  position: absolute;
`
