import { motion } from "framer-motion"
import { FC, useMemo } from "react"
import { createPortal } from "react-dom"
import { applyPopoverStyle } from "@/components/Guide/GuideDraggablePopover/style"
import { GuidePopover } from "@/components/Guide/GuidePopover"
import { GUIDE_STEP } from "@/config/guide/config"

export type CurrentMaskPosition = "top" | "bottom" | "right"

export interface GuideCurrentMaskProps {
  currentStep: number
  position?: CurrentMaskPosition
}

export const GuideDraggablePopover: FC<GuideCurrentMaskProps> = (props) => {
  const { currentStep, position = "bottom" } = props
  const { selector, titleKey, descKey, hideExit, doItForMe } =
    GUIDE_STEP[currentStep]
  const isLastStep = useMemo(
    () => currentStep === GUIDE_STEP.length - 1,
    [currentStep],
  )

  const domRect = useMemo(() => {
    if (selector) {
      const element = document.querySelector(selector)
      return element?.getBoundingClientRect()
    }
  }, [selector])

  return createPortal(
    <motion.div
      css={applyPopoverStyle(position, domRect)}
      drag
      dragMomentum={false}
    >
      <GuidePopover
        title={titleKey}
        description={descKey}
        hideExit={hideExit}
        isLastStep={isLastStep}
        onClickDoIt={doItForMe}
      />
    </motion.div>,
    document.body,
  )
}

GuideDraggablePopover.displayName = "GuideDraggablePopover"
