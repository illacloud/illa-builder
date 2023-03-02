import { FC, useCallback, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Modal, useMessage } from "@illa-design/react"
import { BuilderApi } from "@/api/base"
import { ActionResourceCreator } from "@/page/App/components/Actions/ActionGenerator/ActionResourceCreator"
import { ActionResourceSelector } from "@/page/App/components/Actions/ActionGenerator/ActionResourceSelector"
import { modalContentStyle } from "@/page/Dashboard/components/ResourceGenerator/style"
import { configActions } from "@/redux/config/configSlice"
import { actionActions } from "@/redux/currentApp/action/actionSlice"
import {
  ActionContent,
  ActionItem,
  ActionType,
  actionItemInitial,
} from "@/redux/currentApp/action/actionState"
import { getInitialContent } from "@/redux/currentApp/action/getInitialContent"
import { getAppInfo } from "@/redux/currentApp/appInfo/appInfoSelector"
import { getAllResources } from "@/redux/resource/resourceSelector"
import {
  getResourceNameFromResourceType,
  getResourceTypeFromActionType,
} from "@/utils/actionResourceTransformer"
import { DisplayNameGenerator } from "@/utils/generators/generateDisplayName"
import { ActionTypeSelector } from "./ActionTypeSelector"
import { ActionCreatorPage, ActionGeneratorProps } from "./interface"

export const ActionGenerator: FC<ActionGeneratorProps> = function (props) {
  const { visible, onClose } = props
  const [currentStep, setCurrentStep] = useState<ActionCreatorPage>("select")

  const [currentActionType, setCurrentActionType] = useState<ActionType | null>(
    null,
  )

  const { t } = useTranslation()
  const message = useMessage()
  const dispatch = useDispatch()
  const appInfo = useSelector(getAppInfo)

  const allResource = useSelector(getAllResources)

  let title
  switch (currentStep) {
    case "select":
      title = t("editor.action.action_list.action_generator.selector.title")
      break
    case "createAction":
    case "directCreateAction":
      title = t(
        "editor.action.action_list.action_generator.title.choose_resource",
      )
      break
    case "createResource":
      if (currentActionType != null) {
        const resourceType = getResourceTypeFromActionType(currentActionType)
        if (resourceType != null) {
          title = t("editor.action.form.title.configure", {
            name: getResourceNameFromResourceType(resourceType),
          })
        }
      }
      break
  }

  const transformResource = currentActionType
    ? getResourceTypeFromActionType(currentActionType)
    : null

  useEffect(() => {
    if (
      currentStep === "createAction" &&
      allResource.filter((value) => {
        return value.resourceType === currentActionType
      }).length === 0
    ) {
      setCurrentStep("createResource")
    }
  }, [currentStep, currentActionType, allResource])

  const handleDirectCreateAction = useCallback(
    (
      resourceId: string,
      successCallback?: () => void,
      loadingCallback?: (loading: boolean) => void,
    ) => {
      if (currentActionType === null) {
        return
      }
      const displayName =
        DisplayNameGenerator.generateDisplayName(currentActionType)
      const initialContent = getInitialContent(currentActionType)
      const data: Partial<ActionItem<ActionContent>> = {
        actionType: currentActionType,
        displayName,
        resourceId,
        content: initialContent,
        ...actionItemInitial,
      }
      BuilderApi.teamRequest(
        {
          url: `/apps/${appInfo.appId}/actions`,
          method: "POST",
          data,
        },
        ({ data }: { data: ActionItem<ActionContent> }) => {
          message.success({
            content: t("editor.action.action_list.message.success_created"),
          })
          dispatch(actionActions.addActionItemReducer(data))
          dispatch(configActions.changeSelectedAction(data))
          successCallback?.()
        },
        () => {
          message.error({
            content: t("editor.action.action_list.message.failed"),
          })
          DisplayNameGenerator.removeDisplayName(displayName)
        },
        () => {
          DisplayNameGenerator.removeDisplayName(displayName)
        },
        (loading) => {
          loadingCallback?.(loading)
        },
      )
    },
    [appInfo.appId, currentActionType, dispatch, message, t],
  )

  const handleBack = useCallback((page: ActionCreatorPage) => {
    setCurrentStep(page)
  }, [])

  const handleCancelModal = useCallback(() => {
    onClose()
    setCurrentStep("select")
    setCurrentActionType(null)
  }, [onClose])

  const handleActionTypeSelect = useCallback(
    (actionType: ActionType) => {
      if (actionType == "transformer") {
        onClose()
      } else {
        setCurrentStep("createAction")
        setCurrentActionType(actionType)
      }
    },
    [onClose],
  )

  const handleCreateResource = useCallback((actionType: ActionType) => {
    setCurrentActionType(actionType)
    setCurrentStep("createResource")
  }, [])

  const handleCreateAction = useCallback(
    (actionType: ActionType, resourceId?: string) => {
      setCurrentStep("select")
      onClose()
    },
    [onClose],
  )

  const handleFinishCreateNewResource = useCallback(
    (resourceId: string) => {
      handleDirectCreateAction(resourceId, () => {
        setCurrentStep("select")
        onClose()
      })
    },
    [handleDirectCreateAction, onClose],
  )

  return (
    <Modal
      w="832px"
      visible={visible}
      footer={false}
      closable
      withoutLine
      withoutPadding
      title={title}
      onCancel={handleCancelModal}
    >
      <div css={modalContentStyle}>
        {currentStep === "select" && (
          <ActionTypeSelector onSelect={handleActionTypeSelect} />
        )}
        {currentStep === "createAction" && currentActionType && (
          <ActionResourceSelector
            actionType={currentActionType}
            onBack={handleBack}
            handleCreateAction={handleDirectCreateAction}
            onCreateResource={handleCreateResource}
            onCreateAction={handleCreateAction}
          />
        )}
        {currentStep === "createResource" && transformResource && (
          <ActionResourceCreator
            resourceType={transformResource}
            onBack={handleBack}
            onFinished={handleFinishCreateNewResource}
          />
        )}
      </div>
    </Modal>
  )
}

ActionGenerator.displayName = "ActionGenerator"
