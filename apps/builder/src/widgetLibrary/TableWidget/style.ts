import { css } from "@emotion/react"

export const overFlowStyle = css`
  & > span {
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

export const applyIconContainerStyle = (
  colorScheme?: string,
  disabled?: boolean,
) => {
  const svgColor = colorScheme
    ? css`
        color: ${colorScheme};
      `
    : css``
  return css`
    width: 16px;
    ${svgColor};
    cursor: ${disabled ? "not-allowed" : "pointer"};

    &:not(:last-of-type) {
      margin-right: 4px;
    }
  }
  `
}
