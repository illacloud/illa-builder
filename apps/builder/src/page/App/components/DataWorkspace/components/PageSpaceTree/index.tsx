import { ILLA_MIXPANEL_EVENT_TYPE } from "@illa-public/mixpanel-utils"
import { FC, MouseEvent, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { PlusIcon } from "@illa-design/react"
import { PanelBar } from "@/components/PanelBar"
import { customIconHotpotStyle } from "@/components/PanelBar/style"
import { getPageDisplayNameMapViewDisplayName } from "@/redux/currentApp/editor/components/componentsSelector"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { RootComponentNodeProps } from "@/redux/currentApp/editor/components/componentsState"
import { getRootNodeExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { FocusManager } from "@/utils/focusManager"
import { generatePageConfig } from "@/utils/generators/generatePageOrSectionConfig"
import { trackInEditor } from "@/utils/mixpanelHelper"
import PageItem from "./components/PageItem"
import { pageSpaceTreeStyle } from "./style"

export const PageSpaceTree: FC = () => {
  const { t } = useTranslation()
  const rootNodeProps = useSelector(
    getRootNodeExecutionResult,
  ) as RootComponentNodeProps
  const {
    currentPageIndex,
    homepageDisplayName,
    pageSortedKey = [],
    currentSubPagePath,
  } = rootNodeProps
  const currentPageDisplayName = pageSortedKey[currentPageIndex]
  const dispatch = useDispatch()

  const handleClickAddButton = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()
      trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
        element: "add_page",
      })
      const newPageConfig = generatePageConfig()
      dispatch(componentsActions.addPageNodeWithSortOrderReducer(newPageConfig))
    },
    [dispatch],
  )

  const pageDisplayNameMapSubPageDisplayName = useSelector(
    getPageDisplayNameMapViewDisplayName,
  )

  return (
    <PanelBar
      title={t("editor.data_work_space.pages_title")}
      destroyChildrenWhenClose
      customIcon={
        <div css={customIconHotpotStyle} onClick={handleClickAddButton}>
          <PlusIcon />
        </div>
      }
      onIllaFocus={() => {
        FocusManager.switchFocus("data_page")
      }}
    >
      <div css={pageSpaceTreeStyle}>
        {Object.keys(pageDisplayNameMapSubPageDisplayName).map((key, index) => {
          const isHomePage = homepageDisplayName
            ? homepageDisplayName === key
            : index === 0
          return (
            <PageItem
              isHomePage={isHomePage}
              pageName={key}
              key={key}
              level={1}
              subPagePaths={pageDisplayNameMapSubPageDisplayName[key]}
              currentPagePath={currentPageDisplayName}
              currentSubPagePath={currentSubPagePath}
            />
          )
        })}
      </div>
    </PanelBar>
  )
}
