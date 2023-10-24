import { getIconFromResourceType } from "@illa-public/icon"
import { isCloudVersion } from "@illa-public/utils"
import { isEqual } from "lodash"
import { FC, useContext, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { v4 } from "uuid"
import {
  AddIcon,
  Button,
  DropList,
  DropListItem,
  Dropdown,
  Empty,
  List,
  Space,
  useMessage,
  useModal,
} from "@illa-design/react"
import { ReactComponent as ActionListEmptyState } from "@/assets/action-list-empty-state.svg"
import {
  getCachedAction,
  getIsILLAGuideMode,
  getSelectedAction,
} from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { getActionMixedList } from "@/redux/currentApp/action/actionSelector"
import { actionActions } from "@/redux/currentApp/action/actionSlice"
import {
  ActionContent,
  ActionItem,
  ActionType,
  GlobalDataActionContent,
  actionItemInitial,
} from "@/redux/currentApp/action/actionState"
import { getInitialContent } from "@/redux/currentApp/action/getInitialContent"
import { componentsActions } from "@/redux/currentApp/components/componentsSlice"
import { fetchCreateAction } from "@/services/action"
import { DisplayNameGenerator } from "@/utils/generators/generateDisplayName"
import { ShortCutContext } from "@/utils/shortcut/shortcutProvider"
import DatabaseIcon from "../../Icons/database"
import { ActionGenerator } from "../ActionGenerator"
import { ActionListItem } from "../ActionListItem"
import { onCopyActionItem } from "../api"
import { ListWithNewButtonProps } from "./interface"
import {
  actionListEmptyStyle,
  addNewActionButtonStyle,
  createDropListItemContainerStyle,
  listContainerStyle,
  listStyle,
  prefixIconContainerStyle,
} from "./style"

export const ActionListWithNewButton: FC<ListWithNewButtonProps> = (props) => {
  const { searchActionValue } = props
  const selectedAction = useSelector(getSelectedAction)
  const cachedAction = useSelector(getCachedAction)
  const isGuideMode = useSelector(getIsILLAGuideMode)
  const shortcut = useContext(ShortCutContext)
  const [generatorVisible, setGeneratorVisible] = useState<boolean>()
  const [currentActionType, setCurrentActionType] =
    useState<ActionType | null>()
  const actionList = useSelector(getActionMixedList)

  const searchList = actionList.filter((value) => {
    return value.displayName
      .toLowerCase()
      .includes(searchActionValue.toLowerCase())
  })

  const { t } = useTranslation()
  const dispatch = useDispatch()
  const modal = useModal()
  const message = useMessage()

  const handleClickActionType = (type: ActionType | null) => {
    return async () => {
      switch (type) {
        case "transformer": {
          const displayName = DisplayNameGenerator.generateDisplayName(type)
          const initialContent = getInitialContent(type)
          const data: Omit<ActionItem<ActionContent>, "actionID"> = {
            actionType: type,
            displayName,
            content: initialContent,
            isVirtualResource: false,
            ...actionItemInitial,
          }
          if (isGuideMode) {
            const createActionData: ActionItem<ActionContent> = {
              ...data,
              actionID: v4(),
            }
            dispatch(actionActions.addActionItemReducer(createActionData))
            dispatch(configActions.changeSelectedAction(createActionData))
            return
          }
          try {
            const { data: responseData } = await fetchCreateAction(data)
            message.success({
              content: t("editor.action.action_list.message.success_created"),
            })
            dispatch(actionActions.addActionItemReducer(responseData))
            dispatch(configActions.changeSelectedAction(responseData))
          } catch (_e) {
            message.error({
              content: t("editor.action.action_list.message.failed"),
            })
            DisplayNameGenerator.removeDisplayName(displayName)
          }
          break
        }
        case "globalData": {
          const displayName = DisplayNameGenerator.generateDisplayName("state")
          dispatch(
            componentsActions.setGlobalStateReducer({
              key: displayName,
              value: "",
              oldKey: "",
            }),
          )
          const createActionData: ActionItem<GlobalDataActionContent> = {
            actionID: displayName,
            displayName: displayName,
            actionType: "globalData",
            triggerMode: "manually",
            isVirtualResource: true,
            content: {
              initialValue: "",
            },
            transformer: {
              enable: false,
              rawData: "",
            },
          }
          dispatch(configActions.changeSelectedAction(createActionData))
          break
        }
        default: {
          setGeneratorVisible(true)
          setCurrentActionType(type)
        }
      }
    }
  }

  return (
    <>
      <Dropdown
        dropList={
          <DropList w="222px">
            <DropListItem
              value="database"
              key="database"
              title={
                <div css={createDropListItemContainerStyle}>
                  <span css={prefixIconContainerStyle}>
                    <DatabaseIcon />
                  </span>
                  {t(
                    "editor.action.panel.label.option.general.create-resource",
                  )}
                </div>
              }
              onClick={handleClickActionType(null)}
            />
            <DropListItem
              key="transformer"
              value="transformer"
              title={
                <div css={createDropListItemContainerStyle}>
                  <span css={prefixIconContainerStyle}>
                    {getIconFromResourceType("transformer", "24px")}
                  </span>
                  {t("editor.action.panel.label.option.general.js")}
                </div>
              }
              onClick={handleClickActionType("transformer")}
            />
            <DropListItem
              key="globalData"
              value="globalData"
              title={
                <div css={createDropListItemContainerStyle}>
                  <span css={prefixIconContainerStyle}>
                    {getIconFromResourceType("globalData", "24px")}
                  </span>
                  {t("editor.action.panel.label.option.general.global-data")}
                </div>
              }
              onClick={handleClickActionType("globalData")}
            />
            {isCloudVersion && (
              <DropListItem
                key="aiagent"
                value="aiagent"
                title={
                  <div css={createDropListItemContainerStyle}>
                    <span css={prefixIconContainerStyle}>
                      {getIconFromResourceType("aiagent", "24px")}
                    </span>
                    {t("editor.action.panel.label.option.general.ai-agent")}
                  </div>
                }
                onClick={handleClickActionType("aiagent")}
              />
            )}
          </DropList>
        }
      >
        <Button
          colorScheme="techPurple"
          variant="light"
          ml="16px"
          mr="16px"
          mb="8px"
          _css={addNewActionButtonStyle}
        >
          <Space size="4px" direction="horizontal" alignItems="center">
            <AddIcon size="14px" />
            {t("editor.action.action_list.btn.new")}
          </Space>
        </Button>
      </Dropdown>
      <div css={listContainerStyle}>
        {searchList.length != 0 && (
          <List
            _css={listStyle}
            bordered={false}
            split={false}
            data={searchList}
            render={(data) => {
              return (
                <ActionListItem
                  action={data}
                  onCopyItem={onCopyActionItem}
                  onDeleteItem={(action) => {
                    if (action.actionType === "globalData") {
                      shortcut.showDeleteDialog(
                        [action.displayName],
                        "globalData",
                      )
                    } else {
                      shortcut.showDeleteDialog([action.displayName], "action")
                    }
                  }}
                  onItemClick={(action) => {
                    if (selectedAction === null) {
                      dispatch(configActions.changeSelectedAction(action))
                      return
                    }
                    // is a change action
                    if (selectedAction?.displayName !== action.displayName) {
                      if (isEqual(cachedAction, selectedAction)) {
                        dispatch(configActions.changeSelectedAction(action))
                      } else {
                        // show dialog
                        modal.show({
                          children: t(
                            "editor.action.action_list.message.confirm_switch",
                          ),
                          onOk: () => {
                            dispatch(configActions.changeSelectedAction(action))
                          },
                          okButtonProps: {
                            colorScheme: "red",
                          },
                        })
                      }
                    }
                  }}
                />
              )
            }}
            renderRaw
            renderKey={(data) => {
              return data.displayName
            }}
          />
        )}
        {searchList.length == 0 && searchActionValue !== "" && (
          <Empty
            paddingVertical="23px"
            divideSize="4px"
            icon={<ActionListEmptyState />}
            description={t("editor.action.action_list.tips.not_found")}
          />
        )}
        {searchList.length == 0 && searchActionValue == "" && (
          <div css={actionListEmptyStyle}>
            {t("editor.action.action_list.tips.empty")}
          </div>
        )}
        {generatorVisible && (
          <ActionGenerator
            visible={generatorVisible}
            onClose={() => setGeneratorVisible(false)}
            defaultStep={currentActionType ? "createAction" : "select"}
            defaultActionType={currentActionType}
            canBackToSelect={!currentActionType}
          />
        )}
      </div>
    </>
  )
}
