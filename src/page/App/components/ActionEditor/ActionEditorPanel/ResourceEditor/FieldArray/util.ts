import { v4 as uuidV4 } from "uuid"
import { ValueType } from "./interface"

export function initArrayField(arr?: Omit<ValueType, "_key">[]) {
  if (arr?.length) {
    return arr.map((a) => {
      return { ...a, _key: uuidV4() }
    })
  }

  return [getEmptyField()]
}

export function getEmptyField(hasTypeField?: boolean) {
  return hasTypeField
    ? { key: "", value: "", type: "", _key: uuidV4() }
    : { key: "", value: "", _key: uuidV4() }
}

export function addArrayField(prev: ValueType[]) {
  const res = prev.slice(0)

  return [...res, getEmptyField()]
}

export function removeArrayField(prev: ValueType[], _key: string) {
  const res = prev.slice(0)

  if (res.length === 1) {
    res[0].key = ""
    res[0].value = ""
  } else {
    res.splice(
      res.findIndex((i) => i._key === _key),
      1,
    )
  }

  return res
}

export function updateArrayField(prev: ValueType[], newVal: ValueType) {
  const res = prev.slice(0)

  res.splice(
    res.findIndex((i) => i._key === newVal._key),
    1,
    newVal,
  )

  return res
}

export function wrappedWithKey(data: Omit<ValueType, "_key">) {
  return { ...data, _key: uuidV4() }
}

export function excludeKeyFromData(data: ValueType[]) {
  return data.map(({ _key, ...rest }) => rest)
}
