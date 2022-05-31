import { FC, useEffect } from "react"
import { HintComplementProps } from "./interface"

import { Trigger } from "@illa-design/trigger"
import {
  mainTitleStyle,
  contentAreaStyle,
  titleTextStyle,
  containerTextStyle,
  mainTextHeightStyle,
  infoTextHeightStyle,
} from "./styles"
import { css } from "@emotion/react"
import { ArrayIcon } from "../icon"
import { Tag } from "@illa-design/tag"

export const HintComplement: FC<HintComplementProps> = (props) => {
  const { ele, index } = props

  useEffect(() => {
    console.log(ele)
  }, [ele])

  useEffect(() => {
    console.log(index)
  }, [index])

  return (
    <Trigger
      position="left"
      colorScheme="white"
      showArrow={false}
      content={
        <div>
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
              <div css={css(titleTextStyle, mainTextHeightStyle)}>
                Evaluates to
              </div>
              <Tag>"Hello"</Tag>
            </div>
            <div css={css(containerTextStyle, mainTextHeightStyle)}>String</div>
          </div>
        </div>
      }
      popupVisible={true}
    >
      {ele}
    </Trigger>
  )
}
