import { UpgradeIcon, getIconFromResourceType } from "@illa-public/icon"
import {
  ILLA_MIXPANEL_BUILDER_PAGE_NAME,
  ILLA_MIXPANEL_EVENT_TYPE,
  MixpanelTrackProvider,
} from "@illa-public/mixpanel-utils"
import {
  INIT_ACTION_ADVANCED_CONFIG,
  INIT_ACTION_MOCK_CONFIG,
  actionItemInitial,
  generateBaseActionItem,
  getInitialContent,
} from "@illa-public/public-configs"
import {
  ActionContent,
  ActionItem,
  ActionType,
  GlobalDataActionContent,
  Resource,
} from "@illa-public/public-types"
import {
  ActionGenerator,
  ResourceGeneratorProvider,
} from "@illa-public/resource-generator"
import { useUpgradeModal } from "@illa-public/upgrade-modal"
import { isSubscribeForUseDrive } from "@illa-public/upgrade-modal/utils"
import { getCurrentTeamInfo } from "@illa-public/user-data"
import { isCloudVersion } from "@illa-public/utils"
import { isEqual } from "lodash-es"
import { FC, useCallback, useContext, useState } from "react"
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
import ActionListEmptyState from "@/assets/action-list-empty-state.svg?react"
import {
  getCachedAction,
  getIsILLAGuideMode,
  getSelectedAction,
} from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { getActionMixedList } from "@/redux/currentApp/action/actionSelector"
import { actionActions } from "@/redux/currentApp/action/actionSlice"
import { componentsActions } from "@/redux/currentApp/components/componentsSlice"
import { getAllResources } from "@/redux/resource/resourceSelector"
import { resourceActions } from "@/redux/resource/resourceSlice"
import { fetchCreateAction } from "@/services/action"
import { DisplayNameGenerator } from "@/utils/generators/generateDisplayName"
import { track } from "@/utils/mixpanelHelper"
import { ShortCutContext } from "@/utils/shortcut/shortcutProvider"
import DatabaseIcon from "../../Icons/database"
import { ActionListItem } from "../ActionListItem"
import { onCopyActionItem } from "../api"
import { useCreateAction } from "../hook"
import { ListWithNewButtonProps } from "./interface"
import {
  actionListEmptyStyle,
  addNewActionButtonStyle,
  createDropListItemContainerStyle,
  dropListWithUpgradeIconStyle,
  listContainerStyle,
  listStyle,
  prefixIconContainerStyle,
  upgradeContainerStyle,
} from "./style"

export const ActionListWithNewButton: FC<ListWithNewButtonProps> = (props) => {
  const { searchActionValue } = props
  const selectedAction = useSelector(getSelectedAction)
  const cachedAction = useSelector(getCachedAction)
  const isGuideMode = useSelector(getIsILLAGuideMode)
  const resourceList = useSelector(getAllResources)
  const shortcut = useContext(ShortCutContext)
  const [generatorVisible, setGeneratorVisible] = useState<boolean>()
  const [currentActionType, setCurrentActionType] =
    useState<ActionType | null>()
  const actionList = useSelector(getActionMixedList)
  const teamInfo = useSelector(getCurrentTeamInfo)!
  const upgradeModal = useUpgradeModal()

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
            config: {
              public: false,
              advancedConfig: INIT_ACTION_ADVANCED_CONFIG,
              mockConfig: INIT_ACTION_MOCK_CONFIG,
            },
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
            config: {
              public: false,
              advancedConfig: INIT_ACTION_ADVANCED_CONFIG,
              mockConfig: INIT_ACTION_MOCK_CONFIG,
            },
          }
          dispatch(configActions.changeSelectedAction(createActionData))
          break
        }
        case "illadrive": {
          if (!isSubscribeForUseDrive(teamInfo)) {
            upgradeModal({
              modalType: "upgrade",
              from: "drive_action",
            })
            return
          }
          const displayName = DisplayNameGenerator.generateDisplayName(type)
          const initialContent = getInitialContent(type)
          const baseData = generateBaseActionItem(displayName, "")
          const data = {
            ...baseData,
            actionType: type,
            content: initialContent,
            isVirtualResource: true,
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
        default: {
          setGeneratorVisible(true)
          setCurrentActionType(type)
        }
      }
    }
  }

  const [handleDirectCreateAction, handleCreateAgentAction] = useCreateAction()

  const handleFinishCreateNewResource = useCallback(
    (resource: Resource, isUpdate: boolean) => {
      track(
        ILLA_MIXPANEL_EVENT_TYPE.CLICK,
        ILLA_MIXPANEL_BUILDER_PAGE_NAME.EDITOR,
        {
          element: "resource_configure_save",
          parameter5: resource.resourceType,
        },
      )
      if (isUpdate) {
        dispatch(resourceActions.updateResourceItemReducer(resource))
      } else {
        dispatch(resourceActions.addResourceItemReducer(resource))
      }
      handleDirectCreateAction(
        resource.resourceType,
        resource.resourceID,
        () => {
          setGeneratorVisible(false)
        },
      )
    },
    [dispatch, handleDirectCreateAction],
  )

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
                    {getIconFromResourceType("transformer", "16px")}
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
                    {getIconFromResourceType("globalData", "16px")}
                  </span>
                  {t("editor.action.panel.label.option.general.global-data")}
                </div>
              }
              onClick={handleClickActionType("globalData")}
            />
            {isCloudVersion && (
              <>
                <DropListItem
                  key="aiagent"
                  value="aiagent"
                  title={
                    <div css={createDropListItemContainerStyle}>
                      <span css={prefixIconContainerStyle}>
                        {getIconFromResourceType("aiagent", "16px")}
                      </span>
                      {t("editor.action.panel.label.option.general.ai-agent")}
                    </div>
                  }
                  onClick={handleClickActionType("aiagent")}
                />
                <DropListItem
                  key="illaDrive"
                  value="illaDrive"
                  title={
                    <div css={dropListWithUpgradeIconStyle}>
                      <div css={createDropListItemContainerStyle}>
                        <span css={prefixIconContainerStyle}>
                          {getIconFromResourceType("illadrive", "16px")}
                        </span>
                        ILLA Drive
                      </div>
                      {!isSubscribeForUseDrive(teamInfo) && (
                        <div css={upgradeContainerStyle}>
                          <UpgradeIcon />
                          <span>{t("Upgrade")}</span>
                        </div>
                      )}
                    </div>
                  }
                  onClick={handleClickActionType("illadrive")}
                />
              </>
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
          <MixpanelTrackProvider
            basicTrack={track}
            pageName={ILLA_MIXPANEL_BUILDER_PAGE_NAME.EDITOR}
          >
            <ResourceGeneratorProvider
              allResource={resourceList}
              createOrUpdateResourceCallback={handleFinishCreateNewResource}
            >
              <ActionGenerator
                visible={generatorVisible}
                onClose={() => setGeneratorVisible(false)}
                defaultStep={currentActionType ? "createAction" : "select"}
                defaultActionType={currentActionType}
                canBackToSelect={!currentActionType}
                handleDirectCreateAction={handleDirectCreateAction}
                handleCreateAgentAction={handleCreateAgentAction}
              />
            </ResourceGeneratorProvider>
          </MixpanelTrackProvider>
        )}
      </div>
    </>
  )
}
