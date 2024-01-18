import {
  INIT_ACTION_ADVANCED_CONFIG,
  INIT_ACTION_MOCK_CONFIG,
  actionItemInitial,
  getInitialAgentContent,
  getInitialContent,
} from "@illa-public/public-configs"
import {
  ActionContent,
  ActionItem,
  ActionType,
  Agent,
  AiAgentActionContent,
} from "@illa-public/public-types"
import { HandleCreateAgentActionFunc } from "@illa-public/resource-generator/components/ActionGenerator/AIAgentSelector/interface"
import { HandleDirectCreateActionFunc } from "@illa-public/resource-generator/components/ActionGenerator/ActionResourceSelector/interface"
import { useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { v4 } from "uuid"
import { useMessage } from "@illa-design/react"
import { aiAgentActions } from "@/redux/aiAgent/dashboardTeamAIAgentSlice"
import { getIsILLAGuideMode } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { actionActions } from "@/redux/currentApp/action/actionSlice"
import { fetchCreateAction } from "@/services/action"
import { DisplayNameGenerator } from "@/utils/generators/generateDisplayName"

export const useCreateAction = (): [
  HandleDirectCreateActionFunc,
  HandleCreateAgentActionFunc,
] => {
  const isGuideMode = useSelector(getIsILLAGuideMode)
  const dispatch = useDispatch()
  const message = useMessage()
  const { t } = useTranslation()

  const handleDirectCreateAction = useCallback(
    async (
      currentActionType: ActionType,
      resourceID: string,
      successCallback?: () => void,
      loadingCallback?: (loading: boolean) => void,
    ) => {
      if (currentActionType == null) {
        return
      }
      const displayName =
        DisplayNameGenerator.generateDisplayName(currentActionType)
      const initialContent = getInitialContent(currentActionType)
      const data: Omit<ActionItem<ActionContent>, "actionID"> = {
        actionType: currentActionType,
        displayName,
        resourceID,
        content: initialContent,
        isVirtualResource: false,
        ...actionItemInitial,
        config: {
          public: false,
          advancedConfig: INIT_ACTION_ADVANCED_CONFIG,
          mockConfig: INIT_ACTION_MOCK_CONFIG,
        },
      }
      if (isGuideMode) {
        const createActionData: ActionItem<ActionContent> = {
          ...data,
          actionID: v4(),
        }
        dispatch(actionActions.addActionItemReducer(createActionData))
        dispatch(configActions.changeSelectedAction(createActionData))
        successCallback?.()
        return
      }
      loadingCallback?.(true)
      try {
        const { data: responseData } = await fetchCreateAction(data)
        message.success({
          content: t("editor.action.action_list.message.success_created"),
        })
        dispatch(actionActions.addActionItemReducer(responseData))
        dispatch(configActions.changeSelectedAction(responseData))
        successCallback?.()
      } catch (_e) {
        message.error({
          content: t("editor.action.action_list.message.failed"),
        })
        DisplayNameGenerator.removeDisplayName(displayName)
      }
      loadingCallback?.(false)
    },
    [dispatch, message, t, isGuideMode],
  )

  const handleCreateAgentAction = useCallback(
    async (
      item: Agent,
      successCallback?: () => void,
      loadingCallback?: (loading: boolean) => void,
    ) => {
      dispatch(
        aiAgentActions.addTeamAIAgentReducer({
          aiAgent: item,
        }),
      )
      const displayName = DisplayNameGenerator.generateDisplayName("aiagent")
      const initalAgentContent = getInitialAgentContent(item)
      const data: Omit<ActionItem<AiAgentActionContent>, "actionID"> = {
        actionType: "aiagent",
        displayName,
        resourceID: item.aiAgentID,
        content: {
          ...initalAgentContent,
          virtualResource: item,
        },
        isVirtualResource: true,
        ...actionItemInitial,
        config: {
          public: false,
          advancedConfig: INIT_ACTION_ADVANCED_CONFIG,
          mockConfig: INIT_ACTION_MOCK_CONFIG,
          icon: item.icon,
        },
      }
      if (isGuideMode) {
        const createActionData: ActionItem<ActionContent> = {
          ...data,
          actionID: v4(),
        }
        dispatch(actionActions.addActionItemReducer(createActionData))
        dispatch(configActions.changeSelectedAction(createActionData))
        successCallback?.()
        return
      }
      loadingCallback?.(true)
      try {
        const { data: responseData } = await fetchCreateAction(data)
        message.success({
          content: t("editor.action.action_list.message.success_created"),
        })
        dispatch(actionActions.addActionItemReducer(responseData))
        dispatch(configActions.changeSelectedAction(responseData))
        successCallback?.()
      } catch (_e) {
        message.error({
          content: t("editor.action.action_list.message.failed"),
        })
        DisplayNameGenerator.removeDisplayName(displayName)
      }
      loadingCallback?.(false)
    },
    [dispatch, isGuideMode, message, t],
  )

  return [handleDirectCreateAction, handleCreateAgentAction]
}
