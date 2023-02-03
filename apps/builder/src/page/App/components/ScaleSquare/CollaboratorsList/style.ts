import { SerializedStyles, css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/react"

export function applyUserAvatarStyle(
  background: string,
  type?: string,
): SerializedStyles {
  const basicStyle = css`
    display: inline-block;
    background: #${background};
    color: ${globalColor(`--${illaPrefix}-white-01`)};
    text-align: center;
    border-radius: 50%;
    flex-shrink: 0;
  `
  if (type === "list") {
    return css`
      ${basicStyle};
      width: 24px;
      height: 24px;
      line-height: 24px;
    `
  }
  return css`
    ${basicStyle};
    width: 14px;
    height: 14px;
    line-height: 14px;
  `
}

export const getComponentUsersListContainerStyle = (
  length: number,
  disableMargin: boolean,
) => {
  const minWidth = length >= 3 ? 32 : 14 * length + 4 * (length - 1)
  let marginStyle = css`
    margin-left: 8px;
  `
  if (disableMargin) {
    marginStyle = css``
  }
  return css`
    display: flex;
    ${marginStyle};
    gap: 4px;
    height: 16px;
    max-width: 50px;
    flex-shrink: 0;
    flex-grow: 1;
    justify-content: flex-start;
    align-self: center;
    overflow: hidden;
    align-items: center;
    min-width: ${minWidth}px;
  `
}

export const moreIconStyle = css`
  width: 14px;
  height: 14px;
  line-height: 14px;
  text-align: center;
  border-radius: 50%;
  background-color: ${globalColor(`--${illaPrefix}-white-06`)};
  color: ${globalColor(`--${illaPrefix}-white-01`)};
  display: flex;
  flex-grow: 0;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  & > svg {
    width: 8px;
    height: 8px;
  }
`

export const listContainerStyle = css`
  width: 154px;
  padding: 16px;
  left: 14px;
  top: -1px;
  max-height: 234px;
  overflow: scroll;
  position: absolute;
  border-radius: 8px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);
  background-color: ${globalColor(`--${illaPrefix}-white-01`)};
`

export const listItemStyle = css`
  height: 24px;
  display: flex;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  align-items: center;
  padding: 0;
  font-weight: 500;
  font-size: 12px;
  gap: 8px;
  flex: none;
  width: 100%;
  &:not(:last-child) {
    margin-bottom: 12px;
  }
`

export const listItemContentStyle = css`
  height: 22px;
  line-height: 22px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  margin-bottom: 12px;
  padding: 0;
  font-weight: 500;
  font-family: "PingFang SC";
  font-style: normal;
  font-size: 14px;
  width: 100%;
`

export const listItemNicknameStyle = css`
  height: 20px;
  line-height: 20px;
  font-size: 12px;
  font-family: "Inter";
  font-style: normal;
  flex-grow: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
