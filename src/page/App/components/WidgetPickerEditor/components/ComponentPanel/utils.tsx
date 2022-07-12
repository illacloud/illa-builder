import { ComponentSessionProps } from "./interface"
import i18n from "@/i18n/config"
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
  const removeCommonlyOptions = options?.filter((option) => {
    return (
      i18n.t(option.title) !== i18n.t("editor.widget_picker.sessions.commonly")
    )
  })
  removeCommonlyOptions?.forEach((session) => {
    const res = session.widgetCardInfos.filter((widgetCardInfo) =>
      i18n.t(widgetCardInfo.widgetName).toLocaleLowerCase().match(reg),
    )
    if (res.length > 0) {
      newSessionList.push({ ...session, widgetCardInfos: res })
    }
  })
  return newSessionList
}
