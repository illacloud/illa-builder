import { getCurrentTeamInfo } from "@illa-public/user-data"
import { FC, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useSearchParams } from "react-router-dom"
import { LoadingIcon } from "@illa-design/react"
import { TeamAgentCard } from "@/page/Dashboard/DashboardAiAgent/TeamAgentCard"
import { TeamContentEmpty } from "@/page/Dashboard/components/TeamContentEmpty"
import { getDashboardTeamAiAgentList } from "@/redux/dashboard/teamAiAgents/dashboardTeamAiAgentSelector"
import { dashboardTeamAiAgentActions } from "@/redux/dashboard/teamAiAgents/dashboardTeamAiAgentSlice"
import { fetchTeamAgent } from "@/services/agent"
import { useFuse } from "@/utils/useFuse"
import { cardListStyle, fallbackLoadingStyle } from "./style"

export const TeamAgents: FC = () => {
  const [searchParams] = useSearchParams()

  const keywords = searchParams.get("keywords") ?? ""

  const dispatch = useDispatch()

  const [updateLoading, setUpdateLoading] = useState<boolean>(false)

  useEffect(() => {
    const controller = new AbortController()
    setUpdateLoading(true)
    fetchTeamAgent(controller.signal)
      .then((res) => {
        dispatch(
          dashboardTeamAiAgentActions.updateTeamAiAgentListReducer(
            res.data.aiAgentList,
          ),
        )
        setUpdateLoading(false)
        return res.data
      })
      .catch((err) => {
        if (err.message === "canceled") {
          return
        }
        setUpdateLoading(false)
      })
    return () => {
      controller.abort()
    }
  }, [dispatch])

  const agentList = useSelector(getDashboardTeamAiAgentList)

  const fuse = useFuse(agentList, {
    keys: ["name", "description"],
  })

  const teamInfo = useSelector(getCurrentTeamInfo)!!

  const navigate = useNavigate()

  const list =
    keywords === undefined || keywords === ""
      ? agentList
      : fuse.search(keywords).map((item) => item.item)

  return updateLoading ? (
    <div css={fallbackLoadingStyle}>
      <LoadingIcon spin={true} />
    </div>
  ) : list.length > 0 ? (
    <div css={cardListStyle}>
      {list.map((item) => (
        <TeamAgentCard key={item.aiAgentID} agentInfo={item} />
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
