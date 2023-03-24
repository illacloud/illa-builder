import { Global } from "@emotion/react"
import { Popover } from "@reactour/popover"
import { motion } from "framer-motion"
import { FC, HTMLAttributes, RefObject, useEffect, useMemo } from "react"
import { createPortal } from "react-dom"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { GuidePopover } from "@/components/Guide/GuidePopover"
import { ReactComponent as MoveIcon } from "@/components/Guide/assets/move.svg"
import {
  applyGuideStyle,
  applyStepMaskWrapperStyle,
  applyVisibleStyle,
  moveIconStyle,
  stepFirstLineStyle,
  stepMaskStyle,
} from "@/components/Guide/style"
import { GUIDE_STEP } from "@/config/guide/config"
import { getCachedAction } from "@/redux/config/configSelector"
import { getCurrentStep } from "@/redux/guide/guideSelector"
import { guideActions } from "@/redux/guide/guideSlice"

const getElementPosition = (element: HTMLElement) => {
  const { top, left, width, height } = element.getBoundingClientRect()
  return { top, left, width, height }
}

const getPosition = (selector: string) => {
  const element = document.querySelector(selector) as HTMLElement
  return element ? getElementPosition(element) : undefined
}

export interface StepMaskProps extends HTMLAttributes<HTMLDivElement> {
  desc: string
}

export const StepMask: FC<StepMaskProps> = (props) => {
  const { desc, ...otherProps } = props
  return (
    <div css={stepMaskStyle} {...otherProps}>
      {desc}
    </div>
  )
}

export interface GuideProps {
  canvasRef: RefObject<HTMLDivElement>
}

export const Guide: FC<GuideProps> = (props) => {
  const { canvasRef } = props
  const { t } = useTranslation()
  const currentStep = useSelector(getCurrentStep)
  const dispatch = useDispatch()
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
        createPortal(
          <div css={applyStepMaskWrapperStyle(currentStep < 3)}>
            <div css={stepFirstLineStyle}>
              <div css={[stepMaskStyle, applyVisibleStyle(currentStep === 0)]}>
                <MoveIcon css={moveIconStyle} />
                {t("editor.tutorial.panel.onboarding_app.drag_input")}
              </div>
              <div css={[stepMaskStyle, applyVisibleStyle(currentStep <= 1)]}>
                <MoveIcon css={moveIconStyle} />
                {t("editor.tutorial.panel.onboarding_app.drag_button")}
              </div>
            </div>
            <div css={[stepMaskStyle, applyVisibleStyle(currentStep <= 2)]}>
              <MoveIcon css={moveIconStyle} />
              {t("editor.tutorial.panel.onboarding_app.drag_table")}
            </div>
          </div>,
          canvasRef.current,
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
