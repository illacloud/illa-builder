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
import { MarketAiAgent } from "@/redux/aiAgent/aiAgentState"

interface MarketAgentCardProps {
  agentInfo: MarketAiAgent
}

export const MarketAgentCard: FC<MarketAgentCardProps> = (props) => {
  const { t } = useTranslation()
  const { agentInfo } = props
  const { teamIdentifier } = useParams()
  const navigate = useNavigate()

  const toRunAgent = useCallback(() => {
    navigate(`/${teamIdentifier}/ai-agent/${agentInfo.aiAgent.aiAgentID}/run`)
  }, [navigate, teamIdentifier, agentInfo.aiAgent.aiAgentID])

  return (
    <div css={cardStyle} onClick={toRunAgent}>
      <div css={headerStyle}>
        <div css={titleInfoStyle}>
          <img css={agentIconStyle} src={agentInfo.aiAgent.icon} alt="" />
          <span css={nameStyle}>{agentInfo.aiAgent.name}</span>
        </div>
      </div>
      <div>
        <div css={descriptionStyle}>
          {agentInfo.aiAgent.description ||
            t("new_dashboard.desc.no_description")}
        </div>
      </div>

      <div css={footerStyle}>
        <div css={teamInfoStyle}>
          <Avatar
            css={teamAvatarStyle}
            avatarUrl={agentInfo.marketplace.contributorTeam.icon}
            name={agentInfo.marketplace.contributorTeam.name}
            id={agentInfo.marketplace.contributorTeam.teamID}
          />
          <span css={teamNameStyle}>
            {agentInfo.marketplace.contributorTeam.name}
          </span>
        </div>
        <div css={actionContainerStyle}>
          <div css={actionCountStyle}>
            <ForkIcon />
            <span>{agentInfo.marketplace.numForks}</span>
          </div>
          <div css={actionCountStyle}>
            <StarOutlineIcon size="16px" />
            {agentInfo.marketplace.numStars}
          </div>
          <div css={actionCountStyle}>
            <PlayOutlineIcon size="16px" />
            {agentInfo.marketplace.numRuns}
          </div>
        </div>
      </div>
    </div>
  )
}

MarketAgentCard.displayName = "MarketAgentCard"
