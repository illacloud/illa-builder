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

export const headerStyle = css`
  color: ${getColor("grayBlue", "02")};
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  width: 552px;
  margin: 0;
  padding: 0;
`

export const categoryTitleStyle = css`
  padding: 0;
  padding-top: 16px;
  padding-bottom: 8px;
  color: ${getColor("grayBlue", "04")};
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  margin: 0;
  width: 552px;
`

export const categoryItemContainerStyle = css`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(3, 173px);
`

export const basicButtonStyle = css`
  display: flex;
  width: 100%;
  height: 48px;
  padding: 12px 16px;
  gap: 12px;
  align-items: center;
  border: 1px solid ${getColor("grayBlue", "08")};
  border-radius: 8px;
  background-color: white;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    box-shadow: 0 4px 10px 0 ${getColor("blackAlpha", "07")};
    background-color: ${getColor("techPurple", "07")};
    border-color: ${getColor("techPurple", "01")};
  }
`

export const iconHotSpot = css`
  font-size: 16px;
  padding: 4px;
  display: block;
  width: 24px;
  height: 24px;
  color: ${getColor("techPurple", "01")};
`

export const moreTipsStyle = css`
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  color: ${getColor("techPurple", "01")};
`

export const categoryItemNameStyle = css`
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  color: ${getColor("grayBlue", "02")};
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
