import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const spanBreadcrumbItemStyle = (last?: boolean) => {
  if (!last) {
    return css`
      cursor: pointer;
      &:hover {
        color: ${getColor("grayBlue", "02")};
        font-weight: 500;
      }
    `
  }
}
