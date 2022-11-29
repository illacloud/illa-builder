import { FC, useMemo } from "react"
import { useSelector } from "react-redux"
import { Select } from "@illa-design/react"
import { BaseSelectSetterProps } from "./interface"
import { applyBaseSelectWrapperStyle } from "@/page/App/components/PanelSetters/SelectSetter/style"
import { get } from "lodash"
import {
  getCanvas,
  searchDsl,
} from "@/redux/currentApp/editor/components/componentsSelector"
import { RootState } from "@/store"
import { PageNode } from "@/redux/currentApp/editor/components/componentsState"

export const EventTargetViewSelect: FC<BaseSelectSetterProps> = (props) => {
  const {
    isSetterSingleRow,
    attrName,
    handleUpdateDsl,
    value,
    componentNode,
    placeholder,
  } = props
  let parentAttrNameArray = attrName.split(".")
  parentAttrNameArray.splice(-1, 1)
  let finalParentPath = `props.${parentAttrNameArray.join(".")}`
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
    pageComponent.childrenNode.forEach((node) => {
      const { props } = node
      if (
        props &&
        Array.isArray(props.viewSortedKey) &&
        Array.isArray(props.sectionViewConfigs)
      ) {
        props.sectionViewConfigs.forEach((config) => {
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
    <div css={applyBaseSelectWrapperStyle(isSetterSingleRow)}>
      <Select
        options={finalOptions}
        size="medium"
        colorScheme="techPurple"
        value={finalValue}
        onChange={(value) => {
          handleUpdateDsl(attrName, value)
        }}
        placeholder={placeholder}
      />
    </div>
  )
}
