import { CameraDevice, Html5Qrcode } from "html5-qrcode"
import { FC, useCallback, useEffect, useRef, useState } from "react"
import { Button, SelectValue } from "@illa-design/react"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"
import { AutoHeightContainer } from "../PublicSector/AutoHeightContainer"
import CodeModal from "./codeModal"
import { CodeScannerWidgetProps, WrappedCodeScannerProps } from "./interface"
import { fullStyle } from "./style"

const WrappedCodeScanner: FC<WrappedCodeScannerProps> = ({
  displayName,
  errorShow,
  showScanner,
  selectDeviceID,
  devices,
  variant = "fill",
  disabled,
  buttonText = "Scanner",
  colorScheme = "blue",
  handleCancel,
  handleOpenScanner,
  handleSwitchDevice,
}) => {
  return (
    <>
      <Button
        disabled={disabled}
        variant={variant}
        colorScheme={colorScheme}
        fullWidth
        fullHeight
        onClick={handleOpenScanner}
      >
        {buttonText}
      </Button>
      <CodeModal
        displayName={displayName}
        showScanner={showScanner}
        errorShow={errorShow}
        devices={devices}
        selectDeviceID={selectDeviceID}
        handleCancel={handleCancel}
        handleSwitchDevice={handleSwitchDevice}
      />
    </>
  )
}

WrappedCodeScanner.displayName = "WrappedCodeScanner"

export const CodeScannerWidget: FC<CodeScannerWidgetProps> = (props) => {
  const {
    displayName,
    tooltipText,
    closeAfterScan,
    triggerEventHandler,
    updateComponentHeight,
    updateComponentRuntimeProps,
    handleUpdateMultiExecutionResult,
    deleteComponentRuntimeProps,
  } = props

  const [errorShow, setErrorShow] = useState(false)
  const [showScanner, setShowScanner] = useState(false)
  const [devices, setDevices] = useState<CameraDevice[]>([])
  const [selectDeviceID, setSelectDeviceID] = useState("")
  const html5QrCodeRef = useRef<Html5Qrcode | null>()

  const handleCancel = useCallback(() => {
    setShowScanner(false)
    html5QrCodeRef.current?.stop()
    html5QrCodeRef.current = null
    triggerEventHandler("closeScanner")
  }, [triggerEventHandler])

  const handleScan = useCallback(
    (id: string) => {
      if (!html5QrCodeRef.current) {
        html5QrCodeRef.current = new Html5Qrcode(`${displayName}-reader`, false)
      }
      html5QrCodeRef.current.start(
        id,
        {
          fps: 10,
        },
        (decodedText) => {
          handleUpdateMultiExecutionResult([
            {
              displayName,
              value: {
                value: decodedText,
              },
            },
          ])
          triggerEventHandler("scanSuccessful")
          closeAfterScan && handleCancel()
        },
        () => {},
      )
    },
    [
      closeAfterScan,
      displayName,
      handleCancel,
      handleUpdateMultiExecutionResult,
      triggerEventHandler,
    ],
  )

  const handleStartScanner = useCallback((): Promise<CameraDevice[]> => {
    return new Promise((resolve, reject) => {
      Html5Qrcode.getCameras()
        .then((devices: CameraDevice[]) => {
          setErrorShow(false)
          resolve(devices)
        })
        .catch((e) => {
          setErrorShow(true)
          reject(e)
        })
    })
  }, [])

  const handleOpenScanner = useCallback(() => {
    setShowScanner(true)
    handleStartScanner().then((devices: CameraDevice[]) => {
      triggerEventHandler("openScanner")
      if (!devices || !Array.isArray(devices) || devices.length === 0) return
      setDevices(devices)
      if (devices.length > 1) {
        handleScan(devices[1].id)
        setSelectDeviceID(devices[1].id)
      } else {
        handleScan(devices[0].id)
        setSelectDeviceID(devices[0].id)
      }
    })
  }, [handleScan, handleStartScanner, triggerEventHandler])

  const handleSwitchDevice = async (id?: SelectValue) => {
    await html5QrCodeRef.current?.stop()
    handleStartScanner().then(() => {
      handleScan(id as string)
      setSelectDeviceID(id as string)
    })
  }

  useEffect(() => {
    updateComponentRuntimeProps({
      clearValue: () => {
        handleUpdateMultiExecutionResult([
          {
            displayName,
            value: {
              value: undefined,
            },
          },
        ])
      },
      openScanner: handleOpenScanner,
    })
    return () => {
      deleteComponentRuntimeProps()
    }
  }, [
    handleOpenScanner,
    deleteComponentRuntimeProps,
    displayName,
    handleUpdateMultiExecutionResult,
    updateComponentRuntimeProps,
  ])

  return (
    <AutoHeightContainer updateComponentHeight={updateComponentHeight}>
      <TooltipWrapper tooltipText={tooltipText} tooltipDisabled={!tooltipText}>
        <div css={fullStyle}>
          <WrappedCodeScanner
            {...props}
            errorShow={errorShow}
            showScanner={showScanner}
            devices={devices}
            selectDeviceID={selectDeviceID}
            handleCancel={handleCancel}
            handleOpenScanner={handleOpenScanner}
            handleSwitchDevice={handleSwitchDevice}
          />
        </div>
      </TooltipWrapper>
    </AutoHeightContainer>
  )
}

CodeScannerWidget.displayName = "CodeScannerWidget"
export default CodeScannerWidget
