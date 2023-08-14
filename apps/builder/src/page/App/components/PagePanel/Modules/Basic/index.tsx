import { ILLA_MIXPANEL_EVENT_TYPE } from "@illa-public/mixpanel-utils"
import { FC, useCallback, useEffect, useMemo, useRef } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Input, Switch } from "@illa-design/react"
import { PanelBar } from "@/components/PanelBar"
import { PageLabel } from "@/page/App/components/PagePanel/Components/Label"
import { ViewList } from "@/page/App/components/PagePanel/Components/ViewsList"
import { PanelDivider } from "@/page/App/components/PagePanel/Layout/divider"
import { LeftAndRightLayout } from "@/page/App/components/PagePanel/Layout/leftAndRight"
import { SetterPadding } from "@/page/App/components/PagePanel/Layout/setterPadding"
import { VerticalLayout } from "@/page/App/components/PagePanel/Layout/verticalLayout"
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
import { trackInEditor } from "@/utils/mixpanelHelper"
import { placePaddingStyle } from "./style"

export const PageBasic: FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const rootExecutionProps = useSelector(getRootNodeExecutionResult)
  const homepageControlRef = useRef<HTMLButtonElement>(null)
  const isReportFlag = useRef<boolean>(false)

  const intersectionObserver = useRef<IntersectionObserver | null>(
    new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (isReportFlag.current) return
          trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.SHOW, {
            element: "homepage_switch",
          })
          isReportFlag.current = true
        }
      })
    }),
  )
  const { currentPageIndex, pageSortedKey, homepageDisplayName } =
    rootExecutionProps

  useEffect(() => {
    const homepageControlValue = homepageControlRef.current
    const intersectionObserverValue = intersectionObserver.current
    if (!homepageControlValue) return
    intersectionObserverValue?.observe(homepageControlValue)
    return () => {
      if (!homepageControlValue) return
      intersectionObserverValue?.unobserve(homepageControlValue)
      isReportFlag.current = false
    }
  }, [currentPageIndex])

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

  const handleChangeIsHomePage = useCallback(() => {
    if (currentPageDisplayName !== homepageDisplayName) {
      dispatch(
        componentsActions.updateRootNodePropsReducer({
          homepageDisplayName: currentPageDisplayName,
          currentPageIndex: currentPageIndex,
        }),
      )
      trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
        element: "homepage_switch",
      })
    }
  }, [currentPageDisplayName, currentPageIndex, dispatch, homepageDisplayName])

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
          size="big"
        />
        <SetterPadding>
          <Switch
            checked={isHomepage}
            onChange={handleChangeIsHomePage}
            colorScheme="techPurple"
            ref={homepageControlRef}
          />
        </SetterPadding>
      </LeftAndRightLayout>
      <LeftAndRightLayout>
        <SetterPadding>
          <div css={placePaddingStyle}>
            <PageLabel
              labelName={t("editor.page.label_name.body")}
              size="big"
            />
          </div>
          <ViewList sectionName="bodySection" />
        </SetterPadding>
      </LeftAndRightLayout>
      <SetterPadding>
        <VerticalLayout>
          <PageLabel
            labelName={t("editor.page.label_name.default_view")}
            size="small"
          />
          <Input
            value={targetDefaultViewValue("bodySection")}
            onChange={(value) => {
              handleChangeDefaultView(value, "bodySection")
            }}
            colorScheme="techPurple"
          />
        </VerticalLayout>
      </SetterPadding>

      {hasLeft && (
        <>
          <PanelDivider />
          <LeftAndRightLayout>
            <SetterPadding>
              <div css={placePaddingStyle}>
                <PageLabel
                  labelName={t("editor.page.label_name.left_panel")}
                  size="big"
                />
              </div>
              <ViewList sectionName="leftSection" />
            </SetterPadding>
          </LeftAndRightLayout>
          <SetterPadding>
            <VerticalLayout>
              <PageLabel
                labelName={t("editor.page.label_name.default_view")}
                size="small"
              />
              <Input
                value={targetDefaultViewValue("leftSection")}
                onChange={(value) => {
                  handleChangeDefaultView(value, "leftSection")
                }}
                colorScheme="techPurple"
              />
            </VerticalLayout>
          </SetterPadding>
        </>
      )}
      {hasRight && (
        <>
          <PanelDivider />
          <LeftAndRightLayout>
            <SetterPadding>
              <div css={placePaddingStyle}>
                <PageLabel
                  labelName={t("editor.page.label_name.right_panel")}
                  size="big"
                />
              </div>
              <ViewList sectionName="rightSection" />
            </SetterPadding>
          </LeftAndRightLayout>
          <SetterPadding>
            <VerticalLayout>
              <PageLabel
                labelName={t("editor.page.label_name.default_view")}
                size="small"
              />
              <Input
                value={targetDefaultViewValue("rightSection")}
                onChange={(value) => {
                  handleChangeDefaultView(value, "rightSection")
                }}
                colorScheme="techPurple"
              />
            </VerticalLayout>
          </SetterPadding>
        </>
      )}
      {hasHeader && (
        <>
          <PanelDivider />
          <LeftAndRightLayout>
            <SetterPadding>
              <div css={placePaddingStyle}>
                <PageLabel
                  labelName={t("editor.page.label_name.header")}
                  size="big"
                />
              </div>
              <ViewList sectionName="headerSection" />
            </SetterPadding>
          </LeftAndRightLayout>
          <SetterPadding>
            <VerticalLayout>
              <PageLabel
                labelName={t("editor.page.label_name.default_view")}
                size="small"
              />
              <Input
                value={targetDefaultViewValue("headerSection")}
                onChange={(value) => {
                  handleChangeDefaultView(value, "headerSection")
                }}
                colorScheme="techPurple"
              />
            </VerticalLayout>
          </SetterPadding>
        </>
      )}
      {hasFooter && (
        <>
          <PanelDivider />
          <LeftAndRightLayout>
            <SetterPadding>
              <div css={placePaddingStyle}>
                <PageLabel
                  labelName={t("editor.page.label_name.footer")}
                  size="big"
                />
              </div>
              <ViewList sectionName="footerSection" />
            </SetterPadding>
          </LeftAndRightLayout>
          <SetterPadding>
            <VerticalLayout>
              <PageLabel
                labelName={t("editor.page.label_name.default_view")}
                size="small"
              />
              <Input
                value={targetDefaultViewValue("footerSection")}
                onChange={(value) => {
                  handleChangeDefaultView(value, "footerSection")
                }}
                colorScheme="techPurple"
              />
            </VerticalLayout>
          </SetterPadding>
        </>
      )}
    </PanelBar>
  )
}
