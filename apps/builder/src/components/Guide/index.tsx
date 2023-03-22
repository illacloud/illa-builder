import { Global } from "@emotion/react"
import { Popover } from "@reactour/popover"
import { motion } from "framer-motion"
import { FC, HTMLAttributes, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "@illa-design/react"
import { GuidePopover } from "@/components/Guide/GuidePopover"
import { guideConfig } from "@/components/Guide/config"
import { applyGuideStyle, stepMaskStyle } from "@/components/Guide/style"
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

export const Guide: FC = () => {
  const currentStep = useSelector(getCurrentStep)
  const dispatch = useDispatch()
  const cachedAction = useSelector(getCachedAction)
  const { selector, titleKey, descKey, doItForMe } = guideConfig[currentStep]
  const size = useMemo(() => {
    if (currentStep === 3 || currentStep === 4) {
      const { selector } = guideConfig[currentStep]
      const element = document.querySelector(selector)
      return element?.getBoundingClientRect()
    }
  }, [currentStep])

  return (
    <>
      <Global styles={applyGuideStyle(currentStep)} />
      {currentStep === 0 && (
        <motion.div
          drag
          style={{
            position: "absolute",
            top: getPosition(".app-editor")?.top,
            right: getPosition(".app-editor")?.width,
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
                dispatch(guideActions.updateNextStepReducer())
              }}
            >
              Do it for me
            </Button>
          </div>
        </motion.div>
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
