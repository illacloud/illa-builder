import { FC, useEffect } from "react"
import { Upload } from "@illa-design/upload"
import { UploadWidgetProps, WrappedUploadProps } from "./interface"
import { containerStyle } from "@/widgetLibrary/PublicSector/containerStyle"

export const WrappedUpload: FC<WrappedUploadProps> = (props) => {
  const { disabled, handleUpdateDsl } = props

  return (
    <div css={containerStyle}>
      <Upload action="" />
    </div>
  )
}

WrappedUpload.displayName = "WrappedUpload"

export const UploadWidget: FC<UploadWidgetProps> = (props) => {
  const {
    disabled,
    handleUpdateDsl,
    handleUpdateGlobalData,
    handleDeleteGlobalData,
    displayName,
  } = props

  useEffect(() => {
    handleUpdateGlobalData?.(displayName, {
      disabled,
      setValue: (value: boolean) => {
        handleUpdateDsl({ value })
      },
      clearValue: () => {
        handleUpdateDsl({ value: false })
      },
    })
    return () => {
      handleDeleteGlobalData(displayName)
    }
  }, [displayName, disabled])
  return <WrappedUpload {...props} />
}
UploadWidget.displayName = "UploadWidget"
