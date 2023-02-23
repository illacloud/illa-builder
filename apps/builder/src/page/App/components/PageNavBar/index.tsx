import { FC, useCallback, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import {
  Badge,
  BugIcon,
  Button,
  ButtonGroup,
  CaretRightIcon,
  CloseIcon,
  DownIcon,
  ExitIcon,
  FullScreenIcon,
  InputNumber,
  LockIcon,
  ResetIcon,
  Trigger,
  UnlockIcon,
  WindowBottomIcon,
  WindowLeftIcon,
  WindowRightIcon,
  globalColor,
  illaPrefix,
  useMessage,
} from "@illa-design/react"
import { BuilderApi } from "@/api/base"
import { ReactComponent as Logo } from "@/assets/illa-logo.svg"
import { ReactComponent as SnowIcon } from "@/assets/snow-icon.svg"
import {
  BODY_MIN_HEIGHT,
  BODY_MIN_WIDTH,
  FOOTER_MIN_HEIGHT,
  HEADER_MIN_HEIGHT,
  LEFT_MIN_WIDTH,
  RIGHT_MIN_WIDTH,
} from "@/page/App/components/DotPanel/renderSection"
import { CollaboratorsList } from "@/page/App/components/PageNavBar/CollaboratorsList"
import {
  PageNavBarProps,
  PreviewPopContentProps,
} from "@/page/App/components/PageNavBar/interface"
import { DeployResp } from "@/page/App/components/PageNavBar/resp"
import {
  getFreezeState,
  getIllaMode,
  getIsOnline,
  isOpenBottomPanel,
  isOpenDebugger,
  isOpenLeftPanel,
  isOpenRightPanel,
} from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { getAppInfo } from "@/redux/currentApp/appInfo/appInfoSelector"
import { getViewportSizeSelector } from "@/redux/currentApp/editor/components/componentsSelector"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { getExecutionDebuggerData } from "@/redux/currentApp/executionTree/executionSelector"
import { fromNow } from "@/utils/dayjs"
import {
  closeIconStyle,
  descriptionStyle,
  downIconStyle,
  hasMarginClosIconStyle,
  informationStyle,
  inputAreaLabelWrapperStyle,
  inputAreaWrapperStyle,
  lineStyle,
  logoCursorStyle,
  nameStyle,
  navBarStyle,
  previewButtonGroupWrapperStyle,
  previewPopContentHeaderStyle,
  previewPopContentWrapperStyle,
  resetButtonContentStyle,
  resetIconStyle,
  resetLabelStyle,
  rightContentStyle,
  rowCenter,
  saveButtonWrapperStyle,
  saveFailedTipStyle,
  viewControlStyle,
  viewportFontStyle,
  windowIconBodyStyle,
  windowIconStyle,
} from "./style"

const validateHeight = (currentHeight: number | undefined) => {
  return !(
    currentHeight != undefined &&
    currentHeight < BODY_MIN_HEIGHT + HEADER_MIN_HEIGHT + FOOTER_MIN_HEIGHT
  )
}

const validateWidth = (currentWidth: number | undefined) => {
  return !(
    currentWidth != undefined &&
    currentWidth < BODY_MIN_WIDTH + LEFT_MIN_WIDTH + RIGHT_MIN_WIDTH
  )
}

const PreviewPopContent: FC<PreviewPopContentProps> = (props) => {
  const { viewportHeight, viewportWidth, closePopContent } = props
  const [inputWidth, setInputWidth] = useState(viewportWidth)
  const [inputHeight, setInputHeight] = useState(viewportHeight)
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const message = useMessage()

  const canShowResetButton =
    typeof viewportWidth != "undefined" || typeof viewportHeight != "undefined"

  const handleUpdateInputWidth = useCallback((value?: number) => {
    setInputWidth(value)
  }, [])
  const handleOnBlurInputHeight = useCallback(() => {
    const isValidate = validateHeight(inputHeight)
    if (!isValidate) {
      message.error({
        content: t("frame_size.invalid_tips", {
          size: BODY_MIN_HEIGHT + HEADER_MIN_HEIGHT + FOOTER_MIN_HEIGHT,
        }),
      })
      return
    }
  }, [inputHeight, message, t])
  const handleOnBlurInputWidth = useCallback(() => {
    const isValidate = validateWidth(inputWidth)
    if (!isValidate) {
      message.error({
        content: t("frame_size.invalid_tips", {
          size: BODY_MIN_WIDTH + LEFT_MIN_WIDTH + RIGHT_MIN_WIDTH,
        }),
      })
      return
    }
  }, [inputWidth, message, t])
  const handleUpdateInputHeight = useCallback((value?: number) => {
    setInputHeight(value)
  }, [])

  const onClickSaveButton = useCallback(() => {
    const isValidateWidth = validateWidth(inputWidth)
    const isValidateHeight = validateHeight(inputHeight)
    if (!isValidateWidth || !isValidateHeight) {
      return
    }
    closePopContent()
    dispatch(
      componentsActions.updateViewportSizeReducer({
        viewportWidth: inputWidth,
        viewportHeight: inputHeight,
      }),
    )
  }, [closePopContent, dispatch, inputHeight, inputWidth])

  const onClickResetButton = useCallback(() => {
    dispatch(
      componentsActions.updateViewportSizeReducer({
        viewportWidth: undefined,
        viewportHeight: undefined,
      }),
    )
    setInputHeight(undefined)
    setInputWidth(undefined)
  }, [dispatch])

  return (
    <div css={previewPopContentWrapperStyle}>
      <div css={previewPopContentHeaderStyle}>
        <span css={resetLabelStyle}>{t("preview.viewport.size")} (Px)</span>
        {canShowResetButton && (
          <Button
            leftIcon={<ResetIcon css={resetIconStyle} />}
            variant="text"
            colorScheme="grayBlue"
            onClick={onClickResetButton}
          >
            <span css={resetButtonContentStyle}>
              {t("preview.viewport.reset")}
            </span>
          </Button>
        )}
      </div>
      <div css={inputAreaWrapperStyle}>
        <div css={inputAreaLabelWrapperStyle}>
          <span>W</span>
          <CloseIcon css={closeIconStyle} />
          <span>H:</span>
        </div>
        <div css={inputAreaLabelWrapperStyle}>
          <InputNumber
            w="80px"
            colorScheme="techPurple"
            value={inputWidth}
            placeholder="--"
            onChange={handleUpdateInputWidth}
            onBlur={handleOnBlurInputWidth}
            min={BODY_MIN_WIDTH + LEFT_MIN_WIDTH + RIGHT_MIN_WIDTH}
          />
          <CloseIcon css={closeIconStyle} />
          <InputNumber
            w="80px"
            colorScheme="techPurple"
            value={inputHeight}
            placeholder="--"
            onChange={handleUpdateInputHeight}
            onBlur={handleOnBlurInputHeight}
            min={BODY_MIN_HEIGHT + HEADER_MIN_HEIGHT + FOOTER_MIN_HEIGHT}
          />
        </div>
      </div>
      <div css={saveButtonWrapperStyle}>
        <Button fullWidth colorScheme="grayBlue" onClick={onClickSaveButton}>
          {t("preview.viewport.save")}
        </Button>
      </div>
    </div>
  )
}

const PreviewButtonGroup: FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const viewportSize = useSelector(getViewportSizeSelector)
  const [popContentVisible, setPopContentVisible] = useState(false)
  const closePopContent = useCallback(() => {
    setPopContentVisible(false)
  }, [])
  const mode = useSelector(getIllaMode)

  return (
    <div css={previewButtonGroupWrapperStyle}>
      <Trigger
        trigger="click"
        content={
          <PreviewPopContent
            viewportHeight={viewportSize.viewportHeight}
            viewportWidth={viewportSize.viewportWidth}
            closePopContent={closePopContent}
          />
        }
        popupVisible={popContentVisible}
        onVisibleChange={setPopContentVisible}
        position="bottom-start"
        showArrow={false}
        withoutPadding
        colorScheme="white"
      >
        <Button
          colorScheme="grayBlue"
          variant="fill"
          bdRadius="8px 0 0 8px"
          rightIcon={<DownIcon css={downIconStyle} />}
        >
          <span css={viewportFontStyle}>
            {viewportSize.viewportWidth
              ? viewportSize.viewportWidth + "px"
              : "--"}
          </span>
          <CloseIcon css={hasMarginClosIconStyle} />
          <span css={viewportFontStyle}>
            {viewportSize.viewportHeight
              ? viewportSize.viewportHeight + "px"
              : "--"}
          </span>
        </Button>
      </Trigger>
      <span css={lineStyle} />
      <Button
        colorScheme="grayBlue"
        leftIcon={mode === "edit" ? <FullScreenIcon /> : <ExitIcon />}
        variant="fill"
        bdRadius="0 8px 8px 0"
        onClick={() => {
          if (mode === "edit") {
            dispatch(configActions.updateIllaMode("preview"))
          } else {
            dispatch(configActions.updateIllaMode("edit"))
          }
        }}
      >
        {mode === "edit" ? t("preview.button_text") : t("exit_preview")}
      </Button>
    </div>
  )
}

export const PageNavBar: FC<PageNavBarProps> = (props) => {
  const { className } = props
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const message = useMessage()
  const navigate = useNavigate()
  const { teamIdentifier } = useParams()

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
    BuilderApi.teamRequest<DeployResp>(
      {
        url: `/apps/${appInfo.appId}/deploy`,
        method: "POST",
      },
      (response) => {
        window.open(
          window.location.protocol +
            "//" +
            window.location.host +
            `/${teamIdentifier}/deploy/app/${appInfo?.appId}`,
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
  }, [appInfo.appId, t, teamIdentifier])

  return (
    <div className={className} css={navBarStyle}>
      <div css={rowCenter}>
        <Logo
          width="34px"
          onClick={() => {
            window.location.href = `/${teamIdentifier}/dashboard/apps`
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
        <PreviewButtonGroup />
      </div>
      <div css={rightContentStyle}>
        <CollaboratorsList />
        {mode === "edit" && (
          <div>
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
        )}
      </div>
    </div>
  )
}

PageNavBar.displayName = "PageNavBar"
