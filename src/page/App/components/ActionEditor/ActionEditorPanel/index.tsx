import { FC, useState, useRef, useContext } from "react"
import { AnimatePresence } from "framer-motion"
import { useDispatch, useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import { Api } from "@/api/base"
import { AxiosResponse } from "axios"
import { Button } from "@illa-design/button"
import { CaretRightIcon, MoreIcon } from "@illa-design/icon"
import { Dropdown } from "@illa-design/dropdown"
import { getSelectedAction } from "@/redux/currentApp/config/configSelector"
import { actionActions } from "@/redux/currentApp/action/actionSlice"
import { ActionItem } from "@/redux/currentApp/action/actionState"
import { ResourceEditor } from "@/page/App/components/ActionEditor/ActionEditorPanel/ResourceEditor"
import { TransformerEditor } from "@/page/App/components/ActionEditor/ActionEditorPanel/TransformerEditor"
import { ActionEditorContext } from "@/page/App/components/ActionEditor/context"
import { TitleInput } from "@/page/App/components/ActionEditor/ActionEditorPanel/TitleInput"
import { ActionResultType } from "@/page/App/components/ActionEditor/ActionEditorPanel/ActionResult/interface"
import { ActionResult } from "@/page/App/components/ActionEditor/ActionEditorPanel/ActionResult"
import { ActionEditorPanelProps, TriggerMode } from "./interface"
import {
  containerStyle,
  headerStyle,
  fillingStyle,
  moreBtnStyle,
  moreBtnMenuStyle,
  duplicateActionStyle,
  deleteActionStyle,
} from "./style"


export const ActionEditorPanel: FC<ActionEditorPanelProps> = (props) => {
  const {
    isActionDirty,
    onEditResource,
    onChangeResource,
    onCreateResource,
    onDuplicateActionItem,
    onDeleteActionItem,
  } = props

  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { setIsActionDirty } = useContext(ActionEditorContext)
  const [moreBtnMenuVisible, setMoreBtnMenuVisible] = useState(false)
  const [actionResVisible, setActionResVisible] = useState(false)
  const [triggerMode, setTriggerMode] = useState<TriggerMode>("manual")
  const [isRuning, setIsRuning] = useState(false)
  const [result, setResult] = useState<ActionResultType>()
  const [duration, setDuaraion] = useState<string>()

  const runningIntervalRef = useRef<NodeJS.Timer>()
  const activeActionItem = useSelector(getSelectedAction)
  const actionType = activeActionItem?.actionType ?? ""
  let editorNode = null
  let runBtnText = ""

  const moreActions = (
    <div css={moreBtnMenuStyle}>
      <div
        css={duplicateActionStyle}
        onClick={() => {
          setMoreBtnMenuVisible(false)
          onDuplicateActionItem()
        }}
      >
        {t("editor.action.panel.menu.more.duplicate")}
      </div>
      <div
        css={deleteActionStyle}
        onClick={() => {
          setMoreBtnMenuVisible(false)
          onDeleteActionItem()
        }}
      >
        {t("editor.action.panel.menu.more.delete")}
      </div>
    </div>
  )

  async function saveOrRun() {
    if (isActionDirty) {
      if (triggerMode === "manual") {
        // save only
        save()
      } else {
        // save and run
        await save()
        run()
      }
    } else {
      // run
      run()
    }
  }

  async function save() {
    const { data, rawData, error, ...actionPayload } = activeActionItem
    const actionId = activeActionItem.actionId

    Api.request<ActionItem>(
      {
        url: `/actions/${actionId}`,
        method: "PUT",
        data: actionPayload,
      },
      ({ data }) => {
        dispatch(
          actionActions.updateActionItemReducer({
            ...data,
            actionId,
          }),
        )

        setIsActionDirty?.(false)
      },
      () => { },
      () => { },
      (loading) => {
        onLoadingActionResult(loading)
      },
    )
  }

  function run() {
    const { actionType } = activeActionItem

    if (actionType === "transformer") {
      // TODO: run transformer
      setResult(activeActionItem.actionTemplate?.transformer)
      setActionResVisible(true)
      return
    }

    Api.request(
      {
        url: `/actions/${activeActionItem?.actionId}/run`,
        method: "POST",
        data: {
          actionType: activeActionItem?.actionType,
        },
      },
      (response) => {
        // save data to action
        dispatch(
          actionActions.updateActionItemReducer({
            ...activeActionItem,
            // TODO: apply Transfomer
            data: response.data,
            rawData: response.data,
            error: false,
          }),
        )

        setResult(response)
        setActionResVisible(true)
      },
      (response) => {
        // empty data if has error
        dispatch(
          actionActions.updateActionItemReducer({
            ...activeActionItem,
            // TODO: apply Transfomer
            data: {},
            rawData: {},
            error: true,
          }),
        )
        setResult(response)
        setActionResVisible(true)
      },
      () => { },
      (loading) => {
        onLoadingActionResult(loading)
      },
    )
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

  switch (actionType) {
    case "restapi":
    case "mysql":
      editorNode = (
        <ResourceEditor
          triggerMode={triggerMode}
          onChangeTriggerMode={setTriggerMode}
          onCreateResource={onCreateResource}
          onEditResource={onEditResource}
          onChangeResource={onChangeResource}
        />
      )
      break
    case "transformer":
      editorNode = <TransformerEditor />
      break
    default:
      break
  }

  if (isRuning) {
    runBtnText = duration as string
  } else {
    if (isActionDirty) {
      runBtnText =
        triggerMode === "manual"
          ? t("editor.action.panel.btn.save")
          : t("editor.action.panel.btn.save_and_run")
    } else {
      runBtnText = t("editor.action.panel.btn.run")
    }
  }

  return (
    <div css={containerStyle}>
      <header css={headerStyle}>
        <TitleInput />
        <span css={fillingStyle} />
        <Dropdown
          dropList={moreActions}
          trigger={"click"}
          popupVisible={moreBtnMenuVisible}
          onVisibleChange={setMoreBtnMenuVisible}
          triggerProps={{
            position: "br",
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
          onClick={saveOrRun}
        >
          {runBtnText}
        </Button>
      </header>

      {activeActionItem && (
        <>
          {editorNode}
          <AnimatePresence>
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
