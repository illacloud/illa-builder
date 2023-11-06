import { SerializedStyles, css } from "@emotion/react"

export function applyJsonValueColorStyle(
  type: unknown,
  canEdit?: boolean,
): SerializedStyles {
  let color = "#999"
  switch (type) {
    case "number":
      color = "#164"
      break
    case "boolean":
      color = "#219"
      break
    case "string":
      color = "#219"
      break
    case "undefined":
      color = "#708"
      break
    case "function":
      color = "#05a"
      break
    case "symbol":
      color = "#00c"
      break
    case "bigint":
      color = "#170"
      break
    case "object":
      color = "#a50"
      break
    default:
      color = "#999"
      break
  }
  return css`
    color: ${color};
    padding-right: ${canEdit ? "4px" : "0"};
  `
}

export const innerContainerStyle = css`
  width: 100%;
  height: 100%;
  overflow: auto;
`
