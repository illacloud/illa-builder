import { FC, useState, useMemo, useRef, MouseEvent, useContext } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { Button } from "@illa-design/button"
import { Input } from "@illa-design/input"
import { AddIcon, WarningCircleIcon, EmptyStateIcon } from "@illa-design/icon"
import { selectAllActionItem } from "@/redux/currentApp/action/actionSelector"
import { ActionEditorContext } from "@/page/App/components/ActionEditor/context"
import { generateName } from "@/page/App/components/ActionEditor/utils"
import { ActionGenerator } from "@/page/App/components/ActionEditor/ActionGenerator"
import { ActionInfo } from "@/page/App/components/ActionEditor/ActionGenerator/interface"
import { ActionTypeIcon } from "@/page/App/components/ActionEditor/components/ActionTypeIcon"
import {
  actionListContainerStyle,
  newBtnContainerStyle,
  newButtonTextStyle,
  actionItemListStyle,
  applyactionItemStyle,
  actionItemNameStyle,
  applyactionItemNameTextStyle,
  actionItemIconStyle,
  warningIndicatorStyle,
  updatedIndicatorStyle,
  noMatchFoundWrapperStyle,
  emptyActionListPlaceholderStyle,
} from "./style"
import { ActionListProps } from "./interface"
import { SearchHeader } from "./SearchHeader"
import { ContextMenu } from "./ContextMenu"

export const ActionList: FC<ActionListProps> = (props) => {
  const {
    loading,
    isActionDirty,
    onAddActionItem,
    onDuplicateActionItem,
    onDeleteActionItem,
    onUpdateActionItem,
    onSelectActionItem,
  } = props

  const { t } = useTranslation()
  const actionItems = useSelector(selectAllActionItem)
  const { activeActionItemId } = useContext(ActionEditorContext)

  const [query, setQuery] = useState<string>("")
  const [editingName, setEditingName] = useState("")
  const [editingActionItemId, setEditingActionItemId] = useState("")
  const [contextMenuActionId, setContextMenuActionId] = useState("")
  const [actionGeneratorVisible, setActionGeneratorVisible] = useState(false)
  const [contextMenuEvent, setContextMenuEvent] = useState<MouseEvent>()

  const inputRef = useRef<HTMLInputElement | null>(null)

  const matchedActionItems = useMemo(() => {
    if (query === "") {
      return actionItems
    }

    return actionItems.filter(({ displayName }) =>
      displayName.toLowerCase().includes(query.toLowerCase()),
    )
  }, [actionItems, query])

  function editName(id: string, name: string) {
    setEditingActionItemId(id)
    setEditingName(name)
    setTimeout(() => {
      inputRef.current?.focus()
    }, 0)
  }

  function updateName() {
    onUpdateActionItem(editingActionItemId, {
      displayName: editingName,
    })
    setEditingActionItemId("")
    setEditingName("")
  }

  function onClickActionItem(id: string, name: string) {
    if (actionItems.length === 1) {
      editName(id, name)
    }

    onSelectActionItem(id)
  }

  function onAddAction(info: ActionInfo) {
    const { category, actionType, resourceId = "" } = info

    setActionGeneratorVisible(false)

    let actionTemplate

    if (category === "jsTransformer") {
      actionTemplate = { transformer: "" }
    }

    onAddActionItem({
      displayName: generateName(actionType, actionItems),
      actionType,
      resourceId,
      actionTemplate,
    })
  }

  function onDuplicate() {
    onDuplicateActionItem(contextMenuActionId)
  }

  function onDelete() {
    onDeleteActionItem(contextMenuActionId)
  }

  const actionItemsList = matchedActionItems.map((item) => {
    const { actionId: id, displayName: name, status, actionType, error } = item
    const isSelected = id === activeActionItemId

    function renderName() {
      if (id === editingActionItemId) {
        return (
          <Input
            inputRef={inputRef}
            requirePadding={false}
            value={editingName}
            onChange={(value) => setEditingName(value)}
            onBlur={updateName}
            onPressEnter={updateName}
          />
        )
      }

      return (
        <span
          css={actionItemNameStyle}
          onDoubleClick={() => editName(id, name)}
        >
          <span
            css={applyactionItemNameTextStyle(error ?? false)}
            title={name}
          >
            {name}
          </span>
          {isActionDirty && isSelected && (
            <span css={updatedIndicatorStyle}></span>
          )}
        </span>
      )
    }

    return (
      <li
        key={id}
        css={applyactionItemStyle(isSelected)}
        onClick={() => onClickActionItem(id, name)}
        onContextMenu={(e: MouseEvent) => {
          setContextMenuActionId(id)
          setContextMenuEvent(e)
        }}
      >
        <span css={actionItemIconStyle}>
          <ActionTypeIcon actionType={actionType} />
          {error && (
            <WarningCircleIcon css={warningIndicatorStyle} size={"8px"} />
          )}
        </span>
        {renderName()}
      </li>
    )
  })

  const NoMatchFound = (
    <div css={noMatchFoundWrapperStyle}>
      <EmptyStateIcon size={"48px"} viewBox={"0 0 48 48"} />
      <span>{t("editor.action.action_list.tips.not_found")}</span>
    </div>
  )

  const renderActionItemList = () => {
    if (matchedActionItems.length === 0) {
      if (query !== "") {
        return NoMatchFound
      }

      return (
        <span css={emptyActionListPlaceholderStyle}>
          {t("editor.action.action_list.tips.empty")}
        </span>
      )
    }

    return actionItemsList
  }

  return (
    <div css={actionListContainerStyle}>
      <SearchHeader updateAction={setQuery} />

      <div css={newBtnContainerStyle}>
        <Button
          autoFullHorizontal
          colorScheme="techPurple"
          variant="light"
          buttonRadius="8px"
          size={"medium"}
          leftIcon={<AddIcon />}
          loading={loading}
          disabled={loading}
          onClick={() => setActionGeneratorVisible(true)}
        >
          <span css={newButtonTextStyle}>
            {t("editor.action.action_list.btn.new")}
          </span>
        </Button>
      </div>

      <ul css={actionItemListStyle}>{renderActionItemList()}</ul>

      <ContextMenu
        onDelete={onDelete}
        onDuplicate={onDuplicate}
        contextMenuEvent={contextMenuEvent}
      />

      <ActionGenerator
        visible={actionGeneratorVisible}
        onClose={() => setActionGeneratorVisible(false)}
        onAddAction={onAddAction}
      />
    </div>
  )
}

ActionList.displayName = "ActionList"
