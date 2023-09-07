import { UpgradeIcon } from "@illa-public/icon"
import { ILLA_MIXPANEL_EVENT_TYPE } from "@illa-public/mixpanel-utils"
import { useUpgradeModal } from "@illa-public/upgrade-modal"
import { getCurrentTeamInfo, getPlanUtils } from "@illa-public/user-data"
import {
  canUseUpgradeFeature,
  showShareAppModal,
} from "@illa-public/user-role-utils"
import { isCloudVersion } from "@illa-public/utils"
import {
  FC,
  MouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import {
  Badge,
  BugIcon,
  Button,
  ButtonGroup,
  DropList,
  DropListItem,
  Dropdown,
  ExitIcon,
  FullScreenIcon,
  MoreIcon,
  Switch,
  Tag,
  getColor,
  useMessage,
} from "@illa-design/react"
import { ReactComponent as Logo } from "@/assets/illa-logo.svg"
import { ReactComponent as SnowIcon } from "@/assets/snow-icon.svg"
import { AppName } from "@/page/App/components/PageNavBar/AppName"
import { AppSizeButtonGroup } from "@/page/App/components/PageNavBar/AppSizeButtonGroup"
import { CollaboratorsList } from "@/page/App/components/PageNavBar/CollaboratorsList"
import { ContributeButton } from "@/page/App/components/PageNavBar/ContributeButton"
import { DeployButtonGroup } from "@/page/App/components/PageNavBar/DeloyButtonGroup"
import { ShareAppButton } from "@/page/App/components/PageNavBar/ShareAppButton"
import { WindowIcons } from "@/page/App/components/PageNavBar/WindowIcons"
import { PageNavBarProps } from "@/page/App/components/PageNavBar/interface"
import { duplicateApp } from "@/page/Dashboard/DashboardApps/AppCardActionItem/utils"
import {
  getIsILLAEditMode,
  getIsILLAGuideMode,
  getIsOnline,
  isOpenDebugger,
} from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import {
  getAppInfo,
  getCurrentAppWaterMarkConfig,
} from "@/redux/currentApp/appInfo/appInfoSelector"
import { appInfoActions } from "@/redux/currentApp/appInfo/appInfoSlice"
import { getExecutionDebuggerData } from "@/redux/currentApp/executionTree/executionSelector"
import { dashboardAppActions } from "@/redux/dashboard/apps/dashboardAppSlice"
import {
  fetchDeployApp,
  forkCurrentApp,
  updateWaterMarkConfig,
} from "@/services/apps"
import { takeSnapShot } from "@/services/history"
import { fromNow } from "@/utils/dayjs"
import { trackInEditor } from "@/utils/mixpanelHelper"
import { isILLAAPiError } from "@/utils/typeHelper"
import { isMAC } from "@/utils/userAgent"
import {
  badgeStyle,
  buttonGroupStyle,
  descriptionStyle,
  informationStyle,
  keyTextStyle,
  logoCursorStyle,
  navBarStyle,
  rightContentStyle,
  rowCenter,
  saveFailedTipStyle,
  spaceBetweenStyle,
  upgradeStyle,
  viewControlStyle,
} from "./style"

const UpgradeTag: FC = () => {
  const { t } = useTranslation()

  return (
    <Tag colorScheme="techPurple">
      <UpgradeIcon /> {t("billing.homepage.upgrade")}
    </Tag>
  )
}

export const PageNavBar: FC<PageNavBarProps> = (props) => {
  const { className } = props
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const message = useMessage()
  const navigate = useNavigate()

  const { teamIdentifier, appId } = useParams()

  const appInfo = useSelector(getAppInfo)
  const waterMark = useSelector(getCurrentAppWaterMarkConfig)
  const debuggerVisible = useSelector(isOpenDebugger)
  const isOnline = useSelector(getIsOnline)
  const debuggerData = useSelector(getExecutionDebuggerData)
  const debugMessageNumber = debuggerData ? Object.keys(debuggerData).length : 0
  const isEditMode = useSelector(getIsILLAEditMode)
  const isGuideMode = useSelector(getIsILLAGuideMode)
  const teamInfo = useSelector(getCurrentTeamInfo)!!
  const upgradeModal = useUpgradeModal()

  const [deployLoading, setDeployLoading] = useState<boolean>(false)
  const [duplicateLoading, setDuplicateLoading] = useState(false)

  const previewButtonText = isEditMode
    ? t("preview.button_text")
    : t("exit_preview")

  const canUseBillingFeature = canUseUpgradeFeature(
    teamInfo.myRole,
    getPlanUtils(teamInfo),
    teamInfo?.totalTeamLicense?.teamLicensePurchased,
    teamInfo?.totalTeamLicense?.teamLicenseAllPaid,
  )

  const handleClickDebuggerIcon = useCallback(() => {
    trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
      element: "debug",
      parameter2: debugMessageNumber,
    })
    dispatch(configActions.updateDebuggerVisible(!debuggerVisible))
  }, [debugMessageNumber, debuggerVisible, dispatch])

  useEffect(() => {
    trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.SHOW, {
      element: "debug",
      parameter2: debugMessageNumber,
    })
  }, [debugMessageNumber])

  const deployApp = useCallback(
    async (
      appId: string,
      isPublic: boolean,
      onSuccess?: () => void,
      onFailed?: (error: unknown) => void,
    ) => {
      setDeployLoading(true)
      try {
        await fetchDeployApp(appId, isPublic)
        dispatch(appInfoActions.updateAppDeployedReducer(true))
        dispatch(
          dashboardAppActions.updateDashboardAppDeployedReducer({
            appId,
            deployed: true,
          }),
        )
        dispatch(appInfoActions.updateAppPublicReducer(isPublic))
        dispatch(
          dashboardAppActions.updateDashboardAppPublicReducer({
            appId,
            isPublic,
          }),
        )
        window.open(
          `${window.location.origin}/${teamIdentifier}/deploy/app/${appId}`,
          "_blank",
        )
        onSuccess?.()
      } catch (error) {
        message.error({
          content: t("editor.deploy.fail"),
        })
        onFailed?.(error)
      } finally {
        setDeployLoading(false)
      }
    },
    [dispatch, teamIdentifier, message, t],
  )

  const forkGuideAppAndDeploy = useCallback(
    async (appName: string) => {
      setDeployLoading(true)
      const appId = await forkCurrentApp(appName)
      await deployApp(appId, false)
      setDeployLoading(false)
    },
    [deployApp],
  )

  const handleClickDeploy = useCallback(async () => {
    if (isGuideMode) {
      await forkGuideAppAndDeploy(appInfo.appName)
    } else {
      trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
        element: "deploy",
      })
      await deployApp(appInfo.appId, appInfo.config.public)
    }
  }, [
    appInfo.appId,
    appInfo.config.public,
    appInfo.appName,
    isGuideMode,
    deployApp,
    forkGuideAppAndDeploy,
  ])

  const handleClickDeployMenu = useCallback(
    async (key: string | number) => {
      if (key === "public" && !canUseBillingFeature) {
        upgradeModal({
          modalType: "upgrade",
        })
      } else {
        trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.REQUEST, {
          element: "invite_modal_public_switch",
          parameter1: "deploy",
          parameter2: "trigger",
          parameter4: appInfo.config.public ? "on" : "off",
          parameter5: appInfo.appId,
        })
        await deployApp(
          appInfo.appId,
          key === "public",
          () => {
            trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.REQUEST, {
              element: "invite_modal_public_switch",
              parameter1: "deploy",
              parameter2: "suc",
              parameter4: appInfo.config.public ? "on" : "off",
              parameter5: appInfo.appId,
            })
          },
          (error) => {
            trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.REQUEST, {
              element: "invite_modal_public_switch",
              parameter1: "deploy",
              parameter2: "failed",
              parameter3: isILLAAPiError(error)
                ? error?.data?.errorFlag
                : "unknown",
              parameter4: appInfo.config.public ? "on" : "off",
              parameter5: appInfo.appId,
            })
          },
        )
      }
    },
    [
      appInfo.appId,
      appInfo.config.public,
      canUseBillingFeature,
      deployApp,
      upgradeModal,
    ],
  )

  const handlePreviewButtonClick = useCallback(() => {
    if (isEditMode) {
      trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
        element: "preview",
      })
      dispatch(configActions.updateIllaMode("preview"))
    } else {
      trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
        element: "exit_preview",
      })
      dispatch(configActions.updateIllaMode("edit"))
    }
  }, [dispatch, isEditMode])

  const handleDuplicateApp = async () => {
    trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
      element: "app_duplicate",
      parameter5: appId,
    })
    if (duplicateLoading) return
    setDuplicateLoading(true)
    try {
      const response = await duplicateApp(appInfo.appId, appInfo.appName)
      dispatch(
        dashboardAppActions.addDashboardAppReducer({ app: response.data }),
      )
      navigate(`/${teamIdentifier}/app/${response.data.appId}`)
    } catch (error) {
      if (isILLAAPiError(error)) {
        message.error({ content: t("dashboard.app.duplicate_fail") })
      } else {
        message.error({ content: t("network_error") })
      }
    } finally {
      setDuplicateLoading(false)
    }
  }

  const handleOpenHistory = useCallback(() => {
    if (!canUseBillingFeature) {
      upgradeModal({
        modalType: "upgrade",
      })
    } else {
      navigate(`/${teamIdentifier}/appHistory/${appId}`)
    }
  }, [appId, canUseBillingFeature, navigate, teamIdentifier, upgradeModal])

  const handleSaveToHistory = useCallback(async () => {
    if (appId) {
      try {
        await takeSnapShot(appId)
        message.success({ content: t("editor.history.message.suc.save") })
      } catch (error) {
        if (isILLAAPiError(error)) {
          message.error({ content: t("editor.history.message.fail.save") })
        } else {
          message.error({ content: t("network_error") })
        }
      }
    }
  }, [appId, message, t])

  const handleWaterMarkChange = useCallback(
    async (value: boolean, event: MouseEvent) => {
      if (appId) {
        event.stopPropagation()
        const res = await updateWaterMarkConfig(!value, appId)
        dispatch(appInfoActions.updateAppInfoReducer(res.data))
      }
    },
    [appId, dispatch],
  )

  const checkUpgrade = useCallback(() => {
    if (!canUseBillingFeature) {
      upgradeModal({
        modalType: "upgrade",
      })
    }
  }, [canUseBillingFeature, upgradeModal])

  const PreviewButton = useMemo(
    () => (
      <Button
        colorScheme="grayBlue"
        leftIcon={isEditMode ? <FullScreenIcon /> : <ExitIcon />}
        variant="fill"
        bdRadius="8px"
        onClick={handlePreviewButtonClick}
      >
        {previewButtonText}
      </Button>
    ),
    [handlePreviewButtonClick, isEditMode, previewButtonText],
  )

  return (
    <div className={className} css={navBarStyle}>
      <div css={rowCenter}>
        <Logo
          width="34px"
          onClick={() => {
            navigate(`/${teamIdentifier}/dashboard/apps`)
          }}
          css={logoCursorStyle}
        />
        <div css={informationStyle}>
          <AppName appInfo={appInfo} />
          {isOnline ? (
            <div css={descriptionStyle}>
              {t("edit_at") + " " + fromNow(appInfo?.updatedAt)}
            </div>
          ) : (
            <div css={saveFailedTipStyle}>
              <SnowIcon />
              <span> {t("edit_failed")}</span>
            </div>
          )}
        </div>
      </div>
      <div css={viewControlStyle}>
        {isEditMode && <WindowIcons />}
        <AppSizeButtonGroup />
      </div>
      <div css={rightContentStyle}>
        {!isGuideMode && (
          <>
            <CollaboratorsList />
            {showShareAppModal(
              teamInfo,
              teamInfo.myRole,
              appInfo.config.public,
              appInfo.config.publishedToMarketplace,
              appInfo.deployed,
            ) && <ShareAppButton appInfo={appInfo} />}
          </>
        )}
        {isEditMode ? (
          <div css={buttonGroupStyle}>
            {!isGuideMode && (
              <Dropdown
                position="bottom-end"
                trigger="click"
                triggerProps={{ closeDelay: 0, openDelay: 0 }}
                onVisibleChange={(visible) => {
                  if (visible) {
                    trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.SHOW, {
                      element: "app_duplicate",
                      parameter5: appId,
                    })
                  }
                }}
                dropList={
                  <DropList>
                    <DropListItem
                      key="duplicate"
                      value="duplicate"
                      title={t("duplicate")}
                      onClick={handleDuplicateApp}
                    />
                    {isCloudVersion && (
                      <>
                        <DropListItem
                          key="history"
                          value="history"
                          title={
                            <span css={upgradeStyle}>
                              {t("editor.history.history")}
                              {!canUseBillingFeature && <UpgradeTag />}
                            </span>
                          }
                          onClick={handleOpenHistory}
                        />
                        {canUseBillingFeature && (
                          <DropListItem
                            key="saveHistory"
                            value="saveHistory"
                            title={
                              <div css={spaceBetweenStyle}>
                                <span>{t("editor.history.save")}</span>
                                <span css={keyTextStyle}>
                                  {isMAC()
                                    ? t("editor.history.save_keyboard.cmds")
                                    : t("editor.history.save_keyboard.ctrls")}
                                </span>
                              </div>
                            }
                            onClick={handleSaveToHistory}
                          />
                        )}
                        <DropListItem
                          key="configWaterMark"
                          value="configWaterMark"
                          title={
                            <span css={upgradeStyle}>
                              {t("billing.advanced.feature")}
                              {canUseBillingFeature ? (
                                <Switch
                                  checked={!waterMark}
                                  onChange={handleWaterMarkChange}
                                />
                              ) : (
                                <UpgradeTag />
                              )}
                            </span>
                          }
                          onClick={checkUpgrade}
                        />
                      </>
                    )}
                  </DropList>
                }
              >
                <Button
                  mr="8px"
                  colorScheme="white"
                  leftIcon={<MoreIcon size="14px" />}
                />
              </Dropdown>
            )}
            <ButtonGroup css={buttonGroupStyle} spacing="8px">
              <Badge
                css={badgeStyle}
                count={debuggerData && Object.keys(debuggerData).length}
              >
                <Button
                  colorScheme="white"
                  size="medium"
                  leftIcon={
                    <BugIcon color={getColor("grayBlue", "02")} size="14px" />
                  }
                  onClick={handleClickDebuggerIcon}
                />
              </Badge>
              {PreviewButton}
              {!isGuideMode &&
                isCloudVersion &&
                showShareAppModal(
                  teamInfo,
                  teamInfo.myRole,
                  appInfo.config.public,
                  appInfo.config.publishedToMarketplace,
                  appInfo.deployed,
                ) && <ContributeButton appInfo={appInfo} />}
              <DeployButtonGroup
                disPrivate={appInfo.config.publishedToMarketplace}
                loading={deployLoading}
                isPublic={appInfo.config.public}
                isGuideMode={isGuideMode}
                canUseBillingFeature={canUseBillingFeature}
                onClickDeploy={handleClickDeploy}
                onClickDeployMenu={handleClickDeployMenu}
              />
            </ButtonGroup>
          </div>
        ) : (
          <>{PreviewButton}</>
        )}
      </div>
    </div>
  )
}

PageNavBar.displayName = "PageNavBar"
