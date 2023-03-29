import { FC, useCallback, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import {
  Badge,
  BugIcon,
  Button,
  ButtonGroup,
  CaretRightIcon,
  ExitIcon,
  FullScreenIcon,
  LockIcon,
  Trigger,
  UnlockIcon,
  getColor,
  useMessage,
} from "@illa-design/react"
import { BuilderApi } from "@/api/base"
import { ReactComponent as Logo } from "@/assets/illa-logo.svg"
import { ReactComponent as SnowIcon } from "@/assets/snow-icon.svg"
import { AppName } from "@/page/App/components/PageNavBar/AppName"
import { AppSizeButtonGroup } from "@/page/App/components/PageNavBar/AppSizeButtonGroup"
import { CollaboratorsList } from "@/page/App/components/PageNavBar/CollaboratorsList"
import { WindowIcons } from "@/page/App/components/PageNavBar/WindowIcons"
import { PageNavBarProps } from "@/page/App/components/PageNavBar/interface"
import { DeployResp } from "@/page/App/components/PageNavBar/resp"
import {
  getFreezeState,
  getIsILLAEditMode,
  getIsOnline,
  isOpenDebugger,
} from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { getAppInfo } from "@/redux/currentApp/appInfo/appInfoSelector"
import { getExecutionDebuggerData } from "@/redux/currentApp/executionTree/executionSelector"
import { fromNow } from "@/utils/dayjs"
import {
  descriptionStyle,
  informationStyle,
  logoCursorStyle,
  navBarStyle,
  rightContentStyle,
  rowCenter,
  saveFailedTipStyle,
  viewControlStyle,
} from "./style"

export const PageNavBar: FC<PageNavBarProps> = (props) => {
  const { className } = props
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const message = useMessage()
  const { teamIdentifier } = useParams()

  const appInfo = useSelector(getAppInfo)
  const debuggerVisible = useSelector(isOpenDebugger)
  const isFreezeCanvas = useSelector(getFreezeState)
  const isOnline = useSelector(getIsOnline)
  const debuggerData = useSelector(getExecutionDebuggerData)
  const isEditMode = useSelector(getIsILLAEditMode)

  const [deployLoading, setDeployLoading] = useState<boolean>(false)

  const previewButtonText = isEditMode
    ? t("preview.button_text")
    : t("exit_preview")

  const handleClickDebuggerIcon = useCallback(() => {
    dispatch(configActions.updateDebuggerVisible(!debuggerVisible))
  }, [debuggerVisible, dispatch])
  const handleClickFreezeIcon = useCallback(() => {
    dispatch(configActions.updateFreezeStateReducer(!isFreezeCanvas))
  }, [dispatch, isFreezeCanvas])

  const handleClickDeploy = useCallback(() => {
    BuilderApi.teamRequest<DeployResp>(
      {
        url: `/apps/${appInfo.appId}/deploy`,
        method: "POST",
      },
      () => {
        window.open(
          window.location.protocol +
            "//" +
            window.location.host +
            `/${teamIdentifier}/deploy/app/${appInfo?.appId}`,
          "_blank",
        )
      },
      () => {
        message.error({
          content: t("editor.deploy.fail"),
        })
      },
      () => {
        message.error({
          content: t("editor.deploy.fail"),
        })
      },
      (loading) => {
        setDeployLoading(loading)
      },
    )
  }, [appInfo.appId, message, t, teamIdentifier])

  const handlePreviewButtonClick = useCallback(() => {
    if (isEditMode) {
      dispatch(configActions.updateIllaMode("preview"))
    } else {
      dispatch(configActions.updateIllaMode("edit"))
    }
  }, [dispatch, isEditMode])

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
    window.location.href = `/${teamIdentifier}/dashboard/apps`
  }, [])

  return (
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
      </div>
      <div css={viewControlStyle}>
        {isEditMode && <WindowIcons />}
        <AppSizeButtonGroup />
      </div>
      <div css={rightContentStyle}>
        <CollaboratorsList />
        {isEditMode ? (
          <div>
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
                content={isFreezeCanvas ? t("freeze_tips") : t("unfreeze_tips")}
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
                {t("deploy")}
              </Button>
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
