import { FC, useState } from "react"
import { ActionTypeSelectorProps } from "./interface"
import { ActionTypeList } from "@/page/App/components/Actions/ActionGenerator/config"
import { categoryStyle, containerStyle, resourceListStyle } from "./style"
import { Spin, useMessage } from "@illa-design/react"
import { DisplayNameGenerator } from "@/utils/generators/generateDisplayName"
import { getInitialContent } from "@/redux/currentApp/action/getInitialContent"
import {
  ActionContent,
  ActionItem,
  actionItemInitial,
} from "@/redux/currentApp/action/actionState"
import { Api } from "@/api/base"
import { actionActions } from "@/redux/currentApp/action/actionSlice"
import { configActions } from "@/redux/config/configSlice"
import { useDispatch, useSelector } from "react-redux"
import { getAppInfo } from "@/redux/currentApp/appInfo/appInfoSelector"
import { useTranslation } from "react-i18next"
import { ActionCard } from "../ActionCard"

export const ActionTypeSelector: FC<ActionTypeSelectorProps> = (props) => {
  const { onSelect } = props

  const [loading, setLoading] = useState(false)
  const appInfo = useSelector(getAppInfo)
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const message = useMessage()

  return (
    <Spin css={containerStyle} colorScheme="techPurple" loading={loading}>
      {ActionTypeList.map(({ title, item, category }) => (
        <div key={category}>
          <span css={categoryStyle}>{title}</span>
          <div css={resourceListStyle}>
            {item.map((prop) => (
              <ActionCard
                key={prop.actionType}
                onSelect={(item) => {
                  if (item === "transformer") {
                    const displayName =
                      DisplayNameGenerator.generateDisplayName(item)
                    const initialContent = getInitialContent(item)
                    const data: Partial<ActionItem<ActionContent>> = {
                      actionType: item,
                      displayName,
                      content: initialContent,
                      ...actionItemInitial,
                    }
                    Api.request(
                      {
                        url: `/apps/${appInfo.appId}/actions`,
                        method: "POST",
                        data,
                      },
                      ({ data }: { data: ActionItem<ActionContent> }) => {
                        message.success({
                          content: t(
                            "editor.action.action_list.message.success_created",
                          ),
                        })
                        dispatch(actionActions.addActionItemReducer(data))
                        dispatch(configActions.changeSelectedAction(data))
                        onSelect(item)
                      },
                      () => {
                        message.error({
                          content: t(
                            "editor.action.action_list.message.failed",
                          ),
                        })
                        DisplayNameGenerator.removeDisplayName(displayName)
                      },
                      () => {
                        DisplayNameGenerator.removeDisplayName(displayName)
                      },
                      (loading) => {
                        setLoading(loading)
                      },
                    )
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
    </Spin>
  )
}

ActionTypeSelector.displayName = "ActionTypeSelector"
