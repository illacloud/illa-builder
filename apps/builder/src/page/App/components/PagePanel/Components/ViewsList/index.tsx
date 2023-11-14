import { FC } from "react"
import { useSelector } from "react-redux"
import {
  getComponentMap,
  searchComponentFromMap,
} from "@/redux/currentApp/components/componentsSelector"
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
    const components = getComponentMap(state)
    const currentPageNode = searchComponentFromMap(
      components,
      currentPageDisplayName,
    )
    if (!currentPageNode) return null
    const currentSectionNodeDisplayName = currentPageNode.childrenNode.find(
      (childDisplayName) =>
        components[childDisplayName].showName === sectionName,
    )
    if (!currentSectionNodeDisplayName) return null
    const execution = getSectionExecutionResultArray(state)
    return execution[currentSectionNodeDisplayName] || null
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
