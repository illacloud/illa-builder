import tern from "tern"
import "codemirror/addon/tern/worker"
import "codemirror/addon/tern/tern"
import ecmascript from "tern/defs/ecmascript.json"
import CodeMirror from "codemirror"
import ReactDOM from "react-dom"
import { HintTooltip } from "./HintTooltip"
import demoUs from "./defs/demo_us.json"
import demoZh from "./defs/demo_zh.json"
import { TypeQueryResult } from "tern/lib/tern"
import { getValueType } from "@/components/CodeEditor/utils"
import { isObject } from "@illa-design/system"

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

const transDataToDefs = (data?: Record<string, any>) => {
  if (data) {
    const def: Record<string, any> = {}
    for (const dataKey in data) {
      console.log(dataKey, "dataKey")
      if (isObject(data[dataKey])) {
        let a = data[dataKey] as Object
        def[dataKey] = { ...a, ...transDataToDefs(a) }
      } else {
        def[dataKey] = {}
        def[dataKey]["!type"] = transTernTypeName(data[dataKey])
      }
    }
    console.log({ def, data }, "transDataToDefs")
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
    completionTip: (data: TypeQueryResult) => {
      console.log(data, "completionTip")
      let div = document.createElement("div")
      ReactDOM.render(<HintTooltip data={data} />, div)
      return div
    },
  })
}
