import { FC, useState, useCallback } from "react"
import { AnimatePresence } from "framer-motion"
import { useSelector } from "react-redux"
import { getSelectedAction } from "@/redux/config/configSelector"
import { ActionResultType } from "@/page/App/components/ActionEditor/ActionEditorPanel/ActionResult/interface"
import { ActionResult } from "@/page/App/components/ActionEditor/ActionEditorPanel/ActionResult"
import { ActionResultErrorIndicator } from "@/page/App/components/ActionEditor/ActionEditorPanel/ActionResultErrorIndicator"
import { ActionEditorPanelProps } from "./interface"
import { containerStyle } from "./style"
import { ActionEditorHeader } from "@/page/App/components/ActionEditor/ActionEditorPanel/EditorHeader"
import { ActionEditorProvider } from "@/page/App/components/ActionEditor/ActionEditorPanel/context/ActionEditorPanelContext"
import { EditorBody } from "@/page/App/components/ActionEditor/ActionEditorPanel/EditorBody"

export const ActionEditorPanel: FC<ActionEditorPanelProps> = (props) => {
  const {
    onEditResource,
    onCreateResource,
    onDuplicateActionItem,
    onDeleteActionItem,
  } = props

  const [actionResVisible, setActionResVisible] = useState(false)
  const [result, setResult] = useState<ActionResultType>()

  const activeActionItem = useSelector(getSelectedAction)

  const handleUpdateResult = useCallback((result: ActionResultType) => {
    setResult(result)
    setActionResVisible(true)
  }, [])

  const handleCloseActionResult = useCallback(() => {
    setActionResVisible(false)
  }, [])

  return (
    <ActionEditorProvider
      onDeleteActionItem={onDeleteActionItem}
      onDuplicateActionItem={onDuplicateActionItem}
      handleUpdateResult={handleUpdateResult}
      onEditResource={onEditResource}
      onCreateResource={onCreateResource}
    >
      <div css={containerStyle}>
        <ActionEditorHeader />
        {activeActionItem && (
          <>
            <EditorBody />
            <AnimatePresence>
              {activeActionItem?.error && (
                <ActionResultErrorIndicator
                  errorMessage={activeActionItem?.data?.errorMessage}
                />
              )}
              {actionResVisible && (
                <ActionResult
                  result={result}
                  error={activeActionItem?.error}
                  onClose={handleCloseActionResult}
                />
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </ActionEditorProvider>
  )
}

ActionEditorPanel.displayName = "ActionEditorPanel"
