import { Reorder } from "framer-motion"
import { cloneDeep, isEqual, set } from "lodash"
import { FC, useCallback, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { ILLA_MIXPANEL_EVENT_TYPE } from "@/illa-public-component/MixpanelUtils/interface"
import { removeNativeStyle } from "@/page/App/components/PanelSetters/TableSetter/ColumnSetter/style"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { SectionViewShape } from "@/redux/currentApp/editor/components/componentsState"
import { executionActions } from "@/redux/currentApp/executionTree/executionSlice"
import { trackInEditor } from "@/utils/mixpanelHelper"
import { BodyProps } from "./interface"
import { Item } from "./item"
import { viewsListBodyWrapperStyle } from "./style"

export const ListBody: FC<BodyProps> = (props) => {
  const {
    sectionViewConfigs,
    currentViewIndex,
    viewSortedKey,
    parentNodeDisplayName,
    sectionName,
  } = props
  const dispatch = useDispatch()

  const [items, setItems] = useState(sectionViewConfigs)

  useEffect(() => {
    if (!isEqual(sectionViewConfigs, items)) {
      setItems(sectionViewConfigs)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionViewConfigs])

  const updateItem = (values: SectionViewShape[]) => {
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
          displayName: parentNodeDisplayName,
          value: {
            currentViewIndex: keyIndex,
          },
        }),
      )
    },
    [
      currentViewIndex,
      dispatch,
      parentNodeDisplayName,
      sectionViewConfigs,
      viewSortedKey,
    ],
  )

  const handleDeleteSectionView = useCallback(
    (index: number) => {
      if (sectionViewConfigs.length === 1) return
      if (index > sectionViewConfigs.length) return
      trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
        element: "delete_view",
        parameter2: sectionName.slice(0, -7),
      })
      const config = sectionViewConfigs[index] as SectionViewShape
      const viewDisplayName = config.viewDisplayName
      dispatch(
        componentsActions.deleteSectionViewReducer({
          viewDisplayName,
          parentNodeName: parentNodeDisplayName,
          originPageSortedKey: viewSortedKey,
        }),
      )
    },
    [
      dispatch,
      parentNodeDisplayName,
      sectionName,
      sectionViewConfigs,
      viewSortedKey,
    ],
  )

  const handleUpdateSectionOrder = useCallback(
    (items: SectionViewShape[]) => {
      if (isEqual(items, sectionViewConfigs)) return
      dispatch(
        componentsActions.updateSectionViewPropsReducer({
          parentNodeName: parentNodeDisplayName,
          newProps: {
            sectionViewConfigs: items,
          },
        }),
      )
    },
    [dispatch, parentNodeDisplayName, sectionViewConfigs],
  )

  const handleUpdateItem = useCallback(
    (path: string, value: string) => {
      const newSectionViewConfigs = cloneDeep(sectionViewConfigs)
      set(newSectionViewConfigs, path, value)
      dispatch(
        componentsActions.updateSectionViewPropsReducer({
          parentNodeName: parentNodeDisplayName,
          newProps: {
            sectionViewConfigs: newSectionViewConfigs,
          },
        }),
      )
    },
    [dispatch, parentNodeDisplayName, sectionViewConfigs],
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
          const otherKeys = (
            items.map(
              (views: SectionViewShape, i: number) => views.key || i,
            ) as string[]
          ).filter((key: string, i: number) => i != index)
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
