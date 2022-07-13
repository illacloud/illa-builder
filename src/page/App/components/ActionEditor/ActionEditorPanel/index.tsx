import { FC, useState } from "react"
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
  const actionType = activeActionItem?.actionType ?? ""
  let editorNode = null

  switch (actionType) {
    case ACTION_TYPE.REST_API:
    case ACTION_TYPE.MYSQL:
      editorNode = (
        <ResourceEditor
          key={activeActionItem.actionId}
          onCreateResource={onCreateResource}
          onEditResource={onEditResource}
        />
      )
      break
    case ACTION_TYPE.TRANSFORMER:
      editorNode = <TransformerEditor key={activeActionItem.actionId} />
      break
    default:
      break
  }

  return (
    <div css={containerStyle}>
      <ActionEditorHeader
        onDuplicateActionItem={onDuplicateActionItem}
        onDeleteActionItem={onDeleteActionItem}
      />
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
  )
}

ActionEditorPanel.displayName = "ActionEditorPanel"
