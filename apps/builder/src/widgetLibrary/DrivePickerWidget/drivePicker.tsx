import { EXPIRATION_TYPE } from "@illa-public/public-types"
import { FC, useCallback } from "react"
import { forwardRef, useContext } from "react"
import { Button } from "@illa-design/react"
import FilesModal from "@/components/DriveFileSelect"
import { DriveFileSelectContext } from "@/components/DriveFileSelect/context"
import { FileToPanel } from "@/components/DriveFileSelect/interface"
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

  return (
    <div ref={ref} css={wrapperStyle}>
      <Button
        fullWidth
        fullHeight
        colorScheme={colorScheme}
        disabled={disabled}
        variant={variant}
        onClick={() => setModalVisible(true)}
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
