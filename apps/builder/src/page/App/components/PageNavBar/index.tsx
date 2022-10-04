import { FC, useCallback, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import { ReactComponent as Logo } from "@/assets/illa-logo.svg"
import {
  BugIcon,
  CaretRightIcon,
  ExitIcon,
  WindowBottomIcon,
  WindowLeftIcon,
  WindowRightIcon,
} from "@illa-design/icon"
import { Button, ButtonGroup } from "@illa-design/button"
import { PageNavBarProps } from "@/page/App/components/PageNavBar/interface"
import { configActions } from "@/redux/config/configSlice"
import {
  getIllaMode,
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
  viewControlStyle,
  windowIconBodyStyle,
  windowIconStyle,
} from "./style"
import { Api } from "@/api/base"
import { Message } from "@illa-design/message"
import { Badge } from "@illa-design/badge"
import { DeployResp } from "@/page/App/components/PageNavBar/resp"
import { fromNow } from "@/utils/dayjs"
import { globalColor, illaPrefix } from "@illa-design/theme"
import { getExecutionDebuggerData } from "@/redux/currentApp/executionTree/executionSelector"

export const PageNavBar: FC<PageNavBarProps> = (props) => {
  const { className } = props
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const appInfo = useSelector(getAppInfo)
  const leftPanelVisible = useSelector(isOpenLeftPanel)
  const rightPanelVisible = useSelector(isOpenRightPanel)
  const bottomPanelVisible = useSelector(isOpenBottomPanel)
  const debuggerVisible = useSelector(isOpenDebugger)

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
        Message.error(t("editor.deploy.fail"))
      },
      (e) => {
        Message.error(t("editor.deploy.fail"))
      },
      (loading) => {
        setDeployLoading(loading)
      },
    )
  }, [appInfo.appId, t])
  const handleClickPreview = useCallback(() => {
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
          <div css={descriptionStyle}>
            {t("edit_at") + " " + fromNow(appInfo?.updatedAt)}
          </div>
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
              onClick={handleClickPreview}
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
