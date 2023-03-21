import { Global } from "@emotion/react"
import { useTour } from "@reactour/tour"
import { motion } from "framer-motion"
import { FC, HTMLAttributes } from "react"
import { useSelector } from "react-redux"
import { Button } from "@illa-design/react"
import { applyGuideStyle, stepMaskStyle } from "@/components/Guide/style"
import { getCurrentStep } from "@/redux/guide/guideSelector"

const getElementPosition = (element: HTMLElement) => {
  const { top, left, width, height } = element.getBoundingClientRect()
  console.log({ top, left, width, height })
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
  const { setIsOpen, isOpen } = useTour()
  const currentStep = useSelector(getCurrentStep)

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
            <Button>Do it for me</Button>
          </div>
        </motion.div>
      )}
    </>
  )
}

Guide.displayName = "Guide"
