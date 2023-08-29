import { getCurrentTeamInfo } from "@illa-public/user-data"
import { FC, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useSearchParams } from "react-router-dom"
import { LoadingIcon } from "@illa-design/react"
import { TeamAgentCard } from "@/page/Dashboard/DashboardAiAgent/TeamAgentCard"
import { TeamContentEmpty } from "@/page/Dashboard/components/TeamContentEmpty"
import { getDashboardTeamAiAgentList } from "@/redux/dashboard/teamAiAgents/dashboardTeamAiAgentSelector"
import { dashboardTeamAiAgentActions } from "@/redux/dashboard/teamAiAgents/dashboardTeamAiAgentSlice"
import { fetchTeamAgentList } from "@/services/agent"
import { cardListStyle, fallbackLoadingStyle } from "./style"

export const TeamAgents: FC = () => {
  const [searchParams] = useSearchParams()

  const keywords = searchParams.get("keywords") ?? ""

  const dispatch = useDispatch()

  const [updateLoading, setUpdateLoading] = useState<boolean>(false)

  useEffect(() => {
    setUpdateLoading(true)
    fetchTeamAgentList(keywords)
      .then((res) => {
        dispatch(
          dashboardTeamAiAgentActions.updateTeamAiAgentListReducer(
            res.data.aiAgentList,
          ),
        )
        return res.data
      })
      .finally(() => setUpdateLoading(false))
  }, [dispatch, keywords])

  const teamAgentList = useSelector(getDashboardTeamAiAgentList)

  const teamInfo = useSelector(getCurrentTeamInfo)!!

  const navigate = useNavigate()

  return updateLoading ? (
    <div css={fallbackLoadingStyle}>
      <LoadingIcon spin={true} />
    </div>
  ) : teamAgentList.length > 0 ? (
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
