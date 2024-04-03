import { css } from "@emotion/react"
import { getColor, globalColor, illaPrefix } from "@illa-design/react"

export const searchHeaderContainerStyle = css`
  width: 255px;
  min-width: 255px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${getColor("grayBlue", "08")};
`

export const addNewActionButtonStyle = css`
  flex-shrink: 1;
`

export const listContainerStyle = css`
  flex-grow: 1;
  width: 100%;
  height: 0;
  flex-shrink: 0;
  overflow-y: auto;
`

export const listStyle = css`
  width: 100%;
`

export const actionListEmptyStyle = css`
  margin: 8px 16px;
  padding: 8px 12px;
  font-size: 12px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-04`)};
  border-radius: 4px;
  border: dashed 1px ${globalColor(`--${illaPrefix}-grayBlue-08`)};
`

export const createDropListItemContainerStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const prefixIconContainerStyle = css`
  font-size: 16px;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const dropListWithUpgradeIconStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const upgradeContainerStyle = css`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${getColor("techPurple", "03")};
  font-size: 12px;
  font-style: normal;
  line-height: 20px;
`
