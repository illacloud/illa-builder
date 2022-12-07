import { FC, useContext, useEffect, useState } from "react"
import { ViewListSetterContext } from "@/page/App/components/PanelSetters/ContainerSetter/ViewsSetter/context/viewsListContext"
import { ListItem } from "./listItem"
import { isEqual } from "lodash"
import { removeNativeStyle } from "@/page/App/components/PanelSetters/TableSetter/ColumnSetter/style"
import { AnimatePresence, Reorder } from "framer-motion"

export const ListBody: FC = () => {
  const { viewsList, attrPath, handleUpdateDsl } = useContext(
    ViewListSetterContext,
  )
  const [items, setItems] = useState(viewsList)

  useEffect(() => {
    if (!isEqual(viewsList, items)) {
      setItems(viewsList)
    }
  }, [viewsList])

  if (!Array.isArray(viewsList)) return null

  return (
    <AnimatePresence initial={false}>
      <Reorder.Group
        axis="y"
        initial={false}
        values={items}
        onReorder={setItems}
        css={removeNativeStyle}
      >
        {items.map((item, index) => {
          const { id, label } = item
          return (
            <Reorder.Item
              initial={false}
              css={removeNativeStyle}
              key={item.id}
              value={item}
              onDragEnd={() => {
                handleUpdateDsl(attrPath, items)
              }}
            >
              <ListItem value={item} label={label} key={id} index={index} />
            </Reorder.Item>
          )
        })}
      </Reorder.Group>
    </AnimatePresence>
  )
}
