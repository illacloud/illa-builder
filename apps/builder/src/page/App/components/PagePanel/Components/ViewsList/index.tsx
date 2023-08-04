import { FC } from "react"
import { useSelector } from "react-redux"
import {
  getCanvas,
  searchDsl,
} from "@/redux/currentApp/editor/components/componentsSelector"
import {
  getRootNodeExecutionResult,
  getSectionExecutionResultArray,
} from "@/redux/currentApp/executionTree/executionSelector"
import { RootState } from "@/store"
import { ListBody } from "./body"
import { EmptyState } from "./emptyState"
import { ViewListHeader } from "./header"
import { ViewListProps } from "./interface"
import { viewsListWrapperStyle } from "./style"

export const ViewList: FC<ViewListProps> = (props) => {
  const { sectionName } = props
  const rootNodeProps = useSelector(getRootNodeExecutionResult)
  const { currentPageIndex, pageSortedKey } = rootNodeProps
  const currentPageDisplayName = pageSortedKey[currentPageIndex]
  const sectionNodeExecutionResult = useSelector<RootState>((state) => {
    const canvas = getCanvas(state)
    const currentPageNode = searchDsl(canvas, currentPageDisplayName)
    if (!currentPageNode) return null
    const currentSectionNode = currentPageNode.childrenNode.find(
      (node) => node.showName === sectionName,
    )
    if (!currentSectionNode) return null
    const currentSectionDisplayName = currentSectionNode.displayName
    const execution = getSectionExecutionResultArray(state)
    return execution[currentSectionDisplayName] || null
  }) as Record<string, any>
  if (!sectionNodeExecutionResult) return null
  return (
    <div css={viewsListWrapperStyle}>
      <ViewListHeader
        sectionName={sectionName}
        parentNodeDisplayName={sectionNodeExecutionResult.displayName}
      />
      {Array.isArray(sectionNodeExecutionResult.sectionViewConfigs) &&
      sectionNodeExecutionResult.sectionViewConfigs.length > 0 ? (
        <ListBody
          sectionName={sectionName}
          parentNodeDisplayName={sectionNodeExecutionResult.displayName}
          currentViewIndex={sectionNodeExecutionResult.currentViewIndex}
          viewSortedKey={sectionNodeExecutionResult.viewSortedKey}
          sectionViewConfigs={sectionNodeExecutionResult.sectionViewConfigs}
        />
      ) : (
        <EmptyState />
      )}
    </div>
  )
}
