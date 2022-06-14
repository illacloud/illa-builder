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

export type DataType = keyof typeof DataTypeList

function getTypeValue(type: DataType, content: string) {
  const res = new DataTypeList[type](content)
  return res.valueOf()
}
