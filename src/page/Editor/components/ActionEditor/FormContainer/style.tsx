import { css } from "@emotion/react"
import { SerializedStyles } from "@emotion/serialize"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const ModalCSS = css`
  width: 696px;
  max-height: 900px;
  border-radius: 8px;
`

export const TitleCSS = css`
  font-size: 20px;
  font-weight: 500;
  line-height: 1.4;
  padding-bottom: 16px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  text-align: center;
`

export const CloseIconCSS = css`
  position: absolute;
  line-height: 0;
  font-size: 14px;
  top: 32.8px;
  right: 30.8px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  cursor: pointer;
`
