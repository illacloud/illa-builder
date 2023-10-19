import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const navStyle = css`
  position: absolute;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24rem 12rem;
  background: ${getColor("white", "01")};
  z-index: 2;
`

export const wrapperStyle = css`
  font-size: 32rem;
  line-height: 44rem;
`
export const contentStyle = css`
  height: calc(var(--dvh, 1vh) * 100);
  padding: 136rem 0 8rem 0;
  font-size: 28rem;
  overflow: auto;
`
export const prevIconStyle = css`
  font-size: 40rem;
  margin: 20rem;
  cursor: pointer;
`

export const applyContentStyle = (withoutPadding?: boolean) => {
  return css`
    ${contentStyle};
    padding: ${withoutPadding ? "136rem 0 0" : `136rem 32rem 8rem`};
  `
}

export const mobileTitleStyle = css`
  width: 100%;
  padding: 8rem 0 40rem 0;
  margin-bottom: 40rem;
  color: ${getColor("grayBlue", "02")};
  font-size: 48rem;
  font-weight: 600;
`
