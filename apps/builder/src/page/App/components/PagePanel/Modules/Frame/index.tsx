import { FC, useCallback, useMemo } from "react"
import { PanelBar } from "@/components/PanelBar"
import { useTranslation } from "react-i18next"
import { Input, InputNumber, RadioGroup, Switch } from "@illa-design/react"
import { ReactComponent as FrameFixedIcon } from "@/assets/rightPagePanel/frame-fixed.svg"
import { ReactComponent as FrameResponsiveIcon } from "@/assets/rightPagePanel/frame-responsive.svg"
import { PageLabel } from "@/page/App/components/PagePanel/Components/Label"
import { LayoutSelect } from "@/page/App/components/PagePanel/Components/LayoutSelect"
import { LeftAndRightLayout } from "@/page/App/components/PagePanel/Layout/leftAndRight"
import { SetterPadding } from "@/page/App/components/PagePanel/Layout/setterPadding"
import { PanelDivider } from "@/page/App/components/PagePanel/Layout/divider"
import { useDispatch, useSelector } from "react-redux"
import {
  getCurrentPageDisplayName,
  getCurrentPageProps,
} from "@/redux/currentApp/editor/components/componentsSelector"
import { PageNodeProps } from "@/redux/currentApp/editor/components/componentsState"
import { PanelActionBar } from "@/page/App/components/PagePanel/Components/PanelActionBar"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"

const getRealCanvasWidth = (
  canvasSize: "fixed" | "responsive",
  canvasWidth: string,
) => {
  if (canvasSize === "fixed") return canvasWidth
  return "auto"
}

const canvasSizeOptions = [
  { label: <FrameFixedIcon />, value: "fixed" },
  { label: <FrameResponsiveIcon />, value: "responsive" },
]

