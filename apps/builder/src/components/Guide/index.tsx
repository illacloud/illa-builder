import { Global } from "@emotion/react"
import { FC, RefObject, useEffect, useMemo } from "react"
import { createPortal } from "react-dom"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { GuideDraggablePopover } from "@/components/Guide/GuideDraggablePopover"
import { GuidePoint } from "@/components/Guide/GuidePoint"
import { GuidePopover } from "@/components/Guide/GuidePopover"
import { GuideSuccess } from "@/components/Guide/GuideSuccess"
import { WidgetStepMask } from "@/components/Guide/WidgetStepMask"
import { applyGuideStyle } from "@/components/Guide/style"
import { GUIDE_STEP } from "@/config/guide/config"
import { getCachedAction } from "@/redux/config/configSelector"
import { getCurrentStep } from "@/redux/guide/guideSelector"

const getElementPosition = (element: HTMLElement) => {
  const { top, left, width, height } = element.getBoundingClientRect()
  return { top, left, width, height }
}

const getPosition = (selector: string) => {
  const element = document.querySelector(selector) as HTMLElement
  return element ? getElementPosition(element) : undefined
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
  const postgresqlQuery = document.querySelector(".postgresql1-query")
  const currentElement = selector && document.querySelector(selector)

  useEffect(() => {
    if (currentStep === 1) {
      createPortal(<div>234234</div>, document.body)
    }
  }, [currentStep])

  return (
    <>
      <Global styles={applyGuideStyle(currentStep)} />
      {currentStep === 1 && <GuideSuccess />}
      {canvasRef.current &&
        createPortal(
          <WidgetStepMask currentStep={currentStep} />,
          canvasRef.current,
        )}
      {/* widget tip */}
      {currentStep === 0 && currentElement && (
        <GuideDraggablePopover currentStep={0} position="bottom" />
      )}
      {/* action tip */}
      {(currentStep === 3 || currentStep === 4) && postgresqlQuery && (
        <GuideDraggablePopover currentStep={currentStep} position="top" />
      )}
      {(currentStep === 0 ||
        currentStep === 3 ||
        currentStep === 4 ||
        currentStep === 5 ||
        currentStep === 7) &&
        currentElement &&
        createPortal(<GuidePoint />, currentElement)}
    </>
  )
}

Guide.displayName = "Guide"
