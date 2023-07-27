import { FC, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate, useParams } from "react-router-dom"
import { PlayOutlineIcon, StarOutlineIcon } from "@illa-design/react"
import { ReactComponent as ForkIcon } from "@/assets/tutorial/fork.svg"
import { Avatar } from "@/illa-public-component/Avatar"
import {
  actionContainerStyle,
  actionCountStyle,
  teamAvatarStyle,
  teamInfoStyle,
  teamNameStyle,
} from "@/page/Dashboard/DashboardAiAgent/MarketAgentCard/style"
import {
  agentIconStyle,
  cardStyle,
  descriptionStyle,
  footerStyle,
  headerStyle,
  nameStyle,
  titleInfoStyle,
} from "@/page/Dashboard/DashboardAiAgent/TeamAgentCard/style"
import { MarketAiAgent } from "@/page/Dashboard/DashboardAiAgent/contentBody"

interface MarketAgentCardProps {
  agentInfo: MarketAiAgent
}

export const MarketAgentCard: FC<MarketAgentCardProps> = (props) => {
  const { t } = useTranslation()
  const { agentInfo } = props
  const { teamIdentifier } = useParams()
  const navigate = useNavigate()

  const toRunAgent = useCallback(() => {
    navigate(`/${teamIdentifier}/ai-agent/${agentInfo.aiAgentID}/run`)
  }, [navigate, teamIdentifier, agentInfo.aiAgentID])

  return (
    <div css={cardStyle} onClick={toRunAgent}>
      <div css={headerStyle}>
        <div css={titleInfoStyle}>
          <img css={agentIconStyle} src={agentInfo.config.icon} alt="" />
          <span css={nameStyle}>{agentInfo.name}</span>
        </div>
      </div>
      <div>
        <div css={descriptionStyle}>
          {agentInfo.config.description ||
            t("new_dashboard.desc.no_description")}
        </div>
      </div>

      <div css={footerStyle}>
        <div css={teamInfoStyle}>
          <Avatar
            css={teamAvatarStyle}
            avatarUrl={agentInfo.teamInfo?.icon}
            name={agentInfo.teamInfo?.name}
            id={agentInfo.teamInfo?.id}
          />
          <span css={teamNameStyle}>{agentInfo.teamInfo?.name}</span>
        </div>
        <div css={actionContainerStyle}>
          <div css={actionCountStyle}>
            <ForkIcon />
            <span>{agentInfo.forkCount}</span>
          </div>
          <div css={actionCountStyle}>
            <StarOutlineIcon size="16px" />
            {agentInfo.starCount}
          </div>
          <div css={actionCountStyle}>
            <PlayOutlineIcon size="16px" />
            {agentInfo.runCount}
          </div>
        </div>
      </div>
    </div>
  )
}

MarketAgentCard.displayName = "MarketAgentCard"
