import { debounce } from "lodash"
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { Button, PreviousIcon, RadioGroup, Search } from "@illa-design/react"
import {
  ILLA_MIXPANEL_BUILDER_PAGE_NAME,
  ILLA_MIXPANEL_EVENT_TYPE,
} from "@/illa-public-component/MixpanelUtils/interface"
import { Agent } from "@/redux/aiAgent/aiAgentState"
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

export const AiAgentSelector: FC<ActionResourceSelectorProps> = (props) => {
  const { actionType, onBack, onCreateAction, handleCreateAction } = props

  const { t } = useTranslation()
  const [agentType, setAgentType] = useState("team")
  const [loading, setLoading] = useState(false)
  const [searchKeywords, setSearchKeywords] = useState("")

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
        </div>
        {agentType === "team" && (
          <TeamAgentList
            onSelect={handleClickCreateAction}
            search={searchKeywords}
          />
        )}
        {agentType === "market" && (
          <MarketAgentList
            onSelect={handleClickCreateAction}
            search={searchKeywords}
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
