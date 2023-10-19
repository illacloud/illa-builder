import {
  BottomList,
  MobileCloudDashboardLayout,
} from "@illa-public/cloud-dashboard-layout"
import { InviteMemberMobile } from "@illa-public/invite-modal"
import {
  MemberInfo,
  USER_ROLE,
  USER_STATUS,
  getCurrentTeamInfo,
  getCurrentUserID,
  teamActions,
} from "@illa-public/user-data"
import { canManageInvite, showInviteModal } from "@illa-public/user-role-utils"
import { isCloudVersion } from "@illa-public/utils"
import { FC, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import { DashBoardDynamicMenu } from "@/page/workspace/components/DynamicMenu"
import { copy } from "@/utils/copy"
import { InviteMenuItem } from "../components/InviteMenuItem"

export const MobileDashBoardLayout: FC = () => {
  const currentTeamInfo = useSelector(getCurrentTeamInfo)
  const isLogin = useSelector(getCurrentUserID)
  const currentUserRole = currentTeamInfo?.myRole ?? USER_ROLE.VIEWER
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [inviteModalVisible, setInviteModalVisible] = useState(false)
  const dispatch = useDispatch()

  const handleClickInvite = () => {
    setDrawerVisible(false)
    setInviteModalVisible(true)
  }

  return (
    <MobileCloudDashboardLayout
      setDrawerVisible={setDrawerVisible}
      drawerVisible={drawerVisible}
      bottomComponent={
        <BottomList
          onClickMenuItemCallback={() => {
            setDrawerVisible(false)
          }}
          extBottomComponent={
            showInviteModal(currentTeamInfo) && (
              <InviteMenuItem onClickInvite={handleClickInvite} />
            )
          }
        />
      }
      dynamicMenu={
        <div>
          <DashBoardDynamicMenu
            onClickMenuItemCallback={() => {
              setDrawerVisible(false)
            }}
          />
        </div>
      }
    >
      {isLogin && <Outlet />}
      {inviteModalVisible && (
        <InviteMemberMobile
          redirectURL=""
          onClose={() => setInviteModalVisible(false)}
          canInvite={canManageInvite(
            currentTeamInfo!.myRole,
            currentTeamInfo!.permission.allowEditorManageTeamMember,
            currentTeamInfo!.permission.allowViewerManageTeamMember,
          )}
          currentUserRole={currentUserRole}
          defaultAllowInviteLink={currentTeamInfo!.permission.inviteLinkEnabled}
          defaultInviteUserRole={USER_ROLE.VIEWER}
          defaultBalance={
            isCloudVersion
              ? currentTeamInfo?.currentTeamLicense?.balance ?? 0
              : Infinity
          }
          onCopyInviteLink={copy}
          onInviteLinkStateChange={(isInviteLink) => {
            dispatch(
              teamActions.updateTeamMemberPermissionReducer({
                teamID: currentTeamInfo!.id,
                newPermission: {
                  ...currentTeamInfo!.permission,
                  inviteLinkEnabled: isInviteLink,
                },
              }),
            )
          }}
          teamID={currentTeamInfo!.id}
          onBalanceChange={(balance) => {
            dispatch(
              teamActions.updateTeamMemberSubscribeReducer({
                teamID: currentTeamInfo!.id,
                subscribeInfo: {
                  ...currentTeamInfo!.currentTeamLicense,
                  balance: balance,
                },
              }),
            )
          }}
          onInvitedChange={(userList) => {
            const memberListInfo: MemberInfo[] = userList.map((user) => {
              return {
                ...user,
                userID: "",
                nickname: "",
                avatar: "",
                userStatus: USER_STATUS.PENDING,
                permission: {},
                createdAt: "",
                updatedAt: "",
              }
            })
            dispatch(teamActions.updateInvitedUserReducer(memberListInfo))
          }}
        />
      )}
    </MobileCloudDashboardLayout>
  )
}
