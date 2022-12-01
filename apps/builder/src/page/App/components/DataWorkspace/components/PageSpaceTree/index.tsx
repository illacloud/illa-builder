import { FC, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Dropdown } from "@illa-design/react"
import { ReactComponent as HomepageIcon } from "@/assets/dataWorkspace/homepage.svg"
import { PanelBar } from "@/components/PanelBar"
import { ActionMenu } from "@/page/App/components/PagePanel/Components/PanelHeader/actionMenu"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { RootComponentNodeProps } from "@/redux/currentApp/editor/components/componentsState"
import { getRootNodeExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { executionActions } from "@/redux/currentApp/executionTree/executionSlice"
import { generatePageConfig } from "@/utils/generators/generatePageOrSectionConfig"
import { PageItemProps } from "./interface"
import {
  homePageIconHotSpot,
  homePageIconStyle,
  pageItemWrapperStyle,
  pageNameStyle,
} from "./style"

export const PageItem: FC<PageItemProps> = (props) => {
  const {
    isHomePage = false,
    isSelected = false,
    pageName,
    index,
    changeCurrentPageIndex,
    allKeys,
  } = props
  return (
    <Dropdown
      position="bottom-start"
      trigger="contextmenu"
      dropList={<ActionMenu pageDisplayName={pageName} pageKeys={allKeys} />}
    >
      <div
        css={pageItemWrapperStyle(isSelected)}
        onClick={() => {
          changeCurrentPageIndex(index)
        }}
      >
        <span css={pageNameStyle}>{pageName}</span>
        <div css={homePageIconHotSpot}>
          {isHomePage && <HomepageIcon css={homePageIconStyle} />}
        </div>
      </div>
    </Dropdown>
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
              allKeys={pageSortedKey}
            />
          )
        })}
    </PanelBar>
  )
}
