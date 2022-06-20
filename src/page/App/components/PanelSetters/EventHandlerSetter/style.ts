import { css } from "@emotion/react"
import { illaPrefix, globalColor } from "@illa-design/theme"
import { publicPaddingStyle } from "@/page/App/components/InspectPanel/style"

export const eventHandlerSetterWrapperStyle = publicPaddingStyle

export const headerWrapperStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
`

export const fontButtonWrapperStyle = css`
  display: flex;
  align-items: center;
  color: ${globalColor(`--${illaPrefix}-purple-01`)};
  cursor: pointer;
`

export const fontButtonStyle = css`
  margin-left: 8px;
`
