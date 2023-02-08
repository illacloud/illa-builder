import { AnimatePresence, Reorder } from "framer-motion"
import { isEqual } from "lodash"
import { FC, useContext, useEffect, useState } from "react"
import { removeNativeStyle } from "@/page/App/components/PanelSetters/TableSetter/ColumnSetter/style"
import { ColumnItemShape } from "@/widgetLibrary/TableWidget/interface"
import { ColumnItem } from "./columnItem"
import { ColumnListSetterContext } from "./context/columnListContext"
import { EmptyBody } from "./empty"

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

  const updateItem = (values: ColumnItemShape[]) => {
    if (isEqual(values, items)) return
    setItems(values)
  }

  if (!columnItems || !Array.isArray(columnItems) || columnItems.length === 0)
    return <EmptyBody />

  return (
    <AnimatePresence initial={false}>
      <Reorder.Group
        axis="y"
        initial={false}
        values={items}
        onReorder={updateItem}
        css={removeNativeStyle}
      >
        {items.map((item, index) => {
          const { label, value, header, accessorKey, visible, custom, id } =
            item
          return (
            <Reorder.Item
              initial={false}
              css={removeNativeStyle}
              key={item.accessorKey}
              value={item}
              onDragEnd={() => {
                const orderItems = items.map((item, index) => {
                  return { ...item, columnIndex: index }
                })
                handleUpdateDsl(attrPath, orderItems)
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
    </AnimatePresence>
  )
}
