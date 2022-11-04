import { FC, useContext, useEffect, useState } from "react"
import { TabListSetterContext } from "./context/tabListContext"
import { ListItem } from "./listItem"
import { removeNativeStyle } from "@/page/App/components/PanelSetters/style"
import { Reorder } from "framer-motion"
import { isEqual } from "lodash"

export const ListBody: FC = () => {
  const { list, handleUpdateDsl, attrPath } = useContext(TabListSetterContext)

  const [items, setItems] = useState(list)

  useEffect(() => {
    if (!isEqual(list, items)) {
      setItems(list)
    }
  }, [list])

  if (!Array.isArray(list)) return null
  return (
    <Reorder.Group
      axis="y"
      initial={false}
      values={items}
      animate={false}
      onReorder={setItems}
      css={removeNativeStyle}
    >
      {items.map((item, index) => {
        const { id } = item
        return (
          <Reorder.Item
            css={removeNativeStyle}
            key={item.key}
            value={item}
            onDragEnd={() => {
              handleUpdateDsl(attrPath, items)
            }}
          >
            <ListItem value={item} key={id} index={index} />
          </Reorder.Item>
        )
      })}
    </Reorder.Group>
  )
}
