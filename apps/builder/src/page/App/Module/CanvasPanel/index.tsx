import { forwardRef, useSyncExternalStore } from "react"
import { useSelector } from "react-redux"
import { DotPanel } from "@/page/App/components/DotPanel"
import { getIsILLAEditMode } from "@/redux/config/configSelector"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { UploadDetailButton } from "../UploadDetail"
import { updateFileDetailStore } from "../UploadDetail/store"
import { CanvasPanelProps } from "./interface"
import { applyScaleContainerStyle } from "./style"

export const CanvasPanel = forwardRef<HTMLDivElement, CanvasPanelProps>(
  (props, ref) => {
    const { ...otherProps } = props

    const isEditMode = useSelector(getIsILLAEditMode)
    const executionResult = useSelector(getExecutionResult)
    const uploadFiles = useSyncExternalStore(
      updateFileDetailStore.subscribe,
      updateFileDetailStore.getSnapshot,
    )

    if (!executionResult || !executionResult.root) {
      return null
    }

    return (
      <div {...otherProps} ref={ref} css={applyScaleContainerStyle(isEditMode)}>
        <DotPanel />
        {uploadFiles.length > 0 && <UploadDetailButton />}
      </div>
    )
  },
)

CanvasPanel.displayName = "CanvasPanel"
