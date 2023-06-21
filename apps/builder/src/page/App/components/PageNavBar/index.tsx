import {
  FC,
  MouseEvent,
  useCallback,
  useContext,
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
  CaretRightIcon,
  DropList,
  DropListItem,
  Dropdown,
  ExitIcon,
  FullScreenIcon,
  List,
  ListItem,
  ListItemMeta,
  LockIcon,
  MoreIcon,
  Switch,
  Tag,
  TextArea,
  Trigger,
  UnlockIcon,
  getColor,
  useMessage,
} from "@illa-design/react"
import { Connection, getTextMessagePayload } from "@/api/ws"
import { Signal, Target } from "@/api/ws/ILLA_PROTO"
import { ReactComponent as Logo } from "@/assets/illa-logo.svg"
import { ReactComponent as SnowIcon } from "@/assets/snow-icon.svg"
import { UpgradeIcon } from "@/illa-public-component/Icon/upgrade"
import { ILLA_MIXPANEL_EVENT_TYPE } from "@/illa-public-component/MixpanelUtils/interface"
import { UpgradeCloudContext } from "@/illa-public-component/UpgradeCloudProvider"
import { canUseUpgradeFeature } from "@/illa-public-component/UserRoleUtils"
import { ForkAndDeployModal } from "@/page/App/components/ForkAndDeployModal"
import { AppName } from "@/page/App/components/PageNavBar/AppName"
import { AppSizeButtonGroup } from "@/page/App/components/PageNavBar/AppSizeButtonGroup"
import { CollaboratorsList } from "@/page/App/components/PageNavBar/CollaboratorsList"
import { WindowIcons } from "@/page/App/components/PageNavBar/WindowIcons"
import { PageNavBarProps } from "@/page/App/components/PageNavBar/interface"
import { DuplicateModal } from "@/page/Dashboard/components/DuplicateModal"
import {
  getFreezeState,
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
import { getExecutionDebuggerData } from "@/redux/currentApp/executionTree/executionSelector"
import { dashboardAppActions } from "@/redux/dashboard/apps/dashboardAppSlice"
import { getCurrentTeamInfo } from "@/redux/team/teamSelector"
import {
  fetchDeployApp,
  forkCurrentApp,
  updateWaterMarkConfig,
} from "@/services/apps"
import { fromNow } from "@/utils/dayjs"
import { trackInEditor } from "@/utils/mixpanelHelper"
import { isCloudVersion } from "@/utils/typeHelper"
import {
  descriptionStyle,
  floatingMessageModalStyle,
  informationStyle,
  logoCursorStyle,
  navBarStyle,
  rightContentStyle,
  rowCenter,
  saveFailedTipStyle,
  upgradeStyle,
  viewControlStyle,
} from "./style"

export const PageNavBar: FC<PageNavBarProps> = (props) => {
  const { className } = props
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const message = useMessage()
  const navigate = useNavigate()

  const { teamIdentifier, appId } = useParams()

  const teamInfo = useSelector(getCurrentTeamInfo)!!

  const appInfo = useSelector(getAppInfo)
  const waterMark = useSelector(getCurrentAppWaterMarkConfig)
  const debuggerVisible = useSelector(isOpenDebugger)
  const isFreezeCanvas = useSelector(getFreezeState)
  const isOnline = useSelector(getIsOnline)
  const debuggerData = useSelector(getExecutionDebuggerData)
  const debugMessageNumber = debuggerData ? Object.keys(debuggerData).length : 0
  const isEditMode = useSelector(getIsILLAEditMode)
  const isGuideMode = useSelector(getIsILLAGuideMode)

  const { handleUpgradeModalVisible } = useContext(UpgradeCloudContext)

  const [duplicateVisible, setDuplicateVisible] = useState(false)
  const [forkModalVisible, setForkModalVisible] = useState(false)
  const [deployLoading, setDeployLoading] = useState<boolean>(false)

  const [messageList, setMessageList] = useState<string[]>([])
  const [showMessage, setShowMessage] = useState(false)
  const [textAreaValue, setTextAreaValue] = useState("")

  const previewButtonText = isEditMode
    ? t("preview.button_text")
    : t("exit_preview")

  const canUseBillingFeature = canUseUpgradeFeature(
    teamInfo?.myRole,
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
  const handleClickFreezeIcon = useCallback(() => {
    trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
      element: "lock_icon",
      parameter2: !isFreezeCanvas ? "lock" : "unlock",
    })
    dispatch(configActions.updateFreezeStateReducer(!isFreezeCanvas))
  }, [dispatch, isFreezeCanvas])

  useEffect(() => {
    trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.SHOW, {
      element: "debug",
      parameter2: debugMessageNumber,
    })
  }, [debugMessageNumber])

  const deployApp = useCallback(
    (appId: string) => {
      setDeployLoading(true)
      fetchDeployApp(appId)
        .then(
          () => {
            window.open(
              window.location.protocol +
                "//" +
                window.location.host +
                `/${teamIdentifier}/deploy/app/${appId}`,
              "_blank",
            )
          },
          () => {
            message.error({
              content: t("editor.deploy.fail"),
            })
          },
        )
        .finally(() => {
          setDeployLoading(false)
        })
    },
    [teamIdentifier, message, t],
  )

  const forkGuideAppAndDeploy = useCallback(
    async (appName: string) => {
      if (appName === undefined || appName === "" || appName?.trim() === "") {
        message.error({
          content: t("dashboard.app.name_empty"),
        })
        return
      }
      setDeployLoading(true)
      const appId = await forkCurrentApp(appName)
      setForkModalVisible(false)
      deployApp(appId)
    },
    [deployApp, message, t],
  )

  const handleClickDeploy = useCallback(() => {
    if (isGuideMode) {
      setForkModalVisible(true)
    } else {
      trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
        element: "deploy",
      })
      deployApp(appInfo.appId)
    }
  }, [appInfo.appId, isGuideMode, deployApp])

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

  const handleWaterMarkChange = useCallback(
    async (value: boolean, event: MouseEvent) => {
      if (appId) {
        event.stopPropagation()
        await updateWaterMarkConfig(value, appId)
        dispatch(
          dashboardAppActions.modifyConfigDashboardAppReducer({
            appId,
            config: { waterMark: value },
          }),
        )
      }
    },
    [appId, dispatch],
  )

  const handleUpgradeModal = useCallback(() => {
    if (!canUseBillingFeature) {
      handleUpgradeModalVisible(true, "upgrade")
    }
  }, [canUseBillingFeature, handleUpgradeModalVisible])

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

  const handleLogoClick = useCallback(() => {
    navigate(`/${teamIdentifier}/dashboard/apps`)
  }, [navigate, teamIdentifier])

  const sendMessage = useCallback(() => {
    setMessageList([textAreaValue, ...messageList])
    setTextAreaValue("")
    Connection.getTextRoom("app", appInfo.appId)?.send(
      getTextMessagePayload(
        Signal.SUPER_POWER,
        Target.NOTHING,
        false,
        null,
        teamInfo.id,
        teamInfo.uid,
        [textAreaValue],
      ),
    )
  }, [messageList, textAreaValue, teamInfo.id, teamInfo.uid, appInfo.appId])

  useEffect(() => {
    duplicateVisible &&
      trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.SHOW, {
        element: "duplicate_modal",
        parameter5: appId,
      })
  }, [appId, duplicateVisible])

  return (
    <>
      <div className={className} css={navBarStyle}>
        <div css={rowCenter}>
          <Logo width="34px" onClick={handleLogoClick} css={logoCursorStyle} />
          <div css={informationStyle}>
            <AppName appName={appInfo.appName} />
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
          <Button
            ml="16px"
            onClick={() => {
              setShowMessage(!showMessage)
            }}
          >
            chat generate( Demo )
          </Button>
        </div>
        <div css={viewControlStyle}>
          {isEditMode && <WindowIcons />}
          <AppSizeButtonGroup />
        </div>
        <div css={rightContentStyle}>
          {!isGuideMode && <CollaboratorsList />}
          {isEditMode ? (
            <div>
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
                        onClick={() => {
                          setDuplicateVisible(true)
                          trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
                            element: "app_duplicate",
                            parameter5: appId,
                          })
                        }}
                      />
                      {isCloudVersion && (
                        <DropListItem
                          key="configWaterMark"
                          value="configWaterMark"
                          title={
                            <span css={upgradeStyle}>
                              {t("billing.advanced.feature")}
                              {canUseBillingFeature ? (
                                <Switch
                                  checked={waterMark}
                                  onChange={handleWaterMarkChange}
                                />
                              ) : (
                                <Tag colorScheme="techPurple">
                                  <UpgradeIcon />{" "}
                                  {t("billing.homepage.upgrade")}
                                </Tag>
                              )}
                            </span>
                          }
                          onClick={handleUpgradeModal}
                        />
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
              <ButtonGroup spacing="8px">
                <Badge count={debuggerData && Object.keys(debuggerData).length}>
                  <Button
                    colorScheme="white"
                    size="medium"
                    leftIcon={
                      <BugIcon color={getColor("grayBlue", "02")} size="14px" />
                    }
                    onClick={handleClickDebuggerIcon}
                  />
                </Badge>
                <Trigger
                  content={
                    isFreezeCanvas ? t("freeze_tips") : t("unfreeze_tips")
                  }
                  colorScheme="grayBlue"
                  position="bottom"
                  showArrow={false}
                  autoFitPosition={false}
                  trigger="hover"
                >
                  <Button
                    colorScheme="white"
                    size="medium"
                    leftIcon={
                      isFreezeCanvas ? (
                        <LockIcon
                          size="14px"
                          color={getColor("grayBlue", "02")}
                        />
                      ) : (
                        <UnlockIcon
                          size="14px"
                          color={getColor("grayBlue", "02")}
                        />
                      )
                    }
                    onClick={handleClickFreezeIcon}
                  />
                </Trigger>
                {PreviewButton}
                <Button
                  loading={deployLoading}
                  colorScheme="techPurple"
                  size="medium"
                  leftIcon={<CaretRightIcon />}
                  onClick={handleClickDeploy}
                >
                  {isGuideMode
                    ? t("editor.tutorial.panel.tutorial.modal.fork")
                    : t("deploy")}
                </Button>
              </ButtonGroup>
            </div>
          ) : (
            <>{PreviewButton}</>
          )}
        </div>
        <ForkAndDeployModal
          visible={forkModalVisible}
          okLoading={deployLoading}
          onOk={forkGuideAppAndDeploy}
          onVisibleChange={setForkModalVisible}
        />
        {appId ? (
          <DuplicateModal
            appId={appId}
            visible={duplicateVisible}
            onVisibleChange={(visible) => {
              setDuplicateVisible(visible)
            }}
          />
        ) : null}
      </div>
      {showMessage && (
        <div css={floatingMessageModalStyle}>
          <TextArea
            onPressEnter={() => {
              sendMessage()
            }}
            h="100px"
            autoSize={false}
            bdRadius="8px 8px"
            value={textAreaValue}
            onChange={(v) => {
              setTextAreaValue(v)
            }}
          />
          <Button
            bdRadius="0"
            onClick={() => {
              sendMessage()
            }}
          >
            Send
          </Button>
          {messageList && messageList.length > 0 && (
            <List
              data={messageList}
              render={(data) => {
                return (
                  <ListItem>
                    <ListItemMeta title={data} />
                  </ListItem>
                )
              }}
              renderKey={(data, index) => {
                return index.toString()
              }}
            />
          )}
        </div>
      )}
    </>
  )
}

PageNavBar.displayName = "PageNavBar"
