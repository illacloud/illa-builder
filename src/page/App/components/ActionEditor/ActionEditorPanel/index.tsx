import { FC, useMemo, useState, useRef, useContext, Ref } from "react"
import { v4 as uuidV4 } from "uuid"
import { Button } from "@illa-design/button"
import { CaretRightIcon, MoreIcon } from "@illa-design/icon"
import { Dropdown } from "@illa-design/dropdown"
import { Menu } from "@illa-design/menu"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { selectAllActionItem } from "@/redux/currentApp/action/actionList/actionListSelector"
import { actionListActions } from "@/redux/currentApp/action/actionList/actionListSlice"
import { ActionType } from "@/redux/currentApp/action/actionList/actionListState"
import { ActionEditorContext } from "@/page/App/components/ActionEditor/context"
import { generateName } from "@/page/App/components/ActionEditor/utils"
import { ResoucreEditor } from "@/page/App/components/ActionEditor/ActionEditorPanel/ResourceEditor"
import { TransformerEditor } from "@/page/App/components/ActionEditor/ActionEditorPanel/TransformerEditor"
import { TitleInput } from "@/page/App/components/ActionEditor/ActionEditorPanel/TitleInput"
import { ActionEditorPanelProps, triggerRunRef } from "./interface"
import {
  containerStyle,
  headerStyle,
  fillingStyle,
  moreBtnStyle,
  moreBtnMenuStyle,
  duplicateActionStyle,
  deleteActionStyle,
} from "./style"
import { ActionResult } from "./ActionResult"

const { Item: MenuItem } = Menu

function renderEditor(
  type: ActionType | undefined,
  props: Partial<ActionEditorPanelProps>,
  ref: Ref<triggerRunRef>,
) {
  const {
    onEditResource,
    onChangeResource,
    onCreateResource,
    onChange,
    onSave,
  } = props

  switch (type) {
    case "resource":
      return (
        <ResoucreEditor
          ref={ref}
          onChangeParam={onChange}
          onSaveParam={onSave}
          onCreateResource={onCreateResource}
          onEditResource={onEditResource}
          onChangeResource={onChangeResource}
        />
      )
    case "transformer":
      return (
        <TransformerEditor
          ref={ref}
          onChangeParam={onChange}
          onSaveParam={onSave}
        />
      )
    default:
      return null
  }
}

export const ActionEditorPanel: FC<ActionEditorPanelProps> = (props) => {
  const {
    isActionDirty,
    onEditResource,
    onChangeResource,
    onCreateResource,
    onDuplicateActionItem,
    onDeleteActionItem,
    onChange,
    onSave,
  } = props

  const { activeActionItemId } = useContext(ActionEditorContext)
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [moreBtnMenuVisible, setMoreBtnMenuVisible] = useState(false)
  const triggerRunRef = useRef<triggerRunRef>(null)
  const actionItems = useSelector(selectAllActionItem)
  const activeActionItem = useMemo(() => {
    if (!activeActionItemId) {
      return null
    }

    return actionItems.find((action) => action.id === activeActionItemId)
  }, [actionItems, activeActionItemId])

  const actionItemsNameSet = useMemo(() => {
    return new Set(actionItems.map((i) => i.name))
  }, [actionItems])

  const actionType = activeActionItem?.type

  function handleAction(key: string) {
    setMoreBtnMenuVisible(false)

    if (key === "duplicate") {
      duplicateActionItem()
    } else if (key === "delete") {
      deleteActionItem()
    }
  }

  function duplicateActionItem() {
    if (activeActionItem) {
      const { type } = activeActionItem
      const id = uuidV4()

      dispatch(
        actionListActions.addActionItemReducer({
          id,
          type,
          name: generateName(type, actionItems, actionItemsNameSet),
        }),
      )

      onDuplicateActionItem(id)
    }
  }

  function deleteActionItem() {
    activeActionItem &&
      dispatch(actionListActions.removeActionItemReducer(activeActionItemId))

    onDeleteActionItem(activeActionItemId)
  }

  const moreActions = (
    <Menu onClickMenuItem={handleAction} css={moreBtnMenuStyle}>
      <MenuItem
        key={"duplicate"}
        title={t("editor.action.panel.menu.more.duplicate")}
        css={duplicateActionStyle}
      />
      <MenuItem
        key={"delete"}
        title={t("editor.action.panel.menu.more.delete")}
        css={deleteActionStyle}
      />
    </Menu>
  )

  return (
    <div css={containerStyle}>
      <header css={headerStyle}>
        <TitleInput activeActionItem={activeActionItem} />
        <span css={fillingStyle} />
        <Dropdown
          dropList={moreActions}
          trigger={"click"}
          popupVisible={moreBtnMenuVisible}
          onVisibleChange={setMoreBtnMenuVisible}
          triggerProps={{
            clickOutsideToClose: true,
            closeOnClick: true,
            openDelay: 0,
            closeDelay: 0,
            showArrow: false,
          }}
        >
          <Button
            css={moreBtnStyle}
            buttonRadius="8px"
            size="medium"
            leftIcon={<MoreIcon />}
            colorScheme="grayBlue"
          />
        </Dropdown>
        <Button
          buttonRadius="8px"
          size="medium"
          colorScheme="techPurple"
          variant="light"
          leftIcon={<CaretRightIcon />}
          onClick={() => {
            isActionDirty
              ? triggerRunRef.current?.saveAndRun()
              : triggerRunRef.current?.run()
          }}
        >
          {isActionDirty
            ? t("editor.action.panel.btn.save_and_run")
            : t("editor.action.panel.btn.run")}
        </Button>
      </header>
      {activeActionItem && (
        <>
          {renderEditor(
            actionType,
            {
              onChange,
              onSave,
              onCreateResource,
              onEditResource,
              onChangeResource,
            },
            triggerRunRef,
          )}
          <ActionResult />
        </>
      )}
    </div>
  )
}

ActionEditorPanel.displayName = "ActionEditorPanel"
