import { FC, MouseEvent, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate, useParams } from "react-router-dom"
import { Button, PenIcon, PlayFillIcon, Space, Tag } from "@illa-design/react"
import { TeamAgentCardActionItem } from "@/page/Dashboard/DashboardAiAgent/TeamAgentCard/TeamAgentCardActionItem"
import { Agent } from "@/redux/aiAgent/aiAgentState"
import { appActionButtonStyle, cardStyle } from "./style"
import {
  agentIconStyle,
  descriptionStyle,
  footerStyle,
  headerStyle,
  nameStyle,
  titleInfoStyle,
} from "@/illa-public-market-component/MarketAgentCard/style"

interface TeamAgentCardProps {
  agentInfo: Agent
  canEdit: boolean
}

export const TeamAgentCard: FC<TeamAgentCardProps> = (props) => {
  const { t } = useTranslation()
  const { agentInfo, canEdit } = props
  const { teamIdentifier } = useParams()
  const navigate = useNavigate()

  const toRunAgent = useCallback(() => {
    navigate(`/${teamIdentifier}/ai-agent/${agentInfo.aiAgentID}/run`)
  }, [navigate, teamIdentifier, agentInfo.aiAgentID])

  const toEditAgent = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation()
      navigate(`/${teamIdentifier}/ai-agent/${agentInfo.aiAgentID}`)
    },
    [navigate, teamIdentifier, agentInfo.aiAgentID],
  )

  return (
    <div css={cardStyle} onClick={toRunAgent}>
      <div css={headerStyle}>
        <div css={titleInfoStyle}>
          <img css={agentIconStyle} src={agentInfo.icon} alt="" />
          <span css={nameStyle}>{agentInfo.name}</span>
        </div>
        <TeamAgentCardActionItem
          aiAgentID={agentInfo.aiAgentID}
          aiAgentName={agentInfo.name}
          canEdit={canEdit}
        />
      </div>
      <div>
        <div css={descriptionStyle}>
          {agentInfo.description || t("new_dashboard.desc.no_description")}
        </div>
      </div>

      <div css={footerStyle}>
        <Tag
          hidden={!agentInfo.publishedToMarketplace}
          colorScheme="techPurple"
          size="small"
        >
          {t("Marketplace")}
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
              onClick={toEditAgent}
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
            onClick={toRunAgent}
          >
            {t("run")}
          </Button>
        </Space>
      </div>
    </div>
  )
}

TeamAgentCard.displayName = "TeamAgentCard"
