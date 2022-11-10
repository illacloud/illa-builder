import { FC, useContext } from "react"
import { Reorder } from "framer-motion"
import { MenuListSetterContext } from "./context/menuListContext"
import { EmptyBody } from "./empty"
import { removeNativeStyle } from "@/page/App/components/PanelSetters/TableSetter/ColumnSetter/style"
import { MenuItem } from "@/page/App/components/PanelSetters/MenuSetter/MenuOptionSetter/menuItem"

export const ListBody: FC = () => {
  const { columnItems, handleUpdateDsl, attrPath } = useContext(
    MenuListSetterContext,
  )

  if (!columnItems || !Array.isArray(columnItems) || columnItems.length === 0)
    return <EmptyBody />

  return (
    <Reorder.Group
      axis="y"
      initial={false}
      values={columnItems}
      onReorder={(value) => {
        handleUpdateDsl(attrPath, value)
      }}
      css={removeNativeStyle}
    >
      {columnItems.map((item, index) => {
        const { title, id, disabled, icon, subMenu } = item
        return (
          <Reorder.Item
            initial={false}
            css={removeNativeStyle}
            key={item.id}
            value={item}
          >
            <MenuItem {...item} index={index} />
          </Reorder.Item>
        )
      })}
    </Reorder.Group>
  )
}
