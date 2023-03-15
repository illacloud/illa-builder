import { motion } from "framer-motion"
import { FC, MouseEvent, useCallback, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import {
  Badge,
  BugIcon,
  Button,
  ButtonGroup,
  CaretRightIcon,
  CloseIcon,
  ExitIcon,
  FullScreenIcon,
  Input,
  InputNumber,
  LockIcon,
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
import { ReactComponent as DesktopIcon } from "@/assets/appSize/desktop.svg"
import { ReactComponent as CustomIcon } from "@/assets/appSize/filter.svg"
import { ReactComponent as FluidIcon } from "@/assets/appSize/fluid.svg"
import { ReactComponent as TabletIcon } from "@/assets/appSize/tablet.svg"
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
  AppSizeType,
  PageNavBarProps,
  PreviewPopContentProps,
} from "@/page/App/components/PageNavBar/interface"
import { DeployResp } from "@/page/App/components/PageNavBar/resp"
import {
  getFreezeState,
  getIsILLAEditMode,
  getIsOnline,
  isOpenBottomPanel,
  isOpenDebugger,
  isOpenLeftPanel,
  isOpenRightPanel,
} from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { getAppInfo } from "@/redux/currentApp/appInfo/appInfoSelector"
import { appInfoActions } from "@/redux/currentApp/appInfo/appInfoSlice"
import { getViewportSizeSelector } from "@/redux/currentApp/editor/components/componentsSelector"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { getExecutionDebuggerData } from "@/redux/currentApp/executionTree/executionSelector"
import { fromNow } from "@/utils/dayjs"
import {
  appNameEditorSaveButtonWrapperStyle,
  appNameEditorWrapperStyle,
  appNameInputLabelStyle,
  appNameInputWrapperStyle,
  appSizeContainerStyle,
  appSizeIconContainerStyle,
  appSizeIconStyle,
  closeIconStyle,
  descriptionStyle,
  getAppSizeIconSelectedStyle,
  informationStyle,
  inputAreaLabelWrapperStyle,
  inputAreaWrapperStyle,
  lineStyle,
  logoCursorStyle,
  nameStyle,
  navBarStyle,
  previewButtonGroupWrapperStyle,
  rightContentStyle,
  rowCenter,
  saveFailedTipStyle,
  triggerStyle,
  viewControlStyle,
  windowIconBodyStyle,
  windowIconStyle,
} from "./style"

const AppSizeIcons = [
  {
    type: "fluid",
    Icon: FluidIcon,
  },
  {
    type: "desktop",
    Icon: DesktopIcon,
  },
  {
    type: "tablet",
    Icon: TabletIcon,
  },
  {
    type: "custom",
    Icon: CustomIcon,
  },
]

const defaultAppSize = {
  fluid: {
    viewportWidth: undefined,
    viewportHeight: undefined,
  },
  desktop: {
    viewportWidth: 1280,
    viewportHeight: undefined,
  },
  tablet: {
    viewportWidth: 1080,
    viewportHeight: undefined,
  },
}

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
  const { viewportHeight, viewportWidth } = props
  const [inputWidth, setInputWidth] = useState(viewportWidth)
  const [inputHeight, setInputHeight] = useState(viewportHeight)
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const message = useMessage()

  const saveNewViewportSize = useCallback(() => {
    dispatch(
      componentsActions.updateViewportSizeReducer({
        viewportWidth: inputWidth,
        viewportHeight: inputHeight,
      }),
    )
  }, [dispatch, inputHeight, inputWidth])

  const handleUpdateInputWidth = useCallback((value?: number) => {
    setInputWidth(value)
  }, [])

  const handleUpdateInputHeight = useCallback((value?: number) => {
    setInputHeight(value)
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
    saveNewViewportSize()
  }, [inputHeight, message, saveNewViewportSize, t])

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
    saveNewViewportSize()
  }, [inputWidth, message, saveNewViewportSize, t])

  return (
    <div css={inputAreaWrapperStyle}>
      <div css={inputAreaLabelWrapperStyle}>
        <span>W</span>
        <CloseIcon css={closeIconStyle} />
        <span>H:</span>
      </div>
      <div css={inputAreaLabelWrapperStyle}>
        <InputNumber
          w="100px"
          colorScheme="techPurple"
          value={inputWidth}
          placeholder="--"
          onChange={handleUpdateInputWidth}
          onBlur={handleOnBlurInputWidth}
          min={BODY_MIN_WIDTH + LEFT_MIN_WIDTH + RIGHT_MIN_WIDTH}
          suffix="px"
          hideControl
        />
        <CloseIcon css={closeIconStyle} />
        <InputNumber
          w="100px"
          colorScheme="techPurple"
          value={inputHeight}
          placeholder="--"
          suffix="px"
          hideControl
          onChange={handleUpdateInputHeight}
          onBlur={handleOnBlurInputHeight}
          min={BODY_MIN_HEIGHT + HEADER_MIN_HEIGHT + FOOTER_MIN_HEIGHT}
        />
      </div>
    </div>
  )
}

