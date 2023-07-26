import { FC, Suspense, useCallback, useState } from "react"
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
import {
  containerStyle,
  listTitleContainerStyle,
  teamAvatarStyle,
  teamInfoContainerStyle,
  teamNameStyle,
} from "@/page/Dashboard/DashboardAiAgent/style"
import { DashBoardInviteModal } from "@/page/Dashboard/DashboardApps/AppInviteModal"
import { DashboardApp } from "@/redux/dashboard/apps/dashboardAppState"
import { getCurrentTeamInfo } from "@/redux/team/teamSelector"
import { DashboardErrorElement } from "../components/ErrorElement"
import { DashBoardLoading } from "../components/Loading"

const DashboardAiAgent: FC = () => {
  const { t } = useTranslation()
  const { teamIdentifier } = useParams()
  const navigate = useNavigate()
  const { appList } = useLoaderData() as { appList: DashboardApp[] }

  const teamInfo = useSelector(getCurrentTeamInfo)
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

  return (
    <div css={containerStyle}>
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
            w="320px"
            size="large"
            colorScheme="blackAlpha"
            leftIcon={<PlusIcon size="10px" />}
            onClick={handleCreateAgent}
          >
            {t("Create an Agent")}
          </Button>
        ) : null}
      </div>
      <Suspense fallback={<DashBoardLoading />}>
        <Await resolve={appList} errorElement={<DashboardErrorElement />}>
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
