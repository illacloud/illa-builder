import { FC, useContext, useEffect, useState } from "react"
import { Reorder } from "framer-motion"
import { ColumnItem } from "./columnItem"
import { ColumnListSetterContext } from "./context/columnListContext"
import { EmptyBody } from "./empty"
import { isEqual } from "lodash"
import { removeNativeStyle } from "@/page/App/components/PanelSetters/style"

export const ListBody: FC = () => {
  const { columnItems, handleUpdateDsl, attrPath } = useContext(
    ColumnListSetterContext,
  )
  const [items, setItems] = useState(columnItems)

  useEffect(() => {
    if (!isEqual(columnItems, items)) {
      setItems(columnItems)
    }
  }, [columnItems])

  if (!columnItems || !Array.isArray(columnItems) || columnItems.length === 0)
    return <EmptyBody />

  return (
    <Reorder.Group
      axis="y"
      initial={false}
      values={items}
      onReorder={setItems}
      css={removeNativeStyle}
    >
      {items.map((item, index) => {
        const { label, value, header, accessorKey, visible, custom, id } = item
        return (
          <Reorder.Item
            initial={false}
            css={removeNativeStyle}
            key={item.accessorKey}
            value={item}
            onDragEnd={() => {
              handleUpdateDsl(attrPath, items)
            }}
          >
            <ColumnItem
              key={accessorKey}
              accessorKey={accessorKey}
              header={header}
              value={value}
              visible={visible}
              custom={custom}
              index={index}
              id={id}
            />
          </Reorder.Item>
        )
      })}
    </Reorder.Group>
  )
}
