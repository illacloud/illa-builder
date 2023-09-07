import { getCurrentTeamInfo, getPlanUtils } from "@illa-public/user-data"
import {
  ACTION_MANAGE,
  ATTRIBUTE_GROUP,
  canManage,
} from "@illa-public/user-role-utils"
import { FC, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Divider, LoadingIcon } from "@illa-design/react"
import { TeamAgentCard } from "@/page/Dashboard/DashboardAIAgent/TeamAgentCard"
import { TeamContentEmpty } from "@/page/Dashboard/components/TeamContentEmpty"
import { getDashboardTeamAIAgentList } from "@/redux/dashboard/teamAIAgents/dashboardTeamAIAgentSelector"
import { dashboardTeamAIAgentActions } from "@/redux/dashboard/teamAIAgents/dashboardTeamAIAgentSlice"
import { fetchTeamAgent } from "@/services/agent"
import { useFuse } from "@/utils/useFuse"
import { cardListStyle, fallbackLoadingStyle } from "./style"

export const TeamAgents: FC = () => {
  const [searchParams] = useSearchParams()

  const keywords = searchParams.get("keywords") ?? ""

  const dispatch = useDispatch()

  const [updateLoading, setUpdateLoading] = useState<boolean>(true)

  useEffect(() => {
    const controller = new AbortController()
    setUpdateLoading(true)
    fetchTeamAgent(controller.signal)
      .then((res) => {
        dispatch(
          dashboardTeamAIAgentActions.updateTeamAIAgentListReducer(
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

  const agentList = useSelector(getDashboardTeamAIAgentList)

  const fuse = useFuse(agentList, {
    keys: ["name", "description"],
  })

  const teamInfo = useSelector(getCurrentTeamInfo)!!

  const navigate = useNavigate()

  const list =
    keywords === undefined || keywords === ""
      ? agentList
      : fuse.search(keywords).map((item) => item.item)

  const [showLine, setShowLine] = useState<boolean>(false)

  return updateLoading ? (
    <div css={fallbackLoadingStyle}>
      <LoadingIcon spin={true} />
    </div>
  ) : list.length > 0 ? (
    <>
      {showLine && <Divider direction="horizontal" />}
      <div
        css={cardListStyle}
        onScroll={(e) => {
          const target = e.target as HTMLDivElement
          if (target.scrollTop >= 24) {
            setShowLine(true)
          } else {
            setShowLine(false)
          }
        }}
      >
        {list.map((item) => (
          <TeamAgentCard key={item.aiAgentID} agentInfo={item} />
        ))}
      </div>
    </>
  ) : (
    <TeamContentEmpty
      showCreate={canManage(
        teamInfo.myRole,
        ATTRIBUTE_GROUP.AI_AGENT,
        getPlanUtils(teamInfo),
        ACTION_MANAGE.CREATE_AI_AGENT,
      )}
      loading={false}
      navigate={() => {
        navigate(`/${teamInfo.identifier}/ai-agent`)
      }}
    />
  )
}

TeamAgents.displayName = "TeamAgents"
