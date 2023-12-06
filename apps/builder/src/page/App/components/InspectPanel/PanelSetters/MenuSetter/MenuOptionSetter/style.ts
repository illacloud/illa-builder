import { css } from "@emotion/react"
import { getColor, globalColor, illaPrefix } from "@illa-design/react"

export const menuOptionSetterContainerStyle = css`
  box-sizing: border-box;
  margin: 8px 16px;
  min-height: 264px;
  border-radius: 8px;
  border: 1px solid ${getColor("grayBlue", "08")};
  overflow: hidden;
`

export const optionListHeaderStyle = css`
  width: 100%;
  background-color: ${globalColor(`--${illaPrefix}-grayBlue-09`)};
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  color: ${getColor("grayBlue", "02")};
  font-weight: 500;
  box-sizing: border-box;
  padding: 0 8px 0 16px;
`

export const optionSubItemStyle = css`
  cursor: pointer;
  padding: 0 8px;
  font-size: 14px;
  height: 24px;
  display: inline-flex;
  color: ${getColor("techPurple", "03")};
  align-items: center;
  flex-direction: row;
`

export const setterSubMenuAllContainerStyle = css`
  display: flex;
  flex-direction: column;
`

export const setterSubMenuContainerStyle = css`
  height: 40px;
  width: 100%;
  cursor: pointer;
  display: flex;
  padding-right: 8px;
  flex-direction: row;
  box-sizing: border-box;
  align-items: center;
  .dragIcon {
    visibility: hidden;
  }
  &:hover {
    .dragIcon {
      visibility: visible;
    }
  }
`

export const setterMenuItemContainerStyle = css`
  height: 40px;
  cursor: pointer;
  width: 100%;
  padding-left: 16px;
  padding-right: 8px;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  align-items: center;
  .dragIcon {
    visibility: hidden;
  }
  &:hover {
    .dragIcon {
      visibility: visible;
    }
  }
`

export const setterSubMenuLabelStyle = css`
  font-weight: 400;
  width: 100%;
  height: 100%;
  line-height: 40px;
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${getColor("grayBlue", "02")};
  font-size: 14px;
`

export const setterDivStyle = css`
  flex-grow: 1;
`

export const removeNativeStyle = css`
  list-style: none;
  padding: 0;
  margin: 0;
`

export const deleteButtonContainer = css`
  padding: 0 16px 16px 16px;
`
