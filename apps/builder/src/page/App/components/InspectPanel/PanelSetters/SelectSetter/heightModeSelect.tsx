import { FC, useCallback } from "react"
import { useSelector } from "react-redux"
import { UNIT_HEIGHT } from "@/page/App/components/DotPanel/constant/canvas"
import BaseSelectSetter from "@/page/App/components/InspectPanel/PanelSetters/SelectSetter/baseSelect"
import { HeightModeSetterProps } from "@/page/App/components/InspectPanel/PanelSetters/SelectSetter/interface"
import { DEFAULT_MAX_HEIGHT } from "@/page/App/components/ScaleSquare/components/AutoHeightWithLimitedContainer"
import {
  getComponentMap,
  searchComponentFromMap,
} from "@/redux/currentApp/components/componentsSelector"
import { RootState } from "@/store"
import { RESIZE_DIRECTION } from "@/widgetLibrary/interface"

const HeightModeSelect: FC<HeightModeSetterProps> = (props) => {
  const currentNode = useSelector((state: RootState) => {
    const components = getComponentMap(state)
    return searchComponentFromMap(components, props.widgetDisplayName)
  })!
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

export default HeightModeSelect
