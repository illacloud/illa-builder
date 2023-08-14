import { ILLA_MIXPANEL_EVENT_TYPE } from "@illa-public/mixpanel-utils"
import { FC, useCallback, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import {
  InputNumber,
  RadioGroup,
  Switch,
  useMessage,
  useModal,
} from "@illa-design/react"
import { ReactComponent as FrameFixedIcon } from "@/assets/rightPagePanel/frame-fixed.svg"
import { ReactComponent as FrameResponsiveIcon } from "@/assets/rightPagePanel/frame-responsive.svg"
import { PanelBar } from "@/components/PanelBar"
import i18n from "@/i18n/config"
import {
  BODY_MIN_HEIGHT,
  BODY_MIN_WIDTH,
  FOOTER_MIN_HEIGHT,
  HEADER_MIN_HEIGHT,
  LEFT_MIN_WIDTH,
  RIGHT_MIN_WIDTH,
} from "@/page/App/components/DotPanel/constant/canvas"
import {
  DEFAULT_PERCENT_WIDTH,
  DEFAULT_PX_WIDTH,
} from "@/page/App/components/DotPanel/constant/canvas"
import { PageLabel } from "@/page/App/components/PagePanel/Components/Label"
import { LayoutSelect } from "@/page/App/components/PagePanel/Components/LayoutSelect"
import { PanelActionBar } from "@/page/App/components/PagePanel/Components/PanelActionBar"
import { PanelDivider } from "@/page/App/components/PagePanel/Layout/divider"
import { LeftAndRightLayout } from "@/page/App/components/PagePanel/Layout/leftAndRight"
import { SetterPadding } from "@/page/App/components/PagePanel/Layout/setterPadding"
import { optionListWrapperStyle } from "@/page/App/components/PagePanel/style"
import { getCanvasShape } from "@/redux/config/configSelector"
import {
  getCanvas,
  searchDsl,
} from "@/redux/currentApp/editor/components/componentsSelector"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { PageNodeProps } from "@/redux/currentApp/editor/components/componentsState"
import { getRootNodeExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { RootState } from "@/store"
import { trackInEditor } from "@/utils/mixpanelHelper"
import { groupWrapperStyle } from "./style"

const getRealCanvasWidth = (canvasWidth: unknown) => {
  if (typeof canvasWidth !== "number") return 100
  return canvasWidth
}

const canvasSizeOptions = [
  {
    label: (
      <div css={optionListWrapperStyle}>
        <FrameResponsiveIcon />
        <span>{i18n.t("page.size.model.auto")}</span>
      </div>
    ),
    value: "auto",
  },
  {
    label: (
      <div css={optionListWrapperStyle}>
        <FrameFixedIcon />
        <span>{i18n.t("page.size.model.fixed")}</span>
      </div>
    ),
    value: "fixed",
  },
]

export const PageFrame: FC = () => {
  const { t } = useTranslation()
  const rootNodeProps = useSelector(getRootNodeExecutionResult)
  const { currentPageIndex, pageSortedKey } = rootNodeProps
  const currentPageDisplayName = pageSortedKey[currentPageIndex]
  const pageProps = useSelector<RootState>((state) => {
    const canvas = getCanvas(state)
    return searchDsl(canvas, currentPageDisplayName)?.props || {}
  }) as PageNodeProps
  const message = useMessage()

  const canvasShape = useSelector(getCanvasShape)
  const dispatch = useDispatch()
  const {
    canvasSize,
    canvasWidth,
    layout,
    leftWidth,
    rightWidth,
    isLeftFixed,
    isRightFixed,
    isFooterFixed,
    isHeaderFixed,
    hasLeft,
    hasRight,
    hasFooter,
    hasHeader,
    showLeftFoldIcon,
    showRightFoldIcon,
  } = pageProps

  const bodyWidth = useMemo(() => {
    if (canvasSize === "fixed") return canvasWidth - leftWidth - rightWidth
    return 100 - leftWidth - rightWidth
  }, [canvasSize, canvasWidth, leftWidth, rightWidth])

  const finalCanvasWidth = getRealCanvasWidth(canvasWidth)

  const finalCanvasSize = canvasSize === "fixed" ? "fixed" : "auto"

  const widthI18n = useMemo(() => {
    return canvasSize === "fixed"
      ? `${t("editor.page.label_name.width")}(px)`
      : `${t("editor.page.label_name.width")}(%)`
  }, [canvasSize, t])

  const modal = useModal()

  const handleDeleteSection = useCallback(
    (
      deleteSectionName:
        | "leftSection"
        | "rightSection"
        | "headerSection"
        | "footerSection",
    ) => {
      if (!currentPageDisplayName) return
      modal.show({
        w: "496px",
        children: t("editor.page.model_tips.delete_section_message"),
        cancelText: t("editor.page.model_tips.cancel_button"),
        okText: t("editor.page.model_tips.ok_button"),
        okButtonProps: {
          colorScheme: "red",
        },
        closable: false,
        onOk: () => {
          dispatch(
            componentsActions.deleteTargetPageSectionReducer({
              pageName: currentPageDisplayName,
              deleteSectionName,
            }),
          )
        },
      })
    },
    [currentPageDisplayName, dispatch, modal, t],
  )

  const handleAddSection = useCallback(
    (
      addedSectionName:
        | "leftSection"
        | "rightSection"
        | "headerSection"
        | "footerSection",
    ) => {
      if (!currentPageDisplayName) return
      dispatch(
        componentsActions.addTargetPageSectionReducer({
          pageName: currentPageDisplayName,
          addedSectionName,
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
      if (canvasSize === "fixed") {
        let currentRightValue = finalRightValue
        let currentLeftValue = finalLeftValue
        if (finalValue < BODY_MIN_WIDTH) {
          finalValue = BODY_MIN_WIDTH
          currentRightValue =
            canvasShape.canvasWidth - finalValue - finalLeftValue
        } else {
          currentRightValue =
            canvasShape.canvasWidth - finalValue - finalLeftValue
        }
        if (currentRightValue < RIGHT_MIN_WIDTH) {
          finalRightValue = RIGHT_MIN_WIDTH
          currentLeftValue =
            canvasShape.canvasWidth - finalValue - finalRightValue
        }
        if (currentLeftValue < LEFT_MIN_WIDTH) {
          finalLeftValue = LEFT_MIN_WIDTH
          currentRightValue =
            canvasShape.canvasWidth - finalValue - finalLeftValue
        }
        if (
          currentLeftValue < LEFT_MIN_WIDTH &&
          currentRightValue < RIGHT_MIN_WIDTH
        ) {
          finalLeftValue = LEFT_MIN_WIDTH
          finalRightValue = RIGHT_MIN_WIDTH
        }
      } else {
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

  const finalLeftWidth = hasLeft ? leftWidth : 0
  const finalRightWidth = hasRight ? rightWidth : 0

  const handleUpdateLeftPanelWidth = useCallback(
    (value?: number) => {
      if (!currentPageDisplayName || !value) return
      let finalValue = value
      if (canvasSize === "fixed") {
        if (
          canvasShape.canvasWidth - finalValue - finalRightWidth <
          BODY_MIN_WIDTH
        ) {
          finalValue =
            canvasShape.canvasWidth - BODY_MIN_WIDTH - finalRightWidth
        }
        if (finalValue < LEFT_MIN_WIDTH) {
          finalValue = LEFT_MIN_WIDTH
        }
      } else {
        const leftWidthPX = (value / 100) * canvasShape.canvasWidth
        const currentRightWidthPX =
          (finalRightWidth / 100) * canvasShape.canvasWidth
        if (
          canvasShape.canvasWidth - leftWidthPX - currentRightWidthPX <
          BODY_MIN_WIDTH
        ) {
          finalValue =
            ((canvasShape.canvasWidth - currentRightWidthPX - BODY_MIN_WIDTH) /
              canvasShape.canvasWidth) *
            100
        }
        if ((finalValue / 100) * canvasShape.canvasWidth < LEFT_MIN_WIDTH) {
          finalValue = (LEFT_MIN_WIDTH / canvasShape.canvasWidth) * 100
        }
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
      finalRightWidth,
    ],
  )

  const handleUpdateRightPanelWidth = useCallback(
    (value?: number) => {
      if (!currentPageDisplayName || !value) return
      let finalValue = value
      if (canvasSize === "fixed") {
        if (
          canvasShape.canvasWidth - finalValue - finalLeftWidth <
          BODY_MIN_WIDTH
        ) {
          finalValue = canvasShape.canvasWidth - BODY_MIN_WIDTH - finalLeftWidth
        }
        if (finalValue < RIGHT_MIN_WIDTH) {
          finalValue = RIGHT_MIN_WIDTH
        }
      } else {
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
        if ((finalValue / 100) * canvasShape.canvasWidth < RIGHT_MIN_WIDTH) {
          finalValue = (RIGHT_MIN_WIDTH / canvasShape.canvasWidth) * 100
        }
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
      finalLeftWidth,
      leftWidth,
    ],
  )

  const handleUpdateShowFoldIcon = useCallback(
    (value: boolean, sectionName: string) => {
      if (!currentPageDisplayName) return
      const newProps =
        sectionName === "leftSection"
          ? {
              showLeftFoldIcon: value,
            }
          : { showRightFoldIcon: value }
      dispatch(
        componentsActions.updateTargetPagePropsReducer({
          pageName: currentPageDisplayName,
          newProps,
        }),
      )
    },
    [currentPageDisplayName, dispatch],
  )

  const handleUpdateFrameSize = useCallback(
    (value: "auto" | "fixed") => {
      if (canvasSize === value || !currentPageDisplayName) return
      const newProps: Partial<PageNodeProps> = {
        canvasSize: value,
        canvasWidth:
          value === "fixed"
            ? DEFAULT_PX_WIDTH.CANVAS
            : DEFAULT_PERCENT_WIDTH.CANVAS,
        leftWidth: 0,
        rightWidth: 0,
      }
      if (value === "fixed") {
        if (hasLeft) newProps.leftWidth = DEFAULT_PX_WIDTH.LEFT
        if (hasRight) newProps.rightWidth = DEFAULT_PX_WIDTH.RIGHT
      } else {
        if (hasLeft) newProps.leftWidth = DEFAULT_PERCENT_WIDTH.LEFT
        if (hasRight) newProps.rightWidth = DEFAULT_PERCENT_WIDTH.RIGHT
      }
      dispatch(
        componentsActions.updateTargetPagePropsReducer({
          pageName: currentPageDisplayName,
          newProps,
        }),
      )
    },
    [canvasSize, currentPageDisplayName, dispatch, hasLeft, hasRight],
  )

  const handleChangeCanvasWidth = useCallback(
    (value?: number) => {
      if (!currentPageDisplayName || value == undefined) return

      let newProps = {
        canvasWidth: value,
      }
      dispatch(
        componentsActions.updateTargetPagePropsReducer({
          pageName: currentPageDisplayName,
          newProps,
        }),
      )
    },
    [currentPageDisplayName, dispatch],
  )

  const handleBlurCanvasWidth = useCallback(() => {
    if (canvasSize === "fixed") {
      if (canvasWidth < BODY_MIN_WIDTH + LEFT_MIN_WIDTH + RIGHT_MIN_WIDTH) {
        message.error({
          content: t("frame_size.invalid_tips", {
            size: BODY_MIN_HEIGHT + HEADER_MIN_HEIGHT + FOOTER_MIN_HEIGHT,
          }),
        })
        dispatch(
          componentsActions.updateTargetPagePropsReducer({
            pageName: currentPageDisplayName,
            newProps: {
              canvasWidth: BODY_MIN_WIDTH + LEFT_MIN_WIDTH + RIGHT_MIN_WIDTH,
              leftWidth: LEFT_MIN_WIDTH,
              rightWidth: RIGHT_MIN_WIDTH,
            },
          }),
        )
      }
      trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.BLUR, {
        element: "page_width",
        parameter2: "fixed",
        parameter3: canvasWidth,
      })
    } else {
      const originalWidth = canvasShape.canvasWidth / (finalCanvasWidth / 100)
      const currentWidth = originalWidth * (canvasWidth / 100)
      if (currentWidth < BODY_MIN_WIDTH + LEFT_MIN_WIDTH + RIGHT_MIN_WIDTH) {
        const minWidth =
          (BODY_MIN_WIDTH + LEFT_MIN_WIDTH + RIGHT_MIN_WIDTH) /
          (originalWidth / 100)
        message.error({
          content: t("frame_size.invalid_tips", {
            size: minWidth.toFixed(0),
          }),
        })
        dispatch(
          componentsActions.updateTargetPagePropsReducer({
            pageName: currentPageDisplayName,
            newProps: {
              canvasWidth: minWidth,
            },
          }),
        )
      }
      trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.BLUR, {
        element: "page_width",
        parameter2: "auto",
        parameter3: canvasWidth,
      })
    }
  }, [
    canvasShape.canvasWidth,
    canvasSize,
    canvasWidth,
    currentPageDisplayName,
    dispatch,
    finalCanvasWidth,
    message,
    t,
  ])

  return (
    <PanelBar title={t("editor.page.panel_bar_title.frame")}>
      <LeftAndRightLayout>
        <RadioGroup
          type="button"
          options={canvasSizeOptions}
          value={finalCanvasSize}
          w="100%"
          forceEqualWidth={true}
          colorScheme="grayBlue"
          onChange={handleUpdateFrameSize}
        />
      </LeftAndRightLayout>
      <LeftAndRightLayout>
        <PageLabel
          labelName={widthI18n}
          size="big"
          tooltip={
            finalCanvasSize !== "fixed"
              ? t("editor.page.tooltips.auto_canvas_width")
              : undefined
          }
        />
        <SetterPadding>
          <InputNumber
            w="96px"
            value={Number(finalCanvasWidth.toFixed(0))}
            colorScheme="techPurple"
            onChange={handleChangeCanvasWidth}
            onBlur={handleBlurCanvasWidth}
          />
        </SetterPadding>
      </LeftAndRightLayout>
      <PanelDivider />
      <div css={groupWrapperStyle}>
        <LeftAndRightLayout>
          <PageLabel
            labelName={t("editor.page.label_name.preset")}
            size="big"
          />
          <SetterPadding>
            <LayoutSelect
              value={layout}
              currentPageName={currentPageDisplayName}
            />
          </SetterPadding>
        </LeftAndRightLayout>
      </div>
      <PanelDivider hasMargin={false} />
      <div css={groupWrapperStyle}>
        <LeftAndRightLayout>
          <PageLabel
            labelName={t("editor.page.label_name.left_panel")}
            size="big"
          />
          <PanelActionBar
            isFixed={isLeftFixed}
            hasPanel={hasLeft}
            deletePanelAction={() => {
              trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
                element: "panel_show",
                parameter2: "left",
                parameter3: "hidden",
              })
              handleDeleteSection("leftSection")
            }}
            addPanelAction={() => {
              trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
                element: "panel_show",
                parameter2: "left",
                parameter3: "show",
              })
              handleAddSection("leftSection")
            }}
          />
        </LeftAndRightLayout>
        {hasLeft && (
          <>
            <LeftAndRightLayout>
              <PageLabel labelName={widthI18n} size="small" />
              <SetterPadding>
                <InputNumber
                  w="96px"
                  value={Number(leftWidth.toFixed(0))}
                  colorScheme="techPurple"
                  onChange={handleUpdateLeftPanelWidth}
                  step={1}
                  onBlur={(e) => {
                    trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.BLUR, {
                      element: "panel_width",
                      parameter2: "left",
                      parameter3: e.target.value,
                    })
                  }}
                />
              </SetterPadding>
            </LeftAndRightLayout>
            <LeftAndRightLayout>
              <PageLabel
                labelName={t("editor.page.label_name.show_fold_icon")}
                size="small"
                tooltip={t("editor.page.tooltips.show_fold_icon")}
              />
              <SetterPadding>
                <Switch
                  checked={showLeftFoldIcon}
                  onChange={(value) => {
                    trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
                      element: "panel_fold",
                      parameter2: "left",
                      parameter3: value ? "show" : "hidden",
                    })
                    handleUpdateShowFoldIcon(value, "leftSection")
                  }}
                  colorScheme="techPurple"
                />
              </SetterPadding>
            </LeftAndRightLayout>
          </>
        )}
      </div>
      <PanelDivider hasMargin={false} />
      <div css={groupWrapperStyle}>
        <LeftAndRightLayout>
          <PageLabel
            labelName={t("editor.page.label_name.right_panel")}
            size="big"
          />
          <PanelActionBar
            isFixed={isRightFixed}
            hasPanel={hasRight}
            deletePanelAction={() => {
              trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
                element: "panel_show",
                parameter2: "right",
                parameter3: "hidden",
              })
              handleDeleteSection("rightSection")
            }}
            addPanelAction={() => {
              trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
                element: "panel_show",
                parameter2: "right",
                parameter3: "show",
              })
              handleAddSection("rightSection")
            }}
          />
        </LeftAndRightLayout>
        {hasRight && (
          <>
            <LeftAndRightLayout>
              <PageLabel labelName={widthI18n} size="small" />
              <SetterPadding>
                <InputNumber
                  w="96px"
                  value={Number(rightWidth.toFixed(0))}
                  colorScheme="techPurple"
                  onChange={handleUpdateRightPanelWidth}
                  step={1}
                  onBlur={(e) => {
                    trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.BLUR, {
                      element: "panel_width",
                      parameter2: "left",
                      parameter3: e.target.value,
                    })
                  }}
                />
              </SetterPadding>
            </LeftAndRightLayout>
            <LeftAndRightLayout>
              <PageLabel
                labelName={t("editor.page.label_name.show_fold_icon")}
                size="small"
                tooltip={t("editor.page.tooltips.show_fold_icon")}
              />
              <SetterPadding>
                <Switch
                  checked={showRightFoldIcon}
                  onChange={(value) => {
                    trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
                      element: "panel_fold",
                      parameter2: "right",
                      parameter3: value ? "show" : "hidden",
                    })
                    handleUpdateShowFoldIcon(value, "rightSection")
                  }}
                  colorScheme="techPurple"
                />
              </SetterPadding>
            </LeftAndRightLayout>
          </>
        )}
      </div>

      <PanelDivider hasMargin={false} />
      <div css={groupWrapperStyle}>
        <LeftAndRightLayout>
          <PageLabel labelName={t("editor.page.label_name.body")} size="big" />
        </LeftAndRightLayout>
        <LeftAndRightLayout>
          <PageLabel labelName={widthI18n} size="small" />
          <SetterPadding>
            <InputNumber
              w="96px"
              colorScheme="techPurple"
              value={Number(bodyWidth.toFixed(0))}
              onChange={handleUpdateBodyPanelWidth}
              step={1}
              disabled={!hasLeft && !hasRight}
            />
          </SetterPadding>
        </LeftAndRightLayout>
      </div>
      <PanelDivider hasMargin={false} />
      <div css={groupWrapperStyle}>
        <LeftAndRightLayout>
          <PageLabel
            labelName={t("editor.page.label_name.header")}
            size="big"
          />
          <PanelActionBar
            isFixed={isHeaderFixed}
            hasPanel={hasHeader}
            deletePanelAction={() => {
              trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
                element: "panel_show",
                parameter2: "header",
                parameter3: "hidden",
              })
              handleDeleteSection("headerSection")
            }}
            addPanelAction={() => {
              trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
                element: "panel_show",
                parameter2: "header",
                parameter3: "show",
              })
              handleAddSection("headerSection")
            }}
          />
        </LeftAndRightLayout>
      </div>
      <PanelDivider hasMargin={false} />
      <div css={groupWrapperStyle}>
        <LeftAndRightLayout>
          <PageLabel
            labelName={t("editor.page.label_name.footer")}
            size="big"
          />
          <PanelActionBar
            isFixed={isFooterFixed}
            hasPanel={hasFooter}
            deletePanelAction={() => {
              trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
                element: "panel_show",
                parameter2: "footer",
                parameter3: "hidden",
              })
              handleDeleteSection("footerSection")
            }}
            addPanelAction={() => {
              trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
                element: "panel_show",
                parameter2: "footer",
                parameter3: "show",
              })
              handleAddSection("footerSection")
            }}
          />
        </LeftAndRightLayout>
      </div>
    </PanelBar>
  )
}

PageFrame.displayName = "PageFrame"
