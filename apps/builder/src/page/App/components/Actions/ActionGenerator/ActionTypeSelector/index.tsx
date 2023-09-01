import {
  ILLA_MIXPANEL_BUILDER_PAGE_NAME,
  ILLA_MIXPANEL_EVENT_TYPE,
} from "@illa-public/mixpanel-utils"
import { isCloudVersion } from "@illa-public/utils"
import { FC, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { v4 } from "uuid"
import { Spin, useMessage } from "@illa-design/react"
import { WhiteList } from "@/components/WhiteList"
import { ActionTypeList } from "@/page/App/components/Actions/ActionGenerator/config"
import { getIsILLAGuideMode } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { actionActions } from "@/redux/currentApp/action/actionSlice"
import {
  ActionContent,
  ActionItem,
  actionItemInitial,
} from "@/redux/currentApp/action/actionState"
import { getInitialContent } from "@/redux/currentApp/action/getInitialContent"
import { fetchCreateAction } from "@/services/action"
import { DisplayNameGenerator } from "@/utils/generators/generateDisplayName"
import { track } from "@/utils/mixpanelHelper"
import { ActionCard } from "../ActionCard"
import { ActionTypeSelectorProps } from "./interface"
import { categoryStyle, containerStyle, resourceListStyle } from "./style"

export const ActionTypeSelector: FC<ActionTypeSelectorProps> = (props) => {
  const { onSelect } = props

  const [loading, setLoading] = useState(false)
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const message = useMessage()
  const isGuideMode = useSelector(getIsILLAGuideMode)
  return (
    <Spin css={containerStyle} colorScheme="techPurple" loading={loading}>
      {ActionTypeList.filter((item) => {
        if (!isCloudVersion) return item.category !== "aiAgent"
        return item
      }).map(({ title, item, category }) => (
        <div key={category}>
          <span css={categoryStyle}>{title}</span>
          <div css={resourceListStyle}>
            {item.map((prop) => (
              <ActionCard
                key={prop.actionType}
                onSelect={async (item) => {
                  if (item === "transformer") {
                    const displayName =
                      DisplayNameGenerator.generateDisplayName(item)
                    const initialContent = getInitialContent(item)
                    const data: Omit<ActionItem<ActionContent>, "actionID"> = {
                      actionType: item,
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
                      dispatch(
                        actionActions.addActionItemReducer(createActionData),
                      )
                      dispatch(
                        configActions.changeSelectedAction(createActionData),
                      )
                      onSelect(item)
                      return
                    }
                    setLoading(true)
                    try {
                      const { data: responseData } = await fetchCreateAction(
                        data,
                      )
                      message.success({
                        content: t(
                          "editor.action.action_list.message.success_created",
                        ),
                      })
                      dispatch(actionActions.addActionItemReducer(responseData))
                      dispatch(configActions.changeSelectedAction(responseData))
                      onSelect(item)
                    } catch (_e) {
                      message.error({
                        content: t("editor.action.action_list.message.failed"),
                      })
                      DisplayNameGenerator.removeDisplayName(displayName)
                    }
                    setLoading(false)
                  } else {
                    onSelect(item)
                  }
                }}
                {...prop}
              />
            ))}
          </div>
        </div>
      ))}
      <WhiteList
        onCopyIpReport={() => {
          track(
            ILLA_MIXPANEL_EVENT_TYPE.CLICK,
            ILLA_MIXPANEL_BUILDER_PAGE_NAME.EDITOR,
            { element: "resource_type_modal_copy" },
          )
        }}
      />
    </Spin>
  )
}

ActionTypeSelector.displayName = "ActionTypeSelector"
