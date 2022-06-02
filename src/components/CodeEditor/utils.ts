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
