import { FC, useState, useMemo, useRef } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { Button } from "@illa-design/button"
import { Trigger } from "@illa-design/trigger"
import { DropList, Dropdown } from "@illa-design/dropdown"
import { Input } from "@illa-design/input"
import { illaPrefix, globalColor } from "@illa-design/theme"
import { AddIcon, WarningCircleIcon, EmptyStateIcon } from "@illa-design/icon"
import { ActionDisplayNameGenerator } from "@/utils/generators/generateActionDisplayName"
import { selectAllActionItem } from "@/redux/currentApp/action/actionSelector"
import { getSelectedAction } from "@/redux/config/configSelector"
import { ActionGenerator } from "@/page/App/components/ActionEditor/ActionGenerator"
import { ActionInfo } from "@/page/App/components/ActionEditor/ActionGenerator/interface"
import { ActionTypeIcon } from "@/page/App/components/ActionEditor/components/ActionTypeIcon"
import { useIsValidActionDisplayName } from "@/page/App/components/ActionEditor/utils"
import { ActionDisplayNameValidateResult } from "@/page/App/components/ActionEditor/interface"
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
import { SearchHeader } from "./SearchHeader"

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
  const { isValidActionDisplayName } = useIsValidActionDisplayName()

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

  function updateName(originName: string) {
    if (originName !== editingName && !isRenameError) {
      onUpdateActionItem(editingActionItemId, {
        ...activeActionItem,
        displayName: editingName,
      })
    }
    setEditingActionItemId("")
    setIsRenameError({ error: false })
    setEditingName("")
  }

  function onClickActionItem(id: string, name: string) {
    if (actionItems.length === 1) {
      editName(id, name)
    }

    onSelectActionItem(id)
  }

  function onAddAction(info: ActionInfo) {
    const { actionType, resourceId } = info

    setActionGeneratorVisible(false)

    onAddActionItem({
      displayName: ActionDisplayNameGenerator.getDisplayName(actionType),
      actionType,
      resourceId,
      actionTemplate: {},
    })
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
        onClick={() => onClickActionItem(id, name)}
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

      <Dropdown
        trigger="contextmenu"
        dropList={
          <DropList
            width={"184px"}
            onClickItem={(key) => {
              switch (key) {
                case "duplicate":
                  onDuplicateActionItem(contextMenuActionId)
                  break
                case "delete":
                  onDeleteActionItem(contextMenuActionId)
                  break
              }
            }}
          >
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
        <ul css={actionItemListStyle}>{renderActionItemList()}</ul>
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
