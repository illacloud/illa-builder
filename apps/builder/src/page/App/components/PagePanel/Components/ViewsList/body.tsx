import { FC, useCallback } from "react"
import { viewsListBodyWrapperStyle } from "./style"
import { Item } from "./item"
import { BodyProps } from "./interface"
import { SectionViewShape } from "@/redux/currentApp/editor/components/componentsState"
import { useDispatch } from "react-redux"
import { executionActions } from "@/redux/currentApp/executionTree/executionSlice"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"

export const ListBody: FC<BodyProps> = (props) => {
  const { sectionNodeExecutionResult } = props
  const dispatch = useDispatch()
  const {
    sectionViewConfigs,
    currentViewIndex,
    viewSortedKey,
    displayName,
  } = sectionNodeExecutionResult
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
        }),
      )
    },
    [dispatch, displayName, sectionViewConfigs],
  )
  return (
    <div css={viewsListBodyWrapperStyle}>
      {sectionViewConfigs.map((config: SectionViewShape, index: number) => {
        const currentDisplayName = viewSortedKey[currentViewIndex]
        const otherKeys = sectionViewConfigs
          .map((views: SectionViewShape, i: number) => views.key || i)
          .filter((key: string, i: number) => i != index) as string[]
        const isSelected = currentDisplayName === config.viewDisplayName
        return (
          <Item
            key={config.id}
            name={config.key}
            otherKeys={otherKeys}
            isSelected={isSelected}
            path={config.path}
            viewDisplayName={config.viewDisplayName}
            index={index}
            handleChangSectionView={handleChangSectionView}
            handleDeleteSectionView={handleDeleteSectionView}
          />
        )
      })}
    </div>
  )
}
