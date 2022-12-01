import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/react"
import { publicPaddingStyle } from "@/page/App/components/InspectPanel/style"

export const optionListHeaderStyle = css`
  width: 100%;
  background-color: ${globalColor(`--${illaPrefix}-grayBlue-09`)};
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  font-weight: 500;
  box-sizing: border-box;
  ${publicPaddingStyle}
`

export const headerActionButtonStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${globalColor(`--${illaPrefix}-purple-01`)};
  cursor: pointer;
  font-weight: 400;
`

export const addIconStyle = css`
  font-size: 12px;
`

export const ListStyle = css`
  border: 1px solid ${globalColor(`--${illaPrefix}-grayBlue-08`)};
  margin: 0 16px;
  border-radius: 8px;
`

export const optionListItemStyle = css`
  display: flex;
  justify-content: space-between;
  padding-right: 16px;
  height: 40px;
  align-items: center;
  cursor: pointer;

  &:hover {
    .movableIconWrapper {
      opacity: 1;
    }
  }
`

export const labelNameAndIconStyle = css`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`

export const labelNameWrapperStyle = css`
  font-size: 14px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
`

export const movableIconWrapperStyle = css`
  opacity: 0;
  cursor: grab;
  display: flex;
  align-items: center;
  color: ${globalColor(`--${illaPrefix}-grayBlue-04`)};
`

export const emptyEmptyBodyStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-04`)};
`
