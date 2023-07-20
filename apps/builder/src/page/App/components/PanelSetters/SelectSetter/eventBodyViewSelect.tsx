import { get, toPath } from "lodash"
import { FC, useMemo } from "react"
import { useSelector } from "react-redux"
import {
  getCanvas,
  searchDsl,
} from "@/redux/currentApp/editor/components/componentsSelector"
import { PageNode } from "@/redux/currentApp/editor/components/componentsState"
import { RootState } from "@/store"
import { convertPathToString } from "@/utils/executionTreeHelper/utils"
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
  const pageComponent = useSelector<RootState>((state) => {
    const canvas = getCanvas(state)
    if (!canvas) return null
    return searchDsl(canvas, pagePath) || null
  }) as PageNode | null

  const finalOptions = useMemo(() => {
    if (!pageComponent) return []
    const options: { label: string; value: string }[] = []
    const walkedConfig = new Map<string, Record<string, any>>()
    pageComponent.childrenNode.forEach((node) => {
      const { props } = node
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
  }, [pageComponent])

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
