import { Agent } from "@illa-public/market-agent"
import { FC, memo, useCallback, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { v4 } from "uuid"
import { useMessage } from "@illa-design/react"
import { INIT_ACTION_ADVANCED_CONFIG } from "@/page/App/components/Actions/AdvancedPanel/constant"
import { getAgentIcon } from "@/page/App/components/Actions/getIcon"
import { getIsILLAGuideMode } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { actionActions } from "@/redux/currentApp/action/actionSlice"
import {
  ActionContent,
  ActionItem,
  actionItemInitial,
} from "@/redux/currentApp/action/actionState"
import { AiAgentActionContent } from "@/redux/currentApp/action/aiAgentAction"
import { getInitialAgentContent } from "@/redux/currentApp/action/getInitialContent"
import { fetchCreateAction } from "@/services/action"
import { DisplayNameGenerator } from "@/utils/generators/generateDisplayName"
import { AgentPanelSectionProps } from "./interface"
import {
  basicButtonStyle,
  categoryItemContainerStyle,
  categoryTitleStyle,
  descStyle,
  titleAndContentContainerStyle,
  titleStyle,
} from "./style"

const AgentPanelSection: FC<AgentPanelSectionProps> = (props) => {
  const { agents, title, hasMore, changeLoading } = props
  const { t } = useTranslation()

  const finalAgents = useMemo(() => {
    if (agents.length === 0) return []

    return agents
  }, [agents])

  const isGuideMode = useSelector(getIsILLAGuideMode)
  const dispatch = useDispatch()
  const message = useMessage()

  const handleClickAction = useCallback(
    (item: Agent) => {
      return async () => {
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
          return
        }
        changeLoading(true)
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
        } finally {
          changeLoading(false)
        }
      }
    },
    [changeLoading, dispatch, isGuideMode, message, t],
  )
  return (
    <>
      <h6 css={categoryTitleStyle}>{title}</h6>
      <section css={categoryItemContainerStyle}>
        {finalAgents.map((agent) => (
          <button
            css={basicButtonStyle}
            key={agent.aiAgentID}
            onClick={handleClickAction(agent)}
          >
            {getAgentIcon(agent, "32px")}
            <div css={titleAndContentContainerStyle}>
              <span css={titleStyle}>{agent.name}</span>
              <span css={descStyle}>{agent.description}</span>
            </div>
          </button>
        ))}
      </section>
    </>
  )
}

export default memo(AgentPanelSection)
