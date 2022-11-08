import { FC, useContext } from "react"
import { ColumnItemProps } from "./interface"
import { optionListItemStyle } from "./style"
import { DragIconAndLabel } from "./dragIconAndLabel"
import { Reorder } from "framer-motion"
import { removeNativeStyle } from "@/page/App/components/PanelSetters/TableSetter/ColumnSetter/style"
import { ColumnListSetterContext } from "@/page/App/components/PanelSetters/MenuSetter/MenuOptionSetter/context/columnListContext"
import { SubMenuLabel } from "@/page/App/components/PanelSetters/MenuSetter/MenuOptionSetter/subMenuLabel"

export const ColumnItem: FC<ColumnItemProps> = (props) => {
  const { handleUpdateDsl, attrPath } = useContext(ColumnListSetterContext)
  const { title, id, disabled, icon, subMenu, index } = props

  return (
    <div css={optionListItemStyle}>
      <DragIconAndLabel
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
          {subMenu?.map((item, index) => {
            return (
              <Reorder.Item
                initial={false}
                css={removeNativeStyle}
                key={item.title}
                value={item}
                onDragEnd={() => {
                  // handleUpdateDsl(attrPath, items)
                }}
              >
                <SubMenuLabel {...item} index={index} />
              </Reorder.Item>
            )
          })}
        </Reorder.Group>
      ) : null}
    </div>
  )
}
