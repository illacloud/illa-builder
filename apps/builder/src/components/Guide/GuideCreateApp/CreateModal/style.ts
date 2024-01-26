import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const containerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  position: relative;
`

export const headerStyle = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const closeIconStyle = css`
  position: absolute;
  right: 24px;
  top: 24px;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const titleStyle = css`
  color: ${getColor("grayBlue", "02")};
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
`

export const descStyle = css`
  color: ${getColor("grayBlue", "03")};
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
`

export const operateContainerStyle = css`
  width: 100%;
  display: flex;
  gap: 16px;
`

export const createOptionsContainerStyle = (bgColor: string) => css`
  display: flex;
  color: ${getColor("white", "01")};
  border-radius: 8px;
  align-items: center;
  background-color: ${bgColor};
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px;
  cursor: pointer;
  height: 118px;
  width: 200px;
  padding: 24px;
  flex-direction: column;
  text-align: center;
  gap: 8px;
`
export const iconStyle = css`
  display: flex;
  padding: 12px;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 50%;
  background-color: ${getColor("white", "07")};
  position: relative;
`
