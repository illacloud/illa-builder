import { Global } from "@emotion/react"
import { FC, HTMLAttributes, RefObject, useEffect, useMemo } from "react"
import { createPortal, render } from "react-dom"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { GuidePoint } from "@/components/Guide/GuidePoint"
import { GuidePopover } from "@/components/Guide/GuidePopover"
import { GuideSuccess } from "@/components/Guide/GuideSuccess"
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
  currentStep: number
}

export const StepMask: FC<StepMaskProps> = (props) => {
  const { t } = useTranslation()

  const { currentStep } = props
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
  const postgresqlQuery = document.querySelector(".postgresql1-query")
  const currentElement = selector && document.querySelector(selector)

  const ActionMutationObserver = new MutationObserver((mutations) => {
    const targetNode = document.querySelector(
      '[data-onboarding-action="actionEditor"]',
    )
    mutations.forEach((mutation) => {
      // 检查新增子节点是否含有.postgresql1-query类名
      const addedNodes = Array.from(mutation.addedNodes)
      const hasPostgresqlQueryClass = addedNodes.some((node) => {
        console.log(node, "node")
        if (node instanceof HTMLElement) {
          return node.classList.contains("postgresql1-query")
        }
        return false
      })

      if (hasPostgresqlQueryClass) {
        const myElementContainer = document.createElement("div")

        createPortal(
          <GuidePopover title={"111"} description={"222"} />,
          myElementContainer,
        )
        targetNode?.appendChild(myElementContainer)
      }
    })
  })

  // if (reduxAction === "updateCurrentStepReducer") {
  //   const { titleKey, descKey, selector } = GUIDE_STEP[payload]
  //
  //   switch (payload) {
  //     case 3: {
  //       const targetNode = document.querySelector(
  //         '[data-onboarding-action="actionEditor"]',
  //       )
  //       if (targetNode) {
  //         createPortal(<div>wwww</div>, document.body)
  //         const postgresqlQueryNodes =
  //           targetNode?.querySelector(".postgresql1-query")
  //         // 检查初始节点中是否存在符合条件的元素
  //         if (postgresqlQueryNodes) {
  //           const myElementContainer = document.createElement("div")
  //
  //           render(
  //             createPortal(
  //               <GuidePopover title={titleKey} description={descKey} />,
  //               myElementContainer,
  //             ),
  //             myElementContainer,
  //           )
  //           postgresqlQueryNodes.appendChild(myElementContainer)
  //
  //           // postgresqlQueryNodes.insertBefore()
  //         }
  //
  //         // 传入目标元素和选项进行观察
  //         ActionMutationObserver.observe(targetNode, {
  //           childList: true,
  //           subtree: true,
  //         })
  //       }
  //       break
  //     }
  //     case 4: {
  //       console.log(selector, "element selector")
  //       const element = document.querySelector(selector)
  //       if (element) {
  //         const myElementContainer = document.createElement("div")
  //         console.log(element, "element")
  //         element.appendChild(myElementContainer)
  //         setTimeout(() => {
  //           console.log(element.children, "create portal element")
  //           const a = createPortal(<div>2222</div>, myElementContainer)
  //           console.log(a, "create portal element")
  //         }, 500)
  //       }
  //       break
  //     }
  //   }
  // }
  console.log(currentElement, "currentElement")
  return (
    <>
      <Global styles={applyGuideStyle(currentStep)} />
      <GuideSuccess />
      {canvasRef.current &&
        createPortal(<StepMask currentStep={currentStep} />, canvasRef.current)}
      {currentStep === 0 &&
        currentElement &&
        createPortal(
          <GuidePopover
            position={"bottom"}
            title={t(titleKey)}
            description={t(descKey)}
            onClickDoIt={doItForMe}
          />,
          currentElement,
        )}
      {currentStep === 3 &&
        postgresqlQuery &&
        createPortal(
          <GuidePopover
            position={"top"}
            title={t(titleKey)}
            description={t(descKey)}
            onClickDoIt={doItForMe}
          />,
          postgresqlQuery,
        )}
      {(currentStep === 0 || currentStep === 3 || currentStep === 4) &&
        currentElement &&
        createPortal(<GuidePoint />, currentElement)}
    </>
  )
}

Guide.displayName = "Guide"
