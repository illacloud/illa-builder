import { FC, useMemo, useState, useRef, useContext, Ref } from "react"
import { AnimatePresence } from "framer-motion"
import { v4 as uuidV4 } from "uuid"
import { Button } from "@illa-design/button"
import { CaretRightIcon, MoreIcon } from "@illa-design/icon"
import { Dropdown } from "@illa-design/dropdown"
import { Menu } from "@illa-design/menu"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { selectAllActionItem } from "@/redux/currentApp/action/actionSelector"
import { actionActions } from "@/redux/currentApp/action/actionSlice"
import { ActionEditorContext } from "@/page/App/components/ActionEditor/context"
import { generateName } from "@/page/App/components/ActionEditor/utils"
import { ResourceEditor } from "@/page/App/components/ActionEditor/ActionEditorPanel/ResourceEditor"
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
import { ActionEditorPanelContext } from "./context"
import { ActionResult } from "./ActionResult"

const { Item: MenuItem } = Menu

function renderEditor(
  type: string,
  ref: Ref<triggerRunRef>,
  onSaveParam: () => void,
  onRun: (result: any) => void,
  props: Partial<ActionEditorPanelProps>,
) {
  const { onEditResource, onChangeResource, onCreateResource, onChange } = props

  switch (type) {
    case "restapi":
    case "mysql":
      return (
        <ResourceEditor
          ref={ref}
          onChangeParam={onChange}
          onSaveParam={onSaveParam}
          onRun={onRun}
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
          onSaveParam={onSaveParam}
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
  const [actionResVisible, setActionResVisible] = useState(false)
  const [isRuning, setIsRuning] = useState(false)
  const [result, setResult] = useState<string>()
  const [duration, setDuaraion] = useState<string>()

  const runningIntervalRef = useRef<NodeJS.Timer>()
  const triggerRunRef = useRef<triggerRunRef>(null)
  const actionItems = useSelector(selectAllActionItem)
  const activeActionItem = useMemo(() => {
    if (!activeActionItemId) {
      return null
    }

    return actionItems.find((action) => action.actionId === activeActionItemId)
  }, [actionItems, activeActionItemId])

  const actionItemsNameSet = useMemo(() => {
    return new Set(actionItems.map((i) => i.displayName))
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
        actionActions.addActionItemReducer({
          actionId: id,
          type,
          displayName: generateName(type, actionItems, actionItemsNameSet),
        }),
      )

      onDuplicateActionItem(id)
    }
  }

  function deleteActionItem() {
    activeActionItem &&
      dispatch(actionActions.removeActionItemReducer(activeActionItemId))

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

  function onSaveParam() {
    onSave?.()
  }

  function onRun(result: any) {
    setActionResVisible(true)
    setResult(JSON.stringify(result.data, null, "····"))
  }

  function onLoadingActionResult(loading: boolean) {
    setIsRuning(loading)

    if (loading) {
      clearInterval(runningIntervalRef.current)
      const start = Date.now()
      runningIntervalRef.current = setInterval(() => {
        const duration = ((Date.now() - start) / 1000).toFixed(1)
        setDuaraion(`${duration}s`)
      }, 50)
    } else {
      clearInterval(runningIntervalRef.current)
      setDuaraion("")
    }
  }

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
          loading={isRuning}
          disabled={isRuning}
          onClick={() => {
            setActionResVisible(false)
            isActionDirty
              ? triggerRunRef.current?.saveAndRun()
              : triggerRunRef.current?.run()
          }}
        >
          {isRuning
            ? duration
            : isActionDirty
              ? t("editor.action.panel.btn.save_and_run")
              : t("editor.action.panel.btn.run")}
        </Button>
      </header>

      {activeActionItem && (
        <>
          <ActionEditorPanelContext.Provider value={{ onLoadingActionResult }}>
            {renderEditor(actionType, triggerRunRef, onSaveParam, onRun, {
              onChange,
              onCreateResource,
              onEditResource,
              onChangeResource,
            })}
          </ActionEditorPanelContext.Provider>
          <AnimatePresence>
            {actionResVisible && (
              <ActionResult
                result={result}
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
