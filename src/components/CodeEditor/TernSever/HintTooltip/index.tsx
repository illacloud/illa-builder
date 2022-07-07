import { FC, useRef } from "react"
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
import { TypeQueryResult } from "tern/lib/tern"
import { useSelector } from "react-redux"
import { getExecution } from "@/redux/currentApp/executionTree/execution/executionSelector"
import { get } from "lodash"

export interface TransQuery {
  type: string
  name?: string
  doc?: string
  url?: string
  path?: string
}

const handleTernCompletions = (data: TypeQueryResult): TransQuery => {
  const result: TransQuery = data ?? {}
  if (data.doc?.slice(0, 1) === "{") {
    const format = JSON.parse(data.doc)
    result["path"] = format.path
    result["name"] = format.path
    result["doc"] = format.doc ?? ""
  }
  return result
}

export const HintTooltip: FC<HintTooltipProps> = (props) => {
  const { current: data } = useRef(handleTernCompletions(props.data))
  const { globalData: executionResult = {} } = props

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
          {data?.path?.length ? (
            <div>
              <div css={css(evaluationStyle)}>Evaluates to</div>
              <Tag size="small">
                {get(executionResult, data.path)?.toString()}
              </Tag>
            </div>
          ) : null}
        </div>
      </div>
    </>
  )
}

HintTooltip.displayName = "HintTooltip"
