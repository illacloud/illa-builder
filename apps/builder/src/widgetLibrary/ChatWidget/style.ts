import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const resizeLineStyle = css`
  width: 100%;
  height: 1px;
  background-color: #e5e5e5;
  cursor: row-resize;
  position: absolute;
`
export const footerStyle = css`
  height: 100%;
  width: 100%;
  overflow: hidden;
`
export const chatContainerStyle = (backgroundColor: string) => css`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${backgroundColor};
`

export const messageHeaderStyle = (isOwn: boolean) => {
  return css`
    width: 100%;
    display: flex;
    flex-direction: ${isOwn ? "row-reverse" : "row"};
    gap: 8px;
    justify-content: flex-start;
    align-items: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 4px;
  `
}
export const messageHeaderNameStyle = css`
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  color: ${getColor("grayBlue", "02")};
`

export const messageHeaderTimeStyle = css`
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: ${getColor("grayBlue", "03")};
`
export const messageContentStyle = css`
  .cs-message__content-wrapper {
    margin-top: 12px;
  }
  .cs-message__footer {
    margin: 0;
  }
  .cs-message__content {
    height: auto;
    width: auto;
    border-radius: 0;
    padding: 0;
    background-color: transparent;
  }
  .cs-message__avatar {
    margin-top: 12px;
    width: 32px;
    margin-right: 16px;
    .cs-avatar {
      height: 32px;
      width: 32px;
      min-height: 32px;
      min-width: 32px;
    }
  }
  .cs-message__custom-content {
    padding-bottom: 8px;
  }
`
export const messageItemContainerStyle = css`
  display: flex;
  flex-shrink: 1;
`
export const messageTextStyle = (
  isOwn: boolean,
  leftMessageColor: string,
  rightMessageColor: string,
) => {
  const backgroundColor = isOwn
    ? getColor(rightMessageColor, "03")
    : getColor(leftMessageColor, "09")
  const color = isOwn ? getColor("white", "01") : getColor("grayBlue", "02")

  return css`
    background-color: ${backgroundColor
      ? backgroundColor
      : getColor(leftMessageColor, "07")};
    color: ${color}!important;
    padding: 8px 12px;
    border-radius: 8px;
    max-width: 344px;
    word-wrap: break-word;
    span,
    a {
      color: ${color};
    }
  `
}

export const receivingStyle = (leftMessageColor: string) => {
  const backgroundColor = getColor(leftMessageColor, "09")
  return css`
    padding: 8px 12px;
    border-radius: 8px;
    width: 40px;
    height: 33px;
    background-color: ${backgroundColor
      ? backgroundColor
      : getColor(leftMessageColor, "07")};
    color: ${getColor("grayBlue", "02")}!important;
    &:before {
      content: "";
      animation: dotAnimate 1s infinite;
    }
    @keyframes dotAnimate {
      0%,
      100% {
        content: "";
      }
      25% {
        content: ".";
      }
      50% {
        content: "..";
      }
      75% {
        content: "...";
      }
    }
  `
}

export const contentContainerStyle = css`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: end;
`
export const sendingStyle = css`
  height: 16px;
  width: 16px;
  animation: sendAnimate 1s ease-in-out infinite;
  @keyframes sendAnimate {
    0% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(90deg);
    }
    50% {
      transform: rotate(180deg);
    }
    75% {
      transform: rotate(270deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

export const replayMessageStyle = css`
  & > div {
    max-width: 344px;
    display: flex;
    flex-direction: column;
    flex-shrink: 1;
    padding: 8px 12px;
    gap: 4px;
    border: 1px solid ${getColor("grayBlue", "08")};
    border-radius: 8px;
  }
`
export const replayImageStyle = css`
  width: 200px;
  height: 100px;
  background-color: ${getColor("grayBlue", "09")};
  img {
    width: 100%;
    height: 100%;
    object-fit: scale-down;
  }
`

export const replayNameStyle = css`
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: ${getColor("grayBlue", "02")};
`
export const replayTextStyle = css`
  max-height: 200px;
  overflow-y: auto;
  word-wrap: break-word;
`

export const receivingContainerStyle = css`
  display: flex;
  flex-direction: row;
  gap: 16px;
  padding: 8px 0;
`

export const receivingAvatarStyle = css`
  height: 32px;
  width: 32px;
  background-color: ${getColor("grayBlue", "09")};
  border-radius: 50%;
`

export const optionsStyle = (isAllShow: boolean) => {
  console.log("isAllShow", isAllShow)
  return css`
    background-color: ${getColor("white", "01")};
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    display: flex;
    border-radius: 4px;
    flex-direction: row;
    border: 1px solid ${getColor("grayBlue", "08")};
    & div {
      padding: 6px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
    & div:last-of-type {
      border-left: ${isAllShow
        ? `1px solid ${getColor("grayBlue", "08")}`
        : "none"};
    }
    & div:hover {
      background-color: ${getColor("grayBlue", "08")};
    }
  `
}
