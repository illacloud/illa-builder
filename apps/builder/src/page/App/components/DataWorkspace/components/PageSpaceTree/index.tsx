import { FC, useCallback } from "react"
import { PanelBar } from "@/components/PanelBar"
import { useTranslation } from "react-i18next"
import { homePageIconStyle, pageItemWrapperStyle, pageNameStyle } from "./style"
import { PageItemProps } from "./interface"
import { ReactComponent as HomepageIcon } from "@/assets/dataWorkspace/homepage.svg"
import { useDispatch, useSelector } from "react-redux"
import { getRootNodeExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { generatePageConfig } from "@/utils/generators/generatePageOrSectionConfig"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { RootComponentNodeProps } from "@/redux/currentApp/editor/components/componentsState"
import { executionActions } from "@/redux/currentApp/executionTree/executionSlice"

export const PageItem: FC<PageItemProps> = (props) => {
  const {
    isHomePage = false,
    isSelected = false,
    pageName,
    index,
    changeCurrentPageIndex,
  } = props
  return (
    <div
      css={pageItemWrapperStyle(isSelected)}
      onClick={() => {
        changeCurrentPageIndex(index)
      }}
    >
      <span css={pageNameStyle}>{pageName}</span>
      {isHomePage && <HomepageIcon css={homePageIconStyle} />}
    </div>
  )
}

export const PageSpaceTree: FC = () => {
  const { t } = useTranslation()
  const rootNodeProps = useSelector(
    getRootNodeExecutionResult,
  ) as RootComponentNodeProps
  const { pageSortedKey, currentPageIndex, homepageDisplayName } = rootNodeProps
  const dispatch = useDispatch()
  const handleClickAddButton = useCallback(() => {
    const newPageConfig = generatePageConfig()
    dispatch(componentsActions.addPageNodeWithSortOrderReducer([newPageConfig]))
  }, [dispatch])
  const changeCurrentPage = useCallback(
    (index: number) => {
      if (index === currentPageIndex) return
      dispatch(
        executionActions.updateExecutionByDisplayNameReducer({
          displayName: "root",
          value: {
            currentPageIndex: index,
          },
        }),
      )
    },
    [currentPageIndex, dispatch],
  )
  return (
    <PanelBar
      title={t("editor.data_work_space.pages_title")}
      isAddIcon
      addAction={handleClickAddButton}
    >
      {Array.isArray(pageSortedKey) &&
        pageSortedKey.map((key: string, index: number) => {
          const isSelected = currentPageIndex === index
          const isHomePage = homepageDisplayName
            ? homepageDisplayName === key
            : index === 0
          return (
            <PageItem
              isSelected={isSelected}
              isHomePage={isHomePage}
              index={index}
              pageName={key}
              key={key}
              changeCurrentPageIndex={changeCurrentPage}
            />
          )
        })}
    </PanelBar>
  )
}
