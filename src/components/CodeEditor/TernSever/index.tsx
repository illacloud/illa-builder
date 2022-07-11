import tern from "tern"
import "codemirror/addon/tern/worker"
import "codemirror/addon/tern/tern"
import "./tern/tern"
import ecmascript from "tern/defs/ecmascript.json"
import CodeMirror from "codemirror"
import ReactDOM from "react-dom"
import { TypeQueryResult } from "tern/lib/tern"
import { isObject } from "@illa-design/system"
import { getValueType } from "@/components/CodeEditor/utils"
import { HintTooltip } from "./HintTooltip"
import demoUs from "./defs/demo_us.json"
import demoZh from "./defs/demo_zh.json"

// @ts-ignore: create global variable
// see in: https://github.com/codemirror/codemirror5/issues/5362
window.tern = tern

const getCurrentDef = (language: string) => {
  switch (language) {
    case "简体中文":
      return demoZh
    case "English":
      return demoUs
    default:
      return demoUs
  }
}

const transTernTypeName = (value: any): string => {
  let res = getValueType(value)
  switch (res) {
    case "String":
      return "string"
    case "Number":
      return "number"
    case "Array":
      return "array"
    case "Object":
      return "object"
    case "Function":
      return "fn()"
    case "Boolean":
      return "bool"
    default:
      return "unknown"
  }
}

export const transTypeFromTern = (type: string, value?: any): string => {
  switch (type) {
    case "string":
      return "String"
    case "number":
      return "Number"
    case "array":
      return "Array"
    case "object":
      return "Object"
    case "bool":
      return "Boolean"
  }
  if (value) {
    return getValueType(value)
  }
  return type
}

// contain data and path
const transDataToDefs = (
  data?: Record<string, any>,
  current?: string,
  path = "",
) => {
  if (data) {
    const def: Record<string, any> = {}
    if (current) {
      path = path ? path + "." + current : current
      def["!doc"] = JSON.stringify({ path, data })
    }
    for (const dataKey in data) {
      let newPath = path ? path + "." + dataKey : dataKey
      if (isObject(data[dataKey])) {
        let d = data[dataKey] as Object
        def[dataKey] = {
          ...d,
          ...transDataToDefs(d),
          "!doc": JSON.stringify({ path: newPath, data: data[dataKey] }),
        }
      } else {
        def[dataKey] = {
          "!type": transTernTypeName(data[dataKey]),
          "!doc": JSON.stringify({ path: newPath, data: data[dataKey] }),
        }
      }
    }
    return def
  }
  return {}
}

const transPathToDefs = (
  data?: Record<string, any>,
  current?: string,
  path = "",
) => {
  if (data) {
    const def: Record<string, any> = {}
    if (current) {
      path = path ? path + "." + current : current
      def["!doc"] = JSON.stringify({ path })
    }
    for (const dataKey in data) {
      if (isObject(data[dataKey])) {
        let a = data[dataKey] as Object
        def[dataKey] = {
          ...a,
          ...transPathToDefs(a, dataKey, path),
        }
      } else {
        let newPath = path ? path + "." + dataKey : dataKey
        def[dataKey] = {
          "!type": transTernTypeName(data[dataKey]),
          "!doc": JSON.stringify({ path: newPath }),
        }
      }
    }
    return def
  }
  return {}
}

export const TernServer = (
  language: string = "English",
  data?: Record<string, any>,
) => {
  let currentDef = getCurrentDef(language)
  let transData = transDataToDefs(data)
  return new CodeMirror.TernServer({
    // @ts-ignore: type define error
    defs: [ecmascript, { ...currentDef, ...transData }],
    // @ts-ignore: type define error
    completionTip: (completion: TypeQueryResult) => {
      let div = document.createElement("div")
      ReactDOM.render(<HintTooltip data={completion} />, div)
      return div
    },
  })
}

export const BaseTern = new CodeMirror.TernServer({
  // @ts-ignore: type define error
  defs: [ecmascript],
  // @ts-ignore: type define error
  completionTip: (completion: TypeQueryResult) => {
    let div = document.createElement("div")
    ReactDOM.render(<HintTooltip data={completion} />, div)
    return div
  },
})
