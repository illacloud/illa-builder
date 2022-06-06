import { FC } from "react"
import { iconCss, itemContainerCss, nameCss } from "./style"
import { ComponentItemProps } from "@/page/App/components/WidgetPickerEditor/components/ComponentPanel/interface"
// TODO:@longbo 要删除的
import { generatorBaseDSL } from "@/utils/generators/generatorBaseDSL"

export const ComponentItem: FC<ComponentItemProps> = (props) => {
  const { displayName, icon, id, ...partialDragInfo } = props

  return (
    <div
      css={itemContainerCss}
      onDragStart={() => {
        //  drag 的时候传 fullDragInfo
        const fullDragInfo = {
          displayName,
          ...partialDragInfo,
        }
        // TODO:@longbo drop 的时候掉这个方法
        // dragAndDropParser(fullDragInfo)
      }}
    >
      <span css={iconCss}>{icon}</span>
      <span css={nameCss}>{displayName}</span>
    </div>
  )
}

ComponentItem.displayName = "ComponentItem"
