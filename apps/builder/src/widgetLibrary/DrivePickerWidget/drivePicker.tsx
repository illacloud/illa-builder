import { EXPIRATION_TYPE } from "@illa-public/public-types"
import { useUpgradeModal } from "@illa-public/upgrade-modal"
import { isSubscribeForUseDrive } from "@illa-public/upgrade-modal/utils"
import { getCurrentTeamInfo } from "@illa-public/user-data"
import { FC, useCallback } from "react"
import { forwardRef, useContext } from "react"
import { useSelector } from "react-redux"
import { Button } from "@illa-design/react"
import FilesModal from "@/components/DriveFileSelect"
import { DriveFileSelectContext } from "@/components/DriveFileSelect/context"
import { FileToPanel } from "@/components/DriveFileSelect/interface"
import { getIsILLAProductMode } from "@/redux/config/configSelector"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"
import { DEFAULT_EXPIRED_TIME } from "./constants"
import {
  DrivePickerWidgetProps,
  SelectItemValue,
  WrappedDrivePickerProps,
} from "./interface"
import { DrivePickerProvider } from "./provider"
import { wrapperStyle } from "./style"

export const WrappedDrivePicker = forwardRef<
  HTMLDivElement,
  WrappedDrivePickerProps
>((props, ref) => {
  const { text, variant, colorScheme, disabled } = props
  const { setModalVisible } = useContext(DriveFileSelectContext)
  const teamInfo = useSelector(getCurrentTeamInfo)!
  const isProductionMode = useSelector(getIsILLAProductMode)
  const upgradeModal = useUpgradeModal()

  const openLicenseDrawer = useCallback(() => {
    upgradeModal({
      modalType: "upgrade",
      from: "drive_picker",
    })
  }, [upgradeModal])

  const handleClick = () => {
    if (isProductionMode || isSubscribeForUseDrive(teamInfo)) {
      setModalVisible(true)
    } else {
      openLicenseDrawer()
    }
  }

  return (
    <div ref={ref} css={wrapperStyle}>
      <Button
        fullWidth
        fullHeight
        colorScheme={colorScheme}
        disabled={disabled}
        variant={variant}
        onClick={handleClick}
      >
        {text}
      </Button>
      <FilesModal />
    </div>
  )
})
WrappedDrivePicker.displayName = "WrappedDrivePicker"

export const DrivePickerWidget: FC<DrivePickerWidgetProps> = (props) => {
  const {
    ILLADriveFolder,
    displayName,
    tooltipText,
    expirationType = EXPIRATION_TYPE.PERSISTENT,
    expiredTime = DEFAULT_EXPIRED_TIME,
    useHotlink = false,
    minSize,
    maxSize,
    minFileNum,
    maxFileNum,
    sizeType = "kb",
    allowAnonymousUse,
    colorScheme = "blue",
    handleUpdateMultiExecutionResult,
    triggerEventHandler,
  } = props

  const handleUpdateMultiExecution = useCallback(
    (value: SelectItemValue[], files: Partial<FileToPanel>[]) => {
      return new Promise((resolve) => {
        handleUpdateMultiExecutionResult([
          {
            displayName,
            value: {
              value,
              files,
            },
          },
        ])
        resolve(true)
      }).then(() => {
        triggerEventHandler && triggerEventHandler("change")
      })
    },
    [displayName, handleUpdateMultiExecutionResult, triggerEventHandler],
  )

  return (
    <DrivePickerProvider
      path={ILLADriveFolder}
      handleUpdateResult={handleUpdateMultiExecution}
      expirationType={expirationType}
      expiredTime={expiredTime}
      useHotlink={useHotlink}
      minFileNum={minFileNum}
      maxFileNum={maxFileNum}
      minSize={minSize}
      maxSize={maxSize}
      sizeType={sizeType}
      allowAnonymousUse={allowAnonymousUse}
      colorScheme={colorScheme}
    >
      <TooltipWrapper tooltipText={tooltipText} tooltipDisabled={!tooltipText}>
        <WrappedDrivePicker {...props} />
      </TooltipWrapper>
    </DrivePickerProvider>
  )
}

DrivePickerWidget.displayName = "DrivePickerWidget"
export default DrivePickerWidget
