import { css, SerializedStyles } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const QueryListContainer = css`
  display: flex;
  flex-direction: column;
  width: 255px;
  border-right: 1px solid ${globalColor(`--${illaPrefix}-grayBlue-08`)};
`

export const QueryListHeader = css`
  height: 48px;
  display: flex;
  align-items: center;
  padding: 13px 16px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-06`)};
  justify-content: space-between;
`

export const HeaderTitle = css`
  flex: 1;
`

export const NewButton = css`
  background-color: ${globalColor(`--${illaPrefix}-brand-purple-07`)}!important;
  color: ${globalColor(`--${illaPrefix}-brand-purple-01`)}!important;
  justify-content: center;
  font-size: 14px;
  margin: 0 16px;
  height: 32px;
  border-radius: 8px !important;
  line-height: 32px;
  flex-shrink: 0;

  & > * {
    font-size: 14px !important;
  }

  &:hover {
    background-color: ${globalColor(
  `--${illaPrefix}-brand-purple-06`,
)}!important;
  }
`

export const FilterIconCss = css`
  margin-left: 10px;
`

export const NewButtonContentWrapper = css`
  display: flex;
  align-items: center;
`

export const AddIconInNewButton = css`
  margin-right: 8px;
`

export const QueryItemList = css`
  list-style: none;
  line-height: 40px;
  padding: 9px 16px;
  margin: 0;
  overflow: auto;
`

export const QueryItem = css`
  display: flex;
  align-items: center;
  cursor: pointer;
`

export const QueryItemIcon = css`
  position: relative;
`

export const QueryItemTitle = css`
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  flex: 1 1 0;
  display: flex;
  align-items: center;
  margin-left: 8px;
`

export const WarningIndicator = css`
  position: absolute;
  color: ${globalColor(`--${illaPrefix}-orange-06`)};
  bottom: 10px;
  right: 0;

  & > path:last-child {
    fill: ${globalColor(`--${illaPrefix}-orange-03`)};
  }
`

export const UpdatedIndicator = css`
  display: inline-block;
  height: 6px;
  width: 6px;
  border-radius: 50%;
  background-color: ${globalColor(`--${illaPrefix}-blue-03`)};
  margin-left: 10px;
`
export const QueryItemTime = css`
  color: ${globalColor(`--${illaPrefix}-grayBlue-06`)};
`
