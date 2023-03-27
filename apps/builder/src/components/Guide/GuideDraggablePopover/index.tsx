import { motion, useAnimation } from "framer-motion"
import { FC, useMemo } from "react"
import { createPortal } from "react-dom"
import { applyPopoverStyle } from "@/components/Guide/GuideDraggablePopover/style"
import { GuidePopover } from "@/components/Guide/GuidePopover"
import { GUIDE_STEP } from "@/config/guide/config"

export type CurrentMaskPosition = "top" | "bottom"

export interface GuideCurrentMaskProps {
  currentStep: number
  position?: CurrentMaskPosition
}

export const GuideDraggablePopover: FC<GuideCurrentMaskProps> = (props) => {
  const { currentStep, position = "bottom" } = props
  const { selector, titleKey, descKey, doItForMe } = GUIDE_STEP[currentStep]

  const domRect = useMemo(() => {
    if (selector) {
      const element = document.querySelector(selector)
      return element?.getBoundingClientRect()
    }
  }, [currentStep, selector])

  return createPortal(
    <motion.div
      css={applyPopoverStyle(position, domRect)}
      drag
      dragMomentum={false}
    >
      <GuidePopover
        title={titleKey}
        description={descKey}
        onClickDoIt={doItForMe}
      />
    </motion.div>,
    document.body,
  )
}

GuideDraggablePopover.displayName = "GuideDraggablePopover"
