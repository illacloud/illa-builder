import { FC } from "react"
import { ColumnContainer } from "@/page/App/components/InspectPanel/PanelSetters/DragMoveComponent/ColumnContainer"
import { ColumnIconGroupSetterProps } from "./interface"

export const ColumnIconGroupSetter: FC<ColumnIconGroupSetterProps> = (
  props,
) => {
  const { attrName, handleUpdateMultiAttrDSL, value, widgetDisplayName } = props

  return (
    <ColumnContainer
      columnNum={value.length}
      onClickNew={() => {
        handleUpdateMultiAttrDSL?.({
          [attrName]: [...value],
        })
      }}
      items={value.map((v) => v.id)}
    ></ColumnContainer>
  )
}
