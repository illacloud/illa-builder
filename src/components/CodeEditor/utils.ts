//
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
  Function,
  Object,
  Boolean,
}

export type ExpectedType = keyof typeof DataTypeList

export function getTypeValue(type: ExpectedType, content: string) {
  const res = new DataTypeList[type](content)
  console.log(type, res, 'res')
  return res.valueOf()
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
