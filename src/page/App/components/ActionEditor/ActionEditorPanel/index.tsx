import { FC, useState, useRef, useContext } from "react"
import { globalColor, illaPrefix } from "@illa-design/theme"
import { AnimatePresence } from "framer-motion"
import { useDispatch, useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"
import { Api } from "@/api/base"
import { Button } from "@illa-design/button"
import { CaretRightIcon, MoreIcon } from "@illa-design/icon"
import { Dropdown, DropList } from "@illa-design/dropdown"
import { actionActions } from "@/redux/currentApp/action/actionSlice"
import { ActionItem } from "@/redux/currentApp/action/actionState"
import { getSelectedAction } from "@/redux/config/configSelector"
import { ResourceEditor } from "@/page/App/components/ActionEditor/ActionEditorPanel/ResourceEditor"
import { TransformerEditor } from "@/page/App/components/ActionEditor/ActionEditorPanel/TransformerEditor"
import { ActionEditorContext } from "@/page/App/components/ActionEditor/context"
import { TitleInput } from "@/page/App/components/ActionEditor/ActionEditorPanel/TitleInput"
import { ActionResultType } from "@/page/App/components/ActionEditor/ActionEditorPanel/ActionResult/interface"
import { ActionResult } from "@/page/App/components/ActionEditor/ActionEditorPanel/ActionResult"
import { ActionResultErrorIndicator } from "@/page/App/components/ActionEditor/ActionEditorPanel/ActionResultErrorIndicator"
import { ACTION_TYPE } from "@/page/App/components/ActionEditor/constant"
import { executeAction } from "@/utils/action/execute"
import { ActionEditorPanelProps } from "./interface"
import {
  containerStyle,
  headerStyle,
  fillingStyle,
  moreBtnStyle,
  moreBtnMenuStyle,
} from "./style"

const DropListItem = DropList.Item

export const ActionEditorPanel: FC<ActionEditorPanelProps> = (props) => {
  const {
    isActionDirty,
    onEditResource,
    onCreateResource,
    onDuplicateActionItem,
    onDeleteActionItem,
  } = props

  const { t } = useTranslation()
  const dispatch = useDispatch()
  const params = useParams()
  const { setIsActionDirty, baseActionApi } = useContext(ActionEditorContext)
  const [moreBtnMenuVisible, setMoreBtnMenuVisible] = useState(false)
  const [actionResVisible, setActionResVisible] = useState(false)
  const [isRuning, setIsRuning] = useState(false)
  const [result, setResult] = useState<ActionResultType>()
  const [duration, setDuaraion] = useState<string>()

  const runningIntervalRef = useRef<NodeJS.Timer>()
  const activeActionItem = useSelector(getSelectedAction)
  const actionType = activeActionItem?.actionType ?? ""
  const triggerMode = activeActionItem.actionTemplate?.triggerMode ?? "manual"
  let editorNode = null
  let runBtnText = ""

  function saveOrRun() {
    if (isActionDirty) {
      if (triggerMode === "manual") {
        // save only
        save()
      } else {
        // save and run
        save()
        run()
      }
    } else {
      // run
      run()
    }
  }

  function save() {
    const { actionId, resourceId, actionType, displayName, actionTemplate } =
      activeActionItem

    Api.request<ActionItem>(
      {
        url: `${baseActionApi}/${actionId}`,
        method: "PUT",
        data: {
          resourceId,
          actionType,
          displayName,
          actionTemplate,
        },
      },
      ({ data }) => {
        dispatch(
          actionActions.updateActionItemReducer({
            ...data,
            actionId,
          }),
        )

        setIsActionDirty?.(false)

        // (get req) will run automatically whenever a parameter changes.
        if (
          data.actionType === ACTION_TYPE.REST_API &&
          data.actionTemplate.method === "GET"
        ) {
          run()
        }
      },
      () => {},
      () => {},
      (loading) => {
        onLoadingActionResult(loading)
      },
    )
  }

  function run() {
    executeAction(
      activeActionItem,
      params.versionId || "",
      (response) => {
        setResult(response)
        setActionResVisible(true)
      },
      (response) => {
        setResult(response)
        setActionResVisible(true)
      },
      () => {},
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
          dropList={
            <DropList
              css={moreBtnMenuStyle}
              onClickItem={(key) => {
                switch (key) {
                  case "duplicate":
                    onDuplicateActionItem()
                    break
                  case "delete":
                    onDeleteActionItem()
                    break
                }
              }}
            >
              <DropListItem
                key={"duplicate"}
                title={t("editor.action.panel.menu.more.duplicate")}
              />
              <DropListItem
                key={"delete"}
                title={t("editor.action.panel.menu.more.delete")}
                fontColor={globalColor(`--${illaPrefix}-red-03`)}
              />
            </DropList>
          }
          trigger={"click"}
          popupVisible={moreBtnMenuVisible}
          onVisibleChange={setMoreBtnMenuVisible}
          disabled={activeActionItem.actionId === ""}
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
          disabled={isRuning || activeActionItem.actionId === ""}
          onClick={saveOrRun}
        >
          {runBtnText}
        </Button>
      </header>

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
