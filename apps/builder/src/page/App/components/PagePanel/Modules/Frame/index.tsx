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
import { getCanvasShape } from "@/redux/config/configSelector"
import {
  BODY_MIN_HEIGHT,
  BODY_MIN_WIDTH,
  FOOTER_MIN_HEIGHT,
  HEADER_MIN_HEIGHT,
  LEFT_MIN_WIDTH,
  RIGHT_MIN_WIDTH,
} from "@/page/App/components/DotPanel/renderSection"

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
  const canvasShape = useSelector(getCanvasShape)
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

  const bodyWidth = useMemo(() => {
    if (canvasSize === "responsive") {
      return 100 - leftWidth - rightWidth
    } else {
      return 0
    }
  }, [canvasSize, leftWidth, rightWidth])

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

  const handleUpdateBodyPanelWidth = useCallback(
    (value?: number) => {
      if (!currentPageDisplayName || !value) return
      let finalValue = value
      let finalLeftValue = leftWidth
      let finalRightValue = rightWidth
      if (canvasSize === "responsive") {
        let finalLeftValuePX = (finalLeftValue / 100) * canvasShape.canvasWidth
        let finalRightValuePX =
          (finalRightValue / 100) * canvasShape.canvasWidth
        let finalValuePX = (finalValue / 100) * canvasShape.canvasWidth
        if (finalValuePX <= BODY_MIN_HEIGHT) {
          const restWidth = canvasShape.canvasWidth - BODY_MIN_HEIGHT
          finalLeftValuePX =
            (finalLeftValuePX / (finalLeftValuePX + finalRightValuePX)) *
            restWidth
          finalRightValuePX = restWidth - finalLeftValuePX
          finalLeftValue = (finalLeftValuePX / canvasShape.canvasWidth) * 100
          finalRightValue = (finalRightValuePX / canvasShape.canvasWidth) * 100
        } else {
          let restWidth = canvasShape.canvasWidth - finalValuePX
          finalLeftValuePX =
            (finalLeftValuePX / (finalLeftValuePX + finalRightValuePX)) *
            restWidth
          if (finalLeftValuePX < LEFT_MIN_WIDTH) {
            finalLeftValuePX = LEFT_MIN_WIDTH
          }
          finalRightValuePX = restWidth - finalLeftValuePX
          if (finalRightValuePX < RIGHT_MIN_WIDTH) {
            finalRightValuePX = LEFT_MIN_WIDTH
          }
          finalLeftValue = (finalLeftValuePX / canvasShape.canvasWidth) * 100
          finalRightValue = (RIGHT_MIN_WIDTH / canvasShape.canvasWidth) * 100
        }
      }
      if (canvasSize === "fixed") {
      }

      dispatch(
        componentsActions.updateTargetPagePropsReducer({
          pageName: currentPageDisplayName,
          newProps: {
            leftWidth: finalLeftValue,
            rightWidth: finalRightValue,
          },
        }),
      )
    },
    [
      canvasShape.canvasWidth,
      canvasSize,
      currentPageDisplayName,
      dispatch,
      leftWidth,
      rightWidth,
    ],
  )

  const handleUpdateLeftPanelWidth = useCallback(
    (value?: number) => {
      if (!currentPageDisplayName || !value) return
      let finalValue = value
      if (canvasSize === "responsive") {
        const leftWidthPX = (value / 100) * canvasShape.canvasWidth
        const currentRightWidthPX = (rightWidth / 100) * canvasShape.canvasWidth
        if (
          canvasShape.canvasWidth - leftWidthPX - currentRightWidthPX <
          BODY_MIN_WIDTH
        ) {
          finalValue =
            ((canvasShape.canvasWidth - currentRightWidthPX - BODY_MIN_WIDTH) /
              canvasShape.canvasWidth) *
            100
        }
        if ((value / 100) * canvasShape.canvasWidth < LEFT_MIN_WIDTH) {
          finalValue = (LEFT_MIN_WIDTH / canvasShape.canvasWidth) * 100
        }
      }
      if (canvasSize === "fixed") {
      }

      dispatch(
        componentsActions.updateTargetPagePropsReducer({
          pageName: currentPageDisplayName,
          newProps: {
            leftWidth: finalValue,
          },
        }),
      )
    },
    [
      canvasShape.canvasWidth,
      canvasSize,
      currentPageDisplayName,
      dispatch,
      rightWidth,
    ],
  )

  const handleUpdateRightPanelWidth = useCallback(
    (value?: number) => {
      if (!currentPageDisplayName || !value) return
      let finalValue = value
      if (canvasSize === "responsive") {
        const rightWidthPX = (value / 100) * canvasShape.canvasWidth
        const currentLeftWidthPX = (leftWidth / 100) * canvasShape.canvasWidth
        if (
          canvasShape.canvasWidth - rightWidthPX - currentLeftWidthPX <
          BODY_MIN_WIDTH
        ) {
          finalValue =
            ((canvasShape.canvasWidth - currentLeftWidthPX - BODY_MIN_WIDTH) /
              canvasShape.canvasWidth) *
            100
        }
        if ((value / 100) * canvasShape.canvasWidth < RIGHT_MIN_WIDTH) {
          finalValue = (RIGHT_MIN_WIDTH / canvasShape.canvasWidth) * 100
        }
      }
      if (canvasSize === "fixed") {
      }

      dispatch(
        componentsActions.updateTargetPagePropsReducer({
          pageName: currentPageDisplayName,
          newProps: {
            rightWidth: finalValue,
          },
        }),
      )
    },
    [
      canvasShape.canvasWidth,
      canvasSize,
      currentPageDisplayName,
      dispatch,
      leftWidth,
    ],
  )

  const handleUpdateHeaderPanelWidth = useCallback(
    (value?: number) => {
      if (!currentPageDisplayName || !value) return
      let finalValue = value
      if (canvasSize === "responsive") {
        if (canvasShape.canvasHeight - value - bottomHeight < BODY_MIN_HEIGHT) {
          finalValue = canvasShape.canvasHeight - bottomHeight - BODY_MIN_HEIGHT
        }
        if (value < HEADER_MIN_HEIGHT) {
          finalValue = HEADER_MIN_HEIGHT
        }
      }
      if (canvasSize === "fixed") {
      }

      dispatch(
        componentsActions.updateTargetPagePropsReducer({
          pageName: currentPageDisplayName,
          newProps: {
            topHeight: finalValue,
          },
        }),
      )
    },
    [
      bottomHeight,
      canvasShape.canvasHeight,
      canvasSize,
      currentPageDisplayName,
      dispatch,
    ],
  )

  const handleUpdateFooterPanelWidth = useCallback(
    (value?: number) => {
      if (!currentPageDisplayName || !value) return
      let finalValue = value
      if (canvasSize === "responsive") {
        if (canvasShape.canvasHeight - value - topHeight < BODY_MIN_HEIGHT) {
          finalValue = canvasShape.canvasHeight - topHeight - BODY_MIN_HEIGHT
        }
        if (value < FOOTER_MIN_HEIGHT) {
          finalValue = FOOTER_MIN_HEIGHT
        }
      }
      if (canvasSize === "fixed") {
      }

      dispatch(
        componentsActions.updateTargetPagePropsReducer({
          pageName: currentPageDisplayName,
          newProps: {
            bottomHeight: finalValue,
          },
        }),
      )
    },
    [
      canvasShape.canvasHeight,
      canvasSize,
      currentPageDisplayName,
      dispatch,
      topHeight,
    ],
  )

  return (
    <PanelBar title={t("editor.page.panel_bar_title.frame")}>
      {/* <LeftAndRightLayout>
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
      <PanelDivider /> */}
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
                layout: "Custom",
              })
            }}
            addPanelAction={() => {
              handleAddSection("leftSection", {
                hasLeft: true,
                leftWidth: 20,
                leftPosition: "FULL",
                layout: "Custom",
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
                value={leftWidth.toFixed(0)}
                borderColor="techPurple"
                onChange={handleUpdateLeftPanelWidth}
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
                layout: "Custom",
              })
            }}
            addPanelAction={() => {
              handleAddSection("rightSection", {
                hasRight: true,
                rightWidth: 20,
                rightPosition: "FULL",
                layout: "Custom",
              })
            }}
          />
        </SetterPadding>
      </LeftAndRightLayout>
      {hasRight && (
        <LeftAndRightLayout>
          <PageLabel labelName={widthI18n} size="small" />
          <SetterPadding>
            <InputNumber
              w="96px"
              value={rightWidth.toFixed(0)}
              borderColor="techPurple"
              onChange={handleUpdateRightPanelWidth}
            />
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
          <InputNumber
            w="96px"
            borderColor="techPurple"
            value={bodyWidth.toFixed(0)}
            onChange={handleUpdateBodyPanelWidth}
          />
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
                layout: "Custom",
              })
            }}
            addPanelAction={() => {
              handleAddSection("headerSection", {
                hasHeader: true,
                topHeight: 96,
                layout: "Custom",
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
            <InputNumber
              w="96px"
              value={topHeight}
              borderColor="techPurple"
              onChange={handleUpdateHeaderPanelWidth}
            />
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
                layout: "Custom",
              })
            }}
            addPanelAction={() => {
              handleAddSection("footerSection", {
                hasFooter: true,
                bottomHeight: 96,
                layout: "Custom",
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
              onChange={handleUpdateFooterPanelWidth}
            />
          </SetterPadding>
        </LeftAndRightLayout>
      )}
    </PanelBar>
  )
}

PageFrame.displayName = "PageFrame"
