import { css } from "@emotion/react"
import { getColor, globalColor, illaPrefix } from "@illa-design/react"

export const componentContainerStyle = css`
  border-top: 1px solid ${globalColor(`--${illaPrefix}-grayBlue-08`)};
  width: 100%;
  height: 100%;
  padding-bottom: 40px;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
`
export const searchWrapperStyle = css`
  padding: 16px 16px 8px 16px;
`

export const sessionListContainerStyle = css`
  ${searchWrapperStyle};
  padding-top: 0;
  padding-bottom: 0;
  height: 100%;
  overflow-y: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const sessionContainerStyle = css`
  width: 100%;
  display: inline-flex;
  flex-direction: column;

  &:not(:nth-of-type(1)) {
    margin-top: 8px;
  }
`

export const sessionTitleStyle = css`
  height: 38px;
  width: 100%;
  font-size: 14px;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
`

export const componentListContainerStyle = css`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 88px);
  gap: 16px 8px;
`

export const itemContainerStyle = css`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 88px;
`

export const iconStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${globalColor(`--${illaPrefix}-grayBlue-09`)};
  cursor: grab;
  border-radius: 4px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-04`)};
  transition: background-color 200ms ease-in-out;
  padding: 8px;
  position: relative;
  overflow: hidden;
  &:hover {
    background-color: ${globalColor(`--${illaPrefix}-grayBlue-08`)};
  }
`

export const nameStyle = css`
  font-size: 12px;
  width: 100%;
  color: ${globalColor(`--${illaPrefix}-grayBlue-03`)};
  text-overflow: ellipsis;
  box-sizing: border-box;
  padding: 4px 4px 0 4px;
  overflow: hidden;
  text-align: center;
  line-height: 14px;
`

export const emptyContainerStyle = css`
  width: 100%;
  height: 319px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const upgradeIconStyle = css`
  position: absolute;
  padding: 2px 8px;
  top: 0;
  left: 0;
  color: ${getColor("techPurple", "03")};
  background-color: ${getColor("techPurple", "08")};
  display: flex;
  align-items: center;
  justify-content: center;
`