export const PageFrame: FC = () => {
  const { t } = useTranslation()
  const pageProps = useSelector(getCurrentPageProps) as PageNodeProps
  const dispatch = useDispatch()
  const {
    canvasSize,
    canvasWidth,
    layout,
    leftWidth,
    rightWidth,
    topHeight,
    bottomHeight,
    isLeftFixed,
    isRightFixed,
    isFooterFixed,
    isHeaderFixed,
    hasLeft,
    hasRight,
    hasFooter,
    hasHeader,
  } = pageProps

  const finalCanvasWidth = getRealCanvasWidth(canvasSize, canvasWidth)
  const widthI18n = useMemo(() => {
    return canvasSize === "fixed"
      ? `${t("editor.page.label_name.width")}(px)`
      : `${t("editor.page.label_name.width")}(%)`
  }, [canvasSize, t])
  const currentPageDisplayName = useSelector(getCurrentPageDisplayName)

  const handleDeleteSection = useCallback(
    (
      deleteSectionName:
        | "leftSection"
        | "rightSection"
        | "headerSection"
        | "footerSection",
      options: Record<string, any>,
    ) => {
      if (!currentPageDisplayName) return
      dispatch(
        componentsActions.deleteTargetPageSectionReducer({
          pageName: currentPageDisplayName,
          deleteSectionName,
          options,
        }),
      )
    },
    [currentPageDisplayName, dispatch],
  )

  const handleAddSection = useCallback(
    (
      addedSectionName:
        | "leftSection"
        | "rightSection"
        | "headerSection"
        | "footerSection",
      options: Record<string, any>,
    ) => {
      if (!currentPageDisplayName) return
      dispatch(
        componentsActions.addTargetPageSectionReducer({
          pageName: currentPageDisplayName,
          addedSectionName,
          options,
        }),
      )
    },
    [currentPageDisplayName, dispatch],
  )

  return (
    <PanelBar title={t("editor.page.panel_bar_title.frame")}>
      <LeftAndRightLayout>
        <RadioGroup
          type="button"
          options={canvasSizeOptions}
          value={canvasSize}
          w="100%"
        />
      </LeftAndRightLayout>
      <LeftAndRightLayout>
        <PageLabel
          labelName={`${t("editor.page.label_name.width")}(px)`}
          size="big"
        />
        <SetterPadding>
          <Input
            w="96px"
            value={finalCanvasWidth}
            disabled={canvasSize === "responsive"}
            borderColor="techPurple"
          />
        </SetterPadding>
      </LeftAndRightLayout>
      <PanelDivider />
      <LeftAndRightLayout>
        <PageLabel labelName={t("editor.page.label_name.preset")} size="big" />
        <SetterPadding>
          <LayoutSelect value={layout} />
        </SetterPadding>
      </LeftAndRightLayout>
      <PanelDivider hasMargin={false} />
      <LeftAndRightLayout>
        <PageLabel
          labelName={t("editor.page.label_name.left_panel")}
          size="big"
        />
        <SetterPadding>
          <PanelActionBar
            isFixed={isLeftFixed}
            hasPanel={hasLeft}
            deletePanelAction={() => {
              handleDeleteSection("leftSection", {
                hasLeft: false,
                leftWidth: 0,
                leftPosition: "NONE",
              })
            }}
            addPanelAction={() => {
              handleAddSection("leftSection", {
                hasLeft: true,
                leftWidth: 20,
                leftPosition: "FULL",
              })
            }}
          />
        </SetterPadding>
      </LeftAndRightLayout>
      {hasLeft && (
        <>
          <LeftAndRightLayout>
            <PageLabel labelName={widthI18n} size="small" />
            <SetterPadding>
              <InputNumber
                w="96px"
                value={leftWidth}
                borderColor="techPurple"
              />
            </SetterPadding>
          </LeftAndRightLayout>
          <LeftAndRightLayout>
            <PageLabel
              labelName={t("editor.page.label_name.show_fold_icon")}
              size="small"
              tooltip="xxxxxxxxxx"
            />
            <SetterPadding>
              <Switch />
            </SetterPadding>
          </LeftAndRightLayout>
        </>
      )}
      <PanelDivider />
      <LeftAndRightLayout>
        <PageLabel
          labelName={t("editor.page.label_name.right_panel")}
          size="big"
        />
        <SetterPadding>
          <PanelActionBar
            isFixed={isRightFixed}
            hasPanel={hasRight}
            deletePanelAction={() => {
              handleDeleteSection("rightSection", {
                hasRight: false,
                rightWidth: 0,
                rightPosition: "NONE",
              })
            }}
            addPanelAction={() => {
              handleAddSection("rightSection", {
                hasRight: true,
                rightWidth: 20,
                rightPosition: "FULL",
              })
            }}
          />
        </SetterPadding>
      </LeftAndRightLayout>
      {hasRight && (
        <LeftAndRightLayout>
          <PageLabel labelName={widthI18n} size="small" />
          <SetterPadding>
            <InputNumber w="96px" value={rightWidth} borderColor="techPurple" />
          </SetterPadding>
        </LeftAndRightLayout>
      )}
      <PanelDivider />
      <LeftAndRightLayout>
        <PageLabel labelName={t("editor.page.label_name.body")} size="big" />
      </LeftAndRightLayout>
      <LeftAndRightLayout>
        <PageLabel labelName={widthI18n} size="small" />
        <SetterPadding>
          <InputNumber w="96px" borderColor="techPurple" />
        </SetterPadding>
      </LeftAndRightLayout>
      <PanelDivider />
      <LeftAndRightLayout>
        <PageLabel labelName={t("editor.page.label_name.header")} size="big" />
        <SetterPadding>
          <PanelActionBar
            isFixed={isHeaderFixed}
            hasPanel={hasHeader}
            deletePanelAction={() => {
              handleDeleteSection("headerSection", {
                hasHeader: false,
                topHeight: 0,
              })
            }}
            addPanelAction={() => {
              handleAddSection("headerSection", {
                hasHeader: true,
                topHeight: 96,
              })
            }}
          />
        </SetterPadding>
      </LeftAndRightLayout>
      {hasHeader && (
        <LeftAndRightLayout>
          <PageLabel
            labelName={`${t("editor.page.label_name.width")}(px)`}
            size="small"
          />
          <SetterPadding>
            <InputNumber w="96px" value={topHeight} borderColor="techPurple" />
          </SetterPadding>
        </LeftAndRightLayout>
      )}
      <PanelDivider />
      <LeftAndRightLayout>
        <PageLabel labelName={t("editor.page.label_name.footer")} size="big" />
        <SetterPadding>
          <PanelActionBar
            isFixed={isFooterFixed}
            hasPanel={hasFooter}
            deletePanelAction={() => {
              handleDeleteSection("footerSection", {
                hasFooter: false,
                bottomHeight: 0,
              })
            }}
            addPanelAction={() => {
              handleAddSection("footerSection", {
                hasFooter: true,
                bottomHeight: 96,
              })
            }}
          />
        </SetterPadding>
      </LeftAndRightLayout>
      {hasFooter && (
        <LeftAndRightLayout>
          <PageLabel
            labelName={`${t("editor.page.label_name.width")}(px)`}
            size="small"
          />
          <SetterPadding>
            <InputNumber
              w="96px"
              value={bottomHeight}
              borderColor="techPurple"
            />
          </SetterPadding>
        </LeftAndRightLayout>
      )}
    </PanelBar>
  )
}

PageFrame.displayName = "PageFrame"
