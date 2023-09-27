import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const listWrapperStyle = css`
  display: flex;
  flex-direction: column;
  gap: 20px;
`
export const valueLabelStyle = css`
  display: flex;
  gap: 4px;
  align-items: center;
  font-size: 14px;
  line-height: 22px;
  font-weight: 500;
  width: 110px;
  color: ${getColor("grayBlue", "02")};
`

export const optionContentStyle = css`
  cursor: pointer;
  min-width: 110px;
  padding: 8px 0;
  font-size: 14px;
  line-height: 22px;
  font-weight: 500;
  color: ${getColor("grayBlue", "02")};
`

export const publicButtonWithTagStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const optionItemStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${getColor("grayBlue", "09")};
  }

  & > svg {
    width: 16px;
    height: 16px;
  }
`

export const pointerStyle = css`
  cursor: pointer;
`
