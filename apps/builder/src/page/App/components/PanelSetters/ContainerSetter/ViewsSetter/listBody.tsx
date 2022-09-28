import { FC, useContext, useMemo } from "react"
import { Reorder, AnimatePresence } from "framer-motion"
import { ViewListSetterContext } from "@/page/App/components/PanelSetters/ContainerSetter/ViewsSetter/context/viewsListContext"
import { ViewItemShape } from "@/page/App/components/PanelSetters/ContainerSetter/ViewsSetter/interface"
import { Global } from "@emotion/react"
import { reorderListStyle } from "@/page/App/components/PanelSetters/ContainerSetter/ViewsSetter/style"
import { ListItem } from "./listItem"

interface ListBodyProps {
  handleReorderViewItem: (newOrder: ViewItemShape[]) => void
}

export const ListBody: FC<ListBodyProps> = props => {
  const { handleReorderViewItem } = props
  const { viewsList } = useContext(ViewListSetterContext)

  if (!Array.isArray(viewsList)) return null
  return (
    <>
      <Global styles={reorderListStyle} />
      <Reorder.Group
        axis="y"
        values={viewsList}
        onReorder={handleReorderViewItem}
        initial={false}
      >
        {viewsList.map((item, index) => {
          const { id } = item
          return <ListItem value={item} key={id} index={index} />
        })}
      </Reorder.Group>
    </>
  )
}
