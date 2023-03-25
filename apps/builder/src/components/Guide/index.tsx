import { Global } from "@emotion/react"
import { Popover } from "@reactour/popover"
import { FC, HTMLAttributes, RefObject, useEffect, useMemo } from "react"
import { createPortal } from "react-dom"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { GuidePopover } from "@/components/Guide/GuidePopover"
import { ReactComponent as MoveIcon } from "@/components/Guide/assets/move.svg"
import {
  applyGuideStyle,
  applyStepMaskStyle,
  applyStepMaskWrapperStyle,
  applyVisibleStyle,
  ellipsisStyle,
  moveIconStyle,
  stepFirstLineStyle,
} from "@/components/Guide/style"
import { GUIDE_SELECT_WIDGET, GUIDE_STEP } from "@/config/guide/config"
import { UNIT_HEIGHT } from "@/page/App/components/DotPanel/renderComponentCanvas"
import { getCachedAction, getCanvasShape } from "@/redux/config/configSelector"
import { getCurrentStep } from "@/redux/guide/guideSelector"
import { BASIC_BLOCK_COLUMNS } from "@/utils/generators/generatePageOrSectionConfig"
import { WidgetConfig } from "@/widgetLibrary/widgetBuilder"
import { Button } from "../../../../../illa-design/packages/button"

const getElementPosition = (element: HTMLElement) => {
  const { top, left, width, height } = element.getBoundingClientRect()
  return { top, left, width, height }
}

const getPosition = (selector: string) => {
  const element = document.querySelector(selector) as HTMLElement
  return element ? getElementPosition(element) : undefined
}

export interface StepMaskProps {
  step: number
}

export const StepMask: FC<StepMaskProps> = (props) => {
  const { t } = useTranslation()

  const { step } = props
  const canvasShape = useSelector(getCanvasShape)

  const unitWidth = useMemo(() => {
    return canvasShape.canvasWidth / BASIC_BLOCK_COLUMNS
  }, [canvasShape.canvasWidth])

  const widgetShape = useMemo(() => {
    return GUIDE_SELECT_WIDGET.map((widget) => {
      const { w, h } = WidgetConfig[widget].config
      return {
        width: w * unitWidth,
        height: h * UNIT_HEIGHT,
      }
    })
  }, [unitWidth])

  const applyMaskStyle = (step: number) => {
    return [
      applyStepMaskStyle(widgetShape[step]),
      applyVisibleStyle(step <= step),
    ]
  }
  return (
    <div css={applyStepMaskWrapperStyle(step <= 2, unitWidth)}>
      <div css={stepFirstLineStyle}>
        <div css={applyMaskStyle(0)}>
          <MoveIcon css={moveIconStyle} />
          <span css={ellipsisStyle}>
            {t("editor.tutorial.panel.onboarding_app.drag_input")}
          </span>
        </div>
        <div css={applyMaskStyle(1)}>
          <MoveIcon css={moveIconStyle} />
          <span css={ellipsisStyle}>
            {t("editor.tutorial.panel.onboarding_app.drag_button")}
          </span>
        </div>
      </div>
      <div css={applyMaskStyle(2)}>
        <MoveIcon css={moveIconStyle} />
        <span css={ellipsisStyle}>
          {t("editor.tutorial.panel.onboarding_app.drag_table")}
        </span>
      </div>
    </div>
  )
}

export interface GuideProps {
  canvasRef: RefObject<HTMLDivElement>
}

export const Guide: FC<GuideProps> = (props) => {
  const { canvasRef } = props
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const currentStep = useSelector(getCurrentStep)
  const cachedAction = useSelector(getCachedAction)
  const { selector, titleKey, descKey, doItForMe } = GUIDE_STEP[currentStep]
  const size = useMemo(() => {
    if (currentStep === 3 || currentStep === 4) {
      const { selector } = GUIDE_STEP[currentStep]
      const element = document.querySelector(selector)
      return element?.getBoundingClientRect()
    }
  }, [currentStep])

  return (
    <>
      <Global styles={applyGuideStyle(currentStep)} />
      {canvasRef.current &&
        createPortal(<StepMask step={currentStep} />, canvasRef.current)}
      {currentStep === 0 && (
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 230,
            height: 230,
            border: "2px solid #5ae",
            background: "white",
            padding: 10,
            borderRadius: 10,
            textAlign: "center",
            fontSize: ".7em",
            zIndex: 10,
          }}
        >
          成功摆放三个组件后，进入下一步
          <div>
            <Button>Exit</Button>
            <Button
              onClick={() => {
                GUIDE_STEP[0]?.doItForMe?.()
              }}
            >
              Do it for me
            </Button>
          </div>
        </div>
      )}
      {(currentStep === 3 || currentStep === 4) && size && (
        <Popover sizes={size} className={currentStep.toString()}>
          <GuidePopover
            title={titleKey}
            description={descKey}
            onClickDoIt={doItForMe}
          />
        </Popover>
      )}
    </>
  )
}

Guide.displayName = "Guide"
