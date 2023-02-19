import { FC, useCallback } from "react"
import { BaseSelectSetter } from "@/page/App/components/PanelSetters/SelectSetter/baseSelect"
import { HeightModeSetterProps } from "@/page/App/components/PanelSetters/SelectSetter/interface"
import { RESIZE_DIRECTION } from "@/widgetLibrary/interface"

export const HeightModeSelect: FC<HeightModeSetterProps> = (props) => {
  const { handleUpdateMultiAttrDSL, value: heightMode } = props
  const handleUpdateHeightMode = useCallback(
    (attrName: string, value: string) => {
      if (heightMode === value) return
      const resizeDirection =
        value === "fixed" ? RESIZE_DIRECTION.ALL : RESIZE_DIRECTION.HORIZONTAL
      handleUpdateMultiAttrDSL({
        [attrName]: value,
        resizeDirection,
      })
    },
    [handleUpdateMultiAttrDSL, heightMode],
  )
  return (
    <BaseSelectSetter {...props} handleUpdateDsl={handleUpdateHeightMode} />
  )
}

HeightModeSelect.displayName = "HeightModeSelect"
