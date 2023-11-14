import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const guidePanelOutContainerStyle = css`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 24px 16px;
  overflow-x: auto;
`

export const guidePanelContainerStyle = css`
  width: 584px;
  height: 100%;
  position: relative;
  margin: 0 auto;
`

export const loadingContainerStyle = css`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${getColor("white", "03")};
`
