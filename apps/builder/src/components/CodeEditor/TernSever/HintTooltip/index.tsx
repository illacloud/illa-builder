import { FC, useRef } from "react"
import { css } from "@emotion/react"
import { DocsIcon } from "@illa-design/icon"
import { Tag } from "@illa-design/tag"
import { Trigger } from "@illa-design/trigger"
import { isArray, isObject, isString } from "@illa-design/system"
import { HintTooltipProps, TransQuery } from "./interface"
import {
  contentAreaStyle,
  docIconStyle,
  docTextStyle,
  evaluationContentStyle,
  evaluationStyle,
  evaluationTriggerStyle,
  infoTextHeightStyle,
  mainTitleStyle,
  titleTextStyle,
} from "./styles"
import { TypeQueryResult } from "tern/lib/tern"
import { transTypeFromTern } from "@/components/CodeEditor/TernSever"

const formatEvaluate = (data: any) => {
  let format = ""
  for (const key in data) {
    let current = data[key]
    if (isObject(current)) {
      current = "#Object#"
    } else if (isArray(current)) {
      current = "#Array#"
    } else if (isString(current)) {
      current = `"${current}"`
    }
    format = format + `  ${key}: ${current},\n`
  }
  if (format) {
    format = `\n${format}`
  }
  return format
}

const Evaluate: FC<{ type: string; data?: any }> = (props) => {
  const { type, data } = props

  return (
    <Trigger
      _css={css`
        padding-right: 4px;
        z-index: 10;
      `}
      content={
        <div css={evaluationTriggerStyle}>
          {type === "Array"
            ? `[${formatEvaluate(data)}]`
            : `Object {${formatEvaluate(data)}}`}
        </div>
      }
      withoutPadding
      colorScheme={"white"}
      position="right"
      openDelay={10}
      closeDelay={10}
      showArrow={false}
      trigger="hover"
    >
      <Tag size="small">{type === "Array" ? "[ ... ]" : "{ ... }"}</Tag>
    </Trigger>
  )
}

const handleTernCompletions = (data: TypeQueryResult): TransQuery => {
  const result: TransQuery = data ?? {}
  const doc = atob(data?.doc ?? "")
  if (doc?.slice(0, 1) === "{") {
    const format = JSON.parse(doc)
    result["data"] = format.data
    result["path"] = format.path
    result["name"] = format.path
    result["doc"] = format.doc ?? ""
  }
  if (result?.data) {
    result["type"] = transTypeFromTern(data.type, result.data)
  } else {
    result["type"] = transTypeFromTern(data.type)
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
              <a
                css={docIconStyle}
                href={data.url}
                target="_blank"
                rel="noreferrer"
              >
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
            <div css={evaluationContentStyle}>
              <div css={css(evaluationStyle)}>Evaluates to</div>
              {data.type === "Array" || data.type === "Object" ? (
                <Evaluate type={data.type} data={data.data} />
              ) : data.type === "String" ? (
                <Tag size="small">{`"${data.data}"`}</Tag>
              ) : (
                <Tag size="small">{data.data?.toString()}</Tag>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </>
  )
}

HintTooltip.displayName = "HintTooltip"
