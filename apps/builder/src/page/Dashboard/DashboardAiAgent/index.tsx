import {
  FC,
  Suspense,
  UIEvent,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { Await, useLoaderData, useNavigate, useParams } from "react-router-dom"
import { Button, PlusIcon } from "@illa-design/react"
import { Avatar } from "@/illa-public-component/Avatar"
import { canManage } from "@/illa-public-component/UserRoleUtils"
import {
  ACTION_MANAGE,
  ATTRIBUTE_GROUP,
  USER_ROLE,
} from "@/illa-public-component/UserRoleUtils/interface"
import { AgentContentBody } from "@/page/Dashboard/DashboardAiAgent/contentBody"
import { AiAgentContext } from "@/page/Dashboard/DashboardAiAgent/context"
import {
  containerStyle,
  listTitleContainerStyle,
  teamAvatarStyle,
  teamInfoContainerStyle,
  teamNameStyle,
} from "@/page/Dashboard/DashboardAiAgent/style"
import { DashBoardInviteModal } from "@/page/Dashboard/DashboardApps/AppInviteModal"
import { getHasMoreMarketAgent } from "@/redux/dashboard/marketAiAgents/dashboardMarketAiAgentSelector"
import { getCurrentTeamInfo } from "@/redux/team/teamSelector"
import { DashboardAiAgentLoaderData } from "@/router/loader/dashBoardLoader"
import { DashboardErrorElement } from "../components/ErrorElement"
import { DashBoardLoading } from "../components/Loading"

const DashboardAiAgent: FC = () => {
  const { t } = useTranslation()
  const { teamIdentifier } = useParams()
  const navigate = useNavigate()
  const loaderData = useLoaderData() as DashboardAiAgentLoaderData

  const { agentType, loadMoreMarketAgent } = useContext(AiAgentContext)

  const ref = useRef<HTMLButtonElement>(null)
  const teamInfo = useSelector(getCurrentTeamInfo)
  const hasMoreData = useSelector(getHasMoreMarketAgent)
  const [inviteModalVisible, setInviteModalVisible] = useState(false)

  const currentUserRole = teamInfo?.myRole ?? USER_ROLE.VIEWER

  const canEditApp = canManage(
    currentUserRole,
    ATTRIBUTE_GROUP.APP,
    ACTION_MANAGE.EDIT_APP,
  )

  const handleCreateAgent = useCallback(() => {
    navigate(`/${teamIdentifier}/ai-agent`)
  }, [navigate, teamIdentifier])

  const closeInviteModal = () => {
    setInviteModalVisible(false)
  }

  const handleCardScroll = (event: UIEvent<HTMLDivElement>) => {
    if (agentType === "market") {
      if (!hasMoreData) return
      const target = event.target as HTMLDivElement
      if (target.scrollHeight - target.scrollTop - target.clientHeight <= 100) {
        console.log("scroll to bottom")
        loadMoreMarketAgent()
      }
    }
  }

  useEffect(() => {
    const currentRef = ref.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          document
            .querySelector(".create-agent")
            ?.setAttribute("style", "display: flex")
        } else {
          document.querySelector(".create-agent")?.removeAttribute("style")
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0,
      },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [])

  return (
    <div css={containerStyle} onScroll={handleCardScroll}>
      <div css={listTitleContainerStyle}>
        <div css={teamInfoContainerStyle}>
          <Avatar
            css={teamAvatarStyle}
            avatarUrl={teamInfo?.icon}
            name={teamInfo?.name}
            id={teamInfo?.id}
          />
          <span css={teamNameStyle}>{teamInfo?.name}</span>
        </div>
        {canEditApp ? (
          <Button
            ref={ref}
            w="320px"
            size="large"
            colorScheme="black"
            leftIcon={<PlusIcon size="12px" />}
            onClick={handleCreateAgent}
          >
            {t("create_new")}
          </Button>
        ) : null}
      </div>
      <Suspense fallback={<DashBoardLoading />}>
        <Await
          resolve={
            agentType === "market"
              ? loaderData.marketAgentData
              : loaderData.teamAgentList
          }
          errorElement={<DashboardErrorElement />}
        >
          <AgentContentBody canEdit={canEditApp} />
        </Await>
      </Suspense>
      <DashBoardInviteModal
        hasApp={false}
        visible={inviteModalVisible}
        handleCloseModal={closeInviteModal}
      />
    </div>
  )
}

export default DashboardAiAgent

DashboardAiAgent.displayName = "DashboardAiAgent"
