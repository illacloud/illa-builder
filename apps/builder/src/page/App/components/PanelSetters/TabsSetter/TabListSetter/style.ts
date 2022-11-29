import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/react"

export const setterPublicWrapper = css`
  padding: 8px 16px;
  width: 100%;
`

export const viewSetterWrapperStyle = css`
  width: 100%;
  border-radius: 8px;
  border: 1px solid ${globalColor(`--${illaPrefix}-grayBlue-08`)};
`

export const HeaderWrapperStyle = css`
  width: 100%;
  background-color: ${globalColor(`--${illaPrefix}-grayBlue-09`)};
  padding: 8px 8px 8px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const HeaderLabelStyle = css`
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  font-weight: 500;
  font-size: 14px;
`

export const labelAndDragIconWrapperStyle = css`
  display: flex;
  align-items: center;
  flex: 0;
`

export const labelWrapperStyle = css`
  display: flex;
  gap: 8px;
  align-items: center;
  white-space: nowrap;
`

export const actionWrapperStyle = css`
  display: flex;
  align-items: center;
  gap: 16px;
`

export const iconStyle = css`
  cursor: pointer;
  width: 16px;
  height: 16px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-04`)};
`

export const copyIconStyle = css`
  ${iconStyle};
  visibility: hidden;
`

export const moveIconStyle = css`
  cursor: move;
  color: ${globalColor(`--${illaPrefix}-grayBlue-04`)};
  width: 16px;
  height: 16px;
  visibility: hidden;
`

export const listItemTriggerWrapperStyle = css`
  width: 100%;
  height: 40px;
  padding: 9px 16px 9px 0;
  display: flex;
  justify-content: space-between;
  user-select: none;
  :hover {
    #dragIcon {
      visibility: visible;
    }
    #copyIcon {
      visibility: visible;
    }
  }
`
