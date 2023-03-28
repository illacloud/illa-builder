import { Global } from "@emotion/react"
import { FC, RefObject, useEffect } from "react"
import { createPortal } from "react-dom"
import { useSelector } from "react-redux"
import { GuideDraggablePopover } from "@/components/Guide/GuideDraggablePopover"
import { GuidePoint } from "@/components/Guide/GuidePoint"
import { GuideSuccess } from "@/components/Guide/GuideSuccess"
import { WidgetStepMask } from "@/components/Guide/WidgetStepMask"
import { applyGuideStyle, shiftStyle } from "@/components/Guide/style"
import { GUIDE_STEP } from "@/config/guide/config"
import { getCurrentStep } from "@/redux/guide/guideSelector"

export interface GuideProps {
  canvasRef: RefObject<HTMLDivElement>
}

export const Guide: FC<GuideProps> = (props) => {
  const { canvasRef } = props
  const currentStep = useSelector(getCurrentStep)
  const { selector } = GUIDE_STEP[currentStep]
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
      {canvasRef.current &&
        createPortal(
          <WidgetStepMask currentStep={currentStep} />,
          canvasRef.current,
        )}
      {/* widget tip */}
      {currentStep === 0 && currentElement && (
        <>
          {createPortal(<GuidePoint />, currentElement)}
          <GuideDraggablePopover currentStep={0} position="bottom" />
        </>
      )}
      {/* action tip */}
      {(currentStep === 3 || currentStep === 4) && postgresqlQuery && (
        <GuideDraggablePopover currentStep={currentStep} position="top" />
      )}
      {(currentStep === 3 ||
        currentStep === 4 ||
        currentStep === 5 ||
        currentStep === 7) &&
        currentElement &&
        createPortal(<GuidePoint css={shiftStyle} />, currentElement)}
      {/* success tip */}
      {currentStep === 11 && <GuideSuccess />}
      {currentStep === 11 && currentElement && (
        <GuideDraggablePopover currentStep={currentStep} position="right" />
      )}
    </>
  )
}

Guide.displayName = "Guide"
