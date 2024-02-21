import { FC, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import {
  applyStepMaskStyle,
  applyStepMaskWrapperStyle,
  applyVisibleStyle,
  ellipsisStyle,
  moveIconStyle,
  stepFirstLineStyle,
} from "@/components/Guide/WidgetStepMask/style"
import MoveIcon from "@/components/Guide/assets/move.svg?react"
import { GUIDE_SELECT_WIDGET } from "@/config/guide/config"
import {
  DEFAULT_BODY_COLUMNS_NUMBER,
  UNIT_HEIGHT,
} from "@/page/App/components/DotPanel/constant/canvas"
import { getCanvasShape } from "@/redux/config/configSelector"
import { widgetBuilder } from "@/widgetLibrary/widgetBuilder"

export interface StepMaskProps {
  currentStep: number
}

export const WidgetStepMask: FC<StepMaskProps> = (props) => {
  const { t } = useTranslation()

  const { currentStep } = props
  const canvasShape = useSelector(getCanvasShape)

  const unitWidth = useMemo(() => {
    return canvasShape.canvasWidth / DEFAULT_BODY_COLUMNS_NUMBER
  }, [canvasShape.canvasWidth])

  const widgetShape = useMemo(() => {
    return GUIDE_SELECT_WIDGET.map((widget) => {
      const { w, h } = widgetBuilder(widget).config
      return {
        width: w * unitWidth,
        height: h * UNIT_HEIGHT,
      }
    })
  }, [unitWidth])

  const applyMaskStyle = (step: number) => {
    return [
      applyStepMaskStyle(widgetShape[step]),
      applyVisibleStyle(currentStep <= step),
    ]
  }

  return (
    <div css={applyStepMaskWrapperStyle(currentStep <= 2, unitWidth)}>
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

WidgetStepMask.displayName = "WidgetStepMask"
