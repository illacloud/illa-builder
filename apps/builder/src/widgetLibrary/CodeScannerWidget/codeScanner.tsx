import { AnimatePresence } from "framer-motion"
import { CameraDevice, Html5Qrcode } from "html5-qrcode"
import { t } from "i18next"
import { FC, useCallback, useEffect, useRef, useState } from "react"
import { Button, SelectValue } from "@illa-design/react"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"
import { AutoHeightContainer } from "../PublicSector/AutoHeightContainer"
import { CodeModal, SuccessModal } from "./codeModal"
import { CodeScannerWidgetProps, WrappedCodeScannerProps } from "./interface"
import { fullStyle } from "./style"

const WrappedCodeScanner: FC<WrappedCodeScannerProps> = ({
  displayName,
  errorShow,
  showScanner,
  showSuccessModal,
  selectDeviceID,
  devices,
  value = "",
  variant = "fill",
  disabled,
  buttonText = "Scanner",
  colorScheme = "blue",
  handleCancel,
  handleOpenScanner,
  handleSwitchDevice,
  handleResumeScan,
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
      <AnimatePresence>
        {showScanner && (
          <CodeModal
            displayName={displayName}
            errorShow={errorShow}
            colorScheme={colorScheme}
            devices={devices}
            selectDeviceID={selectDeviceID}
            handleCancel={handleCancel}
            handleSwitchDevice={handleSwitchDevice}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showSuccessModal && (
          <SuccessModal
            value={value}
            colorScheme={colorScheme}
            onClose={handleCancel}
            onOK={handleResumeScan}
          />
        )}
      </AnimatePresence>
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
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const handleCancel = useCallback(() => {
    setShowScanner(false)
    setShowSuccessModal(false)
    html5QrCodeRef.current?.stop()
    html5QrCodeRef.current = null
    triggerEventHandler("closeScanner")
  }, [triggerEventHandler])

  const handleShowSuccessModal = useCallback(() => {
    html5QrCodeRef.current?.pause()
    setShowSuccessModal(true)
  }, [])

  const handleResumeScan = () => {
    html5QrCodeRef.current?.resume()
    setShowSuccessModal(false)
  }

  const handleScan = useCallback(
    (id: string, withoutCameraId?: boolean) => {
      if (!html5QrCodeRef.current) {
        html5QrCodeRef.current = new Html5Qrcode(`${displayName}-reader`, false)
      }
      const cameraIdOrConfig = withoutCameraId ? { facingMode: id } : id
      html5QrCodeRef.current.start(
        cameraIdOrConfig,
        {
          fps: 2,
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
          !closeAfterScan && handleShowSuccessModal()
          closeAfterScan && handleCancel()
        },
        () => {},
      )
    },
    [
      closeAfterScan,
      displayName,
      handleCancel,
      handleShowSuccessModal,
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
      if (devices.length > 1) {
        const withoutIDDevices = [
          {
            id: "user",
            label: t("editor.inspect.setter_label.scan.front"),
          },
          {
            id: "environment",
            label: t("editor.inspect.setter_label.scan.rear"),
          },
        ]
        setDevices(withoutIDDevices)
        handleScan(withoutIDDevices[1].id, true)
        setSelectDeviceID(withoutIDDevices[1].id)
      } else {
        setDevices(devices)
        handleScan(devices[0].id)
        setSelectDeviceID(devices[0].id)
      }
    })
  }, [handleScan, handleStartScanner, triggerEventHandler])

  const handleSwitchDevice = async (id?: SelectValue) => {
    await html5QrCodeRef.current?.stop()
    handleStartScanner().then(() => {
      handleScan(id as string, true)
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
            showSuccessModal={showSuccessModal}
            handleResumeScan={handleResumeScan}
          />
        </div>
      </TooltipWrapper>
    </AutoHeightContainer>
  )
}

CodeScannerWidget.displayName = "CodeScannerWidget"
export default CodeScannerWidget
