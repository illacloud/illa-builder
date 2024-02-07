import { UpgradeIcon } from "@illa-public/icon"
import { ShareAppPC } from "@illa-public/invite-modal"
import {
  ILLA_MIXPANEL_BUILDER_PAGE_NAME,
  ILLA_MIXPANEL_EVENT_TYPE,
  MixpanelTrackProvider,
} from "@illa-public/mixpanel-utils"
import { MemberInfo, USER_STATUS } from "@illa-public/public-types"
import { useUpgradeModal } from "@illa-public/upgrade-modal"
import {
  getCurrentTeamInfo,
  getCurrentUser,
  getPlanUtils,
  teamActions,
} from "@illa-public/user-data"
import {
  canManageInvite,
  canUseUpgradeFeature,
  openShareAppModal,
} from "@illa-public/user-role-utils"
import {
  getILLABuilderURL,
  getMarketLinkTemplate,
  isCloudVersion,
} from "@illa-public/utils"
import { getAuthToken } from "@illa-public/utils"
import { FC, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Button, getColor } from "@illa-design/react"
import { ShareAppButtonProps } from "@/page/App/Module/PageNavBar/ShareAppButton/interface"
import { appInfoActions } from "@/redux/currentApp/appInfo/appInfoSlice"
import { copyToClipboard } from "@/utils/copyToClipboard"
import { track, trackInEditor } from "@/utils/mixpanelHelper"

