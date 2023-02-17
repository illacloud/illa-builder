import { css } from "@emotion/react"

export const pdfContainerStyle = css`
  position: relative;
  width: 100%;
  height: 100%;
`
export const pdfStyle = css`
  width: 100%;
  height: 100%;
  overflow: auto;
  scroll-snap-type: y mandatory;
  display: flex;
`

export const documentInitStyle = css`
  margin: 0 auto;
`

export const toolBarStyle = css`
  position: fixed;
  bottom: 0;
`
