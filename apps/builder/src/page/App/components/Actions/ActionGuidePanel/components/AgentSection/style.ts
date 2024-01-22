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
  padding-bottom: 16px;
  grid-template-columns: repeat(2, 260px);
`

export const basicButtonStyle = css`
  display: flex;
  width: 100%;
  padding: 12px;
  gap: 8px;
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

export const titleAndContentContainerStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const titleStyle = css`
  display: inline-block;
  line-height: 16px;
  color: ${getColor("grayBlue", "02")};
  font-size: 12px;
  font-weight: 500;
  text-align: left;
`

export const descStyle = css`
  width: 196px;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 14px;
  font-size: 12px;
  color: ${getColor("grayBlue", "03")};
  font-weight: 400;
  text-align: left;
  word-break: break-all;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`
