import {
  Completion,
  CompletionContext,
  CompletionResult,
} from "@codemirror/autocomplete"
import { CompletionsQuery, Def, Server } from "tern"
import {
  CODE_LANG,
  CODE_TYPE,
} from "@/components/NewCodeEditor/CodeMirror/extensions/interface"
import { getDynamicStringSegments } from "@/utils/evaluateDynamicString/dynamicConverter"
import ecmaScript from "./defs/ecmascript.json"

// @ts-ignore
const server = new Server({ defs: [ecmaScript] })

export enum AutocompleteDataType {
  OBJECT = "Object",
  NUMBER = "Number",
  ARRAY = "Array",
  FUNCTION = "Function",
  BOOLEAN = "Boolean",
  STRING = "String",
  UNKNOWN = "Unknown",
}

export function getDataType(type: string): AutocompleteDataType {
  if (type === "?") return AutocompleteDataType.UNKNOWN
  else if (type === "number") return AutocompleteDataType.NUMBER
  else if (type === "string") return AutocompleteDataType.STRING
  else if (type === "bool") return AutocompleteDataType.BOOLEAN
  else if (type === "array") return AutocompleteDataType.ARRAY
  else if (/^fn\(/.test(type)) return AutocompleteDataType.FUNCTION
  else if (/^\[/.test(type)) return AutocompleteDataType.ARRAY
  else if (type === "JSON" || type === "Math")
    return AutocompleteDataType.OBJECT
  else return AutocompleteDataType.UNKNOWN
}

export function checkCursorInBinding(
  context: CompletionContext,
  isFunction?: boolean,
): boolean {
  if (isFunction) {
    return true
  }
  const { state, pos } = context
  const doc = state.sliceDoc(0, pos)
  const segments = getDynamicStringSegments(doc)
  let cumCharCount = 0
  for (const segment of segments) {
    const start = cumCharCount
    const dynamicStartIndex = segment.indexOf("{{")
    const dynamicStartIdx = dynamicStartIndex + start + 2

    const dynamicEndIndex = segment.indexOf("}}")
    const dynamicEndIdx = dynamicEndIndex + start

    if (
      dynamicStartIndex > -1 &&
      dynamicStartIdx <= pos &&
      (dynamicEndIndex <= -1 || pos <= dynamicEndIdx)
    ) {
      return true
    }

    cumCharCount += segment.length
  }
  return false
}

export const ternSeverCompletionSource = (
  lang: CODE_LANG,
  codeType: CODE_TYPE,
): ((
  context: CompletionContext,
) => CompletionResult | Promise<CompletionResult | null> | null) => {
  const isFunction = codeType === CODE_TYPE.FUNCTION
  return (context: CompletionContext) => {
    const isCursorInBinding = checkCursorInBinding(context, isFunction)
    if (!isCursorInBinding) {
      return null
    }
    if (
      context.matchBefore(/\w[\w\.]*/) === null &&
      (isFunction || context.matchBefore(/\{\{\s*/) === null)
    ) {
      return null
    }
    const state = context.state
    const pos = context.pos
    const query: CompletionsQuery = {
      type: "completions",
      types: true,
      docs: true,
      urls: true,
      origins: true,
      caseInsensitive: true,
      guess: false,
      inLiteral: false,
      includeKeywords: true,
      end: pos,
      file: "#0",
    }
    const files = [
      {
        type: "full",
        name: "_temp",
        text: state.sliceDoc(),
      },
    ]

    const request = { query, files }
    let error
    let data: any
    server.request(request as any, (rError, rData) => {
      error = rError
      data = rData
    })

    if (error || data.completions.length === 0) {
      return null
    }
    const options = []
    for (const completion of data.completions) {
      const dataType = getDataType(completion.type)
      const completionOption: Completion = {
        type: dataType,
        label: completion.name,
        detail: dataType,
        boost: -1,
      }
      if (isFunction || lang !== CODE_LANG.JAVASCRIPT) {
        completion.info =
          completion.doc === undefined
            ? undefined
            : (complete: Completion) => {
                let dom = document.createElement("span")
                dom.innerHTML = `<div class="completionInfoCardTitle">
        <span class="cardTitle">${completion.name}</span>
        <a
          class="openInfo"
          href=${completion.url}
          target="_blank"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M6.5 5C6.22386 5 6 4.77614 6 4.5L6 2L3 2L3 10L9 10L9 5L6.5 5ZM10 4.5V5L10 10.5C10 10.7761 9.77614 11 9.5 11L2.5 11C2.22386 11 2 10.7761 2 10.5L2 1.5C2 1.22386 2.22386 1 2.5 1L6 1L6.5 1L7 1.5L9.5 4L10 4.5ZM8.08579 4L7 2.91421L7 4H8.08579ZM4 7V6L8 6V7L4 7ZM4 9H7V8L4 8V9Z"
              fill="#654AEC"
            />
          </svg>
        </a>
      </div>
      <p class="completionInfoType">${completion.type}</p>
      <p class="completionInfoDoc">${completion.doc}</p>`
                return dom
              }
      }
      if (completion.doc) {
        options.push(completionOption)
      }
    }

    const completions = {
      from: data.start,
      validFor: /^\w*$/,
      options,
    }
    return completions
  }
}
