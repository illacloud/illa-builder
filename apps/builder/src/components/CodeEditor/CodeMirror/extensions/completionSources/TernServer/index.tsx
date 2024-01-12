import {
  Completion,
  CompletionContext,
  CompletionResult,
} from "@codemirror/autocomplete"
import { getStringSnippets } from "@illa-public/dynamic-string"
import { CompletionsQuery, Server } from "tern"
import { CompletionsQueryResult } from "tern/lib/tern"
import { CODE_TYPE } from "@/components/CodeEditor/CodeMirror/extensions/interface"
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
  else if (/^\[/.test(type)) return AutocompleteDataType.ARRAY
  else if (/^fn\(/.test(type)) return AutocompleteDataType.FUNCTION
  else return AutocompleteDataType.UNKNOWN
}

export function checkCursorInDynamicFlag(
  context: CompletionContext,
  isFunction?: boolean,
): boolean {
  if (isFunction) {
    return true
  }
  const { state, pos } = context
  const doc = state.sliceDoc(0, pos)
  const stringSnippets = getStringSnippets(doc)
  let nextDynamicStringStartIndex = 0
  for (let i = 0; i < stringSnippets.length; i++) {
    const snippet = stringSnippets[i]
    const start = nextDynamicStringStartIndex
    const dynamicStringStartIndex = snippet.indexOf("{{")
    const stringStartIndex = dynamicStringStartIndex + start + 2
    const dynamicStringEndIndex = snippet.indexOf("}}")
    const stringEndIndex = dynamicStringEndIndex + start
    if (
      dynamicStringStartIndex > -1 &&
      stringStartIndex <= pos &&
      (dynamicStringEndIndex <= -1 || pos <= stringEndIndex)
    ) {
      return true
    }
    nextDynamicStringStartIndex += snippet.length
  }
  return false
}

export const ternSeverCompletionSource = (
  canShowCompleteInfo: boolean,
  codeType: CODE_TYPE,
): ((
  context: CompletionContext,
) => CompletionResult | Promise<CompletionResult | null> | null) => {
  const isFunction =
    codeType === CODE_TYPE.FUNCTION || codeType === CODE_TYPE.NO_METHOD_FUNCTION
  return (context: CompletionContext) => {
    const isCursorInDynamicFlag = checkCursorInDynamicFlag(context, isFunction)
    if (!isCursorInDynamicFlag) {
      return null
    }
    if (
      context.matchBefore(/\w[\w\.]*/) === null &&
      (isFunction || context.matchBefore(/\{\{\s*/) === null)
    ) {
      return null
    }
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
      // @ts-ignore maybe this is a ternjs type error
      {
        type: "full",
        name: "_temp",
        text: context.state.sliceDoc(),
      },
    ]

    const request = { query, files }
    let error: string | null = null

    // @ts-ignore maybe this is a ternjs type error
    let result: any

    server.request(
      // @ts-ignore maybe this is a ternjs type error
      request,
      (ternError, response) => {
        error = ternError
        if (response) {
          result = response as CompletionsQueryResult
        }
      },
    )

    if (error || !result || result.completions.length === 0) {
      return null
    }
    const options: Completion[] = []
    const completions = result.completions as Array<{
      name: string
      type?: string | undefined
      depth?: number | undefined
      doc?: string | undefined
      url?: string | undefined
      origin?: string | undefined
    }>
    completions.forEach((completion) => {
      const dataType = getDataType(completion?.type || "?")
      const completionOption: Completion = {
        type: dataType,
        label: completion.name,
        detail: dataType,
        boost: -1,
      }
      if (completion.doc && canShowCompleteInfo) {
        completionOption.info = () => {
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
      options.push(completionOption)
    })

    return {
      from: result.start,
      validFor: /^\w*$/,
      options,
    }
  }
}
