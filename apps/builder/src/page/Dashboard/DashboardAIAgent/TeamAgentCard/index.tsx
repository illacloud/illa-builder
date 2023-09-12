import { Agent, getLLM } from "@illa-public/market-agent"
import {
  ILLA_MIXPANEL_BUILDER_PAGE_NAME,
  ILLA_MIXPANEL_EVENT_TYPE,
} from "@illa-public/mixpanel-utils"
import { getCurrentTeamInfo, getPlanUtils } from "@illa-public/user-data"
import {
  ACTION_MANAGE,
  ATTRIBUTE_GROUP,
  canManage,
} from "@illa-public/user-role-utils"
import { FC, MouseEvent } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Button, PenIcon, PlayFillIcon, Space, Tag } from "@illa-design/react"
import { TeamAgentCardActionItem } from "@/page/Dashboard/DashboardAIAgent/TeamAgentCardActionItem"
import { track } from "@/utils/mixpanelHelper"
import { TeamAgentCardProps } from "./interface"
import {
  agentIconStyle,
  appActionButtonStyle,
  applyHiddenStyle,
  cardStyle,
  descriptionStyle,
  footerStyle,
  headerStyle,
  modelContainerStyle,
  modelLogoStyle,
  modelNameStyle,
  nameStyle,
  titleInfoStyle,
} from "./style"

export const TeamAgentCard: FC<TeamAgentCardProps> = (props) => {
  const { t } = useTranslation()
  const { agentInfo } = props
  const navigate = useNavigate()

  const teamInfo = useSelector(getCurrentTeamInfo)!!

  const canEdit = canManage(
    teamInfo.myRole,
    ATTRIBUTE_GROUP.AI_AGENT,
    getPlanUtils(teamInfo),
    ACTION_MANAGE.CREATE_AI_AGENT,
  )

  const handleClickCard = (agentInfo: Agent) => {
    track(
      ILLA_MIXPANEL_EVENT_TYPE.CLICK,
      ILLA_MIXPANEL_BUILDER_PAGE_NAME.AI_AGENT_DASHBOARD,
      {
        element: "card",
        parameter3: "team",
        parameter5: agentInfo.aiAgentID,
      },
    )
    navigate(
      `/${teamInfo.identifier}/ai-agent/${agentInfo.aiAgentID}/run?myTeamIdentifier=${teamInfo.identifier}`,
    )
  }

  const handleClickEdit = (e: MouseEvent<HTMLButtonElement>) => {
    track(
      ILLA_MIXPANEL_EVENT_TYPE.CLICK,
      ILLA_MIXPANEL_BUILDER_PAGE_NAME.AI_AGENT_DASHBOARD,
      {
        element: "card_edit",
        parameter5: agentInfo.aiAgentID,
      },
    )
    e.stopPropagation()
    navigate(`/${teamInfo.identifier}/ai-agent/${agentInfo.aiAgentID}`)
  }

  const handleClickRun = (e: MouseEvent<HTMLButtonElement>) => {
    track(
      ILLA_MIXPANEL_EVENT_TYPE.CLICK,
      ILLA_MIXPANEL_BUILDER_PAGE_NAME.AI_AGENT_DASHBOARD,
      {
        element: "card_run",
        parameter5: agentInfo.aiAgentID,
      },
    )
    e.stopPropagation()
    navigate(
      `/${teamInfo.identifier}/ai-agent/${agentInfo.aiAgentID}/run?myTeamIdentifier=${teamInfo.identifier}`,
    )
  }

  return (
    <div css={cardStyle} onClick={() => handleClickCard(agentInfo)}>
      <div css={headerStyle}>
        <img css={agentIconStyle} src={agentInfo.icon} alt={agentInfo.name} />
        <div css={titleInfoStyle}>
          <span css={nameStyle}>{agentInfo.name}</span>
          <div css={modelContainerStyle}>
            <div css={modelLogoStyle}>{getLLM(agentInfo.model)?.logo}</div>
            <div css={modelNameStyle}>{getLLM(agentInfo.model)?.name}</div>
          </div>
        </div>
        <TeamAgentCardActionItem
          aiAgentID={agentInfo.aiAgentID}
          aiAgentName={agentInfo.name}
          publishedToMarketplace={agentInfo.publishedToMarketplace}
        />
      </div>
      <div>
        <div css={descriptionStyle}>
          {agentInfo.description || t("new_dashboard.desc.no_description")}
        </div>
      </div>

      <div css={footerStyle}>
        <Tag
          css={applyHiddenStyle(!agentInfo.publishedToMarketplace)}
          colorScheme="techPurple"
          size="small"
        >
          {t("dashboard.common.marketplace")}
        </Tag>
        <Space
          direction="horizontal"
          w="100%"
          justifyContent="end"
          size="8px"
          alignItems="center"
        >
          {canEdit ? (
            <Button
              css={appActionButtonStyle}
              className="dashboardAgentEditButton"
              variant="text"
              colorScheme="grayBlue"
              leftIcon={<PenIcon size="16px" />}
              onClick={handleClickEdit}
            >
              {t("edit")}
            </Button>
          ) : null}
          <Button
            css={appActionButtonStyle}
            className="dashboardAgentRunButton"
            variant="text"
            colorScheme="grayBlue"
            leftIcon={<PlayFillIcon />}
            onClick={handleClickRun}
          >
            {t("dashboard.common.run")}
          </Button>
        </Space>
      </div>
    </div>
  )
}

TeamAgentCard.displayName = "TeamAgentCard"
