import { css } from "@emotion/react"
import { illaPrefix, globalColor } from "@illa-design/theme"
import { publicPaddingCss } from "@/page/Editor/components/InspectPanel/style"

export const eventHandlerSetterWrapperCss = publicPaddingCss

export const headerWrapperCss = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
`

export const fontButtonWrapperCss = css`
  display: flex;
  align-items: center;
  color: ${globalColor(`--${illaPrefix}-purple-01`)};
  cursor: pointer;
`

export const fontButtonCss = css`
  margin-left: 8px;
`
