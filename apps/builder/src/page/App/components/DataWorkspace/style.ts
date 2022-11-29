import { SerializedStyles, css } from "@emotion/react"

export function applyJsonValueColorStyle(type: any): SerializedStyles {
  switch (type) {
    case "number":
      return css`
        color: #164;
      `
    case "boolean":
      return css`
        color: #219;
      `
    case "string":
      return css`
        color: #219;
      `
    case "undefined":
      return css`
        color: #708;
      `
    case "function":
      return css`
        color: #05a;
      `
    case "symbol":
      return css`
        color: #00c;
      `
    case "bigint":
      return css`
        color: #170;
      `
    case "object":
      return css`
        color: #a50;
      `
    default:
      return css`
        color: #999;
      `
  }
}
