export * from "./QueryList"
export * from "./QueryEditorPanel"
import { css } from "@emotion/react"
import { SerializedStyles } from "@emotion/serialize"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const QueryEditorContainer = css`
  display: flex;
  height: 100%;
  border-top: 1px solid ${globalColor(`--${illaPrefix}-grayblue-08`)};
  `
