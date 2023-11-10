import { Agent } from "@illa-public/market-agent"
import {
  ILLA_MIXPANEL_EVENT_TYPE,
  MixpanelTrackContext,
} from "@illa-public/mixpanel-utils"
import { ResourceType } from "@illa-public/public-types"
import { ResourceTypeSelector } from "@illa-public/resource-generator"
import { FC, useCallback, useContext, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { v4 } from "uuid"
import { Modal, useMessage } from "@illa-design/react"
import { AIAgentSelector } from "@/page/App/components/Actions/ActionGenerator/AIAgentSelector"
import { ActionResourceSelector } from "@/page/App/components/Actions/ActionGenerator/ActionResourceSelector"
import { getIsILLAGuideMode } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { actionActions } from "@/redux/currentApp/action/actionSlice"
import {
  ActionContent,
  ActionItem,
  ActionType,
  actionItemInitial,
} from "@/redux/currentApp/action/actionState"
import { AiAgentActionContent } from "@/redux/currentApp/action/aiAgentAction"
import {
  getInitialAgentContent,
  getInitialContent,
} from "@/redux/currentApp/action/getInitialContent"
import { getAllResources } from "@/redux/resource/resourceSelector"
import { fetchCreateAction } from "@/services/action"
import { DisplayNameGenerator } from "@/utils/generators/generateDisplayName"
import { INIT_ACTION_ADVANCED_CONFIG } from "../AdvancedPanel/constant"
import { ResourceCreator } from "../ResourceGenerator/ResourceCreator"
import { ModalHeader } from "./Header"
import { ActionCreatorPage, ActionGeneratorProps } from "./interface"
import { modalContentStyle } from "./style"

export const ACTION_MODAL_WIDTH = 1080
export const ActionGenerator: FC<ActionGeneratorProps> = function (props) {
  const {
    visible,
    onClose,
    defaultStep = "select",
    defaultActionType = null,
    canBackToSelect = true,
  } = props
  const [currentStep, setCurrentStep] = useState<ActionCreatorPage>(defaultStep)

  const [currentActionType, setCurrentActionType] = useState<ActionType | null>(
    defaultActionType,
  )

  const { t } = useTranslation()
  const message = useMessage()
  const dispatch = useDispatch()

  const allResource = useSelector(getAllResources)
  const isGuideMode = useSelector(getIsILLAGuideMode)
  const { track } = useContext(MixpanelTrackContext)

  useEffect(() => {
    if (currentStep === "createAction") {
      if (currentActionType === "aiagent") {
        return
      } else if (
        allResource.filter((value) => {
          return value.resourceType === currentActionType
        }).length === 0
      ) {
        setCurrentStep("createResource")
      }
    }
  }, [currentStep, currentActionType, allResource])

  const handleDirectCreateAction = useCallback(
    async (
      resourceID: string,
      successCallback?: () => void,
      loadingCallback?: (loading: boolean) => void,
    ) => {
      if (currentActionType === null) {
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
      }
      data.config = {
        public: false,
        advancedConfig: INIT_ACTION_ADVANCED_CONFIG,
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
    [currentActionType, dispatch, message, t, isGuideMode],
  )

  const handleCreateAgentAction = useCallback(
    async (
      item: Agent,
      successCallback?: () => void,
      loadingCallback?: (loading: boolean) => void,
    ) => {
      if (currentActionType !== "aiagent") return
      const displayName =
        DisplayNameGenerator.generateDisplayName(currentActionType)
      const initalAgentContent = getInitialAgentContent(item)
      const data: Omit<ActionItem<AiAgentActionContent>, "actionID"> = {
        actionType: currentActionType,
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
    [currentActionType, dispatch, isGuideMode, message, t],
  )

  const handleBack = useCallback(
    (page: ActionCreatorPage) => {
      track?.(
        ILLA_MIXPANEL_EVENT_TYPE.CLICK,
        {
          element: "resource_configure_back",
          parameter5: currentActionType,
        },
        "both",
      )
      setCurrentStep(page)
    },
    [track, currentActionType],
  )

  const handleCancelModal = useCallback(() => {
    const element =
      currentStep === "createResource"
        ? "resource_configure_close"
        : "resource_type_modal"
    track?.(
      ILLA_MIXPANEL_EVENT_TYPE.CLICK,
      {
        element,
        parameter5: currentActionType,
      },
      "both",
    )
    onClose()
    setCurrentStep("select")
    setCurrentActionType(null)
  }, [currentStep, onClose, track, currentActionType])

  const handleActionTypeSelect = useCallback(
    (actionType: ActionType) => {
      track?.(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
        element: "resource_type_modal_resource",
        parameter5: actionType,
      })
      setCurrentStep("createAction")
      setCurrentActionType(actionType)
    },
    [track],
  )

  const handleCreateResource = useCallback((actionType: ActionType) => {
    setCurrentActionType(actionType)
    setCurrentStep("createResource")
  }, [])

  const handleCreateAction = useCallback(() => {
    setCurrentStep("select")
    onClose()
  }, [onClose])

  const handleFinishCreateNewResource = useCallback(
    (resourceID?: string) => {
      track?.(
        ILLA_MIXPANEL_EVENT_TYPE.CLICK,
        {
          element: "resource_configure_save",
          parameter5: currentActionType,
        },
        "both",
      )
      if (!resourceID) return
      handleDirectCreateAction(resourceID, () => {
        setCurrentStep("select")
        onClose()
      })
    },
    [handleDirectCreateAction, onClose, track, currentActionType],
  )
  useEffect(() => {
    if (currentStep === "createResource" && currentActionType && visible) {
      track?.(
        ILLA_MIXPANEL_EVENT_TYPE.SHOW,
        {
          element: "resource_configure_modal",
          parameter5: currentActionType,
        },
        "both",
      )
    }
  }, [currentStep, track, currentActionType, visible])

  useEffect(() => {
    if (currentStep === "select" && visible) {
      track?.(
        ILLA_MIXPANEL_EVENT_TYPE.SHOW,
        {
          element: "resource_type_modal",
          parameter5: currentActionType,
        },
        "both",
      )
    }
  }, [currentStep, track, currentActionType, visible])

  const isMaskClosable = currentStep !== "createResource"

  return (
    <Modal
      w={`${ACTION_MODAL_WIDTH}px`}
      visible={visible}
      footer={false}
      closable
      maskClosable={isMaskClosable}
      withoutLine
      withoutPadding
      onCancel={handleCancelModal}
      focusLock={false}
    >
      <div css={modalContentStyle}>
        {currentStep === "select" && (
          <>
            <ModalHeader
              title={t(
                "editor.action.action_list.action_generator.selector.title",
              )}
              onClickClose={handleCancelModal}
            />
            <ResourceTypeSelector onSelect={handleActionTypeSelect} />
          </>
        )}
        {currentStep === "createAction" &&
          currentActionType &&
          (currentActionType === "aiagent" ? (
            <>
              <ModalHeader
                title={t(
                  "editor.action.action_list.action_generator.title.choose_resource",
                )}
                onClickClose={handleCancelModal}
              />
              <AIAgentSelector
                actionType={currentActionType}
                onBack={handleBack}
                handleCreateAction={handleCreateAgentAction}
                onCreateAction={handleCreateAction}
                canBack={canBackToSelect}
              />
            </>
          ) : (
            <>
              <ModalHeader
                title={t(
                  "editor.action.action_list.action_generator.title.choose_resource",
                )}
                onClickClose={handleCancelModal}
              />
              <ActionResourceSelector
                actionType={currentActionType}
                onBack={handleBack}
                handleCreateAction={handleDirectCreateAction}
                onCreateResource={handleCreateResource}
                onCreateAction={handleCreateAction}
                canBack={canBackToSelect}
              />
            </>
          ))}
        {currentStep === "createResource" && currentActionType && (
          <ResourceCreator
            resourceType={currentActionType as ResourceType}
            onBack={handleBack}
            onFinished={handleFinishCreateNewResource}
          />
        )}
      </div>
    </Modal>
  )
}

ActionGenerator.displayName = "ActionGenerator"
