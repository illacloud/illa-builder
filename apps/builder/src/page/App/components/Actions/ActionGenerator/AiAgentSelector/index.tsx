import { debounce } from "lodash"
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { Button, PreviousIcon, RadioGroup, Search } from "@illa-design/react"
import i18n from "@/i18n/config"
import {
  ILLA_MIXPANEL_BUILDER_PAGE_NAME,
  ILLA_MIXPANEL_EVENT_TYPE,
} from "@/illa-public-component/MixpanelUtils/interface"
import Select from "@/illa-public-market-component/Select"
import { Agent } from "@/redux/aiAgent/aiAgentState"
import { MARKET_AGENT_SORTED_OPTIONS } from "@/services/agent"
import { track } from "@/utils/mixpanelHelper"
import { MarketAgentList } from "./components/MarketList"
import { TeamAgentList } from "./components/TeamAgentList"
import { ActionResourceSelectorProps } from "./interface"
import {
  bodyContainerStyle,
  containerStyle,
  footerStyle,
  headerContainerStyle,
} from "./style"

const sortOptions = [
  {
    label: i18n.t("dashboard.sort-type.popular"),
    value: MARKET_AGENT_SORTED_OPTIONS.POPULAR,
  },
  {
    label: i18n.t("dashboard.sort-type.recent"),
    value: MARKET_AGENT_SORTED_OPTIONS.LATEST,
  },
  {
    label: i18n.t("dashboard.sort-type.star"),
    value: MARKET_AGENT_SORTED_OPTIONS.STARRED,
  },
]

export const AiAgentSelector: FC<ActionResourceSelectorProps> = (props) => {
  const { actionType, onBack, onCreateAction, handleCreateAction } = props

  const { t } = useTranslation()
  const [agentType, setAgentType] = useState("team")
  const [loading, setLoading] = useState(false)
  const [searchKeywords, setSearchKeywords] = useState("")
  const [sortedBy, setSortedBy] = useState<MARKET_AGENT_SORTED_OPTIONS>(
    MARKET_AGENT_SORTED_OPTIONS.POPULAR,
  )

  const debounceSearchKeywords = useRef(
    debounce(
      (v: string) => {
        setSearchKeywords(v)
      },
      1000,
      { leading: false },
    ),
  )

  const agentOptions = useMemo(() => {
    return [
      {
        label: t("dashboard.list-type.team"),
        value: "team",
      },
      {
        label: t("dashboard.list-type.marketplace"),
        value: "market",
      },
    ]
  }, [t])

  const handleClickCreateAction = useCallback(
    (agentItem: Agent) => {
      if (loading) return
      handleCreateAction(agentItem, () => onCreateAction?.(), setLoading)
    },
    [loading, handleCreateAction, onCreateAction],
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
      <div css={bodyContainerStyle}>
        <Search
          w="100%"
          pd="0px 24px"
          colorScheme="techPurple"
          onChange={debounceSearchKeywords.current}
          placeholder={t("dashboard.search")}
          allowClear
        />
        <div css={headerContainerStyle}>
          <RadioGroup
            type="button"
            w="287px"
            options={agentOptions}
            value={agentType}
            forceEqualWidth={true}
            colorScheme="grayBlue"
            onChange={setAgentType}
          />
          {agentType === "market" && (
            <Select
              value={sortedBy}
              options={sortOptions}
              triggerPosition="bottom"
              onChange={(value) => {
                setSortedBy(value as MARKET_AGENT_SORTED_OPTIONS)
              }}
            />
          )}
        </div>
        {agentType === "team" && (
          <TeamAgentList
            onSelect={handleClickCreateAction}
            search={searchKeywords}
            key={searchKeywords}
          />
        )}
        {agentType === "market" && (
          <MarketAgentList
            onSelect={handleClickCreateAction}
            search={searchKeywords}
            key={`${searchKeywords}-${sortedBy}`}
            sortBy={sortedBy}
          />
        )}
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
