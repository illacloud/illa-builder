import { FC } from "react"
import { DocsIcon } from "@illa-design/icon"
import { css } from "@emotion/react"
import { Tag } from "@illa-design/tag"
import { HintTooltipProps } from "./interface"
import {
  mainTitleStyle,
  contentAreaStyle,
  titleTextStyle,
  docIconStyle,
  infoTextHeightStyle,
  docTextStyle,
  evaluationStyle,
} from "./styles"

export const HintTooltip: FC<HintTooltipProps> = (props) => {
  const { data } = props

  return (
    <>
      <div css={mainTitleStyle}>
        <div css={contentAreaStyle}>
          <div css={css(titleTextStyle)}>
            {data.name}
            {data.url ? (
              <a css={docIconStyle} href={data.url} target="_blank">
                <DocsIcon />
              </a>
            ) : null}
          </div>
          {data?.type?.length ? <div>{data?.type}</div> : null}
          {data?.doc?.length ? (
            <div css={css(docTextStyle, infoTextHeightStyle)}>{data.doc}</div>
          ) : null}
          {/*[TODO] Evaluate */}
          {/*<div css={css(evaluationStyle)}>Evaluates to</div>*/}
          {/*<Tag size="small">"Hello"</Tag>*/}
        </div>
      </div>
    </>
  )
}

HintTooltip.displayName = "HintTooltip"
