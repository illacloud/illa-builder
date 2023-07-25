import { FC, useCallback, useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { Button, Input, PreviousIcon, RadioGroup } from "@illa-design/react"
import {
  ILLA_MIXPANEL_BUILDER_PAGE_NAME,
  ILLA_MIXPANEL_EVENT_TYPE,
} from "@/illa-public-component/MixpanelUtils/interface"
import { AgentListItem } from "@/page/App/components/Actions/ActionGenerator/AiAgentSelector/AgentListItem"
import { MarketListItem } from "@/page/App/components/Actions/ActionGenerator/AiAgentSelector/MarketListItem"
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
    description: "agent1 description",
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
      <div>
        {data.map((item) => {
          if (agentType === "market") {
            return (
              <MarketListItem
                key={item.id}
                item={item}
                onClickCreateAction={handleClickCreateAction}
              />
            )
          }
          return (
            <AgentListItem
              key={item.id}
              item={item}
              onClickCreateAction={handleClickCreateAction}
            />
          )
        })}
      </div>
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
