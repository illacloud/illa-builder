import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const multiSelectedPanelWrapper = css`
  padding: 0 16px;
  width: 100%;
  font-size: 14px;
  height: calc(100% - 1px);
  display: flex;
  flex-direction: column;
  padding-bottom: 8px;
`

export const formHeaderStyle = css`
  height: 48px;
  display: flex;
  align-items: center;
  color: ${getColor("grayBlue", "02")};
  font-weight: 600;
  flex: none;
`

export const formContentStyle = css`
  overflow: auto;
  width: 100%;
  margin-bottom: 16px;
  border: 1px solid ${getColor("grayBlue", "08")};
  padding: 8px 16px;
  border-radius: 8px;
`

export const formContentItemStyle = css`
  :not(:nth-of-type(1)) {
    margin-top: 8px;
  }
  line-height: 22px;
  color: ${getColor("grayBlue", "02")};
`
