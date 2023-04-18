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
import { BaseSelectSetter } from "./baseSelect"
import { BaseSelectSetterProps } from "./interface"

export const EventTargetViewSelect: FC<BaseSelectSetterProps> = (props) => {
  const { attrName, value, componentNode } = props

  let parentAttrNameArray = toPath(attrName)
  parentAttrNameArray.splice(-1, 1)

  let finalParentPath = `props.${convertPathToString(parentAttrNameArray)}`

  const parentAttr = get(componentNode, finalParentPath)
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

  return <BaseSelectSetter {...props} value={finalValue as string} />
}
