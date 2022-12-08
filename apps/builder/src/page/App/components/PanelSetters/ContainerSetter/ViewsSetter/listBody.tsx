import {
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import { ViewListSetterContext } from "@/page/App/components/PanelSetters/ContainerSetter/ViewsSetter/context/viewsListContext"
import { ListItem } from "./listItem"
import { isEqual, omit } from "lodash"
import { removeNativeStyle } from "@/page/App/components/PanelSetters/TableSetter/ColumnSetter/style"
import { AnimatePresence, Reorder } from "framer-motion"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { ViewItemShape } from "@/page/App/components/PanelSetters/ContainerSetter/ViewsSetter/interface"
import { useDispatch } from "react-redux"

interface ItemsProps extends ViewItemShape {
  childrenNode?: ComponentNode
}

export const ListBody: FC = () => {
  const dispatch = useDispatch()
  const {
    viewsList,
    componentNode,
    currentViewIndex,
    attrPath,
    handleUpdateMultiAttrDSL,
  } = useContext(ViewListSetterContext)

  const [items, setItems] = useState<ItemsProps[]>(
    viewsList.map((view, index) => {
      return { ...view, childrenNode: componentNode.childrenNode[index] }
    }),
  )
  const currentSelected = useMemo(
    () => viewsList[currentViewIndex],
    [viewsList, currentViewIndex],
  )

  const onDragEnd = useCallback(() => {
    const newComponentNode: ComponentNode[] = []
    const newViewList: ViewItemShape[] = []
    items.forEach((item) => {
      item?.childrenNode && newComponentNode.push(item.childrenNode)
      newViewList.push(omit(item, ["childrenNode"]))
    })
    const newSelectedIndex = newViewList.findIndex(
      (view) => view.key === currentSelected.key,
    )
    const newSelectedKey = newViewList[newSelectedIndex].key
    handleUpdateMultiAttrDSL?.({
      [attrPath]: newViewList,
      currentIndex: newSelectedIndex,
      currentKey: newSelectedKey,
    })
    dispatch(
      componentsActions.sortComponentNodeChildrenReducer({
        parentDisplayName: componentNode.displayName,
        newChildrenNode: newComponentNode,
      }),
    )
  }, [
    items,
    currentSelected,
    attrPath,
    componentNode,
    handleUpdateMultiAttrDSL,
    dispatch,
  ])

  useEffect(() => {
    if (!isEqual(viewsList, items)) {
      setItems(
        viewsList.map((view, index) => {
          return { ...view, childrenNode: componentNode.childrenNode[index] }
        }),
      )
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
          const { id, label, key } = item
          return (
            <Reorder.Item
              initial={false}
              css={removeNativeStyle}
              key={item.id}
              value={item}
              onDragEnd={onDragEnd}
            >
              <ListItem
                value={item}
                label={label}
                key={id}
                index={index}
                isSelected={key === currentSelected.key}
              />
            </Reorder.Item>
          )
        })}
      </Reorder.Group>
    </AnimatePresence>
  )
}
