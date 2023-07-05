import { FC, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { useMessage } from "@illa-design/react"
import { ERROR_FLAG } from "@/api/errorFlag"
import {
  InviteModal,
  InviteModalProps,
} from "@/illa-public-component/MemberList/components/Header/InviteModal"
import { MemberListContext } from "@/illa-public-component/MemberList/context/MemberListContext"
import {
  REDIRECT_PAGE_TYPE,
  SubscribeInfo,
  TotalTeamLicense,
} from "@/illa-public-component/MemberList/interface"
import { USER_ROLE } from "@/illa-public-component/UserRoleUtils/interface"
import { getCurrentUser } from "@/redux/currentUser/currentUserSelector"
import { dashboardAppActions } from "@/redux/dashboard/apps/dashboardAppSlice"
import { DashboardApp } from "@/redux/dashboard/apps/dashboardAppState"
import {
  getCurrentMemberList,
  getCurrentTeamInfo,
} from "@/redux/team/teamSelector"
import {
  fetchShareAppLink,
  renewShareAppLink,
  shareAppByEmail,
  updateAppPublicConfig,
} from "@/services/apps"
import {
  changeTeamMembersRole,
  setInviteLinkEnabled,
  updateMembers,
  updateTeamsInfo,
} from "@/services/team"
import { isCloudVersion, isILLAAPiError } from "@/utils/typeHelper"

export interface AppInviteModalProps
  extends Pick<
    InviteModalProps,
    "visible" | "handleCloseModal" | "inviteToUseAppStatus"
  > {
  appInfo: DashboardApp
}

export const AppInviteModal: FC<AppInviteModalProps> = (props) => {
  const message = useMessage()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { teamIdentifier } = useParams()
  const { appInfo, visible, handleCloseModal, ...rest } = props

  const teamInfo = useSelector(getCurrentTeamInfo)
  const currentUserInfo = useSelector(getCurrentUser)
  const members = useSelector(getCurrentMemberList) ?? []

  const appLink = useMemo(
    () =>
      `${window.location.origin}/${teamIdentifier}/deploy/app/${appInfo.appId}`,
    [teamIdentifier, appInfo.appId],
  )

  const handleChangeTeamMembersRole = (
    teamMemberID: string,
    userRole: USER_ROLE,
  ) => {
    return changeTeamMembersRole(teamMemberID, userRole)
      .then((res) => {
        if (userRole === USER_ROLE.OWNER) {
          message.success({
            content: t("user_management.mes.transfer_suc"),
          })
          updateTeamsInfo(teamIdentifier)
        } else {
          message.success({
            content: t("user_management.mes.change_role_suc"),
          })
        }
        updateMembers()
        return res
      })
      .catch((error) => {
        if (isILLAAPiError(error)) {
          switch (error.data.errorFlag) {
            case ERROR_FLAG.ERROR_FLAG_ACCESS_DENIED:
            case ERROR_FLAG.ERROR_FLAG_CAN_NOT_INCREASE_TEAM_MEMBER_DUE_TO_NO_BALANCE:
              message.error({
                content: t("user_management.mes.change_role_fail"),
              })
              break
            case ERROR_FLAG.ERROR_FLAG_CAN_NOT_UPDATE_TEAM_MEMBER_ROLE_BECAUSE_APPSUMO_BUYER:
              message.error({
                content: t("billing.message.appsumo.transfer"),
              })
              break
            default:
              if (userRole === USER_ROLE.OWNER) {
                message.error({
                  content: t("user_management.mes.transfer_fail"),
                })
              } else {
                message.error({
                  content: t("user_management.mes.change_role_fail"),
                })
              }
              break
          }
        }
        return false
      })
  }

  const fetchShareLink = (
    userRole: USER_ROLE,
    redirectPage?: REDIRECT_PAGE_TYPE,
  ) => {
    return fetchShareAppLink(userRole, appInfo.appId, redirectPage)
  }
  const renewShareLink = (
    userRole: USER_ROLE,
    redirectPage?: REDIRECT_PAGE_TYPE,
  ) => {
    return renewShareAppLink(userRole, appInfo.appId, redirectPage)
  }

  const handleInviteByEmail = (
    email: string,
    userRole: USER_ROLE,
    redirectPage?: REDIRECT_PAGE_TYPE,
  ) => {
    return shareAppByEmail(email, userRole, appInfo.appId, redirectPage).then(
      (res) => {
        updateMembers()
        return res
      },
    )
  }

  const updateAppConfig = async (isPublic: boolean) => {
    const res = await updateAppPublicConfig(isPublic, appInfo.appId)
    dispatch(
      dashboardAppActions.modifyConfigDashboardAppReducer({
        appId: appInfo.appId,
        config: { public: isPublic },
      }),
    )
    return res
  }

  return (
    <MemberListContext.Provider
      value={{
        isCloudVersion,
        currentTeamLicense:
          teamInfo?.currentTeamLicense ?? ({} as SubscribeInfo),
        totalTeamLicense:
          teamInfo?.totalTeamLicense ?? ({} as TotalTeamLicense),
      }}
    >
      <InviteModal
        hasApp
        teamName={isCloudVersion ? teamInfo?.name : "ILLA"}
        userNickname={currentUserInfo.nickname}
        isCloudVersion={isCloudVersion}
        appLink={appLink}
        isAppPublic={appInfo?.config?.public}
        inviteToUseAppStatus={appInfo?.deployed ? "deployed" : "unDeployed"}
        appID={appInfo.appId}
        fetchInviteLink={fetchShareLink}
        renewInviteLink={renewShareLink}
        configInviteLink={setInviteLinkEnabled}
        allowInviteByLink={teamInfo?.permission.inviteLinkEnabled ?? false}
        allowEditorManageTeamMember={
          teamInfo?.permission.allowEditorManageTeamMember ?? false
        }
        allowViewerManageTeamMember={
          teamInfo?.permission.allowViewerManageTeamMember ?? false
        }
        userListData={members}
        currentUserRole={teamInfo?.myRole ?? USER_ROLE.VIEWER}
        inviteByEmail={handleInviteByEmail}
        changeTeamMembersRole={handleChangeTeamMembersRole}
        updateAppPublicConfig={updateAppConfig}
        visible={visible}
        handleCloseModal={handleCloseModal}
        {...rest}
      />
    </MemberListContext.Provider>
  )
}
