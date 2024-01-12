import { get } from "lodash-es"
import { FC, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { RadioGroup } from "@illa-design/react"
import FilesModal, { ROOT_PATH } from "@/components/DriveFileSelect"
import FolderOperateModal from "@/components/FolderOperateModal"
import {
  applyRadioGroupWrapperStyle,
  baseRadioGroupContainerStyle,
  radioGroupStyle,
} from "@/page/App/components/InspectPanel/PanelSetters/DriveSourceGroupSetter/style"
import SourceHeader from "./components/SourceHeader"
import URLModeInput from "./components/URLModeInput"
import UploadMode from "./components/UploadInput"
import { DRIVE_SOURCE_MODE } from "./constants"
import { DriveSourceGroupSetterProps } from "./interface"
import { FileUploadProvider } from "./provider/FileUploadProvider"
import { SourceSelectProvider } from "./provider/SourceSelectProvider"

const DriveSourceGroupSetter: FC<DriveSourceGroupSetterProps> = (props) => {
  const {
    value = "",
    isSetterSingleRow = false,
    attrName,
    widgetType,
    labelName,
    labelDesc,
    widgetDisplayName,
    componentNode,
    handleUpdateDsl,
  } = props

  const { t } = useTranslation()

  const options = [
    {
      label: t("widget.public.select_options.url"),
      value: DRIVE_SOURCE_MODE.URL,
    },
    {
      label: t("widget.public.select_options.upload"),
      value: DRIVE_SOURCE_MODE.UPLOAD,
    },
  ]

  const [selectMode, setSelectMode] = useState(DRIVE_SOURCE_MODE.URL)
  const { srcByURL, srcByUpload } = useMemo(() => {
    const srcByURL = get(componentNode, `props.${attrName}ByURL`, value)
    const srcByUpload = get(componentNode, `props.${attrName}ByUpload`, value)
    return {
      srcByURL,
      srcByUpload,
    }
  }, [attrName, componentNode, value])

  const handleSelectModeChange = (mode: DRIVE_SOURCE_MODE) => {
    setSelectMode(mode)
    if (mode === DRIVE_SOURCE_MODE.URL) {
      handleUpdateDsl(attrName, srcByURL)
    } else {
      handleUpdateDsl(attrName, srcByUpload)
    }
  }

  const handleUpdateResultByURL = (attrNameByUrl: string, value: string) => {
    if (selectMode === DRIVE_SOURCE_MODE.URL) {
      handleUpdateDsl(attrName, value)
    }
    handleUpdateDsl(attrNameByUrl, value)
  }

  const handleUpdateResultByUpload = (value: string) => {
    if (selectMode === DRIVE_SOURCE_MODE.UPLOAD) {
      handleUpdateDsl(attrName, value)
    }
    handleUpdateDsl(`${attrName}ByUpload`, value)
  }

  return (
    <SourceSelectProvider
      widgetType={widgetType}
      path={ROOT_PATH}
      handleUpdateResult={(value) => {
        handleUpdateResultByURL(`${attrName}ByURL`, value)
      }}
    >
      <FileUploadProvider
        widgetType={widgetType}
        handleUpdateResult={handleUpdateResultByUpload}
      >
        <div css={baseRadioGroupContainerStyle(isSetterSingleRow)}>
          <SourceHeader
            labelDesc={labelDesc}
            labelName={labelName}
            showSelect={selectMode === DRIVE_SOURCE_MODE.URL}
          />
          <div css={applyRadioGroupWrapperStyle(isSetterSingleRow)}>
            <RadioGroup
              onChange={handleSelectModeChange}
              value={selectMode}
              forceEqualWidth={true}
              options={options}
              type="button"
              size="medium"
              colorScheme="grayBlue"
              css={radioGroupStyle}
            />
            {selectMode === DRIVE_SOURCE_MODE.URL && (
              <URLModeInput
                value={srcByURL}
                attrName={`${attrName}ByURL`}
                widgetType={widgetType}
                handleUpdateDsl={handleUpdateResultByURL}
                widgetDisplayName={widgetDisplayName}
              />
            )}
            {selectMode === DRIVE_SOURCE_MODE.UPLOAD && (
              <UploadMode widgetType={widgetType} />
            )}
          </div>
        </div>
        <FolderOperateModal />
        <FilesModal />
      </FileUploadProvider>
    </SourceSelectProvider>
  )
}

DriveSourceGroupSetter.displayName = "DriveSourceGroupSetter"

export default DriveSourceGroupSetter
