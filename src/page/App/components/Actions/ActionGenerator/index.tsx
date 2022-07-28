import { FC, useEffect, useState } from "react"
import { Modal } from "@illa-design/modal"
import { ActionGeneratorProps, ActionInfo } from "./interface"
import { ActionTypeSelector } from "./ActionTypeSelector"
import { ActionResourceSelector } from "@/page/App/components/Actions/ActionGenerator/ActionResourceSelector"
import { ActionResourceCreator } from "@/page/App/components/Actions/ActionGenerator/ActionResourceCreator"
import {
  ActionContent,
  ActionItem,
  actionItemInitial,
  ActionType,
} from "@/redux/currentApp/action/actionState"
import { css } from "@emotion/react"
import { DisplayNameGenerator } from "@/utils/generators/generateDisplayName"
import { getInitialContent } from "@/redux/currentApp/action/getInitialContent"
import { Api } from "@/api/base"
import { actionActions } from "@/redux/currentApp/action/actionSlice"
import { Message } from "@illa-design/message"
import i18n from "@/i18n/config"
import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { ActionTypeCategory } from "./ActionTypeSelector/interface"
import { configActions } from "@/redux/config/configSlice"

export const ActionGenerator: FC<ActionGeneratorProps> = function (props) {
  const { visible, onClose } = props
  const [step, setStep] = useState<0 | 1 | 2>(0)
  const [actionType, setResourceType] = useState<ActionType>()
  const [category, setCategory] = useState<ActionTypeCategory>()
  const [defaultSelectedResourceId, setDefaultSelectedResourceId] = useState("")
  const [loading, setLoading] = useState<boolean>()
  const dispatch = useDispatch()
  const params = useParams()
  const baseActionUrl = `/apps/${params.appId}/actions`

  useEffect(() => {
    setStep(0)
  }, [visible])

  function onAddActionItem(actionType: ActionType, resourceId?: string) {
    const displayName = DisplayNameGenerator.getDisplayName(actionType)
    const initialContent = getInitialContent(actionType)
    const data: Partial<ActionItem<{}>> = {
      actionType,
      displayName,
      resourceId,
      content: initialContent,
      ...actionItemInitial,
    }
    Api.request(
      {
        url: baseActionUrl,
        method: "POST",
        data,
      },
      ({ data }: { data: ActionItem<ActionContent> }) => {
        Message.success(
          i18n.t("editor.action.action_list.message.success_created"),
        )
        dispatch(actionActions.addActionItemReducer(data))
        dispatch(configActions.updateSelectedAction(data))
        onClose()
      },
      () => {
        Message.error(i18n.t("editor.action.action_list.message.failed"))
        DisplayNameGenerator.removeDisplayName(displayName)
      },
      () => {},
      (loading) => {
        setLoading(loading)
      },
    )
  }

  const onAddAction = (info: ActionInfo) => {
    const { actionType, resourceId } = info
    onAddActionItem(actionType, resourceId)
  }

  return (
    <Modal
      _css={css`
        width: 696px;
      `}
      visible={visible}
      footer={false}
      closable
      withoutPadding
      onCancel={onClose}
    >
      {step === 0 ? (
        <ActionTypeSelector
          loading={loading}
          onSelect={(info) => {
            const { category, actionType } = info

            setCategory(category)
            switch (category) {
              case "jsTransformer": {
                onAddAction(info)
                break
              }
              case "apis":
              case "databases": {
                setResourceType(actionType)
                setStep(1)
                break
              }
            }
          }}
        />
      ) : step === 1 ? (
        <ActionResourceSelector
          actionType={actionType}
          loading={loading}
          onBack={() => {
            setStep(0)
            setResourceType(undefined)
          }}
          onCreateResource={(actionType) => {
            setResourceType(actionType)
            setStep(2)
          }}
          onCreateAction={(actionType, resourceId) => {
            actionType && onAddAction({ actionType, resourceId })
          }}
          defaultSelected={defaultSelectedResourceId}
        />
      ) : (
        <ActionResourceCreator
          category={category}
          resourceType={actionType}
          onBack={() => {
            setStep(0)
            setResourceType(undefined)
          }}
          onCreated={(resourceId) => {
            setDefaultSelectedResourceId(resourceId)
            setStep(1)
          }}
        />
      )}
    </Modal>
  )
}

ActionGenerator.displayName = "ActionGenerator"
