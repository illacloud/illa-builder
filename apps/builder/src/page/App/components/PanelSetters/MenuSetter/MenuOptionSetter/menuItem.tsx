import { Reorder } from "framer-motion"
import { FC, useContext } from "react"
import { MenuListSetterContext } from "@/page/App/components/PanelSetters/MenuSetter/MenuOptionSetter/context/menuListContext"
import { SubMenuLabel } from "@/page/App/components/PanelSetters/MenuSetter/MenuOptionSetter/subMenuLabel"
import { removeNativeStyle } from "@/page/App/components/PanelSetters/TableSetter/ColumnSetter/style"
import { DragIconAndLabel } from "./dragIconAndLabel"
import { MenuItemProps } from "./interface"
import { optionListItemStyle } from "./style"

export const MenuItem: FC<MenuItemProps> = (props) => {
  const { handleUpdateDsl, attrPath } = useContext(MenuListSetterContext)
  const { title, id, disabled, icon, subMenu, index } = props

  return (
    <div css={optionListItemStyle}>
      <DragIconAndLabel
        id={id}
        index={index}
        title={title}
        icon={icon}
        disabled={disabled}
      />
      {subMenu ? (
        <Reorder.Group
          axis="y"
          initial={false}
          values={subMenu}
          onReorder={(value) => {
            handleUpdateDsl(`${attrPath}.${index}.subMenu`, value)
          }}
          css={removeNativeStyle}
        >
          {subMenu?.map((item, subIndex) => {
            return (
              <Reorder.Item
                initial={false}
                css={removeNativeStyle}
                key={item.id}
                value={item}
                onDragEnd={() => {
                  // handleUpdateDsl(attrPath, items)
                }}
              >
                <SubMenuLabel
                  {...item}
                  index={index}
                  subIndex={subIndex}
                  attrPath={`${attrPath}.${index}.subMenu.${subIndex}`}
                />
              </Reorder.Item>
            )
          })}
        </Reorder.Group>
      ) : null}
    </div>
  )
}

MenuItem.displayName = "MenuItem"
