import { FC, useCallback, useMemo } from "react"
import { PanelBar } from "@/components/PanelBar"
import { useTranslation } from "react-i18next"
import { LeftAndRightLayout } from "../../Layout/leftAndRight"
import { PageLabel } from "../../Components/Label"
import { SetterPadding } from "../../Layout/setterPadding"
import { Switch } from "@illa-design/react"
import { useDispatch, useSelector } from "react-redux"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { getRootNodeExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"

export const PageBasic: FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const rootExecutionProps = useSelector(getRootNodeExecutionResult)

  const { currentPageIndex, pageSortedKey, homepageDisplayName } =
    rootExecutionProps
  const currentPageDisplayName = pageSortedKey[currentPageIndex]

  const isHomepage = useMemo(() => {
    return homepageDisplayName
      ? homepageDisplayName === currentPageDisplayName
      : true
  }, [currentPageDisplayName, homepageDisplayName])

  const handleChangeIsHomePage = useCallback(
    (value?: boolean) => {
      if (currentPageDisplayName !== homepageDisplayName) {
        dispatch(
          componentsActions.updateRootNodePropsReducer({
            homepageDisplayName: currentPageDisplayName,
          }),
        )
      }
    },
    [currentPageDisplayName, dispatch, homepageDisplayName],
  )
  return (
    <PanelBar title={t("editor.page.panel_bar_title.basic")}>
      <LeftAndRightLayout>
        <PageLabel
          labelName={t("editor.page.label_name.set_as_homepage")}
          size="small"
        />
        <SetterPadding>
          <Switch checked={isHomepage} onChange={handleChangeIsHomePage} />
        </SetterPadding>
      </LeftAndRightLayout>
    </PanelBar>
  )
}
