import { FC, useMemo, useState, useCallback } from "react"
import { AnimatePresence } from "framer-motion"
import { useSelector } from "react-redux"
import { getSelectedAction } from "@/redux/config/configSelector"
import { ResourceEditor } from "@/page/App/components/ActionEditor/ActionEditorPanel/ResourceEditor"
import { TransformerEditor } from "@/page/App/components/ActionEditor/ActionEditorPanel/TransformerEditor"
import { ActionResultType } from "@/page/App/components/ActionEditor/ActionEditorPanel/ActionResult/interface"
import { ActionResult } from "@/page/App/components/ActionEditor/ActionEditorPanel/ActionResult"
import { ActionResultErrorIndicator } from "@/page/App/components/ActionEditor/ActionEditorPanel/ActionResultErrorIndicator"
import { ACTION_TYPE } from "@/page/App/components/ActionEditor/constant"
import { ActionEditorPanelProps } from "./interface"
import { containerStyle } from "./style"
import { ActionEditorHeader } from "@/page/App/components/ActionEditor/ActionEditorPanel/EditorHeader"
import { ActionEditorProvider } from "@/page/App/components/ActionEditor/ActionEditorPanel/context/ActionEditorPanelContext"

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

  const editorNode = useMemo(() => {
    const { actionType, actionId } = activeActionItem
    switch (actionType) {
      case ACTION_TYPE.REST_API:
      case ACTION_TYPE.MYSQL:
        return (
          <ResourceEditor
            key={actionId}
            onCreateResource={onCreateResource}
            onEditResource={onEditResource}
          />
        )
      case ACTION_TYPE.TRANSFORMER:
        return <TransformerEditor key={actionId} />
      default:
        return null
    }
  }, [activeActionItem, onEditResource, onCreateResource])

  const handleUpdateResult = useCallback((result: ActionResultType) => {
    setResult(result)
    setActionResVisible(true)
  }, [])

  return (
    <ActionEditorProvider
      onDeleteActionItem={onDeleteActionItem}
      onDuplicateActionItem={onDuplicateActionItem}
      handleUpdateResult={handleUpdateResult}
    >
      <div css={containerStyle}>
        <ActionEditorHeader />
        {activeActionItem && (
          <>
            {editorNode}
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
                  onClose={() => {
                    setActionResVisible(false)
                  }}
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
