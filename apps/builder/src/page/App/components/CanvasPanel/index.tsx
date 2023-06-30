import { forwardRef } from "react"
import { useSelector } from "react-redux"
import { DotPanel } from "@/page/App/components/DotPanel"
import { getIsILLAEditMode } from "@/redux/config/configSelector"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { CanvasPanelProps } from "./interface"
import { applyScaleContainerStyle } from "./style"

export const CanvasPanel = forwardRef<HTMLDivElement, CanvasPanelProps>(
  (props, ref) => {
    const { ...otherProps } = props

    const isEditMode = useSelector(getIsILLAEditMode)
    const executionResult = useSelector(getExecutionResult)

    if (!executionResult || !executionResult.root) {
      return null
    }

    return (
      <div {...otherProps} ref={ref} css={applyScaleContainerStyle(isEditMode)}>
        <DotPanel />
      </div>
    )
  },
)

CanvasPanel.displayName = "CanvasPanel"
