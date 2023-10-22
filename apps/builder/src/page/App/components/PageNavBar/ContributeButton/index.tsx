import {
  ContributeAppPC,
  HASHTAG_REQUEST_TYPE,
  ShareAppPC,
} from "@illa-public/invite-modal"
import {
  ILLA_MIXPANEL_BUILDER_PAGE_NAME,
  ILLA_MIXPANEL_EVENT_TYPE,
  MixpanelTrackProvider,
} from "@illa-public/mixpanel-utils"
import { useUpgradeModal } from "@illa-public/upgrade-modal"
import {
  MemberInfo,
  USER_STATUS,
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
  getAuthToken,
  getILLABuilderURL,
  getMarketLinkTemplate,
} from "@illa-public/utils"
import { FC, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Button, ContributeIcon, getColor } from "@illa-design/react"
import { ContributeButtonProps } from "@/page/App/components/PageNavBar/ContributeButton/interface"
import { appInfoActions } from "@/redux/currentApp/appInfo/appInfoSlice"
import { copyToClipboard } from "@/utils/copyToClipboard"
import { track } from "@/utils/mixpanelHelper"

export const ContributeButton: FC<ContributeButtonProps> = (props) => {
  const { appInfo } = props

  const { t } = useTranslation()

  const upgradeModal = useUpgradeModal()

  const currentUserInfo = useSelector(getCurrentUser)

  const teamInfo = useSelector(getCurrentTeamInfo)!!

  const dispatch = useDispatch()

  const [shareModalVisible, setShareModalVisible] = useState(false)

  const [contributedModalVisible, setContributedModalVisible] = useState(false)

  const showInvite = canManageInvite(
    teamInfo.myRole,
    teamInfo?.permission?.allowEditorManageTeamMember,
    teamInfo?.permission?.allowViewerManageTeamMember,
  )

  const canUseBillingFeature = canUseUpgradeFeature(
    teamInfo?.myRole,
    getPlanUtils(teamInfo),
    teamInfo?.totalTeamLicense?.teamLicensePurchased,
    teamInfo?.totalTeamLicense?.teamLicenseAllPaid,
  )

  return (
    <>
      <Button
        colorScheme="grayBlue"
        onClick={() => {
          if (
            !openShareAppModal(
              teamInfo,
              teamInfo.myRole,
              appInfo.config.public,
              appInfo.config.publishedToMarketplace,
            )
          ) {
            upgradeModal({
              modalType: "upgrade",
            })
            return
          }
          appInfo.config.publishedToMarketplace
            ? setShareModalVisible(true)
            : setContributedModalVisible(true)
        }}
        leftIcon={<ContributeIcon c={getColor("grayBlue", "02")} />}
      >
        {t("contribute.first_time_modal.button")}
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
            onAppInfoUpdate={(appName, appDesc) => {
              dispatch(
                appInfoActions.updateAppInfoReducer({
                  ...appInfo,
                  appName,
                  config: {
                    ...appInfo.config,
                    description: appDesc,
                  },
                }),
              )
            }}
            isDeployed={appInfo.deployed}
            title={t("user_management.modal.social_media.default_text.app", {
              appName: appInfo.appName,
            })}
            defaultTab={"public"}
            editRedirectURL={`${getILLABuilderURL()}/${
              teamInfo.identifier
            }/app/${appInfo.appId}`}
            useRedirectURL={`${getILLABuilderURL()}/${
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
            defaultBalance={teamInfo.currentTeamLicense.balance}
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
        {contributedModalVisible && (
          <ContributeAppPC
            productID={appInfo.appId}
            productContributed={appInfo.config.publishedToMarketplace}
            onContributed={(isContributed) => {
              dispatch(appInfoActions.updateAppContributeReducer(isContributed))
              if (isContributed) {
                dispatch(appInfoActions.updateAppDeployedReducer(true))
                const newUrl = new URL(getMarketLinkTemplate(appInfo.appId))
                newUrl.searchParams.set("token", getAuthToken())
                window.open(newUrl, "_blank")
              }
            }}
            productType={HASHTAG_REQUEST_TYPE.UNIT_TYPE_APP}
            appDesc={appInfo.config.description}
            appName={appInfo.appName}
            onAppInfoUpdate={(appName, appDesc) => {
              dispatch(
                appInfoActions.updateAppInfoReducer({
                  ...appInfo,
                  appName,
                  config: {
                    ...appInfo.config,
                    description: appDesc,
                  },
                }),
              )
            }}
            onClose={() => {
              setContributedModalVisible(false)
            }}
            teamID={teamInfo.id}
            onAppPublic={(isPublic) => {
              dispatch(appInfoActions.updateAppPublicReducer(isPublic))
            }}
          />
        )}
      </MixpanelTrackProvider>
    </>
  )
}

ContributeButton.displayName = "ContributeButton"
