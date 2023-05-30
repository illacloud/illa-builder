import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const containerStyle = css`
  height: 100%;
  cursor: auto;
  & {
    .wrapperClassName {
      height: 100%;
      display: flex;
      min-width: 440px;
      flex-direction: column;
    }
    .toolbarClassName {
      height: 100px;
      flex: 0;
    }
    .toolbarClassName > div {
      height: auto;
      width: auto;
    }
    .editorClassName {
      border: 1px solid ${getColor("grayBlue", "08")};
      padding: 0 8px;
      height: auto;
      cursor: text;
      flex-grow: 1;
    }
    .rdw-embedded-modal {
      height: auto;
    }
  }
`
