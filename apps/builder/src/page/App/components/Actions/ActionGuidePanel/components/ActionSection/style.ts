import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const categoryTitleStyle = css`
  padding: 0;
  padding-top: 16px;
  padding-bottom: 8px;
  color: ${getColor("grayBlue", "04")};
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  margin: 0;
`

export const headerContainerStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 536px;
`

export const categoryItemContainerStyle = css`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(3, 168px);
`

export const basicButtonStyle = css`
  display: flex;
  width: 100%;
  padding: 8px 16px;
  gap: 12px;
  align-items: center;
  border: 1px solid ${getColor("grayBlue", "08")};
  border-radius: 8px;
  background-color: white;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    box-shadow: 0 4px 10px 0 ${getColor("blackAlpha", "07")};
    background-color: ${getColor("techPurple", "08")};
    border-color: ${getColor("techPurple", "03")};
  }
`

export const categoryItemNameStyle = css`
  font-weight: 500;
  font-size: 12px;
  line-height: 20px;
  color: ${getColor("grayBlue", "02")};
`
