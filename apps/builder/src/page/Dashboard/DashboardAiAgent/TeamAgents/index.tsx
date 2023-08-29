import { getCurrentTeamInfo } from "@illa-public/user-data"
import { FC } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { cardListStyle } from "./style"
import { TeamAgentCard } from "@/page/Dashboard/DashboardAiAgent/TeamAgentCard"
import { TeamContentEmpty } from "@/page/Dashboard/components/TeamContentEmpty"
import { getDashboardTeamAiAgentList } from "@/redux/dashboard/teamAiAgents/dashboardTeamAiAgentSelector"


export const TeamAgents: FC = () => {
  const teamAgentList = useSelector(getDashboardTeamAiAgentList)

  const teamInfo = useSelector(getCurrentTeamInfo)!!

  const navigate = useNavigate()

  return teamAgentList.length > 0 ? (
    <div css={cardListStyle}>
      {teamAgentList.map((agent) => (
        <TeamAgentCard key={agent.aiAgentID} agentInfo={agent} />
      ))}
    </div>
  ) : (
    <TeamContentEmpty
      loading={false}
      navigate={() => {
        navigate(`/${teamInfo.identifier}/ai-agent`)
      }}
    />
  )
}

TeamAgents.displayName = "TeamAgents"