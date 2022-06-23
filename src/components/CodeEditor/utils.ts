//
import { evalScript } from "@/utils/evaluateDynamicString/codeSandbox"

export const ignoreToken = (text?: string[]) => {
  const ignoreStr = " ,#,!,-,=,@,$,%,&,+,;,(,),*,(),{}"
  const ignore = ignoreStr.split(",")
  if (text && text[0]) {
    for (const pre in ignore) {
      if (ignore[pre] === text[0]) {
        return true
      }
    }
  } else {
    return true
  }
  return false
}

const DataTypeList = {
  String,
  Number,
  Array,
  Object,
  Boolean,
}

export type ExpectedType = keyof typeof DataTypeList

export function getEvalValue(type: ExpectedType, content: any) {
  try {
    if (type === "Object" || type === "Array") {
      return evalScript(content, {}, false)
    } else if (type === "Number") {
      return Number(content)
    } else {
      const res = new DataTypeList[type](content)
      return res.valueOf()
    }
  } catch (e) {}
  return content
}

function getValueType(value: any) {
  return Object.prototype.toString.call(value).slice(8, -1)
}

export function isExpectType(type: string, value: any) {
  const valueType = getValueType(value)
  if (valueType !== type) {
    throw `The value has to be of type '${type}', you provided a value of type '${valueType}'`
  }
  return valueType === type
}

export enum AUTOCOMPLETE_CLOSE_KEY {
  Enter,
  Tab,
  Escape,
  Comma,
  Semicolon,
  Space,
  Delete,
  "Ctrl+Backspace",
  OSLeft,
  "(",
  ")",
}

export const isCloseKey = (key: any): key is AUTOCOMPLETE_CLOSE_KEY => {
  return AUTOCOMPLETE_CLOSE_KEY.hasOwnProperty(key)
}
