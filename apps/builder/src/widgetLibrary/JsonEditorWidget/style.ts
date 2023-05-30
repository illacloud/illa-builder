import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const baseContainerStyle = css`
  .jsoneditor-parse-error-icon {
    display: none !important;
  }
  .ace_editor {
    padding: 8px;
  }
  .ace_gutter, .jsoneditor-statusbar {
    background: transparent;
  }
  .ace_gutter {
    border-right: 1px solid ${getColor("grayBlue", "08")};
  }
  .ace_active-line, .ace_gutter-active-line {
    background: ${getColor("blue", "07")} !important;
  }
  .jsoneditor, .jsoneditor-statusbar {
    border-color: ${getColor("grayBlue", "08")};
  }
  .ace_gutter-cell, .jsoneditor-statusbar, .ace_variable {
    color: ${getColor("grayBlue", "02")};
  }
  .ace_string {
    color: ${getColor("blue", "03")};
  }
  .ace_numeric {
    color: ${getColor("green", "01")} !important;
  }
  .ace_boolean {
    color: ${getColor("yellow", "01")} !important;
  }
  .
`
