import { AnimatePresence, Reorder } from "framer-motion"
import { isEqual } from "lodash"
import { FC, useContext, useEffect, useState } from "react"
import { CellItemProps } from "@/page/App/components/PanelSetters/TableSetter/CellSetter/interface"
import { removeNativeStyle } from "@/page/App/components/PanelSetters/TableSetter/ColumnSetter/style"
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columnItems])

  const updateItem = (values: CellItemProps[]) => {
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
          const { cellValue, id, label } = item
          return (
            <Reorder.Item
              initial={false}
              css={removeNativeStyle}
              key={id}
              value={item}
              onDragEnd={() => {
                const orderItems = items.map((item, index) => {
                  return { ...item, index }
                })
                handleUpdateDsl(attrPath, orderItems)
              }}
            >
              <ColumnItem
                key={id}
                label={label}
                cellValue={cellValue}
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
