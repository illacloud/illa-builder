import { Reorder } from "framer-motion"
import { clone, cloneDeep, isEqual, set } from "lodash"
import { FC, useCallback, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { removeNativeStyle } from "@/page/App/components/PanelSetters/TableSetter/ColumnSetter/style"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { SectionViewShape } from "@/redux/currentApp/editor/components/componentsState"
import { executionActions } from "@/redux/currentApp/executionTree/executionSlice"
import { BodyProps } from "./interface"
import { Item } from "./item"
import { viewsListBodyWrapperStyle } from "./style"

export const ListBody: FC<BodyProps> = (props) => {
  const { sectionNodeExecutionResult } = props
  const dispatch = useDispatch()
  const { sectionViewConfigs, currentViewIndex, viewSortedKey, displayName } =
    sectionNodeExecutionResult

  const [items, setItems] = useState(sectionViewConfigs)

  useEffect(() => {
    if (!isEqual(sectionViewConfigs, items)) {
      setItems(sectionViewConfigs)
    }
  }, [sectionViewConfigs])

  const updateItem = (values: unknown) => {
    if (isEqual(values, items)) return
    setItems(values)
  }

  const handleChangSectionView = useCallback(
    (index: number) => {
      if (index > sectionViewConfigs.length) return
      const config = sectionViewConfigs[index] as SectionViewShape
      const viewDisplayName = config.viewDisplayName
      const keyIndex = viewSortedKey.findIndex(
        (key: string) => key === viewDisplayName,
      )
      if (keyIndex === -1 || keyIndex === currentViewIndex) return
      dispatch(
        executionActions.updateExecutionByDisplayNameReducer({
          displayName,
          value: {
            currentViewIndex: keyIndex,
          },
        }),
      )
    },
    [
      currentViewIndex,
      dispatch,
      displayName,
      sectionViewConfigs,
      viewSortedKey,
    ],
  )

  const handleDeleteSectionView = useCallback(
    (index: number) => {
      if (index > sectionViewConfigs.length) return
      const config = sectionViewConfigs[index] as SectionViewShape
      const viewDisplayName = config.viewDisplayName
      dispatch(
        componentsActions.deleteSectionViewReducer({
          viewDisplayName,
          parentNodeName: displayName,
          originPageSortedKey: viewSortedKey,
        }),
      )
    },
    [dispatch, displayName, sectionViewConfigs, viewSortedKey],
  )

  const handleUpdateSectionOrder = useCallback(
    (items: SectionViewShape[]) => {
      if (isEqual(items, sectionViewConfigs)) return
      dispatch(
        componentsActions.updateSectionViewPropsReducer({
          parentNodeName: displayName,
          newProps: {
            sectionViewConfigs: items,
          },
        }),
      )
    },
    [dispatch, displayName, sectionViewConfigs],
  )

  const handleUpdateItem = useCallback(
    (path: string, value: string) => {
      const newSectionViewConfigs = cloneDeep(sectionViewConfigs)
      set(newSectionViewConfigs, path, value)
      dispatch(
        componentsActions.updateSectionViewPropsReducer({
          parentNodeName: displayName,
          newProps: {
            sectionViewConfigs: newSectionViewConfigs,
          },
        }),
      )
    },
    [dispatch, displayName, sectionViewConfigs],
  )

  return (
    <div css={viewsListBodyWrapperStyle}>
      <Reorder.Group
        axis="y"
        initial={false}
        values={items}
        onReorder={updateItem}
        css={removeNativeStyle}
      >
        {items.map((config: SectionViewShape, index: number) => {
          const currentDisplayName = viewSortedKey[currentViewIndex]
          const otherKeys = items
            .map((views: SectionViewShape, i: number) => views.key || i)
            .filter((key: string, i: number) => i != index) as string[]
          const isSelected = currentDisplayName === config.viewDisplayName
          return (
            <Reorder.Item
              initial={false}
              css={removeNativeStyle}
              key={config.id}
              value={config}
              onDragEnd={() => {
                handleUpdateSectionOrder(items)
              }}
            >
              <Item
                key={config.id}
                name={config.key}
                otherKeys={otherKeys}
                isSelected={isSelected}
                path={config.path}
                viewDisplayName={config.viewDisplayName}
                index={index}
                attrPath={`${index}`}
                handleChangSectionView={handleChangSectionView}
                handleDeleteSectionView={handleDeleteSectionView}
                handleUpdateItem={handleUpdateItem}
              />
            </Reorder.Item>
          )
        })}
      </Reorder.Group>
    </div>
  )
}
