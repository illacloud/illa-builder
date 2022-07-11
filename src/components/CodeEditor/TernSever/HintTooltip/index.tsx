import { FC, useRef } from "react"
import { css } from "@emotion/react"
import { DocsIcon } from "@illa-design/icon"
import { Tag } from "@illa-design/tag"
import { Trigger } from "@illa-design/trigger"
import { isArray, isObject, isString } from "@illa-design/system"
import { HintTooltipProps, TransQuery } from "./interface"
import {
  mainTitleStyle,
  contentAreaStyle,
  titleTextStyle,
  docIconStyle,
  infoTextHeightStyle,
  docTextStyle,
  evaluationStyle,
  evaluationContentStyle,
  evaluationTriggerStyle,
} from "./styles"
import { TypeQueryResult } from "tern/lib/tern"
import { transTypeFromTern } from "@/components/CodeEditor/TernSever"

const formatObjOrArr = (type: string, data: any) => {
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
  return (
    <Trigger
      _css={evaluationTriggerStyle}
      content={type === "Array" ? `[${format}]` : `Object {${format}}`}
      colorScheme={"techPurple"}
      position="right"
      openDelay={10}
      closeDelay={10}
      showArrow={false}
      trigger={"hover"}
      zIndex={11}
    >
      {type === "Array" ? "[ ... ]" : "{ ... }"}
    </Trigger>
  )
}

const formatEvaluate = (type: string, data?: any) => {
  switch (type) {
    case "String":
      return `"${data}"`
    case "Array":
    case "Object":
      return formatObjOrArr(type, data)
  }
  return data.toString()
}

const handleTernCompletions = (data: TypeQueryResult): TransQuery => {
  const result: TransQuery = data ?? {}
  if (data.doc?.slice(0, 1) === "{") {
    const format = JSON.parse(data.doc)
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
            <div css={evaluationContentStyle}>
              <div css={css(evaluationStyle)}>Evaluates to</div>
              <Tag size="small">{formatEvaluate(data.type, data.data)}</Tag>
            </div>
          ) : null}
        </div>
      </div>
    </>
  )
}

HintTooltip.displayName = "HintTooltip"