export const ShareAppButton: FC<ShareAppButtonProps> = (props) => {
  const { t } = useTranslation()
  const { appInfo } = props

  const currentUserInfo = useSelector(getCurrentUser)

  const teamInfo = useSelector(getCurrentTeamInfo)!!

  const canUseBillingFeature = canUseUpgradeFeature(
    teamInfo?.myRole,
    getPlanUtils(teamInfo),
    teamInfo?.totalTeamLicense?.teamLicensePurchased,
    teamInfo?.totalTeamLicense?.teamLicenseAllPaid,
  )

  const upgradeModal = useUpgradeModal()
  const [shareModalVisible, setShareModalVisible] = useState(false)

  const dispatch = useDispatch()

  const showInvite = canManageInvite(
    teamInfo.myRole,
    teamInfo?.permission?.allowEditorManageTeamMember,
    teamInfo?.permission?.allowViewerManageTeamMember,
  )

  const handleClick = () => {
    trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
      element: "invite_entry",
    })
    if (
      !openShareAppModal(
        teamInfo,
        teamInfo.myRole,
        appInfo.config.public,
        appInfo.config.publishedToMarketplace,
      )
    ) {
      upgradeModal({ modalType: "upgrade", from: "app_edit_share" })
      return
    }
    setShareModalVisible(true)
  }

  return (
    <>
      <Button
        colorScheme="grayBlue"
        rightIcon={
          isCloudVersion &&
          !canUseBillingFeature && (
            <UpgradeIcon color={getColor("techPurple", "03")} />
          )
        }
        onClick={handleClick}
      >
        {t("share")}
      </Button>
      <MixpanelTrackProvider
        basicTrack={track}
        pageName={ILLA_MIXPANEL_BUILDER_PAGE_NAME.EDITOR}
      >
        {shareModalVisible && (
          <ShareAppPC
            itemID={appInfo.appId}
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
            appDesc={appInfo.config.description}
            appName={appInfo.appName}
            onAppInfoUpdate={(appConfig) => {
              const { publishWithAIAgent } = appConfig
              dispatch(
                appInfoActions.updateAppInfoReducer({
                  ...appInfo,
                  appName: appConfig.appName,
                  config: {
                    ...appInfo.config,
                    description: appConfig.appDesc,
                    publishWithAIAgent,
                  },
                }),
              )
            }}
            isDeployed={appInfo.deployed}
            title={t("user_management.modal.social_media.default_text.app", {
              appName: appInfo.appName,
            })}
            editRedirectURL={`${getILLABuilderURL(window.customDomain)}/${
              teamInfo.identifier
            }/app/${appInfo.appId}`}
            useRedirectURL={`${getILLABuilderURL(window.customDomain)}/${
              teamInfo.identifier
            }/deploy/app/${appInfo.appId}`}
            defaultAllowInviteLink={teamInfo.permission.inviteLinkEnabled}
            onInviteLinkStateChange={(enableInviteLink) => {
              dispatch(
                teamActions.updateTeamMemberPermissionReducer({
                  teamID: teamInfo.id,
                  newPermission: {
                    ...teamInfo.permission,
                    inviteLinkEnabled: enableInviteLink,
                  },
                }),
              )
            }}
            onClose={() => {
              setShareModalVisible(false)
            }}
            canInvite={showInvite}
            defaultBalance={
              isCloudVersion ? teamInfo.currentTeamLicense.balance : Infinity
            }
            teamID={teamInfo.id}
            currentUserRole={teamInfo.myRole}
            onBalanceChange={(balance) => {
              dispatch(
                teamActions.updateTeamMemberSubscribeReducer({
                  teamID: teamInfo.id,
                  subscribeInfo: {
                    ...teamInfo.currentTeamLicense,
                    balance: balance,
                  },
                }),
              )
            }}
            defaultAppPublic={appInfo.config.public}
            defaultAppContribute={appInfo.config.publishedToMarketplace}
            defaultPublishWithAIAgent={appInfo.config.publishWithAIAgent}
            appID={appInfo.appId}
            userRoleForThisApp={teamInfo.myRole}
            ownerTeamID={teamInfo.id}
            ownerTeamIdentify={teamInfo.identifier}
            onAppPublic={(isPublic) => {
              dispatch(appInfoActions.updateAppPublicReducer(isPublic))
            }}
            onAppContribute={(isContributed) => {
              dispatch(appInfoActions.updateAppContributeReducer(isContributed))
              if (isContributed) {
                dispatch(appInfoActions.updateAppDeployedReducer(true))
                const newUrl = new URL(getMarketLinkTemplate(appInfo.appId))
                newUrl.searchParams.set("token", getAuthToken())
                window.open(newUrl, "_blank")
              }
            }}
            onCopyPublicLink={(link) => {
              copyToClipboard(
                t("user_management.modal.custom_copy_text_app_invite", {
                  userName: currentUserInfo.nickname,
                  teamName: teamInfo.name,
                  inviteLink: link,
                }),
              )
            }}
            onCopyContributeLink={(link) => {
              track(
                ILLA_MIXPANEL_EVENT_TYPE.CLICK,
                ILLA_MIXPANEL_BUILDER_PAGE_NAME.EDITOR,
                {
                  element: "invite_modal_public_copy",
                  parameter5: appInfo.appId,
                },
              )
              copyToClipboard(
                t("user_management.modal.contribute.default_text.app", {
                  appName: appInfo.appName,
                  appLink: link,
                }),
              )
            }}
            onCopyEditInviteLink={(link) => {
              copyToClipboard(
                t("user_management.modal.custom_copy_text_app_invite", {
                  userName: currentUserInfo.nickname,
                  teamName: teamInfo.name,
                  inviteLink: link,
                }),
              )
            }}
            onCopyUseInviteLink={(link) => {
              copyToClipboard(
                t("user_management.modal.custom_copy_text_app_invite", {
                  userName: currentUserInfo.nickname,
                  teamName: teamInfo.name,
                  inviteLink: link,
                }),
              )
            }}
            canUseBillingFeature={canUseBillingFeature}
            onShare={(name) => {
              const { publishedToMarketplace } = appInfo.config
              track(
                ILLA_MIXPANEL_EVENT_TYPE.CLICK,
                ILLA_MIXPANEL_BUILDER_PAGE_NAME.EDITOR,
                {
                  element: "share_modal_social_media",
                  parameter1: publishedToMarketplace,
                  parameter4: name,
                  parameter5: appInfo.appId,
                },
              )
            }}
          />
        )}
      </MixpanelTrackProvider>
    </>
  )
}
