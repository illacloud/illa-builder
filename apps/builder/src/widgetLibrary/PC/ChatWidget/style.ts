import { css } from "@emotion/react"
import {
  getColor,
  getSpecialThemeColor,
  hasNineStepColor,
} from "@illa-design/react"

export const resizeLineStyle = css`
  width: 100%;
  height: 1px;
  background-color: #e5e5e5;
  cursor: row-resize;
  position: absolute;
`
export const footerStyle = css`
  width: 100%;
  height: 100%;
  // overflow: hidden;
  display: flex;
  flex-direction: row;
`
export const chatContainerStyle = (backgroundColor: string) => css`
  height: 100%;
  padding-top: 16px;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  background-color: ${getSpecialThemeColor(backgroundColor)};
`

export const messageListContainerStyle = css`
  height: 100%;
  overflow: auto;
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
export const messageContentStyle = (isOwn: boolean, avatarPadding?: string) => {
  const finalAvatarPadding = !avatarPadding ? "32px" : avatarPadding

  return css`
    .cs-message__content-wrapper {
      margin-top: 12px;
      width: 100%;
    }
    .cs-message__footer {
      margin: 0;
    }
    .cs-message__content {
      height: auto;
      width: auto;
      border-radius: 0;
      padding: 0;
      background-color: transparent !important;
    }
    .cs-message__avatar {
      margin: ${isOwn
        ? `12px ${finalAvatarPadding} 0 16px`
        : `12px 16px 0 ${finalAvatarPadding}`} !important;
      width: 32px;
      .cs-avatar {
        height: 32px;
        width: 32px;
        min-height: 32px;
        min-width: 32px;
      }
    }
    .cs-message__custom-content {
      padding-bottom: 8px;
      display: flex;
    }
  `
}

export const messageFooterStyle = (isOwn: boolean) => css`
  flex-direction: ${isOwn ? "row-reverse" : "row"};
  width: 100%;
  & > div {
    width: 100%;
  }
`

export const messageItemContainerStyle = (isOwn: boolean) => css`
  width: 100%;
  flex-shrink: 1;
  display: flex;
  box-sizing: border-box;
  justify-content: ${isOwn ? "flex-end" : "flex-start"};
  padding-left: ${isOwn ? "40px" : "0"};
  padding-right: ${isOwn ? "0" : "40px"};
`
export const messageTextStyle = (
  isOwn: boolean,
  leftMessageColor: string,
  rightMessageColor: string,
) => {
  const backgroundColor = isOwn
    ? getSpecialThemeColor(rightMessageColor)
    : getColor(
        leftMessageColor,
        hasNineStepColor(leftMessageColor) ? "09" : "08",
      )
  const color = isOwn ? getColor("white", "01") : getColor("grayBlue", "02")

  return css`
    background-color: ${backgroundColor};
    color: ${color}!important;
    padding: 8px 12px;
    border-radius: 8px;
    max-width: 344px;
    word-wrap: break-word;
    display: inline-block;
    span,
    a {
      color: ${color};
    }
  `
}

export const receivingStyle = (leftMessageColor: string) => {
  const backgroundColor = getColor(
    leftMessageColor,
    hasNineStepColor(leftMessageColor) ? "09" : "08",
  )
  return css`
    padding: 8px 12px;
    border-radius: 8px;
    width: 40px;
    height: 33px;
    background-color: ${backgroundColor};
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

export const replyMessageStyle = css`
  padding-bottom: 8px;
  & > div {
    max-width: 344px;
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-shrink: 1;
    padding: 8px 12px;
    gap: 4px;
    border: 1px solid ${getColor("grayBlue", "08")};
    border-radius: 8px;
  }
`
export const replyImageStyle = css`
  width: 200px;
  height: 100px;
  background-color: ${getColor("grayBlue", "09")};
  img {
    width: 100%;
    height: 100%;
    object-fit: scale-down;
  }
`

export const replyNameStyle = css`
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: ${getColor("grayBlue", "02")};
`
export const replyTextStyle = css`
  max-height: 200px;
  overflow-y: auto;
  word-wrap: break-word;
`

export const receivingContainerStyle = css`
  display: flex;
  flex-direction: row;
  padding: 16px 40px 8px;
`

export const receivingAvatarStyle = css`
  height: 32px;
  width: 32px;
  margin-right: 16px;
  background-color: ${getColor("grayBlue", "09")};
  border-radius: 50%;
`

export const optionsStyle = (isAllShow: boolean) => {
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

export const loadingStyle = css`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${getColor("gray", "01")}; // ??
  color: ${getColor("black", "01")};
`
export const audioWrapperStyle = css`
  & > audio {
    &::-webkit-media-controls {
      justify-content: center;
    }
  }
`

export const audioStyle = (isReply?: boolean) => css`
  height: 50px;
  width: ${isReply ? "200px" : "50%"};
  max-width: ${isReply ? 320 : 344}px;
  min-width: 290px;
`

export const videoStyle = (isReply?: boolean) => css`
  height: 150px;
  width: ${isReply ? "200px" : "50%"};
  max-width: ${isReply ? 320 : 344}px;
  min-width: 290px;
`

export const sendImageStyle = css`
  width: 50%;
  max-width: 344px;
  min-width: 290px;
`

export const replyToStyle = css`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 8px;
  padding: 16px 24px;
  box-shadow: 0px -4px 12px 0px rgba(0, 0, 0, 0.04);
`
export const replyContent = css`
  overflow: hidden;
  color: ${getColor("grayBlue", "02")};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`

export const replyToHeaderStyle = css`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  color: ${getColor("blue", "03")};
  text-align: justify;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px;
  & > span:last-of-type {
    cursor: pointer;
  }
`
