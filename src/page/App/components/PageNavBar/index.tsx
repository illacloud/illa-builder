import { FC, useCallback, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import { ReactComponent as Logo } from "@assets/illa-logo.svg"
import {
  BugIcon,
  CaretRightIcon,
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
import { ExitIcon } from "@illa-design/icon"
import { DeployResp } from "@/page/App/components/PageNavBar/resp"

dayjs.extend(utc)

export const PageNavBar: FC<PageNavBarProps> = (props) => {
  const { className } = props
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const appInfo = useSelector(getAppInfo)
  const leftPanelVisible = useSelector(isOpenLeftPanel)
  const rightPanelVisible = useSelector(isOpenRightPanel)
  const bottomPanelVisible = useSelector(isOpenBottomPanel)

  const mode = useSelector(getIllaMode)

  const [deployLoading, setDeployLoading] = useState(false)

  const handleClickLeftWindowIcon = useCallback(() => {
    dispatch(configActions.updateLeftPanel(!leftPanelVisible))
  }, [leftPanelVisible])
  const handleClickRightWindowIcon = useCallback(() => {
    dispatch(configActions.updateRightPanel(!rightPanelVisible))
  }, [rightPanelVisible])
  const handleClickBottomWindowIcon = useCallback(() => {
    dispatch(configActions.updateBottomPanel(!bottomPanelVisible))
  }, [bottomPanelVisible])
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
  }, [setDeployLoading, appInfo])
  const handleClickPreview = useCallback(() => {
    dispatch(configActions.updateIllaMode("edit"))
  }, [])

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
        <section css={informationStyle}>
          <div css={nameStyle}>{appInfo?.appName}</div>
          <div css={descriptionStyle}>
            {t("edit_at")}{" "}
            {dayjs.utc(appInfo?.updatedAt).format("YYYY-MM-DD HH:mm:ss")}
          </div>
        </section>
      </div>
      <div css={viewControlStyle}>
        {mode === "edit" && (
          <>
            <span css={windowIconBodyStyle} onClick={handleClickLeftWindowIcon}>
              <WindowLeftIcon _css={windowIconStyle(leftPanelVisible)} />
            </span>
            <span
              css={windowIconBodyStyle}
              onClick={handleClickRightWindowIcon}
            >
              <WindowRightIcon _css={windowIconStyle(rightPanelVisible)} />
            </span>
            <span
              css={windowIconBodyStyle}
              onClick={handleClickBottomWindowIcon}
            >
              <WindowBottomIcon _css={windowIconStyle(bottomPanelVisible)} />
            </span>
          </>
        )}
      </div>
      <div>
        {mode === "edit" && (
          <ButtonGroup spacing={"8px"}>
            <Button
              colorScheme="gray"
              size="medium"
              leftIcon={<BugIcon size="14px" />}
            />
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
