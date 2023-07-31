import { FC, useCallback, useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { FixedSizeList } from "react-window"
import { Button, Input, PreviousIcon, RadioGroup } from "@illa-design/react"
import {
  ILLA_MIXPANEL_BUILDER_PAGE_NAME,
  ILLA_MIXPANEL_EVENT_TYPE,
} from "@/illa-public-component/MixpanelUtils/interface"
import { ACTION_MODAL_WIDTH } from "@/page/App/components/Actions/ActionGenerator"
import { AgentListItem } from "@/page/App/components/Actions/ActionGenerator/AiAgentSelector/AgentListItem"
import { TEAM_AGENT_ITEM_HEIGHT } from "@/page/App/components/Actions/ActionGenerator/AiAgentSelector/AgentListItem/style"
import { MarketListItem } from "@/page/App/components/Actions/ActionGenerator/AiAgentSelector/MarketListItem"
import { MARKET_AGENT_ITEM_HEIGHT } from "@/page/App/components/Actions/ActionGenerator/AiAgentSelector/MarketListItem/style"
import { Agent, MarketAiAgent } from "@/redux/aiAgent/aiAgentState"
import { track } from "@/utils/mixpanelHelper"
import { ActionResourceSelectorProps } from "./interface"
import { containerStyle, footerStyle } from "./style"

const data: Agent[] = []
const marketData: MarketAiAgent[] = []

export const AiAgentSelector: FC<ActionResourceSelectorProps> = (props) => {
  const { actionType, onBack, onCreateAction, handleCreateAction } = props

  const { t } = useTranslation()
  const [agentType, setAgentType] = useState("team")
  const [loading, setLoading] = useState(false)

  const agentOptions = useMemo(() => {
    return [
      {
        label: t("Team AI Agent"),
        value: "team",
      },
      {
        label: t("Agent market"),
        value: "market",
      },
    ]
  }, [t])

  const handleClickCreateAction = useCallback(
    (selectedResourceId: string) => {
      if (loading) return
      handleCreateAction(
        selectedResourceId,
        () => onCreateAction?.(actionType, selectedResourceId),
        setLoading,
      )
    },
    [loading, actionType, handleCreateAction, onCreateAction],
  )

  useEffect(() => {
    track(
      ILLA_MIXPANEL_EVENT_TYPE.SHOW,
      ILLA_MIXPANEL_BUILDER_PAGE_NAME.EDITOR,
      {
        element: "agent_list_show",
        parameter1: actionType,
      },
    )
  }, [actionType])

  return (
    <div css={containerStyle}>
      <RadioGroup
        type="button"
        w="287px"
        mg="0 auto"
        options={agentOptions}
        value={agentType}
        forceEqualWidth={true}
        colorScheme="grayBlue"
        onChange={setAgentType}
      />
      <Input w="100%" pd="16px 24px" colorScheme="techPurple" />
      {agentType === "market" ? (
        <FixedSizeList
          height={420}
          width={ACTION_MODAL_WIDTH}
          itemCount={marketData.length}
          itemSize={MARKET_AGENT_ITEM_HEIGHT}
        >
          {({ index, style }) => {
            const item = marketData[index]

            return (
              <MarketListItem
                key={item.aiAgent.aiAgentID}
                item={item}
                onClickCreateAction={handleClickCreateAction}
                style={style}
              />
            )
          }}
        </FixedSizeList>
      ) : (
        <FixedSizeList
          height={420}
          width={ACTION_MODAL_WIDTH}
          itemCount={data.length}
          itemSize={TEAM_AGENT_ITEM_HEIGHT}
        >
          {({ index, style }) => {
            const item = data[index]
            return (
              <AgentListItem
                key={item.aiAgentID}
                item={item}
                onClickCreateAction={handleClickCreateAction}
                style={style}
              />
            )
          }}
        </FixedSizeList>
      )}

      <div css={footerStyle}>
        <Button
          leftIcon={<PreviousIcon />}
          variant="text"
          colorScheme="gray"
          onClick={() => {
            onBack("select")
          }}
        >
          {t("back")}
        </Button>
      </div>
    </div>
  )
}

AiAgentSelector.displayName = "AiAgentSelector"
