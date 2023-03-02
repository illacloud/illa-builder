import { FC, useCallback } from "react"
import { useSelector } from "react-redux"
import { UNIT_HEIGHT } from "@/page/App/components/DotPanel/renderComponentCanvas"
import { BaseSelectSetter } from "@/page/App/components/PanelSetters/SelectSetter/baseSelect"
import { HeightModeSetterProps } from "@/page/App/components/PanelSetters/SelectSetter/interface"
import {
  getCanvas,
  searchDsl,
} from "@/redux/currentApp/editor/components/componentsSelector"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { RootState } from "@/store"
import { DEFAULT_MAX_HEIGHT } from "@/widgetLibrary/PublicSector/AutoHeightWithLimitedContainer"
import { RESIZE_DIRECTION } from "@/widgetLibrary/interface"

export const HeightModeSelect: FC<HeightModeSetterProps> = (props) => {
  const currentNode = useSelector((state: RootState) => {
    const rootNode = getCanvas(state) as ComponentNode
    return searchDsl(rootNode, props.widgetDisplayName) as ComponentNode
  })
  const { handleUpdateMultiAttrDSL, value: heightMode } = props
  const handleUpdateHeightMode = useCallback(
    (attrName: string, value: string) => {
      if (heightMode === value) return
      const resizeDirection =
        value === "fixed" ? RESIZE_DIRECTION.ALL : RESIZE_DIRECTION.HORIZONTAL
      const otherAttrs =
        value === "limited"
          ? {
              dynamicMaxHeight:
                currentNode.h * UNIT_HEIGHT + DEFAULT_MAX_HEIGHT,
              dynamicMinHeight: currentNode.h * UNIT_HEIGHT,
            }
          : {
              dynamicMaxHeight: undefined,
              dynamicMinHeight: undefined,
            }
      handleUpdateMultiAttrDSL({
        [attrName]: value,
        resizeDirection,
        ...otherAttrs,
      })
    },
    [currentNode, handleUpdateMultiAttrDSL, heightMode],
  )
  return (
    <BaseSelectSetter {...props} handleUpdateDsl={handleUpdateHeightMode} />
  )
}

HeightModeSelect.displayName = "HeightModeSelect"
