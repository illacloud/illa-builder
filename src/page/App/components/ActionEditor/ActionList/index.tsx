import { FC, useState, useMemo, useRef, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { Button } from "@illa-design/button"
import { Trigger } from "@illa-design/trigger"
import { DropList, Dropdown } from "@illa-design/dropdown"
import { Input } from "@illa-design/input"
import { illaPrefix, globalColor } from "@illa-design/theme"
import { AddIcon, WarningCircleIcon, EmptyStateIcon } from "@illa-design/icon"
import { DisplayNameGenerator } from "@/utils/generators/generateDisplayName"
import { selectAllActionItem } from "@/redux/currentApp/action/actionSelector"
import { getSelectedAction } from "@/redux/config/configSelector"
import { ActionGenerator } from "@/page/App/components/ActionEditor/ActionGenerator"
import { ActionInfo } from "@/page/App/components/ActionEditor/ActionGenerator/interface"
import { ActionTypeIcon } from "@/page/App/components/ActionEditor/components/ActionTypeIcon"
import { isValidActionDisplayName } from "@/page/App/components/ActionEditor/utils"
import { ActionDisplayNameValidateResult } from "@/page/App/components/ActionEditor/interface"
import { ActionItem } from "@/redux/currentApp/action/actionState"
import { SearchHeader } from "./SearchHeader"
import { Runtime } from "./Runtime"
import {
  actionListContainerStyle,
  newBtnContainerStyle,
  newButtonTextStyle,
  actionItemListStyle,
  applyActionItemStyle,
  actionItemNameStyle,
  applyactionItemNameTextStyle,
  actionItemIconStyle,
  warningIndicatorStyle,
  updatedIndicatorStyle,
  noMatchFoundWrapperStyle,
  emptyActionListPlaceholderStyle,
  nameErrorMsgStyle,
} from "./style"
import { ActionListProps } from "./interface"

const DropListItem = DropList.Item

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
  const activeActionItem = useSelector(getSelectedAction)
  const [query, setQuery] = useState<string>("")
  const [editingName, setEditingName] = useState("")
  const [editingActionItemId, setEditingActionItemId] = useState("")
  const [contextMenuActionId, setContextMenuActionId] = useState("")
  const [isRenameError, setIsRenameError] =
    useState<ActionDisplayNameValidateResult>({ error: false })
  const [actionGeneratorVisible, setActionGeneratorVisible] = useState(false)

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

  const updateName = useCallback(
    (originName: string) => {
      if (originName !== editingName && !isRenameError.error) {
        onUpdateActionItem(editingActionItemId, {
          ...activeActionItem,
          displayName: editingName,
          oldDisplayName: originName,
        })
      }
      setEditingActionItemId("")
      setIsRenameError({ error: false })
      setEditingName("")
    },
    [onUpdateActionItem, editingActionItemId, editingName],
  )

  const onAddAction = useCallback(
    (info: ActionInfo) => {
      const { actionType, resourceId } = info

      setActionGeneratorVisible(false)

      onAddActionItem({
        displayName: DisplayNameGenerator.getDisplayName(actionType),
        actionType,
        resourceId,
        actionTemplate: {},
      })
    },
    [onAddActionItem],
  )

  function onClickActionItem(id: string) {
    onSelectActionItem(id)
  }

  const actionItemsList = matchedActionItems.map((item) => {
    const { actionId: id, displayName: name, actionType, error } = item
    const isSelected = id === activeActionItem.actionId

    function renderName() {
      if (id === editingActionItemId) {
        return (
          <Trigger
            content={
              <span css={nameErrorMsgStyle}>{isRenameError?.errorMsg}</span>
            }
            position="bottom"
            popupVisible={isRenameError?.error}
            showArrow={false}
            closeDelay={0}
            colorScheme="techPurple"
          >
            <Input
              inputRef={inputRef}
              borderColor="techPurple"
              value={editingName}
              error={isRenameError?.error}
              onChange={(value) => {
                setEditingName(value)
                value !== name &&
                  setIsRenameError(isValidActionDisplayName(value))
              }}
              onBlur={() => updateName(name)}
              onPressEnter={() => updateName(name)}
            />
          </Trigger>
        )
      }

      return (
        <span
          css={actionItemNameStyle}
          onDoubleClick={() => editName(id, name)}
        >
          <span css={applyactionItemNameTextStyle(error ?? false)} title={name}>
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
        css={applyActionItemStyle(isSelected)}
        onClick={() => onClickActionItem(id)}
        onContextMenu={() => {
          setContextMenuActionId(id)
        }}
      >
        <span css={actionItemIconStyle}>
          <ActionTypeIcon actionType={actionType} />
          {error && (
            <WarningCircleIcon css={warningIndicatorStyle} size={"8px"} />
          )}
        </span>
        {renderName()}
        <Runtime actionItem={item} />
      </li>
    )
  })

  const NoMatchFound = (
    <div css={noMatchFoundWrapperStyle}>
      <EmptyStateIcon size={"48px"} viewBox={"0 0 48 48"} />
      <span>{t("editor.action.action_list.tips.not_found")}</span>
    </div>
  )

  const finalActionItemList = useMemo(() => {
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
  }, [
    query,
    matchedActionItems,
    activeActionItem,
    editingActionItemId,
    isActionDirty,
    editingName,
  ])

  const handleContextMenu = useCallback(
    (key) => {
      switch (key) {
        case "duplicate":
          onDuplicateActionItem(contextMenuActionId)
          break
        case "delete":
          onDeleteActionItem(contextMenuActionId)
          break
        case "rename":
          const target = actionItems.find(
            ({ actionId }) => actionId === contextMenuActionId,
          ) as ActionItem
          editName(target?.actionId, target?.displayName)
          break
      }
    },
    [
      onDuplicateActionItem,
      onDeleteActionItem,
      editName,
      contextMenuActionId,
      actionItems,
    ],
  )

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

      <Dropdown
        trigger="contextmenu"
        triggerProps={{ position: "br" }}
        dropList={
          <DropList width={"184px"} onClickItem={handleContextMenu}>
            <DropListItem
              key={"rename"}
              title={t("editor.action.action_list.contextMenu.rename")}
            />
            <DropListItem
              key={"duplicate"}
              title={t("editor.action.action_list.contextMenu.duplicate")}
            />
            <DropListItem
              key={"delete"}
              title={t("editor.action.action_list.contextMenu.delete")}
              fontColor={globalColor(`--${illaPrefix}-red-03`)}
            />
          </DropList>
        }
      >
        <ul css={actionItemListStyle}>{finalActionItemList}</ul>
      </Dropdown>

      <ActionGenerator
        visible={actionGeneratorVisible}
        onClose={() => setActionGeneratorVisible(false)}
        onAddAction={onAddAction}
      />
    </div>
  )
}

ActionList.displayName = "ActionList"
