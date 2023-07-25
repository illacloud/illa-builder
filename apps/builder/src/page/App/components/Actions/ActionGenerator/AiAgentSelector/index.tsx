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
import { track } from "@/utils/mixpanelHelper"
import { ActionResourceSelectorProps } from "./interface"
import { containerStyle, footerStyle } from "./style"

export interface AgentItem {
  id: string
  name: string
  description: string
  cover: string
  teamName: string
  starCount: number
  runCount: number
  forkCount: number
}

const data: AgentItem[] = [
  {
    id: "1",
    name: "agent1",
    description:
      "For high-quality text generation, such as articles, summaries, and translations, use the completion-messages API with user input. Text generation relies on the model parameters and prompt templates set in Dify Prompt Engineering.",
    cover: "https://via.placeholder.com/150",
    teamName: "team1",
    starCount: 4,
    runCount: 100,
    forkCount: 10,
  },
]

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
      <FixedSizeList
        height={420}
        width={ACTION_MODAL_WIDTH}
        itemCount={data.length}
        itemSize={
          agentType === "market"
            ? MARKET_AGENT_ITEM_HEIGHT
            : TEAM_AGENT_ITEM_HEIGHT
        }
      >
        {({ index, style }) => {
          const item = data[index]
          if (agentType === "market") {
            return (
              <MarketListItem
                key={item.id}
                item={item}
                onClickCreateAction={handleClickCreateAction}
                style={style}
              />
            )
          }
          return (
            <AgentListItem
              key={item.id}
              item={item}
              onClickCreateAction={handleClickCreateAction}
              style={style}
            />
          )
        }}
      </FixedSizeList>
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
