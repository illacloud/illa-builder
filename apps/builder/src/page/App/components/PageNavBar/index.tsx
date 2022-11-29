import { FC, useCallback, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import { ReactComponent as Logo } from "@/assets/illa-logo.svg"
import { ReactComponent as SnowIcon } from "@/assets/snow-icon.svg"
import {
  BugIcon,
  CaretRightIcon,
  ExitIcon,
  FullScreenIcon,
  LockIcon,
  UnlockIcon,
  WindowBottomIcon,
  WindowLeftIcon,
  WindowRightIcon,
  Trigger,
  Button,
  ButtonGroup,
  Badge,
  globalColor,
  illaPrefix,
  useMessage,
} from "@illa-design/react"
import { PageNavBarProps } from "@/page/App/components/PageNavBar/interface"
import { configActions } from "@/redux/config/configSlice"
import {
  getFreezeState,
  getIllaMode,
  getIsOnline,
  isOpenBottomPanel,
  isOpenDebugger,
  isOpenLeftPanel,
  isOpenRightPanel,
} from "@/redux/config/configSelector"
import { getAppInfo } from "@/redux/currentApp/appInfo/appInfoSelector"
import {
  descriptionStyle,
  informationStyle,
  logoCursorStyle,
  nameStyle,
  navBarStyle,
  rowCenter,
  saveFailedTipStyle,
  viewControlStyle,
  windowIconBodyStyle,
  windowIconStyle,
} from "./style"
import { Api } from "@/api/base"
import { DeployResp } from "@/page/App/components/PageNavBar/resp"
import { fromNow } from "@/utils/dayjs"
import { getExecutionDebuggerData } from "@/redux/currentApp/executionTree/executionSelector"

export const PageNavBar: FC<PageNavBarProps> = (props) => {
  const { className } = props
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const message = useMessage()

  const appInfo = useSelector(getAppInfo)
  const leftPanelVisible = useSelector(isOpenLeftPanel)
  const rightPanelVisible = useSelector(isOpenRightPanel)
  const bottomPanelVisible = useSelector(isOpenBottomPanel)
  const debuggerVisible = useSelector(isOpenDebugger)
  const isFreezeCanvas = useSelector(getFreezeState)
  const isOnline = useSelector(getIsOnline)

  const debuggerData = useSelector(getExecutionDebuggerData)

  const mode = useSelector(getIllaMode)

  const [deployLoading, setDeployLoading] = useState(false)

  const handleClickLeftWindowIcon = useCallback(() => {
    dispatch(configActions.updateLeftPanel(!leftPanelVisible))
  }, [dispatch, leftPanelVisible])
  const handleClickRightWindowIcon = useCallback(() => {
    dispatch(configActions.updateRightPanel(!rightPanelVisible))
  }, [dispatch, rightPanelVisible])
  const handleClickBottomWindowIcon = useCallback(() => {
    dispatch(configActions.updateBottomPanel(!bottomPanelVisible))
  }, [bottomPanelVisible, dispatch])
  const handleClickDebuggerIcon = useCallback(() => {
    dispatch(configActions.updateDebuggerVisible(!debuggerVisible))
  }, [debuggerVisible, dispatch])
  const handleClickFreezeIcon = useCallback(() => {
    dispatch(configActions.updateFreezeStateReducer(!isFreezeCanvas))
  }, [dispatch, isFreezeCanvas])

  const handleClickDeploy = useCallback(() => {
    Api.request<DeployResp>(
      {
        url: `/apps/${appInfo.appId}/deploy`,
        method: "POST",
      },
      (response) => {
        window.open(
          window.location.protocol +
            "//" +
            window.location.host +
            `/deploy/app/${appInfo?.appId}/version/${response.data.version}`,
          "_blank",
        )
      },
      (e) => {
        message.error({
          content: t("editor.deploy.fail"),
        })
      },
      (e) => {
        message.error({
          content: t("editor.deploy.fail"),
        })
      },
      (loading) => {
        setDeployLoading(loading)
      },
    )
  }, [appInfo.appId, t])
  const handleClickExitPreview = useCallback(() => {
    dispatch(configActions.updateIllaMode("edit"))
  }, [dispatch])

  return (
    <div className={className} css={navBarStyle}>
      <div css={rowCenter}>
        <Logo
          width="34px"
          onClick={() => {
            window.location.href = "/"
          }}
          css={logoCursorStyle}
        />
        <div css={informationStyle}>
          <div css={nameStyle}>{appInfo?.appName}</div>
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
        {mode === "edit" && (
          <>
            <span css={windowIconBodyStyle} onClick={handleClickLeftWindowIcon}>
              <WindowLeftIcon _css={windowIconStyle(leftPanelVisible)} />
            </span>
            <span
              css={windowIconBodyStyle}
              onClick={handleClickBottomWindowIcon}
            >
              <WindowBottomIcon _css={windowIconStyle(bottomPanelVisible)} />
            </span>
            <span
              css={windowIconBodyStyle}
              onClick={handleClickRightWindowIcon}
            >
              <WindowRightIcon _css={windowIconStyle(rightPanelVisible)} />
            </span>
          </>
        )}
      </div>
      <div>
        {mode === "edit" && (
          <ButtonGroup spacing={"8px"}>
            <Badge count={debuggerData && Object.keys(debuggerData).length}>
              <Button
                colorScheme="gray"
                size="medium"
                leftIcon={
                  <BugIcon
                    color={globalColor(`--${illaPrefix}-grayBlue-03`)}
                    size="14px"
                  />
                }
                onClick={handleClickDebuggerIcon}
              />
            </Badge>
            <Trigger
              content={isFreezeCanvas ? t("freeze_tips") : t("unfreeze_tips")}
              colorScheme="grayBlue"
              position="bottom"
              showArrow={false}
              autoFitPosition={false}
              trigger="hover"
            >
              <Button
                colorScheme="gray"
                size="medium"
                leftIcon={
                  isFreezeCanvas ? (
                    <LockIcon
                      size="14px"
                      color={globalColor(`--${illaPrefix}-techPurple-01`)}
                    />
                  ) : (
                    <UnlockIcon
                      size="14px"
                      color={globalColor(`--${illaPrefix}-grayBlue-03`)}
                    />
                  )
                }
                onClick={handleClickFreezeIcon}
              />
            </Trigger>
            <Button
              colorScheme="gray"
              leftIcon={<FullScreenIcon />}
              onClick={() => {
                dispatch(configActions.updateIllaMode("preview"))
              }}
            >
              {t("preview")}
            </Button>
            <Button
              loading={deployLoading}
              colorScheme="techPurple"
              size="medium"
              leftIcon={<CaretRightIcon />}
              onClick={handleClickDeploy}
            >
              {t("deploy")}
            </Button>
          </ButtonGroup>
        )}
        {mode === "preview" && (
          <ButtonGroup spacing={"8px"}>
            <Button
              onClick={handleClickExitPreview}
              colorScheme="techPurple"
              leftIcon={<ExitIcon />}
            >
              {t("exit_preview")}
            </Button>
          </ButtonGroup>
        )}
      </div>
    </div>
  )
}

PageNavBar.displayName = "PageNavBar"
