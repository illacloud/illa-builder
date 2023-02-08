import { FC, useCallback, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Input, Switch } from "@illa-design/react"
import { PanelBar } from "@/components/PanelBar"
import { PageLabel } from "@/page/App/components/PagePanel/Components/Label"
import { ViewList } from "@/page/App/components/PagePanel/Components/ViewsList"
import { PanelDivider } from "@/page/App/components/PagePanel/Layout/divider"
import { LeftAndRightLayout } from "@/page/App/components/PagePanel/Layout/leftAndRight"
import { SetterPadding } from "@/page/App/components/PagePanel/Layout/setterPadding"
import {
  getCanvas,
  searchDsl,
} from "@/redux/currentApp/editor/components/componentsSelector"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import {
  PageNodeProps,
  SectionNode,
} from "@/redux/currentApp/editor/components/componentsState"
import { getRootNodeExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { RootState } from "@/store"

export const PageBasic: FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const rootExecutionProps = useSelector(getRootNodeExecutionResult)

  const { currentPageIndex, pageSortedKey, homepageDisplayName } =
    rootExecutionProps
  const currentPageDisplayName = pageSortedKey[currentPageIndex]
  const pageProps = useSelector<RootState>((state) => {
    const canvas = getCanvas(state)
    return searchDsl(canvas, currentPageDisplayName)?.props || {}
  }) as PageNodeProps
  const sectionNodes = useSelector<RootState>((state) => {
    const canvas = getCanvas(state)
    const currentPageNode = searchDsl(canvas, currentPageDisplayName)
    if (!currentPageNode) return null
    return currentPageNode.childrenNode
  }) as SectionNode[] | null

  const { hasLeft, hasRight, hasFooter, hasHeader } = pageProps
  const isHomepage = useMemo(() => {
    return homepageDisplayName
      ? homepageDisplayName === currentPageDisplayName
      : currentPageDisplayName === "page1"
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

  const targetDefaultViewValue = useCallback(
    (showName: string) => {
      if (!Array.isArray(sectionNodes)) return ""
      const targetSectionNode = sectionNodes.find((node) => {
        return node.showName === showName
      })
      if (!targetSectionNode) return ""
      return targetSectionNode.props.defaultViewKey
    },
    [sectionNodes],
  )

  const handleChangeDefaultView = useCallback(
    (value: string, showName: string) => {
      if (!Array.isArray(sectionNodes)) return
      const targetSectionNode = sectionNodes.find((node) => {
        return node.showName === showName
      })
      if (!targetSectionNode) return
      dispatch(
        componentsActions.updateSectionViewPropsReducer({
          parentNodeName: targetSectionNode.displayName,
          newProps: {
            defaultViewKey: value,
          },
        }),
      )
    },
    [dispatch, sectionNodes],
  )
  return (
    <PanelBar title={t("editor.page.panel_bar_title.basic")}>
      <LeftAndRightLayout>
        <PageLabel
          labelName={t("editor.page.label_name.set_as_homepage")}
          size="small"
        />
        <SetterPadding>
          <Switch
            checked={isHomepage}
            onChange={handleChangeIsHomePage}
            colorScheme="techPurple"
          />
        </SetterPadding>
      </LeftAndRightLayout>
      <LeftAndRightLayout>
        <PageLabel labelName={t("editor.page.label_name.body")} size="big" />
      </LeftAndRightLayout>
      <LeftAndRightLayout>
        <SetterPadding>
          <ViewList sectionName="bodySection" />
        </SetterPadding>
      </LeftAndRightLayout>
      <LeftAndRightLayout>
        <PageLabel
          labelName={t("editor.page.label_name.default_view")}
          size="small"
        />
        <SetterPadding>
          <Input
            value={targetDefaultViewValue("bodySection")}
            onChange={(value) => {
              handleChangeDefaultView(value, "bodySection")
            }}
            colorScheme="techPurple"
          />
        </SetterPadding>
      </LeftAndRightLayout>
      {hasLeft && (
        <>
          <PanelDivider />
          <LeftAndRightLayout>
            <PageLabel
              labelName={t("editor.page.label_name.left_panel")}
              size="big"
            />
          </LeftAndRightLayout>
          <LeftAndRightLayout>
            <SetterPadding>
              <ViewList sectionName="leftSection" />
            </SetterPadding>
          </LeftAndRightLayout>
          <LeftAndRightLayout>
            <PageLabel
              labelName={t("editor.page.label_name.default_view")}
              size="small"
            />
            <SetterPadding>
              <Input
                value={targetDefaultViewValue("leftSection")}
                onChange={(value) => {
                  handleChangeDefaultView(value, "leftSection")
                }}
                colorScheme="techPurple"
              />
            </SetterPadding>
          </LeftAndRightLayout>
        </>
      )}
      {hasRight && (
        <>
          <PanelDivider />
          <LeftAndRightLayout>
            <PageLabel
              labelName={t("editor.page.label_name.right_panel")}
              size="big"
            />
          </LeftAndRightLayout>
          <LeftAndRightLayout>
            <SetterPadding>
              <ViewList sectionName="rightSection" />
            </SetterPadding>
          </LeftAndRightLayout>
          <LeftAndRightLayout>
            <PageLabel
              labelName={t("editor.page.label_name.default_view")}
              size="small"
            />
            <SetterPadding>
              <Input
                value={targetDefaultViewValue("rightSection")}
                onChange={(value) => {
                  handleChangeDefaultView(value, "rightSection")
                }}
                colorScheme="techPurple"
              />
            </SetterPadding>
          </LeftAndRightLayout>
        </>
      )}
      {hasHeader && (
        <>
          <PanelDivider />
          <LeftAndRightLayout>
            <PageLabel
              labelName={t("editor.page.label_name.header")}
              size="big"
            />
          </LeftAndRightLayout>
          <LeftAndRightLayout>
            <SetterPadding>
              <ViewList sectionName="headerSection" />
            </SetterPadding>
          </LeftAndRightLayout>
          <LeftAndRightLayout>
            <PageLabel
              labelName={t("editor.page.label_name.default_view")}
              size="small"
            />
            <SetterPadding>
              <Input
                value={targetDefaultViewValue("headerSection")}
                onChange={(value) => {
                  handleChangeDefaultView(value, "headerSection")
                }}
                colorScheme="techPurple"
              />
            </SetterPadding>
          </LeftAndRightLayout>
        </>
      )}
      {hasFooter && (
        <>
          <PanelDivider />
          <LeftAndRightLayout>
            <PageLabel
              labelName={t("editor.page.label_name.footer")}
              size="big"
            />
          </LeftAndRightLayout>
          <LeftAndRightLayout>
            <SetterPadding>
              <ViewList sectionName="footerSection" />
            </SetterPadding>
          </LeftAndRightLayout>
          <LeftAndRightLayout>
            <PageLabel
              labelName={t("editor.page.label_name.default_view")}
              size="small"
            />
            <SetterPadding>
              <Input
                value={targetDefaultViewValue("footerSection")}
                onChange={(value) => {
                  handleChangeDefaultView(value, "footerSection")
                }}
                colorScheme="techPurple"
              />
            </SetterPadding>
          </LeftAndRightLayout>
        </>
      )}
    </PanelBar>
  )
}
