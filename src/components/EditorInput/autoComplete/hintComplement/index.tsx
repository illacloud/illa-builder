import { FC, Fragment, useEffect } from "react"
import { HintComplementProps } from "./interface"
import { ArrayIcon } from "@illa-design/icon"
import {
  mainTitleStyle,
  contentAreaStyle,
  titleTextStyle,
  containerTextStyle,
  mainTextHeightStyle,
  infoTextHeightStyle,
} from "./styles"
import { css } from "@emotion/react"
import { Tag } from "@illa-design/tag"

export const HintComplement: FC<HintComplementProps> = (props) => {
  const { index } = props

  useEffect(() => {
    console.log("index", index)
  }, [index])

  return (
    <Fragment>
      <div css={mainTitleStyle}>
        <div css={contentAreaStyle}>
          <div css={css(titleTextStyle, mainTextHeightStyle)}>
            bccInput.value
          </div>
          <div css={css(containerTextStyle, infoTextHeightStyle)}>
            valueCurrent value entered in the
          </div>
        </div>
        <ArrayIcon _css={mainTextHeightStyle} />
      </div>
      <div css={mainTitleStyle}>
        <div css={contentAreaStyle}>
          <div css={css(titleTextStyle, mainTextHeightStyle)}>Evaluates to</div>
          <Tag>"Hello"</Tag>
        </div>
        <div css={css(containerTextStyle, mainTextHeightStyle)}>String</div>
      </div>
    </Fragment>
  )
}
