import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/react"

export const valueLabelStyle = css`
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 14px;
  line-height: 22px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
`

export const optionContentStyle = css`
  width: 160px;
  padding: 8px 0;
  font-size: 14px;
  line-height: 22px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
`

export const optionItemStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${globalColor(`--${illaPrefix}-grayBlue-09`)};
  }

  & > svg {
    width: 16px;
    height: 16px;
  }
`

export const optionLabelStyle = css`
  display: flex;
  gap: 4px;
  align-items: center;
`

export const pointerStyle = css`
  cursor: pointer;
`
