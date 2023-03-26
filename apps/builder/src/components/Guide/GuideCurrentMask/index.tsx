import { FC } from "react"
import { createPortal } from "react-dom"

export interface GuideCurrentMaskProps {
  currentStep: number
}

export const GuideCurrentMask: FC<GuideCurrentMaskProps> = (props) => {
  const { currentStep } = props
  if (currentStep === 1) {
    return createPortal(<div>234234</div>, document.body)
  }
  return createPortal(<div>234234</div>, document.body)
}

GuideCurrentMask.displayName = "GuideCurrentMask"
