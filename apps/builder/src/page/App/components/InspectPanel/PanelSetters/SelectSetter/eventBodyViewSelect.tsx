import { convertPathToString } from "@illa-public/dynamic-string"
import { get, toPath } from "lodash-es"
import { FC, useMemo } from "react"
import { useSelector } from "react-redux"
import {
  getComponentMap,
  searchComponentFromMap,
} from "@/redux/currentApp/components/componentsSelector"
import { BaseSelectSetterProps } from "./interface"
import SearchSelectSetter from "./searchSelect"

const EventTargetViewSelect: FC<BaseSelectSetterProps> = (props) => {
  const { attrName, value, componentNode, widgetOrAction, panelConfig } = props

  let parentAttrNameArray = toPath(attrName)
  parentAttrNameArray.splice(-1, 1)

  const parentAttr =
    widgetOrAction === "WIDGET"
      ? get(componentNode, `props.${convertPathToString(parentAttrNameArray)}`)
      : get(panelConfig, convertPathToString(parentAttrNameArray))

  const pagePath = get(parentAttr, "pagePath")
  const componentsMap = useSelector(getComponentMap)
  const pageComponent = searchComponentFromMap(componentsMap, pagePath)

  const finalOptions = useMemo(() => {
    if (!pageComponent) return []
    const options: { label: string; value: string }[] = []
    const walkedConfig = new Map<string, Record<string, any>>()
    pageComponent.childrenNode.forEach((node) => {
      const component = searchComponentFromMap(componentsMap, node)
      const { props } = component ?? {}
      if (
        props &&
        Array.isArray(props.viewSortedKey) &&
        Array.isArray(props.sectionViewConfigs)
      ) {
        props.sectionViewConfigs.forEach((config) => {
          if (walkedConfig.get(config.path)) return
          walkedConfig.set(config.path, config)
          options.push({
            label: config.path,
            value: config.path,
          })
        })
      }
    })
    return options
  }, [componentsMap, pageComponent])

  const finalValue = useMemo(() => {
    const index = finalOptions.findIndex((option) => {
      return option.value === value
    })
    if (index !== -1) return value
    return undefined
  }, [finalOptions, value])

  return (
    <SearchSelectSetter
      {...props}
      value={finalValue as string}
      options={finalOptions}
    />
  )
}

EventTargetViewSelect.displayName = "EventTargetViewSelect"

export default EventTargetViewSelect