const AppSizeButtonGroup: FC = () => {
  const viewportSize = useSelector(getViewportSizeSelector)
  const [appSizeType, setAppSizeType] = useState<AppSizeType>("fluid")
  const dispatch = useDispatch()

  const showCustomInputs = appSizeType === "custom"

  const updateAppSize = useCallback(
    ({
      viewportWidth,
      viewportHeight,
    }: {
      viewportWidth?: number
      viewportHeight?: number
    }) => {
      dispatch(
        componentsActions.updateViewportSizeReducer({
          viewportWidth,
          viewportHeight,
        }),
      )
    },
    [dispatch],
  )

  const handleAppSizeTypeChange = useCallback(
    (e: MouseEvent<HTMLSpanElement>) => {
      const newType = e.currentTarget.dataset.key as AppSizeType
      setAppSizeType(newType)
      if (newType !== "custom") {
        updateAppSize(defaultAppSize[newType])
      }
    },
    [updateAppSize],
  )

  return (
    <div css={previewButtonGroupWrapperStyle}>
      <div css={appSizeContainerStyle}>
        {AppSizeIcons.map((info) => {
          const { Icon, type } = info
          return (
            <span
              key={type}
              data-key={type}
              css={appSizeIconContainerStyle}
              onClick={handleAppSizeTypeChange}
            >
              <span
                css={[
                  appSizeIconStyle,
                  getAppSizeIconSelectedStyle(appSizeType === type),
                ]}
              >
                <Icon />
              </span>
            </span>
          )
        })}
      </div>
      {showCustomInputs && (
        <motion.div
          initial={{ display: "none" }}
          animate={{ display: "flex" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          exit={{ display: "none" }}
        >
          <PreviewPopContent
            viewportHeight={viewportSize.viewportHeight}
            viewportWidth={viewportSize.viewportWidth}
          />
        </motion.div>
      )}
    </div>
  )
}

export const PageNavBar: FC<PageNavBarProps> = (props) => {
  const { className } = props
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const message = useMessage()
  const { teamIdentifier } = useParams()

  const appInfo = useSelector(getAppInfo)
  const leftPanelVisible = useSelector(isOpenLeftPanel)
  const rightPanelVisible = useSelector(isOpenRightPanel)
  const bottomPanelVisible = useSelector(isOpenBottomPanel)
  const debuggerVisible = useSelector(isOpenDebugger)
  const isFreezeCanvas = useSelector(getFreezeState)
  const isOnline = useSelector(getIsOnline)
  const debuggerData = useSelector(getExecutionDebuggerData)
  const isEditMode = useSelector(getIsILLAEditMode)

  const [deployLoading, setDeployLoading] = useState(false)
  const [appNewName, setAppNewName] = useState<string>(appInfo.appName)
  const [popContentVisible, setPopContentVisible] = useState<boolean>(false)
  const [saveLoading, setSaveLoading] = useState<boolean>(false)

  const previewButtonText = isEditMode
    ? t("preview.button_text")
    : t("exit_preview")

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

  const handleClickSaveButton = useCallback(() => {
    if (appNewName === "" || appNewName.trim() === "") {
      message.error({
        content: t("dashboard.app.name_empty"),
      })
      return
    }
    BuilderApi.teamRequest(
      {
        url: `/apps/${appInfo.appId}`,
        method: "PUT",
        data: {
          appName: appNewName,
        },
      },
      (response) => {
        dispatch(appInfoActions.updateAppInfoReducer(response.data))
        message.success({
          content: t("dashboard.app.rename_success"),
        })
        setPopContentVisible(false)
      },
      (failure) => {
        message.error({
          content: t("dashboard.app.rename_fail"),
        })
      },
      (crash) => {
        message.error({
          content: t("network_error"),
        })
      },
      (loading) => {
        setSaveLoading(loading)
      },
    )
  }, [appInfo.appId, appNewName, dispatch, message, t])

  const handleOnNewNameChange = useCallback((value: string) => {
    setAppNewName(value.trim())
  }, [])

  const AppNameEditorModal = useMemo(() => {
    return (
      <div css={appNameEditorWrapperStyle}>
        <div css={appNameInputWrapperStyle}>
          <span css={appNameInputLabelStyle}>Name</span>
          <Input onChange={handleOnNewNameChange} defaultValue={appNewName} />
        </div>
        <div css={appNameEditorSaveButtonWrapperStyle}>
          <Button
            fullWidth
            colorScheme="grayBlue"
            onClick={handleClickSaveButton}
            loading={saveLoading}
          >
            {t("preview.viewport.save")}
          </Button>
        </div>
      </div>
    )
  }, [appNewName, handleOnNewNameChange, handleClickSaveButton, saveLoading, t])

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
          <Trigger
            _css={triggerStyle}
            trigger="click"
            content={AppNameEditorModal}
            popupVisible={popContentVisible}
            onVisibleChange={setPopContentVisible}
            position="bottom-start"
            showArrow={false}
            withoutPadding
            colorScheme="white"
          >
            <div css={nameStyle}>{appInfo?.appName}</div>
          </Trigger>
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
        {isEditMode && (
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
            <span css={lineStyle} />
          </>
        )}
        <AppSizeButtonGroup />
      </div>
      <div css={rightContentStyle}>
        <CollaboratorsList />
        {isEditMode ? (
          <div>
            <ButtonGroup spacing="8px">
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
