import { ComponentSessionProps } from "./interface"

export function getMatchComponent(
  value?: string,
  options?: ComponentSessionProps[],
) {
  if (!value || value.length === 0) return options
  const valueArr = value.split("")
  let regKey = ".*"
  valueArr.forEach((s) => {
    regKey += s.toLocaleLowerCase() + ".*"
  })
  const reg = RegExp(regKey)

  const newSessionList: ComponentSessionProps[] = []
  options?.forEach((session) => {
    const res = session.children.filter((component) =>
      component.widgetName.toLocaleLowerCase().match(reg),
    )
    if (res.length > 0) {
      newSessionList.push({ ...session, children: res })
    }
  })
  return newSessionList
}
